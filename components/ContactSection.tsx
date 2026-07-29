import React, { FormEvent, useState } from 'react';
import FadeIn from './FadeIn';
import { Send, Mail, MapPin, Phone } from 'lucide-react';
import MagicCard from './MagicCard';
import LinesBackground from './LinesBackground';

const CONTACT_EMAIL = 'contacto@redcibercom.com.mx';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    email: '',
    mensaje: '',
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = encodeURIComponent(
      `Contacto CFID${formData.empresa ? ` - ${formData.empresa}` : ''}`
    );
    const body = encodeURIComponent(
      [
        `Nombre: ${formData.nombre}`,
        `Empresa: ${formData.empresa || 'No especificada'}`,
        `Email: ${formData.email}`,
        '',
        'Mensaje:',
        formData.mensaje,
      ].join('\n')
    );

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="py-24 border-t border-slate-800 relative overflow-hidden">
      <LinesBackground
        className="absolute inset-0 z-0 opacity-40"
        canvasOpacity={0.8}
      />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12">
          <FadeIn>
            <h2 className="text-3xl font-bold text-white mb-6">Contáctanos</h2>
            <p className="text-slate-400 mb-8">
              ¿Quieres una demo del servidor MCP, cotizar folios o migrar tu
              operación fiscal? Escríbenos y un asesor de Cibercom te responde
              en horario laboral.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-slate-300">
                <div className="w-10 h-10 rounded bg-brand-surface flex items-center justify-center text-brand-primary shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase">Email</div>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="font-medium hover:text-brand-primary transition-colors"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 text-slate-300">
                <div className="w-10 h-10 rounded bg-brand-surface flex items-center justify-center text-brand-primary shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase">Teléfono</div>
                  <a
                    href="tel:+525557526963"
                    className="font-medium hover:text-brand-primary transition-colors"
                  >
                    +52 55 5752 6963
                  </a>
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

          <FadeIn delay={200}>
            <MagicCard className="h-full">
              <div className="bg-brand-surface p-8 rounded-2xl shadow-xl relative z-10 h-full">
                <form onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label
                        htmlFor="contact-nombre"
                        className="block text-xs font-bold text-slate-400 mb-2 uppercase"
                      >
                        Nombre
                      </label>
                      <input
                        id="contact-nombre"
                        name="nombre"
                        type="text"
                        required
                        value={formData.nombre}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            nombre: e.target.value,
                          }))
                        }
                        className="w-full bg-brand-dark border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-brand-primary focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-empresa"
                        className="block text-xs font-bold text-slate-400 mb-2 uppercase"
                      >
                        Empresa
                      </label>
                      <input
                        id="contact-empresa"
                        name="empresa"
                        type="text"
                        value={formData.empresa}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            empresa: e.target.value,
                          }))
                        }
                        className="w-full bg-brand-dark border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-brand-primary focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-bold text-slate-400 mb-2 uppercase"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      className="w-full bg-brand-dark border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-brand-primary focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="contact-mensaje"
                      className="block text-xs font-bold text-slate-400 mb-2 uppercase"
                    >
                      Mensaje
                    </label>
                    <textarea
                      id="contact-mensaje"
                      name="mensaje"
                      rows={4}
                      required
                      value={formData.mensaje}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          mensaje: e.target.value,
                        }))
                      }
                      placeholder="Cuéntanos cuántos folios timbras al mes, si necesitas MCP o integración API..."
                      className="w-full bg-brand-dark border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-brand-primary focus:outline-none transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-primary hover:bg-brand-accent text-white font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/20"
                  >
                    Enviar a {CONTACT_EMAIL} <Send size={16} />
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
