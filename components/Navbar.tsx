import React, { useState, useEffect } from 'react';
import { Menu, X, Hexagon } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Facturación', href: '#facturacion' },
    { name: 'Timbrado', href: '#timbrado' },
    { name: 'Valida tu CFDI', href: '#valida' },
    { name: 'Planes', href: '#planes' },
    { name: 'Soporte', href: '#soporte' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <nav
          className={`fixed w-full z-50 transition-all duration-300 border-b ${
        isScrolled || isMobileMenuOpen 
          ? 'bg-brand-dark/95 backdrop-blur-none border-brand-surface py-3 shadow-lg shadow-brand-primary/5'
          : 'bg-transparent border-transparent py-5'
      }`}

    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="relative">
            <Hexagon className="text-brand-primary fill-brand-primary/20 w-8 h-8 group-hover:rotate-180 transition-transform duration-700" strokeWidth={1.5} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[10px] font-bold text-brand-primary">iF</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white leading-none">
              IFacturación
            </span>
            <span className="text-[10px] text-brand-primary tracking-[0.2em] font-medium leading-none mt-1">
              INTELIGENTE
            </span>
          </div>
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <a
            href="http://174.136.25.157:8080/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 text-sm font-bold text-white bg-brand-primary hover:bg-brand-accent rounded-lg transition-all shadow-[0_0_15px_rgba(249,115,22,0.3)] hover:shadow-[0_0_20px_rgba(249,115,22,0.5)] transform hover:-translate-y-0.5"
          >
            Acceso Clientes
          </a>
        </div>
    
        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-slate-300 hover:text-brand-primary transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {<Menu size={28} />}
        </button>
      </div>

     {/* Mobile Menu */}
<div
  className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
    isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
  }`}
>
  {/* Overlay oscuro detrás del menú */}
  <div className="absolute inset-0 bg-black/70" />

  {/* Panel del menú */}
  <div
    className={`
      absolute inset-x-0 top-0 bottom-0
      bg-brand-dark/98 backdrop-blur-md border-t border-brand-surface
      transform transition-transform duration-300
      ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}
    `}
  >
    {/* ❌ Botón para cerrar (siempre visible) */}
    <button
      onClick={() => setIsMobileMenuOpen(false)}
      className="absolute top-5 right-5 text-slate-300 hover:text-brand-primary transition-colors z-50"
    >
      <X size={32} />
    </button>

    {/* Contenido */}
    <div className="pt-[100px] flex flex-col items-center justify-center h-full gap-8 p-8">
      {navLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          className="text-2xl font-medium text-slate-300 hover:text-brand-primary"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {link.name}
        </a>
      ))}

      <a
        href="http://174.136.25.157:8080/"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full text-center px-8 py-4 text-lg font-bold text-white bg-brand-primary rounded-lg shadow-lg"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        Acceso Clientes
      </a>
    </div>
  </div>
</div>

    </nav>
  );
};

export default Navbar;