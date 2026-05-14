import React, { useState, useMemo, Suspense } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import CardProduto from '@/components/produto/CardProduto';
import SidebarFiltros from '@/components/produto/SidebarFiltros';
import DrawerFiltrosMobile from '@/components/produto/DrawerFiltrosMobile';
import SEO from '@/components/SEO';
import { 
  produtos, 
  Categoria, 
  Materia, 
  Concurso,
} from '@/data/produtos';

type FaixaPreco = 'ate-50' | '50-100' | 'acima-100';
type Ordenacao = 'recentes' | 'menor-preco' | 'maior-preco' | 'alfabetica';

function ApostilasContent() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Lê filtros da URL
  const tiposFiltro = searchParams.get('tipo')?.split(',') || [];
  const categoriasFiltro = (searchParams.get('categoria')?.split(',') || []) as Categoria[];
  const materiasFiltro = (searchParams.get('materia')?.split(',') || []) as Materia[];
  const concursosFiltro = (searchParams.get('concurso')?.split(',') || []) as Concurso[];
  const faixasPrecoFiltro = (searchParams.get('preco')?.split(',') || []) as FaixaPreco[];
  const ordenacao = (searchParams.get('ordem') || 'recentes') as Ordenacao;

  // Função para atualizar filtros na URL
  const atualizarFiltro = (chave: string, valor: string, ativar: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    const atuais = params.get(chave)?.split(',') || [];
    
    let novos: string[];
    if (ativar) {
      novos = [...atuais, valor];
    } else {
      novos = atuais.filter(v => v !== valor);
    }

    if (novos.length === 0) {
      params.delete(chave);
    } else {
      params.set(chave, novos.join(','));
    }

    navigate(`/apostilas?${params.toString()}`);
  };

  // Função para mudar ordenação
  const mudarOrdenacao = (nova: Ordenacao) => {
    const params = new URLSearchParams(searchParams.toString());
    if (nova === 'recentes') {
      params.delete('ordem');
    } else {
      params.set('ordem', nova);
    }
    navigate(`/apostilas?${params.toString()}`);
  };

  // Limpar todos os filtros
  const limparFiltros = () => {
    navigate('/apostilas');
  };

  // Aplicar filtros
  const produtosFiltrados = useMemo(() => {
    let resultado = produtos.filter(p => p.ativo);

    if (tiposFiltro.length > 0 && tiposFiltro[0] !== ('' as any)) {
      resultado = resultado.filter(p => tiposFiltro.includes(p.tipo));
    }
    if (categoriasFiltro.length > 0 && categoriasFiltro[0] !== ('' as any)) {
      resultado = resultado.filter(p => categoriasFiltro.includes(p.categoria));
    }
    if (materiasFiltro.length > 0 && materiasFiltro[0] !== ('' as any)) {
      resultado = resultado.filter(p => p.materia && materiasFiltro.includes(p.materia));
    }
    if (concursosFiltro.length > 0 && concursosFiltro[0] !== ('' as any)) {
      resultado = resultado.filter(p => p.concurso && concursosFiltro.includes(p.concurso));
    }
    if (faixasPrecoFiltro.length > 0 && faixasPrecoFiltro[0] !== ('' as any)) {
      resultado = resultado.filter(p => {
        return faixasPrecoFiltro.some(faixa => {
          if (faixa === 'ate-50') return p.preco <= 50;
          if (faixa === '50-100') return p.preco > 50 && p.preco <= 100;
          if (faixa === 'acima-100') return p.preco > 100;
          return false;
        });
      });
    }

    // Ordenação
    if (ordenacao === 'menor-preco') {
      resultado = [...resultado].sort((a, b) => a.preco - b.preco);
    } else if (ordenacao === 'maior-preco') {
      resultado = [...resultado].sort((a, b) => b.preco - a.preco);
    } else if (ordenacao === 'alfabetica') {
      resultado = [...resultado].sort((a, b) => a.titulo.localeCompare(b.titulo));
    }

    return resultado;
  }, [tiposFiltro, categoriasFiltro, materiasFiltro, concursosFiltro, faixasPrecoFiltro, ordenacao]);

  const totalFiltrosAtivos = 
    (tiposFiltro.length > 0 && tiposFiltro[0] !== ('' as any) ? tiposFiltro.length : 0) + 
    (categoriasFiltro.length > 0 && categoriasFiltro[0] !== ('' as any) ? categoriasFiltro.length : 0) + 
    (materiasFiltro.length > 0 && materiasFiltro[0] !== ('' as any) ? materiasFiltro.length : 0) + 
    (concursosFiltro.length > 0 && concursosFiltro[0] !== ('' as any) ? concursosFiltro.length : 0) + 
    (faixasPrecoFiltro.length > 0 && faixasPrecoFiltro[0] !== ('' as any) ? faixasPrecoFiltro.length : 0);

  // Estado do drawer mobile
  const [drawerAberto, setDrawerAberto] = useState(false);

  return (
    <main className="min-h-screen bg-cinza-claro">
      <SEO 
        title="Catálogo de Apostilas" 
        description="Navegue por nosso catálogo completo de apostilas para concursos públicos federais e estaduais."
      />
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-cinza-medio mb-6">
          <Link to="/" className="hover:text-azul-profundo">Página inicial</Link>
          <span className="mx-2">/</span>
          <span className="text-cinza-escuro font-medium">Apostilas</span>
        </nav>

        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-titulo text-4xl font-bold text-azul-profundo">
              Apostilas
            </h1>
            <p className="text-cinza-medio mt-2">
              {produtosFiltrados.length} {produtosFiltrados.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
            </p>
          </div>

          {/* Botão filtros mobile + Ordenação */}
          <div className="flex gap-3">
            <button
              onClick={() => setDrawerAberto(true)}
              className="lg:hidden bg-azul-profundo text-branco font-titulo font-bold px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-azul-claro transition active:scale-95"
            >
              <span className="text-lg leading-none">≡</span> Filtros {totalFiltrosAtivos > 0 && `(${totalFiltrosAtivos})`}
            </button>

            <select
              value={ordenacao}
              onChange={(e) => mudarOrdenacao(e.target.value as Ordenacao)}
              className="bg-branco border border-cinza-claro rounded-lg px-4 py-2 font-corpo text-cinza-escuro focus:outline-none focus:border-dourado cursor-pointer"
            >
              <option value="recentes">Mais recentes</option>
              <option value="menor-preco">Menor preço</option>
              <option value="maior-preco">Maior preço</option>
              <option value="alfabetica">A-Z</option>
            </select>
          </div>
        </div>

        {/* Layout 2 colunas */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* SIDEBAR DE FILTROS — Desktop */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <SidebarFiltros 
              tiposFiltro={tiposFiltro}
              categoriasFiltro={categoriasFiltro}
              materiasFiltro={materiasFiltro}
              concursosFiltro={concursosFiltro}
              faixasPrecoFiltro={faixasPrecoFiltro}
              atualizarFiltro={atualizarFiltro}
              limparFiltros={limparFiltros}
              totalFiltrosAtivos={totalFiltrosAtivos}
            />
          </aside>

          {/* GRID DE PRODUTOS */}
          <div className="flex-grow">
            {produtosFiltrados.length === 0 ? (
              <div className="bg-branco rounded-lg p-12 text-center border border-cinza-claro shadow-sm">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="font-titulo text-xl font-bold text-cinza-escuro mb-2">
                  Nenhum produto encontrado
                </h3>
                <p className="text-cinza-medio mb-6">
                  Tente ajustar ou limpar os filtros para ver mais opções.
                </p>
                <button
                  onClick={limparFiltros}
                  className="bg-azul-profundo text-branco font-titulo font-bold px-6 py-3 rounded-lg hover:bg-opacity-90 transition active:scale-95"
                >
                  Limpar filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {produtosFiltrados.map((produto) => (
                  <CardProduto key={produto.slug} produto={produto} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* DRAWER MOBILE */}
      <DrawerFiltrosMobile
        aberto={drawerAberto}
        onClose={() => setDrawerAberto(false)}
        tiposFiltro={tiposFiltro}
        categoriasFiltro={categoriasFiltro}
        materiasFiltro={materiasFiltro}
        concursosFiltro={concursosFiltro}
        faixasPrecoFiltro={faixasPrecoFiltro}
        atualizarFiltro={atualizarFiltro}
        limparFiltros={limparFiltros}
        totalFiltrosAtivos={totalFiltrosAtivos}
      />
    </main>
  );
}

// Wrapper com Suspense (em React Router v6+ este componente não precisaria de suspense para searchParams, mas mantemos para consistência de UI se necessário)
export default function ApostilasPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cinza-claro flex items-center justify-center">Carregando catálogo...</div>}>
      <ApostilasContent />
    </Suspense>
  );
}
