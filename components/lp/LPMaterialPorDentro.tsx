import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, X, FileText, Sparkles } from 'lucide-react';

interface LPMaterialPorDentroProps {
  paginas: string[];
  concursoSigla: string;
}

const LPMaterialPorDentro: React.FC<LPMaterialPorDentroProps> = ({ paginas, concursoSigla }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!paginas || paginas.length === 0) return null;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? paginas.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === paginas.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index);
  };

  const pageNames = [
    'Página de Introdução & Dicas',
    'Conteúdo Teórico Avançado',
    'Esquemas e Mnemônicos Fáceis',
    'Questões Comentadas Passo a Passo'
  ];

  return (
    <section className="py-16 bg-cinza-claro border-t border-b border-cinza-claro/50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Título da Seção */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 bg-dourado/15 text-azul-profundo font-semibold font-titulo text-xs px-3 py-1.5 rounded-full mb-3 uppercase tracking-wider">
            <Sparkles size={12} className="text-dourado fill-dourado" /> Espie por dentro do material
          </div>
          <h2 className="font-titulo text-3xl md:text-4xl font-bold text-azul-profundo mb-4">
            Como é o Nosso Material por Dentro?
          </h2>
          <p className="text-cinza-medio text-lg max-w-2xl mx-auto">
            Design limpo, conteúdo totalmente focado e altíssima resolução. Clique nas páginas abaixo para ampliar e ver a qualidade didática de perto.
          </p>
        </div>

        {/* Layout de Exibição */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Menu lateral de abas (thumbnails) nos Desktops / Carrossel em celulares */}
          <div className="col-span-1 lg:col-span-4 order-2 lg:order-1">
            <h3 className="hidden lg:block font-titulo font-bold text-azul-profundo mb-4 text-sm uppercase tracking-wider text-left">
              Capítulos em destaque:
            </h3>
            <div className="flex flex-row overflow-x-auto gap-3 pb-3 lg:pb-0 lg:flex-col lg:overflow-visible no-scrollbar">
              {paginas.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition duration-200 flex-shrink-0 lg:flex-shrink
                    ${
                      activeIndex === index
                        ? 'bg-azul-profundo text-branco border-azul-profundo shadow-md scale-102 font-bold'
                        : 'bg-branco text-cinza-escuro border-cinza-claro hover:border-dourado/40 hover:bg-cinza-claro/50'
                    }
                  `}
                  id={`preview-tab-${index}`}
                >
                  <FileText
                    size={16}
                    className={activeIndex === index ? 'text-dourado' : 'text-cinza-medio'}
                  />
                  <div className="text-xs md:text-sm">
                    <div className={activeIndex === index ? 'text-dourado' : 'text-cinza-medio'}>
                      Página {index + 1} de {paginas.length}
                    </div>
                    <div className="font-titulo truncate max-w-[200px] lg:max-w-none">
                      {pageNames[index] || 'Demonstração de Conteúdo'}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Visualizador Principal central do material */}
          <div className="col-span-1 lg:col-span-8 order-1 lg:order-2 flex flex-col items-center">
            <div className="relative w-full max-w-lg bg-branco rounded-2xl shadow-xl border border-cinza-claro p-2 md:p-4 group">
              {/* Botões de Direção (Esquerda / Direita) no Visualizador */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-branco hover:bg-azul-profundo text-azul-profundo hover:text-branco shadow-md border border-cinza-claro flex items-center justify-center transition duration-200"
                aria-label="Página anterior"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-branco hover:bg-azul-profundo text-azul-profundo hover:text-branco shadow-md border border-cinza-claro flex items-center justify-center transition duration-200"
                aria-label="Próxima página"
              >
                <ChevronRight size={20} />
              </button>

              {/* Imagem em Destaque */}
              <div 
                onClick={() => setLightboxOpen(true)}
                className="relative overflow-hidden rounded-xl cursor-zoom-in bg-cinza-claro aspect-[3/4] flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all duration-300"
              >
                <img
                  src={paginas[activeIndex]}
                  alt={`${pageNames[activeIndex] || 'Página do material'} - Preview`}
                  className="w-full h-full object-contain transition duration-500 group-hover:scale-102"
                  referrerPolicy="no-referrer"
                />

                {/* Overlays / Badges */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 flex items-center justify-center transition duration-300">
                  <div className="bg-azul-profundo/90 text-branco px-4 py-2 rounded-full font-titulo text-sm font-bold flex items-center gap-1.5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-300 shadow-md">
                    <ZoomIn size={14} className="text-dourado animate-pulse" /> Clique para ampliar
                  </div>
                </div>

                <div className="absolute top-3 right-3 bg-azul-profundo text-branco px-3 py-1 rounded-full text-xs font-bold shadow-sm font-titulo">
                  {activeIndex + 1} / {paginas.length}
                </div>
              </div>
            </div>

            {/* Nome da aba abaixo da visualização */}
            <div className="mt-4 text-center">
              <span className="text-xs text-cinza-medio uppercase tracking-wider block mb-1">Visualizando agora:</span>
              <p className="font-titulo font-bold text-azul-profundo text-base md:text-lg">
                {pageNames[activeIndex] || 'Página de Demonstração'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal em tela cheia */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex flex-col justify-between p-4 md:p-6 select-none"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Header do Lightbox */}
          <div className="flex items-center justify-between text-branco w-full max-w-7xl mx-auto pt-2" onClick={(e) => e.stopPropagation()}>
            <div>
              <p className="text-xs md:text-sm text-cinza-claro font-titulo uppercase tracking-wider">Apostila {concursoSigla}</p>
              <h4 className="font-titulo font-bold text-base md:text-lg text-dourado">
                {pageNames[activeIndex] || 'Página do Material'}
              </h4>
            </div>
            <button
              onClick={() => setLightboxOpen(false)}
              className="w-10 h-10 rounded-full bg-branco/10 hover:bg-branco/20 text-branco flex items-center justify-center transition duration-200"
              aria-label="Fechar"
            >
              <X size={24} />
            </button>
          </div>

          {/* Central — Imagem em alta resolução */}
          <div className="flex-grow flex items-center justify-center my-4 relative max-w-5xl mx-auto w-full h-[70vh]" onClick={(e) => e.stopPropagation()}>
            {/* Navegadores para Desktop no lightbox */}
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-2 md:-left-16 z-20 w-12 h-12 rounded-full bg-branco/10 hover:bg-branco/20 text-branco hover:scale-105 flex items-center justify-center transition duration-200"
              aria-label="Anterior"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-2 md:-right-16 z-20 w-12 h-12 rounded-full bg-branco/10 hover:bg-branco/20 text-branco hover:scale-105 flex items-center justify-center transition duration-200"
              aria-label="Próximo"
            >
              <ChevronRight size={28} />
            </button>

            <img
              src={paginas[activeIndex]}
              alt={`${pageNames[activeIndex] || 'Página do material'} - Ampliada`}
              className="max-h-[80vh] max-w-[90vw] md:max-w-full rounded-lg object-contain border border-branco/10 shadow-2xl animate-fade-in"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Footer do Lightbox */}
          <div className="text-center pb-2 text-cinza-claro text-xs md:text-sm" onClick={(e) => e.stopPropagation()}>
            <p>Use as setas para navegar • Página {activeIndex + 1} de {paginas.length}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default LPMaterialPorDentro;
