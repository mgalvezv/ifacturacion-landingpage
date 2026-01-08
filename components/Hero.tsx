import React, { memo } from 'react';
import { ArrowRight, Bot, ChevronRight, Play } from 'lucide-react';
import FadeIn from './FadeIn';
import TechBackground from './TechBackground';
import BrainCircuit from './BrainCircuit';
import Parallax from './Parallax';
import MagicCard from './MagicCard'; // 👈 importamos el borde mágico

const Hero: React.FC = memo(() => {
  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-screen flex items-center bg-brand-dark z-20">
      <TechBackground variant="circuit" />
      
      {/* Decorative Glows with Parallax */}
      <Parallax speed={-0.1} className="absolute top-1/4 right-0 -z-10">
        <div className="w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[100px]"></div>
      </Parallax>
      <Parallax speed={0.1} className="absolute bottom-0 left-0 -z-10">
        <div className="w-[400px] h-[400px] bg-brand-tech/10 rounded-full blur-[80px]"></div>
      </Parallax>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="max-w-2xl">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-surface border border-brand-primary/30 text-brand-primary text-xs font-bold uppercase tracking-wider mb-8 hover:bg-brand-surface/80 transition-colors cursor-default">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
                </span>
                Nueva tecnología SAT 4.0
              </div>
            </FadeIn>
            
            <FadeIn delay={100}>
              <Parallax speed={0.05}>
                <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
                  Facturación <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-tech to-white">
                    Impulsada por IA
                  </span>
                </h1>
              </Parallax>
            </FadeIn>

            <FadeIn delay={200}>
              <p className="text-lg text-slate-400 mb-10 max-w-lg leading-relaxed border-l-2 border-brand-primary/50 pl-6">
                La plataforma multi-dispositivo más intuitiva y versátil de México. Genera facturas, recibos de nómina y complementos simplemente <span className="text-brand-primary font-medium">hablando con nuestra IA</span>.
              </p>
            </FadeIn>

            <FadeIn delay={300}>
              <div className="flex flex-col sm:flex-row gap-4">
                <MagicCard className="inline-block rounded-lg">
                <button className="flex items-center justify-center gap-2 px-8 py-4 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-accent transition-all shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] hover:-translate-y-1">
                  Comenzar ahora
                  <ArrowRight className="w-5 h-5" />
                </button>
                </MagicCard>
              <MagicCard className="inline-block rounded-lg">
                <button className="flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-slate-600 text-white font-semibold rounded-lg hover:bg-brand-surface transition-all group relative z-10">
                  <Play className="w-4 h-4 fill-current group-hover:text-brand-primary transition-colors" />
                  Ver demostración
                </button>
              </MagicCard>
              </div>
            </FadeIn>
            
            <FadeIn delay={400}>
              <div className="mt-12 flex items-center gap-6 pt-6 border-t border-slate-800">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-white">99.9%</span>
                  <span className="text-xs text-slate-500 uppercase tracking-wide">Uptime</span>
                </div>
                <div className="w-px h-10 bg-slate-800"></div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-white">+10k</span>
                  <span className="text-xs text-slate-500 uppercase tracking-wide">Empresas</span>
                </div>
                <div className="w-px h-10 bg-slate-800"></div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-white">24/7</span>
                  <span className="text-xs text-slate-500 uppercase tracking-wide">Soporte IA</span>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Visuals - Futuristic Interface */}
          <FadeIn direction="left" delay={200} className="relative hidden lg:block">
            <div className="relative w-full aspect-square max-w-lg mx-auto flex items-center justify-center">
              {/* Background geometric shapes */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/20 to-brand-tech/5 rounded-full blur-3xl animate-pulse-slow"></div>
              
              {/* Brain Circuit Animation - Behind the card */}
              <div className="absolute inset-0 z-0 scale-125 opacity-60">
                <BrainCircuit />
              </div>
              
              {/* Main Interface Card con borde mágico */}
              <MagicCard className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md animate-float z-10">
                <div className="bg-brand-blue/90 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
                  
                  {/* Header */}
                  <div className="bg-brand-surface/80 px-4 py-3 border-b border-slate-700 flex justify-between items-center">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    <div className="text-[10px] font-mono text-brand-primary flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse"></div>
                      AI_AGENT_ACTIVE
                    </div>
                  </div>

                  {/* Chat Interface */}
                  <div className="p-6 space-y-4">
                    {/* User Message */}
                    <div className="flex justify-end">
                      <div className="bg-brand-primary/20 border border-brand-primary/30 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%] text-right">
                        <p className="text-sm text-white">
                          Factura $25,000 a Constructora del Norte por "Materiales de Construcción".
                        </p>
                      </div>
                    </div>

                    {/* AI Response */}
                    <div className="flex justify-start items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-primary to-orange-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Bot size={18} className="text-white" />
                      </div>
                      <div className="space-y-2 max-w-[90%]">
                        <div className="bg-brand-surface border border-slate-600 rounded-2xl rounded-tl-sm px-4 py-3">
                          <p className="text-sm text-slate-300">
                            Entendido. He preparado el pre-CFDI. Por favor confirma los datos:
                          </p>
                          <div className="mt-3 bg-brand-dark/50 rounded p-3 border border-slate-700 text-xs font-mono space-y-1">
                            <div className="flex justify-between">
                              <span className="text-slate-500">Receptor:</span>
                              <span className="text-brand-tech">CONSTRUCTORA DEL NORTE SA</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">Monto:</span>
                              <span className="text-white">$25,000.00 MXN</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">Uso CFDI:</span>
                              <span className="text-white">G03 - Gastos en general</span>
                            </div>
                          </div>
                        </div>
                        <button className="flex items-center gap-2 text-xs font-bold text-brand-primary hover:text-brand-accent transition-colors">
                          Timbrar ahora <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Input Area */}
                  <div className="p-4 bg-brand-surface/50 border-t border-slate-700 flex gap-2">
                    <div className="h-2 w-full bg-slate-700/50 rounded-full overflow-hidden">
                      <div className="h-full w-2/3 bg-brand-primary/50 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </MagicCard>

              {/* Floating Elements */}
              <div
                className="absolute top-10 -right-4 bg-brand-surface border border-slate-600 p-3 rounded-lg shadow-xl opacity-80 backdrop-blur-sm animate-float z-20"
                style={{ animationDelay: '1s' }}
              >
                <div className="text-xs text-slate-400">SAT Status</div>
                <div className="text-sm font-bold text-green-400 flex items-center gap-1">
                  Online <span className="w-2 h-2 rounded-full bg-green-400"></span>
                </div>
              </div>

              <div
                className="absolute bottom-20 -left-8 bg-brand-surface border border-slate-600 p-3 rounded-lg shadow-xl opacity-80 backdrop-blur-sm animate-float z-20"
                style={{ animationDelay: '2s' }}
              >
                <div className="text-xs text-slate-400">Tiempo Respuesta</div>
                <div className="text-sm font-bold text-brand-primary">0.45s</div>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </div>
  );
});

Hero.displayName = 'Hero';

export default Hero;
