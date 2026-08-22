import React from 'react';
import { Link } from 'react-router-dom';
import { BookX, ArrowLeft } from 'lucide-react';
import SEO from '@/components/SEO';

export default function NotFoundProduto() {
  return (
    <main className="min-h-[70vh] bg-slate-50 flex items-center justify-center px-4 sm:px-6 py-16">
      <SEO 
        title="Material não encontrado — Editora Edital Concursos" 
        description="O material que você está procurando não foi encontrado ou não está mais disponível no catálogo."
      />
      <div className="bg-white rounded-2xl border border-slate-200/80 p-8 sm:p-12 text-center max-w-md w-full shadow-xs">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-azul-profundo mx-auto mb-5">
          <BookX size={32} />
        </div>
        <h1 className="font-titulo text-2xl sm:text-3xl font-bold text-azul-profundo mb-3">
          Material não encontrado
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed mb-8">
          O material que você procura não está disponível ou foi redirecionado. Você pode explorar todo o nosso catálogo de materiais e cadernos de questões.
        </p>
        <Link 
          to="/apostilas"
          className="inline-flex items-center justify-center gap-2 bg-azul-profundo hover:bg-azul-edital text-white font-titulo font-semibold text-sm px-6 py-3.5 rounded-xl transition-colors shadow-xs w-full"
        >
          <ArrowLeft size={16} />
          <span>Ver todos os materiais</span>
        </Link>
      </div>
    </main>
  );
}

