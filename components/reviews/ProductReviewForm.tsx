import React, { useState } from 'react';
import { Star, Send, CheckCircle, AlertCircle, X } from 'lucide-react';
import {
  submitProductReview,
  ReviewServiceError,
  SubmitProductReviewInput,
} from '@/src/services/reviews';

interface ProductReviewFormProps {
  productSlug: string;
  onClose?: () => void;
}

const RATING_LABELS: Record<number, string> = {
  1: '1 estrela (Muito insatisfeito)',
  2: '2 estrelas (Insatisfeito)',
  3: '3 estrelas (Regular)',
  4: '4 estrelas (Bom)',
  5: '5 estrelas (Excelente)',
};

export default function ProductReviewForm({
  productSlug,
  onClose,
}: ProductReviewFormProps) {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [publicName, setPublicName] = useState<string>('');
  const [reviewerEmail, setReviewerEmail] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const [fieldErrors, setFieldErrors] = useState<{
    rating?: string;
    publicName?: string;
    reviewerEmail?: string;
    comment?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // Validação amigável no frontend antes do envio
  const validateForm = (): boolean => {
    const errors: typeof fieldErrors = {};

    if (!rating || rating < 1 || rating > 5) {
      errors.rating = 'Escolha uma nota de 1 a 5 estrelas.';
    }

    const trimmedName = publicName.trim();
    if (!trimmedName) {
      errors.publicName = 'Informe o nome que será exibido na avaliação.';
    } else if (trimmedName.length > 100) {
      errors.publicName = 'O nome deve ter no máximo 100 caracteres.';
    }

    const trimmedEmail = reviewerEmail.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail) {
      errors.reviewerEmail = 'Informe seu e-mail.';
    } else if (!emailRegex.test(trimmedEmail)) {
      errors.reviewerEmail = 'Informe um endereço de e-mail válido.';
    } else if (trimmedEmail.length > 320) {
      errors.reviewerEmail = 'O e-mail deve ter no máximo 320 caracteres.';
    }

    const trimmedComment = comment.trim();
    if (!trimmedComment) {
      errors.comment = 'Escreva seu comentário sobre o material.';
    } else if (trimmedComment.length > 5000) {
      errors.comment = 'Seu comentário ultrapassa o limite de 5.000 caracteres.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Mapeamento de mensagens amigáveis baseadas no erro retornado pela RPC/banco
  const mapErrorMessage = (error: unknown): string => {
    if (error instanceof ReviewServiceError) {
      const msg = (error.message || '').toUpperCase();

      if (msg.includes('PUBLIC_NAME_REQUIRED')) {
        return 'Informe o nome que será exibido na avaliação.';
      }
      if (msg.includes('PUBLIC_NAME_TOO_LONG')) {
        return 'O nome informado é muito longo (máximo 100 caracteres).';
      }
      if (msg.includes('EMAIL_REQUIRED')) {
        return 'Informe seu e-mail.';
      }
      if (msg.includes('INVALID_EMAIL')) {
        return 'Informe um endereço de e-mail válido.';
      }
      if (msg.includes('EMAIL_TOO_LONG')) {
        return 'O e-mail informado é muito longo (máximo 320 caracteres).';
      }
      if (msg.includes('INVALID_RATING')) {
        return 'Escolha uma nota de 1 a 5 estrelas.';
      }
      if (msg.includes('COMMENT_REQUIRED')) {
        return 'Escreva seu comentário.';
      }
      if (msg.includes('COMMENT_TOO_LONG')) {
        return 'Seu comentário ultrapassa o limite permitido de 5.000 caracteres.';
      }
      if (msg.includes('PRODUCT_NOT_REVIEWABLE')) {
        return 'Este material não está aceitando novas avaliações no momento.';
      }
    }

    // Registra o erro técnico no console para depuração em desenvolvimento
    console.error('[ProductReviewForm] Erro inesperado ao enviar avaliação:', error);
    return 'Não foi possível enviar sua avaliação agora. Tente novamente em alguns instantes.';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);

    // Evita duplo envio
    if (isSubmitting) return;

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const payload: SubmitProductReviewInput = {
      product_slug: productSlug,
      public_name: publicName.trim(),
      reviewer_email: reviewerEmail.trim(),
      rating,
      comment: comment.trim(),
    };

    try {
      await submitProductReview(payload);
      
      // Limpa os campos após envio bem-sucedido
      setRating(0);
      setHoverRating(0);
      setPublicName('');
      setReviewerEmail('');
      setComment('');
      setFieldErrors({});
      setIsSuccess(true);
    } catch (err) {
      setGeneralError(mapErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Feedback de Sucesso
  if (isSuccess) {
    return (
      <div
        className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-6 sm:p-8 text-center my-6"
        role="alert"
        aria-live="polite"
      >
        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
          <CheckCircle size={26} />
        </div>
        <h3 className="font-titulo text-lg sm:text-xl font-bold text-emerald-900 mb-1">
          Avaliação enviada com sucesso.
        </h3>
        <p className="text-sm text-emerald-800 max-w-md mx-auto leading-relaxed">
          Obrigado por compartilhar sua experiência. Sua avaliação será analisada antes de ser publicada.
        </p>
        <div className="mt-5">
          <button
            type="button"
            onClick={() => {
              setIsSuccess(false);
              if (onClose) onClose();
            }}
            className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-emerald-800 bg-white border border-emerald-300 rounded-lg hover:bg-emerald-100/50 transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    );
  }

  const activeRating = hoverRating || rating;

  return (
    <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 sm:p-8 my-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200/80 mb-6">
        <div>
          <h3 className="font-titulo text-lg sm:text-xl font-bold text-azul-profundo">
            Avaliar este material
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Compartilhe sua experiência de estudos para ajudar outros concurseiros.
          </p>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition-colors"
            aria-label="Fechar formulário de avaliação"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Alerta de erro geral */}
      {generalError && (
        <div
          className="flex items-start gap-2.5 p-3.5 bg-rose-50 border border-rose-200/80 text-rose-700 text-xs sm:text-sm rounded-xl mb-5"
          role="alert"
          aria-live="polite"
        >
          <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
          <span>{generalError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* ========================================================================= */}
        {/* CAMPO 1: NOTA EM ESTRELAS */}
        {/* ========================================================================= */}
        <div>
          <label className="block text-xs sm:text-sm font-bold text-azul-profundo mb-1.5">
            Sua nota para este material <span className="text-rose-500">*</span>
          </label>

          <div className="flex flex-wrap items-center gap-2">
            <div
              className="flex items-center gap-1"
              role="radiogroup"
              aria-label="Classificação de 1 a 5 estrelas"
            >
              {[1, 2, 3, 4, 5].map((starValue) => {
                const isFilled = starValue <= activeRating;
                const isCurrentSelected = starValue === rating;

                return (
                  <button
                    key={starValue}
                    type="button"
                    role="radio"
                    aria-checked={isCurrentSelected}
                    aria-label={`${starValue} de 5 estrelas`}
                    onClick={() => {
                      setRating(starValue);
                      if (fieldErrors.rating) {
                        setFieldErrors((prev) => ({ ...prev, rating: undefined }));
                      }
                    }}
                    onMouseEnter={() => setHoverRating(starValue)}
                    onMouseLeave={() => setHoverRating(0)}
                    onFocus={() => setHoverRating(starValue)}
                    onBlur={() => setHoverRating(0)}
                    className="p-1 rounded-md text-slate-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-azul-edital transition-all cursor-pointer"
                  >
                    <Star
                      size={28}
                      className={
                        isFilled
                          ? 'text-amber-400 fill-amber-400 stroke-[1.5]'
                          : 'text-slate-300 stroke-[1.5]'
                      }
                    />
                  </button>
                );
              })}
            </div>

            {activeRating > 0 && (
              <span className="text-xs font-semibold text-slate-600 ml-1">
                {RATING_LABELS[activeRating]}
              </span>
            )}
          </div>

          {fieldErrors.rating && (
            <p className="text-xs text-rose-600 font-medium mt-1.5" role="alert">
              {fieldErrors.rating}
            </p>
          )}
        </div>

        {/* ========================================================================= */}
        {/* CAMPO 2 E 3: NOME PÚBLICO E E-MAIL */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {/* Nome Público */}
          <div>
            <label
              htmlFor="public_name_input"
              className="block text-xs sm:text-sm font-bold text-azul-profundo mb-1"
            >
              Nome que aparecerá na avaliação <span className="text-rose-500">*</span>
            </label>
            <input
              id="public_name_input"
              type="text"
              value={publicName}
              maxLength={100}
              placeholder="Ex.: Ana, Carlos, João S."
              onChange={(e) => {
                setPublicName(e.target.value);
                if (fieldErrors.publicName) {
                  setFieldErrors((prev) => ({ ...prev, publicName: undefined }));
                }
              }}
              className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                fieldErrors.publicName
                  ? 'border-rose-300 focus:ring-rose-400'
                  : 'border-slate-200 focus:border-azul-edital focus:ring-azul-edital/20'
              }`}
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Esse nome ficará visível publicamente no site.
            </p>
            {fieldErrors.publicName && (
              <p className="text-xs text-rose-600 font-medium mt-1" role="alert">
                {fieldErrors.publicName}
              </p>
            )}
          </div>

          {/* E-mail (privado) */}
          <div>
            <label
              htmlFor="reviewer_email_input"
              className="block text-xs sm:text-sm font-bold text-azul-profundo mb-1"
            >
              E-mail <span className="text-rose-500">*</span>
            </label>
            <input
              id="reviewer_email_input"
              type="email"
              value={reviewerEmail}
              maxLength={320}
              placeholder="seuemail@exemplo.com"
              onChange={(e) => {
                setReviewerEmail(e.target.value);
                if (fieldErrors.reviewerEmail) {
                  setFieldErrors((prev) => ({ ...prev, reviewerEmail: undefined }));
                }
              }}
              className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                fieldErrors.reviewerEmail
                  ? 'border-rose-300 focus:ring-rose-400'
                  : 'border-slate-200 focus:border-azul-edital focus:ring-azul-edital/20'
              }`}
            />
            <p className="text-[11px] text-slate-500 font-medium mt-1">
              Seu e-mail não será publicado.
            </p>
            {fieldErrors.reviewerEmail && (
              <p className="text-xs text-rose-600 font-medium mt-1" role="alert">
                {fieldErrors.reviewerEmail}
              </p>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CAMPO 4: COMENTÁRIO */}
        {/* ========================================================================= */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label
              htmlFor="comment_textarea"
              className="block text-xs sm:text-sm font-bold text-azul-profundo"
            >
              Conte como foi sua experiência com o material{' '}
              <span className="text-rose-500">*</span>
            </label>
            <span className="text-[11px] text-slate-400">
              {comment.length} / 5.000
            </span>
          </div>
          <textarea
            id="comment_textarea"
            rows={4}
            value={comment}
            maxLength={5000}
            placeholder="Destaque a didática, questões resolvidas, pontos positivos e como o material ajudou na sua preparação..."
            onChange={(e) => {
              setComment(e.target.value);
              if (fieldErrors.comment) {
                setFieldErrors((prev) => ({ ...prev, comment: undefined }));
              }
            }}
            className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all resize-y ${
              fieldErrors.comment
                ? 'border-rose-300 focus:ring-rose-400'
                : 'border-slate-200 focus:border-azul-edital focus:ring-azul-edital/20'
            }`}
          />
          {fieldErrors.comment && (
            <p className="text-xs text-rose-600 font-medium mt-1" role="alert">
              {fieldErrors.comment}
            </p>
          )}
        </div>

        {/* ========================================================================= */}
        {/* AVISO DE PRIVACIDADE */}
        {/* ========================================================================= */}
        <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed bg-white/70 p-3 rounded-xl border border-slate-200/60">
          🔒 <strong className="font-semibold text-slate-700">Privacidade:</strong> Seu nome escolhido, nota e comentário poderão aparecer publicamente após moderação. Seu e-mail não será publicado.
        </p>

        {/* ========================================================================= */}
        {/* BOTÕES DE AÇÃO */}
        {/* ========================================================================= */}
        <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
          {onClose && (
            <button
              type="button"
              disabled={isSubmitting}
              onClick={onClose}
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 rounded-xl transition-colors disabled:opacity-50 cursor-pointer"
            >
              Cancelar
            </button>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-azul-profundo hover:bg-azul-profundo/90 active:scale-[0.98] rounded-xl shadow-xs hover:shadow-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Enviando...</span>
              </>
            ) : (
              <>
                <Send size={15} />
                <span>Enviar avaliação</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
