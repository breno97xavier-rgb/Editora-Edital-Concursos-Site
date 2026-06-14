import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Book3D from '@/components/produto/Book3D';
import { landings } from '@/data/landings';
import LPHeader from '@/components/lp/LPHeader';
import LPFooter from '@/components/lp/LPFooter';
import LPBotaoCompra from '@/components/lp/LPBotaoCompra';
import LPDepoimentos from '@/components/lp/LPDepoimentos';
import LPMaterialPorDentro from '@/components/lp/LPMaterialPorDentro';
import SEO from '@/components/SEO';

function renderHeadlineComDestaque(headline: string) {
  const partes = headline.split(/(\{\{destaque\}\}.*?\{\{\/destaque\}\})/g);
  return partes.map((parte, i) => {
    const match = parte.match(/\{\{destaque\}\}(.*?)\{\{\/destaque\}\}/);
    if (match) {
      return <span key={i} className="text-dourado">{match[1]}</span>;
    }
    return <span key={i}>{parte}</span>;
  });
}

export default function LandingPage() {
  const { slug } = useParams<{ slug: string }>();
  const lp = landings.find((l) => l.slug === slug);

  useEffect(() => {
    if (lp) {
      // Meta noindex check
      let meta = document.querySelector('meta[name="robots"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'robots');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', 'noindex, follow');

      // Scripts específicos para ATA-MF
      if (lp.slug === 'ata-mf-2026') {
        // --- Meta Pixel (Facebook) ---
        const fbScriptId = 'fb-pixel-script';
        if (!document.getElementById(fbScriptId)) {
          const script = document.createElement('script');
          script.id = fbScriptId;
          script.innerHTML = `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1986481251987169');
            fbq('track', 'PageView');
          `;
          document.head.appendChild(script);

          const noscript = document.createElement('noscript');
          noscript.id = 'fb-pixel-noscript';
          noscript.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1986481251987169&ev=PageView&noscript=1" />;`;
          document.body.appendChild(noscript);
        } else {
          // Se já existe o script, apenas rastreia o PageView
          if ((window as any).fbq) (window as any).fbq('track', 'PageView');
        }

        // --- Utmify Script ---
        const utmifyScriptId = 'utmify-script';
        if (!document.getElementById(utmifyScriptId)) {
          const utmifyScript = document.createElement('script');
          utmifyScript.id = utmifyScriptId;
          utmifyScript.src = 'https://cdn.utmify.com.br/scripts/utms/latest.js';
          utmifyScript.async = true;
          utmifyScript.defer = true;
          utmifyScript.setAttribute('data-utmify-prevent-xcod-sck', '');
          utmifyScript.setAttribute('data-utmify-prevent-subids', '');
          document.head.appendChild(utmifyScript);
        }
      }

      // Scripts específicos para PRF
      if (lp.slug === 'prf-2026') {
        // --- Meta Pixel (Facebook) ---
        const fbScriptIdPrf = 'fb-pixel-script-prf';
        if (!document.getElementById(fbScriptIdPrf)) {
          const script = document.createElement('script');
          script.id = fbScriptIdPrf;
          script.innerHTML = `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '4496161147335451');
            fbq('track', 'PageView');
          `;
          document.head.appendChild(script);

          const noscript = document.createElement('noscript');
          noscript.id = 'fb-pixel-noscript-prf';
          noscript.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=4496161147335451&ev=PageView&noscript=1" />;`;
          document.body.appendChild(noscript);
        } else {
          // Se já existe o script, apenas rastreia o PageView
          if ((window as any).fbq) (window as any).fbq('track', 'PageView');
        }
      }
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

  const finalLinkCheckout = lp.slug === 'prf-2026' ? '#secao-ofertas' : lp.linkCheckout;

  return (
    <div className="min-h-screen bg-branco">
      <SEO 
        title={`${lp.concursoSigla} 2026 — Apostila Completa`}
        description={lp.subheadline}
      />
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
                  {renderHeadlineComDestaque(lp.headlinePrincipal)}
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
                  link={finalLinkCheckout} 
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
                <div className="lg:scale-110 transition-transform duration-300">
                  <Book3D 
                    capaUrl={lp.capaUrl}
                    titulo={`Apostila ${lp.concursoSigla}`}
                    tamanho="grande"
                  />
                </div>
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
              <LPBotaoCompra link={finalLinkCheckout} texto="Quero Minha Apostila" variante="medio" />
            </div>
          </div>
        </section>

        {/* COMO É O MATERIAL POR DENTRO */}
        {lp.paginasPreview && lp.paginasPreview.length > 0 && (
          <LPMaterialPorDentro 
            paginas={lp.paginasPreview} 
            concursoSigla={lp.concursoSigla} 
          />
        )}

        {/* PROVA SOCIAL — DEPOIMENTOS */}
        {lp.depoimentos && lp.depoimentos.length > 0 && (
          <LPDepoimentos 
            depoimentos={lp.depoimentos} 
            concursoSigla={lp.concursoSigla} 
          />
        )}

        {/* SOBRE O CONCURSO */}
        <section className="py-16 bg-branco">
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
                    bg-cinza-claro rounded-lg p-5 text-center
                    ${info.destaque ? 'border-2 border-dourado shadow-sm' : ''}
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
              <LPBotaoCompra link={finalLinkCheckout} texto="Comprar Apostila Agora" variante="medio" />
            </div>
          </div>
        </section>

        {/* SEÇÃO DE OFERTAS (EXCLUSIVA PARA PRF) */}
        {lp.slug === 'prf-2026' && (
          <section id="secao-ofertas" className="py-20 bg-cinza-claro relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-dourado"></div>
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-12">
                <span className="inline-block bg-dourado/15 text-dourado border border-dourado/40 font-titulo font-bold text-sm px-4 py-1.5 rounded-full mb-4">
                  ⚡ PROMOÇÃO SEMANAL • POR TEMPO LIMITADO
                </span>
                <h2 className="font-titulo text-3xl md:text-5xl font-bold text-azul-profundo mb-4">
                  Escolha o seu Plano de Estudos
                </h2>
                <p className="text-cinza-medio text-lg max-w-2xl mx-auto">
                  Adquira as melhores ferramentas de preparação acelerada para o concurso da Polícia Rodoviária Federal com descontos exclusivos.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
                {/* Oferta 1: Material Teórico */}
                <div id="oferta-teorica" className="bg-branco rounded-2xl p-8 shadow-md border-2 border-transparent hover:border-dourado/40 transition-all duration-300 flex flex-col justify-between relative group">
                  <div className="absolute top-4 right-4 z-10 bg-cinza-claro text-cinza-escuro font-titulo font-bold text-xs px-3 py-1 rounded-full">
                    Material Teórico
                  </div>
                  <div>
                    {/* Imagem do material */}
                    <div className="flex justify-center mb-6 h-56 items-center">
                      <div className="group-hover:scale-105 transition-transform duration-300">
                        <Book3D 
                          capaUrl="https://i.ibb.co/WWCr1JrL/3.png"
                          titulo="Apostila Teórica PRF"
                          tamanho="pequeno"
                        />
                      </div>
                    </div>
                    {/* Títulos */}
                    <h3 className="font-titulo font-bold text-2xl text-azul-profundo mb-1">
                      Apostila Teórica Completa
                    </h3>
                    <p className="text-sm text-cinza-medio mb-4">
                      Estude toda a teoria exigida no edital focado em Agente Administrativo com didática objetiva.
                    </p>

                    {/* Divisor */}
                    <hr className="border-cinza-claro my-4" />

                    {/* Vantagens */}
                    <ul className="space-y-3 mb-6 text-sm text-cinza-escuro">
                      <li className="flex items-center gap-2">
                        <span className="text-dourado font-bold">✓</span>
                        Teoria esquematizada das 9 disciplinas básicas & específicas
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-dourado font-bold">✓</span>
                        Dicas rápidas, mnemônicos e guias pós-edital
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-dourado font-bold">✓</span>
                        Disponível em PDFs prontos para imprimir ou ler digitalmente
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-dourado font-bold">✓</span>
                        Acesso vitalício ao Google Drive com atualizações gratuitas
                      </li>
                    </ul>
                  </div>

                  <div>
                    {/* Preços */}
                    <div className="mb-4 bg-cinza-claro/50 rounded-xl p-4 text-center">
                      <div className="text-cinza-medio text-sm line-through decoration-vermelho-promo/80">
                        De R$ 46,00
                      </div>
                      <div className="text-azul-profundo font-titulo font-bold text-3xl">
                        R$ 24,00 <span className="text-xs text-cinza-medio font-sans font-normal">à vista</span>
                      </div>
                      <div className="text-sm text-cinza-escuro mt-1">
                        ou <span className="font-bold text-azul-profundo">2x de R$ 12,00</span> sem juros
                      </div>
                    </div>

                    {/* Botão */}
                    <button
                      onClick={() => window.open(lp.linkCheckout, '_blank', 'noopener,noreferrer')}
                      className="w-full bg-azul-profundo text-branco font-titulo font-bold py-3.5 px-6 rounded-xl hover:bg-azul-profundo/90 hover:scale-[1.01] transition-all duration-200 shadow inline-flex items-center justify-center gap-2"
                    >
                      <span>Garantir Material Teórico</span>
                      <span>→</span>
                    </button>
                    <p className="text-center text-xs text-cinza-medio mt-3">
                      ⚡ Envio automático instantâneo no seu e-mail
                    </p>
                  </div>
                </div>

                {/* Oferta 2: Combo Teoria + Questões */}
                <div id="oferta-combo" className="bg-branco rounded-2xl p-8 shadow-xl border-2 border-dourado relative flex flex-col justify-between group overflow-hidden">
                  <div className="absolute top-0 right-0 bg-dourado text-azul-profundo font-titulo font-bold text-xs px-5 py-2.5 rounded-bl-xl tracking-wider uppercase shadow-sm">
                    Recomendado • Combo de Aprovação
                  </div>
                  <div>
                    {/* Imagens dos materiais (lado a lado / stacked) */}
                    <div className="flex justify-center gap-4 mb-6 h-56 items-center pt-4">
                      <div className="-rotate-6 group-hover:-rotate-12 transition-transform duration-300">
                        <Book3D 
                          capaUrl="https://i.ibb.co/WWCr1JrL/3.png"
                          titulo="Apostila Teórica PRF"
                          tamanho="pequeno"
                        />
                      </div>
                      <div className="rotate-6 group-hover:rotate-12 transition-transform duration-300 -ml-8">
                        <Book3D 
                          capaUrl="https://i.ibb.co/p62t8539/6.png"
                          titulo="Caderno de Questões PRF"
                          tamanho="pequeno"
                        />
                      </div>
                    </div>
                    {/* Títulos */}
                    <h3 className="font-titulo font-bold text-2xl text-azul-profundo mb-1 flex items-center gap-2">
                      Combo Completo: Teoria + Questões
                    </h3>
                    <p className="text-sm text-cinza-medio mb-4">
                      O passaporte ideal: Teoria Completa mais um Caderno com centenas de Questões comentadas.
                    </p>

                    {/* Divisor */}
                    <hr className="border-cinza-claro my-4" />

                    {/* Vantagens */}
                    <ul className="space-y-3 mb-6 text-sm text-cinza-escuro">
                      <li className="flex items-center gap-2">
                        <span className="text-dourado font-bold">★</span>
                        <strong>Apostila Teórica Completa PRF</strong> inclusa
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-dourado font-bold">★</span>
                        <strong>Caderno de Questões Completo PRF</strong> (Capa Nova 2026)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-dourado font-bold">★</span>
                        Centenas de questões gabaritadas e totalmente comentadas
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-dourado font-bold">★</span>
                        Suporte prioritário personalizado via WhatsApp da editora
                      </li>
                    </ul>
                  </div>

                  <div>
                    {/* Preços */}
                    <div className="mb-4 bg-dourado/10 border border-dourado/30 rounded-xl p-4 text-center">
                      <div className="text-cinza-escuro text-sm line-through decoration-vermelho-promo/80">
                        De R$ 68,00
                      </div>
                      <div className="text-dourado font-titulo font-bold text-4xl">
                        R$ 47,00 <span className="text-xs text-cinza-escuro font-sans font-normal">à vista</span>
                      </div>
                      <div className="text-sm text-cinza-escuro mt-1 font-semibold">
                        ou <span className="font-bold text-azul-profundo">4x de R$ 11,75</span> sem juros
                      </div>
                    </div>

                    {/* Botão */}
                    <button
                      onClick={() => window.open('https://pay.cakto.com.br/g6mv766', '_blank', 'noopener,noreferrer')}
                      className="w-full bg-dourado text-azul-profundo hover:bg-dourado/90 hover:scale-[1.01] transition-all duration-200 shadow-lg font-titulo font-bold py-4 px-6 rounded-xl inline-flex items-center justify-center gap-2"
                    >
                      <span>Garantir o Combo com Questões</span>
                      <span>→</span>
                    </button>
                    <p className="text-center text-xs text-cinza-medio mt-3">
                      🔒 Site blindado com liberação e download imediato
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

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
                  desc: 'Pagamento via Cakto com criptografia. Pix, cartão ou boleto.' 
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
                  r: 'Imediatamente após a confirmação do pagamento, você recebe no email cadastrado um link de acesso à área de membros da Cakto. Lá dentro, você terá acesso a uma pasta no Google Drive com todos os PDFs do material — pode baixar quantas vezes quiser e estudar em qualquer dispositivo.'
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
              <LPBotaoCompra link={finalLinkCheckout} texto="Garantir Minha Apostila Agora" variante="grande" />
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
