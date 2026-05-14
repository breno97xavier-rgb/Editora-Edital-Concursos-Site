'use client';

import { Produto } from '@/data/produtos';

interface CardCompraProps {
  produto: Produto;
}

export default function CardCompra({ produto }: CardCompraProps) {
  const precoFormatado = produto.preco.toFixed(2).replace('.', ',');
  const precoOriginalFormatado = produto.precoOriginal?.toFixed(2).replace('.', ',');
  const temDesconto = produto.precoOriginal && produto.precoOriginal > produto.preco;
  const percentualDesconto = temDesconto 
    ? Math.round(((produto.precoOriginal! - produto.preco) / produto.precoOriginal!) * 100)
    : 0;

  const mensagemWhatsApp = encodeURIComponent(
    `Olá! Tenho interesse na "${produto.titulo}". Pode me dar mais informações?`
  );

  return (
    <div className="lg:sticky lg:top-24 bg-branco rounded-xl p-6 shadow-2xl text-cinza-escuro">
      {/* Selo de liberação */}
      <div className="flex items-center gap-2 mb-4 text-sm text-verde-sucesso font-medium">
        <span>⚡</span>
        <span>Versão Digital — Liberação Imediata</span>
      </div>

      {/* Preço */}
      <div className="mb-6">
        {temDesconto && (
          <div className="flex items-center gap-2 mb-1">
            <span className="text-cinza-medio text-sm line-through">
              R$ {precoOriginalFormatado}
            </span>
            <span className="bg-vermelho-promo text-branco text-xs font-bold px-2 py-0.5 rounded">
              -{percentualDesconto}%
            </span>
          </div>
        )}
        <div className="font-titulo font-bold text-4xl text-azul-profundo">
          R$ {precoFormatado}
        </div>
        <div className="text-cinza-medio text-sm mt-1">
          ou {produto.parcelamento}
        </div>
      </div>

      {/* Botão CTA principal */}
      <a
        href={produto.linkCheckout}
        target="_blank"
        rel="noopener noreferrer"
        className="
          block w-full text-center
          bg-dourado text-azul-profundo
          font-titulo font-bold text-lg
          py-4 px-6 rounded-full
          hover:bg-opacity-90 transition
          mb-3
        "
      >
        Comprar Agora
      </a>

      {/* Botão WhatsApp secundário */}
      <a
        href={`https://wa.me/5541988420201?text=${mensagemWhatsApp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="
          block w-full text-center
          bg-transparent border-2 border-cinza-claro text-cinza-escuro
          font-titulo font-bold text-sm
          py-3 px-6 rounded-full
          hover:border-verde-sucesso hover:text-verde-sucesso transition
          mb-6
        "
      >
        💬 Tirar dúvida no WhatsApp
      </a>

      {/* Selos de confiança */}
      <div className="space-y-3 text-sm text-cinza-medio border-t border-cinza-claro pt-4">
        <div className="flex items-center gap-3">
          <span className="text-verde-sucesso text-lg">🔒</span>
          <span>Site 100% seguro</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-verde-sucesso text-lg">✓</span>
          <span>Garantia de 7 dias</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-verde-sucesso text-lg">⚡</span>
          <span>Liberação imediata</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-verde-sucesso text-lg">📱</span>
          <span>Pix, cartão ou boleto</span>
        </div>
      </div>
    </div>
  );
}
