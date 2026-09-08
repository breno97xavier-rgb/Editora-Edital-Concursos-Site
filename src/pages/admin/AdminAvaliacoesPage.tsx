import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LogOut,
  Shield,
  MessageSquareText,
  Star,
  Mail,
  Calendar,
  BookOpen,
  RefreshCw,
  AlertCircle,
  MessageSquareQuote,
  Clock,
  CheckCircle2,
  XCircle,
  EyeOff,
  Trash2,
  Check,
  RotateCcw,
  AlertTriangle,
  X,
  MessageSquare,
  Edit3,
  Undo2,
} from 'lucide-react';
import { signOutAdmin } from '../../services/adminAuth';
import {
  getAdminProductReviews,
  setAdminReviewStatus,
  replyToAdminReview,
  clearAdminReviewReply,
  softDeleteAdminReview,
  restoreAdminReview,
  AdminProductReview,
  AdminReviewStatus,
} from '../../services/adminReviews';
import { produtos } from '../../../data/produtos';

type FilterTab = 'todas' | 'pending' | 'approved' | 'rejected' | 'hidden' | 'deleted';

interface ConfirmModalState {
  reviewId: string;
  type: 'status_change' | 'clear_reply' | 'soft_delete';
  targetStatus?: AdminReviewStatus;
  title: string;
  message: string;
  confirmLabel: string;
  confirmVariant: 'rose' | 'amber';
}

interface ReplyModalState {
  reviewId: string;
  reviewerName: string;
  initialText: string;
  isEditing: boolean;
}

interface ActionLoadingState {
  reviewId: string;
  action: 'approved' | 'rejected' | 'hidden' | 'reply' | 'clear_reply' | 'soft_delete' | 'restore';
}

/**
 * Retorna o título comercial amigável de um produto pelo slug
 */
function getNomeProduto(slug: string): string {
  const p = produtos.find((item) => item.slug === slug);
  return p ? p.titulo : slug;
}

/**
 * Formata data em formato amigável no padrão brasileiro
 */
function formatarDataPtBr(dataIso: string | null): string {
  if (!dataIso) return '';
  try {
    const data = new Date(dataIso);
    if (isNaN(data.getTime())) return '';
    return new Intl.DateTimeFormat('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(data);
  } catch {
    return '';
  }
}

/**
 * Estrelas de avaliação visual (1 a 5)
 */
function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Nota ${rating} de 5 estrelas`}>
      {[1, 2, 3, 4, 5].map((starIndex) => (
        <Star
          key={starIndex}
          size={15}
          className={
            starIndex <= rating
              ? 'text-amber-400 fill-amber-400 stroke-[1.5]'
              : 'text-slate-700 stroke-[1.5]'
          }
        />
      ))}
    </div>
  );
}

/**
 * Badge de Status Administrativo
 */
function StatusBadge({ review }: { review: AdminProductReview }) {
  if (review.deleted_at) {
    return (
      <div className="flex items-center gap-1.5">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-rose-950/90 text-rose-300 border border-rose-800">
          <Trash2 size={12} className="text-rose-400" />
          <span>Excluída</span>
        </span>
        <span className="text-[10px] text-slate-500 font-medium hidden sm:inline">
          (Status original: {review.status})
        </span>
      </div>
    );
  }

  switch (review.status) {
    case 'approved':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-800/80">
          <CheckCircle2 size={12} className="text-emerald-400" />
          <span>Publicada</span>
        </span>
      );
    case 'rejected':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-rose-950/80 text-rose-300 border border-rose-800/80">
          <XCircle size={12} className="text-rose-400" />
          <span>Rejeitada</span>
        </span>
      );
    case 'hidden':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
          <EyeOff size={12} className="text-slate-400" />
          <span>Oculta</span>
        </span>
      );
    case 'pending':
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-950/80 text-amber-300 border border-amber-800/80">
          <Clock size={12} className="text-amber-400" />
          <span>Pendente</span>
        </span>
      );
  }
}

export default function AdminAvaliacoesPage() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<AdminProductReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterTab>('todas');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Estados para Ações de Moderação, Resposta e Soft Delete / Restore
  const [actionLoading, setActionLoading] = useState<ActionLoadingState | null>(null);
  const [confirmModal, setConfirmModal] = useState<ConfirmModalState | null>(null);
  const [replyModal, setReplyModal] = useState<ReplyModalState | null>(null);
  const [replyInputText, setReplyInputText] = useState('');
  const [replyInputError, setReplyInputError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Auto-dismiss do Toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const fetchReviews = async (isManualRefresh = false) => {
    if (isManualRefresh) {
      setIsRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const data = await getAdminProductReviews({
        status: null,
        include_deleted: true,
      });
      setReviews(data);
    } catch (err) {
      console.error('[AdminAvaliacoesPage] Falha ao buscar avaliações:', err);
      setError('Não foi possível carregar as avaliações.');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await signOutAdmin();
    navigate('/admin/login', { replace: true });
  };

  /**
   * Executa a alteração de status via RPC com recarregamento completo dos dados
   */
  const handleExecuteStatusChange = async (
    reviewId: string,
    targetStatus: AdminReviewStatus,
    successMessage: string
  ) => {
    setActionLoading({ reviewId, action: targetStatus as any });
    try {
      await setAdminReviewStatus(reviewId, targetStatus);
      setToast({ text: successMessage, type: 'success' });
      const freshData = await getAdminProductReviews({
        status: null,
        include_deleted: true,
      });
      setReviews(freshData);
    } catch (err: any) {
      console.error('[AdminAvaliacoesPage] Erro ao alterar status:', err);
      if (err?.code === '42501' || err?.message?.includes('permission denied')) {
        setToast({
          text: 'Sessão expirada ou sem permissão de administrador.',
          type: 'error',
        });
      } else {
        setToast({
          text: 'Não foi possível alterar o status da avaliação. Tente novamente.',
          type: 'error',
        });
      }
    } finally {
      setActionLoading(null);
      setConfirmModal(null);
    }
  };

  /**
   * Executa soft delete via RPC
   */
  const handleExecuteSoftDelete = async (reviewId: string) => {
    setActionLoading({ reviewId, action: 'soft_delete' });
    try {
      await softDeleteAdminReview(reviewId);
      setToast({ text: 'Avaliação excluída.', type: 'success' });
      const freshData = await getAdminProductReviews({
        status: null,
        include_deleted: true,
      });
      setReviews(freshData);
    } catch (err: any) {
      console.error('[AdminAvaliacoesPage] Erro ao excluir avaliação:', err);
      if (err?.code === '42501' || err?.message?.includes('permission denied')) {
        setToast({
          text: 'Sessão expirada ou sem permissão de administrador.',
          type: 'error',
        });
      } else {
        setToast({
          text: 'Não foi possível excluir a avaliação. Tente novamente.',
          type: 'error',
        });
      }
    } finally {
      setActionLoading(null);
      setConfirmModal(null);
    }
  };

  /**
   * Executa restauração de avaliação excluída via RPC
   */
  const handleRestoreReview = async (reviewId: string) => {
    setActionLoading({ reviewId, action: 'restore' });
    try {
      await restoreAdminReview(reviewId);
      setToast({ text: 'Avaliação restaurada.', type: 'success' });
      const freshData = await getAdminProductReviews({
        status: null,
        include_deleted: true,
      });
      setReviews(freshData);
    } catch (err: any) {
      console.error('[AdminAvaliacoesPage] Erro ao restaurar avaliação:', err);
      if (err?.code === '42501' || err?.message?.includes('permission denied')) {
        setToast({
          text: 'Sessão expirada ou sem permissão de administrador.',
          type: 'error',
        });
      } else {
        setToast({
          text: 'Não foi possível restaurar a avaliação. Tente novamente.',
          type: 'error',
        });
      }
    } finally {
      setActionLoading(null);
    }
  };

  /**
   * Executa a remoção da resposta oficial via RPC
   */
  const handleExecuteClearReply = async (reviewId: string) => {
    setActionLoading({ reviewId, action: 'clear_reply' });
    try {
      await clearAdminReviewReply(reviewId);
      setToast({ text: 'Resposta removida.', type: 'success' });
      const freshData = await getAdminProductReviews({
        status: null,
        include_deleted: true,
      });
      setReviews(freshData);
    } catch (err: any) {
      console.error('[AdminAvaliacoesPage] Erro ao remover resposta:', err);
      if (err?.code === '42501' || err?.message?.includes('permission denied')) {
        setToast({
          text: 'Sessão expirada ou sem permissão de administrador.',
          type: 'error',
        });
      } else {
        setToast({
          text: 'Não foi possível remover a resposta. Tente novamente.',
          type: 'error',
        });
      }
    } finally {
      setActionLoading(null);
      setConfirmModal(null);
    }
  };

  /**
   * Salva ou atualiza a resposta oficial via RPC
   */
  const handleSaveReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyModal) return;

    const trimmedText = replyInputText.trim();
    if (!trimmedText) {
      setReplyInputError('Por favor, digite o conteúdo da resposta oficial.');
      return;
    }

    if (trimmedText.length > 5000) {
      setReplyInputError('A resposta não pode exceder 5.000 caracteres.');
      return;
    }

    setReplyInputError(null);
    const reviewId = replyModal.reviewId;
    const isEditing = replyModal.isEditing;

    setActionLoading({ reviewId, action: 'reply' });
    try {
      await replyToAdminReview(reviewId, trimmedText);
      setToast({
        text: isEditing
          ? 'Resposta atualizada com sucesso.'
          : 'Resposta publicada com sucesso.',
        type: 'success',
      });
      setReplyModal(null);
      setReplyInputText('');
      const freshData = await getAdminProductReviews({
        status: null,
        include_deleted: true,
      });
      setReviews(freshData);
    } catch (err: any) {
      console.error('[AdminAvaliacoesPage] Erro ao salvar resposta:', err);
      if (err?.code === '42501' || err?.message?.includes('permission denied')) {
        setToast({
          text: 'Sessão expirada ou sem permissão de administrador.',
          type: 'error',
        });
      } else {
        setToast({
          text: 'Não foi possível salvar a resposta. Tente novamente.',
          type: 'error',
        });
      }
    } finally {
      setActionLoading(null);
    }
  };

  /**
   * Dispara o fluxo de Aprovar ou Republicar
   */
  const handleApprove = (review: AdminProductReview) => {
    const isRepublication = review.status === 'hidden';
    const message = isRepublication
      ? 'Avaliação republicada.'
      : 'Avaliação publicada com sucesso.';
    handleExecuteStatusChange(review.id, 'approved', message);
  };

  /**
   * Abre modal de confirmação para Rejeitar
   */
  const handlePromptReject = (review: AdminProductReview) => {
    setConfirmModal({
      reviewId: review.id,
      type: 'status_change',
      targetStatus: 'rejected',
      title: 'Rejeitar esta avaliação?',
      message:
        'Ela deixará de ficar disponível para publicação, mas permanecerá armazenada no painel administrativo.',
      confirmLabel: 'Rejeitar avaliação',
      confirmVariant: 'rose',
    });
  };

  /**
   * Abre modal de confirmação para Ocultar
   */
  const handlePromptHide = (review: AdminProductReview) => {
    setConfirmModal({
      reviewId: review.id,
      type: 'status_change',
      targetStatus: 'hidden',
      title: 'Ocultar esta avaliação?',
      message:
        'Ela deixará de aparecer publicamente, mas poderá ser republicada posteriormente.',
      confirmLabel: 'Ocultar avaliação',
      confirmVariant: 'amber',
    });
  };

  /**
   * Abre modal de confirmação para Excluir (Soft Delete)
   */
  const handlePromptSoftDelete = (review: AdminProductReview) => {
    setConfirmModal({
      reviewId: review.id,
      type: 'soft_delete',
      title: 'Excluir esta avaliação?',
      message:
        'Esta avaliação será removida do fluxo normal e deixará de aparecer publicamente, caso esteja publicada. Ela poderá ser restaurada posteriormente.',
      confirmLabel: 'Excluir avaliação',
      confirmVariant: 'rose',
    });
  };

  /**
   * Abre formulário modal para Responder ou Editar Resposta
   */
  const handleOpenReplyModal = (review: AdminProductReview) => {
    const isEditing = Boolean(review.admin_reply);
    setReplyInputText(review.admin_reply || '');
    setReplyInputError(null);
    setReplyModal({
      reviewId: review.id,
      reviewerName: review.public_name,
      initialText: review.admin_reply || '',
      isEditing,
    });
  };

  /**
   * Abre confirmação para Remover Resposta
   */
  const handlePromptClearReply = (review: AdminProductReview) => {
    setConfirmModal({
      reviewId: review.id,
      type: 'clear_reply',
      title: 'Remover resposta oficial?',
      message:
        'A resposta da Editora deixará de aparecer publicamente nesta avaliação. A avaliação continuará publicada normalmente, caso esteja com status Publicada.',
      confirmLabel: 'Remover resposta',
      confirmVariant: 'rose',
    });
  };

  // Cálculo de Métricas a partir dos dados retornados
  const metrics = useMemo(() => {
    const total = reviews.length;
    let pending = 0;
    let approved = 0;
    let rejected = 0;
    let hidden = 0;
    let deleted = 0;

    reviews.forEach((r) => {
      if (r.deleted_at !== null) {
        deleted++;
      } else {
        if (r.status === 'pending') pending++;
        else if (r.status === 'approved') approved++;
        else if (r.status === 'rejected') rejected++;
        else if (r.status === 'hidden') hidden++;
      }
    });

    return { total, pending, approved, rejected, hidden, deleted };
  }, [reviews]);

  // Lista filtrada pelo tab ativo
  const filteredReviews = useMemo(() => {
    return reviews.filter((r) => {
      if (activeFilter === 'todas') return true;
      if (activeFilter === 'deleted') return r.deleted_at !== null;
      if (r.deleted_at !== null) return false;
      return r.status === activeFilter;
    });
  }, [reviews, activeFilter]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-400/30 selection:text-amber-200">
      {/* ========================================================================= */}
      {/* TOAST FLUTUANTE DE FEEDBACK */}
      {/* ========================================================================= */}
      {toast && (
        <div
          className="fixed bottom-6 right-6 z-50 max-w-md animate-in fade-in slide-in-from-bottom-5 duration-200"
          role="status"
          aria-live="polite"
        >
          <div
            className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl border shadow-xl text-sm ${
              toast.type === 'success'
                ? 'bg-emerald-950/95 border-emerald-700/80 text-emerald-200'
                : 'bg-rose-950/95 border-rose-700/80 text-rose-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {toast.type === 'success' ? (
                <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" />
              ) : (
                <AlertCircle size={18} className="text-rose-400 flex-shrink-0" />
              )}
              <span className="font-medium">{toast.text}</span>
            </div>
            <button
              type="button"
              onClick={() => setToast(null)}
              className="text-slate-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
              aria-label="Fechar notificação"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL DE FORMULÁRIO DE RESPOSTA OFICIAL */}
      {/* ========================================================================= */}
      {replyModal && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          role="dialog"
          aria-modal="true"
          aria-labelledby="reply-modal-title"
        >
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <MessageSquareQuote size={20} />
                </div>
                <div>
                  <h3
                    id="reply-modal-title"
                    className="font-titulo text-base font-bold text-white leading-tight"
                  >
                    {replyModal.isEditing ? 'Editar resposta oficial' : 'Responder avaliação'}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Avaliador: <span className="text-slate-200 font-medium">{replyModal.reviewerName}</span>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setReplyModal(null)}
                disabled={actionLoading !== null}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
                aria-label="Fechar"
              >
                <X size={18} />
              </button>
            </div>

            {/* Aviso de Identidade Fixa */}
            <div className="p-3 bg-slate-950/80 border border-slate-800/90 rounded-xl flex items-center gap-2.5 text-xs text-slate-300">
              <Shield size={15} className="text-amber-400 flex-shrink-0" />
              <span>
                Publicado como:{' '}
                <strong className="text-amber-300 font-semibold">
                  Resposta da Editora Edital Concursos
                </strong>
              </span>
            </div>

            <form onSubmit={handleSaveReply} className="space-y-4">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <label
                    htmlFor="admin-reply-textarea"
                    className="text-xs font-semibold text-slate-300 block"
                  >
                    Resposta da Editora Edital Concursos
                  </label>
                  <span className="text-[11px] font-mono text-slate-500">
                    {replyInputText.length} / 5.000 caracteres
                  </span>
                </div>

                <textarea
                  id="admin-reply-textarea"
                  rows={6}
                  value={replyInputText}
                  onChange={(e) => {
                    setReplyInputText(e.target.value.slice(0, 5000));
                    if (replyInputError) setReplyInputError(null);
                  }}
                  placeholder="Escreva aqui o posicionamento ou agradecimento oficial da Editora..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-hidden focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all resize-y leading-relaxed"
                  disabled={actionLoading !== null}
                  autoFocus
                />

                {replyInputError && (
                  <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">
                    <AlertCircle size={13} />
                    <span>{replyInputError}</span>
                  </p>
                )}
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-800/80">
                <button
                  type="button"
                  onClick={() => setReplyModal(null)}
                  disabled={actionLoading !== null}
                  className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-all disabled:opacity-50 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={actionLoading !== null}
                  className="px-4 py-2 text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl transition-all shadow-xs disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
                >
                  {actionLoading?.action === 'reply' ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Salvando...</span>
                    </>
                  ) : (
                    <span>{replyModal.isEditing ? 'Salvar alterações' : 'Publicar resposta'}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL DE CONFIRMAÇÃO DE AÇÃO */}
      {/* ========================================================================= */}
      {confirmModal && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-modal-title"
        >
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-start gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  confirmModal.confirmVariant === 'rose'
                    ? 'bg-rose-950/80 border border-rose-800 text-rose-400'
                    : 'bg-amber-950/80 border border-amber-800 text-amber-400'
                }`}
              >
                <AlertTriangle size={20} />
              </div>
              <div className="flex-1">
                <h3
                  id="confirm-modal-title"
                  className="font-titulo text-base font-bold text-white leading-tight"
                >
                  {confirmModal.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed">
                  {confirmModal.message}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-800/80">
              <button
                type="button"
                onClick={() => setConfirmModal(null)}
                disabled={actionLoading !== null}
                className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-all disabled:opacity-50 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  if (confirmModal.type === 'soft_delete') {
                    handleExecuteSoftDelete(confirmModal.reviewId);
                  } else if (confirmModal.type === 'clear_reply') {
                    handleExecuteClearReply(confirmModal.reviewId);
                  } else if (confirmModal.targetStatus) {
                    handleExecuteStatusChange(
                      confirmModal.reviewId,
                      confirmModal.targetStatus,
                      confirmModal.targetStatus === 'rejected'
                        ? 'Avaliação rejeitada.'
                        : 'Avaliação ocultada.'
                    );
                  }
                }}
                disabled={actionLoading !== null}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all shadow-xs disabled:opacity-50 cursor-pointer flex items-center gap-1.5 ${
                  confirmModal.confirmVariant === 'rose'
                    ? 'bg-rose-600 hover:bg-rose-500 text-white'
                    : 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                }`}
              >
                {actionLoading?.reviewId === confirmModal.reviewId ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Processando...</span>
                  </>
                ) : (
                  <span>{confirmModal.confirmLabel}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CABEÇALHO ADMINISTRATIVO */}
      {/* ========================================================================= */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
              <Shield size={18} />
            </div>
            <div>
              <span className="font-titulo text-sm sm:text-base font-bold text-white block leading-tight">
                Editora Edital Concursos
              </span>
              <span className="text-[11px] text-slate-400 block leading-tight">
                Painel Administrativo
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => fetchReviews(true)}
              disabled={isRefreshing || loading || actionLoading !== null}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-all disabled:opacity-50 cursor-pointer"
              title="Atualizar lista"
            >
              <RefreshCw
                size={13}
                className={isRefreshing ? 'animate-spin text-amber-400' : ''}
              />
              <span className="hidden sm:inline">Atualizar</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-all disabled:opacity-50 cursor-pointer"
            >
              <LogOut size={13} />
              <span>{isLoggingOut ? 'Saindo...' : 'Sair'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* CONTEÚDO PRINCIPAL */}
      {/* ========================================================================= */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Título da Seção */}
        <div className="mb-8">
          <h1 className="font-titulo text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <MessageSquareText size={28} className="text-amber-400" />
            Administração de avaliações
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Gerencie as avaliações enviadas pelos leitores dos materiais da Editora Edital Concursos.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* CARDS DE MÉTRICAS */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-8">
          <div className="bg-slate-900 border border-slate-800/90 rounded-xl p-4">
            <span className="text-xs font-semibold text-slate-400 block mb-1">Total</span>
            <span className="font-titulo text-2xl font-bold text-white">
              {loading ? '-' : metrics.total}
            </span>
          </div>

          <div className="bg-slate-900 border border-slate-800/90 rounded-xl p-4">
            <span className="text-xs font-semibold text-amber-400 block mb-1">Pendentes</span>
            <span className="font-titulo text-2xl font-bold text-amber-300">
              {loading ? '-' : metrics.pending}
            </span>
          </div>

          <div className="bg-slate-900 border border-slate-800/90 rounded-xl p-4">
            <span className="text-xs font-semibold text-emerald-400 block mb-1">Publicadas</span>
            <span className="font-titulo text-2xl font-bold text-emerald-300">
              {loading ? '-' : metrics.approved}
            </span>
          </div>

          <div className="bg-slate-900 border border-slate-800/90 rounded-xl p-4">
            <span className="text-xs font-semibold text-rose-400 block mb-1">Rejeitadas</span>
            <span className="font-titulo text-2xl font-bold text-rose-300">
              {loading ? '-' : metrics.rejected}
            </span>
          </div>

          <div className="bg-slate-900 border border-slate-800/90 rounded-xl p-4">
            <span className="text-xs font-semibold text-slate-400 block mb-1">Ocultas</span>
            <span className="font-titulo text-2xl font-bold text-slate-300">
              {loading ? '-' : metrics.hidden}
            </span>
          </div>

          <div className="bg-slate-900 border border-slate-800/90 rounded-xl p-4">
            <span className="text-xs font-semibold text-slate-500 block mb-1">Excluídas</span>
            <span className="font-titulo text-2xl font-bold text-slate-400">
              {loading ? '-' : metrics.deleted}
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* FILTROS (TABS) */}
        {/* ========================================================================= */}
        <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-slate-800 pb-4">
          <button
            type="button"
            onClick={() => setActiveFilter('todas')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeFilter === 'todas'
                ? 'bg-amber-400 text-slate-950 shadow-xs font-bold'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <span>Todas</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeFilter === 'todas'
                  ? 'bg-slate-950 text-amber-300 font-bold'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {metrics.total}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('pending')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeFilter === 'pending'
                ? 'bg-amber-400 text-slate-950 shadow-xs font-bold'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <span>Pendentes</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeFilter === 'pending'
                  ? 'bg-slate-950 text-amber-300 font-bold'
                  : 'bg-slate-800 text-amber-400'
              }`}
            >
              {metrics.pending}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('approved')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeFilter === 'approved'
                ? 'bg-amber-400 text-slate-950 shadow-xs font-bold'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <span>Publicadas</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeFilter === 'approved'
                  ? 'bg-slate-950 text-amber-300 font-bold'
                  : 'bg-slate-800 text-emerald-400'
              }`}
            >
              {metrics.approved}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('rejected')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeFilter === 'rejected'
                ? 'bg-amber-400 text-slate-950 shadow-xs font-bold'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <span>Rejeitadas</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeFilter === 'rejected'
                  ? 'bg-slate-950 text-amber-300 font-bold'
                  : 'bg-slate-800 text-rose-400'
              }`}
            >
              {metrics.rejected}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('hidden')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeFilter === 'hidden'
                ? 'bg-amber-400 text-slate-950 shadow-xs font-bold'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <span>Ocultas</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeFilter === 'hidden'
                  ? 'bg-slate-950 text-amber-300 font-bold'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {metrics.hidden}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('deleted')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeFilter === 'deleted'
                ? 'bg-amber-400 text-slate-950 shadow-xs font-bold'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <span>Excluídas</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeFilter === 'deleted'
                  ? 'bg-slate-950 text-amber-300 font-bold'
                  : 'bg-slate-800 text-slate-500'
              }`}
            >
              {metrics.deleted}
            </span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* ESTADOS DE CARREGAMENTO / ERRO / VAZIO / LISTA */}
        {/* ========================================================================= */}
        {loading ? (
          /* Estado Loading Skeleton */
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 animate-pulse space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="w-48 h-5 bg-slate-800 rounded-md" />
                  <div className="w-24 h-6 bg-slate-800 rounded-md" />
                </div>
                <div className="w-72 h-4 bg-slate-800/60 rounded-md" />
                <div className="w-full h-12 bg-slate-800/40 rounded-md" />
              </div>
            ))}
          </div>
        ) : error ? (
          /* Estado de Erro */
          <div className="bg-rose-950/40 border border-rose-800/60 rounded-2xl p-8 text-center max-w-lg mx-auto my-8">
            <AlertCircle size={32} className="text-rose-400 mx-auto mb-3" />
            <h3 className="font-titulo text-lg font-bold text-rose-200 mb-1">
              {error}
            </h3>
            <p className="text-xs text-rose-300/80 mb-4">
              Verifique sua conexão e se sua sessão possui privilégios de administrador.
            </p>
            <button
              type="button"
              onClick={() => fetchReviews(false)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer"
            >
              <RefreshCw size={14} />
              <span>Tentar novamente</span>
            </button>
          </div>
        ) : reviews.length === 0 ? (
          /* Estado Vazio Geral */
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center max-w-md mx-auto my-8">
            <MessageSquareText size={36} className="text-slate-600 mx-auto mb-3" />
            <h3 className="font-titulo text-base font-bold text-slate-300 mb-1">
              Nenhuma avaliação encontrada.
            </h3>
            <p className="text-xs text-slate-500">
              Nenhum registro foi cadastrado no banco de dados até o momento.
            </p>
          </div>
        ) : filteredReviews.length === 0 ? (
          /* Estado Vazio de Filtro */
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center max-w-md mx-auto my-8">
            <MessageSquareText size={36} className="text-slate-600 mx-auto mb-3" />
            <h3 className="font-titulo text-base font-bold text-slate-300 mb-1">
              Nenhuma avaliação nesta categoria.
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Não existem registros correspondentes ao filtro selecionado.
            </p>
            <button
              type="button"
              onClick={() => setActiveFilter('todas')}
              className="text-xs text-amber-400 hover:underline cursor-pointer"
            >
              Ver todas as avaliações
            </button>
          </div>
        ) : (
          /* Lista de Avaliações */
          <div className="space-y-4">
            {filteredReviews.map((review) => {
              const nomeProduto = getNomeProduto(review.product_slug);
              const dataCriacao = formatarDataPtBr(review.created_at);
              const dataResposta = formatarDataPtBr(review.replied_at);
              const dataModeracao = formatarDataPtBr(review.moderated_at);
              const dataExclusao = formatarDataPtBr(review.deleted_at);
              const isItemLoading = actionLoading?.reviewId === review.id;
              const isDeleted = Boolean(review.deleted_at);

              return (
                <article
                  key={review.id}
                  className={`bg-slate-900/90 border rounded-2xl p-5 sm:p-6 transition-all ${
                    isDeleted
                      ? 'border-rose-950/60 bg-slate-900/60 opacity-80'
                      : review.status === 'pending'
                      ? 'border-amber-500/30 shadow-xs'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Linha Superior: Nome, Nota, Data e Status */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-titulo font-bold text-white text-base">
                        {review.public_name}
                      </span>
                      <div className="flex items-center gap-1.5 bg-slate-950/80 border border-slate-800 px-2 py-0.5 rounded-md">
                        <RatingStars rating={review.rating} />
                        <span className="text-xs font-bold text-amber-400 ml-0.5">
                          {review.rating}.0
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {dataCriacao && (
                        <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                          <Calendar size={13} className="text-slate-500" />
                          <span>{dataCriacao}</span>
                        </span>
                      )}
                      <StatusBadge review={review} />
                    </div>
                  </div>

                  {/* Informações de Contexto: Produto e E-mail Privado */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 py-3 text-xs border-b border-slate-800/60">
                    {/* Produto */}
                    <div className="flex items-center gap-2 text-slate-300">
                      <BookOpen size={14} className="text-amber-400/80 flex-shrink-0" />
                      <span className="font-medium truncate" title={nomeProduto}>
                        {nomeProduto}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono bg-slate-950 border border-slate-800 px-1.5 py-0.5 rounded">
                        {review.product_slug}
                      </span>
                    </div>

                    {/* E-mail Privado do Avaliador */}
                    <div className="flex items-center gap-2 text-slate-300 sm:justify-end">
                      <span className="inline-flex items-center gap-1.5 text-slate-400 bg-slate-950/90 border border-slate-800 px-2.5 py-1 rounded-md">
                        <Mail size={12} className="text-slate-400" />
                        <span className="font-mono text-[11px] text-slate-300 select-all">
                          {review.reviewer_email}
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Comentário do Avaliador */}
                  <div className="pt-3.5 pb-2">
                    <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-line">
                      {review.comment}
                    </p>
                  </div>

                  {/* Resposta Oficial (se houver) */}
                  {review.admin_reply && (
                    <div className="mt-3 p-3.5 bg-slate-950/70 border-l-3 border-l-amber-400 border border-slate-800/80 rounded-xl">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300">
                          <MessageSquareQuote size={14} className="text-amber-400" />
                          <span>Resposta Oficial da Editora</span>
                        </span>
                        {dataResposta && (
                          <span className="text-[11px] text-slate-500">{dataResposta}</span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                        {review.admin_reply}
                      </p>
                    </div>
                  )}

                  {/* Metadados adicionais discretos */}
                  {(dataModeracao || dataExclusao) && (
                    <div className="mt-3 pt-2 border-t border-slate-800/40 flex flex-wrap items-center gap-4 text-[11px] text-slate-500">
                      {dataModeracao && (
                        <span>Moderada em: {dataModeracao}</span>
                      )}
                      {dataExclusao && (
                        <span className="text-rose-400/90 font-medium">
                          Excluída da listagem pública em: {dataExclusao}
                        </span>
                      )}
                    </div>
                  )}

                  {/* ========================================================================= */}
                  {/* BARRA DE AÇÕES ADMINISTRATIVAS */}
                  {/* ========================================================================= */}
                  <div className="mt-4 pt-3.5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                    {isDeleted ? (
                      /* AVALIAÇÃO EXCLUÍDA (SOFT DELETE): APENAS AÇÃO DE RESTAURAR */
                      <div className="w-full flex items-center justify-between gap-3">
                        <span className="text-xs text-slate-500 italic">
                          Esta avaliação está excluída do fluxo público e administrativo normal.
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRestoreReview(review.id)}
                          disabled={isItemLoading}
                          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] rounded-xl transition-all shadow-xs disabled:opacity-50 cursor-pointer"
                        >
                          {isItemLoading && actionLoading?.action === 'restore' ? (
                            <>
                              <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              <span>Restaurando...</span>
                            </>
                          ) : (
                            <>
                              <Undo2 size={13} strokeWidth={2.5} />
                              <span>Restaurar avaliação</span>
                            </>
                          )}
                        </button>
                      </div>
                    ) : (
                      /* AVALIAÇÃO ATIVA: AÇÕES DE RESPOSTA + STATUS + EXCLUIR */
                      <>
                        {/* LADO ESQUERDO: Ações de Resposta Oficial */}
                        <div className="flex flex-wrap items-center gap-2">
                          {review.admin_reply === null ? (
                            <button
                              type="button"
                              onClick={() => handleOpenReplyModal(review)}
                              disabled={isItemLoading}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-300 hover:text-amber-200 bg-amber-950/40 hover:bg-amber-950/70 border border-amber-800/50 rounded-xl transition-all disabled:opacity-50 cursor-pointer"
                            >
                              <MessageSquare size={13} className="text-amber-400" />
                              <span>Responder</span>
                            </button>
                          ) : (
                            <>
                              <button
                                type="button"
                                onClick={() => handleOpenReplyModal(review)}
                                disabled={isItemLoading}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-all disabled:opacity-50 cursor-pointer"
                              >
                                <Edit3 size={13} className="text-slate-400" />
                                <span>Editar resposta</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => handlePromptClearReply(review)}
                                disabled={isItemLoading}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-300/80 hover:text-rose-200 bg-rose-950/30 hover:bg-rose-950/60 border border-rose-900/40 rounded-xl transition-all disabled:opacity-50 cursor-pointer"
                              >
                                <Trash2 size={13} className="text-rose-400/80" />
                                <span>Remover resposta</span>
                              </button>
                            </>
                          )}
                        </div>

                        {/* LADO DIREITO: Ações de Moderação de Status e Exclusão */}
                        <div className="flex flex-wrap items-center justify-end gap-2.5">
                          {/* PENDENTE: Ações de Aprovar e Rejeitar */}
                          {review.status === 'pending' && (
                            <>
                              <button
                                type="button"
                                onClick={() => handlePromptReject(review)}
                                disabled={isItemLoading}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-300 hover:text-white bg-rose-950/50 hover:bg-rose-900/80 border border-rose-800/60 rounded-xl transition-all disabled:opacity-50 cursor-pointer"
                              >
                                <XCircle size={13} />
                                <span>
                                  {isItemLoading && actionLoading?.action === 'rejected'
                                    ? 'Rejeitando...'
                                    : 'Rejeitar'}
                                </span>
                              </button>

                              <button
                                type="button"
                                onClick={() => handleApprove(review)}
                                disabled={isItemLoading}
                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] rounded-xl transition-all shadow-xs disabled:opacity-50 cursor-pointer"
                              >
                                {isItemLoading && actionLoading?.action === 'approved' ? (
                                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                  <Check size={13} strokeWidth={2.5} />
                                )}
                                <span>
                                  {isItemLoading && actionLoading?.action === 'approved'
                                    ? 'Aprovando...'
                                    : 'Aprovar'}
                                </span>
                              </button>
                            </>
                          )}

                          {/* PUBLICADA: Ação de Ocultar */}
                          {review.status === 'approved' && (
                            <button
                              type="button"
                              onClick={() => handlePromptHide(review)}
                              disabled={isItemLoading}
                              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all disabled:opacity-50 cursor-pointer"
                            >
                              {isItemLoading && actionLoading?.action === 'hidden' ? (
                                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              ) : (
                                <EyeOff size={13} />
                              )}
                              <span>
                                {isItemLoading && actionLoading?.action === 'hidden'
                                  ? 'Ocultando...'
                                  : 'Ocultar'}
                              </span>
                            </button>
                          )}

                          {/* REJEITADA: Ação de Aprovar */}
                          {review.status === 'rejected' && (
                            <button
                              type="button"
                              onClick={() => handleApprove(review)}
                              disabled={isItemLoading}
                              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] rounded-xl transition-all shadow-xs disabled:opacity-50 cursor-pointer"
                            >
                              {isItemLoading && actionLoading?.action === 'approved' ? (
                                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              ) : (
                                <Check size={13} strokeWidth={2.5} />
                              )}
                              <span>
                                {isItemLoading && actionLoading?.action === 'approved'
                                  ? 'Aprovando...'
                                  : 'Aprovar'}
                              </span>
                            </button>
                          )}

                          {/* OCULTA: Ação de Republicar */}
                          {review.status === 'hidden' && (
                            <button
                              type="button"
                              onClick={() => handleApprove(review)}
                              disabled={isItemLoading}
                              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] rounded-xl transition-all shadow-xs disabled:opacity-50 cursor-pointer"
                            >
                              {isItemLoading && actionLoading?.action === 'approved' ? (
                                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              ) : (
                                <RotateCcw size={13} strokeWidth={2.5} />
                              )}
                              <span>
                                {isItemLoading && actionLoading?.action === 'approved'
                                  ? 'Republicando...'
                                  : 'Republicar'}
                              </span>
                            </button>
                          )}

                          {/* AÇÃO DE EXCLUIR (SOFT DELETE) - Disponível para todo status quando deleted_at === null */}
                          <button
                            type="button"
                            onClick={() => handlePromptSoftDelete(review)}
                            disabled={isItemLoading}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-400 hover:text-rose-300 bg-slate-800/80 hover:bg-rose-950/60 border border-slate-700/80 hover:border-rose-900/50 rounded-xl transition-all disabled:opacity-50 cursor-pointer"
                            title="Excluir avaliação (soft delete)"
                          >
                            {isItemLoading && actionLoading?.action === 'soft_delete' ? (
                              <div className="w-3.5 h-3.5 border-2 border-rose-400/30 border-t-rose-400 rounded-full animate-spin" />
                            ) : (
                              <Trash2 size={13} className="text-slate-400 group-hover:text-rose-400" />
                            )}
                            <span>
                              {isItemLoading && actionLoading?.action === 'soft_delete'
                                ? 'Excluindo...'
                                : 'Excluir'}
                            </span>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* RODAPÉ ADMINISTRATIVO */}
      {/* ========================================================================= */}
      <footer className="border-t border-slate-900 py-4 text-center text-xs text-slate-600">
        Editora Edital Concursos &copy; 2026 — Área restrita à moderação
      </footer>
    </div>
  );
}
