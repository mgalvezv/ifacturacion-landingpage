import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InvoicingSection from './components/InvoicingSection';
import StampingSection from './components/StampingSection';
import ValidatorSection from './components/ValidatorSection';
import PricingSection from './components/PricingSection';
import SupportSection from './components/SupportSection';
import TrustSection from './components/TrustSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import TechBackground from './components/TechBackground';
import AiChatWidget from './components/AiChatWidget';
import AiBubble from './components/AiBubble';

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
      </main>

      <Footer />

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
