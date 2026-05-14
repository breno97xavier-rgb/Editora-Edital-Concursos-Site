import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundProduto() {
  return (
    <main className="min-h-[60vh] bg-cinza-claro flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="font-titulo text-6xl font-bold text-azul-profundo mb-4">404</h1>
        <h2 className="font-titulo text-2xl font-bold text-cinza-escuro mb-4">
          Apostila não encontrada
        </h2>
        <p className="text-cinza-medio mb-8">
          O material que você procura pode ter sido removido ou ainda não está disponível.
        </p>
        <Link 
          to="/apostilas"
          className="inline-block bg-azul-profundo text-branco font-titulo font-bold px-8 py-3 rounded-full hover:bg-opacity-90 transition"
        >
          Ver todas as apostilas
        </Link>
      </div>
    </main>
  );
}
