import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { Bot, Construction, Loader2, RefreshCw, Send, Sparkles, Wifi, WifiOff } from 'lucide-react';
import { useCfidAgentChat } from '../hooks/useCfidAgentChat';
import { useCfidAgentDemoChat } from '../hooks/useCfidAgentDemoChat';
import { useCfidAgentSession } from '../context/CfidAgentProvider';

interface CfidAgentChatPanelProps {
  embedded?: boolean;
  title?: string;
  subtitle?: string;
  className?: string;
}

const LIVE_INITIAL_MESSAGE =
  'Asistente de demostración disponible. Describe lo que deseas facturar o usa el chat libre. Para continuar con el flujo, escribe: Confirmo timbrar.';

const CfidAgentChatPanel: React.FC<CfidAgentChatPanelProps> = ({
  embedded = true,
  title = 'Asistente CFID',
  subtitle,
  className = '',
}) => {
  const {
    config,
    client,
    connectionState,
    connectionMessage,
    isReady,
    isConfigured,
    isDemoMode,
    refreshSession,
  } = useCfidAgentSession();

  const resolvedSubtitle =
    subtitle ??
    (isDemoMode
      ? 'Vista previa del asistente de IA. Funcionalidad en desarrollo.'
      : 'Demo en vivo · MCP + Groq');

  const liveChat = useCfidAgentChat({
    client,
    sessionId: config.sessionId,
    enabled: isReady && !isDemoMode,
    initialMessage: LIVE_INITIAL_MESSAGE,
  });

  const demoChat = useCfidAgentDemoChat();

  const { messages, isSending, pendingAction, sendMessage } = isDemoMode
    ? demoChat
    : liveChat;

  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSending]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const message = input.trim();
    if (!message) return;
    setInput('');
    await sendMessage(message);
  };

  const handleRefresh = () => {
    if (isDemoMode) {
      demoChat.resetConversation();
      return;
    }
    void refreshSession();
  };

  const statusColor = isDemoMode
    ? 'text-brand-tech'
    : connectionState === 'ready'
      ? 'text-green-400'
      : connectionState === 'checking'
        ? 'text-yellow-400'
        : 'text-slate-500';

  const canSend = isDemoMode ? !isSending : isReady && !isSending;

  return (
    <div
      className={`bg-brand-blue/90 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col ${
        embedded ? 'min-h-[520px]' : 'min-h-[620px]'
      } ${className}`}
    >
      <div className="bg-brand-surface/80 px-4 py-3 border-b border-slate-700 flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <Bot className="w-4 h-4 text-brand-primary" />
            <h3 className="text-sm font-semibold text-white">{title}</h3>
            {isDemoMode && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide bg-brand-primary/15 text-brand-primary border border-brand-primary/30">
                <Construction className="w-3 h-3" />
                En desarrollo
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">{resolvedSubtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRefresh}
            className="p-1.5 rounded-md border border-slate-600 text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
            title={isDemoMode ? 'Reiniciar demo' : 'Reconectar'}
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          {isDemoMode ? (
            <Sparkles className={`w-4 h-4 ${statusColor}`} />
          ) : connectionState === 'ready' ? (
            <Wifi className={`w-4 h-4 ${statusColor}`} />
          ) : (
            <WifiOff className={`w-4 h-4 ${statusColor}`} />
          )}
        </div>
      </div>

      <div className="px-4 py-2 border-b border-slate-800 bg-brand-dark/40">
        <p className={`text-[11px] ${statusColor}`}>{connectionMessage}</p>
        {isDemoMode ? (
          <p className="text-[11px] text-slate-500 mt-1">
            Simula el flujo de facturación sin API keys ni conexión al backend.
            Para una demo en vivo con timbrado real,{' '}
            <a href="#contacto" className="text-brand-primary hover:underline">
              contáctanos
            </a>
            .
          </p>
        ) : (
          !isConfigured && (
            <p className="text-[11px] text-slate-500 mt-1">
              Copia `.env.example` a `.env`, levanta IACFID en `:8088` y usa
              `AGENT_REQUIRE_AUTH=false` en el backend.
            </p>
          )
        )}
        {pendingAction && (
          <p className="text-[11px] text-brand-primary mt-1">
            Acción pendiente: escribe <strong>Confirmo timbrar</strong> para{' '}
            {isDemoMode ? 'simular' : 'ejecutar'}.
          </p>
        )}
      </div>

      <div className="flex-1 px-4 py-3 space-y-3 overflow-y-auto bg-brand-dark/30">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap ${
                message.role === 'user'
                  ? 'bg-brand-primary text-white rounded-br-sm'
                  : message.role === 'error'
                    ? 'bg-red-500/10 text-red-300 border border-red-500/20 rounded-bl-sm'
                    : 'bg-brand-surface text-slate-200 border border-slate-700 rounded-bl-sm'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}

        {isSending && (
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Loader2 className="w-4 h-4 animate-spin text-brand-primary" />
            {isDemoMode ? 'Simulando respuesta...' : 'Procesando con MCP...'}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="px-4 py-3 border-t border-slate-700 bg-brand-surface/50 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={
            canSend
              ? 'Ej. Quiero facturar · Confirmo timbrar'
              : 'Conecta el orquestador para probar'
          }
          disabled={!canSend}
          className="flex-1 bg-brand-dark border border-slate-600 rounded-full px-4 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-primary disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!canSend || !input.trim()}
          className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center text-white hover:bg-brand-accent transition-colors disabled:opacity-40"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export default CfidAgentChatPanel;
