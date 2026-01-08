import React from 'react';
import { Hexagon, Youtube, Facebook, Twitter, Instagram, Linkedin} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark/90 backdrop-blur-xl border-t border-slate-800 pt-16 pb-8 text-sm relative overflow-hidden">
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2 pr-8">
            <div className="flex items-center gap-2 mb-4">
               <Hexagon className="text-brand-primary w-6 h-6 fill-brand-primary/20" />
              <span className="text-xl font-bold text-white">IFacturación</span>
            </div>
            <p className="text-slate-500 mb-6 leading-relaxed">
              La plataforma de facturación inteligente que evoluciona contigo. Simplificamos tus obligaciones fiscales con tecnología de vanguardia.
            </p>
            <div className="flex gap-4">
              {[Youtube, Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-full bg-brand-surface flex items-center justify-center text-slate-400 hover:text-white hover:bg-brand-primary transition-all">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Servicios</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-400 hover:text-brand-primary transition-colors">Facturación</a></li>
              <li><a href="#" className="text-slate-400 hover:text-brand-primary transition-colors">Recibos de nómina</a></li>
              <li><a href="#" className="text-slate-400 hover:text-brand-primary transition-colors">Complementos</a></li>
              <li><a href="#" className="text-slate-400 hover:text-brand-primary transition-colors">Carta Porte</a></li>
              <li><a href="#" className="text-slate-400 hover:text-brand-primary transition-colors">Adendas</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Planes</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-400 hover:text-brand-primary transition-colors">Emprendedor</a></li>
              <li><a href="#" className="text-slate-400 hover:text-brand-primary transition-colors">Empresarial</a></li>
              <li><a href="#" className="text-slate-400 hover:text-brand-primary transition-colors">Corporativo</a></li>
              <li><a href="#" className="text-slate-400 hover:text-brand-primary transition-colors">Personalizado</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Timbrado</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-400 hover:text-brand-primary transition-colors">Facturas 1 a 1</a></li>
              <li><a href="#" className="text-slate-400 hover:text-brand-primary transition-colors">Factura Masiva</a></li>
              <li><a href="#" className="text-slate-400 hover:text-brand-primary transition-colors">API Desarrolladores</a></li>
              <li><a href="#" className="text-slate-400 hover:text-brand-primary transition-colors">Validación XML</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Ayuda</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-400 hover:text-brand-primary transition-colors">Validador CFDI</a></li>
              <li><a href="#" className="text-slate-400 hover:text-brand-primary transition-colors">Soporte Técnico</a></li>
              <li><a href="#" className="text-slate-400 hover:text-brand-primary transition-colors">Preguntas Frecuentes</a></li>
              <li><a href="#" className="text-slate-400 hover:text-brand-primary transition-colors">Estado del Servicio</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-500 text-xs">
            © {currentYear} IFacturación by Cibernética en el siglo XXI S.A. de C.V. Todos los derechos reservados.
          </div>
          <div className="flex gap-6 text-xs">
            <a href="#" className="text-slate-500 hover:text-white transition-colors">Términos y condiciones</a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors">Aviso de privacidad</a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors">Sistema Gratuito</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;