import React, { useEffect } from 'react';
import SidebarFiltros from './SidebarFiltros';
import { X } from 'lucide-react';

interface DrawerFiltrosMobileProps {
  aberto: boolean;
  onClose: () => void;
  concursoAtivo: string;
  materiaAtiva: string;
  tipoAtivo: string;
  onSelectConcurso: (concurso: string) => void;
  onSelectMateria: (materia: string) => void;
  onSelectTipo: (tipo: string) => void;
  onLimparFiltros: () => void;
  totalFiltrosAtivos: number;
}

export default function DrawerFiltrosMobile(props: DrawerFiltrosMobileProps) {
  // Bloqueia scroll do body quando drawer abre
  useEffect(() => {
    if (props.aberto) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { 
      document.body.style.overflow = ''; 
    };
  }, [props.aberto]);

  if (!props.aberto) return null;

  return (
    <div className="lg:hidden fixed inset-0 z-50 flex">
      {/* Overlay Backdrop */}
      <div 
        className="absolute inset-0 bg-azul-profundo/60 backdrop-blur-xs transition-opacity animate-fadeIn"
        onClick={props.onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="relative ml-auto w-full max-w-xs sm:max-w-sm bg-slate-50 h-full overflow-y-auto shadow-2xl flex flex-col justify-between z-10 animate-slideLeft">
        <div>
          {/* Header do Drawer */}
          <div className="sticky top-0 bg-white border-b border-slate-200 px-5 py-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <h2 className="font-titulo font-bold text-base text-azul-profundo">
                Filtros do Catálogo
              </h2>
              {props.totalFiltrosAtivos > 0 && (
                <span className="bg-azul-profundo text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {props.totalFiltrosAtivos}
                </span>
              )}
            </div>
            <button 
              onClick={props.onClose}
              className="p-1.5 text-slate-500 hover:text-azul-profundo hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Fechar filtros"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Conteúdo dos Filtros */}
          <div className="p-4">
            <SidebarFiltros
              concursoAtivo={props.concursoAtivo}
              materiaAtiva={props.materiaAtiva}
              tipoAtivo={props.tipoAtivo}
              onSelectConcurso={props.onSelectConcurso}
              onSelectMateria={props.onSelectMateria}
              onSelectTipo={props.onSelectTipo}
              onLimparFiltros={props.onLimparFiltros}
              totalFiltrosAtivos={props.totalFiltrosAtivos}
            />
          </div>
        </div>

        {/* Rodapé fixo para aplicar */}
        <div className="sticky bottom-0 bg-white border-t border-slate-200 p-4 shadow-lg">
          <button
            onClick={props.onClose}
            className="w-full bg-azul-profundo hover:bg-azul-edital text-white font-titulo font-semibold text-sm py-3 rounded-lg transition-colors"
          >
            Ver Resultados
          </button>
        </div>
      </div>
    </div>
  );
}
