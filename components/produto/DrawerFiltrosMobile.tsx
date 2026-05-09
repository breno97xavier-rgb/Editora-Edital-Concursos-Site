'use client';

import React, { useEffect } from 'react';
import SidebarFiltros from './SidebarFiltros';
import { Categoria, Materia, Concurso } from '@/data/produtos';

type FaixaPreco = 'ate-50' | '50-100' | 'acima-100';

interface DrawerFiltrosMobileProps {
  aberto: boolean;
  onClose: () => void;
  tiposFiltro: string[];
  categoriasFiltro: Categoria[];
  materiasFiltro: Materia[];
  concursosFiltro: Concurso[];
  faixasPrecoFiltro: FaixaPreco[];
  atualizarFiltro: (chave: string, valor: string, ativar: boolean) => void;
  limparFiltros: () => void;
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
    return () => { document.body.style.overflow = ''; };
  }, [props.aberto]);

  if (!props.aberto) return null;

  return (
    <div className="lg:hidden fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-azul-profundo/60 backdrop-blur-sm"
        onClick={props.onClose}
      />

      {/* Drawer */}
      <div className="relative ml-auto w-full max-w-sm bg-branco h-full overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-branco border-b border-cinza-claro p-4 flex items-center justify-between z-10">
          <h2 className="font-titulo font-bold text-lg text-azul-profundo">
            Filtros
          </h2>
          <button 
            onClick={props.onClose}
            className="text-2xl text-cinza-medio hover:text-azul-profundo p-2"
            aria-label="Fechar filtros"
          >
            ×
          </button>
        </div>
        
        <div className="p-4">
          <SidebarFiltros {...props} />
        </div>

        <div className="sticky bottom-0 bg-branco border-t border-cinza-claro p-4">
          <button
            onClick={props.onClose}
            className="w-full bg-azul-profundo text-branco font-titulo font-bold py-3 rounded-lg hover:bg-opacity-90 transition active:scale-[0.98]"
          >
            Aplicar filtros
          </button>
        </div>
      </div>
    </div>
  );
}
