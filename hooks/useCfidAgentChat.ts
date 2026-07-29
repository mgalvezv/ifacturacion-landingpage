import { useCallback, useRef, useState } from 'react';
import {
  CfidAgentApiError,
  CfidAgentClient,
  ConfirmResponse,
  defaultInvoicePayload,
  extractEmail,
  InvoiceWizardState,
  isConfirmMessage,
  isDownloadIntent,
  isInvoiceIntent,
  PendingAction,
  valueOrDefault,
} from '../lib/cfidAgent';

export type ChatRole = 'user' | 'assistant' | 'error';

export interface ChatMessage {
  id: number;
  role: ChatRole;
  text: string;
}

interface UseCfidAgentChatOptions {
  client: CfidAgentClient | null;
  sessionId: string;
  enabled: boolean;
  initialMessage?: string;
}

export function useCfidAgentChat({
  client,
  sessionId,
  enabled,
  initialMessage = 'Listo para ayudarte. Prueba: "Quiero facturar" o pregunta sobre CFDI.',
}: UseCfidAgentChatOptions) {
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

  const prepareInvoicePayload = useCallback(
    async (payload: Record<string, unknown>) => {
      if (!client) {
        appendMessage('error', 'El orquestador no está conectado.');
        return;
      }

      const data = await client.prepareInvoice(payload);
      setPendingAction(data.pending_action || null);
      appendMessage('assistant', data.message);
    },
    [appendMessage, client]
  );

  const startInvoiceWizard = useCallback(() => {
    setInvoiceWizard({
      step: 'nombreReceptor',
      draft: defaultInvoicePayload(),
    });
    appendMessage(
      'assistant',
      'Claro. Vamos a preparar una factura de ingreso simple.\n\nPara la demo puedes escribir: usar demo.\n\nPrimero, dime el nombre o razón social del receptor.'
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

  const confirmPendingAction = useCallback(
    async (message: string) => {
      if (!client) {
        appendMessage('error', 'El orquestador no está conectado.');
        return;
      }

      if (!pendingAction?.action_id) {
        appendMessage(
          'assistant',
          'Primero prepara una factura; después puedo timbrarla con confirmación explícita.'
        );
        return;
      }

      const data: ConfirmResponse = await client.confirm(
        pendingAction.action_id,
        message
      );
      setPendingAction(null);

      if (data.status === 'executed') {
        const uuid = data.result?.uuid;
        if (typeof uuid === 'string') {
          setLastInvoiceUuid(uuid);
        }
        appendMessage(
          'assistant',
          `${data.message}\n\n${JSON.stringify(data.result, null, 2)}\n\n¿Quieres que la envíe por correo o prefieres descargar el PDF?`
        );
        return;
      }

      appendMessage(
        'error',
        `${data.message}\n\n${JSON.stringify(data.result || {}, null, 2)}`
      );
    },
    [appendMessage, client, pendingAction]
  );

  const sendMessage = useCallback(
    async (rawMessage: string) => {
      const message = rawMessage.trim();
      if (!message || isSending) return;

      if (!enabled || !client) {
        appendMessage(
          'error',
          'Conecta el orquestador IACFID en el puerto 8088 y configura el .env de la landing.'
        );
        return;
      }

      appendMessage('user', message);
      setIsSending(true);

      try {
        const email = extractEmail(message);
        if (email && lastInvoiceUuid) {
          const data = await client.emailInvoice(lastInvoiceUuid, email);
          appendMessage('assistant', data.message || 'Correo enviado correctamente.');
          return;
        }

        if (isDownloadIntent(message, Boolean(lastInvoiceUuid)) && lastInvoiceUuid) {
          const data = await client.pdfLink(lastInvoiceUuid);
          appendMessage('assistant', `Link de descarga PDF:\n${data.url}`);
          return;
        }

        if (isConfirmMessage(message)) {
          await confirmPendingAction(message);
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

        const data = await client.chat(sessionId, message);
        if (data.pending_action) {
          setPendingAction(data.pending_action);
        }
        appendMessage('assistant', data.message);
      } catch (error) {
        const text =
          error instanceof CfidAgentApiError
            ? error.message
            : error instanceof Error
              ? error.message
              : 'No fue posible contactar al asistente.';
        appendMessage('error', text);
      } finally {
        setIsSending(false);
      }
    },
    [
      appendMessage,
      client,
      confirmPendingAction,
      enabled,
      handleInvoiceWizard,
      invoiceWizard,
      isSending,
      lastInvoiceUuid,
      sessionId,
      startInvoiceWizard,
    ]
  );

  return {
    messages,
    isSending,
    pendingAction,
    sendMessage,
  };
}
