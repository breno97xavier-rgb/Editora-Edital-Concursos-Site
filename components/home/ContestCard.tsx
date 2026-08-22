import React from 'react';
import { Link } from 'react-router-dom';

export interface ContestItem {
  id: string;
  sigla: string;
  nome: string;
  descricao: string;
  capaTeorico: string;
  capaQuestoes: string;
  slug: string;
}

interface ContestCardProps {
  concurso: ContestItem;
}

export const ContestCard: React.FC<ContestCardProps> = ({ concurso }) => {
  return (
    <Link 
      to={`/apostilas?concurso=${concurso.slug}`}
      className="group block h-full"
    >
      <div 
        className="
          bg-white rounded-xl p-5 sm:p-6
          border border-slate-200/80 shadow-xs
          transition-all duration-300 ease-out
          hover:shadow-lg hover:-translate-y-1 hover:border-azul-edital/40
          flex flex-col h-full justify-between
        "
      >
        {/* Topo: Identificação do Concurso */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="font-titulo font-bold text-2xl text-azul-profundo group-hover:text-azul-edital transition-colors">
              {concurso.sigla}
            </span>
            <span className="text-[11px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
              Concurso
            </span>
          </div>

          <h3 className="font-titulo text-sm font-semibold text-slate-700 mb-1 leading-snug">
            {concurso.nome}
          </h3>
          <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
            {concurso.descricao}
          </p>
        </div>

        {/* Centro: Prévia das Capas Oficiais (Teórico + Questões) */}
        <div className="relative my-3 py-3 px-2 bg-slate-50 rounded-lg flex items-center justify-center min-h-[140px] overflow-hidden">
          <div className="flex items-center justify-center -space-x-8 transform group-hover:scale-105 transition-transform duration-300">
            {/* Capa Teórico */}
            <div className="w-20 sm:w-24 z-10 drop-shadow-md transform -rotate-3 transition-transform duration-300 group-hover:-rotate-6">
              <img 
                src={concurso.capaTeorico} 
                alt={`${concurso.sigla} Teórico`} 
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            </div>
            {/* Capa Questões */}
            <div className="w-20 sm:w-24 z-20 drop-shadow-md transform rotate-3 transition-transform duration-300 group-hover:rotate-6">
              <img 
                src={concurso.capaQuestoes} 
                alt={`${concurso.sigla} Questões`} 
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Rodapé: Tags de produtos inclusos e CTA */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="inline-block bg-azul-profundo/5 text-azul-profundo text-[10px] font-medium px-2 py-0.5 rounded">
              Teórico
            </span>
            <span className="inline-block bg-amarelo-edital/20 text-azul-profundo text-[10px] font-medium px-2 py-0.5 rounded">
              Questões
            </span>
          </div>
          <span className="text-azul-edital font-semibold group-hover:text-azul-profundo flex items-center gap-1">
            Ver materiais
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ContestCard;
