import { Instagram, Youtube, Facebook, Mail, ShieldCheck, CheckCircle, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-azul-profundo text-branco font-corpo">
      {/* Faixa superior — Newsletter */}
      <div className="bg-dourado py-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="text-center lg:text-left">
            <h3 className="font-titulo font-bold text-azul-profundo text-2xl md:text-3xl">
              Receba os melhores conteúdos sobre concursos
            </h3>
            <p className="text-azul-profundo font-medium opacity-80 mt-2">
              Editais, dicas de estudo e descontos exclusivos no seu email.
            </p>
          </div>
          <form className="flex flex-col sm:flex-row gap-3 w-full lg:max-w-md">
            <input 
              type="email" 
              placeholder="Seu melhor e-mail" 
              className="flex-grow bg-white text-cinza-escuro px-6 py-3.5 rounded-full focus:outline-none"
              required
            />
            <button className="bg-azul-profundo text-white font-titulo font-bold px-8 py-3.5 rounded-full hover:bg-opacity-90 transition">
              Quero receber
            </button>
          </form>
        </div>
      </div>

      {/* Faixa principal */}
      <div className="max-w-7xl mx-auto py-16 px-4 md:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8">
        {/* Coluna 1 — Logo + descrição */}
        <div className="space-y-6">
          <div className="font-titulo font-bold text-2xl leading-tight">
            <span className="text-white">EDITAL</span> <span className="text-dourado">CONCURSOS</span>
          </div>
          <p className="text-cinza-claro opacity-70 text-sm leading-relaxed">
            Editora especializada em materiais de estudo para concursos públicos. Apostilas digitais com conteúdo atualizado e questões comentadas.
          </p>
          <div className="flex gap-4">
            <a href="https://instagram.com/editoraeditalconcursos" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-dourado hover:border-dourado hover:text-azul-profundo transition" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-dourado hover:border-dourado hover:text-azul-profundo transition" aria-label="YouTube">
              <Youtube size={20} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-dourado hover:border-dourado hover:text-azul-profundo transition" aria-label="Facebook">
              <Facebook size={20} />
            </a>
            <a href="mailto:editoraeditalconcursos@gmail.com" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-dourado hover:border-dourado hover:text-azul-profundo transition" aria-label="Email">
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* Coluna 2 — Materiais */}
        <div>
          <h4 className="font-titulo font-bold text-dourado tracking-widest text-sm mb-6 text-uppercase">MATERIAIS</h4>
          <ul className="space-y-4 text-sm text-cinza-claro opacity-80">
            <li><Link to="/apostilas" className="hover:text-dourado transition block">Apostilas</Link></li>
            <li><Link to="/apostilas" className="hover:text-dourado transition block">Por Matéria</Link></li>
            <li><Link to="/apostilas" className="hover:text-dourado transition block">Por Concurso</Link></li>
            <li><Link to="/apostilas?categoria=combo" className="hover:text-dourado transition block">Combos</Link></li>
            <li><Link to="/apostilas?categoria=gratis" className="hover:text-dourado transition block">Materiais Grátis</Link></li>
          </ul>
        </div>

        {/* Coluna 3 — Editora */}
        <div>
          <h4 className="font-titulo font-bold text-dourado tracking-widest text-sm mb-6 text-uppercase">EDITORA</h4>
          <ul className="space-y-4 text-sm text-cinza-claro opacity-80">
            <li><Link to="/sobre" className="hover:text-dourado transition">Sobre Nós</Link></li>
            <li><Link to="/contato" className="hover:text-dourado transition">Contato</Link></li>
          </ul>
        </div>
      </div>

      {/* Faixa de selos de confiança */}
      <div className="bg-[#1a2c42] py-6 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center items-center gap-6 md:gap-12 opacity-80 uppercase text-[10px] md:text-xs font-bold tracking-widest">
          <div className="flex items-center gap-2">
            <Lock size={16} className="text-dourado" />
            <span>Ambiente 100% seguro</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-verde-sucesso" />
            <span>Site verificado</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-dourado" />
            <span>LGPD Compilance</span>
          </div>
        </div>
      </div>

      {/* Faixa final — Copyright */}
      <div className="bg-azul-profundo py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-cinza-medio">
          <p className="text-center md:text-left">
            © 2026 Editora Edital Concursos. CNPJ: 65.395.470/0001-47
          </p>
          <div className="flex gap-4 md:gap-6 items-center">
            <Link to="/termos" className="hover:text-white transition">Termos de Uso</Link>
            <Link to="/privacidade" className="hover:text-white transition">Política de Privacidade</Link>
            <Link to="/privacidade" className="hover:text-white transition">LGPD</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
