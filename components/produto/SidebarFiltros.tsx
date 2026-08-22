import React from 'react';
import { Concurso, Materia, labelsConcursos, labelsMaterias } from '@/data/produtos';
import { X, RotateCcw } from 'lucide-react';

export type TipoFiltro = 'todos' | 'teorico' | 'questoes' | 'materia' | 'combo';

interface SidebarFiltrosProps {
  concursoAtivo: string;
  materiaAtiva: string;
  tipoAtivo: string;
  onSelectConcurso: (concurso: string) => void;
  onSelectMateria: (materia: string) => void;
  onSelectTipo: (tipo: string) => void;
  onLimparFiltros: () => void;
  totalFiltrosAtivos: number;
}

export const OPCOES_CONCURSOS: { id: Concurso; label: string }[] = [
  { id: 'prf', label: 'PRF — Polícia Rodoviária Federal' },
  { id: 'inss', label: 'INSS — Seguro Social' },
  { id: 'bacen', label: 'BACEN — Banco Central' },
  { id: 'bb', label: 'Banco do Brasil' },
  { id: 'ata-mf', label: 'ATA-MF — Ministério da Fazenda' },
];

export const OPCOES_MATERIAS: { id: Materia; label: string }[] = [
  { id: 'portugues', label: 'Língua Portuguesa' },
  { id: 'matematica', label: 'Matemática' },
  { id: 'constitucional', label: 'Direito Constitucional' },
  { id: 'administrativo', label: 'Direito Administrativo' },
  { id: 'informatica', label: 'Informática' },
  { id: 'raciocinio-logico', label: 'Raciocínio Lógico' },
  { id: 'adm-publica', label: 'Administração Pública' },
];

export const OPCOES_TIPOS: { id: TipoFiltro; label: string }[] = [
  { id: 'todos', label: 'Todos os materiais' },
  { id: 'teorico', label: 'Material Teórico' },
  { id: 'questoes', label: 'Caderno de Questões' },
  { id: 'combo', label: 'Combo Teórico + Questões' },
  { id: 'materia', label: 'Material por Matéria' },
];

export default function SidebarFiltros({
  concursoAtivo,
  materiaAtiva,
  tipoAtivo,
  onSelectConcurso,
  onSelectMateria,
  onSelectTipo,
  onLimparFiltros,
  totalFiltrosAtivos,
}: SidebarFiltrosProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
      {/* Topo da Sidebar */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="font-titulo font-bold text-base text-azul-profundo">
            Filtros
          </span>
          {totalFiltrosAtivos > 0 && (
            <span className="bg-azul-profundo text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
              {totalFiltrosAtivos}
            </span>
          )}
        </div>

        {totalFiltrosAtivos > 0 && (
          <button
            onClick={onLimparFiltros}
            className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-azul-profundo font-medium transition-colors cursor-pointer"
            title="Limpar todos os filtros"
          >
            <RotateCcw size={12} />
            <span>Limpar</span>
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* 1. TIPO DE PRODUTO */}
        <div>
          <h3 className="font-titulo font-bold text-xs text-slate-400 uppercase tracking-wider mb-2.5">
            Tipo de Material
          </h3>
          <div className="space-y-1">
            {OPCOES_TIPOS.map((tipo) => {
              const isSelected = (tipo.id === 'todos' && !tipoAtivo) || tipoAtivo === tipo.id;
              return (
                <button
                  key={tipo.id}
                  onClick={() => onSelectTipo(tipo.id === 'todos' ? '' : tipo.id)}
                  className={`
                    w-full text-left px-3 py-2 rounded-lg text-xs sm:text-sm font-medium
                    transition-all duration-150 flex items-center justify-between
                    ${
                      isSelected
                        ? 'bg-azul-profundo text-white font-semibold shadow-xs'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-azul-profundo'
                    }
                  `}
                >
                  <span>{tipo.label}</span>
                  {isSelected && <span className="text-amarelo-edital font-bold text-xs">✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. POR CONCURSO */}
        <div className="pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2.5">
            <h3 className="font-titulo font-bold text-xs text-slate-400 uppercase tracking-wider">
              Concurso
            </h3>
            {concursoAtivo && (
              <button
                onClick={() => onSelectConcurso('')}
                className="text-[11px] text-azul-edital hover:underline flex items-center gap-0.5"
              >
                <span>Todos</span>
                <X size={10} />
              </button>
            )}
          </div>

          <div className="space-y-1">
            <button
              onClick={() => onSelectConcurso('')}
              className={`
                w-full text-left px-3 py-2 rounded-lg text-xs sm:text-sm font-medium
                transition-all duration-150 flex items-center justify-between
                ${
                  !concursoAtivo
                    ? 'bg-azul-profundo text-white font-semibold shadow-xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-azul-profundo'
                }
              `}
            >
              <span>Todos os concursos</span>
              {!concursoAtivo && <span className="text-amarelo-edital font-bold text-xs">✓</span>}
            </button>

            {OPCOES_CONCURSOS.map((c) => {
              const isSelected = concursoAtivo === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => onSelectConcurso(isSelected ? '' : c.id)}
                  className={`
                    w-full text-left px-3 py-2 rounded-lg text-xs sm:text-sm font-medium
                    transition-all duration-150 flex items-center justify-between
                    ${
                      isSelected
                        ? 'bg-azul-profundo text-white font-semibold shadow-xs'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-azul-profundo'
                    }
                  `}
                >
                  <span className="truncate">{labelsConcursos[c.id] || c.label}</span>
                  {isSelected && <span className="text-amarelo-edital font-bold text-xs">✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. POR MATÉRIA */}
        <div className="pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2.5">
            <h3 className="font-titulo font-bold text-xs text-slate-400 uppercase tracking-wider">
              Matéria
            </h3>
            {materiaAtiva && (
              <button
                onClick={() => onSelectMateria('')}
                className="text-[11px] text-azul-edital hover:underline flex items-center gap-0.5"
              >
                <span>Todas</span>
                <X size={10} />
              </button>
            )}
          </div>

          <div className="space-y-1">
            <button
              onClick={() => onSelectMateria('')}
              className={`
                w-full text-left px-3 py-2 rounded-lg text-xs sm:text-sm font-medium
                transition-all duration-150 flex items-center justify-between
                ${
                  !materiaAtiva
                    ? 'bg-azul-profundo text-white font-semibold shadow-xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-azul-profundo'
                }
              `}
            >
              <span>Todas as matérias</span>
              {!materiaAtiva && <span className="text-amarelo-edital font-bold text-xs">✓</span>}
            </button>

            {OPCOES_MATERIAS.map((m) => {
              const isSelected = materiaAtiva === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => onSelectMateria(isSelected ? '' : m.id)}
                  className={`
                    w-full text-left px-3 py-2 rounded-lg text-xs sm:text-sm font-medium
                    transition-all duration-150 flex items-center justify-between
                    ${
                      isSelected
                        ? 'bg-azul-profundo text-white font-semibold shadow-xs'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-azul-profundo'
                    }
                  `}
                >
                  <span className="truncate">{labelsMaterias[m.id] || m.label}</span>
                  {isSelected && <span className="text-amarelo-edital font-bold text-xs">✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Botão de limpar no rodapé da sidebar */}
        {totalFiltrosAtivos > 0 && (
          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={onLimparFiltros}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-titulo font-semibold text-xs py-2.5 px-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw size={13} />
              <span>Limpar todos os filtros</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
