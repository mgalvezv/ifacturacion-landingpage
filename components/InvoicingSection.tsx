import React from 'react';
import { Store, Send, ShieldCheck, Users, Layers, Smartphone, Sparkles } from 'lucide-react';
import FadeIn from './FadeIn';
import Parallax from './Parallax';
import MagicCard from './MagicCard'; 
import LinesBackground from './LinesBackground';

const features = [
  {
    icon: <Store className="w-6 h-6 text-brand-primary" />,
    title: "Prefactura y Captura",
    description: "Genera borradores antes de timbrar, captura libre de conceptos o importa desde tus sistemas. Flexible para cualquier tipo de negocio."
  },
  {
    icon: <Send className="w-6 h-6 text-brand-tech" />,
    title: "Envío Automático",
    description: "El XML y PDF se envían al receptor por correo y WhatsApp automáticamente al timbrar. Sin pasos manuales."
  },
  {
    icon: <Smartphone className="w-6 h-6 text-purple-400" />,
    title: "100% Web y Móvil",
    description: "Funciona desde cualquier navegador en PC, tablet o celular. Sin instalaciones, sin dependencias de equipo."
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-green-400" />,
    title: "Cumplimiento SAT",
    description: "CFDI 4.0 con validación en tiempo real antes de enviar al PAC. Detecta errores de RFC, uso de CFDI y complementos."
  },
  {
    icon: <Users className="w-6 h-6 text-yellow-400" />,
    title: "Control por Roles",
    description: "Operador, jefe de tienda, administrador y superusuario: cada perfil ve solo lo que necesita y tiene permisos diferenciados."
  },
  {
    icon: <Layers className="w-6 h-6 text-brand-primary" />,
    title: "Todo en Uno",
    description: "Facturas, Notas de Crédito, Complementos de Pago, Nómina, Carta Porte y Retenciones en una sola plataforma unificada."
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
              Todo lo que tu operación <span className="text-brand-primary">necesita</span>
            </h2>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="text-slate-400 text-lg">
              IFacturación no es solo un facturador, es la plataforma operativa que centraliza y automatiza el ciclo fiscal completo de tu negocio.
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
