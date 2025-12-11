import React from 'react';
import FadeIn from './FadeIn';
import { Quote } from 'lucide-react';
import Parallax from './Parallax';
import MagicCard from './MagicCard';
import LinesBackground from './LinesBackground';

const TrustSection: React.FC = () => {
  return (
    <div className="py-24 border-y border-slate-800 relative">
         {/* Background lines */}
      <LinesBackground
        className="absolute inset-0 z-0 opacity-40"
        canvasOpacity={0.8}
      />
      <div className="container mx-auto px-4 md:px-6">
        
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">Confianza Empresarial</h2>
            <div className="flex flex-wrap justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
               {/* Placeholder Logos */}
               {['Nexus', 'Vortex', 'Spherix', 'GlobalTech', 'Ampli'].map((name, i) => (
                 <div key={i} className="text-xl font-bold text-slate-400 flex items-center gap-2">
                    <div className="w-8 h-8 bg-slate-700 rounded-md"></div>
                    {name}
                 </div>
               ))}
            </div>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              quote: "La función de voz a factura me ahorra horas cada semana. Simplemente dicto mientras conduzco y listo.",
              author: "Carlos Méndez",
              role: "Arquitecto Independiente"
            },
            {
              quote: "Migramos toda nuestra nómina a IFacturación. La integración con nuestro ERP fue impecable gracias a su API.",
              author: "Ana López",
              role: "Gerente de Finanzas, TechSolutions"
            },
            {
              quote: "El soporte técnico realmente entiende del tema fiscal, no solo técnico. Me han salvado en varios cierres de mes.",
              author: "Roberto Gil",
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