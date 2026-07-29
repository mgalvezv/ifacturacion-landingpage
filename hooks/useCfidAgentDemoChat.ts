import { useCallback, useRef, useState } from 'react';
import {
  defaultInvoicePayload,
  extractEmail,
  InvoiceWizardState,
  isConfirmMessage,
  isDownloadIntent,
  isInvoiceIntent,
  PendingAction,
  valueOrDefault,
} from '../lib/cfidAgent';
import type { ChatMessage, ChatRole } from './useCfidAgentChat';

const DEMO_UUID = '00000000-0000-4000-8000-demo00000001';

const DEMO_INITIAL_MESSAGE =
  '¡Hola! Soy el asistente CFID con MCP.\n\n' +
  'Esta es una vista previa interactiva: puedes explorar el flujo de facturación, ' +
  'pero no se conecta al orquestador ni timbra comprobantes reales.\n\n' +
  'Prueba escribir: Quiero facturar';

interface UseCfidAgentDemoChatOptions {
  initialMessage?: string;
}

function delay(ms: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, ms));
}

export function useCfidAgentDemoChat({
  initialMessage = DEMO_INITIAL_MESSAGE,
}: UseCfidAgentDemoChatOptions = {}) {
  const nextId = useRef(2);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, role: 'assistant', text: initialMessage },
  ]);
  const [isSending, setIsSending] = useState(false);
  const [pendingAction, setPendingAction] = useState<PendingAction | null>(null);
  const [invoiceWizard, setInvoiceWizard] = useState<InvoiceWizardState | null>(
    null
  );
  const [lastInvoiceUuid, setLastInvoiceUuid] = useState<string | null>(null);

  const appendMessage = useCallback((role: ChatRole, text: string) => {
    setMessages((prev) => [...prev, { id: nextId.current++, role, text }]);
  }, []);

  const resetConversation = useCallback(() => {
    nextId.current = 2;
    setMessages([{ id: 1, role: 'assistant', text: initialMessage }]);
    setPendingAction(null);
    setInvoiceWizard(null);
    setLastInvoiceUuid(null);
    setIsSending(false);
  }, [initialMessage]);

  const prepareInvoicePayload = useCallback(
    async (payload: Record<string, unknown>) => {
      await delay(700 + Math.random() * 400);
      const receptor = String(payload.nombreReceptor || 'Receptor demo');
      setPendingAction({
        action_id: 'demo-action-001',
        tool_name: 'timbrar_cfdi',
        summary: `Factura de ingreso para ${receptor}`,
      });
      appendMessage(
        'assistant',
        `Pre-CFDI listo para ${receptor}.\n\n` +
          'Revisa los datos y, si estuvieras en producción, escribe Confirmo timbrar ' +
          'para ejecutar el timbrado vía MCP.\n\n' +
          '(Demo: no se envía nada al PAC.)'
      );
    },
    [appendMessage]
  );

  const startInvoiceWizard = useCallback(() => {
    setInvoiceWizard({
      step: 'nombreReceptor',
      draft: defaultInvoicePayload(),
    });
    appendMessage(
      'assistant',
      'Claro. Vamos a preparar una factura de ingreso simple.\n\n' +
        'Para la demo puedes escribir: usar demo.\n\n' +
        'Primero, dime el nombre o razón social del receptor.'
    );
  }, [appendMessage]);

  const handleInvoiceWizard = useCallback(
    async (message: string) => {
      if (!invoiceWizard) return;

      const normalized = message.trim().toLowerCase();
      if (['usar demo', 'demo'].includes(normalized)) {
        const payload = defaultInvoicePayload();
        setInvoiceWizard(null);
        await prepareInvoicePayload(payload);
        return;
      }

      const wizard = { ...invoiceWizard };
      const draft = { ...wizard.draft, conceptos: [...wizard.draft.conceptos] };
      const concept = { ...draft.conceptos[0] };

      switch (wizard.step) {
        case 'nombreReceptor':
          draft.nombreReceptor = valueOrDefault(message, draft.nombreReceptor);
          wizard.step = 'rfcReceptor';
          setInvoiceWizard({ step: wizard.step, draft });
          appendMessage('assistant', 'Gracias. Ahora dime el RFC del receptor.');
          return;
        case 'rfcReceptor':
          draft.rfcReceptor = valueOrDefault(message, draft.rfcReceptor).toUpperCase();
          wizard.step = 'codigoPostalReceptor';
          setInvoiceWizard({ step: wizard.step, draft });
          appendMessage(
            'assistant',
            'Perfecto. ¿Cuál es el código postal fiscal del receptor?'
          );
          return;
        case 'codigoPostalReceptor':
          draft.codigoPostalReceptor = valueOrDefault(
            message,
            draft.codigoPostalReceptor
          );
          wizard.step = 'regimenFiscalReceptor';
          setInvoiceWizard({ step: wizard.step, draft });
          appendMessage(
            'assistant',
            'Ahora necesito el régimen fiscal del receptor, por ejemplo 605.'
          );
          return;
        case 'regimenFiscalReceptor':
          draft.regimenFiscalReceptor = valueOrDefault(
            message,
            draft.regimenFiscalReceptor
          );
          wizard.step = 'descripcion';
          setInvoiceWizard({ step: wizard.step, draft });
          appendMessage('assistant', '¿Qué concepto vamos a facturar?');
          return;
        case 'descripcion':
          concept.descripcion = valueOrDefault(
            message,
            concept.descripcion || 'Servicio de consultoría IT'
          );
          draft.conceptos[0] = concept;
          wizard.step = 'precioUnitario';
          setInvoiceWizard({ step: wizard.step, draft });
          appendMessage('assistant', '¿Cuál es el importe antes de IVA?');
          return;
        case 'precioUnitario': {
          const value = Number(
            valueOrDefault(message, String(concept.precioUnitario)).replace(
              /[$,]/g,
              ''
            )
          );
          if (!Number.isFinite(value) || value <= 0) {
            appendMessage(
              'error',
              'Necesito un importe numérico mayor a cero. Por ejemplo: 1000'
            );
            return;
          }
          concept.cantidad = 1;
          concept.precioUnitario = value;
          concept.importe = value;
          draft.conceptos[0] = concept;
          wizard.step = 'usoCFDI';
          setInvoiceWizard({ step: wizard.step, draft });
          appendMessage(
            'assistant',
            '¿Qué uso CFDI aplicamos? Para la demo puedes responder G01.'
          );
          return;
        }
        case 'usoCFDI':
          draft.usoCFDI = valueOrDefault(message, draft.usoCFDI).toUpperCase();
          wizard.step = 'formaPago';
          setInvoiceWizard({ step: wizard.step, draft });
          appendMessage(
            'assistant',
            '¿Forma de pago? Para efectivo usa 01. Si quieres la demo, responde 01.'
          );
          return;
        case 'formaPago':
          draft.formaPago = valueOrDefault(message, draft.formaPago);
          draft.metodoPago = 'PUE';
          setInvoiceWizard(null);
          await prepareInvoicePayload(draft);
          return;
      }
    },
    [appendMessage, invoiceWizard, prepareInvoicePayload]
  );

  const confirmPendingAction = useCallback(async () => {
    await delay(900 + Math.random() * 500);
    setPendingAction(null);
    setLastInvoiceUuid(DEMO_UUID);
    appendMessage(
      'assistant',
      'Timbrado simulado correctamente.\n\n' +
        `UUID demo: ${DEMO_UUID}\n` +
        'Serie-Folio: DEMO-00001\n' +
        'Total: $1,160.00 MXN\n\n' +
        'En la versión final podrás enviarla por correo o descargar el PDF.\n\n' +
        'Prueba: enviar a demo@ejemplo.com o escribe descargar pdf'
    );
  }, [appendMessage]);

  const sendMessage = useCallback(
    async (rawMessage: string) => {
      const message = rawMessage.trim();
      if (!message || isSending) return;

      appendMessage('user', message);
      setIsSending(true);

      try {
        await delay(450 + Math.random() * 350);

        const email = extractEmail(message);
        if (email && lastInvoiceUuid) {
          appendMessage(
            'assistant',
            `(Demo) Correo simulado enviado a ${email} con la factura ${lastInvoiceUuid}.`
          );
          return;
        }

        if (isDownloadIntent(message, Boolean(lastInvoiceUuid)) && lastInvoiceUuid) {
          appendMessage(
            'assistant',
            `(Demo) Link de descarga PDF:\nhttps://cfid.redcibercom.cloud/demo/${lastInvoiceUuid}.pdf`
          );
          return;
        }

        if (isConfirmMessage(message)) {
          if (!pendingAction?.action_id) {
            appendMessage(
              'assistant',
              'Primero prepara una factura; después podrás simular el timbrado con Confirmo timbrar.'
            );
            return;
          }
          await confirmPendingAction();
          return;
        }

        if (invoiceWizard) {
          await handleInvoiceWizard(message);
          return;
        }

        if (isInvoiceIntent(message)) {
          startInvoiceWizard();
          return;
        }

        appendMessage(
          'assistant',
          'Esta vista previa muestra cómo interactuará el asistente con MCP.\n\n' +
            'Prueba: Quiero facturar · Confirmo timbrar (tras preparar) · ' +
            'o pregúntanos en #contacto para una demo en vivo con el orquestador.'
        );
      } finally {
        setIsSending(false);
      }
    },
    [
      appendMessage,
      confirmPendingAction,
      handleInvoiceWizard,
      invoiceWizard,
      isSending,
      lastInvoiceUuid,
      pendingAction,
      startInvoiceWizard,
    ]
  );

  return {
    messages,
    isSending,
    pendingAction,
    sendMessage,
    resetConversation,
  };
}
