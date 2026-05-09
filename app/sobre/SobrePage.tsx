'use client';

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function SobrePage() {
  useEffect(() => {
    document.title = 'Sobre — Editora Edital Concursos';
  }, []);

  return (
    <main className="bg-branco">
      {/* HERO */}
      <section className="bg-azul-profundo text-branco py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block text-dourado font-titulo font-bold text-sm tracking-widest uppercase border border-dourado/40 px-4 py-1 rounded-full mb-6">
            Quem somos
          </span>
          <h1 className="font-titulo text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Editora Edital Concursos
          </h1>
          <p className="text-xl md:text-2xl text-cinza-claro leading-relaxed">
            Editora digital especializada em materiais de estudo para concursos públicos brasileiros.
          </p>
        </div>
      </section>

      {/* NOSSA HISTÓRIA */}
      <section className="py-20 bg-branco">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-dourado font-titulo font-bold text-sm tracking-widest uppercase">
              Nossa história
            </span>
            <h2 className="font-titulo text-3xl md:text-4xl font-bold text-azul-profundo mt-2 mb-6">
              Material de qualidade para sua aprovação
            </h2>
          </div>

          <div className="prose prose-lg max-w-none text-cinza-escuro leading-relaxed space-y-6">
            <p className="text-lg">
              A Editora Edital Concursos nasceu com um objetivo claro: oferecer materiais de estudo realmente focados no que cai nas provas, sem desperdiçar o tempo de quem está se preparando para um concurso público.
            </p>

            <p className="text-lg">
              Desenvolvemos cada apostila com profundidade técnica e organização editorial profissional. Nosso time analisa cada edital, identifica os pontos de maior incidência nas provas e estrutura o conteúdo de forma que o estudo seja eficiente, prático e direto ao ponto.
            </p>

            <p className="text-lg">
              Acreditamos que o material certo, na hora certa, faz a diferença entre uma preparação frustrante e uma aprovação real. Por isso, todo o nosso catálogo é constantemente revisado e atualizado conforme os editais mais recentes.
            </p>
          </div>
        </div>
      </section>

      {/* MISSÃO E VALORES */}
      <section className="py-20 bg-cinza-claro">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-dourado font-titulo font-bold text-sm tracking-widest uppercase">
              Nossos pilares
            </span>
            <h2 className="font-titulo text-3xl md:text-4xl font-bold text-azul-profundo mt-2">
              No que acreditamos
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icone: '📘',
                titulo: 'Conteúdo atualizado',
                desc: 'Todas as nossas apostilas são revisadas conforme o último edital, garantindo que você estude exatamente o que será cobrado na prova.',
              },
              {
                icone: '🎯',
                titulo: 'Foco em aprovação',
                desc: 'Material desenvolvido para resultado. Cada disciplina, cada questão, cada exercício é pensado para acelerar sua preparação.',
              },
              {
                icone: '🤝',
                titulo: 'Suporte direto',
                desc: 'Tire dúvidas direto com a editora pelo WhatsApp. Atendimento humano, rápido e dedicado a quem está no caminho da aprovação.',
              },
            ].map((pilar) => (
              <div key={pilar.titulo} className="bg-branco rounded-xl p-8 hover:shadow-lg transition">
                <div className="text-5xl mb-4">{pilar.icone}</div>
                <h3 className="font-titulo font-bold text-xl text-azul-profundo mb-3">
                  {pilar.titulo}
                </h3>
                <p className="text-cinza-medio leading-relaxed">
                  {pilar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POR QUE ESCOLHER */}
      <section className="py-20 bg-azul-profundo text-branco">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-dourado font-titulo font-bold text-sm tracking-widest uppercase">
              Diferenciais
            </span>
            <h2 className="font-titulo text-3xl md:text-4xl font-bold text-branco mt-2">
              Por que escolher nossas apostilas
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                titulo: 'Material 100% digital',
                desc: 'Receba seu PDF imediatamente após o pagamento. Estude em qualquer dispositivo: computador, tablet ou celular. Imprima quando quiser, sem restrições.',
              },
              {
                titulo: 'Questões comentadas',
                desc: 'Cada disciplina inclui questões reais das principais bancas, com comentários detalhados que explicam o raciocínio para acertar.',
              },
              {
                titulo: 'Editorial profissional',
                desc: 'Apostilas com diagramação clara, box de dicas, mnemônicos e fluxogramas que aceleram a memorização do conteúdo.',
              },
              {
                titulo: 'Garantia de 7 dias',
                desc: 'Se você não estiver satisfeito com o material, oferecemos reembolso integral em até 7 dias após a compra. Sem burocracia.',
              },
            ].map((item) => (
              <div key={item.titulo} className="flex gap-4">
                <div className="text-dourado text-2xl font-bold flex-shrink-0">✓</div>
                <div>
                  <h3 className="font-titulo font-bold text-xl text-branco mb-2">
                    {item.titulo}
                  </h3>
                  <p className="text-cinza-claro leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 bg-cinza-claro">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-titulo text-3xl md:text-4xl font-bold text-azul-profundo mb-4">
            Pronto para começar?
          </h2>
          <p className="text-cinza-medio text-lg mb-8">
            Conheça nosso catálogo completo de apostilas e cadernos de questões.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/apostilas"
              className="bg-azul-profundo text-branco font-titulo font-bold text-lg px-8 py-4 rounded-full hover:bg-opacity-90 transition inline-flex items-center justify-center gap-2"
            >
              Ver Apostilas
              <span>→</span>
            </Link>
            <Link 
              to="/contato"
              className="bg-transparent border-2 border-azul-profundo text-azul-profundo font-titulo font-bold text-lg px-8 py-4 rounded-full hover:bg-azul-profundo hover:text-branco transition inline-flex items-center justify-center"
            >
              Fale com a gente
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
