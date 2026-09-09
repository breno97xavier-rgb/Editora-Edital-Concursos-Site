/**
 * Conjuntos de páginas de amostra de materiais da Editora Edital Concursos.
 * Centraliza as imagens de amostra para evitar duplicação em múltiplos produtos.
 */

export const productSamples = {
  teoricoGeral: [
    'https://bujnzfoulbpljzxxvjgw.supabase.co/storage/v1/object/public/Assets-edital/Amostra%20geral/1.png',
    'https://bujnzfoulbpljzxxvjgw.supabase.co/storage/v1/object/public/Assets-edital/Amostra%20geral/2.png',
    'https://bujnzfoulbpljzxxvjgw.supabase.co/storage/v1/object/public/Assets-edital/Amostra%20geral/3.png',
    'https://bujnzfoulbpljzxxvjgw.supabase.co/storage/v1/object/public/Assets-edital/Amostra%20geral/4.png',
    'https://bujnzfoulbpljzxxvjgw.supabase.co/storage/v1/object/public/Assets-edital/Amostra%20geral/5.png',
  ],
} as const;

export type ProductSampleKey = keyof typeof productSamples;

export interface HasSampleKey {
  sampleKey?: ProductSampleKey;
}

/**
 * Obtém a lista ordenada de páginas de amostra de um produto.
 *
 * @param product Produto ou objeto contendo a propriedade opcional `sampleKey`
 * @returns Array de URLs com as páginas de amostra (ou array vazio caso não possua)
 */
export function getProductSamplePages(product?: HasSampleKey | null): string[] {
  if (!product || !product.sampleKey) {
    return [];
  }

  const pages = productSamples[product.sampleKey];
  return pages ? [...pages] : [];
}
