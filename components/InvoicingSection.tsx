import React from 'react';
import { Mic, MessageSquareText, ShieldCheck, Zap, Layers, Smartphone } from 'lucide-react';
import FadeIn from './FadeIn';
import Parallax from './Parallax';
import MagicCard from './MagicCard'; 
import LinesBackground from './LinesBackground';

const features = [
  {
    icon: <Mic className="w-6 h-6 text-brand-primary" />,
    title: "Voz a Factura",
    description: "Simplemente dicta los detalles. Nuestra IA interpreta tu voz y genera la estructura XML del CFDI 4.0 automáticamente."
  },
  {
    icon: <MessageSquareText className="w-6 h-6 text-brand-tech" />,
    title: "Chat Asistente",
    description: "Un asistente virtual disponible 24/7. Pídele corregir conceptos, reenviar correos o cancelar facturas en lenguaje natural."
  },
  {
    icon: <Smartphone className="w-6 h-6 text-purple-400" />,
    title: "100% Móvil",
    description: "Diseñado para funcionar perfectamente en tu celular. Emite recibos de honorarios o cartas porte desde cualquier lugar."
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-green-400" />,
    title: "Cumplimiento SAT",
    description: "Actualizaciones automáticas a las últimas reformas fiscales. Nunca te preocupes por cambios en el Anexo 20."
  },
  {
    icon: <Zap className="w-6 h-6 text-yellow-400" />,
    title: "Automatización",
    description: "Configura facturas recurrentes para tus clientes de iguala. El sistema las genera y envía sin que muevas un dedo."
  },
  {
    icon: <Layers className="w-6 h-6 text-brand-primary" />,
    title: "Todo en Uno",
    description: "Facturas, Notas de Crédito, Complementos de Pago, Nómina y Carta Porte en una sola plataforma unificada."
  }
];

const InvoicingSection: React.FC = () => {
  return (
    <div className="py-24 relative overflow-hidden">
        {/* Background lines */}
      <LinesBackground
        className="absolute inset-0 z-0 opacity-40"
        canvasOpacity={0.8}
      />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              El poder de la <span className="text-brand-primary">IA</span> en tu contabilidad
            </h2>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="text-slate-400 text-lg">
              IFacturación no es solo un facturador, es un asistente inteligente que elimina la carga administrativa de tu negocio.
            </p>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FadeIn key={index} delay={index * 100} className="h-full">
              <Parallax speed={index % 2 === 0 ? 0.05 : -0.02} className="h-full">
                <MagicCard className="h-full">
                  <div className="h-full p-8 bg-brand-surface border border-slate-700/60 rounded-xl transition-all duration-300 group relative overflow-hidden shadow-lg">
                    <div className="w-12 h-12 bg-brand-blue rounded-lg flex items-center justify-center mb-6 border border-slate-700 group-hover:scale-110 transition-transform shadow-lg relative z-10">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-primary transition-colors relative z-10">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed relative z-10 text-sm">
                      {feature.description}
                    </p>
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

export default InvoicingSection;
