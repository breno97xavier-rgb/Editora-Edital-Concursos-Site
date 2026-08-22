import React from 'react';
import { Link } from 'react-router-dom';
import Book3D from './Book3D';
import ComboCover from './ComboCover';
import { Produto, getDetalhesCombo } from '@/data/produtos';

export type ProdutoCard = Produto;

interface CardProdutoProps {
  produto: Produto;
  className?: string;
}

export const CardProduto: React.FC<CardProdutoProps> = ({ produto, className = '' }) => {
  const { slug, titulo, tipo, preco, capaUrl, comboInfo } = produto;

  const isCombo = tipo === 'combo';
  const detalhesCombo = isCombo ? getDetalhesCombo(produto) : null;

  const labelTipo = isCombo
    ? 'Combo Teórico + Questões'
    : tipo === 'questoes'
    ? 'Caderno de Questões'
    : produto.categoria === 'materia'
    ? 'Material por Matéria'
    : 'Material Teórico';

  const corBadge = isCombo
    ? 'bg-azul-profundo text-amarelo-edital border border-amarelo-edital/40 font-bold shadow-xs'
    : tipo === 'questoes'
    ? 'bg-amarelo-edital text-azul-profundo font-bold shadow-xs'
    : produto.categoria === 'materia'
    ? 'bg-slate-100 text-azul-profundo border border-slate-200 font-semibold'
    : 'bg-azul-profundo text-white font-semibold';

  const temPreco = typeof preco === 'number' && preco > 0;
  const precoFormatado = temPreco ? preco.toFixed(2).replace('.', ',') : null;

  // Cálculo dinâmico para combos a partir da fonte única de dados
  const valorSeparadoFormatado = detalhesCombo 
    ? detalhesCombo.valorSeparado.toFixed(2).replace('.', ',') 
    : null;
  const economiaFormatada = detalhesCombo 
    ? detalhesCombo.economia.toFixed(2).replace('.', ',') 
    : null;

  return (
    <Link 
      to={`/apostila/${slug}`}
      className={`card-produto group block h-full ${className}`}
    >
      <article 
        className="
          bg-white rounded-xl overflow-hidden
          border border-slate-200/80 shadow-xs
          transition-all duration-300 ease-out
          hover:shadow-lg hover:-translate-y-1 hover:border-azul-edital/40
          flex flex-col h-full
        "
      >
        {/* Área da imagem com fundo neutro sutil */}
        <div 
          className="
            relative
            flex items-center justify-center
            py-6 px-4
            bg-slate-50/70
            min-h-[270px]
            border-b border-slate-100
          "
        >
          {/* Badge do tipo de produto */}
          <span 
            className={`
              absolute top-3 left-3 z-30
              text-[11px] font-titulo
              px-2.5 py-1 rounded-md
              ${corBadge}
            `}
          >
            {labelTipo}
          </span>

          {/* Imagem do material (Capa 3D oficial ou Composição de Combo) */}
          <div className="transform transition-transform duration-300 group-hover:scale-105">
            {isCombo && comboInfo ? (
              <ComboCover
                capaTeorico={comboInfo.capaTeorico}
                capaQuestoes={comboInfo.capaQuestoes}
                titulo={titulo}
                tamanho="medio"
              />
            ) : (
              <Book3D 
                capaUrl={capaUrl} 
                titulo={titulo} 
                tamanho="medio" 
              />
            )}
          </div>
        </div>

        {/* Área de informações */}
        <div className="p-5 flex flex-col flex-grow">
          {/* Título */}
          <h3 
            className="
              font-titulo font-bold text-azul-profundo 
              text-base leading-snug mb-3
              line-clamp-2 min-h-[2.6em]
              group-hover:text-azul-edital
              transition-colors
            "
          >
            {titulo}
          </h3>

          {/* Bloco de Preço */}
          <div className="mb-4 mt-auto">
            {temPreco ? (
              <div>
                {isCombo && valorSeparadoFormatado ? (
                  <div>
                    <span className="text-slate-400 text-xs line-through block">
                      Comprando separadamente: R$ {valorSeparadoFormatado}
                    </span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="font-titulo font-bold text-2xl text-azul-profundo">
                        R$ {precoFormatado}
                      </span>
                    </div>
                    {economiaFormatada && (
                      <span className="inline-block mt-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                        Economize R$ {economiaFormatada}
                      </span>
                    )}
                  </div>
                ) : (
                  <div>
                    <span className="text-slate-500 text-xs block mb-0.5">
                      Preço oficial:
                    </span>
                    <span className="font-titulo font-bold text-2xl text-azul-profundo block">
                      R$ {precoFormatado}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <span className="text-slate-500 text-xs font-medium block py-2">
                Consulte condições
              </span>
            )}
          </div>

          {/* Botão CTA */}
          <div 
            className="
              w-full
              bg-azul-profundo text-white
              font-titulo font-semibold text-sm
              py-2.5 px-4 rounded-lg
              transition-all duration-200
              group-hover:bg-amarelo-edital group-hover:text-azul-profundo
              flex items-center justify-center gap-2
            "
          >
            <span>{isCombo ? 'Ver combo' : 'Ver material'}</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default CardProduto;
