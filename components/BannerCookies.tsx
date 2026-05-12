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
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-[100] bg-azul-profundo text-branco rounded-xl shadow-2xl border border-dourado/30 p-5">
      <h3 className="font-titulo font-bold text-base mb-2">
        🍪 Este site usa cookies
      </h3>
      <p className="text-sm text-cinza-claro mb-4 leading-relaxed">
        Utilizamos cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa{' '}
        <Link to="/privacidade" className="text-dourado underline hover:text-branco transition">
          Política de Privacidade
        </Link>.
      </p>
      <button
        onClick={aceitar}
        className="w-full bg-dourado text-azul-profundo font-titulo font-bold py-2.5 px-4 rounded-full hover:bg-opacity-90 transition"
      >
        Entendi
      </button>
    </div>
  );
}
