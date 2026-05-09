import { useState } from 'react';
import { Search, User, ChevronDown, Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full fixed top-0 z-50 shadow-md">
      {/* Linha 1 — Topbar fina */}
      <div className="bg-[#0a1420] text-branco text-[10px] md:text-xs h-8 flex items-center justify-between px-4 md:px-8 border-b border-azul-profundo/20 font-corpo">
        <div className="flex items-center gap-2">
          <span>✓ Material 100% digital. Liberação imediata após o pagamento.</span>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <a href="#" className="hover:text-dourado transition">Área do aluno</a>
          <span className="opacity-30">|</span>
          <a href="#" className="hover:text-dourado transition">Ajuda</a>
        </div>
      </div>

      {/* Linha 2 — Header principal */}
      <div className="bg-azul-profundo h-20 flex items-center px-4 md:px-8 gap-4 md:gap-8">
        {/* Esquerda: Logo */}
        <div className="flex-shrink-0">
          <a href="/" className="flex items-center">
            <img 
              src="/logo.png" 
              alt="Editora Edital Concursos" 
              className="h-10 md:h-14 object-contain"
              onError={(e) => {
                // Fallback de texto se a imagem não carregar
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  const fallback = document.createElement('div');
                  fallback.className = 'font-titulo font-bold text-xl md:text-2xl leading-tight';
                  fallback.innerHTML = '<span class="text-white">EDITAL</span> <span class="text-dourado">CONCURSOS</span>';
                  parent.appendChild(fallback);
                }
              }}
            />
          </a>
        </div>

        {/* Centro: Barra de busca */}
        <div className="flex-grow max-w-[600px] relative hidden md:block">
          <input 
            type="text" 
            placeholder="O que você está procurando?" 
            className="w-full bg-white text-cinza-escuro h-11 px-6 rounded-full focus:outline-none placeholder:text-cinza-medio font-corpo"
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-dourado hover:scale-110 transition-transform" aria-label="Buscar">
            <Search size={22} />
          </button>
        </div>

        {/* Direita: Ações */}
        <div className="flex items-center gap-3 md:gap-6 ml-auto">
          <a href="#" className="flex items-center gap-2 text-branco hover:text-dourado transition font-corpo group">
            <User size={24} className="group-hover:scale-110 transition-transform" />
            <span className="hidden xl:block text-sm font-medium">Entrar</span>
          </a>

          {/* Mobile Hamburger */}
          <button 
            className="md:hidden text-white ml-2" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Linha 3 — Menu de navegação */}
      <nav className="hidden md:block bg-azul-profundo border-t border-azul-profundo/30 border-b-2 border-dourado h-12">
        <ul className="flex items-center justify-center gap-8 h-full text-branco font-titulo font-semibold text-sm uppercase tracking-wide">
          <li className="h-full">
            <a href="#" className="flex items-center gap-1.5 h-full hover:text-dourado transition border-b-2 border-transparent hover:border-dourado px-2 group">
              Apostilas <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
            </a>
          </li>
          <li><a href="#" className="hover:text-dourado transition">Combos</a></li>
          <li><a href="#" className="hover:text-dourado transition">Materiais Grátis</a></li>
          <li><a href="#" className="hover:text-dourado transition">Sobre</a></li>
          <li><a href="#" className="hover:text-dourado transition">Contato</a></li>
        </ul>
      </nav>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[112px] bg-azul-profundo z-40 transition-all duration-300">
          <div className="p-6 flex flex-col gap-6 text-branco font-titulo font-semibold text-lg uppercase">
            <div className="relative">
              <input 
                type="text" 
                placeholder="O que você está procurando?" 
                className="w-full bg-white text-cinza-escuro h-11 px-6 rounded-full focus:outline-none placeholder:text-cinza-medio font-corpo text-base normal-case"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-dourado" size={20} />
            </div>
            <a href="#" className="flex items-center justify-between border-b border-white/10 pb-2">Apostilas <ChevronDown size={20} /></a>
            <a href="#" className="border-b border-white/10 pb-2">Combos</a>
            <a href="#" className="border-b border-white/10 pb-2">Materiais Grátis</a>
            <a href="#" className="border-b border-white/10 pb-2">Sobre</a>
            <a href="#" className="border-b border-white/10 pb-2">Contato</a>
            
            <div className="flex items-center gap-4 mt-auto pt-10 text-xs font-corpo normal-case text-cinza-claro">
               <a href="#">Área do Aluno</a> | <a href="#">Ajuda</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
