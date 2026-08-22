import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { produtos, labelsConcursos, labelsMaterias, Concurso, Materia } from '@/data/produtos';
import NotFoundProduto from './NotFoundProduto';
import SEO from '@/components/SEO';
import ProductBreadcrumb from '@/components/produto/ProductBreadcrumb';
import ProductHero from '@/components/produto/ProductHero';
import ProductComplement from '@/components/produto/ProductComplement';
import ProductContent from '@/components/produto/ProductContent';
import RelatedProducts from '@/components/produto/RelatedProducts';
import WhatsAppSupport from '@/components/produto/WhatsAppSupport';

export default function DetalheProdutoPage() {
  const { slug } = useParams<{ slug: string }>();

  // Rola para o topo ao carregar nova página de produto
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const produto = produtos.find((p) => p.slug === slug);

  // Se o produto não existir ou estiver inativo (ex: prf-2026-combo), exibe 404 polido
  if (!produto || !produto.ativo) {
    return <NotFoundProduto />;
  }

  const nomeConcurso = produto.concurso 
    ? labelsConcursos[produto.concurso as Concurso] || produto.concurso.toUpperCase()
    : null;

  const nomeMateria = produto.materia 
    ? labelsMaterias[produto.materia as Materia] || produto.materia
    : null;

  // Schema.org para SEO estruturado
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: produto.titulo,
    description: produto.descricaoCurta,
    image: produto.capaUrl,
    brand: {
      '@type': 'Brand',
      name: 'Editora Edital Concursos',
    },
    offers: {
      '@type': 'Offer',
      url: `https://editoraeditalconcursos.com.br/apostila/${produto.slug}`,
      priceCurrency: 'BRL',
      price: produto.preco.toFixed(2),
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Editora Edital Concursos',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SEO 
        title={`${produto.titulo} — Editora Edital Concursos`}
        description={produto.descricaoCurta} 
      />

      <main className="bg-slate-50 min-h-screen py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* 1. BREADCRUMB CONTEXTUAL */}
          <ProductBreadcrumb produto={produto} />

          {/* 2. HERO PRINCIPAL DO PRODUTO (2 Colunas Desktop) */}
          <ProductHero produto={produto} />

          {/* 3. RELACIONAMENTO DIRETO: COMPLETE SUA PREPARAÇÃO (Teórico <-> Questões) */}
          <ProductComplement produtoAtual={produto} />

          {/* 4. CONTEÚDO PROGRAMÁTICO E DESCRIÇÃO EDITORIAL */}
          <ProductContent produto={produto} />

          {/* 5. OUTROS MATERIAIS PARA SEUS ESTUDOS */}
          <RelatedProducts produtoAtual={produto} />

          {/* 6. ATENDIMENTO WHATSAPP INSTITUCIONAL */}
          <WhatsAppSupport tituloProduto={produto.titulo} />

          {/* 7. NAVEGAÇÃO DE RETORNO AO CATÁLOGO */}
          <div className="mt-8 pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
            <Link
              to="/apostilas"
              className="inline-flex items-center gap-2 text-sm font-semibold text-azul-profundo hover:text-azul-edital transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Ver todos os materiais</span>
            </Link>

            {nomeConcurso && (
              <Link
                to={`/apostilas?concurso=${produto.concurso}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-azul-profundo transition-colors"
              >
                <BookOpen size={16} />
                <span>Ver todos os materiais de {nomeConcurso}</span>
              </Link>
            )}

            {nomeMateria && (
              <Link
                to={`/apostilas?materia=${produto.materia}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-azul-profundo transition-colors"
              >
                <BookOpen size={16} />
                <span>Ver todos os materiais de {nomeMateria}</span>
              </Link>
            )}
          </div>

        </div>
      </main>
    </>
  );
}
