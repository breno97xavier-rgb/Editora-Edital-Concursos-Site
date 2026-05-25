type TamanhoBookCover = 'pequeno' | 'medio' | 'grande';

interface BookCoverProps {
  capaUrl: string;
  titulo: string;
  tamanho?: TamanhoBookCover;
  className?: string;
  width?: string;
}

const tamanhos: Record<TamanhoBookCover, { largura: number }> = {
  pequeno: { largura: 160 },
  medio: { largura: 220 },
  grande: { largura: 320 },
};

export default function Book3D({ 
  capaUrl, 
  titulo, 
  tamanho = 'medio',
  className = '',
  width
}: BookCoverProps) {
  const { largura } = tamanhos[tamanho];

  return (
    <div 
      className={`book-cover-wrapper ${className}`}
      style={{ 
        width: width || `${largura}px`,
        display: 'inline-block',
      }}
    >
      <img
        src={capaUrl}
        alt={titulo}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
        }}
      />
    </div>
  );
}
