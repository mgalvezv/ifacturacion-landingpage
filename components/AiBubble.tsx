// src/components/AiBubble.tsx
import React from 'react';

interface AiBubbleProps {
  onClick?: () => void;
  className?: string;
  isActive?: boolean;
}

const AiBubble: React.FC<AiBubbleProps> = ({
  onClick,
  className = '',
  isActive = false,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`ai-bubble-root fixed bottom-6 right-6 z-50 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-primary/70 focus:ring-offset-2 focus:ring-offset-brand-dark transition-transform hover:scale-105 ${className}`}
    >
      <div className="ai-bubble">
        {/* AQUÍ va el contenedor correcto */}
        <div className={`ai-bubble-container ${isActive ? 'ai-active' : ''}`}>
          <div className="ai-bubble-c ai-bubble-c4" />
          <div className="ai-bubble-c ai-bubble-c1" />
          <div className="ai-bubble-c ai-bubble-c2" />
          <div className="ai-bubble-c ai-bubble-c3" />

          <div className="ai-bubble-rings" />
        </div>

        <div className="ai-bubble-glass" />
      </div>
    </button>
  );
};

export default AiBubble;
