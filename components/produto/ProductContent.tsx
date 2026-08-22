import React from 'react';
import { CheckCircle2, BookOpen, Layers } from 'lucide-react';
import { Produto } from '@/data/produtos';

interface ProductContentProps {
  produto: Produto;
}

export default function ProductContent({ produto }: ProductContentProps) {
  const paragrafosDescricao = produto.descricaoCompleta
    ? produto.descricaoCompleta.split('\n\n').filter((p) => p.trim().length > 0)
    : [];

  const temTopicos = produto.topicosCobertos && produto.topicosCobertos.length > 0;
  const temRecebiveis = produto.oQueRecebe && produto.oQueRecebe.length > 0;

  return (
    <div className="space-y-10">
      
      {/* ========================================================================= */}
      {/* 1. VISÃO GERAL DO MATERIAL */}
      {/* ========================================================================= */}
      {paragrafosDescricao.length > 0 && (
        <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-slate-100">
            <BookOpen className="text-azul-profundo" size={22} />
            <h2 className="font-titulo font-bold text-xl sm:text-2xl text-azul-profundo">
              Visão geral do material
            </h2>
          </div>

          <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            {paragrafosDescricao.map((paragrafo, index) => (
              <p key={index}>{paragrafo}</p>
            ))}
          </div>

          {temRecebiveis && (
            <div className="mt-6 pt-6 border-t border-slate-100">
              <h3 className="font-titulo font-bold text-sm text-azul-profundo uppercase tracking-wider mb-3">
                Especificações do material
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-slate-700">
                {produto.oQueRecebe.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-azul-edital flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {/* ========================================================================= */}
      {/* 2. CONTEÚDO PROGRAMÁTICO (apenas quando fornecido formalmente) */}
      {/* ========================================================================= */}
      {temTopicos && (
        <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-slate-100">
            <Layers className="text-azul-profundo" size={22} />
            <h2 className="font-titulo font-bold text-xl sm:text-2xl text-azul-profundo">
              Conteúdo programático
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {produto.topicosCobertos.map((topico, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-700 text-sm font-medium"
              >
                <CheckCircle2 size={18} className="text-azul-edital flex-shrink-0 mt-0.5" />
                <span>{topico}</span>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
