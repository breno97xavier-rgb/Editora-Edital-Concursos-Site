import React from 'react';
import { Instagram, Mail, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig, getWhatsAppLink } from '@/data/siteConfig';

const LOGO_DARK_FOOTER = 'https://ycagvwsvccgdjzpbhrfi.supabase.co/storage/v1/object/public/Editora/1.png';

export default function Footer() {
  const whatsappUrl = getWhatsAppLink('Olá! Vim pelo site da Editora Edital Concursos e gostaria de tirar uma dúvida.');

  return (
    <footer className="bg-azul-profundo text-white font-corpo border-t border-white/10">
      {/* Grade Principal */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
        
        {/* Coluna 1 — Institucional & Logo */}
        <div className="space-y-4 sm:col-span-2 lg:col-span-1">
          <Link to="/" className="inline-block" aria-label="Edital Concursos">
            <img 
              src={LOGO_DARK_FOOTER} 
              alt={siteConfig.nome} 
              className="w-[160px] sm:w-[175px] md:w-[190px] h-auto object-contain"
            />
          </Link>
          <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
            Editora digital especializada em materiais de estudo para concursos públicos.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a 
              href="https://instagram.com/editoraeditalconcursos" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-9 h-9 rounded-lg border border-white/15 flex items-center justify-center text-slate-300 hover:text-azul-profundo hover:bg-amarelo-edital hover:border-amarelo-edital transition-colors" 
              aria-label="Instagram"
            >
              <Instagram size={17} />
            </a>
            <a 
              href={`mailto:${siteConfig.email}`} 
              className="w-9 h-9 rounded-lg border border-white/15 flex items-center justify-center text-slate-300 hover:text-azul-profundo hover:bg-amarelo-edital hover:border-amarelo-edital transition-colors" 
              aria-label="Email"
            >
              <Mail size={17} />
            </a>
            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-9 h-9 rounded-lg border border-white/15 flex items-center justify-center text-slate-300 hover:text-azul-profundo hover:bg-amarelo-edital hover:border-amarelo-edital transition-colors" 
              aria-label="WhatsApp"
            >
              <MessageSquare size={17} />
            </a>
          </div>
        </div>

        {/* Coluna 2 — Materiais */}
        <div>
          <h4 className="font-titulo font-bold text-amarelo-edital text-xs tracking-wider uppercase mb-4">
            Materiais
          </h4>
          <ul className="space-y-2.5 text-sm text-slate-300 font-normal">
            <li>
              <Link to="/apostilas" className="hover:text-amarelo-edital transition-colors">
                Catálogo Completo
              </Link>
            </li>
            <li>
              <Link to="/apostilas?tipo=teorico" className="hover:text-amarelo-edital transition-colors">
                Materiais Teóricos
              </Link>
            </li>
            <li>
              <Link to="/apostilas?tipo=questoes" className="hover:text-amarelo-edital transition-colors">
                Cadernos de Questões
              </Link>
            </li>
            <li>
              <Link to="/apostilas?tipo=combo" className="hover:text-amarelo-edital transition-colors">
                Combos
              </Link>
            </li>
          </ul>
        </div>

        {/* Coluna 3 — Editora */}
        <div>
          <h4 className="font-titulo font-bold text-amarelo-edital text-xs tracking-wider uppercase mb-4">
            Editora
          </h4>
          <ul className="space-y-2.5 text-sm text-slate-300 font-normal">
            <li>
              <Link to="/sobre" className="hover:text-amarelo-edital transition-colors">
                Sobre a Editora
              </Link>
            </li>
            <li>
              <Link to="/contato" className="hover:text-amarelo-edital transition-colors">
                Contato & Suporte
              </Link>
            </li>
          </ul>
        </div>

        {/* Coluna 4 — Atendimento */}
        <div>
          <h4 className="font-titulo font-bold text-amarelo-edital text-xs tracking-wider uppercase mb-4">
            Atendimento
          </h4>
          <ul className="space-y-3 text-sm text-slate-300">
            <li>
              <span className="block text-xs text-slate-400">WhatsApp:</span>
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-medium hover:text-amarelo-edital transition-colors"
              >
                {siteConfig.whatsapp.numeroFormatado}
              </a>
            </li>
            <li>
              <span className="block text-xs text-slate-400">E-mail:</span>
              <a 
                href={`mailto:${siteConfig.email}`}
                className="text-white font-medium hover:text-amarelo-edital transition-colors break-all"
              >
                {siteConfig.email}
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Faixa Inferior — Direitos & Legal */}
      <div className="border-t border-white/10 py-6 px-4 sm:px-6 lg:px-8 bg-[#05142B]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="text-center md:text-left">
            © {siteConfig.anoVigente} {siteConfig.nome}. CNPJ: {siteConfig.cnpj}. Todos os direitos reservados.
          </p>
          <div className="flex flex-wrap justify-center gap-6 items-center">
            <Link to="/termos" className="hover:text-white transition-colors">Termos de Uso</Link>
            <Link to="/privacidade" className="hover:text-white transition-colors">Política de Privacidade</Link>
            <Link to="/privacidade" className="hover:text-white transition-colors">LGPD</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
