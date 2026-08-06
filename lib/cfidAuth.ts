/** Login y handoff SSO hacia el portal CFID (misma API que el front de facturación). */

export interface CfidUsuario {
  noUsuario: string;
  nombreEmpleado?: string | null;
  nombrePerfil?: string | null;
  idPerfil?: number | null;
  estatusUsuario?: string | null;
  idDfi?: number | null;
  idEstacionamiento?: number | null;
  modificaUbicacion?: string | null;
}

export interface CfidLoginResponse {
  success: boolean;
  message: string;
  token?: string | null;
  refreshToken?: string | null;
  scopes?: string[];
  authProvider?: string;
  usuario?: CfidUsuario | null;
  requiere2FA?: boolean;
  challengeId?: string;
  mensaje2FA?: string;
  twoFactorHabilitado?: boolean;
  invitarActivar2FA?: boolean;
  mustChangePassword?: boolean;
}

export interface CfidSsoPayload {
  v: 1;
  token?: string | null;
  refreshToken?: string | null;
  authProvider?: string;
  scopes?: string[];
  usuario?: CfidUsuario | null;
  mustChangePassword?: boolean;
  twoFactorHabilitado?: boolean;
  invitarActivar2FA?: boolean;
  ts: number;
}

function trimSlash(url: string): string {
  return url.replace(/\/+$/, '');
}

/** Base API CFID, p. ej. https://cfid-api.redcibercom.cloud/api */
export function getCfidApiBase(): string {
  const fromEnv = (import.meta.env.VITE_CFID_API_BASE || '').trim();
  if (fromEnv) return trimSlash(fromEnv);
  return 'https://cfid-api.redcibercom.cloud/api';
}

/** URL del portal CFID donde se recibe el SSO */
export function getCfidAppUrl(): string {
  const fromEnv = (import.meta.env.VITE_CFID_APP_URL || '').trim();
  if (fromEnv) return trimSlash(fromEnv);
  return 'https://cfid.redcibercom.cloud';
}

async function readLoginJson(response: Response): Promise<CfidLoginResponse> {
  let data: CfidLoginResponse | null = null;
  try {
    data = (await response.json()) as CfidLoginResponse;
  } catch {
    throw new Error(
      response.ok
        ? 'Respuesta inválida del servidor.'
        : `No se pudo iniciar sesión (${response.status}).`,
    );
  }

  if (!response.ok) {
    throw new Error(
      data?.message ||
        (response.status === 401
          ? 'Usuario o contraseña incorrectos.'
          : `Error de autenticación (${response.status}).`),
    );
  }

  if (!data?.success && !data?.requiere2FA) {
    throw new Error(data?.message || 'Usuario o contraseña incorrectos.');
  }

  return data;
}

export async function loginCfid(
  usuario: string,
  password: string,
): Promise<CfidLoginResponse> {
  const response = await fetch(`${getCfidApiBase()}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario: usuario.trim(), password }),
  });
  return readLoginJson(response);
}

export async function verifyCfidTwoFactor(
  challengeId: string,
  code: string,
): Promise<CfidLoginResponse> {
  const response = await fetch(`${getCfidApiBase()}/auth/2fa/verify-login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ challengeId, code }),
  });
  return readLoginJson(response);
}

function toBase64Url(json: string): string {
  const bytes = new TextEncoder().encode(json);
  let binary = '';
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/** Construye la URL del portal CFID con la sesión en el hash (no viaja al servidor). */
export function buildCfidSsoRedirectUrl(login: CfidLoginResponse): string {
  const payload: CfidSsoPayload = {
    v: 1,
    token: login.token ?? null,
    refreshToken: login.refreshToken ?? null,
    authProvider: login.authProvider,
    scopes: login.scopes,
    usuario: login.usuario ?? null,
    mustChangePassword: Boolean(login.mustChangePassword),
    twoFactorHabilitado: login.twoFactorHabilitado,
    invitarActivar2FA: login.invitarActivar2FA,
    ts: Date.now(),
  };
  const encoded = toBase64Url(JSON.stringify(payload));
  return `${getCfidAppUrl()}/#cfid_sso=${encoded}`;
}

export function redirectToCfidWithSession(login: CfidLoginResponse): void {
  window.location.assign(buildCfidSsoRedirectUrl(login));
}
