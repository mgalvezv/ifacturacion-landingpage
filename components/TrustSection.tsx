import React from 'react';
import FadeIn from './FadeIn';
import { Quote } from 'lucide-react';
import Parallax from './Parallax';
import MagicCard from './MagicCard';
import LinesBackground from './LinesBackground';

const TrustSection: React.FC = () => {
  return (
    <div className="py-24 border-y border-slate-800 relative overflow-hidden">
      <LinesBackground
        className="absolute inset-0 z-0 opacity-40"
        canvasOpacity={0.8}
      />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">Por qué confían en CFID</h2>
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { label: 'CFDI 4.0', sub: 'Cumplimiento SAT' },
                { label: 'PAC Finkok', sub: 'Timbrado autorizado' },
                { label: 'Cibercom', sub: '+15 años en software' },
                { label: 'API + MCP', sub: 'Integración abierta' },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="px-5 py-3 rounded-xl bg-brand-surface border border-slate-700 text-center min-w-[140px]"
                >
                  <div className="text-sm font-bold text-white">{badge.label}</div>
                  <div className="text-xs text-slate-500 mt-1">{badge.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              quote: "Necesitaba facturar mis honorarios sin complicarme. Con CFID lo hice desde el celular en minutos, sin instalar nada.",
              author: "Profesionista independiente",
              role: "Arquitecto"
            },
            {
              quote: "Migramos toda nuestra nómina a CFID. La integración con nuestro sistema interno fue directa gracias a la API REST.",
              author: "Área de Finanzas",
              role: "Empresa de servicios"
            },
            {
              quote: "El equipo realmente entiende el tema fiscal, no solo el técnico. Nos han apoyado en varios cierres de mes.",
              author: "Usuario administrativo",
              role: "Contador Público"
            }
          ].map((testimonial, i) => (
            <FadeIn key={i} delay={i * 150} className="h-full">
              <Parallax speed={0.03 * (i + 1)} className="h-full">
                <MagicCard className="h-full">
                  <div className="bg-brand-surface p-8 rounded-xl relative h-full flex flex-col z-10 shadow-lg">
                    <Quote className="absolute top-6 right-6 w-8 h-8 text-brand-primary/20" />
                    <p className="text-slate-300 italic mb-6 leading-relaxed flex-grow">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center gap-4 mt-auto">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 border border-slate-500"></div>
                      <div>
                        <h5 className="text-white font-bold text-sm">{testimonial.author}</h5>
                        <p className="text-brand-primary text-xs">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </MagicCard>
              </Parallax>
            </FadeIn>
          ))}
        </div>

      </div>
    </div>
  );
};

export default TrustSection;