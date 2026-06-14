import { ProdutoCard } from '@/components/produto/CardProduto';

export type Categoria = 'materia' | 'concurso' | 'combo' | 'gratis';
export type Materia = 
  | 'portugues' 
  | 'matematica' 
  | 'raciocinio-logico' 
  | 'informatica' 
  | 'constitucional' 
  | 'administrativo' 
  | 'adm-publica';
export type Concurso = 'inss' | 'prf' | 'ata-mf' | 'sedes-df';

export interface FichaTecnica {
  instituicao: string;
  cargo: string;
  estado: string;
  nivel: 'Médio' | 'Superior';
  paginas: number;
  ultimaAtualizacao: string;
}

export interface FAQ {
  pergunta: string;
  resposta: string;
}

export interface Produto extends ProdutoCard {
  categoria: Categoria;
  materia?: Materia;
  concurso?: Concurso;
  destaque?: boolean;
  ativo: boolean;
  
  // NOVOS CAMPOS
  descricaoCurta: string;
  descricaoCompleta: string;
  oQueRecebe: string[];
  fichaTecnica: FichaTecnica;
  topicosCobertos: string[];
  linkCheckout: string;
  faqExtra?: FAQ[]; // Perguntas específicas do produto, além das padrão
}

export const faqPadrao: FAQ[] = [
  {
    pergunta: 'Como recebo o material após a compra?',
    resposta: 'Imediatamente após a confirmação do pagamento, você recebe no email cadastrado um link de acesso à área de membros da Cakto. Lá dentro, você terá acesso a uma pasta no Google Drive com todos os PDFs do material — pode baixar quantas vezes quiser e estudar em qualquer dispositivo.'
  },
  {
    pergunta: 'O material é atualizado conforme o último edital?',
    resposta: 'Sim. Todas as nossas apostilas são revisadas e atualizadas conforme o edital mais recente do concurso, garantindo que você estude exatamente o que será cobrado.'
  },
  {
    pergunta: 'Posso imprimir a apostila?',
    resposta: 'Sim, você pode imprimir o material sem nenhuma restrição, quantas vezes quiser, para uso pessoal.'
  },
  {
    pergunta: 'Funciona em qualquer dispositivo?',
    resposta: 'Sim. O PDF é compatível com computador, tablet, celular e e-readers. Você pode estudar de onde estiver.'
  },
  {
    pergunta: 'E se eu não gostar do material? Posso pedir reembolso?',
    resposta: 'Sim. Oferecemos garantia de 7 dias após a compra. Se por qualquer motivo você não estiver satisfeito, basta solicitar o reembolso integral pelo nosso suporte.'
  },
];

export const produtos: Produto[] = [
  // ===== CONCURSOS ESPECÍFICOS (8 produtos) =====
  {
    slug: 'ata-mf-2026-teorico',
    titulo: 'Apostila ATA-MF 2026 — Assistente Técnico Administrativo',
    tipo: 'teorico',
    categoria: 'concurso',
    concurso: 'ata-mf',
    preco: 57.80,
    parcelamento: '6x de R$ 9,63',
    capaUrl: 'https://i.ibb.co/B24z6Cw2/1.png',
    destaque: true,
    ativo: true,
    descricaoCurta: 'Apostila completa para o concurso de Assistente Técnico Administrativo do Ministério da Fazenda. Conteúdo teórico atualizado, com questões comentadas das principais bancas.',
    descricaoCompleta: `Conquiste sua vaga no Ministério da Fazenda com a apostila mais completa do mercado para o cargo de Assistente Técnico Administrativo (ATA-MF). 

Nossa equipe editorial preparou um material que combina profundidade teórica com aplicação prática, focando exatamente no que cai na prova — sem desperdiçar seu tempo com conteúdo irrelevante.

Cada matéria foi organizada conforme a ordem do edital, com box de dicas, mnemônicos e questões intercaladas para fixação imediata. Você estuda, pratica e revisa no mesmo material.

Material em PDF de alta qualidade, ideal para estudar em qualquer dispositivo ou imprimir para anotações. Liberação imediata após o pagamento.`,
    oQueRecebe: [
      'Conteúdo teórico completo conforme o último edital',
      'Questões comentadas das principais bancas',
      'Box de dicas, mnemônicos e fluxogramas',
      'Acesso vitalício ao material em PDF',
    ],
    fichaTecnica: {
      instituicao: 'Ministério da Fazenda',
      cargo: 'Assistente Técnico Administrativo',
      estado: 'Nacional',
      nivel: 'Médio',
      paginas: 320,
      ultimaAtualizacao: 'Maio/2026',
    },
    topicosCobertos: [
      'Língua Portuguesa',
      'Raciocínio Lógico-Matemático',
      'Noções de Informática',
      'Ética no Serviço Público',
      'Gestão Pública',
      'Regime Jurídico dos Agentes Públicos',
    ],
    linkCheckout: 'https://pay.cakto.com.br/PLACEHOLDER-ATA-MF',
  },
  {
    slug: 'ata-mf-2026-questoes',
    titulo: 'Caderno de Questões ATA-MF 2026 — Assistente Técnico Administrativo',
    tipo: 'questoes',
    categoria: 'concurso',
    concurso: 'ata-mf',
    preco: 36.90,
    parcelamento: '3x de R$ 12,30',
    capaUrl: 'https://i.ibb.co/4n7V3vNx/2.png',
    ativo: true,
    descricaoCurta: 'Material de estudo desenvolvido para sua aprovação. Conteúdo atualizado conforme o último edital.',
    descricaoCompleta: 'Em breve, mais informações sobre este material. Para dúvidas específicas, entre em contato pelo WhatsApp.',
    oQueRecebe: [
      'Material em PDF',
      'Acesso vitalício',
      'Suporte direto com a editora',
    ],
    fichaTecnica: {
      instituicao: 'Diversos',
      cargo: 'Diversos',
      estado: 'Nacional',
      nivel: 'Médio',
      paginas: 200,
      ultimaAtualizacao: 'Maio/2026',
    },
    topicosCobertos: ['Conteúdo conforme edital'],
    linkCheckout: 'https://pay.cakto.com.br/PLACEHOLDER',
  },
  {
    slug: 'inss-2026-teorico',
    titulo: 'Apostila INSS 2026 — Técnico do Seguro Social',
    tipo: 'teorico',
    categoria: 'concurso',
    concurso: 'inss',
    preco: 62.70,
    precoOriginal: 89.90,
    parcelamento: '6x de R$ 10,45',
    capaUrl: 'https://i.ibb.co/0RW9Qz3P/2.png',
    destaque: true,
    ativo: true,
    descricaoCurta: 'Apostila completa para o concurso de Técnico do Seguro Social do INSS. Conteúdo teórico atualizado conforme o edital, com questões comentadas das principais bancas.',
    descricaoCompleta: `Prepare-se para o concurso do INSS com o material mais focado e completo do mercado. Nossa apostila para Técnico do Seguro Social cobre integralmente o conteúdo programático cobrado no último edital.
 
 Material desenvolvido por uma equipe que entende a banca e sabe exatamente o que cai na prova. Cada tópico foi organizado para você estudar de forma eficiente, sem perder tempo com matéria que não cai.
 
 Conteúdo intercalado com questões comentadas, box de dicas práticas e mnemônicos que aceleram a memorização. Tudo em PDF de alta qualidade, com liberação imediata após o pagamento.`,
    oQueRecebe: [
      'Conteúdo teórico completo conforme o último edital',
      'Questões comentadas das principais bancas',
      'Box de dicas, mnemônicos e fluxogramas',
      'Acesso vitalício ao material em PDF',
    ],
    fichaTecnica: {
      instituicao: 'Instituto Nacional do Seguro Social — INSS',
      cargo: 'Técnico do Seguro Social',
      estado: 'Nacional',
      nivel: 'Médio',
      paginas: 340,
      ultimaAtualizacao: 'Maio/2026',
    },
    topicosCobertos: [
      'Língua Portuguesa',
      'Raciocínio Lógico-Matemático',
      'Noções de Informática',
      'Ética no Serviço Público',
      'Noções de Direito Constitucional',
      'Noções de Direito Administrativo',
      'Conhecimentos Específicos (Seguridade Social)',
    ],
    linkCheckout: 'https://pay.cakto.com.br/PLACEHOLDER-INSS',
  },
  {
    slug: 'inss-2026-questoes',
    titulo: 'Caderno de Questões INSS 2026 — Técnico do Seguro Social',
    tipo: 'questoes',
    categoria: 'concurso',
    concurso: 'inss',
    preco: 40.80,
    parcelamento: '4x de R$ 10,20',
    capaUrl: 'https://i.ibb.co/nqWxjH0B/4.png',
    ativo: true,
    descricaoCurta: 'Material de estudo desenvolvido para sua aprovação. Conteúdo atualizado conforme o último edital.',
    descricaoCompleta: 'Em breve, mais informações sobre este material. Para dúvidas específicas, entre em contato pelo WhatsApp.',
    oQueRecebe: [
      'Material em PDF',
      'Acesso vitalício',
      'Suporte direto com a editora',
    ],
    fichaTecnica: {
      instituicao: 'Diversos',
      cargo: 'Diversos',
      estado: 'Nacional',
      nivel: 'Médio',
      paginas: 200,
      ultimaAtualizacao: 'Maio/2026',
    },
    topicosCobertos: ['Conteúdo conforme edital'],
    linkCheckout: 'https://pay.cakto.com.br/PLACEHOLDER',
  },
  {
    slug: 'prf-2026-teorico',
    titulo: 'Apostila PRF 2026 — Agente Administrativo',
    tipo: 'teorico',
    categoria: 'concurso',
    concurso: 'prf',
    preco: 24.00,
    precoOriginal: 46.00,
    parcelamento: '2x de R$ 12,00',
    capaUrl: 'https://i.ibb.co/WWCr1JrL/3.png',
    destaque: true,
    ativo: true,
    descricaoCurta: 'Apostila completa para o concurso de Agente Administrativo da Polícia Rodoviária Federal. Conteúdo teórico atualizado conforme o edital.',
    descricaoCompleta: `A apostila definitiva para quem busca uma vaga como Agente Administrativo da Polícia Rodoviária Federal. Material completo, atualizado e focado exatamente no que a banca cobra.
 
 Conteúdo organizado seguindo a estrutura do último edital, com profundidade técnica nas matérias específicas e abordagem objetiva nas matérias básicas. Cada disciplina vem acompanhada de questões comentadas para você fixar o aprendizado.
 
 Inclui legislação aplicada à PRF, noções de arquivologia e administração — conteúdos que costumam derrubar candidatos despreparados. PDF de alta qualidade, liberação imediata após o pagamento.`,
    oQueRecebe: [
      'Conteúdo teórico completo conforme o último edital',
      'Questões comentadas das principais bancas',
      'Box de dicas, mnemônicos e fluxogramas',
      'Acesso vitalício ao material em PDF',
    ],
    fichaTecnica: {
      instituicao: 'Polícia Rodoviária Federal — PRF',
      cargo: 'Agente Administrativo',
      estado: 'Nacional',
      nivel: 'Médio',
      paginas: 380,
      ultimaAtualizacao: 'Maio/2026',
    },
    topicosCobertos: [
      'Língua Portuguesa',
      'Raciocínio Lógico-Matemático',
      'Noções de Informática',
      'Ética no Serviço Público',
      'Noções de Direito Constitucional',
      'Noções de Direito Administrativo',
      'Noções de Administração',
      'Noções de Arquivologia',
      'Legislação Aplicada à PRF',
    ],
    linkCheckout: 'https://pay.cakto.com.br/7mxiwud',
  },
  {
    slug: 'prf-2026-questoes',
    titulo: 'Caderno de Questões PRF 2026 — Agente Administrativo',
    tipo: 'questoes',
    categoria: 'concurso',
    concurso: 'prf',
    preco: 23.00,
    precoOriginal: 35.00,
    parcelamento: '2x de R$ 11,50',
    capaUrl: 'https://i.ibb.co/p62t8539/6.png',
    ativo: true,
    descricaoCurta: 'Material de estudo desenvolvido para sua aprovação. Conteúdo atualizado conforme o último edital.',
    descricaoCompleta: 'Em breve, more informações sobre este material. Para dúvidas específicas, entre em contato pelo WhatsApp.',
    oQueRecebe: [
      'Material em PDF',
      'Acesso vitalício',
      'Suporte direto com a editora',
    ],
    fichaTecnica: {
      instituicao: 'Diversos',
      cargo: 'Diversos',
      estado: 'Nacional',
      nivel: 'Médio',
      paginas: 200,
      ultimaAtualizacao: 'Maio/2026',
    },
    topicosCobertos: ['Conteúdo conforme edital'],
    linkCheckout: 'https://pay.cakto.com.br/PLACEHOLDER',
  },
  {
    slug: 'prf-2026-combo',
    titulo: 'Combo PRF 2026 — Apostila + Caderno de Questões',
    tipo: 'combo' as any,
    categoria: 'concurso',
    concurso: 'prf',
    preco: 47.00,
    precoOriginal: 68.00,
    parcelamento: '4x de R$ 11,75',
    capaUrl: 'https://i.ibb.co/WWCr1JrL/3.png', // Or we can use a custom representation or both
    destaque: true,
    ativo: true,
    descricaoCurta: 'O combo definitivo para sua aprovação na PRF. Leve a Apostila Teórica Completa + o Caderno de Questões atualizado, economizando muito.',
    descricaoCompleta: 'Combo com o material teórico completo de Agente Administrativo da Polícia Rodoviária Federal + o caderno de questões completo com a nova capa 2026.',
    oQueRecebe: [
      'Apostila Teórica Completa para Agente Administrativo PRF',
      'Caderno de Questões completo PRF (capa nova)',
      'Todos os bônus inclusos (mnemônicos, dicas, fluxogramas)',
      'Suporte prioritário pelo WhatsApp',
    ],
    fichaTecnica: {
      instituicao: 'Polícia Rodoviária Federal — PRF',
      cargo: 'Agente Administrativo',
      estado: 'Nacional',
      nivel: 'Médio',
      paginas: 580,
      ultimaAtualizacao: 'Junho/2026',
    },
    topicosCobertos: [
      'Língua Portuguesa',
      'Raciocínio Lógico-Matemático',
      'Noções de Informática',
      'Ética no Serviço Público',
      'Noções de Direito Constitucional',
      'Noções de Direito Administrativo',
      'Noções de Administração',
      'Noções de Arquivologia',
      'Legislação Aplicada à PRF',
    ],
    linkCheckout: 'https://pay.cakto.com.br/g6mv766',
  },
  {
    slug: 'sedes-df-2026-teorico',
    titulo: 'Apostila SEDES-DF 2026 — Técnico Administrativo',
    tipo: 'teorico',
    categoria: 'concurso',
    concurso: 'sedes-df',
    preco: 54.80,
    precoOriginal: 79.90,
    parcelamento: '5x de R$ 10,96',
    capaUrl: 'https://i.ibb.co/5hgHXyBj/4.png',
    destaque: true,
    ativo: true,
    descricaoCurta: 'Apostila completa para o concurso da Secretaria de Desenvolvimento Social do Distrito Federal — Técnico Administrativo e Técnico em Assistência Social.',
    descricaoCompleta: `Material completo para o concurso da SEDES-DF, contemplando os cargos de Técnico Administrativo e Técnico em Assistência Social. Apostila atualizada conforme o último edital publicado.
 
 Nossa abordagem prioriza o conteúdo de maior incidência na prova, com profundidade nas matérias específicas e objetividade nas matérias básicas. Você estuda o que realmente importa, sem desperdiçar tempo.
 
 Inclui questões comentadas das bancas mais comuns em concursos do Distrito Federal, com explicação detalhada do raciocínio para resolução. PDF de alta qualidade, liberação imediata após o pagamento.`,
    oQueRecebe: [
      'Conteúdo teórico completo conforme o último edital',
      'Questões comentadas das principais bancas',
      'Box de dicas, mnemônicos e fluxogramas',
      'Acesso vitalício ao material em PDF',
    ],
    fichaTecnica: {
      instituicao: 'Secretaria de Desenvolvimento Social do Distrito Federal',
      cargo: 'Técnico Administrativo / Técnico em Assistência Social',
      estado: 'Distrito Federal',
      nivel: 'Médio',
      paginas: 290,
      ultimaAtualizacao: 'Maio/2026',
    },
    topicosCobertos: [
      'Língua Portuguesa',
      'Atualidades',
      'Noções de Direito Constitucional',
      'Noções de Direito Administrativo',
      'Conhecimentos Específicos (Assistência Social)',
    ],
    linkCheckout: 'https://pay.cakto.com.br/PLACEHOLDER-SEDES-DF',
  },
  {
    slug: 'sedes-df-2026-questoes',
    titulo: 'Caderno de Questões SEDES-DF 2026 — Técnico Administrativo',
    tipo: 'questoes',
    categoria: 'concurso',
    concurso: 'sedes-df',
    preco: 34.90,
    parcelamento: '3x de R$ 11,63',
    capaUrl: 'https://i.ibb.co/MkWPfBrx/8.png',
    ativo: true,
    descricaoCurta: 'Material de estudo desenvolvido para sua aprovação. Conteúdo atualizado conforme o último edital.',
    descricaoCompleta: 'Em breve, mais informações sobre este material. Para dúvidas específicas, entre em contato pelo WhatsApp.',
    oQueRecebe: [
      'Material em PDF',
      'Acesso vitalício',
      'Suporte direto com a editora',
    ],
    fichaTecnica: {
      instituicao: 'Diversos',
      cargo: 'Diversos',
      estado: 'Nacional',
      nivel: 'Médio',
      paginas: 200,
      ultimaAtualizacao: 'Maio/2026',
    },
    topicosCobertos: ['Conteúdo conforme edital'],
    linkCheckout: 'https://pay.cakto.com.br/PLACEHOLDER',
  },
  
  // ===== MATÉRIAS BÁSICAS (7 produtos) =====
  {
    slug: 'portugues-teorico',
    titulo: 'Apostila Língua Portuguesa — Conteúdo Teórico Completo',
    tipo: 'teorico',
    categoria: 'materia',
    materia: 'portugues',
    preco: 39.90,
    parcelamento: '4x de R$ 9,98',
    capaUrl: 'https://i.ibb.co/LDsXm88w/5.png',
    ativo: true,
    descricaoCurta: 'Material de estudo desenvolvido para sua aprovação. Conteúdo atualizado conforme o último edital.',
    descricaoCompleta: 'Em breve, mais informações sobre este material. Para dúvidas específicas, entre em contato pelo WhatsApp.',
    oQueRecebe: [
      'Material em PDF',
      'Acesso vitalício',
      'Suporte direto com a editora',
    ],
    fichaTecnica: {
      instituicao: 'Diversos',
      cargo: 'Diversos',
      estado: 'Nacional',
      nivel: 'Médio',
      paginas: 200,
      ultimaAtualizacao: 'Maio/2026',
    },
    topicosCobertos: ['Conteúdo conforme edital'],
    linkCheckout: 'https://pay.cakto.com.br/PLACEHOLDER',
  },
  {
    slug: 'matematica-teorico',
    titulo: 'Apostila Matemática Básica — Conteúdo Teórico Completo',
    tipo: 'teorico',
    categoria: 'materia',
    materia: 'matematica',
    preco: 34.70,
    parcelamento: '3x de R$ 11,57',
    capaUrl: 'https://i.ibb.co/0Vtx96qd/6.png',
    ativo: true,
    descricaoCurta: 'Material de estudo desenvolvido para sua aprovação. Conteúdo atualizado conforme o último edital.',
    descricaoCompleta: 'Em breve, mais informações sobre este material. Para dúvidas específicas, entre em contato pelo WhatsApp.',
    oQueRecebe: [
      'Material em PDF',
      'Acesso vitalício',
      'Suporte direto com a editora',
    ],
    fichaTecnica: {
      instituicao: 'Diversos',
      cargo: 'Diversos',
      estado: 'Nacional',
      nivel: 'Médio',
      paginas: 200,
      ultimaAtualizacao: 'Maio/2026',
    },
    topicosCobertos: ['Conteúdo conforme edital'],
    linkCheckout: 'https://pay.cakto.com.br/PLACEHOLDER',
  },
  {
    slug: 'raciocinio-logico-teorico',
    titulo: 'Apostila Raciocínio Lógico — Conteúdo Teórico Completo',
    tipo: 'teorico',
    categoria: 'materia',
    materia: 'raciocinio-logico',
    preco: 31.80,
    parcelamento: '3x de R$ 10,60',
    capaUrl: 'https://i.ibb.co/MT35XFD/7.png',
    ativo: true,
    descricaoCurta: 'Material de estudo desenvolvido para sua aprovação. Conteúdo atualizado conforme o último edital.',
    descricaoCompleta: 'Em breve, mais informações sobre este material. Para dúvidas específicas, entre em contato pelo WhatsApp.',
    oQueRecebe: [
      'Material em PDF',
      'Acesso vitalício',
      'Suporte direto com a editora',
    ],
    fichaTecnica: {
      instituicao: 'Diversos',
      cargo: 'Diversos',
      estado: 'Nacional',
      nivel: 'Médio',
      paginas: 200,
      ultimaAtualizacao: 'Maio/2026',
    },
    topicosCobertos: ['Conteúdo conforme edital'],
    linkCheckout: 'https://pay.cakto.com.br/PLACEHOLDER',
  },
  {
    slug: 'informatica-teorico',
    titulo: 'Apostila Informática Básica — Conteúdo Teórico Completo',
    tipo: 'teorico',
    categoria: 'materia',
    materia: 'informatica',
    preco: 28.70,
    parcelamento: '2x de R$ 14,35',
    capaUrl: 'https://i.ibb.co/67VddBgw/8.png',
    ativo: true,
    descricaoCurta: 'Material de estudo desenvolvido para sua aprovação. Conteúdo atualizado conforme o último edital.',
    descricaoCompleta: 'Em breve, mais informações sobre este material. Para dúvidas específicas, entre em contato pelo WhatsApp.',
    oQueRecebe: [
      'Material em PDF',
      'Acesso vitalício',
      'Suporte direto com a editora',
    ],
    fichaTecnica: {
      instituicao: 'Diversos',
      cargo: 'Diversos',
      estado: 'Nacional',
      nivel: 'Médio',
      paginas: 200,
      ultimaAtualizacao: 'Maio/2026',
    },
    topicosCobertos: ['Conteúdo conforme edital'],
    linkCheckout: 'https://pay.cakto.com.br/PLACEHOLDER',
  },
  {
    slug: 'constitucional-teorico',
    titulo: 'Apostila Direito Constitucional — Conteúdo Teórico Completo',
    tipo: 'teorico',
    categoria: 'materia',
    materia: 'constitucional',
    preco: 38.70,
    parcelamento: '3x de R$ 12,90',
    capaUrl: 'https://i.ibb.co/TDm5xW5k/9.png',
    ativo: true,
    descricaoCurta: 'Material de estudo desenvolvido para sua aprovação. Conteúdo atualizado conforme o último edital.',
    descricaoCompleta: 'Em breve, mais informações sobre este material. Para dúvidas específicas, entre em contato pelo WhatsApp.',
    oQueRecebe: [
      'Material em PDF',
      'Acesso vitalício',
      'Suporte direto com a editora',
    ],
    fichaTecnica: {
      instituicao: 'Diversos',
      cargo: 'Diversos',
      estado: 'Nacional',
      nivel: 'Médio',
      paginas: 200,
      ultimaAtualizacao: 'Maio/2026',
    },
    topicosCobertos: ['Conteúdo conforme edital'],
    linkCheckout: 'https://pay.cakto.com.br/PLACEHOLDER',
  },
  {
    slug: 'administrativo-teorico',
    titulo: 'Apostila Direito Administrativo — Conteúdo Teórico Completo',
    tipo: 'teorico',
    categoria: 'materia',
    materia: 'administrativo',
    preco: 39.80,
    parcelamento: '4x de R$ 9,95',
    capaUrl: 'https://i.ibb.co/6htr31p/10.png',
    ativo: true,
    descricaoCurta: 'Material de estudo desenvolvido para sua aprovação. Conteúdo atualizado conforme o último edital.',
    descricaoCompleta: 'Em breve, mais informações sobre este material. Para dúvidas específicas, entre em contato pelo WhatsApp.',
    oQueRecebe: [
      'Material em PDF',
      'Acesso vitalício',
      'Suporte direto com a editora',
    ],
    fichaTecnica: {
      instituicao: 'Diversos',
      cargo: 'Diversos',
      estado: 'Nacional',
      nivel: 'Médio',
      paginas: 200,
      ultimaAtualizacao: 'Maio/2026',
    },
    topicosCobertos: ['Conteúdo conforme edital'],
    linkCheckout: 'https://pay.cakto.com.br/PLACEHOLDER',
  },
  {
    slug: 'adm-publica-teorico',
    titulo: 'Apostila Administração Pública — Conteúdo Teórico Completo',
    tipo: 'teorico',
    categoria: 'materia',
    materia: 'adm-publica',
    preco: 30.80,
    parcelamento: '3x de R$ 10,27',
    capaUrl: 'https://i.ibb.co/qYSv5H1X/11.png',
    ativo: true,
    descricaoCurta: 'Material de estudo desenvolvido para sua aprovação. Conteúdo atualizado conforme o último edital.',
    descricaoCompleta: 'Em breve, mais informações sobre este material. Para dúvidas específicas, entre em contato pelo WhatsApp.',
    oQueRecebe: [
      'Material em PDF',
      'Acesso vitalício',
      'Suporte direto com a editora',
    ],
    fichaTecnica: {
      instituicao: 'Diversos',
      cargo: 'Diversos',
      estado: 'Nacional',
      nivel: 'Médio',
      paginas: 200,
      ultimaAtualizacao: 'Maio/2026',
    },
    topicosCobertos: ['Conteúdo conforme edital'],
    linkCheckout: 'https://pay.cakto.com.br/PLACEHOLDER',
  },
];


// Mapeamentos para labels legíveis
export const labelsMaterias: Record<Materia, string> = {
  'portugues': 'Língua Portuguesa',
  'matematica': 'Matemática Básica',
  'raciocinio-logico': 'Raciocínio Lógico',
  'informatica': 'Informática Básica',
  'constitucional': 'Direito Constitucional',
  'administrativo': 'Direito Administrativo',
  'adm-publica': 'Administração Pública',
};

export const labelsConcursos: Record<Concurso, string> = {
  'inss': 'INSS',
  'prf': 'PRF',
  'ata-mf': 'ATA-MF',
  'sedes-df': 'SEDES-DF',
};
