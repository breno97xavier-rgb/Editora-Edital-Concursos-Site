import React from 'react';
import { Star } from 'lucide-react';

interface Depoimento {
  nome: string;
  texto: string;
  foto?: string;
}

interface LPDepoimentosProps {
  depoimentos: Depoimento[];
  concursoSigla: string;
}

const LPDepoimentos: React.FC<LPDepoimentosProps> = ({ depoimentos, concursoSigla }) => {
  if (!depoimentos || depoimentos.length === 0) return null;

  return (
    <section className="py-16 bg-cinza-claro">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-titulo text-3xl md:text-4xl font-bold text-azul-profundo text-center mb-4">
          Quem estuda conosco recomenda
        </h2>
        <p className="text-cinza-medio text-center text-lg mb-12">
          Veja o que os futuros aprovados no {concursoSigla} estão dizendo sobre nosso material.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {depoimentos.map((depo, i) => (
            <div 
              key={i} 
              className="bg-branco p-6 rounded-xl shadow-sm border border-cinza-claro hover:shadow-md transition duration-300 flex flex-col"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-cinza-medio/20 flex-shrink-0">
                  {depo.foto ? (
                    <img 
                      src={depo.foto} 
                      alt={depo.nome} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-azul-profundo font-bold bg-dourado/20">
                      {depo.nome.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-azul-profundo leading-tight">{depo.nome}</h3>
                  <div className="flex gap-0.5 mt-1">
                    {[...Array(5)].map((_, index) => (
                      <Star key={index} size={14} className="fill-dourado text-dourado" />
                    ))}
                  </div>
                </div>
              </div>
              
              <p className="text-cinza-escuro italic leading-relaxed flex-grow">
                "{depo.texto}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LPDepoimentos;
