import React from 'react';
import CardProduto from '../../components/produto/CardProduto';
import { produtos } from '@/data/produtos';

export default function TesteCardsPage() {
  const produtosAmostra = produtos.slice(0, 8);

  return (
    <main className="min-h-screen bg-slate-50 py-16 px-6 pt-32">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-titulo text-3xl font-bold text-azul-profundo mb-2 text-center">
          Teste — Componente CardProduto
        </h1>
        <p className="text-slate-500 text-center mb-12">
          Visualização dos cards oficiais de produto em grid responsivo
        </p>

        {/* Grid principal — 4 colunas desktop, 2 tablet, 1 mobile */}
        <section className="mb-20">
          <h2 className="font-titulo text-xl font-bold text-azul-profundo mb-6 border-b-2 border-amarelo-edital pb-2">
            Grid de catálogo oficial
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {produtosAmostra.map((prod) => (
              <CardProduto key={prod.slug} produto={prod} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
