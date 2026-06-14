import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, MessageCircle, Mail } from 'lucide-react';

export default function LPFooter() {
  return (
    <footer className="bg-azul-profundo border-t border-branco/10 text-cinza-claro text-sm">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <div className="font-titulo font-bold text-branco mb-1">
              Editora Edital Concursos
            </div>
            <div className="text-xs">
              Editora Edital Concursos · CNPJ: 65.395.470/0001-47
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 justify-center">
            <a 
              href="https://instagram.com/editoraeditalconcursos"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-dourado transition flex items-center gap-1.5"
              aria-label="Instagram"
            >
              <Instagram size={16} />
              <span>Instagram</span>
            </a>
            <a 
              href="https://wa.me/5541988420201?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Editora%20Edital%20Concursos%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20as%20apostilas."
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-dourado transition flex items-center gap-1.5"
              aria-label="WhatsApp"
            >
              <MessageCircle size={16} />
              <span>WhatsApp</span>
            </a>
            <a 
              href="mailto:editoraeditalconcursos@gmail.com"
              className="hover:text-dourado transition flex items-center gap-1.5"
              aria-label="Email"
            >
              <Mail size={16} />
              <span>Email</span>
            </a>
            <Link to="/termos" className="hover:text-dourado transition">
              Termos
            </Link>
            <Link to="/privacidade" className="hover:text-dourado transition">
              Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
