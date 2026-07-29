import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import CfidAgentChatPanel from './CfidAgentChatPanel';

interface CfidAgentFloatingChatProps {
  onClose?: () => void;
}

const CfidAgentFloatingChat: React.FC<CfidAgentFloatingChatProps> = ({
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    window.setTimeout(() => onClose?.(), 250);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end pointer-events-none sm:items-end">
      <div
        className={`pointer-events-auto m-4 w-full max-w-md transform origin-bottom-right transition-all duration-250 ${
          isVisible
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-95 translate-y-2'
        }`}
      >
        <div className="relative">
          <button
            type="button"
            onClick={handleClose}
            className="absolute -top-3 -right-3 z-20 w-8 h-8 rounded-full bg-brand-surface border border-slate-600 text-slate-300 hover:text-white hover:border-brand-primary transition-colors shadow-lg"
            aria-label="Cerrar asistente"
          >
            <X className="w-4 h-4 mx-auto" />
          </button>
          <CfidAgentChatPanel
            embedded={false}
            title="Asistente CFID"
          />
        </div>
      </div>
    </div>
  );
};

export default CfidAgentFloatingChat;
