import React from 'react';
import {
  Bot,
  Key,
  Plug,
  Sparkles,
  Terminal,
  Workflow,
  Zap,
} from 'lucide-react';
import FadeIn from './FadeIn';
import MagicCard from './MagicCard';
import Parallax from './Parallax';
import LinesBackground from './LinesBackground';
import CfidAgentChatPanel from './CfidAgentChatPanel';

const capabilities = [
  {
    icon: <Terminal className="w-5 h-5 text-brand-tech" />,
    title: 'Servidor MCP incluido',
    description:
      'Expone timbrado, consulta de CFDI y catálogos SAT como herramientas listas para agentes de IA.',
  },
  {
    icon: <Key className="w-5 h-5 text-brand-primary" />,
    title: 'Autenticación por API Key',
    description:
      'Genera claves por cliente o integración. Controla acceso sin compartir credenciales del PAC.',
  },
  {
    icon: <Workflow className="w-5 h-5 text-purple-400" />,
    title: 'Orquestación de flujos',
    description:
      'Conecta Cursor, Claude Desktop, n8n o tu ERP para facturar, validar y enviar comprobantes automáticamente.',
  },
  {
    icon: <Sparkles className="w-5 h-5 text-green-400" />,
    title: 'Facturación conversacional',
    description:
      'Describe la operación en lenguaje natural: el agente arma el pre-CFDI, tú confirmas y timbras.',
  },
];

const integrations = [
  'Cursor & Claude Desktop',
  'API REST + Postman',
  'Agentes personalizados',
  'Automatización n8n / Make',
];

const AiMcpSection: React.FC = () => {
  return (
    <div
      id="ia-mcp"
      className="py-24 relative overflow-hidden border-y border-slate-800"
    >
      <LinesBackground
        className="absolute inset-0 z-0 opacity-40"
        canvasOpacity={0.8}
      />

      <div className="absolute top-0 right-0 w-[480px] h-[480px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[360px] h-[360px] bg-brand-tech/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/30 text-brand-primary text-xs font-bold uppercase tracking-wider mb-6">
                <Bot className="w-3.5 h-3.5" />
                Diferenciador CFID
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Factura con{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-tech to-brand-primary">
                  agentes de IA
                </span>
              </h2>
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
              {capabilities.map((item, index) => (
                <FadeIn key={item.title} delay={100 + index * 75}>
                  <div className="p-4 rounded-xl bg-brand-surface/80 border border-slate-700/60 h-full">
                    <div className="w-9 h-9 rounded-lg bg-brand-dark flex items-center justify-center mb-3 border border-slate-700">
                      {item.icon}
                    </div>
                    <h3 className="text-white font-bold text-sm mb-1">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={450}>
              <div className="flex flex-wrap gap-2 mb-8">
                {integrations.map((label) => (
                  <span
                    key={label}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-brand-dark border border-slate-700 text-slate-300"
                  >
                    {label}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#contacto"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-accent transition-all shadow-[0_0_20px_rgba(249,115,22,0.35)]"
                >
                  Solicitar demo MCP
                  <Plug className="w-4 h-4" />
                </a>
                <a
                  href="https://cfid.redcibercom.cloud/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-slate-600 text-white font-semibold rounded-lg hover:bg-brand-surface transition-all"
                >
                  Probar plataforma
                  <Zap className="w-4 h-4 text-brand-primary" />
                </a>
              </div>
            </FadeIn>
          </div>

          <FadeIn direction="left" delay={200}>
            <Parallax speed={0.04}>
              <MagicCard className="w-full">
                <CfidAgentChatPanel />
              </MagicCard>
            </Parallax>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};

export default AiMcpSection;
