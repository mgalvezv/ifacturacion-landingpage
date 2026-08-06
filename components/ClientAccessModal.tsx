import React, { useEffect, useRef, useState } from 'react';
import { X, LogIn, ShieldCheck, Loader2 } from 'lucide-react';
import {
  loginCfid,
  redirectToCfidWithSession,
  verifyCfidTwoFactor,
  type CfidLoginResponse,
} from '../lib/cfidAuth';

interface ClientAccessModalProps {
  open: boolean;
  onClose: () => void;
}

const FOCUSABLE =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

const ClientAccessModal: React.FC<ClientAccessModalProps> = ({ open, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [challengeId, setChallengeId] = useState<string | null>(null);
  const [twoFactorMessage, setTwoFactorMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const resetForm = () => {
    setUsuario('');
    setPassword('');
    setTwoFactorCode('');
    setChallengeId(null);
    setTwoFactorMessage('');
    setError('');
    setLoading(false);
  };

  const handleClose = () => {
    setIsVisible(false);
    window.setTimeout(() => {
      resetForm();
      onClose();
    }, 180);
  };

  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() => setIsVisible(true));
    document.body.style.overflow = 'hidden';

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;
      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
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

    window.addEventListener('keydown', onKey);
    window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>('input')?.focus();
    }, 50);

    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (!open) return null;

  const enterCfid = (response: CfidLoginResponse) => {
    setLoading(true);
    redirectToCfidWithSession(response);
  };

  const onSubmitLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await loginCfid(usuario, password);
      if (response.requiere2FA && response.challengeId) {
        setChallengeId(response.challengeId);
        setTwoFactorMessage(
          response.mensaje2FA ||
            'Ingresa el código de 6 dígitos de tu app de autenticación.',
        );
        setTwoFactorCode('');
        return;
      }
      enterCfid(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo iniciar sesión.');
      setLoading(false);
    }
  };

  const onSubmitTwoFactor = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!challengeId) {
      setError('La verificación expiró. Vuelve a iniciar sesión.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const response = await verifyCfidTwoFactor(challengeId, twoFactorCode);
      enterCfid(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Código inválido.');
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="client-access-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-brand-dark/85 backdrop-blur-sm"
        aria-label="Cerrar"
        onClick={handleClose}
      />

      <div
        ref={panelRef}
        className={`relative w-full max-w-md bg-brand-surface border border-slate-700 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-200 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="flex items-start justify-between gap-3 p-5 border-b border-slate-700">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-brand-primary/15 border border-brand-primary/30 flex items-center justify-center shrink-0">
              {challengeId ? (
                <ShieldCheck className="w-5 h-5 text-brand-primary" />
              ) : (
                <LogIn className="w-5 h-5 text-brand-primary" />
              )}
            </div>
            <div className="min-w-0">
              <h2 id="client-access-title" className="text-lg font-bold text-white">
                {challengeId ? 'Verificación en dos pasos' : 'Acceso clientes'}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {challengeId
                  ? 'Confirma tu identidad para entrar a CFID'
                  : 'Inicia sesión y entra directo al sistema'}
              </p>
            </div>
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

        <div className="p-5 sm:p-6">
          {!challengeId ? (
            <form onSubmit={onSubmitLogin} className="space-y-4">
              <div>
                <label
                  htmlFor="cfid-usuario"
                  className="block text-sm font-medium text-slate-300 mb-1.5"
                >
                  Usuario
                </label>
                <input
                  id="cfid-usuario"
                  name="usuario"
                  autoComplete="username"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  required
                  className="w-full rounded-lg border border-slate-600 bg-brand-dark px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-primary/60"
                  placeholder="Tu usuario CFID"
                />
              </div>
              <div>
                <label
                  htmlFor="cfid-password"
                  className="block text-sm font-medium text-slate-300 mb-1.5"
                >
                  Contraseña
                </label>
                <input
                  id="cfid-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-lg border border-slate-600 bg-brand-dark px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-primary/60"
                  placeholder="Tu contraseña"
                />
              </div>

              {error && (
                <p className="text-sm text-red-400 text-center" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading || !usuario.trim() || !password}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-brand-primary hover:bg-brand-accent disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3 text-sm transition-colors shadow-[0_0_18px_rgba(249,115,22,0.25)]"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Validando…
                  </>
                ) : (
                  'Entrar a CFID'
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={onSubmitTwoFactor} className="space-y-4">
              <p className="text-sm text-slate-400 text-center">{twoFactorMessage}</p>
              <div>
                <label
                  htmlFor="cfid-2fa"
                  className="block text-sm font-medium text-slate-300 mb-1.5"
                >
                  Código de 6 dígitos
                </label>
                <input
                  id="cfid-2fa"
                  name="twoFactorCode"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  value={twoFactorCode}
                  onChange={(e) =>
                    setTwoFactorCode(e.target.value.replace(/\D/g, '').slice(0, 6))
                  }
                  required
                  maxLength={6}
                  className="w-full rounded-lg border border-slate-600 bg-brand-dark px-3 py-2.5 text-sm text-white tracking-[0.35em] text-center placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-primary/60"
                  placeholder="••••••"
                />
              </div>

              {error && (
                <p className="text-sm text-red-400 text-center" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading || twoFactorCode.length !== 6}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-brand-primary hover:bg-brand-accent disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3 text-sm transition-colors"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Verificando…
                  </>
                ) : (
                  'Continuar'
                )}
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={() => {
                  setChallengeId(null);
                  setTwoFactorCode('');
                  setError('');
                }}
                className="w-full rounded-lg border border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 py-2.5 text-sm transition-colors"
              >
                Volver
              </button>
            </form>
          )}

          <p className="mt-5 text-[11px] text-slate-500 text-center leading-relaxed">
            Al iniciar sesión, te redirigiremos al sistema de facturación sin solicitar
            nuevamente tus credenciales.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClientAccessModal;
