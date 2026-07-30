import React, { useEffect, useRef, useState } from 'react';

import { X, CreditCard, ArrowRight } from 'lucide-react';



export interface PlanSummary {

  name: string;

  price: string;

  period: string;

  description: string;

  features: string[];

}



interface PlanCheckoutModalProps {

  plan: PlanSummary;

  onClose: () => void;

}



const FOCUSABLE =

  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';



const StripeIcon = () => (

  <svg viewBox="0 0 60 25" className="h-6 w-auto" aria-hidden="true">

    <path

      fill="#635BFF"

      d="M59.64 14.28h-8.06c0 1.68-.84 2.52-2.52 2.52-1.47 0-2.31-.63-2.31-1.68 0-1.05.84-1.68 2.52-2.1l4.2-1.05c3.78-.84 5.67-2.73 5.67-5.67 0-3.57-2.94-5.88-7.56-5.88-4.41 0-7.35 2.31-7.77 5.88h7.77c0-1.26.84-1.89 2.1-1.89 1.26 0 2.1.63 2.1 1.68 0 1.05-.84 1.68-2.52 2.1l-4.2 1.05c-3.78.84-5.67 2.73-5.67 5.67 0 3.57 2.94 5.88 7.56 5.88 4.62 0 7.56-2.31 7.98-5.88zM40.32 0H32.1v18.9h8.22V0zM25.2 0c-4.62 0-7.56 2.31-7.56 5.88 0 3.57 2.94 5.88 7.56 5.88 1.68 0 3.15-.42 4.41-1.05V8.4c-1.26.63-2.73 1.05-4.41 1.05-1.47 0-2.31-.63-2.31-1.68 0-1.05.84-1.68 2.31-1.68 1.68 0 3.15.42 4.41 1.05V0H25.2zM0 12.6c0-3.57 2.94-5.88 7.56-5.88 4.62 0 7.56 2.31 7.56 5.88 0 3.57-2.94 5.88-7.56 5.88C2.94 18.48 0 16.17 0 12.6z"

    />

  </svg>

);



const MercadoPagoIcon = () => (

  <svg viewBox="0 0 120 32" className="h-7 w-auto" aria-hidden="true">

    <rect width="120" height="32" rx="6" fill="#009EE3" />

    <path

      fill="#fff"

      d="M18 10c-2.2 0-4 1.8-4 4v4c0 2.2 1.8 4 4 4h2v-2h-2c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h2v-2h-2zm8 0v12h2V10h-2zm10 0c-2.2 0-4 1.8-4 4v4c0 2.2 1.8 4 4 4s4-1.8 4-4v-4c0-2.2-1.8-4-4-4zm0 2c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2s-2-.9-2-2v-4c0-1.1.9-2 2-2zm14-2v12h2v-4h4v-2h-4v-2h5V10h-7zm16 0l-4 12h2.2l.8-2.4h4.8l.8 2.4H74l-4-12h-2zm2.4 3.2l1.6 4.8h-3.2l1.6-4.8zM82 10v12h2V10h-2zm8 0c-2.2 0-4 1.8-4 4v4c0 2.2 1.8 4 4 4h6v-2h-6c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h6v-2h-6z"

    />

  </svg>

);



const PayPalIcon = () => (

  <svg viewBox="0 0 100 26" className="h-6 w-auto" aria-hidden="true">

    <path

      fill="#003087"

      d="M12.5 2.5h8.5c4.2 0 7 2.8 6.2 7-.6 3.5-3 5.8-6.5 5.8h-3.5l-1.2 7.5H7l3.5-20.3z"

    />

    <path

      fill="#009CDE"

      d="M35 2.5h8.5c4.2 0 7 2.8 6.2 7-.6 3.5-3 5.8-6.5 5.8h-3.5l-1.2 7.5H29.5L35 2.5z"

    />

    <path

      fill="#012169"

      d="M57.5 2.5H66c4.2 0 7 2.8 6.2 7-.6 3.5-3 5.8-6.5 5.8H62l-1.2 7.5H52L57.5 2.5z"

    />

  </svg>

);



const OxxoPayIcon = () => (

  <svg viewBox="0 0 80 28" className="h-6 w-auto" aria-hidden="true">

    <rect width="80" height="28" rx="4" fill="#E30613" />

    <text

      x="40"

      y="19"

      textAnchor="middle"

      fill="#fff"

      fontSize="11"

      fontWeight="bold"

      fontFamily="Arial, sans-serif"

    >

      OXXO Pay

    </text>

  </svg>

);



const PAYMENT_METHODS = [

  { id: 'stripe', label: 'Stripe', icon: StripeIcon },

  { id: 'mercadopago', label: 'Mercado Pago', icon: MercadoPagoIcon },

  { id: 'paypal', label: 'PayPal', icon: PayPalIcon },

  { id: 'oxxopay', label: 'OXXO Pay', icon: OxxoPayIcon },

] as const;



const PlanCheckoutModal: React.FC<PlanCheckoutModalProps> = ({ plan, onClose }) => {

  const [isVisible, setIsVisible] = useState(false);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const panelRef = useRef<HTMLDivElement>(null);

  const toastTimerRef = useRef<number | null>(null);



  const handleClose = () => {

    setIsVisible(false);

    window.setTimeout(onClose, 200);

  };



  const showComingSoon = (methodLabel: string) => {

    setToastMessage(`Pago con ${methodLabel}: próximamente`);

    if (toastTimerRef.current) {

      window.clearTimeout(toastTimerRef.current);

    }

    toastTimerRef.current = window.setTimeout(() => {

      setToastMessage(null);

      toastTimerRef.current = null;

    }, 3000);

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

      if (toastTimerRef.current) {

        window.clearTimeout(toastTimerRef.current);

      }

    };

  }, [onClose]);



  const subtotal = plan.price === 'Cotizar' ? 'A cotizar' : plan.price;



  return (

    <div

      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"

      role="dialog"

      aria-modal="true"

      aria-labelledby="plan-checkout-title"

    >

      <button

        type="button"

        className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm"

        aria-label="Cerrar resumen de compra"

        onClick={handleClose}

      />



      <div

        ref={panelRef}

        className={`relative w-full max-w-5xl bg-brand-surface border border-slate-700 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-200 ${

          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'

        }`}

      >

        <div className="p-5 sm:p-6 border-b border-slate-700 flex items-center justify-between">

          <div className="flex items-center gap-2">

            <CreditCard className="w-5 h-5 text-brand-primary" />

            <h2 id="plan-checkout-title" className="text-lg sm:text-xl font-bold text-white">

              Resumen de compra

            </h2>

          </div>

          <button

            type="button"

            onClick={handleClose}

            className="w-8 h-8 rounded-full bg-brand-dark border border-slate-600 text-slate-300 hover:text-white hover:border-brand-primary transition-colors"

            aria-label="Cerrar"

          >

            <X className="w-4 h-4 mx-auto" />

          </button>

        </div>



        <div className="flex flex-col lg:flex-row max-h-[80vh]">

          <div className="flex-1 p-5 sm:p-6 lg:p-8 overflow-y-auto border-b lg:border-b-0 lg:border-r border-slate-700 space-y-5">

            <div className="rounded-xl bg-brand-dark/60 border border-slate-700 p-5">

              <div className="flex justify-between items-start gap-4 mb-3">

                <div>

                  <p className="text-white font-bold text-lg">{plan.name}</p>

                  <p className="text-sm text-slate-500 mt-1">{plan.description}</p>

                </div>

                <div className="text-right shrink-0">

                  <p className="text-2xl sm:text-3xl font-extrabold text-white">{subtotal}</p>

                  {plan.period && (

                    <p className="text-xs text-slate-500">{plan.period}</p>

                  )}

                </div>

              </div>

              <ul className="space-y-2 border-t border-slate-700 pt-4">

                {plan.features.map((f) => (

                  <li key={f} className="text-sm text-slate-400 flex items-start gap-2">

                    <span className="text-brand-primary shrink-0">✓</span>

                    {f}

                  </li>

                ))}

              </ul>

            </div>



            <a

              href="#contacto"

              onClick={handleClose}

              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-bold text-sm bg-brand-primary text-white hover:bg-brand-accent transition-all shadow-lg shadow-brand-primary/20"

            >

              Solicitar plan por contacto

              <ArrowRight className="w-4 h-4" />

            </a>

          </div>



          <div className="lg:w-[44%] p-5 sm:p-6 lg:p-8 bg-brand-dark/30 space-y-4">

            <div>

              <h3 className="text-sm font-bold text-white mb-1">Forma de pago</h3>

              <p className="text-xs text-slate-500 mb-4">

                Elige tu método preferido. La integración estará disponible pronto.

              </p>

            </div>



            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

              {PAYMENT_METHODS.map(({ id, label, icon: Icon }) => (

                <button

                  key={id}

                  type="button"

                  onClick={() => showComingSoon(label)}

                  className="flex items-center justify-center gap-3 p-4 rounded-xl bg-brand-surface border border-slate-700 hover:border-brand-primary/50 hover:bg-brand-surface/80 transition-all focus:outline-none focus:ring-2 focus:ring-brand-primary/50"

                  aria-label={`Pagar con ${label}`}

                >

                  <Icon />

                </button>

              ))}

            </div>



            <p className="text-xs text-slate-500 text-center pt-2">

              Los pagos en línea estarán disponibles próximamente.

            </p>

          </div>

        </div>



        {toastMessage && (

          <div

            role="status"

            aria-live="polite"

            className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2.5 rounded-lg bg-brand-dark border border-brand-primary/40 text-sm font-medium text-white shadow-xl transition-opacity duration-200"

          >

            {toastMessage}

          </div>

        )}

      </div>

    </div>

  );

};



export default PlanCheckoutModal;


