import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BookOpen, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Produto, getProductSamplePages } from '@/data/produtos';

interface ProductSampleSectionProps {
  produto: Produto;
}

export default function ProductSampleSection({ produto }: ProductSampleSectionProps) {
  const samplePages = getProductSamplePages(produto);

  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const triggerButtonRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  // Se o produto não possuir páginas de amostra, não renderiza absolutamente nada
  if (!samplePages || samplePages.length === 0) {
    return null;
  }

  const totalPages = samplePages.length;
  const firstPageUrl = samplePages[0];

  const handleOpen = () => {
    setCurrentIndex(0);
    setIsViewerOpen(true);
  };

  const handleClose = useCallback(() => {
    setIsViewerOpen(false);
    // Devolve o foco ao botão que abriu a amostra
    setTimeout(() => {
      triggerButtonRef.current?.focus();
    }, 50);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  }, [totalPages]);

  // Controle de scroll do body quando o modal estiver aberto
  useEffect(() => {
    if (isViewerOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      // Foco no botão de fechar ao abrir
      closeButtonRef.current?.focus();

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isViewerOpen]);

  // Navegação por teclado (ArrowLeft, ArrowRight, Escape)
  useEffect(() => {
    if (!isViewerOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isViewerOpen, handleClose, handleNext, handlePrev]);

  // Pré-carregamento discreto das páginas adjacentes para navegação suave
  useEffect(() => {
    if (!isViewerOpen || totalPages <= 1) return;

    const nextIdx = (currentIndex + 1) % totalPages;
    const prevIdx = (currentIndex - 1 + totalPages) % totalPages;

    const nextImg = new Image();
    nextImg.src = samplePages[nextIdx];

    const prevImg = new Image();
    prevImg.src = samplePages[prevIdx];
  }, [isViewerOpen, currentIndex, samplePages, totalPages]);

  // Gestos de Swipe no mobile
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    // Distância mínima de 50px para disparar a troca de página
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }

    setTouchStartX(null);
  };

  return (
    <>
      <section
        aria-labelledby="titulo-amostra-material"
        className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 lg:p-10 shadow-xs my-10"
      >
        {/* Cabeçalho da Seção */}
        <div className="pb-4 border-b border-slate-100 mb-6 sm:mb-8">
          <div className="flex items-center gap-2.5 mb-2">
            <BookOpen className="text-azul-profundo flex-shrink-0" size={24} />
            <h2
              id="titulo-amostra-material"
              className="font-titulo font-bold text-xl sm:text-2xl lg:text-3xl text-azul-profundo"
            >
              Veja o material por dentro
            </h2>
          </div>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Confira algumas páginas e conheça a organização, o conteúdo e a qualidade do material antes da compra.
          </p>
        </div>

        {/* Card Único Representativo da Amostra */}
        <div className="flex flex-col items-center justify-center py-2 sm:py-4">
          <button
            ref={triggerButtonRef}
            type="button"
            onClick={handleOpen}
            aria-haspopup="dialog"
            aria-label={`Visualizar amostra do material ${produto.titulo}`}
            className="group relative flex flex-col items-center focus:outline-none focus-visible:ring-4 focus-visible:ring-azul-profundo/30 rounded-2xl cursor-pointer transition-transform duration-200 hover:-translate-y-1 active:scale-[0.99]"
          >
            {/* Efeito de folhas empilhadas atrás (comunica que há mais páginas) */}
            <div
              aria-hidden="true"
              className="absolute inset-0 max-w-[280px] sm:max-w-[320px] aspect-[1/1.414] mx-auto bg-slate-200/70 rounded-xl rotate-2 translate-x-1.5 translate-y-1.5 transition-transform duration-200 group-hover:rotate-3 group-hover:translate-x-2.5 group-hover:translate-y-2 border border-slate-300/60"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 max-w-[280px] sm:max-w-[320px] aspect-[1/1.414] mx-auto bg-slate-100/90 rounded-xl -rotate-1 -translate-x-1 -translate-y-0.5 transition-transform duration-200 group-hover:-rotate-2 group-hover:-translate-x-1.5 border border-slate-200/80"
            />

            {/* Página Principal da Frente */}
            <div className="relative z-10 w-full max-w-[280px] sm:max-w-[320px] aspect-[1/1.414] bg-white rounded-xl overflow-hidden border border-slate-300 shadow-md group-hover:shadow-xl transition-shadow duration-200">
              <img
                src={firstPageUrl}
                alt={`Capa da amostra do material ${produto.titulo}`}
                loading="lazy"
                className="w-full h-full object-contain select-none"
              />

              {/* Overlay suave com botão de ação rápida */}
              <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/35 transition-colors duration-200 flex items-center justify-center p-4">
                <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-azul-profundo/95 text-white font-medium text-xs sm:text-sm shadow-lg group-hover:bg-azul-profundo group-hover:scale-105 transition-all duration-200 border border-white/20">
                  <Eye size={16} className="text-dourado-ouro" />
                  <span>Visualizar amostra</span>
                </div>
              </div>
            </div>
          </button>
        </div>
      </section>

      {/* Visualizador Modal / Lightbox */}
      {isViewerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Amostra do material ${produto.titulo}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleClose();
            }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-sm p-2 sm:p-4 md:p-6 select-none animate-in fade-in duration-200"
        >
          {/* Barra Superior de Controles */}
          <div className="absolute top-3 sm:top-5 inset-x-3 sm:inset-x-6 z-20 flex items-center justify-between pointer-events-none">
            {/* Contador discreto: 1 / 5 */}
            <div className="pointer-events-auto bg-slate-900/80 border border-slate-700/80 px-3.5 py-1.5 rounded-full text-slate-200 text-xs sm:text-sm font-medium tracking-wider font-mono shadow-md backdrop-blur-xs">
              {currentIndex + 1} / {totalPages}
            </div>

            {/* Botão Fechar */}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={handleClose}
              aria-label="Fechar amostra"
              className="pointer-events-auto inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 shadow-lg transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <X size={20} />
            </button>
          </div>

          {/* Seta Anterior (Navegação Circular) */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Página anterior"
            className="absolute left-2 sm:left-4 md:left-6 z-20 inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 shadow-xl transition-all hover:scale-105 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Área Central com a Imagem Ampliada */}
          <div
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className="relative z-10 flex items-center justify-center w-full h-full max-h-[82vh] sm:max-h-[86vh] px-8 sm:px-14 md:px-16"
          >
            <img
              key={samplePages[currentIndex]}
              src={samplePages[currentIndex]}
              alt={`Amostra ${produto.titulo}`}
              className="max-h-full max-w-full w-auto h-auto object-contain rounded-lg shadow-2xl select-none"
            />
          </div>

          {/* Seta Próxima (Navegação Circular) */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Próxima página"
            className="absolute right-2 sm:right-4 md:right-6 z-20 inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 shadow-xl transition-all hover:scale-105 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </>
  );
}
