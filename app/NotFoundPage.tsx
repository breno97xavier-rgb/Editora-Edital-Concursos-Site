import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <main className="min-h-[70vh] bg-cinza-claro flex items-center justify-center px-6 py-20">
      <div className="text-center max-w-lg">
        <div className="font-titulo text-9xl font-bold text-azul-profundo mb-4 leading-none">
          404
        </div>
        <h1 className="font-titulo text-3xl md:text-4xl font-bold text-cinza-escuro mb-4">
          Página não encontrada
        </h1>
        <p className="text-cinza-medio text-lg mb-10">
          A página que você procura pode ter sido movida, removida ou nunca existiu.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="bg-azul-profundo text-branco font-titulo font-bold px-8 py-3 rounded-full hover:bg-opacity-90 transition"
          >
            Voltar à página inicial
          </Link>
          <Link 
            href="/apostilas"
            className="bg-transparent border-2 border-azul-profundo text-azul-profundo font-titulo font-bold px-8 py-3 rounded-full hover:bg-azul-profundo hover:text-branco transition"
          >
            Ver apostilas
          </Link>
        </div>
      </div>
    </main>
  );
}
