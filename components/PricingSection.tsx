import React, { useState } from 'react';
import { Check, Star } from 'lucide-react';
import FadeIn from './FadeIn';
import Parallax from './Parallax';
import MagicCard from './MagicCard';
import LinesBackground from './LinesBackground';
import PlanCheckoutModal, { PlanSummary } from './PlanCheckoutModal';

const plans: PlanSummary[] = [
  {
    name: "Emprendedor",
    price: "$299",
    period: "/mes",
    description: "Perfecto para freelancers y profesionistas independientes.",
    features: [
      "50 Folios al mes",
      "Facturación por Voz",
      "Servidor MCP (consulta)",
      "Almacenamiento 5 años",
      "App Móvil incluida",
      "Soporte por email"
    ],
  },
  {
    name: "Empresarial",
    price: "$599",
    period: "/mes",
    description: "Potencia tu PYME con herramientas avanzadas.",
    features: [
      "300 Folios al mes",
      "Facturación por Chat IA",
      "Servidor MCP completo",
      "Timbrado de Nómina",
      "Complementos de Pago",
      "Soporte Prioritario",
      "Reportes de Ingresos"
    ],
  },
  {
    name: "Corporativo",
    price: "$1,299",
    period: "/mes",
    description: "Para empresas con alto volumen de operación.",
    features: [
      "1,500 Folios al mes",
      "Multi-usuario (hasta 5)",
      "API de integración",
      "MCP + API Key dedicada",
      "Carga Masiva (Excel)",
      "Soporte WhatsApp VIP",
      "Personalización PDF"
    ],
  },
  {
    name: "Personalizado",
    price: "Cotizar",
    period: "",
    description: "Soluciones a medida para grandes corporativos.",
    features: [
      "Folios ilimitados",
      "Instalación On-Premise",
      "Desarrollo a medida",
      "SLA Garantizado",
      "Gerente de Cuenta"
    ],
  }
];

const HIGHLIGHT_INDEX = 1;

const PricingSection: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<PlanSummary | null>(null);

  return (
    <div className="py-24 relative overflow-hidden">
      <LinesBackground
        className="absolute inset-0 z-0 opacity-40"
        canvasOpacity={0.8}
      />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
      <FadeIn>
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Planes Transparentes
          </h2>
          <p className="text-slate-400 text-lg">
            Precios claros, sin plazos forzosos. Escala cuando crezca tu volumen de folios.
          </p>
        </div>
      </FadeIn>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {plans.map((plan, index) => {
          const highlight = index === HIGHLIGHT_INDEX;
          return (
          <FadeIn key={index} delay={index * 100} className="h-full">
            <Parallax speed={highlight ? 0.08 : 0.02} className="h-full">

              <MagicCard active={highlight} className="h-full">
                <div
                  className={`h-full relative p-8 rounded-2xl flex flex-col transition-all duration-300 group
                    ${
                      highlight
                        ? 'bg-gradient-to-b from-brand-surface to-brand-blue'
                        : 'bg-brand-surface'
                    }
                  `}
                >
                  {highlight && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-brand-primary text-white font-bold text-xs py-1 px-4 rounded-full uppercase tracking-wide shadow-lg flex items-center gap-1 z-20">
                      <Star className="w-3 h-3 fill-current" />
                      Más Popular
                    </div>
                  )}

                  <h3
                    className={`text-xl font-bold mb-2 ${
                      highlight ? 'text-brand-primary' : 'text-white'
                    }`}
                  >
                    {plan.name}
                  </h3>

                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-3xl font-extrabold text-white tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-slate-500 font-medium text-sm">
                      {plan.period}
                    </span>
                  </div>

                  <p className="text-sm text-slate-400 mb-8 min-h-[40px] leading-relaxed">
                    {plan.description}
                  </p>

                  <div className="w-full h-px bg-slate-700/50 mb-8"></div>

                  <ul className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-slate-300"
                      >
                        <Check
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            highlight ? 'text-brand-primary' : 'text-slate-500'
                          }`}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => setSelectedPlan(plan)}
                    className={`w-full py-3 px-6 rounded-lg font-bold text-sm transition-all relative z-10 ${
                      highlight
                        ? 'bg-brand-primary text-white hover:bg-brand-accent shadow-lg shadow-brand-primary/20'
                        : 'bg-slate-800 text-white border border-slate-600 hover:bg-slate-700 group-hover:border-slate-500'
                    }`}
                  >
                    {plan.name === 'Personalizado' ? 'Contactar Ventas' : 'Solicitar plan'}
                  </button>
                </div>
              </MagicCard>
            </Parallax>
          </FadeIn>
        );
        })}
      </div>
      </div>

      {selectedPlan && (
        <PlanCheckoutModal
          plan={selectedPlan}
          onClose={() => setSelectedPlan(null)}
        />
      )}
    </div>
  );
};

export default PricingSection;
