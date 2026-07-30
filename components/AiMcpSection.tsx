import React from 'react';

import {
  Bot,
  Plug,
  Zap,
} from 'lucide-react';

import FadeIn from './FadeIn';

import MagicCard from './MagicCard';

import Parallax from './Parallax';

import LinesBackground from './LinesBackground';

import CfidAgentChatPanel from './CfidAgentChatPanel';

import { useMediaQuery } from './useMediaQuery';

import { AI_MCP_FEATURES } from '../lib/features';

import { useFeatureModal } from '../context/FeatureModalProvider';



const integrations = [

  'Cursor & Claude Desktop',

  'API REST + Postman',

  'Agentes personalizados',

  'Automatización n8n / Make',

];



const AiMcpSection: React.FC = () => {

  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  const { openFeature } = useFeatureModal();



  return (

    <div

      id="ia-mcp"

      className="py-24 relative overflow-hidden border-y border-slate-800"

    >

      <LinesBackground

        className="absolute inset-0 z-0 opacity-40"

        canvasOpacity={0.8}

      />

      <Parallax speed={-0.06} className="absolute top-0 right-0 pointer-events-none">

        <div

          className={`w-[480px] h-[480px] bg-brand-primary/10 rounded-full blur-[120px] ${

            prefersReducedMotion ? '' : 'motion-safe:animate-glow-pulse'

          }`}

        />

      </Parallax>

      <Parallax speed={0.05} className="absolute bottom-0 left-0 pointer-events-none">

        <div

          className={`w-[360px] h-[360px] bg-brand-tech/10 rounded-full blur-[100px] ${

            prefersReducedMotion ? '' : 'motion-safe:animate-glow-pulse [animation-delay:2s]'

          }`}

        />

      </Parallax>



      <div className="container mx-auto px-4 md:px-6 relative z-10">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div>

            <FadeIn>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/30 text-brand-primary text-xs font-bold uppercase tracking-wider mb-6">

                {!prefersReducedMotion && (

                  <span className="relative flex h-2 w-2">

                    <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-60" />

                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary" />

                  </span>

                )}

                <Bot className="w-3.5 h-3.5" />

                Diferenciador CFID

              </div>

            </FadeIn>



            <FadeIn delay={80}>

              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">

                Factura con{' '}

                <span

                  className={`text-transparent bg-clip-text bg-gradient-to-r from-brand-tech via-brand-primary to-brand-tech ${

                    prefersReducedMotion

                      ? ''

                      : 'bg-[length:200%_auto] motion-safe:animate-gradient-shift'

                  }`}

                >

                  agentes de IA

                </span>

              </h2>

            </FadeIn>



            <FadeIn delay={160}>

              <p className="text-slate-400 text-lg mb-8 leading-relaxed">

                CFID no solo timbra: incluye un{' '}

                <strong className="text-white font-semibold">

                  servidor MCP

                </strong>{' '}

                para que tus agentes de IA emitan CFDI, consulten estatus y

                automaticen complementos con una API Key segura. Menos captura

                manual, más velocidad comercial.

              </p>

            </FadeIn>



            <div className="grid sm:grid-cols-2 gap-4 mb-8">

              {AI_MCP_FEATURES.map((feature, index) => (

                <FadeIn

                  key={feature.id}

                  delay={220 + index * 90}

                  className="h-full"

                >

                  <Parallax

                    speed={index % 2 === 0 ? 0.035 : -0.02}

                    className="h-full"

                  >

                    <MagicCard className="relative z-10 h-full transition-transform duration-500 ease-out hover:-translate-y-1">

                      <button

                        type="button"

                        onClick={() => openFeature(feature.id)}

                        className="group h-full w-full text-left p-4 rounded-xl bg-brand-surface border border-slate-700/60 transition-colors duration-300 hover:border-brand-primary/40 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary/50"

                        aria-label={`Ver detalle de ${feature.title}`}

                      >

                        <div className="w-9 h-9 rounded-lg bg-brand-dark flex items-center justify-center mb-3 border border-slate-700 transition-transform duration-300 group-hover:scale-105 group-hover:border-brand-primary/30">

                          {feature.icon}

                        </div>

                        <h3 className="text-white font-bold text-sm mb-1 transition-colors duration-300 group-hover:text-brand-primary">

                          {feature.title}

                        </h3>

                        <p className="text-slate-500 text-sm leading-relaxed transition-colors duration-300 group-hover:text-slate-400">

                          {feature.description}

                        </p>

                        <span className="inline-block mt-2 text-xs font-semibold text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity">

                          Ver detalle →

                        </span>

                      </button>

                    </MagicCard>

                  </Parallax>

                </FadeIn>

              ))}

            </div>



            <FadeIn delay={520}>

              <div className="flex flex-wrap gap-2 mb-8">

                {integrations.map((label, index) => (

                  <FadeIn key={label} delay={560 + index * 70}>

                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-brand-dark border border-slate-700 text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-primary/40 hover:text-white hover:shadow-[0_0_12px_rgba(249,115,22,0.15)]">

                      {label}

                    </span>

                  </FadeIn>

                ))}

              </div>



              <div className="flex flex-col sm:flex-row gap-4">

                <a

                  href="#contacto"

                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-accent transition-all duration-300 shadow-[0_0_20px_rgba(249,115,22,0.35)] hover:shadow-[0_0_28px_rgba(249,115,22,0.45)] hover:-translate-y-0.5"

                >

                  Solicitar demo MCP

                  <Plug className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />

                </a>

                <a

                  href="https://cfid.redcibercom.cloud/"

                  target="_blank"

                  rel="noopener noreferrer"

                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 border border-slate-600 text-white font-semibold rounded-lg hover:bg-brand-surface transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-500"

                >

                  Probar plataforma

                  <Zap className="w-4 h-4 text-brand-primary transition-transform duration-300 group-hover:scale-110" />

                </a>

              </div>

            </FadeIn>

          </div>



          <FadeIn direction="left" delay={280}>

            <Parallax speed={0.04}>

              <div

                className={

                  prefersReducedMotion ? '' : 'motion-safe:animate-float-subtle'

                }

              >

                <MagicCard className="w-full">

                  <CfidAgentChatPanel />

                </MagicCard>

              </div>

            </Parallax>

          </FadeIn>

        </div>

      </div>

    </div>

  );

};



export default AiMcpSection;


