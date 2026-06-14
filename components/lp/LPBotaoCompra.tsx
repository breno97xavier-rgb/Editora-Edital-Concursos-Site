import React from 'react';

interface LPBotaoCompraProps {
  link: string;
  texto: string;
  variante?: 'grande' | 'medio';
}

export default function LPBotaoCompra({ link, texto, variante = 'grande' }: LPBotaoCompraProps) {
  const handleClick = () => {
    // META PIXEL - DESCOMENTAR QUANDO O PIXEL ESTIVER CONFIGURADO
    // if (typeof window !== 'undefined' && (window as any).fbq) {
    //   (window as any).fbq('track', 'InitiateCheckout');
    // }
    if (link.startsWith('#')) {
      const element = document.getElementById(link.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  const tamanhos = {
    grande: 'text-lg md:text-xl px-10 md:px-12 py-5 md:py-6',
    medio: 'text-base md:text-lg px-8 py-4',
  };

  return (
    <button
      onClick={handleClick}
      className={`
        bg-dourado text-azul-profundo
        font-titulo font-bold
        ${tamanhos[variante]}
        rounded-full
        hover:bg-opacity-90 hover:scale-[1.02]
        transition-all duration-200
        shadow-lg hover:shadow-xl
        inline-flex items-center gap-3
      `}
    >
      {texto}
      <span className="text-2xl">→</span>
    </button>
  );
}
