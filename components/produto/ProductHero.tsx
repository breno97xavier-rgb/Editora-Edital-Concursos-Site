import React, { useState } from 'react';
import { ShieldCheck, Zap, FileText, ArrowRight, MessageSquare, Sparkles } from 'lucide-react';
import Book3D from './Book3D';
import ComboCover from './ComboCover';
import ModalMaterialEmAtualizacao from './ModalMaterialEmAtualizacao';
import { 
  Produto, 
  labelsConcursos, 
  labelsMaterias, 
  Concurso, 
  Materia, 
  getDetalhesCombo 
} from '@/data/produtos';
import { getWhatsAppLink } from '@/data/siteConfig';

interface ProductHeroProps {
  produto: Produto;
}

export default function ProductHero({ produto }: ProductHeroProps) {
  const [modalAvisoAberto, setModalAvisoAberto] = useState(false);
  const isCombo = produto.tipo === 'combo';
  const detalhesCombo = isCombo ? getDetalhesCombo(produto) : null;

  // Verifica se o material está em atualização (BACEN e Banco do Brasil)
  const isEmAtualizacao = Boolean(
    produto.emAtualizacao || produto.concurso === 'bacen' || produto.concurso === 'bb'
  );

  // Verifica status do checkout de forma tipada e segura
  const isCheckoutValidado = !isEmAtualizacao && produto.checkoutStatus === 'validated' && Boolean(produto.linkCheckout);

  const linkFinalCompra = isCheckoutValidado 
    ? produto.linkCheckout! 
    : getWhatsAppLink(produto, 'compra');

  const linkDuvidaWhatsApp = getWhatsAppLink(produto, 'duvida');

  // Formatação de Preço
  const temPreco = typeof produto.preco === 'number' && produto.preco > 0;
  const precoFormatado = temPreco ? produto.preco.toFixed(2).replace('.', ',') : null;

  // Definição do Badge e Contexto
  let badgeTexto = 'Material Teórico';
  let badgeEstilo = 'bg-azul-profundo text-white';

  if (isCombo) {
    badgeTexto = 'Combo Teórico + Questões';
    badgeEstilo = 'bg-azul-profundo text-amarelo-edital border border-amarelo-edital/40 font-bold';
  } else if (produto.tipo === 'questoes') {
    badgeTexto = 'Caderno de Questões';
    badgeEstilo = 'bg-amarelo-edital text-azul-profundo font-bold';
  } else if (produto.categoria === 'materia') {
    badgeTexto = 'Material por Matéria';
    badgeEstilo = 'bg-slate-100 text-azul-profundo border border-slate-200';
  }

  // Nome legível do contexto (Concurso ou Matéria)
  const contexto = produto.concurso
    ? `Concurso: ${labelsConcursos[produto.concurso as Concurso] || produto.concurso.toUpperCase()}`
    : produto.materia
    ? `Disciplina: ${labelsMaterias[produto.materia as Materia] || produto.materia}`
    : null;

  const handleBotaoCompraClick = (e: React.MouseEvent) => {
    if (isEmAtualizacao) {
      e.preventDefault();
      setModalAvisoAberto(true);
    }
  };

  return (
    <>
      <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 lg:p-10 shadow-xs mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ========================================================================= */}
          {/* COLUNA ESQUERDA — Capa Oficial 3D ou Composição de Combo */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative p-4 sm:p-6 bg-slate-50/80 rounded-xl border border-slate-100 flex items-center justify-center w-full max-w-[360px] sm:max-w-[400px] lg:max-w-none min-h-[300px]">
              {isCombo && detalhesCombo ? (
                <ComboCover
                  capaTeorico={detalhesCombo.capaTeorico}
                  capaQuestoes={detalhesCombo.capaQuestoes}
                  titulo={produto.titulo}
                  tamanho="grande"
                />
              ) : (
                <Book3D 
                  capaUrl={produto.capaUrl} 
                  titulo={produto.titulo} 
                  tamanho="grande"
                  className="max-w-[260px] sm:max-w-[290px] md:max-w-[320px] w-full"
                />
              )}
            </div>
            <span className="text-[11px] font-medium text-slate-400 mt-3 tracking-wide text-center">
              {isCombo 
                ? 'Capas oficiais dos 2 materiais digitais inclusos no combo'
                : 'Capa oficial do material em edição digital'
              }
            </span>
          </div>

          {/* ========================================================================= */}
          {/* COLUNA DIREITA — Identificação, Conteúdo e Ação */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 flex flex-col">
            
            {/* Badge de Tipo de Produto */}
            <div className="mb-3">
              <span className={`inline-flex items-center text-xs font-titulo px-3 py-1 rounded-full ${badgeEstilo}`}>
                {badgeTexto}
              </span>
            </div>

            {/* Título Principal (H1) */}
            <h1 className="font-titulo text-2xl sm:text-3xl md:text-4xl font-bold text-azul-profundo leading-tight mb-2">
              {produto.titulo}
            </h1>

            {/* Subtítulo de Contexto (Concurso ou Disciplina) */}
            {contexto && (
              <p className="text-sm font-semibold text-slate-500 mb-4">
                {contexto}
              </p>
            )}

            {/* Descrição Curta Editorial */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
              {produto.descricaoCurta}
            </p>

            {/* Pilares de Entrega Digital */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-3 px-4 bg-slate-50 rounded-xl border border-slate-100 mb-6 text-xs text-slate-700 font-medium">
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-azul-edital flex-shrink-0" />
                <span>{isCombo ? '2 materiais digitais' : 'Produto digital'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-amarelo-edital flex-shrink-0" />
                <span>Liberação imediata</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-emerald-600 flex-shrink-0" />
                <span>Compra 100% segura</span>
              </div>
            </div>

            {/* Bloco Comercial e CTA */}
            <div className="border-t border-slate-100 pt-5">
              {temPreco && (
                <div className="mb-5">
                  {isCombo && detalhesCombo ? (
                    <div className="space-y-1">
                      <div className="text-xs text-slate-500">
                        <span>Comprando separadamente: </span>
                        <span className="line-through font-medium">
                          R$ {detalhesCombo.valorSeparado.toFixed(2).replace('.', ',')}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-baseline gap-3">
                        <span className="text-xs text-slate-500 font-medium">Preço do Combo:</span>
                        <span className="font-titulo font-bold text-3xl text-azul-profundo">
                          R$ {precoFormatado}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2.5 py-1 rounded-md">
                          <Sparkles size={12} />
                          Economia de R$ {detalhesCombo.economia.toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xs text-slate-500 font-medium">Preço oficial:</span>
                        <span className="font-titulo font-bold text-3xl text-azul-profundo">
                          R$ {precoFormatado}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Ações: CTA Principal e WhatsApp */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {isEmAtualizacao ? (
                  <button
                    type="button"
                    onClick={handleBotaoCompraClick}
                    className="
                      flex-1 inline-flex items-center justify-center gap-2
                      bg-azul-profundo hover:bg-azul-edital text-white
                      font-titulo font-bold text-base
                      py-3.5 px-6 rounded-xl
                      shadow-xs hover:shadow-md cursor-pointer
                      transition-all duration-200 active:scale-98 text-center
                    "
                  >
                    <span>{isCombo ? 'Comprar combo agora' : 'Comprar agora'}</span>
                    <ArrowRight size={18} />
                  </button>
                ) : (
                  <a
                    href={linkFinalCompra}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      flex-1 inline-flex items-center justify-center gap-2
                      bg-azul-profundo hover:bg-azul-edital text-white
                      font-titulo font-bold text-base
                      py-3.5 px-6 rounded-xl
                      shadow-xs hover:shadow-md
                      transition-all duration-200 active:scale-98 text-center
                    "
                  >
                    <span>{isCombo ? 'Comprar combo agora' : 'Comprar agora'}</span>
                    <ArrowRight size={18} />
                  </a>
                )}

                <a
                  href={linkDuvidaWhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex items-center justify-center gap-2
                    bg-white hover:bg-slate-50 text-slate-700 hover:text-azul-profundo
                    border border-slate-300 font-titulo font-semibold text-sm
                    py-3.5 px-5 rounded-xl
                    transition-colors text-center
                  "
                >
                  <MessageSquare size={17} className="text-emerald-600" />
                  <span>Dúvidas no WhatsApp</span>
                </a>
              </div>

              <p className="text-[11px] text-slate-400 text-center sm:text-left mt-3">
                Acesso ao material digital em formato PDF liberado após a confirmação do pagamento.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Modal de Aviso na Tela para Materiais em Atualização (BACEN e BB) */}
      <ModalMaterialEmAtualizacao
        produto={produto}
        isOpen={modalAvisoAberto}
        onClose={() => setModalAvisoAberto(false)}
      />
    </>
  );
}
