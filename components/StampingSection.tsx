import React from 'react';
import { Server, CheckCircle2, Box } from 'lucide-react';
import FadeIn from './FadeIn';
import Parallax from './Parallax';
import MagicCard from './MagicCard';
import LinesBackground from './LinesBackground';

const StampingSection: React.FC = () => {
  return (
    <div className="py-24 relative overflow-hidden border-y border-slate-800">   {/* Background lines */}
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
                Diseñado para manejar altos volúmenes de transacciones sin interrupciones. Nuestra conexión directa multi-PAC garantiza que tu operación nunca se detenga.
              </p>
            </FadeIn>

            <div className="space-y-4">
              {[
                { title: "Alta Disponibilidad", desc: "99.99% garantizado por SLA." },
                { title: "Facturación 1 a 1", desc: "Ideal para profesionistas y freelancers." },
                { title: "Carga Masiva (Excel/XML)", desc: "Procesa miles de facturas o nóminas en minutos." },
                { title: "Validación en tiempo real", desc: "Detecta errores antes de enviar al SAT." },
                { title: "Integración vía API", desc: "Conecta tu sistema directamente a nuestra plataforma usando APIs REST (JSON) para generar facturas de forma automática."}

              ].map((item, i) => (
                <FadeIn key={i} delay={200 + (i * 50)}>
                  <MagicCard className="relative z-10">
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-brand-surface border border-slate-700/60 transition-colors">
                      <div className="mt-1 w-6 h-6 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary shrink-0 border border-brand-primary/30">
                        <CheckCircle2 size={14} />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-sm">{item.title}</h4>
                        <p className="text-slate-500 text-sm">{item.desc}</p>
                      </div>
                    </div>
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
                                <div className="h-full bg-brand-primary w-[85%] animate-pulse"></div>
                              </div>
                            </div>
                            <span className="text-xs text-white font-mono">85%</span>
                          </div>
                          <div className="text-xs text-slate-400 flex justify-between font-mono">
                            <span>Lote_Nomina_2024.xml</span>
                            <span>Procesando...</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-brand-surface/30 p-4 rounded-lg border border-slate-700/50">
                            <div className="text-xs text-slate-500 mb-1">Timbrados hoy</div>
                            <div className="text-2xl font-bold text-white">12,450</div>
                          </div>
                          <div className="bg-brand-surface/30 p-4 rounded-lg border border-slate-700/50">
                            <div className="text-xs text-slate-500 mb-1">Tiempo prom.</div>
                            <div className="text-2xl font-bold text-brand-tech">120ms</div>
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
