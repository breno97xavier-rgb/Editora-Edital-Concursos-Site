'use client';

import React, { useEffect } from 'react';
import FormularioContato from '@/components/contato/FormularioContato';

const mensagemWhatsApp = encodeURIComponent(
  'Olá! Vim pelo site da Editora Edital Concursos e gostaria de mais informações sobre as apostilas.'
);

export default function ContatoPage() {
  useEffect(() => {
    document.title = 'Contato — Editora Edital Concursos';
  }, []);

  return (
    <main className="bg-branco">
      {/* HERO */}
      <section className="bg-azul-profundo text-branco py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block text-dourado font-titulo font-bold text-sm tracking-widest uppercase border border-dourado/40 px-4 py-1 rounded-full mb-6">
            Atendimento
          </span>
          <h1 className="font-titulo text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Fale com a gente
          </h1>
          <p className="text-xl text-cinza-claro leading-relaxed max-w-2xl mx-auto">
            Tire dúvidas sobre as apostilas, peça orientação sobre seu concurso ou converse diretamente com nossa equipe.
          </p>
        </div>
      </section>

      {/* CANAIS DE CONTATO */}
      <section className="py-20 bg-branco">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-dourado font-titulo font-bold text-sm tracking-widest uppercase">
              Canais
            </span>
            <h2 className="font-titulo text-3xl md:text-4xl font-bold text-azul-profundo mt-2">
              Como prefere falar com a gente?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* WhatsApp */}
            <a
              href={`https://wa.me/5541988420201?text=${mensagemWhatsApp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="
                bg-cinza-claro rounded-xl p-8 text-center
                border-2 border-transparent
                hover:border-verde-sucesso hover:shadow-lg hover:-translate-y-1
                transition-all duration-300
                group
              "
            >
              <div className="text-5xl mb-4">💬</div>
              <h3 className="font-titulo font-bold text-xl text-azul-profundo mb-2 group-hover:text-verde-sucesso transition">
                WhatsApp
              </h3>
              <p className="text-cinza-medio mb-4 text-sm">
                Resposta em minutos durante o horário comercial.
              </p>
              <div className="font-titulo font-bold text-azul-profundo group-hover:text-verde-sucesso transition">
                (41) 98842-0201
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:editoraeditalconcursos@gmail.com"
              className="
                bg-cinza-claro rounded-xl p-8 text-center
                border-2 border-transparent
                hover:border-dourado hover:shadow-lg hover:-translate-y-1
                transition-all duration-300
                group
              "
            >
              <div className="text-5xl mb-4">📧</div>
              <h3 className="font-titulo font-bold text-xl text-azul-profundo mb-2 group-hover:text-dourado transition">
                Email
              </h3>
              <p className="text-cinza-medio mb-4 text-sm">
                Resposta em até 24h. Ideal para dúvidas detalhadas.
              </p>
              <div className="font-titulo font-bold text-azul-profundo group-hover:text-dourado transition text-sm break-all">
                editoraeditalconcursos@gmail.com
              </div>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/editoraeditalconcursos"
              target="_blank"
              rel="noopener noreferrer"
              className="
                bg-cinza-claro rounded-xl p-8 text-center
                border-2 border-transparent
                hover:border-azul-profundo hover:shadow-lg hover:-translate-y-1
                transition-all duration-300
                group
              "
            >
              <div className="text-5xl mb-4">📷</div>
              <h3 className="font-titulo font-bold text-xl text-azul-profundo mb-2">
                Instagram
              </h3>
              <p className="text-cinza-medio mb-4 text-sm">
                Acompanhe novidades e converse pela DM.
              </p>
              <div className="font-titulo font-bold text-azul-profundo">
                @editoraeditalconcursos
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* FORMULÁRIO */}
      <section className="py-20 bg-cinza-claro">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-dourado font-titulo font-bold text-sm tracking-widest uppercase">
              Formulário
            </span>
            <h2 className="font-titulo text-3xl md:text-4xl font-bold text-azul-profundo mt-2 mb-4">
              Envie sua mensagem
            </h2>
            <p className="text-cinza-medio">
              Preencha o formulário abaixo que retornaremos no email informado.
            </p>
          </div>

          <FormularioContato />
        </div>
      </section>

      {/* FAQ DE SUPORTE */}
      <section className="py-20 bg-branco">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-dourado font-titulo font-bold text-sm tracking-widest uppercase">
              Perguntas frequentes
            </span>
            <h2 className="font-titulo text-3xl md:text-4xl font-bold text-azul-profundo mt-2">
              Antes de entrar em contato
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                p: 'Qual o horário de atendimento?',
                r: 'Atendemos de segunda a sexta, das 9h às 18h. Mensagens enviadas fora desse horário são respondidas no próximo dia útil.',
              },
              {
                p: 'Não recebi minha apostila por email. O que faço?',
                r: 'Verifique a caixa de spam/lixo eletrônico do email cadastrado na compra. Se ainda não encontrar o link de acesso à área de membros da Cakto, entre em contato pelo WhatsApp informando o email da compra que reenviamos imediatamente.',
              },
              {
                p: 'Quero solicitar uma apostila específica que não está no catálogo. É possível?',
                r: 'Sim! Envie sua sugestão pelo formulário ou WhatsApp. Avaliamos demanda regularmente e priorizamos os concursos mais solicitados.',
              },
              {
                p: 'Vocês oferecem desconto para grupos de estudo?',
                r: 'Sim, temos condições especiais para compras em grupo. Entre em contato pelo WhatsApp informando a quantidade desejada.',
              },
              {
                p: 'Como funciona a garantia de 7 dias?',
                r: 'Se você não estiver satisfeito com o material, basta solicitar o reembolso pelo WhatsApp ou email em até 7 dias após a compra. Devolvemos o valor integral, sem burocracia.',
              },
            ].map((faq, i) => (
              <details 
                key={i}
                className="bg-cinza-claro rounded-lg p-6 group cursor-pointer border border-transparent hover:border-dourado/30 transition"
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
    </main>
  );
}
