import React, { useState, useMemo, Suspense, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Search, X, SlidersHorizontal, ArrowUpDown, RotateCcw } from 'lucide-react';
import CardProduto from '@/components/produto/CardProduto';
import SidebarFiltros, { OPCOES_CONCURSOS, OPCOES_MATERIAS, OPCOES_TIPOS } from '@/components/produto/SidebarFiltros';
import DrawerFiltrosMobile from '@/components/produto/DrawerFiltrosMobile';
import SEO from '@/components/SEO';
import { 
  produtos, 
  Concurso, 
  Materia, 
  labelsConcursos, 
  labelsMaterias 
} from '@/data/produtos';

type Ordenacao = 'relevancia' | 'az' | 'za';

// Normalização para busca sem acentos
function normalizarTexto(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

// Mapeamento de aliases de URL para chaves canônicas
function normalizarConcursoSlug(slug: string | null): string {
  if (!slug) return '';
  const s = slug.toLowerCase().trim();
  if (s === 'banco-do-brasil' || s === 'bancodobrasil') return 'bb';
  if (s === 'atamf' || s === 'ata_mf') return 'ata-mf';
  return s;
}

function normalizarMateriaSlug(slug: string | null): string {
  if (!slug) return '';
  const s = slug.toLowerCase().trim();
  if (s === 'lingua-portuguesa' || s === 'lingua_portuguesa') return 'portugues';
  if (s === 'matematica-basica' || s === 'matematica_basica') return 'matematica';
  if (s === 'direito-constitucional' || s === 'direito_constitucional') return 'constitucional';
  if (s === 'direito-administrativo' || s === 'direito_administrativo') return 'administrativo';
  if (s === 'informatica-basica' || s === 'informatica_basica') return 'informatica';
  if (s === 'rlm') return 'raciocinio-logico';
  if (s === 'administracao-publica' || s === 'administracao_publica') return 'adm-publica';
  return s;
}

function ApostilasContent() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Lê filtros da URL
  const rawConcurso = searchParams.get('concurso');
  const rawMateria = searchParams.get('materia');
  const rawTipo = searchParams.get('tipo');
  const rawBusca = searchParams.get('busca') || searchParams.get('q') || '';
  const rawOrdem = (searchParams.get('ordem') || 'relevancia') as Ordenacao;

  // Filtros normalizados
  const concursoAtivo = normalizarConcursoSlug(rawConcurso);
  const materiaAtiva = normalizarMateriaSlug(rawMateria);
  const tipoAtivo = rawTipo || '';
  const termoBusca = rawBusca;
  const ordenacao = rawOrdem;

  // Estado local para o input de busca (permite digitação fluida)
  const [inputBusca, setInputBusca] = useState(termoBusca);

  // Sincroniza input com termo da URL
  useEffect(() => {
    setInputBusca(termoBusca);
  }, [termoBusca]);

  // Estado do drawer mobile
  const [drawerAberto, setDrawerAberto] = useState(false);

  // Funções de manipulação de parâmetros
  const setParametroUrl = (chave: string, valor: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!valor || valor.trim() === '') {
      params.delete(chave);
      if (chave === 'busca') params.delete('q');
    } else {
      params.set(chave, valor.trim());
      if (chave === 'busca') params.delete('q');
    }
    navigate(`/apostilas?${params.toString()}`);
  };

  const handleSelectConcurso = (concurso: string) => {
    setParametroUrl('concurso', concurso);
  };

  const handleSelectMateria = (materia: string) => {
    setParametroUrl('materia', materia);
  };

  const handleSelectTipo = (tipo: string) => {
    setParametroUrl('tipo', tipo);
  };

  const handleSelectOrdem = (novaOrdem: Ordenacao) => {
    const params = new URLSearchParams(searchParams.toString());
    if (novaOrdem === 'relevancia') {
      params.delete('ordem');
    } else {
      params.set('ordem', novaOrdem);
    }
    navigate(`/apostilas?${params.toString()}`);
  };

  const handleBuscaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setParametroUrl('busca', inputBusca);
  };

  const handleLimparBusca = () => {
    setInputBusca('');
    setParametroUrl('busca', '');
  };

  const handleLimparFiltros = () => {
    setInputBusca('');
    navigate('/apostilas');
  };

  // Filtragem e Ordenação
  const produtosFiltrados = useMemo(() => {
    // Apenas produtos ativos (22 produtos oficiais: 17 individuais + 5 combos)
    let resultado = produtos.filter((p) => p.ativo);

    // 1. Filtro por Concurso
    if (concursoAtivo) {
      resultado = resultado.filter((p) => p.concurso === concursoAtivo);
    }

    // 2. Filtro por Matéria
    if (materiaAtiva) {
      resultado = resultado.filter((p) => p.materia === materiaAtiva);
    }

    // 3. Filtro por Tipo de Produto
    if (tipoAtivo) {
      if (tipoAtivo === 'teorico') {
        resultado = resultado.filter((p) => p.tipo === 'teorico' && p.categoria === 'concurso');
      } else if (tipoAtivo === 'questoes') {
        resultado = resultado.filter((p) => p.tipo === 'questoes');
      } else if (tipoAtivo === 'combo') {
        resultado = resultado.filter((p) => p.tipo === 'combo');
      } else if (tipoAtivo === 'materia') {
        resultado = resultado.filter((p) => p.categoria === 'materia');
      }
    }

    // 4. Busca Textual Interna
    if (termoBusca.trim()) {
      const q = normalizarTexto(termoBusca);
      resultado = resultado.filter((p) => {
        const tituloNorm = normalizarTexto(p.titulo);
        const descNorm = normalizarTexto(p.descricaoCurta || '');
        const concursoNorm = p.concurso ? normalizarTexto(labelsConcursos[p.concurso as Concurso] || p.concurso) : '';
        const materiaNorm = p.materia ? normalizarTexto(labelsMaterias[p.materia as Materia] || p.materia) : '';
        const tipoNorm = normalizarTexto(
          p.tipo === 'teorico' 
            ? 'teorico material teorico' 
            : p.tipo === 'questoes' 
            ? 'questoes caderno de questoes' 
            : p.tipo === 'combo'
            ? 'combo pacote promocional apostila teorica caderno de questoes'
            : 'materia disciplina'
        );
        const topicosNorm = (p.topicosCobertos || []).map(t => normalizarTexto(t)).join(' ');

        return (
          tituloNorm.includes(q) ||
          descNorm.includes(q) ||
          concursoNorm.includes(q) ||
          materiaNorm.includes(q) ||
          tipoNorm.includes(q) ||
          topicosNorm.includes(q)
        );
      });
    }

    // 5. Ordenação
    if (ordenacao === 'az') {
      resultado = [...resultado].sort((a, b) => a.titulo.localeCompare(b.titulo));
    } else if (ordenacao === 'za') {
      resultado = [...resultado].sort((a, b) => b.titulo.localeCompare(a.titulo));
    }

    return resultado;
  }, [concursoAtivo, materiaAtiva, tipoAtivo, termoBusca, ordenacao]);

  // Contagem de filtros ativos
  const totalFiltrosAtivos = 
    (concursoAtivo ? 1 : 0) +
    (materiaAtiva ? 1 : 0) +
    (tipoAtivo ? 1 : 0) +
    (termoBusca ? 1 : 0);

  // Label amigável do tipo ativo para os chips
  const labelTipoAtivo = useMemo(() => {
    if (tipoAtivo === 'teorico') return 'Material Teórico';
    if (tipoAtivo === 'questoes') return 'Caderno de Questões';
    if (tipoAtivo === 'combo') return 'Combo Teórico + Questões';
    if (tipoAtivo === 'materia') return 'Material por Matéria';
    return '';
  }, [tipoAtivo]);

  // Texto dinâmico de contagem
  const textoContagem = useMemo(() => {
    const total = produtosFiltrados.length;
    if (total === 0) return 'Nenhum material encontrado';
    if (total === 1) return '1 material encontrado';
    return `${total} materiais encontrados`;
  }, [produtosFiltrados.length]);

  return (
    <main className="min-h-screen bg-slate-50">
      <SEO 
        title="Apostilas para Concursos" 
        description="Filtre por concurso, matéria ou tipo de material e encontre rapidamente o conteúdo ideal para seus estudos em concursos públicos."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* ========================================================================= */}
        {/* BREADCRUMB */}
        {/* ========================================================================= */}
        <nav className="text-xs sm:text-sm text-slate-500 mb-6 flex items-center gap-2">
          <Link to="/" className="hover:text-azul-profundo transition-colors">
            Página inicial
          </Link>
          <span className="text-slate-400">/</span>
          <span className="text-azul-profundo font-semibold">
            Apostilas
          </span>
        </nav>

        {/* ========================================================================= */}
        {/* CABEÇALHO DO CATÁLOGO (Título, Subtítulo e Indicador Dinâmico) */}
        {/* ========================================================================= */}
        <div className="mb-8">
          <h1 className="font-titulo text-2xl sm:text-3xl md:text-4xl font-bold text-azul-profundo mb-2.5">
            Encontre o material certo para seus estudos
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-3xl leading-relaxed">
            Filtre por concurso, matéria ou tipo de material e encontre rapidamente o conteúdo que você procura.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* BARRA DE PESQUISA INTERNA E CONTROLES (Busca, Filtros Mobile, Ordenação) */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-xs mb-6">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Campo de Pesquisa Interna */}
            <form onSubmit={handleBuscaSubmit} className="relative flex-1">
              <div className="relative">
                <input 
                  type="search"
                  value={inputBusca}
                  onChange={(e) => setInputBusca(e.target.value)}
                  placeholder="Buscar por concurso, matéria ou material..." 
                  className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-900 h-11 pl-11 pr-10 rounded-lg text-sm border border-slate-200 focus:border-azul-edital focus:ring-1 focus:ring-azul-edital focus:outline-none transition-all placeholder:text-slate-400"
                />
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <Search size={18} />
                </div>
                {inputBusca && (
                  <button
                    type="button"
                    onClick={handleLimparBusca}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors"
                    title="Limpar busca"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </form>

            {/* Ações: Botão Filtros Mobile + Seletor de Ordenação */}
            <div className="flex items-center gap-3">
              {/* Botão Mobile para Abrir Drawer */}
              <button
                onClick={() => setDrawerAberto(true)}
                className="lg:hidden flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-azul-profundo text-white font-titulo font-semibold text-sm px-4 py-2.5 rounded-lg hover:bg-azul-edital transition-colors active:scale-98 shadow-xs"
              >
                <SlidersHorizontal size={16} />
                <span>Filtros</span>
                {totalFiltrosAtivos > 0 && (
                  <span className="bg-amarelo-edital text-azul-profundo text-xs font-bold px-1.5 py-0.2 rounded-full">
                    {totalFiltrosAtivos}
                  </span>
                )}
              </button>

              {/* Seletor de Ordenação */}
              <div className="relative flex-1 sm:flex-initial min-w-[170px]">
                <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700">
                  <ArrowUpDown size={15} className="text-slate-400 flex-shrink-0" />
                  <select
                    value={ordenacao}
                    onChange={(e) => handleSelectOrdem(e.target.value as Ordenacao)}
                    className="bg-transparent text-xs sm:text-sm font-medium text-slate-800 focus:outline-none cursor-pointer w-full"
                    aria-label="Ordenar produtos"
                  >
                    <option value="relevancia">Relevância</option>
                    <option value="az">Nome: A–Z</option>
                    <option value="za">Nome: Z–A</option>
                  </select>
                </div>
              </div>
            </div>

          </div>

          {/* Linha de Status de Resultados e Chips de Filtros Ativos */}
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
            
            {/* Contagem Dinâmica */}
            <div className="text-slate-600 font-medium">
              <span className="font-bold text-azul-profundo">{textoContagem}</span>
              {totalFiltrosAtivos > 0 && (
                <span className="text-slate-400 ml-1">com os filtros atuais</span>
              )}
            </div>

            {/* Chips de Filtros Ativos */}
            {totalFiltrosAtivos > 0 && (
              <div className="flex flex-wrap items-center gap-1.5">
                {termoBusca && (
                  <span className="inline-flex items-center gap-1 bg-azul-profundo/5 text-azul-profundo border border-azul-profundo/15 px-2.5 py-1 rounded-md text-xs font-medium">
                    <span>Busca: &ldquo;{termoBusca}&rdquo;</span>
                    <button 
                      onClick={handleLimparBusca}
                      className="hover:text-vermelho-promo ml-0.5"
                      title="Remover busca"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}

                {tipoAtivo && (
                  <span className="inline-flex items-center gap-1 bg-azul-profundo/5 text-azul-profundo border border-azul-profundo/15 px-2.5 py-1 rounded-md text-xs font-medium">
                    <span>Tipo: {labelTipoAtivo}</span>
                    <button 
                      onClick={() => handleSelectTipo('')}
                      className="hover:text-vermelho-promo ml-0.5"
                      title="Remover filtro de tipo"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}

                {concursoAtivo && (
                  <span className="inline-flex items-center gap-1 bg-azul-profundo/5 text-azul-profundo border border-azul-profundo/15 px-2.5 py-1 rounded-md text-xs font-medium">
                    <span>Concurso: {labelsConcursos[concursoAtivo as Concurso] || concursoAtivo.toUpperCase()}</span>
                    <button 
                      onClick={() => handleSelectConcurso('')}
                      className="hover:text-vermelho-promo ml-0.5"
                      title="Remover filtro de concurso"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}

                {materiaAtiva && (
                  <span className="inline-flex items-center gap-1 bg-azul-profundo/5 text-azul-profundo border border-azul-profundo/15 px-2.5 py-1 rounded-md text-xs font-medium">
                    <span>Matéria: {labelsMaterias[materiaAtiva as Materia] || materiaAtiva}</span>
                    <button 
                      onClick={() => handleSelectMateria('')}
                      className="hover:text-vermelho-promo ml-0.5"
                      title="Remover filtro de matéria"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}

                {/* Botão Limpar Filtros */}
                <button
                  onClick={handleLimparFiltros}
                  className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-azul-profundo font-semibold underline ml-1 cursor-pointer"
                >
                  <RotateCcw size={11} />
                  <span>Limpar filtros</span>
                </button>
              </div>
            )}

          </div>
        </div>

        {/* ========================================================================= */}
        {/* LAYOUT PRINCIPAL (Sidebar Desktop + Grid de Produtos) */}
        {/* ========================================================================= */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* SIDEBAR DE FILTROS (Desktop) */}
          <aside className="hidden lg:block w-72 flex-shrink-0 sticky top-24">
            <SidebarFiltros
              concursoAtivo={concursoAtivo}
              materiaAtiva={materiaAtiva}
              tipoAtivo={tipoAtivo}
              onSelectConcurso={handleSelectConcurso}
              onSelectMateria={handleSelectMateria}
              onSelectTipo={handleSelectTipo}
              onLimparFiltros={handleLimparFiltros}
              totalFiltrosAtivos={totalFiltrosAtivos}
            />
          </aside>

          {/* GRID DE PRODUTOS OU ESTADO VAZIO */}
          <div className="flex-1 w-full">
            {produtosFiltrados.length === 0 ? (
              /* Estado Vazio Elegante */
              <div className="bg-white rounded-xl border border-slate-200/80 p-10 sm:p-14 text-center shadow-xs">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <Search size={28} />
                </div>
                <h3 className="font-titulo text-lg sm:text-xl font-bold text-azul-profundo mb-2">
                  Nenhum material encontrado com esses filtros.
                </h3>
                <p className="text-slate-500 text-sm max-w-md mx-auto mb-6 leading-relaxed">
                  Tente remover algum filtro ou fazer uma nova busca para encontrar o material que procura.
                </p>
                <button
                  onClick={handleLimparFiltros}
                  className="inline-flex items-center gap-2 bg-azul-profundo hover:bg-azul-edital text-white font-titulo font-semibold text-sm px-6 py-3 rounded-lg transition-colors shadow-xs"
                >
                  <RotateCcw size={15} />
                  <span>Limpar filtros</span>
                </button>
              </div>
            ) : (
              /* Grid de Produtos */
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {produtosFiltrados.map((produto) => (
                  <CardProduto key={produto.slug} produto={produto} />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* DRAWER MOBILE */}
      {/* ========================================================================= */}
      <DrawerFiltrosMobile
        aberto={drawerAberto}
        onClose={() => setDrawerAberto(false)}
        concursoAtivo={concursoAtivo}
        materiaAtiva={materiaAtiva}
        tipoAtivo={tipoAtivo}
        onSelectConcurso={handleSelectConcurso}
        onSelectMateria={handleSelectMateria}
        onSelectTipo={handleSelectTipo}
        onLimparFiltros={handleLimparFiltros}
        totalFiltrosAtivos={totalFiltrosAtivos}
      />
    </main>
  );
}

export default function ApostilasPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
        <div className="text-azul-profundo font-titulo font-semibold animate-pulse">
          Carregando catálogo de apostilas...
        </div>
      </div>
    }>
      <ApostilasContent />
    </Suspense>
  );
}
