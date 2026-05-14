import React from 'react';
import { Link } from 'react-router-dom';
import Book3D from './Book3D';

export type TipoProduto = 'teorico' | 'questoes';

export interface ProdutoCard {
  slug: string;
  titulo: string;
  tipo: TipoProduto;
  preco: number;
  precoOriginal?: number;
  parcelamento: string;
  capaUrl: string;
}

interface CardProdutoProps {
  produto: ProdutoCard;
  className?: string;
}

export const CardProduto: React.FC<CardProdutoProps> = ({ produto, className = '' }) => {
  const { slug, titulo, tipo, preco, precoOriginal, parcelamento, capaUrl } = produto;

  const labelTipo = tipo === 'teorico' ? 'Apostila Teórica' : 'Caderno de Questões';
  const corBadge = tipo === 'teorico' 
    ? 'bg-azul-profundo text-branco' 
    : 'bg-dourado text-azul-profundo';

  const precoFormatado = preco.toFixed(2).replace('.', ',');
  const precoOriginalFormatado = precoOriginal?.toFixed(2).replace('.', ',');
  const temDesconto = precoOriginal && precoOriginal > preco;
  const percentualDesconto = temDesconto 
    ? Math.round(((precoOriginal! - preco) / precoOriginal!) * 100)
    : 0;

  return (
    <Link 
      to={`/apostila/${slug}`}
      className={`card-produto group block h-full ${className}`}
    >
      <article 
        className="
          bg-branco rounded-lg overflow-hidden
          border border-cinza-claro
          transition-all duration-300 ease-out
          hover:shadow-xl hover:-translate-y-1 hover:border-dourado/30
          flex flex-col h-full
        "
      >
        {/* Área da imagem */}
        <div 
          className="
            relative
            flex items-center justify-center
            py-8 px-4
            min-h-[280px]
          "
        >
          {/* Badge do tipo de produto */}
          <span 
            className={`
              absolute top-3 left-3 z-10
              text-xs font-titulo font-bold
              px-3 py-1 rounded-full
              ${corBadge}
            `}
          >
            {labelTipo}
          </span>

          {/* Badge de desconto, se houver */}
          {temDesconto && (
            <span 
              className="
                absolute top-3 right-3 z-10
                text-xs font-titulo font-bold
                px-3 py-1 rounded-full
                bg-vermelho-promo text-branco
              "
            >
              -{percentualDesconto}%
            </span>
          )}

          {/* Imagem do livro 3D */}
          <div className="transform transition-transform duration-300 group-hover:scale-105">
            <Book3D 
              capaUrl={capaUrl} 
              titulo={titulo} 
              tamanho="medio" 
            />
          </div>
        </div>

        {/* Área de informações */}
        <div className="p-5 flex flex-col flex-grow">
          {/* Título */}
          <h3 
            className="
              font-titulo font-bold text-cinza-escuro 
              text-base leading-snug mb-3
              line-clamp-2 min-h-[2.6em]
              group-hover:text-azul-profundo
              transition-colors
            "
          >
            {titulo}
          </h3>

          {/* Preço */}
          <div className="mb-4 mt-auto">
            {temDesconto && (
              <span className="text-cinza-medio text-sm line-through block">
                R$ {precoOriginalFormatado}
              </span>
            )}
            <span className="font-titulo font-bold text-2xl text-azul-profundo block">
              R$ {precoFormatado}
            </span>
            <span className="text-cinza-medio text-sm">
              {parcelamento}
            </span>
          </div>

          {/* Botão CTA */}
          <div 
            className="
              w-full
              bg-azul-profundo text-branco
              font-titulo font-bold text-sm
              py-3 px-4 rounded-lg
              transition-all duration-200
              group-hover:bg-dourado group-hover:text-azul-profundo
              flex items-center justify-center gap-2
            "
          >
            Ver Apostila
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default CardProduto;
