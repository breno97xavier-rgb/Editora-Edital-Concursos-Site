'use client';

import React from 'react';
import { Categoria, Materia, Concurso, labelsMaterias, labelsConcursos } from '@/data/produtos';

type FaixaPreco = 'ate-50' | '50-100' | 'acima-100';

interface SidebarFiltrosProps {
  tiposFiltro: string[];
  categoriasFiltro: Categoria[];
  materiasFiltro: Materia[];
  concursosFiltro: Concurso[];
  faixasPrecoFiltro: FaixaPreco[];
  atualizarFiltro: (chave: string, valor: string, ativar: boolean) => void;
  limparFiltros: () => void;
  totalFiltrosAtivos: number;
}

export default function SidebarFiltros({
  tiposFiltro,
  categoriasFiltro,
  materiasFiltro,
  concursosFiltro,
  faixasPrecoFiltro,
  atualizarFiltro,
  limparFiltros,
  totalFiltrosAtivos,
}: SidebarFiltrosProps) {
  return (
    <div className="bg-branco rounded-lg p-6 sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-titulo font-bold text-lg text-azul-profundo">
          Filtros
        </h2>
        {totalFiltrosAtivos > 0 && (
          <button
            onClick={limparFiltros}
            className="text-xs text-cinza-medio hover:text-azul-profundo underline"
          >
            Limpar tudo
          </button>
        )}
      </div>

      {/* TIPO DE MATERIAL */}
      <BlocoFiltro titulo="Tipo de material">
        <CheckboxFiltro 
          label="Apostila Teórica" 
          ativo={tiposFiltro.includes('teorico')}
          onChange={(ativo) => atualizarFiltro('tipo', 'teorico', ativo)}
        />
        <CheckboxFiltro 
          label="Caderno de Questões" 
          ativo={tiposFiltro.includes('questoes')}
          onChange={(ativo) => atualizarFiltro('tipo', 'questoes', ativo)}
        />
      </BlocoFiltro>

      {/* CATEGORIA */}
      <BlocoFiltro titulo="Categoria">
        <CheckboxFiltro 
          label="Matéria Básica" 
          ativo={categoriasFiltro.includes('materia')}
          onChange={(ativo) => atualizarFiltro('categoria', 'materia', ativo)}
        />
        <CheckboxFiltro 
          label="Concurso Específico" 
          ativo={categoriasFiltro.includes('concurso')}
          onChange={(ativo) => atualizarFiltro('categoria', 'concurso', ativo)}
        />
      </BlocoFiltro>

      {/* MATÉRIA — visível apenas se categoria=materia ou nenhuma categoria */}
      {(categoriasFiltro.length === 0 || categoriasFiltro.includes('materia')) && (
        <BlocoFiltro titulo="Matéria">
          {(Object.keys(labelsMaterias) as Materia[]).map((m) => (
            <CheckboxFiltro 
              key={m}
              label={labelsMaterias[m]} 
              ativo={materiasFiltro.includes(m)}
              onChange={(ativo) => atualizarFiltro('materia', m, ativo)}
            />
          ))}
        </BlocoFiltro>
      )}

      {/* CONCURSO — visível apenas se categoria=concurso ou nenhuma categoria */}
      {(categoriasFiltro.length === 0 || categoriasFiltro.includes('concurso')) && (
        <BlocoFiltro titulo="Concurso">
          {(Object.keys(labelsConcursos) as Concurso[]).map((c) => (
            <CheckboxFiltro 
              key={c}
              label={labelsConcursos[c]} 
              ativo={concursosFiltro.includes(c)}
              onChange={(ativo) => atualizarFiltro('concurso', c, ativo)}
            />
          ))}
        </BlocoFiltro>
      )}

      {/* FAIXA DE PREÇO */}
      <BlocoFiltro titulo="Faixa de preço" ultimo>
        <CheckboxFiltro 
          label="Até R$ 50" 
          ativo={faixasPrecoFiltro.includes('ate-50')}
          onChange={(ativo) => atualizarFiltro('preco', 'ate-50', ativo)}
        />
        <CheckboxFiltro 
          label="R$ 50 a R$ 100" 
          ativo={faixasPrecoFiltro.includes('50-100')}
          onChange={(ativo) => atualizarFiltro('preco', '50-100', ativo)}
        />
        <CheckboxFiltro 
          label="Acima de R$ 100" 
          ativo={faixasPrecoFiltro.includes('acima-100')}
          onChange={(ativo) => atualizarFiltro('preco', 'acima-100', ativo)}
        />
      </BlocoFiltro>
    </div>
  );
}

function BlocoFiltro({ 
  titulo, 
  children, 
  ultimo = false 
}: { 
  titulo: string; 
  children: React.ReactNode; 
  ultimo?: boolean;
}) {
  return (
    <div className={`${ultimo ? '' : 'border-b border-cinza-claro pb-5 mb-5'}`}>
      <h3 className="font-titulo font-bold text-sm text-cinza-escuro uppercase tracking-wider mb-3">
        {titulo}
      </h3>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );
}

function CheckboxFiltro({ 
  label, 
  ativo, 
  onChange 
}: { 
  key?: string;
  label: string; 
  ativo: boolean; 
  onChange: (ativo: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer hover:text-azul-profundo transition group">
      <input 
        type="checkbox" 
        checked={ativo}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 accent-dourado cursor-pointer rounded border-cinza-claro"
      />
      <span className={`text-sm ${ativo ? 'text-azul-profundo font-medium' : 'text-cinza-medio'} group-hover:text-azul-profundo transition`}>
        {label}
      </span>
    </label>
  );
}
