import React, { useEffect, useState } from 'react';
import { Star, MessageSquareQuote, PenLine } from 'lucide-react';
import {
  getProductReviewSummary,
  getProductReviews,
  ReviewSummary,
  ProductReview,
} from '@/src/services/reviews';
import ProductReviewForm from './ProductReviewForm';

interface ProductReviewsSectionProps {
  productSlug: string;
}

/**
 * Componente de estrelas reutilizável e preciso para notas de 1 a 5.
 */
interface ReviewStarsProps {
  rating: number;
  size?: number;
}

const ReviewStars: React.FC<ReviewStarsProps> = ({ rating, size = 16 }) => {
  return (
    <div className="flex items-center gap-0.5" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((starIndex) => {
        const fillFraction = Math.max(0, Math.min(1, rating - (starIndex - 1)));
        const fillPercent = fillFraction * 100;

        return (
          <div key={starIndex} className="relative inline-flex items-center justify-center">
            <Star
              size={size}
              className="text-slate-200 stroke-[1.5]"
            />
            {fillPercent > 0 && (
              <div
                className="absolute top-0 left-0 h-full overflow-hidden"
                style={{ width: `${fillPercent}%` }}
              >
                <Star
                  size={size}
                  className="text-amber-400 fill-amber-400 stroke-[1.5] flex-shrink-0"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

/**
 * Formata data em formato amigável no padrão brasileiro (ex: 8 de setembro de 2026).
 */
function formatarDataPtBr(dataIso: string): string {
  try {
    const data = new Date(dataIso);
    if (isNaN(data.getTime())) return '';
    return new Intl.DateTimeFormat('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(data);
  } catch {
    return '';
  }
}

interface ReviewCardProps {
  review: ProductReview;
}

/**
 * Card individual de avaliação do aluno.
 */
const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const dataFormatada = formatarDataPtBr(review.created_at);
  const dataRespostaFormatada = review.replied_at ? formatarDataPtBr(review.replied_at) : null;

  return (
    <article className="bg-white rounded-xl border border-slate-200/90 p-5 sm:p-6 shadow-xs transition-shadow hover:shadow-sm">
      {/* Cabeçalho da avaliação: Nome, Nota e Data */}
      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
        <div>
          <div>
            <span className="font-titulo font-bold text-azul-profundo text-base">
              {review.public_name}
            </span>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <ReviewStars rating={review.rating} size={15} />
            <span className="sr-only">Nota {review.rating} de 5 estrelas</span>
            {dataFormatada && (
              <span className="text-xs text-slate-400">
                · {dataFormatada}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Comentário da avaliação */}
      <p className="text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
        {review.comment}
      </p>

      {/* Resposta Oficial da Editora (quando existir) */}
      {review.admin_reply && (
        <div className="mt-4 pt-4 border-t border-slate-100 bg-slate-50/80 rounded-xl p-4 border-l-4 border-l-azul-edital">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-1.5 font-titulo font-bold text-xs text-azul-profundo">
              <MessageSquareQuote size={15} className="text-azul-edital" />
              <span>Resposta da Editora Edital Concursos</span>
            </div>
            {dataRespostaFormatada && (
              <span className="text-[11px] text-slate-400">
                {dataRespostaFormatada}
              </span>
            )}
          </div>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
            {review.admin_reply}
          </p>
        </div>
      )}
    </article>
  );
}

export default function ProductReviewsSection({ productSlug }: ProductReviewsSectionProps) {
  const [summary, setSummary] = useState<ReviewSummary | null>(null);
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setHasError(false);

    Promise.all([
      getProductReviewSummary(productSlug),
      getProductReviews(productSlug),
    ])
      .then(([summaryData, reviewsData]) => {
        if (isMounted) {
          setSummary(summaryData);
          setReviews(reviewsData);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error('[ProductReviewsSection] Erro ao carregar avaliações:', err);
          setHasError(true);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [productSlug]);

  // Se houver erro crítico na conexão, mantém o restante da página sem quebra
  if (hasError) {
    return null;
  }

  // Estado de Carregamento com Skeleton sutil
  if (loading) {
    return (
      <section
        id="avaliacoes"
        aria-busy="true"
        aria-label="Carregando avaliações do material"
        className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 lg:p-10 shadow-xs mb-10"
      >
        <div className="w-64 h-7 bg-slate-200/70 rounded-md animate-pulse mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 p-6 bg-slate-50 rounded-xl border border-slate-100 space-y-4">
            <div className="w-16 h-10 bg-slate-200/70 rounded-md animate-pulse" />
            <div className="w-32 h-4 bg-slate-200/70 rounded-md animate-pulse" />
            <div className="space-y-2 pt-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-full h-3 bg-slate-200/70 rounded-xs animate-pulse" />
              ))}
            </div>
          </div>
          <div className="lg:col-span-8 space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="h-32 bg-slate-100/70 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const total = summary?.total_reviews ?? 0;
  const temAvaliacoes = total > 0;
  const notaFormatada = summary ? summary.average_rating.toFixed(1).replace('.', ',') : '0,0';
  const labelTotal = total === 1 ? '1 avaliação' : `${total} avaliações`;

  // Distribuição de notas calculada exclusivamente com base nos contadores reais
  const distribuicao = summary
    ? [
        {
          estrelas: 5,
          label: '5 estrelas',
          count: summary.rating_5_count,
          percent: total > 0 ? (summary.rating_5_count / total) * 100 : 0,
        },
        {
          estrelas: 4,
          label: '4 estrelas',
          count: summary.rating_4_count,
          percent: total > 0 ? (summary.rating_4_count / total) * 100 : 0,
        },
        {
          estrelas: 3,
          label: '3 estrelas',
          count: summary.rating_3_count,
          percent: total > 0 ? (summary.rating_3_count / total) * 100 : 0,
        },
        {
          estrelas: 2,
          label: '2 estrelas',
          count: summary.rating_2_count,
          percent: total > 0 ? (summary.rating_2_count / total) * 100 : 0,
        },
        {
          estrelas: 1,
          label: '1 estrela',
          count: summary.rating_1_count,
          percent: total > 0 ? (summary.rating_1_count / total) * 100 : 0,
        },
      ]
    : [];

  return (
    <section
      id="avaliacoes"
      className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 lg:p-10 shadow-xs mb-10 scroll-mt-24"
      aria-label="Avaliações dos alunos"
    >
      {/* Título da Seção e Botão de Ação */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 mb-6">
        <div>
          <h2 className="font-titulo text-2xl sm:text-3xl font-bold text-azul-profundo leading-tight">
            Avaliações de quem já estudou com este material
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Avaliações publicadas por leitores dos materiais da Editora Edital Concursos.
          </p>
        </div>

        {!showForm && (
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold text-azul-profundo bg-slate-50 hover:bg-azul-profundo hover:text-white border border-azul-profundo/20 rounded-xl transition-all shadow-2xs hover:shadow-xs flex-shrink-0 cursor-pointer"
          >
            <PenLine size={15} />
            <span>Avaliar este material</span>
          </button>
        )}
      </div>

      {/* Formulário de Envio de Avaliação */}
      {showForm && (
        <ProductReviewForm
          productSlug={productSlug}
          onClose={() => setShowForm(false)}
        />
      )}

      {temAvaliacoes ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ========================================================================= */}
          {/* COLUNA ESQUERDA — Resumo Estatístico e Distribuição por Nota */}
          {/* ========================================================================= */}
          <div className="lg:col-span-4 bg-slate-50/90 rounded-2xl border border-slate-200/80 p-6">
            <div className="flex flex-col items-center text-center pb-6 border-b border-slate-200/80">
              <span className="font-titulo text-5xl font-black text-azul-profundo leading-none mb-2">
                {notaFormatada}
              </span>
              <ReviewStars rating={summary?.average_rating ?? 0} size={22} />
              <span className="text-xs font-semibold text-slate-500 mt-2">
                Nota baseada em {labelTotal}
              </span>
            </div>

            {/* Barras de Distribuição das Notas (5 a 1) */}
            <div className="pt-6 space-y-2.5">
              <span className="text-xs font-bold text-slate-700 block mb-1">
                Distribuição das avaliações:
              </span>
              {distribuicao.map((item) => (
                <div key={item.estrelas} className="flex items-center gap-2 text-xs">
                  <span className="w-16 font-medium text-slate-600 flex-shrink-0 text-left">
                    {item.label}
                  </span>
                  
                  {/* Barra de Progresso Real */}
                  <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all duration-300"
                      style={{ width: `${item.percent}%` }}
                      role="progressbar"
                      aria-valuenow={item.count}
                      aria-valuemin={0}
                      aria-valuemax={total}
                      aria-label={`${item.label}: ${item.count} avaliações`}
                    />
                  </div>

                  <span className="w-6 text-right font-semibold text-slate-500 flex-shrink-0">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* COLUNA DIREITA — Lista de Avaliações */}
          {/* ========================================================================= */}
          <div className="lg:col-span-8 space-y-4">
            {reviews.map((rev) => (
              <ReviewCard key={rev.id} review={rev} />
            ))}
          </div>

        </div>
      ) : (
        /* ========================================================================= */
        /* ESTADO VAZIO (ZERO AVALIAÇÕES) */
        /* ========================================================================= */
        <div className="bg-slate-50/70 rounded-2xl border border-slate-200/70 p-8 sm:p-12 text-center max-w-2xl mx-auto">
          <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200/80 flex items-center justify-center mx-auto mb-4 text-slate-400">
            <Star size={24} className="stroke-[1.5]" />
          </div>
          <h3 className="font-titulo text-lg font-bold text-azul-profundo mb-2">
            Este material ainda não recebeu avaliações.
          </h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            Seja um dos primeiros concurseiros a estudar com este material digital e compartilhar sua experiência de preparação.
          </p>
          {!showForm && (
            <div className="mt-5">
              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-azul-profundo hover:bg-azul-profundo/90 rounded-xl transition-all shadow-xs cursor-pointer"
              >
                <PenLine size={15} />
                <span>Avaliar este material</span>
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
