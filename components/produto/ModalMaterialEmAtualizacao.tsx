import React, { useEffect } from 'react';
import { Clock, MessageCircle, X, AlertCircle } from 'lucide-react';
import { Produto } from '@/data/produtos';
import { getWhatsAppLink } from '@/data/siteConfig';

interface ModalMaterialEmAtualizacaoProps {
  produto: Produto;
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalMaterialEmAtualizacao({
  produto,
  isOpen,
  onClose,
}: ModalMaterialEmAtualizacaoProps) {
  // Fechar com a tecla ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const mensagemWhatsApp = `Olá! Tenho interesse no material "${produto.titulo}" e gostaria de ser avisado(a) no WhatsApp assim que a nova edição atualizada for lançada.`;
  const linkWhatsAppAviso = getWhatsAppLink(mensagemWhatsApp);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-aviso-titulo"
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 sm:p-8 overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão de Fechar no Canto */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Fechar aviso"
        >
          <X size={20} />
        </button>

        {/* Ícone e Cabeçalho */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0 text-amber-600">
            <Clock size={24} />
          </div>
          <div>
            <span className="inline-block text-[11px] font-titulo uppercase tracking-wider font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md mb-1.5">
              Material em Atualização
            </span>
            <h3
              id="modal-aviso-titulo"
              className="font-titulo text-xl sm:text-2xl font-bold text-azul-profundo leading-tight"
            >
              Material temporariamente indisponível
            </h3>
          </div>
        </div>

        {/* Mensagem Editorial Explicativa */}
        <div className="space-y-3 text-slate-600 text-sm leading-relaxed mb-6">
          <p>
            Informamos que o material <strong>{produto.titulo}</strong> não está disponível para compra no momento.
          </p>
          <p className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 text-xs text-slate-700 flex items-start gap-2.5">
            <AlertCircle size={18} className="text-azul-edital flex-shrink-0 mt-0.5" />
            <span>
              Nossa equipe pedagógica está realizando uma <strong>atualização e revisão minuciosa</strong> de todo o conteúdo para que a nova versão saia em breve com o máximo alinhamento.
            </span>
          </p>
          <p className="text-xs text-slate-500">
            Se desejar, você pode falar diretamente com a nossa equipe no WhatsApp para ser avisado(a) em primeira mão assim que a nova edição for liberada para compra.
          </p>
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-col sm:flex-row gap-2.5 pt-2 border-t border-slate-100">
          <a
            href={linkWhatsAppAviso}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex-1 inline-flex items-center justify-center gap-2
              bg-emerald-600 hover:bg-emerald-700 text-white
              font-titulo font-semibold text-sm
              py-3 px-4 rounded-xl
              shadow-xs transition-colors text-center
            "
          >
            <MessageCircle size={18} />
            <span>Avise-me pelo WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={onClose}
            className="
              inline-flex items-center justify-center
              bg-slate-100 hover:bg-slate-200 text-slate-700
              font-titulo font-semibold text-sm
              py-3 px-5 rounded-xl
              transition-colors text-center
            "
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
