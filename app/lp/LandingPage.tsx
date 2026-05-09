import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Book3D from '@/components/produto/Book3D';
import { landings } from '@/data/landings';
import LPHeader from '@/components/lp/LPHeader';
import LPFooter from '@/components/lp/LPFooter';
import LPBotaoCompra from '@/components/lp/LPBotaoCompra';

export default function LandingPage() {
  const { slug } = useParams<{ slug: string }>();
  const lp = landings.find((l) => l.slug === slug);

  useEffect(() => {
    if (lp) {
      document.title = `${lp.concursoSigla} 2026 — Apostila Completa | Editora Edital Concursos`;
      
      // Meta noindex check
      let meta = document.querySelector('meta[name="robots"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'robots');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', 'noindex, follow');

      return () => {
        // Cleanup if needed, though robots noindex usually stays for the route
      };
    }
  }, [lp]);

  if (!lp) {
    return <Navigate to="/apostilas" replace />;
  }

  const precoFormatado = lp.preco.toFixed(2).replace('.', ',');
  const precoOriginalFormatado = lp.precoOriginal?.toFixed(2).replace('.', ',');
  const temDesconto = lp.precoOriginal && lp.precoOriginal > lp.preco;
  const percentualDesconto = temDesconto 
    ? Math.round(((lp.precoOriginal! - lp.preco) / lp.precoOriginal!) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-branco">
      <LPHeader />

      <main>
        {/* HERO */}
        <section className="bg-azul-profundo text-branco py-12 md:py-20">
          <div className="max-w-6xl mx-auto px-6">
            {lp.seloPromocional && (
              <div className="text-center mb-6">
                <span className="inline-block bg-dourado text-azul-profundo font-titulo font-bold text-sm px-4 py-2 rounded-full">
                  {lp.seloPromocional}
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Coluna esquerda — Texto + CTA */}
              <div className="text-center lg:text-left">
                <span className="inline-block text-dourado font-titulo font-bold text-sm tracking-widest uppercase mb-4">
                  Concurso {lp.concursoSigla} 2026
                </span>
                <h1 className="font-titulo text-3xl md:text-5xl font-bold text-branco mb-6 leading-tight">
                  {lp.headlinePrincipal}
                </h1>
                <p className="text-lg md:text-xl text-cinza-claro mb-8 leading-relaxed">
                  {lp.subheadline}
                </p>

                {/* Bloco de preço */}
                <div className="bg-branco/5 border border-branco/10 rounded-xl p-6 mb-6 inline-block w-full">
                  {temDesconto && (
                    <div className="flex items-center gap-3 justify-center lg:justify-start mb-2">
                      <span className="text-cinza-claro line-through text-lg">
                        De R$ {precoOriginalFormatado}
                      </span>
                      <span className="bg-vermelho-promo text-branco text-sm font-bold px-3 py-1 rounded-full">
                        -{percentualDesconto}% OFF
                      </span>
                    </div>
                  )}
                  <div className="text-center lg:text-left">
                    <div className="text-cinza-claro text-sm mb-1">por apenas</div>
                    <div className="font-titulo font-bold text-5xl text-dourado mb-2">
                      R$ {precoFormatado}
                    </div>
                    <div className="text-cinza-claro">
                      ou {lp.parcelamento}
                    </div>
                  </div>
                </div>

                <LPBotaoCompra 
                  link={lp.linkKiwify} 
                  texto="Garantir Minha Apostila Agora"
                  variante="grande"
                />

                <div className="flex flex-wrap gap-4 mt-6 justify-center lg:justify-start text-sm text-cinza-claro">
                  <span>🔒 Site 100% seguro</span>
                  <span>⚡ Liberação imediata</span>
                  <span>✓ Garantia de 7 dias</span>
                </div>
              </div>

              {/* Coluna direita — Livro */}
              <div className="flex justify-center">
                <Book3D 
                  capaUrl={lp.capaUrl}
                  titulo={`Apostila ${lp.concursoSigla}`}
                  tamanho="grande"
                />
              </div>
            </div>
          </div>
        </section>

        {/* O QUE VOCÊ VAI RECEBER */}
        <section className="py-16 bg-branco">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="font-titulo text-3xl md:text-4xl font-bold text-azul-profundo text-center mb-4">
              O que você vai receber
            </h2>
            <p className="text-cinza-medio text-center text-lg mb-12">
              Tudo que você precisa para sua aprovação no {lp.concursoSigla}.
            </p>

            <div className="space-y-4">
              {lp.oQueRecebe.map((item, i) => (
                <div 
                  key={i}
                  className="flex items-start gap-4 bg-cinza-claro rounded-lg p-5 hover:shadow-md transition"
                >
                  <div className="w-10 h-10 bg-dourado text-azul-profundo rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    ✓
                  </div>
                  <p className="text-cinza-escuro text-lg pt-1">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <LPBotaoCompra link={lp.linkKiwify} texto="Quero Minha Apostila" variante="medio" />
            </div>
          </div>
        </section>

        {/* SOBRE O CONCURSO */}
        <section className="py-16 bg-cinza-claro">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="font-titulo text-3xl md:text-4xl font-bold text-azul-profundo text-center mb-4">
              Sobre o concurso {lp.concursoSigla}
            </h2>
            <p className="text-cinza-medio text-center text-lg mb-12">
              {lp.concursoNomeCompleto} — {lp.cargo}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { label: 'Vagas', valor: lp.sobreConcurso.vagas },
                { label: 'Salário Inicial', valor: lp.sobreConcurso.salarioInicial, destaque: true },
                { label: 'Escolaridade', valor: lp.sobreConcurso.nivelEscolaridade },
                { label: 'Status Edital', valor: lp.sobreConcurso.statusEdital },
                { label: 'Próxima Prova', valor: lp.sobreConcurso.proximaProva },
              ].map((info) => (
                <div 
                  key={info.label}
                  className={`
                    bg-branco rounded-lg p-5 text-center
                    ${info.destaque ? 'border-2 border-dourado' : ''}
                  `}
                >
                  <div className="text-xs text-cinza-medio uppercase tracking-wider mb-2">
                    {info.label}
                  </div>
                  <div className={`
                    font-titulo font-bold
                    ${info.destaque ? 'text-2xl text-dourado' : 'text-lg text-azul-profundo'}
                  `}>
                    {info.valor}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTEÚDO PROGRAMÁTICO */}
        <section className="py-16 bg-branco">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="font-titulo text-3xl md:text-4xl font-bold text-azul-profundo text-center mb-4">
              Conteúdo programático
            </h2>
            <p className="text-cinza-medio text-center text-lg mb-12">
              Tudo que cai no edital, organizado e pronto para estudar.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl mx-auto">
              {lp.conteudoProgramatico.map((topico, i) => (
                <div 
                  key={i}
                  className="flex items-center gap-3 bg-cinza-claro rounded-lg px-5 py-4"
                >
                  <span className="text-dourado font-bold flex-shrink-0">✓</span>
                  <span className="text-cinza-escuro font-medium">{topico}</span>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <LPBotaoCompra link={lp.linkKiwify} texto="Comprar Apostila Agora" variante="medio" />
            </div>
          </div>
        </section>

        {/* GARANTIAS DESTACADAS */}
        <section className="py-16 bg-azul-profundo text-branco">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="font-titulo text-3xl md:text-4xl font-bold text-center mb-12">
              Você compra com tranquilidade
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { 
                  icone: '🛡️', 
                  titulo: 'Garantia de 7 dias', 
                  desc: 'Não gostou? Devolvemos seu dinheiro integral, sem perguntas.' 
                },
                { 
                  icone: '⚡', 
                  titulo: 'Liberação imediata', 
                  desc: 'Receba seu PDF no email logo após a confirmação do pagamento.' 
                },
                { 
                  icone: '🔒', 
                  titulo: 'Compra 100% segura', 
                  desc: 'Pagamento via Kiwify com criptografia. Pix, cartão ou boleto.' 
                },
              ].map((garantia) => (
                <div key={garantia.titulo} className="text-center">
                  <div className="text-5xl mb-4">{garantia.icone}</div>
                  <h3 className="font-titulo font-bold text-xl mb-2">
                    {garantia.titulo}
                  </h3>
                  <p className="text-cinza-claro leading-relaxed">
                    {garantia.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ ENXUTO */}
        <section className="py-16 bg-cinza-claro">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-titulo text-3xl md:text-4xl font-bold text-azul-profundo text-center mb-12">
              Perguntas frequentes
            </h2>

            <div className="space-y-3">
              {[
                {
                  p: 'Como recebo a apostila após a compra?',
                  r: 'Imediatamente após a confirmação do pagamento (especialmente via Pix), você recebe o PDF no email cadastrado. Cartão de crédito leva poucos minutos.'
                },
                {
                  p: 'O material é mesmo atualizado conforme o último edital?',
                  r: `Sim. Nossa apostila é revisada conforme o edital mais recente do ${lp.concursoSigla}. Se houver atualização durante seu estudo, você recebe a nova versão sem custo adicional.`
                },
                {
                  p: 'Funciona em celular, tablet e computador?',
                  r: 'Sim. O PDF abre em qualquer dispositivo com leitor de PDF (gratuito). Você pode estudar de onde estiver.'
                },
                {
                  p: 'E se eu não gostar?',
                  r: 'Garantia incondicional de 7 dias. Basta enviar uma mensagem pelo WhatsApp solicitando o reembolso e devolvemos 100% do valor.'
                },
              ].map((faq, i) => (
                <details 
                  key={i}
                  className="bg-branco rounded-lg p-6 group cursor-pointer border border-transparent hover:border-dourado/30 transition"
                >
                  <summary className="font-titulo font-bold text-cinza-escuro list-none flex items-center justify-between gap-4">
                    <span className="group-hover:text-azul-profundo transition">{faq.p}</span>
                    <span className="text-2xl text-azul-profundo group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-4 text-cinza-escuro leading-relaxed">
                    {faq.r}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA FINAL MASSIVO */}
        <section className="py-20 bg-azul-profundo text-branco">
          <div className="max-w-4xl mx-auto px-6 text-center">
            {lp.seloPromocional && (
              <span className="inline-block bg-dourado text-azul-profundo font-titulo font-bold text-sm px-4 py-2 rounded-full mb-6">
                {lp.seloPromocional}
              </span>
            )}

            <h2 className="font-titulo text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Sua aprovação no <span className="text-dourado">{lp.concursoSigla}</span> está mais perto do que você imagina.
            </h2>
            <p className="text-cinza-claro text-xl mb-10 max-w-2xl mx-auto">
              Comece a estudar com o material certo. Liberação imediata após o pagamento.
            </p>

            {/* Bloco de preço final */}
            <div className="bg-branco/5 border border-branco/10 rounded-xl p-8 mb-8 inline-block">
              {temDesconto && (
                <div className="text-cinza-claro line-through mb-2 text-lg">
                  De R$ {precoOriginalFormatado}
                </div>
              )}
              <div className="text-cinza-claro text-sm mb-1">Apostila completa por apenas</div>
              <div className="font-titulo font-bold text-6xl text-dourado mb-2">
                R$ {precoFormatado}
              </div>
              <div className="text-cinza-claro">
                ou {lp.parcelamento}
              </div>
            </div>

            <div>
              <LPBotaoCompra link={lp.linkKiwify} texto="Garantir Minha Apostila Agora" variante="grande" />
            </div>

            <div className="flex flex-wrap gap-4 mt-8 justify-center text-sm text-cinza-claro">
              <span>🔒 Site 100% seguro</span>
              <span>⚡ Liberação imediata</span>
              <span>✓ Garantia de 7 dias</span>
              <span>📱 Pix, cartão ou boleto</span>
            </div>
          </div>
        </section>
      </main>

      <LPFooter />
    </div>
  );
}
