import React from 'react';
import { HelpCircle, BookOpen, MessageCircle } from 'lucide-react';
import FadeIn from './FadeIn';
import MagicCard from './MagicCard';
import LinesBackground from './LinesBackground';

const SupportSection: React.FC = () => {
  return (
    <div className="py-20 relative overflow-hidden">
         {/* Background lines */}
      <LinesBackground
        className="absolute inset-0 z-0 opacity-40"
        canvasOpacity={0.8}
      />
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Centro de Ayuda</h2>
            <p className="text-slate-400">
              Recursos y asistencia experta para que nunca detengas tu operación.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              icon: <MessageCircle className="w-8 h-8 text-brand-primary" />,
              title: 'Soporte Chat',
              desc: 'Habla con un experto en tiempo real. Tiempo de respuesta < 2 min.',
              cta: 'Iniciar chat',
            },
            {
              icon: <HelpCircle className="w-8 h-8 text-brand-tech" />,
              title: 'Base de Conocimiento',
              desc: 'Tutoriales detallados sobre facturación, nómina y complementos.',
              cta: 'Ver guías',
            },
            {
              icon: <BookOpen className="w-8 h-8 text-purple-400" />,
              title: 'Blog Fiscal',
              desc: 'Mantente actualizado con las últimas noticias y cambios del SAT.',
              cta: 'Leer novedades',
            },
          ].map((item, index) => (
            <FadeIn key={index} delay={index * 100} className="h-full">
              <MagicCard className="h-full">
                <div className="bg-brand-surface p-8 rounded-2xl text-center border border-slate-700/60 group h-full flex flex-col items-center relative z-10 shadow-lg">
                  <div className="inline-flex p-4 bg-brand-dark rounded-full mb-6 group-hover:scale-110 transition-transform shadow-lg border border-slate-700">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 mb-6 text-sm flex-grow">{item.desc}</p>
                  <button className="text-brand-primary font-bold text-sm hover:text-white transition-colors flex items-center justify-center gap-2 group-hover:gap-3">
                    {item.cta} &rarr;
                  </button>
                </div>
              </MagicCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupportSection;
