import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Book3D from '@/components/produto/Book3D';
import CardProduto from '@/components/produto/CardProduto';
import { produtos, faqPadrao } from '@/data/produtos';
import FAQAccordion from '@/components/produto/FAQAccordion';
import CardCompra from '@/components/produto/CardCompra';
import NotFoundProduto from './NotFoundProduto';
import SEO from '@/components/SEO';

export default function DetalheProdutoPage() {
  const { slug } = useParams<{ slug: string }>();
  const produto = produtos.find((p) => p.slug === slug);

  if (!produto || !produto.ativo) {
    return <NotFoundProduto />;
  }

  // Produtos relacionados: mesmo concurso ou matéria, exceto o próprio
  const relacionados = produtos
    .filter((p) => 
      p.ativo && 
      p.slug !== produto.slug && 
      (
        (produto.concurso && p.concurso === produto.concurso) ||
        (produto.materia && p.materia === produto.materia)
      )
    )
    .slice(0, 4);

  const labelTipo = produto.tipo === 'teorico' ? 'Apostila Teórica' : 'Caderno de Questões';
  const todasFAQs = [...(produto.faqExtra || []), ...faqPadrao];

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
      <SEO title={produto.titulo} description={produto.descricaoCurta} />
      <main className="bg-branco">
      {/* BREADCRUMB */}
      <div className="bg-cinza-claro border-b border-cinza-claro">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="text-sm text-cinza-medio">
            <Link to="/" className="hover:text-azul-profundo">Página inicial</Link>
            <span className="mx-2">/</span>
            <Link to="/apostilas" className="hover:text-azul-profundo">Apostilas</Link>
            <span className="mx-2">/</span>
            <span className="text-cinza-escuro">{produto.titulo}</span>
          </nav>
        </div>
      </div>

      {/* HERO DO PRODUTO */}
      <section className="bg-azul-profundo text-branco py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Coluna esquerda — Capa do livro */}
            <div className="lg:col-span-4 flex justify-center items-start">
              <Book3D 
                capaUrl={produto.capaUrl}
                titulo={produto.titulo}
                tamanho="grande"
              />
            </div>

            {/* Coluna central — Informações */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <span className={`
                inline-block w-fit text-xs font-titulo font-bold 
                px-3 py-1 rounded-full
                ${produto.tipo === 'teorico' 
                  ? 'bg-branco/10 text-branco border border-branco/30' 
                  : 'bg-dourado text-azul-profundo'}
              `}>
                {labelTipo}
              </span>

              <h1 className="font-titulo text-3xl md:text-4xl font-bold text-branco leading-tight">
                {produto.titulo}
              </h1>

              <p className="text-cinza-claro text-lg leading-relaxed">
                {produto.descricaoCurta}
              </p>

              {/* Ficha rápida */}
              <div className="grid grid-cols-2 gap-4 mt-4 p-4 bg-branco/5 rounded-lg border border-branco/10">
                <div>
                  <div className="text-xs text-cinza-claro uppercase tracking-wider mb-1">Instituição</div>
                  <div className="text-branco font-medium">{produto.fichaTecnica.instituicao}</div>
                </div>
                <div>
                  <div className="text-xs text-cinza-claro uppercase tracking-wider mb-1">Cargo</div>
                  <div className="text-branco font-medium">{produto.fichaTecnica.cargo}</div>
                </div>
                <div>
                  <div className="text-xs text-cinza-claro uppercase tracking-wider mb-1">Nível</div>
                  <div className="text-branco font-medium">{produto.fichaTecnica.nivel}</div>
                </div>
                <div>
                  <div className="text-xs text-cinza-claro uppercase tracking-wider mb-1">Páginas</div>
                  <div className="text-branco font-medium">{produto.fichaTecnica.paginas} páginas</div>
                </div>
              </div>
            </div>

            {/* Coluna direita — Card de compra (sticky) */}
            <div className="lg:col-span-3">
              <CardCompra produto={produto} />
            </div>
          </div>
        </div>
      </section>

      {/* O QUE VOCÊ VAI RECEBER */}
      <section className="py-16 bg-branco">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-titulo text-3xl font-bold text-azul-profundo text-center mb-12">
            O que você vai receber
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {produto.oQueRecebe.map((item, i) => (
              <div key={i} className="bg-cinza-claro rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-dourado text-azul-profundo rounded-full flex items-center justify-center mx-auto mb-4 font-titulo font-bold text-xl">
                  {i + 1}
                </div>
                <p className="text-cinza-escuro font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FICHA TÉCNICA */}
      <section className="py-16 bg-cinza-claro">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-titulo text-3xl font-bold text-azul-profundo mb-8">
            Ficha técnica
          </h2>
          <div className="bg-branco rounded-lg overflow-hidden">
            <table className="w-full">
              <tbody>
                {[
                  ['Instituição', produto.fichaTecnica.instituicao],
                  ['Cargo', produto.fichaTecnica.cargo],
                  ['Estado', produto.fichaTecnica.estado],
                  ['Nível', produto.fichaTecnica.nivel],
                  ['Páginas', `${produto.fichaTecnica.paginas} páginas`],
                  ['Última atualização', produto.fichaTecnica.ultimaAtualizacao],
                  ['Formato', 'PDF Digital'],
                ].map(([label, valor], i) => (
                  <tr key={label} className={i % 2 === 0 ? 'bg-cinza-claro/40' : ''}>
                    <td className="py-3 px-6 font-titulo font-bold text-cinza-escuro w-1/3">{label}</td>
                    <td className="py-3 px-6 text-cinza-escuro">{valor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* DESCRIÇÃO COMPLETA */}
      <section className="py-16 bg-branco">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-titulo text-3xl font-bold text-azul-profundo mb-8">
            Descrição completa
          </h2>
          <div className="prose prose-lg max-w-none text-cinza-escuro leading-relaxed">
            {produto.descricaoCompleta.split('\n\n').map((paragrafo, i) => (
              <p key={i} className="mb-4 text-lg">{paragrafo}</p>
            ))}
          </div>

          <h3 className="font-titulo text-2xl font-bold text-azul-profundo mt-12 mb-6">
            Conteúdo programático
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {produto.topicosCobertos.map((topico, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-dourado font-bold flex-shrink-0 mt-1">✓</span>
                <span className="text-cinza-escuro">{topico}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PRODUTOS RELACIONADOS */}
      {relacionados.length > 0 && (
        <section className="py-16 bg-cinza-claro">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-titulo text-3xl font-bold text-azul-profundo mb-8">
              Materiais relacionados
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relacionados.map((p) => (
                <CardProduto key={p.slug} produto={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-16 bg-branco">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-titulo text-3xl font-bold text-azul-profundo mb-8 text-center">
            Perguntas frequentes
          </h2>
          <FAQAccordion faqs={todasFAQs} />
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-16 bg-azul-profundo text-branco">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-titulo text-3xl md:text-4xl font-bold mb-4">
            Pronto para começar a estudar?
          </h2>
          <p className="text-cinza-claro text-lg mb-8 max-w-2xl mx-auto">
            Liberação imediata após o pagamento. Comece sua preparação ainda hoje.
          </p>
          <a
            href={produto.linkCheckout}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-dourado text-azul-profundo font-titulo font-bold text-xl px-12 py-5 rounded-full hover:bg-opacity-90 transition"
          >
            Comprar Agora
            <span>→</span>
          </a>
          <p className="text-cinza-claro text-sm mt-6">
            🔒 Site 100% seguro · Pagamento via Pix, cartão ou boleto
          </p>
        </div>
      </section>
    </main>
    </>
  );
}
