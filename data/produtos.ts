import { ProdutoCard } from '@/components/produto/CardProduto';

export type Categoria = 'materia' | 'concurso' | 'combo';
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
  linkKiwify: string;
  faqExtra?: FAQ[]; // Perguntas específicas do produto, além das padrão
}

export const faqPadrao: FAQ[] = [
  {
    pergunta: 'Como recebo o material após a compra?',
    resposta: 'O material é enviado automaticamente para o seu email logo após a confirmação do pagamento. Pix tem liberação imediata; cartão de crédito é liberado em poucos minutos.'
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
    preco: 99.90,
    parcelamento: '8x de R$ 12,49',
    capaUrl: 'https://i.ibb.co/HpN0mmMf/ata-mf-png.png',
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
      'Gestão de Pessoas e do Atendimento ao Público',
      'Administração Pública',
      'Regime Jurídico dos Agentes Públicos',
    ],
    linkKiwify: 'https://pay.kiwify.com.br/PLACEHOLDER-ATA-MF',
  },
  {
    slug: 'ata-mf-2026-questoes',
    titulo: 'Caderno de Questões ATA-MF 2026 — Assistente Técnico Administrativo',
    tipo: 'questoes',
    categoria: 'concurso',
    concurso: 'ata-mf',
    preco: 54.90,
    parcelamento: '5x de R$ 10,98',
    capaUrl: 'https://i.ibb.co/HpN0mmMf/ata-mf-png.png',
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
    linkKiwify: 'https://pay.kiwify.com.br/PLACEHOLDER',
  },
  {
    slug: 'inss-2026-teorico',
    titulo: 'Apostila INSS 2026 — Técnico do Seguro Social',
    tipo: 'teorico',
    categoria: 'concurso',
    concurso: 'inss',
    preco: 89.90,
    precoOriginal: 129.90,
    parcelamento: '8x de R$ 11,24',
    capaUrl: 'https://i.ibb.co/zWHG8b0z/inss-png.png',
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
    linkKiwify: 'https://pay.kiwify.com.br/PLACEHOLDER-INSS',
  },
  {
    slug: 'inss-2026-questoes',
    titulo: 'Caderno de Questões INSS 2026 — Técnico do Seguro Social',
    tipo: 'questoes',
    categoria: 'concurso',
    concurso: 'inss',
    preco: 49.90,
    parcelamento: '5x de R$ 9,98',
    capaUrl: 'https://i.ibb.co/zWHG8b0z/inss-png.png',
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
    linkKiwify: 'https://pay.kiwify.com.br/PLACEHOLDER',
  },
  {
    slug: 'prf-2026-teorico',
    titulo: 'Apostila PRF 2026 — Agente Administrativo',
    tipo: 'teorico',
    categoria: 'concurso',
    concurso: 'prf',
    preco: 109.90,
    parcelamento: '9x de R$ 12,21',
    capaUrl: 'https://i.ibb.co/9HRb39yf/prf-png.png',
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
    linkKiwify: 'https://pay.kiwify.com.br/PLACEHOLDER-PRF',
  },
  {
    slug: 'prf-2026-questoes',
    titulo: 'Caderno de Questões PRF 2026 — Agente Administrativo',
    tipo: 'questoes',
    categoria: 'concurso',
    concurso: 'prf',
    preco: 59.90,
    parcelamento: '6x de R$ 9,98',
    capaUrl: 'https://i.ibb.co/9HRb39yf/prf-png.png',
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
    linkKiwify: 'https://pay.kiwify.com.br/PLACEHOLDER',
  },
  {
    slug: 'sedes-df-2026-teorico',
    titulo: 'Apostila SEDES-DF 2026 — Técnico Administrativo',
    tipo: 'teorico',
    categoria: 'concurso',
    concurso: 'sedes-df',
    preco: 79.90,
    precoOriginal: 99.90,
    parcelamento: '7x de R$ 11,41',
    capaUrl: 'https://i.ibb.co/Mx80BhQ9/sedes-df-png.png',
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
    linkKiwify: 'https://pay.kiwify.com.br/PLACEHOLDER-SEDES-DF',
  },
  {
    slug: 'sedes-df-2026-questoes',
    titulo: 'Caderno de Questões SEDES-DF 2026 — Técnico Administrativo',
    tipo: 'questoes',
    categoria: 'concurso',
    concurso: 'sedes-df',
    preco: 44.90,
    parcelamento: '4x de R$ 11,23',
    capaUrl: 'https://i.ibb.co/Mx80BhQ9/sedes-df-png.png',
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
    linkKiwify: 'https://pay.kiwify.com.br/PLACEHOLDER',
  },

  // ===== MATÉRIAS BÁSICAS (14 produtos) =====
  {
    slug: 'portugues-teorico',
    titulo: 'Apostila Língua Portuguesa — Conteúdo Teórico Completo',
    tipo: 'teorico',
    categoria: 'materia',
    materia: 'portugues',
    preco: 39.90,
    parcelamento: '4x de R$ 9,98',
    capaUrl: 'https://i.ibb.co/zWHG8b0z/inss-png.png',
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
    linkKiwify: 'https://pay.kiwify.com.br/PLACEHOLDER',
  },
  {
    slug: 'portugues-questoes',
    titulo: 'Caderno de Questões — Língua Portuguesa',
    tipo: 'questoes',
    categoria: 'materia',
    materia: 'portugues',
    preco: 29.90,
    parcelamento: '3x de R$ 9,97',
    capaUrl: 'https://i.ibb.co/zWHG8b0z/inss-png.png',
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
    linkKiwify: 'https://pay.kiwify.com.br/PLACEHOLDER',
  },
  {
    slug: 'matematica-teorico',
    titulo: 'Apostila Matemática Básica — Conteúdo Teórico Completo',
    tipo: 'teorico',
    categoria: 'materia',
    materia: 'matematica',
    preco: 39.90,
    parcelamento: '4x de R$ 9,98',
    capaUrl: 'https://i.ibb.co/zWHG8b0z/inss-png.png',
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
    linkKiwify: 'https://pay.kiwify.com.br/PLACEHOLDER',
  },
  {
    slug: 'matematica-questoes',
    titulo: 'Caderno de Questões — Matemática Básica',
    tipo: 'questoes',
    categoria: 'materia',
    materia: 'matematica',
    preco: 29.90,
    parcelamento: '3x de R$ 9,97',
    capaUrl: 'https://i.ibb.co/zWHG8b0z/inss-png.png',
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
    linkKiwify: 'https://pay.kiwify.com.br/PLACEHOLDER',
  },
  {
    slug: 'raciocinio-logico-teorico',
    titulo: 'Apostila Raciocínio Lógico — Conteúdo Teórico Completo',
    tipo: 'teorico',
    categoria: 'materia',
    materia: 'raciocinio-logico',
    preco: 39.90,
    parcelamento: '4x de R$ 9,98',
    capaUrl: 'https://i.ibb.co/zWHG8b0z/inss-png.png',
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
    linkKiwify: 'https://pay.kiwify.com.br/PLACEHOLDER',
  },
  {
    slug: 'raciocinio-logico-questoes',
    titulo: 'Caderno de Questões — Raciocínio Lógico',
    tipo: 'questoes',
    categoria: 'materia',
    materia: 'raciocinio-logico',
    preco: 29.90,
    parcelamento: '3x de R$ 9,97',
    capaUrl: 'https://i.ibb.co/zWHG8b0z/inss-png.png',
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
    linkKiwify: 'https://pay.kiwify.com.br/PLACEHOLDER',
  },
  {
    slug: 'informatica-teorico',
    titulo: 'Apostila Informática Básica — Conteúdo Teórico Completo',
    tipo: 'teorico',
    categoria: 'materia',
    materia: 'informatica',
    preco: 39.90,
    parcelamento: '4x de R$ 9,98',
    capaUrl: 'https://i.ibb.co/zWHG8b0z/inss-png.png',
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
    linkKiwify: 'https://pay.kiwify.com.br/PLACEHOLDER',
  },
  {
    slug: 'informatica-questoes',
    titulo: 'Caderno de Questões — Informática Básica',
    tipo: 'questoes',
    categoria: 'materia',
    materia: 'informatica',
    preco: 29.90,
    parcelamento: '3x de R$ 9,97',
    capaUrl: 'https://i.ibb.co/zWHG8b0z/inss-png.png',
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
    linkKiwify: 'https://pay.kiwify.com.br/PLACEHOLDER',
  },
  {
    slug: 'constitucional-teorico',
    titulo: 'Apostila Direito Constitucional — Conteúdo Teórico Completo',
    tipo: 'teorico',
    categoria: 'materia',
    materia: 'constitucional',
    preco: 49.90,
    parcelamento: '5x de R$ 9,98',
    capaUrl: 'https://i.ibb.co/zWHG8b0z/inss-png.png',
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
    linkKiwify: 'https://pay.kiwify.com.br/PLACEHOLDER',
  },
  {
    slug: 'constitucional-questoes',
    titulo: 'Caderno de Questões — Direito Constitucional',
    tipo: 'questoes',
    categoria: 'materia',
    materia: 'constitucional',
    preco: 34.90,
    parcelamento: '3x de R$ 11,63',
    capaUrl: 'https://i.ibb.co/zWHG8b0z/inss-png.png',
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
    linkKiwify: 'https://pay.kiwify.com.br/PLACEHOLDER',
  },
  {
    slug: 'administrativo-teorico',
    titulo: 'Apostila Direito Administrativo — Conteúdo Teórico Completo',
    tipo: 'teorico',
    categoria: 'materia',
    materia: 'administrativo',
    preco: 49.90,
    parcelamento: '5x de R$ 9,98',
    capaUrl: 'https://i.ibb.co/zWHG8b0z/inss-png.png',
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
    linkKiwify: 'https://pay.kiwify.com.br/PLACEHOLDER',
  },
  {
    slug: 'administrativo-questoes',
    titulo: 'Caderno de Questões — Direito Administrativo',
    tipo: 'questoes',
    categoria: 'materia',
    materia: 'administrativo',
    preco: 34.90,
    parcelamento: '3x de R$ 11,63',
    capaUrl: 'https://i.ibb.co/zWHG8b0z/inss-png.png',
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
    linkKiwify: 'https://pay.kiwify.com.br/PLACEHOLDER',
  },
  {
    slug: 'adm-publica-teorico',
    titulo: 'Apostila Administração Pública — Conteúdo Teórico Completo',
    tipo: 'teorico',
    categoria: 'materia',
    materia: 'adm-publica',
    preco: 49.90,
    parcelamento: '5x de R$ 9,98',
    capaUrl: 'https://i.ibb.co/zWHG8b0z/inss-png.png',
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
    linkKiwify: 'https://pay.kiwify.com.br/PLACEHOLDER',
  },
  {
    slug: 'adm-publica-questoes',
    titulo: 'Caderno de Questões — Administração Pública',
    tipo: 'questoes',
    categoria: 'materia',
    materia: 'adm-publica',
    preco: 34.90,
    parcelamento: '3x de R$ 11,63',
    capaUrl: 'https://i.ibb.co/zWHG8b0z/inss-png.png',
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
    linkKiwify: 'https://pay.kiwify.com.br/PLACEHOLDER',
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
