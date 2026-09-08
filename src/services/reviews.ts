import { supabase } from '../lib/supabase';

export interface ReviewSummary {
  average_rating: number;
  total_reviews: number;
  rating_5_count: number;
  rating_4_count: number;
  rating_3_count: number;
  rating_2_count: number;
  rating_1_count: number;
}

export interface ProductReview {
  id: string;
  public_name: string;
  rating: number;
  comment: string;
  admin_reply: string | null;
  created_at: string;
  replied_at: string | null;
}

export interface SubmitProductReviewInput {
  product_slug: string;
  public_name: string;
  reviewer_email: string;
  rating: number;
  comment: string;
}

/**
 * Erro customizado para operações com avaliações,
 * preservando a mensagem original retornada pelo banco/RPC.
 */
export class ReviewServiceError extends Error {
  public readonly code?: string;
  public readonly details?: unknown;

  constructor(message: string, code?: string, details?: unknown) {
    super(message);
    this.name = 'ReviewServiceError';
    this.code = code;
    this.details = details;
  }
}

/**
 * Obtém o resumo consolidado de avaliações de um produto pelo slug.
 *
 * @param productSlug Slug único do produto
 * @returns Resumo estatístico de avaliações
 * @throws {ReviewServiceError} Caso ocorra erro na execução da RPC
 */
export async function getProductReviewSummary(
  productSlug: string
): Promise<ReviewSummary> {
  const { data, error } = await supabase.rpc('get_product_review_summary', {
    p_product_slug: productSlug,
  });

  if (error) {
    throw new ReviewServiceError(
      error.message || 'Erro ao carregar resumo de avaliações.',
      error.code,
      error.details
    );
  }

  // A RPC pode retornar um array com 1 objeto ou o objeto diretamente
  const summaryRow = Array.isArray(data) ? data[0] : data;

  if (!summaryRow) {
    return {
      average_rating: 0,
      total_reviews: 0,
      rating_5_count: 0,
      rating_4_count: 0,
      rating_3_count: 0,
      rating_2_count: 0,
      rating_1_count: 0,
    };
  }

  return {
    average_rating: Number(summaryRow.average_rating) || 0,
    total_reviews: Number(summaryRow.total_reviews) || 0,
    rating_5_count: Number(summaryRow.rating_5_count) || 0,
    rating_4_count: Number(summaryRow.rating_4_count) || 0,
    rating_3_count: Number(summaryRow.rating_3_count) || 0,
    rating_2_count: Number(summaryRow.rating_2_count) || 0,
    rating_1_count: Number(summaryRow.rating_1_count) || 0,
  };
}

/**
 * Obtém a lista de avaliações públicas aprovadas de um produto pelo slug.
 * O e-mail do autor nunca é retornado nesta listagem.
 *
 * @param productSlug Slug único do produto
 * @returns Lista de avaliações aprovadas
 * @throws {ReviewServiceError} Caso ocorra erro na execução da RPC
 */
export async function getProductReviews(
  productSlug: string
): Promise<ProductReview[]> {
  const { data, error } = await supabase.rpc('get_product_reviews', {
    p_product_slug: productSlug,
  });

  if (error) {
    throw new ReviewServiceError(
      error.message || 'Erro ao carregar avaliações do produto.',
      error.code,
      error.details
    );
  }

  if (!Array.isArray(data)) {
    return [];
  }

  return data.map((item: any) => ({
    id: String(item.id),
    public_name: String(item.public_name || ''),
    rating: Number(item.rating) || 0,
    comment: String(item.comment || ''),
    admin_reply: item.admin_reply ? String(item.admin_reply) : null,
    created_at: String(item.created_at || ''),
    replied_at: item.replied_at ? String(item.replied_at) : null,
  }));
}

/**
 * Envia uma nova avaliação para moderação.
 *
 * @param input Dados da avaliação (slug, nome público, email, nota e comentário)
 * @returns UUID da avaliação criada
 * @throws {ReviewServiceError} Caso ocorra erro de validação ou execução na RPC
 */
export async function submitProductReview(
  input: SubmitProductReviewInput
): Promise<string> {
  const { data, error } = await supabase.rpc('submit_product_review', {
    p_product_slug: input.product_slug,
    p_public_name: input.public_name,
    p_reviewer_email: input.reviewer_email,
    p_rating: input.rating,
    p_comment: input.comment,
  });

  if (error) {
    throw new ReviewServiceError(
      error.message || 'Erro ao enviar avaliação.',
      error.code,
      error.details
    );
  }

  return String(data);
}
