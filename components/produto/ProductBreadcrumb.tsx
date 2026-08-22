import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Produto, labelsConcursos, labelsMaterias, Concurso, Materia } from '@/data/produtos';

interface ProductBreadcrumbProps {
  produto: Produto;
}

export default function ProductBreadcrumb({ produto }: ProductBreadcrumbProps) {
  const isConcurso = !!produto.concurso;
  const isMateria = !!produto.materia && produto.categoria === 'materia';

  const labelCategoria = isConcurso 
    ? labelsConcursos[produto.concurso as Concurso] || produto.concurso?.toUpperCase()
    : isMateria 
    ? labelsMaterias[produto.materia as Materia] || produto.materia
    : null;

  const urlCategoria = isConcurso
    ? `/apostilas?concurso=${produto.concurso}`
    : isMateria
    ? `/apostilas?materia=${produto.materia}`
    : '/apostilas';

  return (
    <nav 
      aria-label="Breadcrumb" 
      className="text-xs sm:text-sm text-slate-500 flex flex-wrap items-center gap-1.5 sm:gap-2 mb-6"
    >
      <Link 
        to="/" 
        className="hover:text-azul-profundo transition-colors focus:outline-none focus:underline"
      >
        Início
      </Link>
      
      <ChevronRight size={14} className="text-slate-400 flex-shrink-0" />
      
      <Link 
        to="/apostilas" 
        className="hover:text-azul-profundo transition-colors focus:outline-none focus:underline"
      >
        Apostilas
      </Link>

      {labelCategoria && (
        <>
          <ChevronRight size={14} className="text-slate-400 flex-shrink-0" />
          <Link 
            to={urlCategoria} 
            className="hover:text-azul-profundo transition-colors focus:outline-none focus:underline"
          >
            {labelCategoria}
          </Link>
        </>
      )}

      <ChevronRight size={14} className="text-slate-400 flex-shrink-0" />
      
      <span 
        className="text-azul-profundo font-semibold line-clamp-1 max-w-[280px] sm:max-w-md"
        aria-current="page"
      >
        {produto.titulo}
      </span>
    </nav>
  );
}
