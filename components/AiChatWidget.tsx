// src/components/AiChatWidget.tsx
import React, { useEffect, useRef, useState } from 'react';
import { X, Mic, Send } from 'lucide-react';

type Sender = 'user' | 'agent';

interface Message {
  id: number;
  sender: Sender;
  text: string;
}

interface AiChatWidgetProps {
  onClose?: () => void;
}

const INITIAL_MESSAGE: Message = {
  id: 1,
  sender: 'agent',
  text: '¡Hola! Soy el asistente de IFacturación. Puedo ayudarte a generar, revisar o explicar tus CFDI. ¿Por dónde empezamos?',
};

const AiChatWidget: React.FC<AiChatWidgetProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);   // para animar entrada/salida

  const nextId = useRef(2);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // disparar animación de entrada
    const t = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: Message = {
      id: nextId.current++,
      sender: 'user',
      text: trimmed,
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsThinking(true);

    // Simulación respuesta IA
    setTimeout(() => {
      const reply: Message = {
        id: nextId.current++,
        sender: 'agent',
        text: 'He recibido tu mensaje. Estamos trabajando en la IA real 😉',
      };
      setMessages(prev => [...prev, reply]);
      setIsThinking(false);
    }, 900 + Math.random() * 800);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCloseClick = () => {
    // animar salida primero
    setIsVisible(false);
    // esperar a que termine la transición (duración 250ms)
    setTimeout(() => {
      onClose?.();
    }, 250);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-end pointer-events-none sm:items-end">
      <div
        className={`
          pointer-events-auto m-4 w-full max-w-md
          transform origin-bottom-right
          transition-transform transition-opacity duration-250
          ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0 translate-y-2'}
        `}
      >
        <div className="bg-slate-900/80 border border-white/10 rounded-3xl shadow-2xl backdrop-blur-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-slate-900/70">
            <div>
              <div className="text-sm font-semibold text-brand-primary">
                IFacturación AI
              </div>
              <div className="text-[11px] text-slate-400">
                Asistente inteligente para CFDI 4.0
              </div>
            </div>
            <button
              type="button"
              onClick={handleCloseClick}
              className="p-1.5 rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Mensajes */}
          <div className="flex-1 px-4 py-3 space-y-3 overflow-y-auto max-h-[50vh] sm:max-h-[420px]">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex items-end ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'agent' && (
                  <div className="mr-2 flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-brand-primary to-brand-accent text-[11px] font-semibold flex items-center justify-center text-white shadow-lg">
                    AI
                  </div>
                )}

                <div
                  className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm leading-relaxed shadow-md ${
                    msg.sender === 'user'
                      ? 'bg-brand-primary text-white rounded-br-sm'
                      : 'bg-slate-800/80 text-slate-100 rounded-bl-sm border border-white/5'
                  }`}
                >
                  {msg.text}
                </div>

                {msg.sender === 'user' && (
                  <div className="ml-2 flex-shrink-0 w-8 h-8 rounded-full bg-slate-700 text-[11px] font-semibold flex items-center justify-center text-white shadow-lg">
                    Tú
                  </div>
                )}
              </div>
            ))}

            {isThinking && (
              <div className="flex items-center justify-start gap-2 text-xs text-slate-400">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center text-[10px] text-white shadow-lg">
                  AI
                </div>
                <div className="bg-slate-800/80 rounded-2xl rounded-bl-sm px-3 py-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-pulse [animation-delay:0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 animate-pulse [animation-delay:0.3s]" />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-white/10 bg-slate-900/80 flex items-center gap-2">
            <button
              type="button"
              className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-primary/70 to-brand-accent/70 flex items-center justify-center text-white shadow-lg text-xs hover:from-brand-primary hover:to-brand-accent transition-all"
            >
              <Mic className="w-4 h-4" />
            </button>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe lo que necesitas facturar..."
              className="flex-1 bg-slate-900/60 border border-white/10 rounded-full px-4 py-2 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary"
            />
            <button
              type="button"
              onClick={handleSend}
              className="w-9 h-9 rounded-full bg-brand-primary flex items-center justify-center text-white shadow-lg hover:bg-brand-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={!input.trim()}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiChatWidget;
