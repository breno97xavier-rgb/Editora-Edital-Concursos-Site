import React from 'react';
import { Link } from 'react-router-dom';
import Book3D from '../produto/Book3D';

export interface SubjectItem {
  id: string;
  slug: string;
  nome: string;
  descricao: string;
  capaUrl: string;
  linkProduto: string;
  topicos: string[];
}

interface SubjectCardProps {
  materia: SubjectItem;
}

export const SubjectCard: React.FC<SubjectCardProps> = ({ materia }) => {
  return (
    <Link 
      to={materia.linkProduto}
      className="group block h-full"
    >
      <div 
        className="
          bg-white rounded-xl overflow-hidden
          border border-slate-200/80 shadow-xs
          transition-all duration-300 ease-out
          hover:shadow-lg hover:-translate-y-1 hover:border-azul-edital/40
          flex flex-col h-full
        "
      >
        {/* Capa com fundo neutro */}
        <div className="relative py-6 px-4 bg-slate-50/70 flex items-center justify-center min-h-[220px] border-b border-slate-100">
          <span className="absolute top-3 left-3 text-[11px] font-semibold bg-azul-profundo text-white px-2 py-0.5 rounded">
            Disciplina
          </span>
          <div className="transform transition-transform duration-300 group-hover:scale-105">
            <Book3D 
              capaUrl={materia.capaUrl} 
              titulo={materia.nome} 
              tamanho="medio" 
            />
          </div>
        </div>

        {/* Informações da matéria */}
        <div className="p-5 flex flex-col flex-grow justify-between">
          <div>
            <h3 className="font-titulo font-bold text-base text-azul-profundo group-hover:text-azul-edital transition-colors mb-1.5 leading-snug">
              {materia.nome}
            </h3>
            <p className="text-xs text-slate-500 mb-3 leading-relaxed line-clamp-2">
              {materia.descricao}
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Material em PDF</span>
            <span className="font-semibold text-azul-profundo group-hover:text-azul-edital flex items-center gap-1">
              Ver material
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SubjectCard;
