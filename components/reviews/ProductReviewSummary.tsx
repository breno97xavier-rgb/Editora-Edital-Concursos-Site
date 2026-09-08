import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { getProductReviewSummary, ReviewSummary } from '@/src/services/reviews';

interface ProductReviewSummaryProps {
  productSlug: string;
  className?: string;
  onClick?: () => void;
}

/**
 * Componente que renderiza 5 estrelas calculando preenchimento proporcional
 * para suportar notas decimais/fracionadas com precisão visual.
 */
function RatingStars({ rating, isZero }: { rating: number; isZero: boolean }) {
  return (
    <div className="flex items-center gap-0.5" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((starIndex) => {
        if (isZero) {
          return (
            <Star
              key={starIndex}
              size={16}
              className="text-slate-300 stroke-[1.5]"
            />
          );
        }

        // Calcula porcentagem de preenchimento da estrela atual (0% a 100%)
        const fillFraction = Math.max(0, Math.min(1, rating - (starIndex - 1)));
        const fillPercent = fillFraction * 100;

        return (
          <div key={starIndex} className="relative inline-flex items-center justify-center">
            {/* Estrela de fundo (cinza / vazia) */}
            <Star
              size={16}
              className="text-slate-300 stroke-[1.5]"
            />
            
            {/* Estrela de preenchimento (dourada / amarela institucional) */}
            {fillPercent > 0 && (
              <div
                className="absolute top-0 left-0 h-full overflow-hidden"
                style={{ width: `${fillPercent}%` }}
              >
                <Star
                  size={16}
                  className="text-amber-400 fill-amber-400 stroke-[1.5] flex-shrink-0"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function ProductReviewSummary({
  productSlug,
  className = '',
  onClick,
}: ProductReviewSummaryProps) {
  const [summary, setSummary] = useState<ReviewSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setHasError(false);

    getProductReviewSummary(productSlug)
      .then((data) => {
        if (isMounted) {
          setSummary(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          // Log discreto para desenvolvimento sem impactar a interface do usuário
          console.error('[ProductReviewSummary] Erro ao carregar resumo de avaliações:', err);
          setHasError(true);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [productSlug]);

  // Se houver erro, não renderiza nota falsa nem mensagens técnicas para o visitante
  if (hasError) {
    return null;
  }

  // Estado de carregamento com placeholder reservando o espaço visual
  if (loading) {
    return (
      <div
        className={`flex items-center gap-2 min-h-[22px] ${className}`}
        aria-busy="true"
        aria-label="Carregando avaliações..."
      >
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-3.5 h-3.5 rounded-xs bg-slate-200/70 animate-pulse" />
          ))}
        </div>
        <div className="w-24 h-3.5 rounded-sm bg-slate-200/70 animate-pulse" />
      </div>
    );
  }

  if (!summary) {
    return null;
  }

  const temAvaliacoes = summary.total_reviews > 0;
  const notaFormatada = summary.average_rating.toFixed(1).replace('.', ',');
  const labelAvaliacoes = summary.total_reviews === 1 ? '1 avaliação' : `${summary.total_reviews} avaliações`;

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      const el = document.getElementById('avaliacoes');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div
      className={`inline-flex items-center gap-2 text-xs sm:text-sm select-none cursor-pointer hover:opacity-85 transition-opacity ${className}`}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      role="button"
      tabIndex={0}
      title={temAvaliacoes ? `Classificação ${notaFormatada} estrelas (${labelAvaliacoes}) — Clique para ver avaliações` : 'Ainda sem avaliações registradas — Clique para ver'}
    >
      <RatingStars rating={summary.average_rating} isZero={!temAvaliacoes} />

      {temAvaliacoes ? (
        <div className="flex items-center gap-1.5 font-medium text-slate-700">
          <span className="font-bold text-azul-profundo">{notaFormatada}</span>
          <span className="text-slate-400">·</span>
          <span className="text-slate-500 hover:text-slate-700 transition-colors underline decoration-slate-300 underline-offset-2">
            {labelAvaliacoes}
          </span>
        </div>
      ) : (
        <span className="text-slate-400 text-xs font-normal">
          Ainda sem avaliações
        </span>
      )}
    </div>
  );
}
