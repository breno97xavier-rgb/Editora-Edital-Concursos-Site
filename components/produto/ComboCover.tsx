import React from 'react';
import Book3D from './Book3D';

interface ComboCoverProps {
  capaTeorico: string;
  capaQuestoes: string;
  titulo: string;
  tamanho?: 'pequeno' | 'medio' | 'grande';
  className?: string;
}

export default function ComboCover({
  capaTeorico,
  capaQuestoes,
  titulo,
  tamanho = 'medio',
  className = '',
}: ComboCoverProps) {
  // Ajuste de dimensões relativas para sobreposição harmoniosa
  const tamanhosConfig = {
    pequeno: {
      larguraTeorico: '120px',
      larguraQuestoes: '110px',
      deslocamentoX: 'translate-x-6',
      deslocamentoY: 'translate-y-2',
      minHeight: '170px',
    },
    medio: {
      larguraTeorico: '150px',
      larguraQuestoes: '140px',
      deslocamentoX: 'translate-x-8',
      deslocamentoY: 'translate-y-3',
      minHeight: '220px',
    },
    grande: {
      larguraTeorico: '210px',
      larguraQuestoes: '190px',
      deslocamentoX: 'translate-x-12',
      deslocamentoY: 'translate-y-4',
      minHeight: '300px',
    },
  };

  const config = tamanhosConfig[tamanho];

  return (
    <div 
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ minHeight: config.minHeight }}
      aria-label={`Composição de capas do ${titulo}`}
    >
      {/* Capa 1: Material Teórico (Fundo Esquerda) */}
      <div className="transform -rotate-6 transition-transform duration-300 group-hover:-rotate-8 group-hover:-translate-x-1 z-10 drop-shadow-md">
        <Book3D
          capaUrl={capaTeorico}
          titulo={`Material Teórico — ${titulo}`}
          width={config.larguraTeorico}
        />
      </div>

      {/* Capa 2: Caderno de Questões (Frente Direita Sobreposta) */}
      <div className={`transform rotate-6 ${config.deslocamentoX} ${config.deslocamentoY} transition-transform duration-300 group-hover:rotate-8 group-hover:translate-x-7 z-20 drop-shadow-xl`}>
        <Book3D
          capaUrl={capaQuestoes}
          titulo={`Caderno de Questões — ${titulo}`}
          width={config.larguraQuestoes}
        />
      </div>
    </div>
  );
}
