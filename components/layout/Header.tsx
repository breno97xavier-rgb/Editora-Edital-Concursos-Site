import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Menu, X } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const LOGO_DARK_HEADER = 'https://ycagvwsvccgdjzpbhrfi.supabase.co/storage/v1/object/public/Editora/1.png';

const CONCURSOS_INICIAIS = [
  { slug: 'prf', nome: 'PRF — Polícia Rodoviária Federal' },
  { slug: 'inss', nome: 'INSS — Instituto Nacional do Seguro Social' },
  { slug: 'bacen', nome: 'BACEN — Banco Central do Brasil' },
  { slug: 'bb', nome: 'Banco do Brasil' },
  { slug: 'ata-mf', nome: 'ATA-MF — Ministério da Fazenda' },
];

const MATERIAS_LISTA = [
  { slug: 'portugues', nome: 'Língua Portuguesa' },
  { slug: 'raciocinio-logico', nome: 'Raciocínio Lógico' },
  { slug: 'informatica', nome: 'Informática Básica' },
  { slug: 'constitucional', nome: 'Direito Constitucional' },
  { slug: 'administrativo', nome: 'Direito Administrativo' },
  { slug: 'adm-publica', nome: 'Administração Pública' },
  { slug: 'matematica', nome: 'Matemática Básica' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownAberto, setDropdownAberto] = useState<'concurso' | 'materia' | null>(null);
  const [termoBusca, setTermoBusca] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Fecha dropdowns ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownAberto(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fecha menus ao mudar de rota
  useEffect(() => {
    setIsMenuOpen(false);
    setDropdownAberto(null);
  }, [location.pathname, location.search]);

  const handleBusca = (e: React.FormEvent) => {
    e.preventDefault();
    if (termoBusca.trim()) {
      navigate(`/apostilas?busca=${encodeURIComponent(termoBusca.trim())}`);
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-azul-profundo border-b border-white/10 shadow-sm font-corpo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 md:h-[84px] flex items-center justify-between gap-3 md:gap-4 lg:gap-6">
        {/* Logo à esquerda — presença institucional destacada */}
        <div className="flex items-center flex-shrink-0">
          <Link to="/" className="flex items-center py-1 group" aria-label="Edital Concursos - Início">
            <img 
              src={LOGO_DARK_HEADER} 
              alt="Edital Concursos" 
              className="w-[155px] sm:w-[180px] md:w-[210px] lg:w-[225px] h-auto object-contain transition-opacity duration-200 group-hover:opacity-95"
              loading="eager"
            />
          </Link>
        </div>

        {/* Busca central (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-xs lg:max-w-md mx-2 lg:mx-4">
          <form onSubmit={handleBusca} className="w-full relative">
            <input 
              type="search"
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              placeholder="Qual material você procura?" 
              className="w-full bg-white/10 hover:bg-white/15 focus:bg-white text-white focus:text-cinza-escuro h-10 pl-4 pr-10 rounded-lg text-sm border border-white/20 focus:border-amarelo-edital focus:outline-none placeholder:text-slate-300 focus:placeholder:text-cinza-medio transition-all"
            />
            <button 
              type="submit" 
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-amarelo-edital transition-colors p-1" 
              aria-label="Pesquisar"
            >
              <Search size={18} />
            </button>
          </form>
        </div>

        {/* Navegação Desktop à direita */}
        <nav ref={dropdownRef} className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-titulo font-semibold tracking-wide text-white">
          <Link 
            to="/apostilas" 
            className="hover:text-amarelo-edital transition-colors py-2"
          >
            Apostilas
          </Link>

          {/* Menu Por Concurso */}
          <div className="relative">
            <button
              onClick={() => setDropdownAberto(dropdownAberto === 'concurso' ? null : 'concurso')}
              className={`flex items-center gap-1.5 py-2 hover:text-amarelo-edital transition-colors cursor-pointer ${
                dropdownAberto === 'concurso' ? 'text-amarelo-edital' : ''
              }`}
            >
              <span>Por Concurso</span>
              <ChevronDown 
                size={14} 
                className={`transition-transform duration-200 ${dropdownAberto === 'concurso' ? 'rotate-180' : ''}`} 
              />
            </button>

            {dropdownAberto === 'concurso' && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-azul-profundo border border-white/15 rounded-lg shadow-xl py-2 z-50 backdrop-blur-md">
                <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-white/10">
                  Principais Concursos
                </div>
                {CONCURSOS_INICIAIS.map((c) => (
                  <Link
                    key={c.slug}
                    to={`/apostilas?concurso=${c.slug}`}
                    className="block px-4 py-2 text-xs font-corpo text-slate-200 hover:text-azul-profundo hover:bg-amarelo-edital transition-colors"
                  >
                    {c.nome}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Menu Por Matéria */}
          <div className="relative">
            <button
              onClick={() => setDropdownAberto(dropdownAberto === 'materia' ? null : 'materia')}
              className={`flex items-center gap-1.5 py-2 hover:text-amarelo-edital transition-colors cursor-pointer ${
                dropdownAberto === 'materia' ? 'text-amarelo-edital' : ''
              }`}
            >
              <span>Por Matéria</span>
              <ChevronDown 
                size={14} 
                className={`transition-transform duration-200 ${dropdownAberto === 'materia' ? 'rotate-180' : ''}`} 
              />
            </button>

            {dropdownAberto === 'materia' && (
              <div className="absolute top-full left-0 mt-1 w-60 bg-azul-profundo border border-white/15 rounded-lg shadow-xl py-2 z-50 backdrop-blur-md">
                <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-white/10">
                  Disciplinas
                </div>
                {MATERIAS_LISTA.map((m) => (
                  <Link
                    key={m.slug}
                    to={`/apostilas?materia=${m.slug}`}
                    className="block px-4 py-2 text-xs font-corpo text-slate-200 hover:text-azul-profundo hover:bg-amarelo-edital transition-colors"
                  >
                    {m.nome}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link 
            to="/apostilas?tipo=questoes" 
            className="hover:text-amarelo-edital transition-colors py-2"
          >
            Cadernos de Questões
          </Link>

          <Link 
            to="/sobre" 
            className="hover:text-amarelo-edital transition-colors py-2 text-slate-300 hover:text-white"
          >
            Sobre
          </Link>

          <Link 
            to="/contato" 
            className="hover:text-amarelo-edital transition-colors py-2 text-slate-300 hover:text-white"
          >
            Contato
          </Link>
        </nav>

        {/* Botão Mobile Hamburger */}
        <div className="flex items-center lg:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white hover:text-amarelo-edital p-2 rounded-lg focus:outline-none transition-colors"
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Menu Mobile Drawer */}
      {isMenuOpen && (
        <div className="lg:hidden bg-azul-profundo border-t border-white/10 shadow-2xl animate-fadeIn">
          <div className="max-w-7xl mx-auto px-4 py-6 space-y-5">
            {/* Busca Mobile */}
            <form onSubmit={handleBusca} className="relative">
              <input 
                type="search"
                value={termoBusca}
                onChange={(e) => setTermoBusca(e.target.value)}
                placeholder="Qual material você procura?" 
                className="w-full bg-white/10 focus:bg-white text-white focus:text-cinza-escuro h-11 pl-4 pr-10 rounded-lg text-sm border border-white/20 focus:border-amarelo-edital focus:outline-none placeholder:text-slate-300 focus:placeholder:text-cinza-medio"
              />
              <button 
                type="submit" 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-amarelo-edital"
                aria-label="Pesquisar"
              >
                <Search size={20} />
              </button>
            </form>

            {/* Links Mobile */}
            <nav className="flex flex-col space-y-1 pt-2 font-titulo font-semibold text-sm text-white">
              <Link 
                to="/apostilas" 
                className="py-3 px-3 rounded-lg hover:bg-white/5 hover:text-amarelo-edital transition-colors"
              >
                Apostilas
              </Link>

              {/* Seção Concursos */}
              <div className="py-2 px-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Por Concurso
                </span>
                <div className="grid grid-cols-1 gap-1 pl-2 font-corpo font-normal text-sm">
                  {CONCURSOS_INICIAIS.map((c) => (
                    <Link
                      key={c.slug}
                      to={`/apostilas?concurso=${c.slug}`}
                      className="py-1.5 text-slate-200 hover:text-amarelo-edital transition-colors"
                    >
                      {c.nome}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Seção Matérias */}
              <div className="py-2 px-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Por Matéria
                </span>
                <div className="grid grid-cols-2 gap-1 pl-2 font-corpo font-normal text-sm">
                  {MATERIAS_LISTA.map((m) => (
                    <Link
                      key={m.slug}
                      to={`/apostilas?materia=${m.slug}`}
                      className="py-1.5 text-slate-200 hover:text-amarelo-edital transition-colors"
                    >
                      {m.nome}
                    </Link>
                  ))}
                </div>
              </div>

              <Link 
                to="/apostilas?tipo=questoes" 
                className="py-3 px-3 rounded-lg hover:bg-white/5 hover:text-amarelo-edital transition-colors"
              >
                Cadernos de Questões
              </Link>

              <div className="border-t border-white/10 pt-2 flex flex-col space-y-1">
                <Link 
                  to="/sobre" 
                  className="py-2.5 px-3 rounded-lg hover:bg-white/5 text-slate-300 hover:text-white transition-colors"
                >
                  Sobre a Editora
                </Link>
                <Link 
                  to="/contato" 
                  className="py-2.5 px-3 rounded-lg hover:bg-white/5 text-slate-300 hover:text-white transition-colors"
                >
                  Contato & Suporte
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

