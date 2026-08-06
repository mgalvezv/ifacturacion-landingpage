import React from 'react';
import FadeIn from './FadeIn';
import Parallax from './Parallax';
import MagicCard from './MagicCard';
import LinesBackground from './LinesBackground';
import { FEATURES } from '../lib/features';
import { useFeatureModal } from '../context/FeatureModalProvider';

const InvoicingSection: React.FC = () => {
  const { openFeature } = useFeatureModal();

  return (
    <div className="py-24 relative overflow-hidden">
      <LinesBackground
        className="absolute inset-0 z-0 opacity-40"
        canvasOpacity={0.8}
      />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Todo lo que tu operación <span className="text-brand-primary">necesita</span>
            </h2>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="text-slate-400 text-lg">
              CFID no es solo un facturador: es la plataforma operativa que centraliza el ciclo fiscal completo — desde la captura hasta el envío al cliente, con validaciones alineadas con los requisitos del SAT.
            </p>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <FadeIn key={feature.id} delay={index * 100} className="h-full">
              <Parallax speed={index % 2 === 0 ? 0.05 : -0.02} className="h-full">
                <MagicCard className="h-full">
                  <button
                    type="button"
                    onClick={() => openFeature(feature.id)}
                    className="h-full w-full text-left p-8 bg-brand-surface border border-slate-700/60 rounded-xl transition-all duration-300 group relative overflow-hidden shadow-lg hover:border-brand-primary/40 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                    aria-label={`Ver detalle de ${feature.title}`}
                  >
                    <div className="w-12 h-12 bg-brand-blue rounded-lg flex items-center justify-center mb-6 border border-slate-700 group-hover:scale-110 transition-transform shadow-lg relative z-10">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-primary transition-colors relative z-10">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed relative z-10 text-sm">
                      {feature.description}
                    </p>
                    <span className="inline-block mt-4 text-xs font-semibold text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity relative z-10">
                      Ver detalle →
                    </span>
                  </button>
                </MagicCard>
              </Parallax>
            </FadeIn>
          ))}
        </div>

      </div>
    </div>
  );
};

export default InvoicingSection;
