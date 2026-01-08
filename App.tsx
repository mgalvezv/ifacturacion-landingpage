import React, { useEffect, useState, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechBackground from './components/TechBackground';
import AiChatWidget from './components/AiChatWidget';
import AiBubble from './components/AiBubble';

// Lazy load sections below the fold for better initial load performance
const InvoicingSection = lazy(() => import('./components/InvoicingSection'));
const StampingSection = lazy(() => import('./components/StampingSection'));
const ValidatorSection = lazy(() => import('./components/ValidatorSection'));
const PricingSection = lazy(() => import('./components/PricingSection'));
const SupportSection = lazy(() => import('./components/SupportSection'));
const TrustSection = lazy(() => import('./components/TrustSection'));
const ContactSection = lazy(() => import('./components/ContactSection'));
const Footer = lazy(() => import('./components/Footer'));

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Smooth scroll behavior for anchor links
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-brand-dark text-slate-200 selection:bg-brand-primary selection:text-white relative font-sans">
      {/* Fondo MUY ligero en mobile (sin animación) */}
      <TechBackground
        variant="dots"
        animated={false}
        className="fixed inset-0 z-0 pointer-events-none opacity-35 md:hidden"
      />

      {/* Fondo circles solo en md+ (el que se siente más pesado) */}
      <TechBackground
        variant="circles"
        className="fixed inset-0 z-0 pointer-events-none opacity-60 hidden md:block"
      />

      <Navbar />

      <main className="relative z-10">
        <section id="hero">
          <Hero />
        </section>

        <Suspense fallback={<div className="min-h-screen" />}>
          <section id="facturacion">
            <InvoicingSection />
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

      {/* Burbuja SOLO cuando el chat está cerrado */}
      {!isChatOpen && (
        <AiBubble
          onClick={() => setIsChatOpen(true)}
          isActive={true}
        />
      )}

      {/* Chat flotante en la misma esquina */}
      {isChatOpen && (
        <AiChatWidget
          onClose={() => setIsChatOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
