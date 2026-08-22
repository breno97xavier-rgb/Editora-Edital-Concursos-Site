import React from 'react';
import SEO from '@/components/SEO';

export default function PrivacidadePage() {
  return (
    <>
      <SEO 
        title="Política de Privacidade" 
        description="Informações sobre privacidade e tratamento de dados da Editora Edital Concursos."
        canonical="https://editoraeditalconcursos.com.br/privacidade"
      />

      <main className="bg-[#F8FAFC] py-16 font-corpo text-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 shadow-2xs">
            <h1 className="font-titulo text-3xl sm:text-4xl font-bold text-azul-profundo mb-2">
              Política de Privacidade
            </h1>
            <p className="text-slate-500 text-sm mb-10 pb-6 border-b border-slate-200">
              Editora Edital Concursos — Informações sobre privacidade e tratamento de dados
            </p>

            <div className="prose prose-slate max-w-none text-slate-700 space-y-6 text-sm sm:text-base leading-relaxed">
              <section>
                <h2 className="font-titulo text-xl font-bold text-azul-profundo mb-3">1. Identificação</h2>
                <p>
                  Esta página descreve as práticas de privacidade relacionadas aos serviços e materiais da <strong>Editora Edital Concursos</strong>, inscrita no CNPJ sob o nº 65.395.470/0001-47.
                </p>
              </section>

              <section>
                <h2 className="font-titulo text-xl font-bold text-azul-profundo mb-3">2. Como os Dados São Tratados</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-titulo font-bold text-base text-azul-profundo mb-1">
                      a) Navegação no site institucional
                    </h3>
                    <p>
                      O acesso ao catálogo e às páginas informativas deste site ocorre sem a exigência de criação de conta de usuário ou preenchimento de cadastros prévios no site.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-titulo font-bold text-base text-azul-profundo mb-1">
                      b) Atendimento e contato voluntário
                    </h3>
                    <p>
                      Caso o usuário entre em contato voluntariamente pelos canais institucionais (WhatsApp ou e-mail), os dados fornecidos (como nome, número de telefone e e-mail) serão utilizados unicamente para responder à solicitação e prestar o atendimento solicitado.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-titulo font-bold text-base text-azul-profundo mb-1">
                      c) Processamento de compras e pagamentos
                    </h3>
                    <p>
                      Ao selecionar a compra de um material, o usuário é direcionado para a plataforma de pagamento e checkout integrada. Os dados cadastrais e financeiros necessários para a concretização da transação são inseridos e processados diretamente em ambiente seguro da respectiva plataforma de pagamento.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="font-titulo text-xl font-bold text-azul-profundo mb-3">3. Finalidade e Utilização</h2>
                <p>
                  As informações tratadas destinam-se exclusivamente à operacionalização da liberação dos materiais adquiridos, suporte ao cliente e atendimento a eventuais solicitações institucionais.
                </p>
              </section>

              <section>
                <h2 className="font-titulo text-xl font-bold text-azul-profundo mb-3">4. Contato sobre Privacidade</h2>
                <p>
                  Para dúvidas ou esclarecimentos a respeito do tratamento de dados, o contato pode ser realizado diretamente através do canal oficial:
                </p>
                <p className="font-mono text-sm font-semibold text-azul-profundo">
                  editoraeditalconcursos@gmail.com
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
