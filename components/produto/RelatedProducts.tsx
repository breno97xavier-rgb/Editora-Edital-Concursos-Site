import React from 'react';
import { CardProduto } from './CardProduto';
import { Produto, produtos } from '@/data/produtos';

interface RelatedProductsProps {
  produtoAtual: Produto;
}

export default function RelatedProducts({ produtoAtual }: RelatedProductsProps) {
  // Filtra outros produtos ativos, excluindo o atual
  // Prioriza materiais da mesma matéria ou outros concursos ativos
  const outrosMateriais = produtos
    .filter((p) => {
      if (!p.ativo || p.slug === produtoAtual.slug) return false;
      // Se for concurso, não inclui o complemento direto que já está na seção acima
      if (produtoAtual.concurso && p.concurso === produtoAtual.concurso) return false;
      return true;
    })
    .slice(0, 3);

  if (outrosMateriais.length === 0) return null;

  return (
    <section className="mt-12 pt-10 border-t border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-titulo text-xl sm:text-2xl font-bold text-azul-profundo">
            Outros materiais para seus estudos
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Explore outros editais e disciplinas preparatórias da editora.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {outrosMateriais.map((item) => (
          <CardProduto key={item.slug} produto={item} />
        ))}
      </div>
    </section>
  );
}
