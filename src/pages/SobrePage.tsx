import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, HelpCircle, Layers, Package, ArrowRight, CheckCircle2, ShieldCheck, FileText } from 'lucide-react';
import SEO from '@/components/SEO';

const CONCURSOS = [
  { slug: 'prf', nome: 'PRF', descricao: 'Polícia Rodoviária Federal' },
  { slug: 'inss', nome: 'INSS', descricao: 'Instituto Nacional do Seguro Social' },
  { slug: 'bb', nome: 'Banco do Brasil', descricao: 'Carreira Bancária' },
  { slug: 'bacen', nome: 'BACEN', descricao: 'Banco Central do Brasil' },
  { slug: 'ata-mf', nome: 'ATA-MF', descricao: 'Ministério da Fazenda' },
];

const MATERIAS = [
  { slug: 'portugues', nome: 'Língua Portuguesa' },
  { slug: 'matematica', nome: 'Matemática' },
  { slug: 'constitucional', nome: 'Direito Constitucional' },
  { slug: 'administrativo', nome: 'Direito Administrativo' },
  { slug: 'informatica', nome: 'Informática' },
  { slug: 'raciocinio-logico', nome: 'Raciocínio Lógico' },
  { slug: 'adm-publica', nome: 'Administração Pública' },
];

export default function SobrePage() {
  return (
    <>
      <SEO 
        title="Sobre a Edital Concursos" 
        description="Conheça a Editora Edital Concursos, especializada na produção e comercialização de materiais digitais voltados à preparação para concursos públicos."
        canonical="https://editoraeditalconcursos.com.br/sobre"
      />

      <main className="bg-[#F8FAFC] min-h-screen text-slate-800 font-corpo">
        {/* HERO INSTITUCIONAL */}
        <section className="bg-azul-profundo text-white py-16 sm:py-20 md:py-24 border-b border-white/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-1.5 text-amarelo-edital font-titulo font-bold text-xs uppercase tracking-wider bg-white/10 px-3.5 py-1.5 rounded-full mb-6">
              Institucional
            </span>
            <h1 className="font-titulo text-3xl sm:text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">
              Sobre a Edital Concursos
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed max-w-3xl mx-auto font-normal">
              A Edital Concursos é uma editora especializada na produção e comercialização de materiais digitais voltados à preparação para concursos públicos. Nosso trabalho busca reunir conteúdo de estudo em materiais organizados, objetivos e acessíveis para diferentes etapas da preparação.
            </p>
          </div>
        </section>

        {/* NOSSO PROPÓSITO (MISSÃO EDITORIAL) */}
        <section className="py-16 md:py-20 bg-white border-b border-slate-200/80">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="font-titulo text-2xl sm:text-3xl font-bold text-azul-profundo mb-4">
                Nosso propósito
              </h2>
              <div className="w-12 h-1 bg-amarelo-edital mx-auto rounded-full"></div>
            </div>

            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-5 text-base sm:text-lg">
              <p>
                O compromisso da Editora Edital Concursos fundamenta-se na organização estruturada dos estudos e na facilidade de acesso a materiais digitais desenvolvidos especificamente para a preparação em concursos públicos.
              </p>
              <p>
                Priorizamos a clareza na apresentação dos temas e a praticidade para a rotina diária do estudante, disponibilizando conteúdos em formato digital PDF que possibilitam a leitura flexível em diferentes dispositivos ou a impressão conforme a preferência de cada candidato.
              </p>
              <p>
                Nossa atuação editorial é focada na entrega de materiais diretos, estruturados e alinhados às necessidades de quem busca uma preparação consistente e disciplinada.
              </p>
            </div>
          </div>
        </section>

        {/* COMO ORGANIZAMOS OS MATERIAIS */}
        <section className="py-16 md:py-20 bg-[#F8FAFC] border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="font-titulo text-2xl sm:text-3xl font-bold text-azul-profundo mb-3">
                Como organizamos os materiais
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                Conheça a estrutura editorial das quatro linhas de materiais disponibilizadas em nosso catálogo.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
              {/* Card 1: Materiais Teóricos */}
              <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs hover:border-slate-300 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-blue-50 text-azul-profundo flex items-center justify-center mb-5">
                  <BookOpen size={24} className="text-azul-profundo" />
                </div>
                <h3 className="font-titulo font-bold text-lg text-azul-profundo mb-2">
                  Materiais Teóricos
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Materiais digitais destinados ao estudo teórico de concursos específicos, reunindo a fundamentação necessária para a compreensão dos temas exigidos.
                </p>
              </div>

              {/* Card 2: Cadernos de Questões */}
              <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs hover:border-slate-300 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-5">
                  <HelpCircle size={24} className="text-amber-700" />
                </div>
                <h3 className="font-titulo font-bold text-lg text-azul-profundo mb-2">
                  Cadernos de Questões
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Materiais voltados à prática e resolução de questões, permitindo a fixação do conteúdo estudado e o treinamento do formato de avaliação.
                </p>
              </div>

              {/* Card 3: Materiais por Matéria */}
              <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs hover:border-slate-300 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-5">
                  <Layers size={24} className="text-emerald-700" />
                </div>
                <h3 className="font-titulo font-bold text-lg text-azul-profundo mb-2">
                  Materiais por Matéria
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Conteúdos individuais organizados por disciplina, ideais para o estudante que deseja reforçar matérias específicas da sua rotina de estudos.
                </p>
              </div>

              {/* Card 4: Combos */}
              <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs hover:border-slate-300 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center mb-5">
                  <Package size={24} className="text-indigo-700" />
                </div>
                <h3 className="font-titulo font-bold text-lg text-azul-profundo mb-2">
                  Combos Teórico + Questões
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Opção que reúne Material Teórico e Caderno de Questões do mesmo concurso com vantagem comercial na compra conjunta.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CONCURSOS ATUALMENTE TRABALHADOS */}
        <section className="py-16 md:py-20 bg-white border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="font-titulo text-2xl sm:text-3xl font-bold text-azul-profundo mb-3">
                Materiais atualmente disponíveis por concurso
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                O catálogo da Editora Edital Concursos disponibiliza materiais digitais para os seguintes certames:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
              {CONCURSOS.map((c) => (
                <Link
                  key={c.slug}
                  to={`/apostilas?concurso=${c.slug}`}
                  className="bg-[#F8FAFC] border border-slate-200 hover:border-amarelo-edital hover:shadow-xs p-5 rounded-xl text-center group transition-all"
                >
                  <span className="font-titulo font-bold text-lg text-azul-profundo block mb-1 group-hover:text-azul-profundo">
                    {c.nome}
                  </span>
                  <span className="text-xs text-slate-500 block">
                    {c.descricao}
                  </span>
                  <span className="mt-3 text-xs font-semibold text-azul-profundo group-hover:text-amarelo-edital inline-flex items-center gap-1 transition-colors">
                    Ver materiais <ArrowRight size={12} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* MATÉRIAS DISPONÍVEIS */}
        <section className="py-16 md:py-20 bg-[#F8FAFC] border-b border-slate-200/80">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-titulo text-2xl sm:text-3xl font-bold text-azul-profundo mb-3">
              Disciplinas disponíveis
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mb-8 max-w-2xl mx-auto">
              Os materiais individuais por matéria abrangem as seguintes disciplinas fundamentais:
            </p>

            <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 mb-8">
              {MATERIAS.map((m) => (
                <Link
                  key={m.slug}
                  to={`/apostilas?materia=${m.slug}`}
                  className="bg-white border border-slate-200 hover:border-azul-profundo hover:bg-slate-50 text-slate-700 hover:text-azul-profundo px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-2xs inline-flex items-center gap-1.5"
                >
                  <span>{m.nome}</span>
                </Link>
              ))}
            </div>

            <div>
              <Link
                to="/apostilas"
                className="inline-flex items-center gap-2 text-sm font-titulo font-bold text-azul-profundo hover:text-amarelo-edital transition-colors"
              >
                <span>Explorar todos os materiais no catálogo</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* DIFERENCIAIS DA EDITORA */}
        <section className="py-16 md:py-20 bg-white border-b border-slate-200/80">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-titulo text-2xl sm:text-3xl font-bold text-azul-profundo mb-3">
                Pilares editoriais
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                Diretrizes que orientam o desenvolvimento de cada publicação.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="border border-slate-200 rounded-xl p-6 bg-[#F8FAFC]">
                <div className="w-10 h-10 rounded-lg bg-azul-profundo/10 text-azul-profundo flex items-center justify-center mb-4">
                  <FileText size={20} />
                </div>
                <h3 className="font-titulo font-bold text-base text-azul-profundo mb-2">
                  Conteúdo organizado
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Estruturação lógica dos tópicos para facilitar o planejamento dos estudos e a absorção progressiva dos conteúdos.
                </p>
              </div>

              <div className="border border-slate-200 rounded-xl p-6 bg-[#F8FAFC]">
                <div className="w-10 h-10 rounded-lg bg-azul-profundo/10 text-azul-profundo flex items-center justify-center mb-4">
                  <CheckCircle2 size={20} />
                </div>
                <h3 className="font-titulo font-bold text-base text-azul-profundo mb-2">
                  Materiais digitais
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Disponibilização em formato digital PDF, proporcionando portabilidade para leitura em telas ou opção de impressão.
                </p>
              </div>

              <div className="border border-slate-200 rounded-xl p-6 bg-[#F8FAFC]">
                <div className="w-10 h-10 rounded-lg bg-azul-profundo/10 text-azul-profundo flex items-center justify-center mb-4">
                  <ShieldCheck size={20} />
                </div>
                <h3 className="font-titulo font-bold text-base text-azul-profundo mb-2">
                  Foco em concursos públicos
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Publicações orientadas para as exigências práticas e especificidades das seleções públicas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="py-16 md:py-20 bg-azul-profundo text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-titulo text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Encontre o material para sua preparação.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8">
              Acesse nosso catálogo para conhecer os materiais teóricos, cadernos de questões, conteúdos por disciplina e combos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/apostilas"
                className="w-full sm:w-auto bg-amarelo-edital hover:bg-[#ffbe1a] text-azul-profundo font-titulo font-bold text-sm sm:text-base px-8 py-3.5 rounded-lg transition-colors inline-flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Ver materiais</span>
                <ArrowRight size={18} />
              </Link>
              <Link 
                to="/contato"
                className="w-full sm:w-auto bg-transparent border border-white/30 hover:border-white text-white hover:bg-white/10 font-titulo font-semibold text-sm sm:text-base px-8 py-3.5 rounded-lg transition-colors inline-flex items-center justify-center"
              >
                Falar conosco
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
