import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import Book3D from './Book3D';
import ComboCover from './ComboCover';
import { Produto, produtos, labelsConcursos, Concurso, getDetalhesCombo } from '@/data/produtos';

interface ProductComplementProps {
  produtoAtual: Produto;
}

export default function ProductComplement({ produtoAtual }: ProductComplementProps) {
  // Apenas se o produto tiver um concurso vinculado e não for o combo em si
  if (!produtoAtual.concurso) return null;

  // Se o usuário está vendo o combo, buscamos matérias relacionadas ou não exibimos
  if (produtoAtual.tipo === 'combo') {
    return null;
  }

  // Busca o combo deste concurso
  const comboConcurso = produtos.find(
    (p) => p.ativo && p.concurso === produtoAtual.concurso && p.tipo === 'combo'
  );

  // Busca o outro produto individual complementar (se vendo teórico -> questões; se vendo questões -> teórico)
  const tipoIndividualComplementar = produtoAtual.tipo === 'teorico' ? 'questoes' : 'teorico';
  const produtoIndividualComplementar = produtos.find(
    (p) => p.ativo && p.concurso === produtoAtual.concurso && p.tipo === tipoIndividualComplementar
  );

  const detalhesCombo = comboConcurso ? getDetalhesCombo(comboConcurso) : null;
  const nomeConcurso = labelsConcursos[produtoAtual.concurso as Concurso] || produtoAtual.concurso.toUpperCase();

  // Preferimos destacar o Combo Oficial quando disponível, pois oferece vantagem comercial direta
  if (comboConcurso && detalhesCombo) {
    return (
      <section className="bg-gradient-to-br from-azul-profundo/5 via-azul-edital/5 to-slate-50 rounded-2xl border border-azul-profundo/10 p-6 sm:p-8 shadow-xs my-10">
        <div className="flex items-center gap-2 text-xs font-titulo font-bold uppercase tracking-wider text-azul-edital mb-2">
          <Sparkles size={16} />
          <span>Vantagem Comercial — {nomeConcurso}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mt-4">
          {/* Capas do Combo */}
          <div className="md:col-span-5 flex justify-center">
            <Link to={`/apostila/${comboConcurso.slug}`} className="group block">
              <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs group-hover:shadow-md transition-shadow">
                <ComboCover
                  capaTeorico={detalhesCombo.capaTeorico}
                  capaQuestoes={detalhesCombo.capaQuestoes}
                  titulo={comboConcurso.titulo}
                  tamanho="pequeno"
                />
              </div>
            </Link>
          </div>

          {/* Informações do Combo */}
          <div className="md:col-span-7 flex flex-col justify-center">
            <div className="mb-2 flex items-center gap-2">
              <span className="inline-block text-xs font-titulo px-2.5 py-0.5 rounded-full bg-azul-profundo text-amarelo-edital border border-amarelo-edital/40 font-bold">
                Combo Teórico + Questões
              </span>
              <span className="inline-block text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                Economize R$ {detalhesCombo.economia.toFixed(2).replace('.', ',')}
              </span>
            </div>

            <h3 className="font-titulo text-xl sm:text-2xl font-bold text-azul-profundo mb-2">
              Leve a preparação completa com o Combo {nomeConcurso}
            </h3>

            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Garanta a <strong>Apostila Teórica</strong> e o <strong>Caderno de Questões</strong> juntos com economia de R$ {detalhesCombo.economia.toFixed(2).replace('.', ',')} em relação à compra individual dos dois materiais.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to={`/apostila/${comboConcurso.slug}`}
                className="
                  inline-flex items-center gap-2
                  bg-azul-profundo hover:bg-azul-edital text-white
                  font-titulo font-semibold text-sm
                  py-2.5 px-5 rounded-xl
                  transition-colors shadow-xs hover:shadow-md
                "
              >
                <span>Ver Combo {nomeConcurso}</span>
                <ArrowRight size={16} />
              </Link>

              {produtoIndividualComplementar && (
                <Link
                  to={`/apostila/${produtoIndividualComplementar.slug}`}
                  className="text-xs text-slate-500 hover:text-azul-profundo font-medium underline"
                >
                  Ou ver apenas o {produtoIndividualComplementar.tipo === 'questoes' ? 'Caderno de Questões' : 'Material Teórico'}
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Fallback caso não haja combo
  if (!produtoIndividualComplementar) return null;

  return (
    <section className="bg-gradient-to-br from-azul-profundo/5 via-azul-edital/5 to-slate-50 rounded-2xl border border-azul-profundo/10 p-6 sm:p-8 shadow-xs my-10">
      <div className="flex items-center gap-2 text-xs font-titulo font-bold uppercase tracking-wider text-azul-edital mb-2">
        <Sparkles size={16} />
        <span>Complete seus estudos — {nomeConcurso}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mt-4">
        <div className="md:col-span-4 flex justify-center">
          <Link to={`/apostila/${produtoIndividualComplementar.slug}`} className="group block">
            <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-xs group-hover:shadow-md transition-shadow">
              <Book3D
                capaUrl={produtoIndividualComplementar.capaUrl}
                titulo={produtoIndividualComplementar.titulo}
                tamanho="medio"
                className="max-w-[170px] sm:max-w-[200px]"
              />
            </div>
          </Link>
        </div>

        <div className="md:col-span-8 flex flex-col justify-center">
          <div className="mb-2">
            <span className={`inline-block text-xs font-titulo px-2.5 py-0.5 rounded-full ${
              produtoIndividualComplementar.tipo === 'questoes'
                ? 'bg-amarelo-edital text-azul-profundo font-bold'
                : 'bg-azul-profundo text-white font-semibold'
            }`}>
              {produtoIndividualComplementar.tipo === 'questoes' ? 'Caderno de Questões' : 'Material Teórico'}
            </span>
          </div>

          <h3 className="font-titulo text-xl sm:text-2xl font-bold text-azul-profundo mb-2">
            {produtoIndividualComplementar.titulo}
          </h3>

          <p className="text-slate-600 text-sm leading-relaxed mb-5">
            {produtoIndividualComplementar.descricaoCurta}
          </p>

          <div>
            <Link
              to={`/apostila/${produtoIndividualComplementar.slug}`}
              className="
                inline-flex items-center gap-2
                bg-azul-profundo hover:bg-azul-edital text-white
                font-titulo font-semibold text-sm
                py-3 px-5 rounded-xl
                transition-colors shadow-xs hover:shadow-md
              "
            >
              <span>{produtoAtual.tipo === 'teorico' ? 'Ver Caderno de Questões' : 'Ver Material Teórico'}</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
