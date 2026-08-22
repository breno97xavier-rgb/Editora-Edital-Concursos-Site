import React from 'react';
import { MessageSquare } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

interface WhatsAppSupportProps {
  tituloProduto?: string;
}

export default function WhatsAppSupport({ tituloProduto }: WhatsAppSupportProps) {
  const mensagem = tituloProduto
    ? encodeURIComponent(`Olá! Gostaria de tirar dúvidas sobre o material "${tituloProduto}".`)
    : encodeURIComponent('Olá! Gostaria de tirar dúvidas sobre as apostilas da Editora Edital Concursos.');

  return (
    <section className="bg-azul-profundo text-white rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xs my-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h3 className="font-titulo font-bold text-xl sm:text-2xl text-white mb-2">
            Precisa de ajuda para escolher seu material?
          </h3>
          <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
            Nossa equipe editorial está à disposição para esclarecer dúvidas sobre os editais, disciplinas e conteúdos.
          </p>
        </div>

        <a
          href={`https://wa.me/${siteConfig.whatsapp.numeroRaw}?text=${mensagem}`}
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex items-center gap-2.5
            bg-[#25D366] hover:bg-[#20bd5a] text-white
            font-titulo font-bold text-sm sm:text-base
            px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl
            transition-all duration-200
            shadow-sm hover:shadow-md
            whitespace-nowrap flex-shrink-0
          "
        >
          <MessageSquare size={20} />
          <span>Falar no WhatsApp</span>
        </a>
      </div>
    </section>
  );
}
