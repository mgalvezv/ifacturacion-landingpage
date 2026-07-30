import React, { useEffect, useState, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechBackground from './components/TechBackground';
import CfidAgentWidgetHost from './components/CfidAgentWidgetHost';
import { CfidAgentProvider } from './context/CfidAgentProvider';
import { FeatureModalProvider } from './context/FeatureModalProvider';
import { useMediaQuery } from './components/useMediaQuery';

// Lazy load sections below the fold for better initial load performance
const InvoicingSection = lazy(() => import('./components/InvoicingSection'));
const AiMcpSection = lazy(() => import('./components/AiMcpSection'));
const StampingSection = lazy(() => import('./components/StampingSection'));
const ValidatorSection = lazy(() => import('./components/ValidatorSection'));
const PricingSection = lazy(() => import('./components/PricingSection'));
const SupportSection = lazy(() => import('./components/SupportSection'));
const TrustSection = lazy(() => import('./components/TrustSection'));
const ContactSection = lazy(() => import('./components/ContactSection'));
const Footer = lazy(() => import('./components/Footer'));

const App: React.FC = () => {
  return (
    <CfidAgentProvider>
      <FeatureModalProvider>
        <AppContent />
      </FeatureModalProvider>
    </CfidAgentProvider>
  );
};

const AppContent: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const isDesktopBackground = useMediaQuery('(min-width: 768px)');

  // Smooth scroll behavior for anchor links
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-brand-dark text-slate-200 selection:bg-brand-primary selection:text-white relative font-sans">
      {isDesktopBackground ? (
        <TechBackground
          variant="grid"
          className="fixed inset-0 z-0 pointer-events-none opacity-60"
        />
      ) : (
        <TechBackground
          variant="dots"
          animated={false}
          className="fixed inset-0 z-0 pointer-events-none opacity-35"
        />
      )}

      <Navbar />

      <main className="relative z-10">
        <section id="hero">
          <Hero />
        </section>

        <Suspense fallback={<div className="min-h-screen" />}>
          <section id="facturacion">
            <InvoicingSection />
          </section>

          <section>
            <AiMcpSection />
          </section>

          <section id="timbrado">
            <StampingSection />
          </section>

          <section id="valida">
            <ValidatorSection />
          </section>

          <section id="planes">
            <PricingSection />
          </section>

          <section id="confianza">
            <TrustSection />
          </section>

          <section id="soporte">
            <SupportSection />
          </section>

          <section id="contacto">
            <ContactSection />
          </section>
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      <CfidAgentWidgetHost
        isOpen={isChatOpen}
        onOpen={() => setIsChatOpen(true)}
        onClose={() => setIsChatOpen(false)}
      />
    </div>
  );
};

export default App;
