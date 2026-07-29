/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CFID_DEMO_MODE: string;
  readonly VITE_CFID_AGENT_API_BASE: string;
  readonly VITE_CFID_AGENT_SESSION_ID: string;
  readonly VITE_CFID_USE_AEGIS_LOGIN: string;
  readonly VITE_CFID_DEMO_IDENTIFIER: string;
  readonly VITE_CFID_DEMO_PASSWORD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface CFIDAgentAuth {
  accessToken?: string;
  refreshToken?: string;
  setAuth: (tokens: {
    accessToken?: string;
    refreshToken?: string;
  }) => void;
}

interface Window {
  CFIDAgent?: CFIDAgentAuth;
}
