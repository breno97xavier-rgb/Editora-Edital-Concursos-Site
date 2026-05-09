import React from 'react';

export default function LPHeader() {
  return (
    <header className="bg-azul-profundo border-b border-branco/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-center md:justify-start">
        {/* Logo */}
        <div className="font-titulo font-bold text-2xl">
          <span className="text-branco">EDITAL</span>
          <span className="text-dourado ml-2">CONCURSOS</span>
        </div>
      </div>
    </header>
  );
}
