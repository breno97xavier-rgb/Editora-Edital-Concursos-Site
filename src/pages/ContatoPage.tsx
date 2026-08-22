import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Mail, HelpCircle, ChevronDown, ShoppingBag, CreditCard, DownloadCloud, Search, ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';

const WHATSAPP_NUMERO = '(41) 98842-0201';
const WHATSAPP_LINK = 'https://wa.me/5541988420201?text=' + encodeURIComponent('Olá! Preciso de ajuda com um material da Edital Concursos.');
const EMAIL_CONTATO = 'editoraeditalconcursos@gmail.com';

const FAQ_ITENS = [
  {
    pergunta: 'Os materiais são digitais?',
    resposta: 'Sim. Os materiais comercializados pela Editora Edital Concursos são disponibilizados em formato digital PDF.',
  },
  {
    pergunta: 'Como recebo meu material?',
    resposta: 'Após a confirmação do pagamento, o acesso ao material digital é liberado conforme o fluxo da plataforma de compra.',
  },
  {
    pergunta: 'Posso comprar apenas uma matéria?',
    resposta: 'Sim. O catálogo possui materiais individuais das disciplinas atualmente disponíveis.',
  },
  {
    pergunta: 'Qual a diferença entre Material Teórico e Caderno de Questões?',
    resposta: 'O Material Teórico é destinado ao estudo do conteúdo do concurso, enquanto o Caderno de Questões é voltado à prática por meio de questões.',
  },
  {
    pergunta: 'O que é o Combo?',
    resposta: 'É a aquisição conjunta do Material Teórico e do Caderno de Questões do mesmo concurso por um valor inferior à compra separada dos dois produtos.',
  },
  {
    pergunta: 'Onde encontro os materiais disponíveis?',
    resposta: 'No catálogo de apostilas do site (/apostilas), com opções de filtros por concurso, matéria e tipo de material.',
  },
];

export default function ContatoPage() {
  const [faqAberto, setFaqAberto] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setFaqAberto(faqAberto === index ? null : index);
  };

  return (
    <>
      <SEO 
        title="Contato & Suporte" 
        description="Entre em contato com a Editora Edital Concursos para tirar dúvidas sobre materiais digitais, compras ou suporte ao seu acesso."
        canonical="https://editoraeditalconcursos.com.br/contato"
      />

      <main className="bg-[#F8FAFC] min-h-screen text-slate-800 font-corpo">
        {/* HERO INSTITUCIONAL */}
        <section className="bg-azul-profundo text-white py-16 sm:py-20 border-b border-white/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-1.5 text-amarelo-edital font-titulo font-bold text-xs uppercase tracking-wider bg-white/10 px-3.5 py-1.5 rounded-full mb-6">
              Atendimento e Suporte
            </span>
            <h1 className="font-titulo text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight leading-tight">
              Como podemos ajudar?
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl mx-auto font-normal">
              Entre em contato para tirar dúvidas sobre materiais, compras ou acesso aos produtos.
            </p>
          </div>
        </section>

        {/* CANAIS DE ATENDIMENTO */}
        <section className="py-14 sm:py-16 bg-white border-b border-slate-200/80">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="font-titulo text-2xl sm:text-3xl font-bold text-azul-profundo mb-2">
                Canais de Atendimento
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                Escolha o canal de sua preferência para falar diretamente com a Editora.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {/* WhatsApp */}
              <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-emerald-500 transition-colors shadow-2xs">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
                    <MessageSquare size={24} />
                  </div>
                  <h3 className="font-titulo font-bold text-xl text-azul-profundo mb-2">
                    WhatsApp
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    Canal direto para suporte a dúvidas sobre materiais e atendimento.
                  </p>
                  <p className="font-mono text-sm font-semibold text-slate-800 mb-6">
                    {WHATSAPP_NUMERO}
                  </p>
                </div>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-titulo font-bold text-sm px-6 py-3.5 rounded-xl transition-colors shadow-xs"
                >
                  <MessageSquare size={18} />
                  <span>Falar pelo WhatsApp</span>
                </a>
              </div>

              {/* E-mail */}
              <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-azul-profundo transition-colors shadow-2xs">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-azul-profundo flex items-center justify-center mb-5">
                    <Mail size={24} />
                  </div>
                  <h3 className="font-titulo font-bold text-xl text-azul-profundo mb-2">
                    E-mail Institucional
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    Para solicitações institucionais ou envio detalhado de dúvidas.
                  </p>
                  <p className="font-mono text-xs sm:text-sm font-semibold text-slate-800 break-all mb-6">
                    {EMAIL_CONTATO}
                  </p>
                </div>
                <a
                  href={`mailto:${EMAIL_CONTATO}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-azul-profundo hover:bg-opacity-90 text-white font-titulo font-bold text-sm px-6 py-3.5 rounded-xl transition-colors shadow-xs"
                >
                  <Mail size={18} />
                  <span>Enviar e-mail</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SUPORTE À COMPRA */}
        <section className="py-14 sm:py-16 bg-[#F8FAFC] border-b border-slate-200/80">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="font-titulo text-2xl sm:text-3xl font-bold text-azul-profundo mb-2">
                Suporte ao Estudante
              </h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
                Casos comuns em que nossa equipe de atendimento pode auxiliar:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-slate-100 text-azul-profundo flex-shrink-0">
                  <Search size={20} />
                </div>
                <div>
                  <h3 className="font-titulo font-bold text-base text-azul-profundo mb-1">
                    Dúvida antes da compra
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Esclarecimentos sobre o formato digital em PDF, disciplinas inclusas e características de cada publicação.
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-slate-100 text-azul-profundo flex-shrink-0">
                  <CreditCard size={20} />
                </div>
                <div>
                  <h3 className="font-titulo font-bold text-base text-azul-profundo mb-1">
                    Dificuldade com pagamento
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Auxílio caso tenha dúvidas sobre a confirmação da transação na plataforma de pagamento.
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-slate-100 text-azul-profundo flex-shrink-0">
                  <DownloadCloud size={20} />
                </div>
                <div>
                  <h3 className="font-titulo font-bold text-base text-azul-profundo mb-1">
                    Dúvida sobre acesso ao material
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Instruções para download e visualização dos arquivos em formato PDF após a compra.
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-slate-100 text-azul-profundo flex-shrink-0">
                  <ShoppingBag size={20} />
                </div>
                <div>
                  <h3 className="font-titulo font-bold text-base text-azul-profundo mb-1">
                    Identificação do material adequado
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Orientação sobre a diferença entre materiais teóricos, cadernos de questões e combos para seu objetivo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ INSTITUCIONAL */}
        <section className="py-16 md:py-20 bg-white border-b border-slate-200/80">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-1.5 text-azul-profundo font-titulo font-bold text-xs uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full mb-3">
                <HelpCircle size={14} />
                Dúvidas frequentes
              </span>
              <h2 className="font-titulo text-2xl sm:text-3xl font-bold text-azul-profundo">
                Perguntas Frequentes
              </h2>
            </div>

            <div className="space-y-3">
              {FAQ_ITENS.map((item, index) => {
                const isOpen = faqAberto === index;
                return (
                  <div 
                    key={index}
                    className="border border-slate-200 rounded-xl overflow-hidden bg-[#F8FAFC] transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-titulo font-bold text-slate-800 text-base hover:text-azul-profundo focus:outline-none focus:ring-2 focus:ring-azul-profundo focus:ring-inset"
                      aria-expanded={isOpen}
                    >
                      <span>{item.pergunta}</span>
                      <ChevronDown 
                        size={18} 
                        className={`text-slate-500 transition-transform duration-200 flex-shrink-0 ${
                          isOpen ? 'rotate-180 text-azul-profundo' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-200/60 bg-white">
                        <p>{item.resposta}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA PARA CATÁLOGO */}
        <section className="py-14 sm:py-16 bg-azul-profundo text-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-titulo text-2xl sm:text-3xl font-bold mb-3">
              Pronto para escolher seu material de estudo?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mb-6">
              Consulte nosso catálogo completo com opções para PRF, INSS, Banco do Brasil, BACEN e ATA-MF.
            </p>
            <Link
              to="/apostilas"
              className="inline-flex items-center gap-2 bg-amarelo-edital hover:bg-[#ffbe1a] text-azul-profundo font-titulo font-bold text-sm sm:text-base px-8 py-3.5 rounded-lg transition-colors shadow-xs"
            >
              <span>Ver catálogo de apostilas</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
