export interface PendingAction {
  action_id: string;
  tool_name?: string;
  summary?: string;
}

export interface ChatResponse {
  status: string;
  message: string;
  pending_action?: PendingAction | null;
}

export interface ConfirmResponse {
  status: string;
  message: string;
  result?: Record<string, unknown> & { uuid?: string };
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type?: string;
}

export interface HealthResponse {
  status: string;
  env: string;
  mcp: string;
  auth_mode?: string;
}

export interface CfidAgentConfig {
  apiBase: string;
  sessionId: string;
  useAegisLogin: boolean;
  demoIdentifier: string;
  demoPassword: string;
}

export function getCfidAgentConfig(): CfidAgentConfig {
  const useAegisLogin =
    (import.meta.env.VITE_CFID_USE_AEGIS_LOGIN || '').toLowerCase() === 'true';

  return {
    apiBase: (import.meta.env.VITE_CFID_AGENT_API_BASE || '').replace(/\/$/, ''),
    sessionId:
      import.meta.env.VITE_CFID_AGENT_SESSION_ID || 'cfid-landing-demo',
    useAegisLogin,
    demoIdentifier: import.meta.env.VITE_CFID_DEMO_IDENTIFIER || '',
    demoPassword: import.meta.env.VITE_CFID_DEMO_PASSWORD || '',
  };
}

export function hasCfidAgentConfig(config: CfidAgentConfig = getCfidAgentConfig()) {
  return Boolean(config.apiBase);
}

/** Vista previa sin orquestador: siempre activa en builds de producción (GitHub Pages). */
export function isCfidDemoMode(config: CfidAgentConfig = getCfidAgentConfig()) {
  if (import.meta.env.PROD) return true;

  const flag = (import.meta.env.VITE_CFID_DEMO_MODE || '').toLowerCase();
  if (flag === 'true') return true;
  if (flag === 'false') return false;
  return !hasCfidAgentConfig(config);
}

export class CfidAgentApiError extends Error {
  status: number;

  constructor(message: string, status = 0) {
    super(message);
    this.name = 'CfidAgentApiError';
    this.status = status;
  }
}

async function readJson<T>(response: Response): Promise<T> {
  const text = await response.text();
  const data = text ? (JSON.parse(text) as T & { detail?: unknown }) : null;

  if (!response.ok) {
    const detail =
      data && typeof data === 'object' && 'detail' in data
        ? formatApiErrorDetail(data.detail)
        : `HTTP ${response.status}`;
    throw new CfidAgentApiError(detail, response.status);
  }

  return data as T;
}

function formatApiErrorDetail(detail: unknown): string {
  if (typeof detail === 'string') {
    return detail;
  }

  if (Array.isArray(detail)) {
    return detail
      .map((item) => {
        if (item && typeof item === 'object' && 'msg' in item) {
          const loc =
            'loc' in item && Array.isArray(item.loc)
              ? item.loc
                  .filter((part: unknown) => part !== 'body')
                  .join('.')
              : '';
          return loc ? `${loc}: ${String(item.msg)}` : String(item.msg);
        }
        return JSON.stringify(item);
      })
      .join('\n');
  }

  if (detail && typeof detail === 'object') {
    return JSON.stringify(detail);
  }

  return 'Error desconocido del orquestador';
}

export async function checkCfidAgentHealth(
  apiBase: string
): Promise<HealthResponse> {
  const response = await fetch(`${apiBase}/health`);
  return readJson<HealthResponse>(response);
}

export async function loginCfidDemo(
  apiBase: string,
  identifier: string,
  password: string
): Promise<LoginResponse> {
  const response = await fetch(`${apiBase}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier, password }),
  });
  return readJson<LoginResponse>(response);
}

export class CfidAgentClient {
  constructor(
    private readonly apiBase: string,
    private getAccessToken: () => string | undefined
  ) {}

  private authHeaders(): HeadersInit {
    const token = this.getAccessToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  private async post<T>(path: string, payload: unknown): Promise<T> {
    const response = await fetch(`${this.apiBase}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.authHeaders(),
      },
      body: JSON.stringify(payload),
    });
    return readJson<T>(response);
  }

  chat(sessionId: string, message: string) {
    return this.post<ChatResponse>('/agent/chat', {
      session_id: sessionId,
      message,
    });
  }

  prepareInvoice(payload: Record<string, unknown>) {
    return this.post<ChatResponse>('/agent/invoice/prepare', payload);
  }

  confirm(actionId: string, confirmationText: string) {
    return this.post<ConfirmResponse>('/agent/confirm', {
      action_id: actionId,
      confirmation_text: confirmationText,
    });
  }

  emailInvoice(uuidFactura: string, correoReceptor: string) {
    return this.post<{ message?: string }>('/agent/invoice/email', {
      uuidFactura,
      correoReceptor,
      asunto: 'Factura electronica',
      mensaje: 'Adjunto encontrara su factura.',
    });
  }

  async pdfLink(uuidFactura: string) {
    const response = await fetch(
      `${this.apiBase}/agent/invoice/pdf-link/${uuidFactura}`,
      { headers: this.authHeaders() }
    );
    return readJson<{ url: string }>(response);
  }
}

export const CONFIRM_PHRASES = new Set([
  'confirmo',
  'confirmo timbrar',
  'si confirmo',
]);

export const INVOICE_INTENT_WORDS = ['factura', 'facturar', 'timbrar', 'cfdi'];

export function isConfirmMessage(message: string) {
  return CONFIRM_PHRASES.has(message.trim().toLowerCase());
}

export function isInvoiceIntent(message: string) {
  const normalized = message.toLowerCase();
  return INVOICE_INTENT_WORDS.some((word) => normalized.includes(word));
}

export function isDownloadIntent(message: string, hasInvoice: boolean) {
  if (!hasInvoice) return false;
  const normalized = message.toLowerCase();
  return ['descargar', 'descarga', 'pdf', 'link'].some((word) =>
    normalized.includes(word)
  );
}

export function extractEmail(message: string) {
  const match = message.match(/[^\s@]+@[^\s@]+\.[^\s@]+/);
  return match ? match[0] : null;
}

export function valueOrDefault(message: string, fallback: string) {
  const normalized = message.trim().toLowerCase();
  if (['demo', 'usar demo', 'igual', 'default', 'por defecto'].includes(normalized)) {
    return fallback;
  }
  return message.trim();
}

export function defaultInvoicePayload() {
  return {
    nombreEmisor: 'INNOVACION VALOR Y DESARROLLO SA',
    rfcEmisor: 'IVD920810GU2',
    codigoPostalEmisor: '58000',
    regimenFiscalEmisor: '601',
    nombreReceptor: 'CESAR OSBALDO CRUZ SOLORZANO',
    rfcReceptor: 'CUSC850516316',
    codigoPostalReceptor: '45638',
    regimenFiscalReceptor: '605',
    conceptos: [
      {
        descripcion: 'Servicio de consultoria IT',
        cantidad: 1,
        unidad: 'SERVICIO',
        claveUnidad: 'E48',
        claveProdServ: '01010101',
        precioUnitario: 1000,
        importe: 1000,
        objetoImp: '02',
        tasaIva: 0.16,
      },
    ],
    metodoPago: 'PUE',
    formaPago: '01',
    usoCFDI: 'G01',
  };
}

export type InvoiceDraft = ReturnType<typeof defaultInvoicePayload>;

export type InvoiceWizardStep =
  | 'nombreReceptor'
  | 'rfcReceptor'
  | 'codigoPostalReceptor'
  | 'regimenFiscalReceptor'
  | 'descripcion'
  | 'precioUnitario'
  | 'usoCFDI'
  | 'formaPago';

export interface InvoiceWizardState {
  step: InvoiceWizardStep;
  draft: InvoiceDraft;
}

export function loadCfidAgentWidgetScript(apiBase: string) {
  const src = `${apiBase.replace(/\/$/, '')}/static/cfid-agent-widget.js`;
  const existing = document.querySelector(`script[data-cfid-agent-widget="${src}"]`);

  if (existing) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.defer = true;
    script.dataset.cfidAgentWidget = src;
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error(`No se pudo cargar ${src}`));
    document.head.appendChild(script);
  });
}

export function setCfidAgentAuth(tokens: {
  accessToken?: string;
  refreshToken?: string;
}) {
  window.CFIDAgent = window.CFIDAgent || {
    setAuth(nextTokens) {
      window.CFIDAgent!.accessToken = nextTokens.accessToken;
      window.CFIDAgent!.refreshToken = nextTokens.refreshToken;
    },
  };
  window.CFIDAgent.setAuth(tokens);
}
