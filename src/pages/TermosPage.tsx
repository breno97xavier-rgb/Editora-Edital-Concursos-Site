import React from 'react';
import SEO from '@/components/SEO';

export default function TermosPage() {
  return (
    <>
      <SEO 
        title="Termos de Uso" 
        description="Termos de uso e condições gerais da Editora Edital Concursos para aquisição e utilização de materiais digitais de estudo."
        canonical="https://editoraeditalconcursos.com.br/termos"
      />

      <main className="bg-[#F8FAFC] py-16 font-corpo text-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 shadow-2xs">
            <h1 className="font-titulo text-3xl sm:text-4xl font-bold text-azul-profundo mb-2">
              Termos de Uso
            </h1>
            <p className="text-slate-500 text-sm mb-10 pb-6 border-b border-slate-200">
              Editora Edital Concursos — Informações e condições gerais de acesso aos materiais digitais
            </p>

            <div className="prose prose-slate max-w-none text-slate-700 space-y-6 text-sm sm:text-base leading-relaxed">
              <section>
                <h2 className="font-titulo text-xl font-bold text-azul-profundo mb-3">1. Identificação</h2>
                <p>
                  Os materiais digitais e este site são de responsabilidade da <strong>Editora Edital Concursos</strong>, inscrita no CNPJ sob o nº 65.395.470/0001-47.
                </p>
              </section>

              <section>
                <h2 className="font-titulo text-xl font-bold text-azul-profundo mb-3">2. Natureza dos Produtos e Formato</h2>
                <p>
                  A Editora Edital Concursos comercializa materiais digitais de estudo voltados a concursos públicos, disponibilizados exclusivamente em formato digital PDF (Materiais Teóricos, Cadernos de Questões, Materiais por Disciplina e Combos).
                </p>
                <p>
                  Não há comercialização ou envio de materiais impressos por via postal.
                </p>
              </section>

              <section>
                <h2 className="font-titulo text-xl font-bold text-azul-profundo mb-3">3. Processamento de Compras e Pagamentos</h2>
                <p>
                  O processamento dos pedidos e transações financeiras ocorre por meio das plataformas de pagamento e checkout parceiras indicadas no ato da compra, em ambiente seguro fornecido por tais intermediadoras.
                </p>
              </section>

              <section>
                <h2 className="font-titulo text-xl font-bold text-azul-profundo mb-3">4. Liberação do Material Digital</h2>
                <p>
                  O acesso aos arquivos digitais em formato PDF é liberado conforme as diretrizes e fluxo da plataforma de compra após a confirmação do pagamento. Em caso de dificuldades ou dúvidas sobre a liberação, o usuário pode contatar o suporte institucional.
                </p>
              </section>

              <section>
                <h2 className="font-titulo text-xl font-bold text-azul-profundo mb-3">5. Uso dos Conteúdos e Direitos Autorais</h2>
                <p>
                  Os materiais adquiridos destinam-se exclusivamente ao uso pessoal e individual do adquirente para fins de estudo.
                </p>
                <p>
                  É vedada a distribuição não autorizada, comercialização, rateio, compartilhamento público ou reprodução indevida dos arquivos digitais.
                </p>
              </section>

              <section>
                <h2 className="font-titulo text-xl font-bold text-azul-profundo mb-3">6. Suporte, Cancelamento e Reembolso</h2>
                <p>
                  Solicitações de suporte sobre acesso, compras ou pedidos de cancelamento e reembolso devem ser encaminhadas aos canais oficiais de atendimento da Editora, onde serão tratadas de acordo com as regras aplicáveis às compras digitais e à plataforma de processamento.
                </p>
              </section>

              <section>
                <h2 className="font-titulo text-xl font-bold text-azul-profundo mb-3">7. Canais Institucionais de Contato</h2>
                <p>
                  Para suporte, dúvidas ou esclarecimentos:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>WhatsApp:</strong> (41) 98842-0201</li>
                  <li><strong>E-mail:</strong> editoraeditalconcursos@gmail.com</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
