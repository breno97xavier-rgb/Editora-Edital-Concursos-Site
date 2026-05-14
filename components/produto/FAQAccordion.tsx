import { useState } from 'react';
import { FAQ } from '@/data/produtos';

interface FAQAccordionProps {
  faqs: FAQ[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [aberto, setAberto] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div 
          key={i}
          className="bg-cinza-claro rounded-lg overflow-hidden border border-transparent hover:border-dourado/30 transition"
        >
          <button
            onClick={() => setAberto(aberto === i ? null : i)}
            className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 group"
          >
            <span className="font-titulo font-bold text-cinza-escuro group-hover:text-azul-profundo transition">
              {faq.pergunta}
            </span>
            <span className={`
              text-2xl text-azul-profundo flex-shrink-0
              transition-transform duration-300
              ${aberto === i ? 'rotate-45' : ''}
            `}>
              +
            </span>
          </button>
          {aberto === i && (
            <div className="px-6 pb-5 text-cinza-escuro leading-relaxed">
              {faq.resposta}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
