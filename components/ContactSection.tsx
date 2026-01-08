import React from 'react';
import FadeIn from './FadeIn';
import { Send, Mail, MapPin, Phone } from 'lucide-react';
import MagicCard from './MagicCard'; 
import LinesBackground from './LinesBackground';

const ContactSection: React.FC = () => {
  return (
    <div className="py-24 border-t border-slate-800 relative">
         {/* Background lines */}
      <LinesBackground
        className="absolute inset-0 z-0 opacity-40"
        canvasOpacity={0.8}
      />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12">

          {/* Columna izquierda: info de contacto */}
          <FadeIn>
            <h2 className="text-3xl font-bold text-white mb-6">Contáctanos</h2>
            <p className="text-slate-400 mb-8">
              ¿Tienes dudas sobre los planes o necesitas una solución a medida? Nuestro equipo comercial está listo para asesorarte.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-slate-300">
                <div className="w-10 h-10 rounded bg-brand-surface flex items-center justify-center text-brand-primary shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase">Email</div>
                  <div className="font-medium">contacto@redcibercom.com.mx</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-slate-300">
                <div className="w-10 h-10 rounded bg-brand-surface flex items-center justify-center text-brand-primary shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase">Teléfono</div>
                  <div className="font-medium">+52 55 5752 6963</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-slate-300">
                <div className="w-10 h-10 rounded bg-brand-surface flex items-center justify-center text-brand-primary shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase">Oficinas</div>
                  <div className="font-medium">La fragua @13, col Tabacalera</div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Columna derecha: formulario con MagicCard */}
          <FadeIn delay={200}>
            <MagicCard className="h-full">
              <div className="bg-brand-surface p-8 rounded-2xl shadow-xl relative z-10 h-full">
                <form>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">
                        Nombre
                      </label>
                      <input
                        type="text"
                        className="w-full bg-brand-dark border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-brand-primary focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">
                        Empresa
                      </label>
                      <input
                        type="text"
                        className="w-full bg-brand-dark border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-brand-primary focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full bg-brand-dark border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-brand-primary focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">
                      Mensaje
                    </label>
                    <textarea
                      rows={4}
                      className="w-full bg-brand-dark border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-brand-primary focus:outline-none transition-colors"
                    ></textarea>
                  </div>

                  <button className="w-full bg-brand-primary hover:bg-brand-accent text-white font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/20">
                    Enviar Mensaje <Send size={16} />
                  </button>
                </form>
              </div>
            </MagicCard>
          </FadeIn>

        </div>
      </div>
    </div>
  );
};

export default ContactSection;
