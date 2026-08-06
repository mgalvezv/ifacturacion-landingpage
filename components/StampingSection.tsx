import React from 'react';
import { Server, CheckCircle2, Box } from 'lucide-react';
import FadeIn from './FadeIn';
import Parallax from './Parallax';
import MagicCard from './MagicCard';
import LinesBackground from './LinesBackground';
import { STAMPING_FEATURES } from '../lib/features';
import { useFeatureModal } from '../context/FeatureModalProvider';

const StampingSection: React.FC = () => {
  const { openFeature } = useFeatureModal();

  return (
    <div className="py-24 relative overflow-hidden border-y border-slate-800">
      <LinesBackground
        className="absolute inset-0 z-0 opacity-40"
        canvasOpacity={0.8}
      />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Columna izquierda */}
          <div className="lg:w-1/2">
            <FadeIn>
              <div className="flex items-center gap-2 mb-4 text-brand-primary font-bold tracking-wider text-xs uppercase">
                <Server className="w-4 h-4" />
                Infraestructura Robusta
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Timbrado Masivo <br />
                <span className="text-brand-tech">Ultra Rápido</span>
              </h2>
            </FadeIn>

            <FadeIn delay={100}>
              <p className="text-slate-400 text-lg mb-8">
                Desde una factura individual hasta factura global, cancelación masiva y
                reproceso de timbres pendientes. Conexión directa con PAC autorizado (Finkok)
                y validación antes de cada envío al SAT.
              </p>
            </FadeIn>

            <div className="space-y-4">
              {STAMPING_FEATURES.map((feature, i) => (
                <FadeIn key={feature.id} delay={200 + (i * 50)}>
                  <MagicCard className="relative z-10">
                    <button
                      type="button"
                      onClick={() => openFeature(feature.id)}
                      className="group w-full text-left flex items-start gap-4 p-4 rounded-xl bg-brand-surface border border-slate-700/60 transition-colors hover:border-brand-primary/40 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                      aria-label={`Ver detalle de ${feature.title}`}
                    >
                      <div className="mt-1 w-6 h-6 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary shrink-0 border border-brand-primary/30 group-hover:scale-110 transition-transform">
                        <CheckCircle2 size={14} />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-white font-bold text-sm group-hover:text-brand-primary transition-colors">
                          {feature.title}
                        </h4>
                        <p className="text-slate-500 text-sm group-hover:text-slate-400 transition-colors">
                          {feature.description}
                        </p>
                        <span className="inline-block mt-2 text-xs font-semibold text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity">
                          Ver detalle →
                        </span>
                      </div>
                    </button>
                  </MagicCard>
                </FadeIn>
              ))}
            </div>
                </div>

          {/* Columna derecha */}
          <div className="lg:w-1/2 w-full">
            <FadeIn direction="left" delay={300}>
              <Parallax speed={0.05}>
                <MagicCard className="w-full">
                  <div className="relative bg-brand-dark border border-slate-700 rounded-2xl p-1 shadow-2xl">
                    {/* Window Frame */}
                    <div className="bg-brand-surface rounded-t-xl p-3 flex gap-2 border-b border-slate-700">
                      <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                      <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                    </div>
                    {/* Content */}
                    <div className="p-6 bg-brand-dark rounded-b-xl relative overflow-hidden">
                      {/* Background Grid inside card */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>

                      <div className="space-y-6 relative z-10">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-400 font-mono">Status del Servicio</span>
                          <span className="text-green-400 bg-green-400/10 px-2 py-0.5 rounded text-xs border border-green-400/20">
                            OPERATIVO
                          </span>
                        </div>

                        {/* Animated Process Block */}
                        <div className="bg-brand-surface/50 rounded-lg p-4 border border-slate-700">
                          <div className="flex items-center gap-4 mb-3">
                            <Box className="text-brand-primary" />
                            <div className="flex-1">
                              <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                                <div className="h-full bg-brand-primary animate-progress-loop origin-left"></div>
                              </div>
                            </div>
                            <span className="text-xs text-white font-mono animate-progress-label">Procesando</span>
                          </div>
                          <div className="text-xs text-slate-400 flex justify-between font-mono">
                            <span>Factura_Global_periodo</span>
                            <span>Procesando...</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-brand-surface/30 p-4 rounded-lg border border-slate-700/50">
                            <div className="text-xs text-slate-500 mb-1">PAC Autorizado</div>
                            <div className="text-xl font-bold text-white">Finkok ✓</div>
                          </div>
                          <div className="bg-brand-surface/30 p-4 rounded-lg border border-slate-700/50">
                            <div className="text-xs text-slate-500 mb-1">Protocolo</div>
                            <div className="text-xl font-bold text-brand-tech">TLS 1.3</div>
                          </div>
                        </div>

                        <div className="text-center pt-4">
                          <p className="text-xs text-slate-600 font-mono">
                            Conexión segura TLS 1.3 vía REST API
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </MagicCard>
              </Parallax>
            </FadeIn>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StampingSection;

