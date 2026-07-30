import React, { useEffect, useRef, useState } from 'react';
import { X, ImageIcon, Play } from 'lucide-react';
import { FeatureItem } from '../lib/features';

interface FeatureDetailModalProps {
  feature: FeatureItem;
  onClose: () => void;
}

const FOCUSABLE =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

const FeatureDetailModal: React.FC<FeatureDetailModalProps> = ({
  feature,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setIsVisible(false);
    window.setTimeout(onClose, 200);
  };

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsVisible(true));
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter((el) => !el.hasAttribute('disabled'));

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="feature-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm"
        aria-label="Cerrar modal"
        onClick={handleClose}
      />

      <div
        ref={panelRef}
        className={`relative w-full max-w-5xl bg-brand-surface border border-slate-700 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-200 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="flex items-start justify-between gap-4 p-5 sm:p-6 border-b border-slate-700">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 bg-brand-blue rounded-lg flex items-center justify-center border border-slate-700 shrink-0">
              {feature.icon}
            </div>
            <h2
              id="feature-modal-title"
              className="text-xl sm:text-2xl font-bold text-white truncate"
            >
              {feature.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-brand-dark border border-slate-600 text-slate-300 hover:text-white hover:border-brand-primary transition-colors shrink-0"
            aria-label="Cerrar"
          >
            <X className="w-4 h-4 mx-auto" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row max-h-[75vh] lg:max-h-[70vh]">
          <div className="flex-1 p-5 sm:p-6 lg:p-8 overflow-y-auto space-y-5 border-b lg:border-b-0 lg:border-r border-slate-700">
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              {feature.detailedDescription}
            </p>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Características
              </h3>
              <ul className="space-y-2.5">
                {feature.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-slate-400"
                  >
                    <span className="text-brand-primary mt-0.5 shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:w-[42%] p-5 sm:p-6 lg:p-8 flex items-center justify-center bg-brand-dark/30 shrink-0">
            <div className="w-full rounded-xl border border-dashed border-slate-600 bg-brand-dark/50 p-8 sm:p-10 text-center min-h-[200px] lg:min-h-[280px] flex flex-col items-center justify-center">
              <div className="flex justify-center gap-3 mb-4 text-slate-500">
                <ImageIcon size={32} />
                <Play size={32} />
              </div>
              <p className="text-sm text-slate-500 max-w-xs">
                Captura o video demostrativo próximamente
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureDetailModal;
