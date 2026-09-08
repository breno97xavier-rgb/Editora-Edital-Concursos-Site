import { supabase } from '../lib/supabase';

export type AdminReviewStatus = 'pending' | 'approved' | 'rejected' | 'hidden';

export interface AdminProductReview {
  id: string;
  product_slug: string;
  public_name: string;
  reviewer_email: string;
  rating: number;
  comment: string;
  status: AdminReviewStatus;
  admin_reply: string | null;
  created_at: string;
  updated_at: string;
  moderated_at: string | null;
  moderated_by: string | null;
  approved_at: string | null;
  replied_at: string | null;
  replied_by: string | null;
  deleted_at: string | null;
  deleted_by: string | null;
}

export interface GetAdminProductReviewsOptions {
  status?: AdminReviewStatus | null;
  include_deleted?: boolean;
}

export class AdminReviewServiceError extends Error {
  public readonly code?: string;
  public readonly details?: unknown;

  constructor(message: string, code?: string, details?: unknown) {
    super(message);
    this.name = 'AdminReviewServiceError';
    this.code = code;
    this.details = details;
  }
}

/**
 * Obtém a listagem completa de avaliações para visualização administrativa.
 * Exige sessão autenticada com permissão de administrador (`is_admin()`).
 *
 * @param options Opções de filtro por status e inclusão de registros soft deleted
 * @returns Lista de avaliações com dados administrativos completos
 * @throws {AdminReviewServiceError} Caso ocorra erro ou falha de autorização na RPC
 */
export async function getAdminProductReviews(
  options?: GetAdminProductReviewsOptions
): Promise<AdminProductReview[]> {
  const { data, error } = await supabase.rpc('admin_get_product_reviews', {
    p_status: options?.status ?? null,
    p_include_deleted: options?.include_deleted ?? true,
  });

  if (error) {
    console.error('[adminReviews] Erro ao carregar avaliações administrativas:', error);
    throw new AdminReviewServiceError(
      error.message || 'Erro ao carregar avaliações administrativas.',
      error.code,
      error.details
    );
  }

  if (!Array.isArray(data)) {
    return [];
  }

  return data.map((item: any) => ({
    id: String(item.id),
    product_slug: String(item.product_slug || ''),
    public_name: String(item.public_name || ''),
    reviewer_email: String(item.reviewer_email || ''),
    rating: Number(item.rating) || 0,
    comment: String(item.comment || ''),
    status: (item.status || 'pending') as AdminReviewStatus,
    admin_reply: item.admin_reply ? String(item.admin_reply) : null,
    created_at: String(item.created_at || ''),
    updated_at: String(item.updated_at || ''),
    moderated_at: item.moderated_at ? String(item.moderated_at) : null,
    moderated_by: item.moderated_by ? String(item.moderated_by) : null,
    approved_at: item.approved_at ? String(item.approved_at) : null,
    replied_at: item.replied_at ? String(item.replied_at) : null,
    replied_by: item.replied_by ? String(item.replied_by) : null,
    deleted_at: item.deleted_at ? String(item.deleted_at) : null,
    deleted_by: item.deleted_by ? String(item.deleted_by) : null,
  }));
}

/**
 * Altera o status de moderação de uma avaliação.
 * Exige sessão autenticada com permissão de administrador (`is_admin()`).
 *
 * @param reviewId Identificador único da avaliação (UUID)
 * @param status Novo status da avaliação ('pending' | 'approved' | 'rejected' | 'hidden')
 * @throws {AdminReviewServiceError} Caso ocorra erro ou falha de autorização
 */
export async function setAdminReviewStatus(
  reviewId: string,
  status: AdminReviewStatus
): Promise<void> {
  const { error } = await supabase.rpc('admin_set_review_status', {
    p_review_id: reviewId,
    p_status: status,
  });

  if (error) {
    console.error('[adminReviews] Erro ao alterar status da avaliação:', error);
    throw new AdminReviewServiceError(
      error.message || 'Não foi possível alterar o status da avaliação.',
      error.code,
      error.details
    );
  }
}

/**
 * Publica ou atualiza a resposta oficial da Editora a uma avaliação.
 * Exige sessão autenticada com permissão de administrador (`is_admin()`).
 *
 * @param reviewId Identificador único da avaliação (UUID)
 * @param reply Texto da resposta oficial
 * @throws {AdminReviewServiceError} Caso ocorra erro ou falha de autorização
 */
export async function replyToAdminReview(
  reviewId: string,
  reply: string
): Promise<void> {
  const { error } = await supabase.rpc('admin_reply_to_review', {
    p_review_id: reviewId,
    p_reply: reply,
  });

  if (error) {
    console.error('[adminReviews] Erro ao salvar resposta oficial:', error);
    throw new AdminReviewServiceError(
      error.message || 'Não foi possível salvar a resposta da avaliação.',
      error.code,
      error.details
    );
  }
}

/**
 * Remove a resposta oficial da Editora de uma avaliação.
 * Exige sessão autenticada com permissão de administrador (`is_admin()`).
 *
 * @param reviewId Identificador único da avaliação (UUID)
 * @throws {AdminReviewServiceError} Caso ocorra erro ou falha de autorização
 */
export async function clearAdminReviewReply(reviewId: string): Promise<void> {
  const { error } = await supabase.rpc('admin_clear_review_reply', {
    p_review_id: reviewId,
  });

  if (error) {
    console.error('[adminReviews] Erro ao remover resposta oficial:', error);
    throw new AdminReviewServiceError(
      error.message || 'Não foi possível remover a resposta da avaliação.',
      error.code,
      error.details
    );
  }
}

/**
 * Executa soft delete em uma avaliação.
 * Preenche deleted_at e deleted_by no banco sem exclusão física.
 * Exige sessão autenticada com permissão de administrador (`is_admin()`).
 *
 * @param reviewId Identificador único da avaliação (UUID)
 * @throws {AdminReviewServiceError} Caso ocorra erro ou falha de autorização
 */
export async function softDeleteAdminReview(reviewId: string): Promise<void> {
  const { error } = await supabase.rpc('admin_soft_delete_review', {
    p_review_id: reviewId,
  });

  if (error) {
    console.error('[adminReviews] Erro ao excluir avaliação (soft delete):', error);
    throw new AdminReviewServiceError(
      error.message || 'Não foi possível excluir a avaliação.',
      error.code,
      error.details
    );
  }
}

/**
 * Restaura uma avaliação excluída via soft delete.
 * Reseta deleted_at e deleted_by para null preservando o status original.
 * Exige sessão autenticada com permissão de administrador (`is_admin()`).
 *
 * @param reviewId Identificador único da avaliação (UUID)
 * @throws {AdminReviewServiceError} Caso ocorra erro ou falha de autorização
 */
export async function restoreAdminReview(reviewId: string): Promise<void> {
  const { error } = await supabase.rpc('admin_restore_review', {
    p_review_id: reviewId,
  });

  if (error) {
    console.error('[adminReviews] Erro ao restaurar avaliação:', error);
    throw new AdminReviewServiceError(
      error.message || 'Não foi possível restaurar a avaliação.',
      error.code,
      error.details
    );
  }
}



