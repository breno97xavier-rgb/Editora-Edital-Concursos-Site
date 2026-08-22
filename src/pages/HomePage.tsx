import React from 'react';
import { Link } from 'react-router-dom';
import { CardProduto } from '../../components/produto/CardProduto';
import { ContestCard, ContestItem } from '../../components/home/ContestCard';
import { SubjectCard, SubjectItem } from '../../components/home/SubjectCard';
import { produtos } from '../../data/produtos';
import SEO from '../../components/SEO';

// Concursos autorizados com capas oficiais 3D reais (Teórico + Questões)
const concursosData: ContestItem[] = [
  {
    id: 'prf',
    slug: 'prf',
    sigla: 'PRF',
    nome: 'Polícia Rodoviária Federal',
    descricao: 'Apostila teórica e caderno de questões para o cargo de Agente Administrativo.',
    capaTeorico: 'https://ycagvwsvccgdjzpbhrfi.supabase.co/storage/v1/object/public/Editora/Capas%203D/1.png',
    capaQuestoes: 'https://ycagvwsvccgdjzpbhrfi.supabase.co/storage/v1/object/public/Editora/Capas%203D/6.png',
  },
  {
    id: 'inss',
    slug: 'inss',
    sigla: 'INSS',
    nome: 'Instituto Nacional do Seguro Social',
    descricao: 'Apostila teórica e caderno de questões com gabarito para Técnico do Seguro Social.',
    capaTeorico: 'https://ycagvwsvccgdjzpbhrfi.supabase.co/storage/v1/object/public/Editora/Capas%203D/2.png',
    capaQuestoes: 'https://ycagvwsvccgdjzpbhrfi.supabase.co/storage/v1/object/public/Editora/Capas%203D/7.png',
  },
  {
    id: 'bacen',
    slug: 'bacen',
    sigla: 'BACEN',
    nome: 'Banco Central do Brasil',
    descricao: 'Apostila teórica e caderno de questões para as carreiras de Analista e Técnico.',
    capaTeorico: 'https://ycagvwsvccgdjzpbhrfi.supabase.co/storage/v1/object/public/Editora/Capas%203D/3.png',
    capaQuestoes: 'https://ycagvwsvccgdjzpbhrfi.supabase.co/storage/v1/object/public/Editora/Capas%203D/8.png',
  },
  {
    id: 'bb',
    slug: 'bb',
    sigla: 'Banco do Brasil',
    nome: 'Carreira Bancária — Escriturário',
    descricao: 'Apostila teórica e caderno de questões para o cargo de Escriturário.',
    capaTeorico: 'https://ycagvwsvccgdjzpbhrfi.supabase.co/storage/v1/object/public/Editora/Capas%203D/4.png',
    capaQuestoes: 'https://ycagvwsvccgdjzpbhrfi.supabase.co/storage/v1/object/public/Editora/Capas%203D/9.png',
  },
  {
    id: 'ata-mf',
    slug: 'ata-mf',
    sigla: 'ATA-MF',
    nome: 'Ministério da Fazenda',
    descricao: 'Apostila teórica e caderno de questões para Assistente Técnico Administrativo.',
    capaTeorico: 'https://ycagvwsvccgdjzpbhrfi.supabase.co/storage/v1/object/public/Editora/Capas%203D/5.png',
    capaQuestoes: 'https://ycagvwsvccgdjzpbhrfi.supabase.co/storage/v1/object/public/Editora/Capas%203D/10.png',
  },
];

// As 7 matérias oficiais com suas capas 3D correspondentes
const materiasData: SubjectItem[] = [
  {
    id: 'portugues',
    slug: 'portugues',
    nome: 'Língua Portuguesa',
    descricao: 'Gramática aplicada, interpretação de texto e redação oficial para concursos.',
    capaUrl: 'https://ycagvwsvccgdjzpbhrfi.supabase.co/storage/v1/object/public/Editora/Capas%203D/11.png',
    linkProduto: '/apostila/portugues-teorico',
    topicos: ['Gramática', 'Interpretação de Texto', 'Crase e Regência'],
  },
  {
    id: 'matematica',
    slug: 'matematica',
    nome: 'Matemática',
    descricao: 'Matemática básica explicada do zero com exercícios resolvidos passo a passo.',
    capaUrl: 'https://ycagvwsvccgdjzpbhrfi.supabase.co/storage/v1/object/public/Editora/Capas%203D/12.png',
    linkProduto: '/apostila/matematica-teorico',
    topicos: ['Aritmética', 'Regra de Três', 'Porcentagem e Equações'],
  },
  {
    id: 'raciocinio-logico',
    slug: 'raciocinio-logico',
    nome: 'Raciocínio Lógico',
    descricao: 'Lógica proposicional, tabelas-verdade e equivalências lógicas descomplicadas.',
    capaUrl: 'https://ycagvwsvccgdjzpbhrfi.supabase.co/storage/v1/object/public/Editora/Capas%203D/13.png',
    linkProduto: '/apostila/raciocinio-logico-teorico',
    topicos: ['Tabela-Verdade', 'Equivalências', 'Argumentação'],
  },
  {
    id: 'informatica',
    slug: 'informatica',
    nome: 'Informática',
    descricao: 'Sistemas operacionais, suítes de escritório, redes e segurança da informação.',
    capaUrl: 'https://ycagvwsvccgdjzpbhrfi.supabase.co/storage/v1/object/public/Editora/Capas%203D/14.png',
    linkProduto: '/apostila/informatica-teorico',
    topicos: ['Windows/Linux', 'Office/LibreOffice', 'Segurança da Informação'],
  },
  {
    id: 'constitucional',
    slug: 'constitucional',
    nome: 'Direito Constitucional',
    descricao: 'Direitos fundamentais, organização do Estado e da Administração Pública.',
    capaUrl: 'https://ycagvwsvccgdjzpbhrfi.supabase.co/storage/v1/object/public/Editora/Capas%203D/15.png',
    linkProduto: '/apostila/constitucional-teorico',
    topicos: ['Artigo 5º', 'Organização do Estado', 'Administração na CF'],
  },
  {
    id: 'administrativo',
    slug: 'administrativo',
    nome: 'Direito Administrativo',
    descricao: 'Princípios, atos administrativos, Lei 8.112/90 e Nova Lei de Licitações.',
    capaUrl: 'https://ycagvwsvccgdjzpbhrfi.supabase.co/storage/v1/object/public/Editora/Capas%203D/16.png',
    linkProduto: '/apostila/administrativo-teorico',
    topicos: ['Atos Administrativos', 'Lei 8.112/90', 'Licitações 14.133/21'],
  },
  {
    id: 'adm-publica',
    slug: 'adm-publica',
    nome: 'Administração Pública',
    descricao: 'Modelos de gestão pública, governança e gestão estratégica de pessoas.',
    capaUrl: 'https://ycagvwsvccgdjzpbhrfi.supabase.co/storage/v1/object/public/Editora/Capas%203D/17.png',
    linkProduto: '/apostila/adm-publica-teorico',
    topicos: ['Modelos de Gestão', 'Planejamento', 'Governança Pública'],
  },
];

export default function HomePage() {
  // Produtos em destaque (os 5 materiais teóricos dos concursos oficiais)
  const materiaisDestaque = produtos.filter((p) => 
    p.ativo && p.tipo === 'teorico' && p.categoria === 'concurso'
  ).slice(0, 5);

  // Cadernos de questões específicos
  const cadernosQuestoes = produtos.filter((p) => 
    p.ativo && p.tipo === 'questoes'
  ).slice(0, 5);

  return (
    <main className="w-full">
      <SEO 
        title="Editora Edital Concursos — Apostilas e Materiais para Concursos Públicos"
        description="Apostilas digitais para concursos públicos. Atualizadas, completas, com teoria e questões comentadas das principais bancas."
      />

      {/* ========================================================================= */}
      {/* 1. HERO PRINCIPAL (Composição Tipográfica Limpa e Institucional) */}
      {/* ========================================================================= */}
      <section className="relative bg-azul-profundo text-branco py-14 sm:py-16 md:py-20 lg:py-22 overflow-hidden">
        {/* Efeito de luz sutil no fundo */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-azul-edital via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl lg:max-w-4xl text-left">
            {/* Selo oficial */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amarelo-edital/40 bg-amarelo-edital/10 text-amarelo-edital text-xs sm:text-sm font-titulo font-semibold tracking-wide uppercase mb-6">
              <span>EDITORA EDITAL CONCURSOS</span>
            </div>

            {/* Título principal */}
            <h1 className="font-titulo text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold leading-tight tracking-tight text-white mb-6">
              Sua aprovação começa com o <span className="text-amarelo-edital">material certo.</span>
            </h1>

            {/* Subtítulo */}
            <p className="text-slate-300 text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl mb-8">
              Apostilas digitais para concursos públicos. Atualizadas, completas, com questões comentadas das principais bancas.
            </p>

            {/* Botões de Ação */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
              <Link
                to="/apostilas"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amarelo-edital hover:bg-amarelo-edital/90 text-azul-profundo font-titulo font-bold text-base px-8 py-3.5 rounded-lg shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 text-center"
              >
                <span>Ver Apostilas</span>
                <span>→</span>
              </Link>
              <Link
                to="/apostilas?categoria=concurso"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-white/10 hover:bg-white/15 text-white border border-white/20 font-titulo font-semibold text-base px-7 py-3.5 rounded-lg transition-all duration-200 text-center"
              >
                Por Concurso
              </Link>
            </div>

            {/* Indicadores de Confiança */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-300 font-medium pt-4 border-t border-white/10 max-w-2xl">
              <div className="flex items-center gap-1.5">
                <span className="text-amarelo-edital font-bold">✓</span>
                <span>Liberação imediata</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-amarelo-edital font-bold">✓</span>
                <span>100% digital</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-amarelo-edital font-bold">✓</span>
                <span>Site seguro</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. CONCURSOS EM DESTAQUE */}
      {/* ========================================================================= */}
      <section id="concursos" className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-titulo text-2xl sm:text-3xl md:text-4xl font-bold text-azul-profundo mb-3">
              Encontre seu material por concurso
            </h2>
            <p className="text-slate-600 text-base md:text-lg">
              Materiais organizados para você encontrar exatamente o que precisa estudar.
            </p>
          </div>

          {/* Grid dos 5 concursos autorizados */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {concursosData.map((concurso) => (
              <ContestCard key={concurso.id} concurso={concurso} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/apostilas?categoria=concurso"
              className="inline-flex items-center gap-2 text-sm font-titulo font-semibold text-azul-profundo hover:text-azul-edital bg-white border border-slate-200 hover:border-slate-300 px-6 py-2.5 rounded-lg shadow-2xs transition-all"
            >
              <span>Ver todos os concursos e materiais</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. MATERIAIS EM DESTAQUE (Vitrine Comercial) */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-block text-xs font-semibold uppercase tracking-wider text-azul-edital mb-2">
                Catálogo Editorial
              </div>
              <h2 className="font-titulo text-2xl sm:text-3xl md:text-4xl font-bold text-azul-profundo">
                Materiais em destaque
              </h2>
            </div>
            <Link
              to="/apostilas"
              className="inline-flex items-center gap-1.5 text-sm font-titulo font-bold text-azul-edital hover:text-azul-profundo transition-colors"
            >
              <span>Ver catálogo completo</span>
              <span>→</span>
            </Link>
          </div>

          {/* Grid de Produtos em Destaque */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {materiaisDestaque.map((produto) => (
              <CardProduto key={produto.slug} produto={produto} />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. ESTUDE POR MATÉRIA (As 7 Disciplinas Oficiais com Capas 3D) */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-block text-xs font-semibold uppercase tracking-wider text-azul-edital mb-2">
              Disciplinas Individuais
            </div>
            <h2 className="font-titulo text-2xl sm:text-3xl md:text-4xl font-bold text-azul-profundo mb-3">
              Estude por matéria
            </h2>
            <p className="text-slate-600 text-base md:text-lg">
              Materiais individuais com teoria completa e exercícios focados por disciplina.
            </p>
          </div>

          {/* Grid das 7 disciplinas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {materiasData.map((materia) => (
              <SubjectCard key={materia.id} materia={materia} />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. CADERNOS DE QUESTÕES (Vitrine Comercial Específica) */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amarelo-edital/20 text-azul-profundo text-xs font-bold font-titulo uppercase mb-3">
                <span>Linha Prática & Treinamento</span>
              </div>
              <h2 className="font-titulo text-2xl sm:text-3xl md:text-4xl font-bold text-azul-profundo mb-3">
                Treine com Cadernos de Questões
              </h2>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                Materiais focados na prática intensiva, resolução de questões de bancas reais e revisão estratégica para consolidar seu aprendizado.
              </p>
            </div>
            <Link
              to="/apostilas?tipo=questoes"
              className="inline-flex items-center justify-center gap-2 bg-azul-profundo hover:bg-azul-edital text-white font-titulo font-semibold text-sm px-6 py-3 rounded-lg transition-colors whitespace-nowrap"
            >
              <span>Ver todos os Cadernos de Questões</span>
              <span>→</span>
            </Link>
          </div>

          {/* Grid de Cadernos de Questões */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {cadernosQuestoes.map((produto) => (
              <CardProduto key={produto.slug} produto={produto} />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. POR QUE ESCOLHER A EDITAL CONCURSOS (3 Pilares Objetivos) */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-20 bg-azul-profundo text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="inline-block text-xs font-semibold uppercase tracking-wider text-amarelo-edital mb-2">
              Diferenciais da Editora
            </div>
            <h2 className="font-titulo text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
              Por que escolher a Editora Edital Concursos?
            </h2>
            <p className="text-slate-300 text-base md:text-lg">
              Material desenvolvido por quem entende a estrutura das provas de concursos públicos.
            </p>
          </div>

          {/* Os 3 Pilares Objetivos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Pilar 1 */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center transition-all duration-200 hover:border-amarelo-edital/50 hover:bg-white/10">
              <div className="w-14 h-14 mx-auto mb-5 rounded-lg bg-amarelo-edital/10 border border-amarelo-edital/30 flex items-center justify-center text-amarelo-edital text-2xl font-bold">
                📖
              </div>
              <h3 className="font-titulo font-bold text-xl text-white mb-3">
                Conteúdo organizado
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Materiais estruturados para facilitar a sequência e organização dos estudos.
              </p>
            </div>

            {/* Pilar 2 */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center transition-all duration-200 hover:border-amarelo-edital/50 hover:bg-white/10">
              <div className="w-14 h-14 mx-auto mb-5 rounded-lg bg-amarelo-edital/10 border border-amarelo-edital/30 flex items-center justify-center text-amarelo-edital text-2xl font-bold">
                ⚡
              </div>
              <h3 className="font-titulo font-bold text-xl text-white mb-3">
                Materiais digitais
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Acesso aos conteúdos em formato digital para estudar em qualquer dispositivo ou imprimir.
              </p>
            </div>

            {/* Pilar 3 */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center transition-all duration-200 hover:border-amarelo-edital/50 hover:bg-white/10">
              <div className="w-14 h-14 mx-auto mb-5 rounded-lg bg-amarelo-edital/10 border border-amarelo-edital/30 flex items-center justify-center text-amarelo-edital text-2xl font-bold">
                🎯
              </div>
              <h3 className="font-titulo font-bold text-xl text-white mb-3">
                Foco em concursos públicos
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Materiais desenvolvidos especificamente para a preparação direcionada a concursos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. COMO FUNCIONA (3 Etapas Sequenciais) */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-titulo text-2xl sm:text-3xl font-bold text-azul-profundo mb-3">
              Como funciona
            </h2>
            <p className="text-slate-600 text-base">
              Acesso simples e direto aos seus materiais de estudo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Etapa 1 */}
            <div className="bg-white border border-slate-200/80 rounded-xl p-6 text-center shadow-xs">
              <div className="w-10 h-10 mx-auto mb-4 rounded-full bg-azul-profundo text-white font-titulo font-bold text-base flex items-center justify-center">
                1
              </div>
              <h3 className="font-titulo font-bold text-lg text-azul-profundo mb-2">
                Escolha seu material
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Encontre sua apostila por concurso ou matéria.
              </p>
            </div>

            {/* Etapa 2 */}
            <div className="bg-white border border-slate-200/80 rounded-xl p-6 text-center shadow-xs">
              <div className="w-10 h-10 mx-auto mb-4 rounded-full bg-azul-profundo text-white font-titulo font-bold text-base flex items-center justify-center">
                2
              </div>
              <h3 className="font-titulo font-bold text-lg text-azul-profundo mb-2">
                Faça sua compra
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Finalize o pedido pelo ambiente de compra indicado.
              </p>
            </div>

            {/* Etapa 3 */}
            <div className="bg-white border border-slate-200/80 rounded-xl p-6 text-center shadow-xs">
              <div className="w-10 h-10 mx-auto mb-4 rounded-full bg-amarelo-edital text-azul-profundo font-titulo font-bold text-base flex items-center justify-center">
                3
              </div>
              <h3 className="font-titulo font-bold text-lg text-azul-profundo mb-2">
                Comece a estudar
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Receba acesso ao material digital e inicie seus estudos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. CTA FINAL */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-20 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-titulo text-2xl sm:text-3xl md:text-4xl font-bold text-azul-profundo mb-4">
            Seu próximo concurso começa com uma boa preparação.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Encontre o material ideal para organizar seus estudos e avance para a próxima etapa.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/apostilas"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amarelo-edital hover:bg-amarelo-edital/90 text-azul-profundo font-titulo font-bold text-base px-8 py-3.5 rounded-lg shadow-sm transition-all text-center"
            >
              <span>Ver todos os materiais</span>
              <span>→</span>
            </Link>
            <Link
              to="/apostilas?categoria=concurso"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-azul-profundo hover:bg-azul-edital text-white font-titulo font-semibold text-base px-8 py-3.5 rounded-lg transition-all text-center"
            >
              Buscar por concurso
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. ATENDIMENTO POR WHATSAPP (Preservado da Fase 1) */}
      {/* ========================================================================= */}
      <section className="py-12 bg-azul-profundo text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="font-titulo font-bold text-2xl text-white mb-2">
                Precisa de ajuda para escolher seu material?
              </h3>
              <p className="text-slate-300 text-sm">
                Fale com a nossa equipe pelo WhatsApp e tire todas as suas dúvidas.
              </p>
            </div>
            
            <a 
              href="https://wa.me/5541988420201?text=Olá,%20gostaria%20de%20tirar%20dúvidas%20sobre%20as%20apostilas%20da%20Edital%20Concursos."
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center gap-3
                bg-[#25D366] hover:bg-[#20bd5a] text-white
                font-titulo font-bold text-base
                px-8 py-4 rounded-lg
                transition-all duration-200
                shadow-sm hover:shadow-md
                whitespace-nowrap flex-shrink-0
              "
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>Falar pelo WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
