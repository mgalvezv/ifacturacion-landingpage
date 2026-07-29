import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  CfidAgentApiError,
  CfidAgentClient,
  checkCfidAgentHealth,
  getCfidAgentConfig,
  hasCfidAgentConfig,
  isCfidDemoMode,
  loginCfidDemo,
  setCfidAgentAuth,
  type CfidAgentConfig,
} from '../lib/cfidAgent';

export type CfidAgentConnectionState =
  | 'idle'
  | 'checking'
  | 'ready'
  | 'offline'
  | 'error';

interface CfidAgentContextValue {
  config: CfidAgentConfig;
  client: CfidAgentClient | null;
  connectionState: CfidAgentConnectionState;
  connectionMessage: string;
  isReady: boolean;
  isConfigured: boolean;
  isDemoMode: boolean;
  refreshSession: () => Promise<boolean>;
}

const CfidAgentContext = createContext<CfidAgentContextValue | null>(null);

let sharedInitPromise: Promise<{
  accessToken?: string;
  message: string;
}> | null = null;
let sharedInitKey = '';

async function initializeOnce(config: CfidAgentConfig) {
  const key = [
    config.apiBase,
    config.useAegisLogin,
    config.demoIdentifier,
  ].join('|');

  if (sharedInitPromise && sharedInitKey === key) {
    return sharedInitPromise;
  }

  sharedInitKey = key;
  sharedInitPromise = (async () => {
    const health = await checkCfidAgentHealth(config.apiBase);
    if (health.status !== 'ok') {
      throw new Error('El orquestador no respondió correctamente.');
    }

    if (
      config.useAegisLogin &&
      config.demoIdentifier &&
      config.demoPassword
    ) {
      const login = await loginCfidDemo(
        config.apiBase,
        config.demoIdentifier,
        config.demoPassword
      );
      setCfidAgentAuth({
        accessToken: login.access_token,
        refreshToken: login.refresh_token,
      });
      return {
        accessToken: login.access_token,
        message: `Orquestador listo (${health.env}, MCP ${health.mcp}). Modo Aegis.`,
      };
    }

    setCfidAgentAuth({});
    return {
      accessToken: undefined,
      message: `Orquestador listo (${health.env}, MCP ${health.mcp}, auth ${health.auth_mode || 'open'}).`,
    };
  })();

  return sharedInitPromise;
}

export const CfidAgentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const config = useMemo(() => getCfidAgentConfig(), []);
  const demoMode = useMemo(() => isCfidDemoMode(config), [config]);
  const [connectionState, setConnectionState] =
    useState<CfidAgentConnectionState>(demoMode ? 'ready' : 'idle');
  const [connectionMessage, setConnectionMessage] = useState(
    demoMode
      ? 'Vista previa interactiva — asistente MCP en desarrollo.'
      : ''
  );
  const [accessToken, setAccessToken] = useState<string | undefined>();
  const mountedRef = useRef(true);

  const refreshSession = useCallback(async () => {
    if (demoMode) {
      setConnectionState('ready');
      setConnectionMessage(
        'Vista previa interactiva — asistente MCP en desarrollo.'
      );
      setAccessToken(undefined);
      setCfidAgentAuth({});
      return true;
    }

    if (!hasCfidAgentConfig(config)) {
      setConnectionState('offline');
      setConnectionMessage(
        'Configura VITE_CFID_AGENT_API_BASE en .env (ej. http://localhost:8088).'
      );
      setAccessToken(undefined);
      setCfidAgentAuth({});
      sharedInitPromise = null;
      return false;
    }

    setConnectionState('checking');
    setConnectionMessage('Conectando con el orquestador CFID...');

    try {
      const result = await initializeOnce(config);
      if (!mountedRef.current) return true;

      setAccessToken(result.accessToken);
      setConnectionState('ready');
      setConnectionMessage(result.message);
      return true;
    } catch (error) {
      if (!mountedRef.current) return false;

      const message =
        error instanceof CfidAgentApiError
          ? error.message
          : error instanceof Error
            ? error.message
            : 'No fue posible conectar al orquestador.';

      setAccessToken(undefined);
      setCfidAgentAuth({});
      setConnectionState('error');
      setConnectionMessage(message);
      sharedInitPromise = null;
      return false;
    }
  }, [config, demoMode]);

  useEffect(() => {
    mountedRef.current = true;
    if (!demoMode) {
      void refreshSession();
    }
    return () => {
      mountedRef.current = false;
    };
  }, [demoMode, refreshSession]);

  const client = useMemo(
    () =>
      !demoMode && hasCfidAgentConfig(config)
        ? new CfidAgentClient(config.apiBase, () => accessToken)
        : null,
    [accessToken, config, demoMode]
  );

  const value = useMemo<CfidAgentContextValue>(
    () => ({
      config,
      client,
      connectionState,
      connectionMessage,
      refreshSession,
      isDemoMode: demoMode,
      isReady: demoMode || (connectionState === 'ready' && Boolean(client)),
      isConfigured: !demoMode && hasCfidAgentConfig(config),
    }),
    [
      client,
      config,
      connectionMessage,
      connectionState,
      demoMode,
      refreshSession,
    ]
  );

  return (
    <CfidAgentContext.Provider value={value}>{children}</CfidAgentContext.Provider>
  );
};

export function useCfidAgentSession(): CfidAgentContextValue {
  const context = useContext(CfidAgentContext);
  if (!context) {
    throw new Error('useCfidAgentSession debe usarse dentro de CfidAgentProvider');
  }
  return context;
}
