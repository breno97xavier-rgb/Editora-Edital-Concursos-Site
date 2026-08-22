import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function BannerCookies() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const aceitou = localStorage.getItem('cookies-aceitos');
    if (!aceitou) {
      // Pequeno delay para não atrapalhar a primeira impressão
      setTimeout(() => setVisivel(true), 1500);
    }
  }, []);

  const aceitar = () => {
    localStorage.setItem('cookies-aceitos', 'true');
    setVisivel(false);
  };

  if (!visivel) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-[100] bg-azul-profundo text-white rounded-xl shadow-2xl border border-white/15 p-5">
      <h3 className="font-titulo font-bold text-sm text-amarelo-edital mb-2">
        Privacidade e Cookies
      </h3>
      <p className="text-xs text-slate-300 mb-4 leading-relaxed">
        Utilizamos cookies e tecnologias semelhantes para melhorar sua experiência de navegação. Ao continuar, você concorda com nossa{' '}
        <Link to="/privacidade" className="text-amarelo-edital underline hover:text-white transition-colors">
          Política de Privacidade
        </Link>.
      </p>
      <button
        onClick={aceitar}
        className="w-full btn-primario py-2.5 text-xs uppercase tracking-wider"
      >
        Entendi e concordo
      </button>
    </div>
  );
}
