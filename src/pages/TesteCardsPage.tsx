import React from 'react';
import CardProduto, { ProdutoCard } from '../../components/produto/CardProduto';

const produtosTeste: ProdutoCard[] = [
  {
    slug: 'inss-2026-teorico',
    titulo: 'Apostila INSS 2026 — Técnico do Seguro Social',
    tipo: 'teorico',
    preco: 62.70,
    precoOriginal: 89.90,
    parcelamento: '6x de R$ 10,45',
    capaUrl: 'https://i.ibb.co/0RW9Qz3P/2.png',
  },
  {
    slug: 'inss-2026-questoes',
    titulo: 'Caderno de Questões INSS 2026 — Técnico do Seguro Social',
    tipo: 'questoes',
    preco: 40.80,
    parcelamento: '4x de R$ 10,20',
    capaUrl: 'https://i.ibb.co/nqWxjH0B/4.png',
  },
  {
    slug: 'ata-mf-2026-teorico',
    titulo: 'Apostila ATA-MF 2026 — Assistente Técnico Administrativo',
    tipo: 'teorico',
    preco: 57.80,
    parcelamento: '6x de R$ 9,63',
    capaUrl: 'https://i.ibb.co/B24z6Cw2/1.png',
  },
  {
    slug: 'ata-mf-2026-questoes',
    titulo: 'Caderno de Questões ATA-MF 2026 — Assistente Técnico Administrativo',
    tipo: 'questoes',
    preco: 36.90,
    parcelamento: '3x de R$ 12,30',
    capaUrl: 'https://i.ibb.co/4n7V3vNx/2.png',
  },
  {
    slug: 'sedes-df-2026-teorico',
    titulo: 'Apostila SEDES-DF 2026 — Técnico Administrativo',
    tipo: 'teorico',
    preco: 54.80,
    precoOriginal: 79.90,
    parcelamento: '5x de R$ 10,96',
    capaUrl: 'https://i.ibb.co/5hgHXyBj/4.png',
  },
  {
    slug: 'sedes-df-2026-questoes',
    titulo: 'Caderno de Questões SEDES-DF 2026',
    tipo: 'questoes',
    preco: 34.90,
    parcelamento: '3x de R$ 11,63',
    capaUrl: 'https://i.ibb.co/MkWPfBrx/8.png',
  },
  {
    slug: 'prf-2026-teorico',
    titulo: 'Apostila PRF 2026 — Agente Administrativo',
    tipo: 'teorico',
    preco: 64.90,
    parcelamento: '5x de R$ 12,98',
    capaUrl: 'https://i.ibb.co/WWCr1JrL/3.png',
  },
  {
    slug: 'prf-2026-questoes',
    titulo: 'Caderno de Questões PRF 2026 — Agente Administrativo',
    tipo: 'questoes',
    preco: 43.70,
    parcelamento: '4x de R$ 10,93',
    capaUrl: 'https://i.ibb.co/3yCyJHNX/6.png',
  },
];

export default function TesteCardsPage() {
  return (
    <main className="min-h-screen bg-cinza-claro py-16 px-6 pt-40 md:pt-48">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-titulo text-4xl font-bold text-azul-profundo mb-2 text-center">
          Teste — Componente CardProduto
        </h1>
        <p className="text-cinza-medio text-center mb-12">
          Visualização do card de produto em grid responsivo
        </p>

        {/* Grid principal — 4 colunas desktop, 3 tablet large, 2 tablet, 1 mobile */}
        <section className="mb-20">
          <h2 className="font-titulo text-2xl font-bold text-azul-profundo mb-6 border-b-2 border-dourado pb-2">
            Grid de catálogo (4 colunas em desktop)
          </h2>
          <div 
            className="
              grid gap-6
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
            "
          >
            {produtosTeste.map((produto) => (
              <CardProduto key={produto.slug} produto={produto} />
            ))}
          </div>
        </section>

        {/* Grid de destaques — 3 colunas */}
        <section className="mb-20">
          <h2 className="font-titulo text-2xl font-bold text-azul-profundo mb-6 border-b-2 border-dourado pb-2">
            Destaques da home (3 colunas)
          </h2>
          <div 
            className="
              grid gap-8
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            {produtosTeste.slice(0, 3).map((produto) => (
              <CardProduto key={produto.slug} produto={produto} />
            ))}
          </div>
        </section>

        {/* Comparação de tipos — Teórico vs Questões */}
        <section className="mb-20">
          <h2 className="font-titulo text-2xl font-bold text-azul-profundo mb-6 border-b-2 border-dourado pb-2">
            Comparação visual: Teórico vs Questões
          </h2>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2">
            <CardProduto produto={produtosTeste[0]} />
            <CardProduto produto={produtosTeste[1]} />
          </div>
        </section>
      </div>
    </main>
  );
}
