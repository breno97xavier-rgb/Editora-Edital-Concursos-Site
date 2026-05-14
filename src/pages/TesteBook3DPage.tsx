import React from 'react';
import Book3D from '../../components/produto/Book3D';

export default function TesteBook3DPage() {
  const apostilas = [
    { 
      capa: 'https://i.ibb.co/0RW9Qz3P/2.png', 
      titulo: 'Apostila INSS 2026 — Técnico do Seguro Social' 
    },
    { 
      capa: 'https://i.ibb.co/B24z6Cw2/1.png', 
      titulo: 'Apostila ATA-MF 2026 — Assistente Técnico Administrativo' 
    },
    { 
      capa: 'https://i.ibb.co/5hgHXyBj/4.png', 
      titulo: 'Apostila SEDES-DF 2026 — Técnico Administrativo' 
    },
    { 
      capa: 'https://i.ibb.co/WWCr1JrL/3.png', 
      titulo: 'Apostila PRF 2026 — Agente Administrativo' 
    },
  ];

  return (
    <main className="min-h-screen bg-cinza-claro py-16 px-6 pt-40 md:pt-48">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-titulo text-4xl font-bold text-azul-profundo mb-2 text-center">
          Teste — Componente Book3D
        </h1>
        <p className="text-cinza-medio text-center mb-16">
          Visualização do mockup 3D nos três tamanhos disponíveis
        </p>

        {/* Tamanho GRANDE */}
        <section className="mb-20">
          <h2 className="font-titulo text-2xl font-bold text-azul-profundo mb-8 border-b-2 border-dourado pb-2">
            Tamanho GRANDE (página de produto / hero)
          </h2>
          <div className="flex flex-wrap gap-12 justify-center items-end">
            {apostilas.map((a) => (
              <div key={a.capa} className="flex flex-col items-center">
                <Book3D 
                  capaUrl={a.capa} 
                  titulo={a.titulo} 
                  tamanho="grande" 
                />
                <p className="mt-8 text-sm text-cinza-medio max-w-[280px] text-center">
                  {a.titulo}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Tamanho MÉDIO */}
        <section className="mb-20">
          <h2 className="font-titulo text-2xl font-bold text-azul-profundo mb-8 border-b-2 border-dourado pb-2">
            Tamanho MÉDIO (cards de listagem / destaques)
          </h2>
          <div className="flex flex-wrap gap-10 justify-center items-end">
            {apostilas.map((a) => (
              <div key={a.capa} className="flex flex-col items-center">
                <Book3D 
                  capaUrl={a.capa} 
                  titulo={a.titulo} 
                  tamanho="medio" 
                />
                <p className="mt-6 text-sm text-cinza-medio max-w-[200px] text-center">
                  {a.titulo}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Tamanho PEQUENO */}
        <section className="mb-20">
          <h2 className="font-titulo text-2xl font-bold text-azul-profundo mb-8 border-b-2 border-dourado pb-2">
            Tamanho PEQUENO (carrossel de relacionados / busca)
          </h2>
          <div className="flex flex-wrap gap-8 justify-center items-end">
            {apostilas.map((a) => (
              <div key={a.capa} className="flex flex-col items-center">
                <Book3D 
                  capaUrl={a.capa} 
                  titulo={a.titulo} 
                  tamanho="pequeno" 
                />
                <p className="mt-4 text-xs text-cinza-medio max-w-[140px] text-center">
                  {a.titulo}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Demonstração de hover */}
        <section className="bg-branco rounded-lg p-12 text-center">
          <h2 className="font-titulo text-2xl font-bold text-azul-profundo mb-4">
            Passe o mouse sobre o livro abaixo
          </h2>
          <p className="text-cinza-medio mb-12">
            O livro deve subir levemente e a sombra ficar mais profunda.
          </p>
          <div className="flex justify-center">
            <Book3D 
              capaUrl="https://i.ibb.co/B24z6Cw2/1.png" 
              titulo="Apostila ATA-MF 2026" 
              tamanho="grande" 
            />
          </div>
        </section>
      </div>
    </main>
  );
}
