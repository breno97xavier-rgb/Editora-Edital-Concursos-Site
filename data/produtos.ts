export type Categoria = 'materia' | 'concurso' | 'combo';
export type TipoProduto = 'teorico' | 'questoes' | 'combo';
export type Materia = 
  | 'portugues' 
  | 'matematica' 
  | 'raciocinio-logico' 
  | 'informatica' 
  | 'constitucional' 
  | 'administrativo' 
  | 'adm-publica';
export type Concurso = 'prf' | 'inss' | 'bacen' | 'bb' | 'ata-mf';
export type CheckoutStatus = 'validated' | 'pending';

export interface FichaTecnica {
  instituicao: string;
  cargo: string;
  formato: string;
  entrega: string;
  ano: string;
}

export interface FAQ {
  pergunta: string;
  resposta: string;
}

export interface DetalhesCombo {
  teoricoSlug: string;
  questoesSlug: string;
  capaTeorico: string;
  capaQuestoes: string;
  precoTeorico: number;
  precoQuestoes: number;
  valorSeparado: number;
  economia: number;
  economiaPercentual: number;
}

export interface Produto {
  slug: string;
  titulo: string;
  tipo: TipoProduto;
  categoria: Categoria;
  materia?: Materia;
  concurso?: Concurso;
  destaque?: boolean;
  ativo: boolean;
  capaUrl: string;
  
  // Preço oficial vigente
  preco: number;
  
  // Arquitetura preparada para futuras promoções
  precoBase?: number;
  descontoPercentual?: number;
  precoPromocional?: number;
  
  // Estrutura comercial de Checkout
  checkoutStatus: CheckoutStatus;
  linkCheckout?: string;
  emAtualizacao?: boolean;

  // Informações para Combos
  comboInfo?: {
    teoricoSlug: string;
    questoesSlug: string;
    capaTeorico: string;
    capaQuestoes: string;
  };

  descricaoCurta: string;
  descricaoCompleta: string;
  oQueRecebe: string[];
  fichaTecnica: FichaTecnica;
  topicosCobertos: string[];
  faqExtra?: FAQ[];
}

export const faqPadrao: FAQ[] = [
  {
    pergunta: 'Como recebo o material após a compra?',
    resposta: 'Após a confirmação do pagamento, é liberado o acesso para download do material em formato PDF.'
  },
  {
    pergunta: 'O material é digital?',
    resposta: 'Sim, todos os nossos materiais são 100% digitais em formato PDF, compatíveis com computador, notebook, tablet, celular e leitores digitais.'
  },
  {
    pergunta: 'Posso imprimir a apostila?',
    resposta: 'Sim, você pode imprimir o material para seu uso pessoal de estudos.'
  },
  {
    pergunta: 'Como tiro dúvidas sobre o material?',
    resposta: 'Você conta com suporte direto da Editora Edital Concursos através do nosso canal oficial no WhatsApp (41) 98842-0201.'
  },
];

export const produtos: Produto[] = [
  // =========================================================================
  // ===== 1. MATERIAIS TEÓRICOS POR CONCURSO (5 PRODUTOS) =====
  // =========================================================================
  {
    slug: 'prf-2026-teorico',
    titulo: 'Apostila PRF 2026 — Agente Administrativo',
    tipo: 'teorico',
    categoria: 'concurso',
    concurso: 'prf',
    preco: 47.90,
    capaUrl: 'https://ycagvwsvccgdjzpbhrfi.supabase.co/storage/v1/object/public/Editora/Capas%203D/1.png',
    destaque: true,
    ativo: true,
    checkoutStatus: 'validated',
    linkCheckout: 'https://pay.cakto.com.br/7mxiwud',
    descricaoCurta: 'Material teórico digital direcionado para a preparação do concurso de Agente Administrativo da Polícia Rodoviária Federal.',
    descricaoCompleta: `Material preparatório teórico desenvolvido para o cargo de Agente Administrativo da Polícia Rodoviária Federal (PRF).

O conteúdo é estruturado em formato digital (PDF), voltado para o estudo individual e preparação para o concurso.

Compatível com leitura em computadores, tablets e smartphones ou impressão para estudo pessoal.`,
    oQueRecebe: [
      'Apostila teórica digital em formato PDF',
      'Material estruturado para o cargo de Agente Administrativo',
      'Acesso ao arquivo digital para download após a confirmação',
    ],
    fichaTecnica: {
      instituicao: 'Polícia Rodoviária Federal (PRF)',
      cargo: 'Agente Administrativo',
      formato: 'Digital (PDF)',
      entrega: 'Download digital (PDF)',
      ano: '2026',
    },
    topicosCobertos: [],
  },
  {
    slug: 'inss-2026-teorico',
    titulo: 'Apostila INSS 2026 — Técnico do Seguro Social',
    tipo: 'teorico',
    categoria: 'concurso',
    concurso: 'inss',
    preco: 44.90,
    capaUrl: 'https://ycagvwsvccgdjzpbhrfi.supabase.co/storage/v1/object/public/Editora/Capas%203D/2.png',
    destaque: true,
    ativo: true,
    checkoutStatus: 'validated',
    linkCheckout: 'https://pay.cakto.com.br/39jre8r',
    descricaoCurta: 'Material teórico digital voltado para o cargo de Técnico do Seguro Social do INSS.',
    descricaoCompleta: `Material preparatório teórico voltado para o cargo de Técnico do Seguro Social do Instituto Nacional do Seguro Social (INSS).

Elaborado em formato digital para leitura prática, revisão e acompanhamento dos estudos.

Disponível em arquivo PDF para estudo em dispositivos digitais ou impressão pessoal.`,
    oQueRecebe: [
      'Apostila teórica digital em formato PDF',
      'Material estruturado para o cargo de Técnico do Seguro Social',
      'Acesso ao arquivo digital para download após a confirmação',
    ],
    fichaTecnica: {
      instituicao: 'Instituto Nacional do Seguro Social (INSS)',
      cargo: 'Técnico do Seguro Social',
      formato: 'Digital (PDF)',
      entrega: 'Download digital (PDF)',
      ano: '2026',
    },
    topicosCobertos: [],
  },
  {
    slug: 'bb-2026-teorico',
    titulo: 'Apostila Banco do Brasil 2026 — Escriturário',
    tipo: 'teorico',
    categoria: 'concurso',
    concurso: 'bb',
    preco: 42.90,
    capaUrl: 'https://ycagvwsvccgdjzpbhrfi.supabase.co/storage/v1/object/public/Editora/Capas%203D/4.png',
    destaque: true,
    ativo: true,
    checkoutStatus: 'pending',
    emAtualizacao: true,
    descricaoCurta: 'Material teórico digital direcionado para a carreira de Escriturário do Banco do Brasil.',
    descricaoCompleta: `Material preparatório para a carreira de Escriturário do Banco do Brasil.

Desenvolvido para auxiliar no aprendizado e revisão dos conteúdos da carreira bancária em formato digital prático.

Disponível em arquivo PDF para leitura e estudo.`,
    oQueRecebe: [
      'Apostila teórica digital em formato PDF',
      'Material estruturado para o cargo de Escriturário',
      'Acesso ao arquivo digital para download após a confirmação',
    ],
    fichaTecnica: {
      instituicao: 'Banco do Brasil (BB)',
      cargo: 'Escriturário (Agente Comercial / TI)',
      formato: 'Digital (PDF)',
      entrega: 'Download digital (PDF)',
      ano: '2026',
    },
    topicosCobertos: [],
  },
  {
    slug: 'bacen-2026-teorico',
    titulo: 'Apostila BACEN 2026 — Analista e Técnico',
    tipo: 'teorico',
    categoria: 'concurso',
    concurso: 'bacen',
    preco: 40.90,
    capaUrl: 'https://ycagvwsvccgdjzpbhrfi.supabase.co/storage/v1/object/public/Editora/Capas%203D/3.png',
    destaque: true,
    ativo: true,
    checkoutStatus: 'pending',
    emAtualizacao: true,
    descricaoCurta: 'Material teórico digital direcionado para as carreiras do Banco Central do Brasil.',
    descricaoCompleta: `Material preparatório teórico voltado para os cargos de Analista e Técnico do Banco Central do Brasil (BACEN).

Estruturado para apoiar o estudo digital individual com leitura fluida e objetiva.

Arquivo 100% digital em formato PDF.`,
    oQueRecebe: [
      'Apostila teórica digital em formato PDF',
      'Material estruturado para os cargos do BACEN',
      'Acesso ao arquivo digital para download após a confirmação',
    ],
    fichaTecnica: {
      instituicao: 'Banco Central do Brasil (BACEN)',
      cargo: 'Analista / Técnico',
      formato: 'Digital (PDF)',
      entrega: 'Download digital (PDF)',
      ano: '2026',
    },
    topicosCobertos: [],
  },
  {
    slug: 'ata-mf-2026-teorico',
    titulo: 'Apostila ATA-MF 2026 — Assistente Técnico Administrativo',
    tipo: 'teorico',
    categoria: 'concurso',
    concurso: 'ata-mf',
    preco: 39.90,
    capaUrl: 'https://ycagvwsvccgdjzpbhrfi.supabase.co/storage/v1/object/public/Editora/Capas%203D/5.png',
    destaque: true,
    ativo: true,
    checkoutStatus: 'validated',
    linkCheckout: 'https://pay.cakto.com.br/pm28qqj',
    descricaoCurta: 'Material teórico digital para o cargo de Assistente Técnico Administrativo do Ministério da Fazenda.',
    descricaoCompleta: `Material teórico para a preparação ao concurso de Assistente Técnico Administrativo do Ministério da Fazenda (ATA-MF).

Organizado em formato digital para estudo contínuo e consulta prática.

Formato digital em PDF para leitura e estudo pessoal.`,
    oQueRecebe: [
      'Apostila teórica digital em formato PDF',
      'Material estruturado para o cargo de ATA-MF',
      'Acesso ao arquivo digital para download após a confirmação',
    ],
    fichaTecnica: {
      instituicao: 'Ministério da Fazenda (ATA-MF)',
      cargo: 'Assistente Técnico Administrativo',
      formato: 'Digital (PDF)',
      entrega: 'Download digital (PDF)',
      ano: '2026',
    },
    topicosCobertos: [],
  },

  // =========================================================================
  // ===== 2. CADERNOS DE QUESTÕES POR CONCURSO (5 PRODUTOS) =====
  // =========================================================================
  {
    slug: 'prf-2026-questoes',
    titulo: 'Caderno de Questões PRF 2026 — Agente Administrativo',
    tipo: 'questoes',
    categoria: 'concurso',
    concurso: 'prf',
    preco: 37.90,
    capaUrl: 'https://ycagvwsvccgdjzpbhrfi.supabase.co/storage/v1/object/public/Editora/Capas%203D/6.png',
    destaque: true,
    ativo: true,
    checkoutStatus: 'validated',
    linkCheckout: 'https://pay.cakto.com.br/q78yq2f',
    descricaoCurta: 'Caderno de questões para o cargo de Agente Administrativo da PRF com gabarito.',
    descricaoCompleta: `Material digital de treino e fixação contendo caderno de questões com gabarito para a preparação ao concurso de Agente Administrativo da PRF.

Ideal para resolução prática e verificação de respostas durante a rotina de estudos.

Formato digital em PDF.`,
    oQueRecebe: [
      'Caderno de questões digital em formato PDF',
      'Exercícios selecionados com gabarito',
      'Acesso ao arquivo digital para download após a confirmação',
    ],
    fichaTecnica: {
      instituicao: 'Polícia Rodoviária Federal (PRF)',
      cargo: 'Agente Administrativo',
      formato: 'Digital (PDF)',
      entrega: 'Download digital (PDF)',
      ano: '2026',
    },
    topicosCobertos: [],
  },
  {
    slug: 'inss-2026-questoes',
    titulo: 'Caderno de Questões INSS 2026 — Técnico do Seguro Social',
    tipo: 'questoes',
    categoria: 'concurso',
    concurso: 'inss',
    preco: 35.90,
    capaUrl: 'https://ycagvwsvccgdjzpbhrfi.supabase.co/storage/v1/object/public/Editora/Capas%203D/7.png',
    destaque: true,
    ativo: true,
    checkoutStatus: 'validated',
    linkCheckout: 'https://pay.cakto.com.br/r5nx6k2',
    descricaoCurta: 'Caderno de questões com gabarito para o cargo de Técnico do Seguro Social do INSS.',
    descricaoCompleta: `Material focado na resolução prática de questões com gabarito para o concurso de Técnico do Seguro Social do INSS.

Formato digital em PDF voltado para o treinamento e autoavaliação do candidato.`,
    oQueRecebe: [
      'Caderno de questões digital em formato PDF',
      'Exercícios com gabarito para conferência',
      'Acesso ao arquivo digital para download após a confirmação',
    ],
    fichaTecnica: {
      instituicao: 'Instituto Nacional do Seguro Social (INSS)',
      cargo: 'Técnico do Seguro Social',
      formato: 'Digital (PDF)',
      entrega: 'Download digital (PDF)',
      ano: '2026',
    },
    topicosCobertos: [],
  },
  {
    slug: 'bb-2026-questoes',
    titulo: 'Caderno de Questões Banco do Brasil 2026 — Escriturário',
    tipo: 'questoes',
    categoria: 'concurso',
    concurso: 'bb',
    preco: 33.90,
    capaUrl: 'https://ycagvwsvccgdjzpbhrfi.supabase.co/storage/v1/object/public/Editora/Capas%203D/9.png',
    destaque: true,
    ativo: true,
    checkoutStatus: 'pending',
    emAtualizacao: true,
    descricaoCurta: 'Caderno de questões com gabarito para a carreira de Escriturário do Banco do Brasil.',
    descricaoCompleta: `Material de prática de questões com gabarito para o concurso de Escriturário do Banco do Brasil.

Projetado para fixação de conteúdo e simulação prática de provas em formato PDF.`,
    oQueRecebe: [
      'Caderno de questões digital em formato PDF',
      'Exercícios com gabarito incluso',
      'Acesso ao arquivo digital para download após a confirmação',
    ],
    fichaTecnica: {
      instituicao: 'Banco do Brasil (BB)',
      cargo: 'Escriturário (Agente Comercial / TI)',
      formato: 'Digital (PDF)',
      entrega: 'Download digital (PDF)',
      ano: '2026',
    },
    topicosCobertos: [],
  },
  {
    slug: 'bacen-2026-questoes',
    titulo: 'Caderno de Questões BACEN 2026 — Analista e Técnico',
    tipo: 'questoes',
    categoria: 'concurso',
    concurso: 'bacen',
    preco: 31.90,
    capaUrl: 'https://ycagvwsvccgdjzpbhrfi.supabase.co/storage/v1/object/public/Editora/Capas%203D/8.png',
    destaque: false,
    ativo: true,
    checkoutStatus: 'pending',
    emAtualizacao: true,
    descricaoCurta: 'Caderno de questões com gabarito para o concurso do Banco Central do Brasil.',
    descricaoCompleta: `Material prático de questões com gabarito voltado para as carreiras de Analista e Técnico do BACEN.

Arquivo digital em formato PDF para treino e fixação.`,
    oQueRecebe: [
      'Caderno de questões digital em formato PDF',
      'Exercícios com gabarito para consulta',
      'Acesso ao arquivo digital para download após a confirmação',
    ],
    fichaTecnica: {
      instituicao: 'Banco Central do Brasil (BACEN)',
      cargo: 'Analista / Técnico',
      formato: 'Digital (PDF)',
      entrega: 'Download digital (PDF)',
      ano: '2026',
    },
    topicosCobertos: [],
  },
  {
    slug: 'ata-mf-2026-questoes',
    titulo: 'Caderno de Questões ATA-MF 2026 — Assistente Técnico Administrativo',
    tipo: 'questoes',
    categoria: 'concurso',
    concurso: 'ata-mf',
    preco: 30.90,
    capaUrl: 'https://ycagvwsvccgdjzpbhrfi.supabase.co/storage/v1/object/public/Editora/Capas%203D/10.png',
    destaque: false,
    ativo: true,
    checkoutStatus: 'validated',
    linkCheckout: 'https://pay.cakto.com.br/7q9442u',
    descricaoCurta: 'Caderno de questões com gabarito para o cargo de Assistente Técnico Administrativo do Ministério da Fazenda.',
    descricaoCompleta: `Material de exercícios com gabarito para o concurso de Assistente Técnico Administrativo do Ministério da Fazenda (ATA-MF).

Disponibilizado em arquivo PDF para resolução e revisão prática.`,
    oQueRecebe: [
      'Caderno de questões digital em formato PDF',
      'Exercícios com gabarito para conferência',
      'Acesso ao arquivo digital para download após a confirmação',
    ],
    fichaTecnica: {
      instituicao: 'Ministério da Fazenda (ATA-MF)',
      cargo: 'Assistente Técnico Administrativo',
      formato: 'Digital (PDF)',
      entrega: 'Download digital (PDF)',
      ano: '2026',
    },
    topicosCobertos: [],
  },

  // =========================================================================
  // ===== 3. MATÉRIAS INDIVIDUAIS (7 PRODUTOS) =====
  // =========================================================================
  {
    slug: 'portugues-teorico',
    titulo: 'Apostila Língua Portuguesa',
    tipo: 'teorico',
    categoria: 'materia',
    materia: 'portugues',
    preco: 27.90,
    capaUrl: 'https://ycagvwsvccgdjzpbhrfi.supabase.co/storage/v1/object/public/Editora/Capas%203D/11.png',
    destaque: false,
    ativo: true,
    checkoutStatus: 'validated',
    linkCheckout: 'https://pay.cakto.com.br/8r3q4wd_1058829',
    descricaoCurta: 'Material digital de Língua Portuguesa com abordagem teórica e exercícios com gabarito para concursos públicos.',
    descricaoCompleta: `Apostila digital direcionada ao estudo da Língua Portuguesa para concursos públicos.

Reúne explanação teórica e exercícios com gabarito em formato digital para leitura em computadores, tablets ou celulares.`,
    oQueRecebe: [
      'Apostila digital em formato PDF',
      'Conteúdo teórico e exercícios da disciplina',
      'Acesso ao arquivo digital para download após a confirmação',
    ],
    fichaTecnica: {
      instituicao: 'Editora Edital Concursos',
      cargo: 'Material por Disciplina',
      formato: 'Digital (PDF)',
      entrega: 'Download digital (PDF)',
      ano: '2026',
    },
    topicosCobertos: [],
  },
  {
    slug: 'constitucional-teorico',
    titulo: 'Apostila Direito Constitucional',
    tipo: 'teorico',
    categoria: 'materia',
    materia: 'constitucional',
    preco: 26.90,
    capaUrl: 'https://ycagvwsvccgdjzpbhrfi.supabase.co/storage/v1/object/public/Editora/Capas%203D/15.png',
    destaque: false,
    ativo: true,
    checkoutStatus: 'validated',
    linkCheckout: 'https://pay.cakto.com.br/338agj9',
    descricaoCurta: 'Material digital de Direito Constitucional com conteúdo teórico e exercícios para concursos públicos.',
    descricaoCompleta: `Apostila digital estruturada para o estudo de Direito Constitucional em concursos públicos.

Contém tópicos teóricos da matéria e exercícios práticos com gabarito em formato PDF.`,
    oQueRecebe: [
      'Apostila digital em formato PDF',
      'Conteúdo teórico e exercícios da disciplina',
      'Acesso ao arquivo digital para download após a confirmação',
    ],
    fichaTecnica: {
      instituicao: 'Editora Edital Concursos',
      cargo: 'Material por Disciplina',
      formato: 'Digital (PDF)',
      entrega: 'Download digital (PDF)',
      ano: '2026',
    },
    topicosCobertos: [],
  },
  {
    slug: 'administrativo-teorico',
    titulo: 'Apostila Direito Administrativo',
    tipo: 'teorico',
    categoria: 'materia',
    materia: 'administrativo',
    preco: 25.90,
    capaUrl: 'https://ycagvwsvccgdjzpbhrfi.supabase.co/storage/v1/object/public/Editora/Capas%203D/16.png',
    destaque: false,
    ativo: true,
    checkoutStatus: 'validated',
    linkCheckout: 'https://pay.cakto.com.br/32fftrk',
    descricaoCurta: 'Material digital de Direito Administrativo com fundamentação teórica e exercícios para concursos públicos.',
    descricaoCompleta: `Material digital voltado para o estudo de Direito Administrativo em concursos públicos.

Formato digital em PDF para leitura e prática de exercícios.`,
    oQueRecebe: [
      'Apostila digital em formato PDF',
      'Conteúdo teórico e exercícios da disciplina',
      'Acesso ao arquivo digital para download após a confirmação',
    ],
    fichaTecnica: {
      instituicao: 'Editora Edital Concursos',
      cargo: 'Material por Disciplina',
      formato: 'Digital (PDF)',
      entrega: 'Download digital (PDF)',
      ano: '2026',
    },
    topicosCobertos: [],
  },
  {
    slug: 'adm-publica-teorico',
    titulo: 'Apostila Administração Pública',
    tipo: 'teorico',
    categoria: 'materia',
    materia: 'adm-publica',
    preco: 24.90,
    capaUrl: 'https://ycagvwsvccgdjzpbhrfi.supabase.co/storage/v1/object/public/Editora/Capas%203D/17.png',
    destaque: false,
    ativo: true,
    checkoutStatus: 'validated',
    linkCheckout: 'https://pay.cakto.com.br/k96xhqd',
    descricaoCurta: 'Material digital de Administração Pública com teoria e exercícios para concursos públicos.',
    descricaoCompleta: `Apostila digital com foco na matéria de Administração Pública para concursos.

Apresenta conteúdo didático e exercícios com gabarito em arquivo PDF.`,
    oQueRecebe: [
      'Apostila digital em formato PDF',
      'Conteúdo teórico e exercícios da disciplina',
      'Acesso ao arquivo digital para download após a confirmação',
    ],
    fichaTecnica: {
      instituicao: 'Editora Edital Concursos',
      cargo: 'Material por Disciplina',
      formato: 'Digital (PDF)',
      entrega: 'Download digital (PDF)',
      ano: '2026',
    },
    topicosCobertos: [],
  },
  {
    slug: 'matematica-teorico',
    titulo: 'Apostila Matemática Básica',
    tipo: 'teorico',
    categoria: 'materia',
    materia: 'matematica',
    preco: 23.90,
    capaUrl: 'https://ycagvwsvccgdjzpbhrfi.supabase.co/storage/v1/object/public/Editora/Capas%203D/12.png',
    destaque: false,
    ativo: true,
    checkoutStatus: 'validated',
    linkCheckout: 'https://pay.cakto.com.br/6z8oiok',
    descricaoCurta: 'Material digital de Matemática com teoria e exercícios com gabarito para concursos públicos.',
    descricaoCompleta: `Apostila digital voltada para a aprendizagem e treino de Matemática em concursos públicos.

Formato digital em PDF com teoria e exercícios práticos.`,
    oQueRecebe: [
      'Apostila digital em formato PDF',
      'Conteúdo teórico e exercícios da disciplina',
      'Acesso ao arquivo digital para download após a confirmação',
    ],
    fichaTecnica: {
      instituicao: 'Editora Edital Concursos',
      cargo: 'Material por Disciplina',
      formato: 'Digital (PDF)',
      entrega: 'Download digital (PDF)',
      ano: '2026',
    },
    topicosCobertos: [],
  },
  {
    slug: 'raciocinio-logico-teorico',
    titulo: 'Apostila Raciocínio Lógico',
    tipo: 'teorico',
    categoria: 'materia',
    materia: 'raciocinio-logico',
    preco: 21.90,
    capaUrl: 'https://ycagvwsvccgdjzpbhrfi.supabase.co/storage/v1/object/public/Editora/Capas%203D/13.png',
    destaque: false,
    ativo: true,
    checkoutStatus: 'validated',
    linkCheckout: 'https://pay.cakto.com.br/idwbr9d',
    descricaoCurta: 'Material digital de Raciocínio Lógico com conceitos teóricos e exercícios para concursos públicos.',
    descricaoCompleta: `Material didático digital estruturado para o estudo de Raciocínio Lógico em concursos públicos.

Formato digital em PDF para leitura e exercícios práticos.`,
    oQueRecebe: [
      'Apostila digital em formato PDF',
      'Conteúdo teórico e exercícios da disciplina',
      'Acesso ao arquivo digital para download após a confirmação',
    ],
    fichaTecnica: {
      instituicao: 'Editora Edital Concursos',
      cargo: 'Material por Disciplina',
      formato: 'Digital (PDF)',
      entrega: 'Download digital (PDF)',
      ano: '2026',
    },
    topicosCobertos: [],
  },
  {
    slug: 'informatica-teorico',
    titulo: 'Apostila Informática Básica',
    tipo: 'teorico',
    categoria: 'materia',
    materia: 'informatica',
    preco: 18.90,
    capaUrl: 'https://ycagvwsvccgdjzpbhrfi.supabase.co/storage/v1/object/public/Editora/Capas%203D/14.png',
    destaque: false,
    ativo: true,
    checkoutStatus: 'validated',
    linkCheckout: 'https://pay.cakto.com.br/kgv6a8y',
    descricaoCurta: 'Material digital de Informática Básica com conteúdo teórico e exercícios para concursos públicos.',
    descricaoCompleta: `Material digital voltado para o estudo de Informática Básica em concursos públicos.

Formato digital em PDF com teoria e exercícios com gabarito.`,
    oQueRecebe: [
      'Apostila digital em formato PDF',
      'Conteúdo teórico e exercícios da disciplina',
      'Acesso ao arquivo digital para download após a confirmação',
    ],
    fichaTecnica: {
      instituicao: 'Editora Edital Concursos',
      cargo: 'Material por Disciplina',
      formato: 'Digital (PDF)',
      entrega: 'Download digital (PDF)',
      ano: '2026',
    },
    topicosCobertos: [],
  },

  // =========================================================================
  // ===== 4. COMBOS OFICIAIS (5 PRODUTOS) =====
  // =========================================================================
  {
    slug: 'prf-2026-combo',
    titulo: 'Combo PRF 2026 — Apostila Teórica + Caderno de Questões',
    tipo: 'combo',
    categoria: 'combo',
    concurso: 'prf',
    preco: 69.90,
    capaUrl: 'https://ycagvwsvccgdjzpbhrfi.supabase.co/storage/v1/object/public/Editora/Capas%203D/1.png',
    comboInfo: {
      teoricoSlug: 'prf-2026-teorico',
      questoesSlug: 'prf-2026-questoes',
      capaTeorico: 'https://ycagvwsvccgdjzpbhrfi.supabase.co/storage/v1/object/public/Editora/Capas%203D/1.png',
      capaQuestoes: 'https://ycagvwsvccgdjzpbhrfi.supabase.co/storage/v1/object/public/Editora/Capas%203D/6.png',
    },
    destaque: false,
    ativo: true,
    checkoutStatus: 'validated',
    linkCheckout: 'https://pay.cakto.com.br/g6mv766',
    descricaoCurta: 'Pacote digital completo reunindo a Apostila Teórica e o Caderno de Questões para Agente Administrativo da PRF.',
    descricaoCompleta: `Combo preparatório oficial que reúne os dois materiais digitais da Editora Edital Concursos para o cargo de Agente Administrativo da PRF:

1. Apostila Teórica PRF 2026 (Agente Administrativo)
2. Caderno de Questões PRF 2026 (Agente Administrativo)

Ambos os materiais são disponibilizados em arquivos digitais PDF para download.`,
    oQueRecebe: [
      'Apostila Teórica Digital PRF 2026 (PDF)',
      'Caderno de Questões Digital PRF 2026 (PDF)',
      'Acesso aos dois arquivos digitais para download após a confirmação',
    ],
    fichaTecnica: {
      instituicao: 'Polícia Rodoviária Federal (PRF)',
      cargo: 'Agente Administrativo',
      formato: 'Digital (2 arquivos em PDF)',
      entrega: 'Download digital (PDF)',
      ano: '2026',
    },
    topicosCobertos: [],
  },
  {
    slug: 'inss-2026-combo',
    titulo: 'Combo INSS 2026 — Apostila Teórica + Caderno de Questões',
    tipo: 'combo',
    categoria: 'combo',
    concurso: 'inss',
    preco: 66.90,
    capaUrl: 'https://ycagvwsvccgdjzpbhrfi.supabase.co/storage/v1/object/public/Editora/Capas%203D/2.png',
    comboInfo: {
      teoricoSlug: 'inss-2026-teorico',
      questoesSlug: 'inss-2026-questoes',
      capaTeorico: 'https://ycagvwsvccgdjzpbhrfi.supabase.co/storage/v1/object/public/Editora/Capas%203D/2.png',
      capaQuestoes: 'https://ycagvwsvccgdjzpbhrfi.supabase.co/storage/v1/object/public/Editora/Capas%203D/7.png',
    },
    destaque: false,
    ativo: true,
    checkoutStatus: 'validated',
    linkCheckout: 'https://pay.cakto.com.br/35m3vfz',
    descricaoCurta: 'Pacote digital completo reunindo a Apostila Teórica e o Caderno de Questões para Técnico do Seguro Social do INSS.',
    descricaoCompleta: `Combo preparatório oficial que reúne os dois materiais digitais da Editora Edital Concursos para Técnico do Seguro Social do INSS:

1. Apostila Teórica INSS 2026 (Técnico do Seguro Social)
2. Caderno de Questões INSS 2026 (Técnico do Seguro Social)

Entregue em formato digital PDF para download.`,
    oQueRecebe: [
      'Apostila Teórica Digital INSS 2026 (PDF)',
      'Caderno de Questões Digital INSS 2026 (PDF)',
      'Acesso aos dois arquivos digitais para download após a confirmação',
    ],
    fichaTecnica: {
      instituicao: 'Instituto Nacional do Seguro Social (INSS)',
      cargo: 'Técnico do Seguro Social',
      formato: 'Digital (2 arquivos em PDF)',
      entrega: 'Download digital (PDF)',
      ano: '2026',
    },
    topicosCobertos: [],
  },
  {
    slug: 'bb-2026-combo',
    titulo: 'Combo Banco do Brasil 2026 — Apostila Teórica + Caderno de Questões',
    tipo: 'combo',
    categoria: 'combo',
    concurso: 'bb',
    preco: 64.90,
    capaUrl: 'https://ycagvwsvccgdjzpbhrfi.supabase.co/storage/v1/object/public/Editora/Capas%203D/4.png',
    comboInfo: {
      teoricoSlug: 'bb-2026-teorico',
      questoesSlug: 'bb-2026-questoes',
      capaTeorico: 'https://ycagvwsvccgdjzpbhrfi.supabase.co/storage/v1/object/public/Editora/Capas%203D/4.png',
      capaQuestoes: 'https://ycagvwsvccgdjzpbhrfi.supabase.co/storage/v1/object/public/Editora/Capas%203D/9.png',
    },
    destaque: false,
    ativo: true,
    checkoutStatus: 'pending',
    emAtualizacao: true,
    descricaoCurta: 'Pacote digital completo reunindo a Apostila Teórica e o Caderno de Questões para Escriturário do Banco do Brasil.',
    descricaoCompleta: `Combo preparatório oficial para o concurso de Escriturário do Banco do Brasil:

1. Apostila Teórica Banco do Brasil 2026 (Escriturário)
2. Caderno de Questões Banco do Brasil 2026 (Escriturário)

Arquivos digitais em PDF para download após a confirmação do pagamento.`,
    oQueRecebe: [
      'Apostila Teórica Digital Banco do Brasil 2026 (PDF)',
      'Caderno de Questões Digital Banco do Brasil 2026 (PDF)',
      'Acesso aos dois arquivos digitais para download após a confirmação',
    ],
    fichaTecnica: {
      instituicao: 'Banco do Brasil (BB)',
      cargo: 'Escriturário (Agente Comercial / TI)',
      formato: 'Digital (2 arquivos em PDF)',
      entrega: 'Download digital (PDF)',
      ano: '2026',
    },
    topicosCobertos: [],
  },
  {
    slug: 'bacen-2026-combo',
    titulo: 'Combo BACEN 2026 — Apostila Teórica + Caderno de Questões',
    tipo: 'combo',
    categoria: 'combo',
    concurso: 'bacen',
    preco: 62.90,
    capaUrl: 'https://ycagvwsvccgdjzpbhrfi.supabase.co/storage/v1/object/public/Editora/Capas%203D/3.png',
    comboInfo: {
      teoricoSlug: 'bacen-2026-teorico',
      questoesSlug: 'bacen-2026-questoes',
      capaTeorico: 'https://ycagvwsvccgdjzpbhrfi.supabase.co/storage/v1/object/public/Editora/Capas%203D/3.png',
      capaQuestoes: 'https://ycagvwsvccgdjzpbhrfi.supabase.co/storage/v1/object/public/Editora/Capas%203D/8.png',
    },
    destaque: false,
    ativo: true,
    checkoutStatus: 'pending',
    emAtualizacao: true,
    descricaoCurta: 'Pacote digital completo reunindo a Apostila Teórica e o Caderno de Questões para o concurso do Banco Central do Brasil.',
    descricaoCompleta: `Combo preparatório oficial para as carreiras de Analista e Técnico do Banco Central do Brasil (BACEN):

1. Apostila Teórica BACEN 2026 (Analista e Técnico)
2. Caderno de Questões BACEN 2026 (Analista e Técnico)

Formato digital em PDF para download.`,
    oQueRecebe: [
      'Apostila Teórica Digital BACEN 2026 (PDF)',
      'Caderno de Questões Digital BACEN 2026 (PDF)',
      'Acesso aos dois arquivos digitais para download após a confirmação',
    ],
    fichaTecnica: {
      instituicao: 'Banco Central do Brasil (BACEN)',
      cargo: 'Analista / Técnico',
      formato: 'Digital (2 arquivos em PDF)',
      entrega: 'Download digital (PDF)',
      ano: '2026',
    },
    topicosCobertos: [],
  },
  {
    slug: 'ata-mf-2026-combo',
    titulo: 'Combo ATA-MF 2026 — Apostila Teórica + Caderno de Questões',
    tipo: 'combo',
    categoria: 'combo',
    concurso: 'ata-mf',
    preco: 61.90,
    capaUrl: 'https://ycagvwsvccgdjzpbhrfi.supabase.co/storage/v1/object/public/Editora/Capas%203D/5.png',
    comboInfo: {
      teoricoSlug: 'ata-mf-2026-teorico',
      questoesSlug: 'ata-mf-2026-questoes',
      capaTeorico: 'https://ycagvwsvccgdjzpbhrfi.supabase.co/storage/v1/object/public/Editora/Capas%203D/5.png',
      capaQuestoes: 'https://ycagvwsvccgdjzpbhrfi.supabase.co/storage/v1/object/public/Editora/Capas%203D/10.png',
    },
    destaque: false,
    ativo: true,
    checkoutStatus: 'validated',
    linkCheckout: 'https://pay.cakto.com.br/m5yjj7h_884005',
    descricaoCurta: 'Pacote digital completo reunindo a Apostila Teórica e o Caderno de Questões para Assistente Técnico Administrativo do Ministério da Fazenda.',
    descricaoCompleta: `Combo preparatório oficial para o cargo de Assistente Técnico Administrativo do Ministério da Fazenda (ATA-MF):

1. Apostila Teórica ATA-MF 2026 (Assistente Técnico Administrativo)
2. Caderno de Questões ATA-MF 2026 (Assistente Técnico Administrativo)

Arquivos digitais em PDF para download após a confirmação do pagamento.`,
    oQueRecebe: [
      'Apostila Teórica Digital ATA-MF 2026 (PDF)',
      'Caderno de Questões Digital ATA-MF 2026 (PDF)',
      'Acesso aos dois arquivos digitais para download após a confirmação',
    ],
    fichaTecnica: {
      instituicao: 'Ministério da Fazenda (ATA-MF)',
      cargo: 'Assistente Técnico Administrativo',
      formato: 'Digital (2 arquivos em PDF)',
      entrega: 'Download digital (PDF)',
      ano: '2026',
    },
    topicosCobertos: [],
  },
];

// =========================================================================
// ===== FUNÇÕES REPOSITÓRIO / ACESSO CENTRAL AOS PRODUTOS =====
// =========================================================================

/**
 * Retorna todos os produtos ativos do catálogo
 */
export function getProdutosAtivos(): Produto[] {
  return produtos.filter((p) => p.ativo);
}

/**
 * Busca um produto por slug
 */
export function getProdutoBySlug(slug: string): Produto | undefined {
  return produtos.find((p) => p.slug === slug && p.ativo);
}

/**
 * Retorna produtos filtrados por concurso
 */
export function getProdutosPorConcurso(concurso: Concurso): Produto[] {
  return produtos.filter((p) => p.ativo && p.concurso === concurso);
}

/**
 * Retorna produtos filtrados por matéria
 */
export function getProdutosPorMateria(materia: Materia): Produto[] {
  return produtos.filter((p) => p.ativo && p.materia === materia);
}

/**
 * Retorna produtos filtrados por tipo
 */
export function getProdutosPorTipo(tipo: TipoProduto): Produto[] {
  return produtos.filter((p) => p.ativo && p.tipo === tipo);
}

/**
 * Helper para obter detalhes e cálculos do combo de forma 100% dinâmica
 * Calcula: valorSeparado = teorico.preco + questoes.preco
 *          economia = valorSeparado - combo.preco
 */
export function getDetalhesCombo(combo: Produto): DetalhesCombo | null {
  if (combo.tipo !== 'combo' || !combo.concurso) return null;

  const teorico = produtos.find(
    (p) => p.ativo && p.concurso === combo.concurso && p.tipo === 'teorico'
  );
  const questoes = produtos.find(
    (p) => p.ativo && p.concurso === combo.concurso && p.tipo === 'questoes'
  );

  if (!teorico || !questoes) return null;

  const precoTeorico = teorico.preco;
  const precoQuestoes = questoes.preco;
  const valorSeparado = Number((precoTeorico + precoQuestoes).toFixed(2));
  const economia = Number((valorSeparado - combo.preco).toFixed(2));
  const economiaPercentual = Number(((economia / valorSeparado) * 100).toFixed(1));

  return {
    teoricoSlug: teorico.slug,
    questoesSlug: questoes.slug,
    capaTeorico: teorico.capaUrl,
    capaQuestoes: questoes.capaUrl,
    precoTeorico,
    precoQuestoes,
    valorSeparado,
    economia,
    economiaPercentual,
  };
}

/**
 * Retorna produtos relacionados para exibição em páginas individuais
 */
export function getProdutosRelacionados(produtoAtual: Produto, limit = 3): Produto[] {
  return produtos
    .filter((p) => {
      if (!p.ativo || p.slug === produtoAtual.slug) return false;
      // Se for concurso, não inclui o complemento direto que já está na seção de vantagem
      if (produtoAtual.concurso && p.concurso === produtoAtual.concurso) return false;
      return true;
    })
    .slice(0, limit);
}

// Mapeamentos para labels legíveis
export const labelsMaterias: Record<Materia, string> = {
  'portugues': 'Língua Portuguesa',
  'matematica': 'Matemática',
  'raciocinio-logico': 'Raciocínio Lógico',
  'informatica': 'Informática',
  'constitucional': 'Direito Constitucional',
  'administrativo': 'Direito Administrativo',
  'adm-publica': 'Administração Pública',
};

export const labelsConcursos: Record<Concurso, string> = {
  'prf': 'PRF',
  'inss': 'INSS',
  'bacen': 'BACEN',
  'bb': 'Banco do Brasil',
  'ata-mf': 'ATA-MF',
};
