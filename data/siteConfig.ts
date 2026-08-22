import { Produto } from './produtos';

export const siteConfig = {
  nome: 'Editora Edital Concursos',
  razaoSocial: 'Editora Edital Concursos',
  cnpj: '65.395.470/0001-47',
  email: 'editoraeditalconcursos@gmail.com',
  whatsapp: {
    numeroFormatado: '(41) 98842-0201',
    numeroRaw: '5541988420201',
  },
  anoVigente: '2026',
  urlBase: 'https://editoraeditalconcursos.com.br',
};

/**
 * Gera links universais para WhatsApp institucional ou contextual de produto
 */
export function getWhatsAppLink(mensagemOuProduto?: string | Produto, tipo?: 'compra' | 'duvida'): string {
  if (!mensagemOuProduto) {
    const msgPadrao = encodeURIComponent('Olá! Gostaria de tirar dúvidas sobre as apostilas da Editora Edital Concursos.');
    return `https://wa.me/${siteConfig.whatsapp.numeroRaw}?text=${msgPadrao}`;
  }

  if (typeof mensagemOuProduto === 'string') {
    return `https://wa.me/${siteConfig.whatsapp.numeroRaw}?text=${encodeURIComponent(mensagemOuProduto)}`;
  }

  // É um objeto Produto
  const produto = mensagemOuProduto;
  const precoStr = produto.preco.toFixed(2).replace('.', ',');

  if (tipo === 'compra') {
    const msgCompra = `Olá! Tenho interesse em adquirir o material "${produto.titulo}" (R$ ${precoStr}). Como posso prosseguir com a compra?`;
    return `https://wa.me/${siteConfig.whatsapp.numeroRaw}?text=${encodeURIComponent(msgCompra)}`;
  }

  const msgDuvida = `Olá! Estou na página do material "${produto.titulo}" e gostaria de tirar algumas dúvidas.`;
  return `https://wa.me/${siteConfig.whatsapp.numeroRaw}?text=${encodeURIComponent(msgDuvida)}`;
}
