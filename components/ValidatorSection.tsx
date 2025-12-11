import React, { useState, useRef, ChangeEvent } from 'react';
import { Search, ShieldCheck, FileCode, Upload, CheckSquare, Square, FileUp } from 'lucide-react';
import FadeIn from './FadeIn';
import MagicCard from './MagicCard';

const ValidatorSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'manual' | 'xml'>('manual');
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setSelectedFileName(file.name);
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFileName(file.name);
    }
  };

  return (
    <div className="py-24 relative">
      <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
        
        <FadeIn>
          <div className="inline-block p-4 rounded-full bg-brand-surface/50 mb-6 border border-slate-700">
            <ShieldCheck className="w-10 h-10 text-brand-primary mx-auto" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Valida tu CFDI <span className="text-brand-primary">Gratis</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-12">
            Verifica la autenticidad y estatus ante el SAT. Herramienta gratuita y segura.
          </p>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="max-w-md mx-auto">
            {/* MagicCard envolviendo todo el formulario */}
            <MagicCard className="rounded-2xl">
              <div className="bg-brand-surface rounded-2xl border border-slate-700 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative text-left overflow-hidden">
                
                {/* Tabs */}
                <div className="flex border-b border-slate-700">
                  <button 
                    onClick={() => setActiveTab('manual')}
                    className={`flex-1 py-3 text-[10px] sm:text-xs font-bold uppercase tracking-wide transition-colors flex items-center justify-center gap-2 ${
                      activeTab === 'manual'
                        ? 'bg-brand-surface text-brand-primary border-b-2 border-brand-primary'
                        : 'bg-brand-dark/50 text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <Search size={14} /> Captura Manual
                  </button>
                  <button 
                    onClick={() => setActiveTab('xml')}
                    className={`flex-1 py-3 text-[10px] sm:text-xs font-bold uppercase tracking-wide transition-colors flex items-center justify-center gap-2 ${
                      activeTab === 'xml'
                        ? 'bg-brand-surface text-brand-primary border-b-2 border-brand-primary'
                        : 'bg-brand-dark/50 text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <FileCode size={14} /> Subir XML
                  </button>
                </div>

                <div className="p-6">
                  {activeTab === 'manual' ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-brand-primary uppercase tracking-wide mb-1.5">
                          Folio Fiscal (UUID)*
                        </label>
                        <input 
                          type="text" 
                          placeholder="Ej: 4A1B2C3D-0000-0000-0000-000000000000" 
                          className="w-full bg-brand-dark/80 border border-slate-600 rounded-lg px-3 py-2.5 text-slate-300 focus:outline-none focus:border-brand-primary transition-colors font-mono text-xs sm:text-sm placeholder:text-slate-600"
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1.5">
                            RFC Emisor*
                          </label>
                          <input 
                            type="text" 
                            placeholder="XAXX010101000" 
                            className="w-full bg-brand-dark/80 border border-slate-600 rounded-lg px-3 py-2.5 text-slate-300 focus:outline-none focus:border-brand-primary transition-colors font-mono text-xs sm:text-sm uppercase placeholder:text-slate-600"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1.5">
                            RFC Receptor*
                          </label>
                          <input 
                            type="text" 
                            placeholder="XAXX010101000" 
                            className="w-full bg-brand-dark/80 border border-slate-600 rounded-lg px-3 py-2.5 text-slate-300 focus:outline-none focus:border-brand-primary transition-colors font-mono text-xs sm:text-sm uppercase placeholder:text-slate-600"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div 
                        className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer ${
                          isDragOver ? 'border-brand-primary bg-brand-primary/10' : 'border-slate-600 bg-brand-dark/50'
                        }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={handleFileButtonClick}
                      >
                        <div className="w-12 h-12 bg-brand-surface rounded-full flex items-center justify-center mx-auto mb-3 border border-slate-600">
                          <Upload className="w-6 h-6 text-brand-primary" />
                        </div>
                        <p className="text-white font-medium text-xs sm:text-sm mb-1">
                          Arrastra tu archivo XML aquí
                        </p>
                        <p className="text-slate-500 text-[10px] mb-3">
                          o haz clic para explorar
                        </p>
                        <button
                          type="button"
                          onClick={handleFileButtonClick}
                          className="px-3 py-1.5 bg-brand-surface border border-slate-600 rounded text-[10px] font-bold text-white hover:border-brand-primary transition-colors"
                        >
                          Seleccionar Archivo
                        </button>

                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".xml"
                          className="hidden"
                          onChange={handleFileChange}
                        />

                        {selectedFileName && (
                          <p className="mt-3 text-[10px] text-slate-400 break-all">
                            Archivo seleccionado:{' '}
                            <span className="text-slate-200">{selectedFileName}</span>
                          </p>
                        )}
                      </div>
                      
                      <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-slate-700"></div>
                        </div>
                        <div className="relative flex justify-center text-[10px] uppercase">
                          <span className="bg-brand-surface px-3 text-slate-500">
                            O pega el código XML
                          </span>
                        </div>
                      </div>

                      <textarea 
                        rows={4} 
                        className="w-full bg-brand-dark/80 border border-slate-600 rounded-lg p-3 text-[10px] font-mono text-slate-400 focus:outline-none focus:border-brand-primary transition-colors resize-none"
                        placeholder="<cfdi:Comprobante...>"
                      ></textarea>
                    </div>
                  )}

                  {/* Simulated Recaptcha */}
                  <div className="mt-5 flex justify-center">
                    <div 
                      onClick={() => setCaptchaVerified(!captchaVerified)}
                      className="bg-[#222] border border-[#444] rounded w-full max-w-[320px] p-2.5 flex items-center gap-3 cursor-pointer shadow-sm hover:bg-[#2a2a2a] transition-colors select-none"
                    >
                      <div className="flex items-center justify-center w-6 h-6 border-2 border-[#c1c1c1] rounded bg-white shrink-0">
                        {captchaVerified && (
                          <CheckSquare className="w-5 h-5 text-[#4a90e2]" fill="currentColor" stroke="white" />
                        )}
                        {!captchaVerified && <Square className="w-full h-full text-transparent" />}
                      </div>
                      <span className="text-sm text-gray-300 font-medium">No soy un robot</span>
                      <div className="ml-auto flex flex-col items-center opacity-70">
                        <img
                          src="https://www.gstatic.com/recaptcha/api2/logo_48.png"
                          alt="recaptcha"
                          className="w-8 h-8 object-contain"
                        />
                        <span className="text-[8px] text-gray-500 leading-none mt-px">
                          reCAPTCHA
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5">
                    <button 
                      disabled={!captchaVerified}
                      className={`w-full py-3.5 px-6 rounded-lg font-bold transition-all flex items-center justify-center gap-2 shadow-lg text-sm ${
                        captchaVerified 
                          ? 'bg-brand-primary hover:bg-brand-accent text-white shadow-brand-primary/20 cursor-pointer transform hover:-translate-y-0.5' 
                          : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      {activeTab === 'manual' ? <Search className="w-4 h-4" /> : <FileUp className="w-4 h-4" />}
                      Validar Ahora
                    </button>
                  </div>
                </div>

                {/* Footer dentro del mismo contenedor */}
                <div className="bg-brand-dark/50 px-6 py-3 border-t border-slate-700/50 flex items-center justify-between text-[10px] text-slate-500">
                  <span>Servicio gratuito de IFacturación</span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    Listas Negras SAT Actualizadas
                  </span>
                </div>
              </div>
            </MagicCard>
          </div>
        </FadeIn>

      </div>
    </div>
  );
};

export default ValidatorSection;
