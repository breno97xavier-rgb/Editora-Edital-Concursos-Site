import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ErrorPage() {
  useEffect(() => {
    // Aqui você poderia logar em um serviço externo
  }, []);

  return (
    <main className="min-h-[70vh] bg-cinza-claro flex items-center justify-center px-6 py-20">
      <div className="text-center max-w-lg">
        <div className="text-6xl mb-6">⚠️</div>
        <h1 className="font-titulo text-3xl md:text-4xl font-bold text-cinza-escuro mb-4">
          Algo deu errado
        </h1>
        <p className="text-cinza-medio text-lg mb-10">
          Encontramos um problema técnico. Tente novamente ou volte mais tarde.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="bg-azul-profundo text-branco font-titulo font-bold px-8 py-3 rounded-full hover:bg-opacity-90 transition"
          >
            Tentar novamente
          </button>
          <Link 
            to="/"
            className="bg-transparent border-2 border-azul-profundo text-azul-profundo font-titulo font-bold px-8 py-3 rounded-full hover:bg-azul-profundo hover:text-branco transition"
          >
            Voltar à página inicial
          </Link>
        </div>
      </div>
    </main>
  );
}
