import React from 'react';
import { Produto } from '@/data/produtos';
import { siteConfig, getWhatsAppLink } from '@/data/siteConfig';

interface CardCompraProps {
  produto: Produto;
}

export default function CardCompra({ produto }: CardCompraProps) {
  const precoFormatado = produto.preco.toFixed(2).replace('.', ',');
  const isCheckoutValidado = produto.checkoutStatus === 'validated' && Boolean(produto.linkCheckout);
  
  const linkCompra = isCheckoutValidado ? produto.linkCheckout! : getWhatsAppLink(produto, 'compra');
  const linkDuvida = getWhatsAppLink(produto, 'duvida');

  return (
    <div className="lg:sticky lg:top-24 bg-white rounded-xl p-6 shadow-xl border border-slate-200 text-slate-800">
      {/* Selo de liberação */}
      <div className="flex items-center gap-2 mb-4 text-sm text-emerald-600 font-medium">
        <span>⚡</span>
        <span>Versão Digital — Download em PDF</span>
      </div>

      {/* Preço */}
      <div className="mb-6">
        <div className="text-xs text-slate-500 mb-1">Preço oficial:</div>
        <div className="font-titulo font-bold text-4xl text-azul-profundo">
          R$ {precoFormatado}
        </div>
      </div>

      {/* Botão CTA principal */}
      <a
        href={linkCompra}
        target="_blank"
        rel="noopener noreferrer"
        className="
          block w-full text-center
          bg-azul-profundo text-white
          font-titulo font-bold text-base
          py-3.5 px-6 rounded-xl
          hover:bg-azul-edital transition
          mb-3
        "
      >
        Comprar Agora
      </a>

      {/* Botão WhatsApp secundário */}
      <a
        href={linkDuvida}
        target="_blank"
        rel="noopener noreferrer"
        className="
          block w-full text-center
          bg-transparent border border-slate-300 text-slate-700
          font-titulo font-semibold text-sm
          py-3 px-6 rounded-xl
          hover:border-emerald-500 hover:text-emerald-700 transition
          mb-6
        "
      >
        Dúvidas no WhatsApp
      </a>

      {/* Selos de confiança */}
      <div className="space-y-2.5 text-xs text-slate-500 border-t border-slate-100 pt-4">
        <div className="flex items-center gap-2">
          <span className="text-emerald-600 font-bold">✓</span>
          <span>Editora especializada em concursos</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-emerald-600 font-bold">✓</span>
          <span>Material 100% digital em PDF</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-emerald-600 font-bold">✓</span>
          <span>Download seguro</span>
        </div>
      </div>
    </div>
  );
}
