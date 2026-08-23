export interface Landing {
  slug: string;
  concursoSigla: string;
  concursoNomeCompleto: string;
  cargo: string;
  
  // Hero
  headlinePrincipal: string;
  subheadline: string;
  
  // Capa do livro
  capaUrl: string;
  
  // Preço
  preco: number;
  precoOriginal?: number;
  parcelamento: string;
  
  // Sobre o concurso
  sobreConcurso: {
    vagas: string;
    salarioInicial: string;
    nivelEscolaridade: string;
    statusEdital: string;
    proximaProva: string;
  };
  
  // Conteúdo
  oQueRecebe: string[];
  conteudoProgramatico: string[];
  
  // Conversão
  linkCheckout: string;
  
  // Depoimentos
  depoimentos?: {
    nome: string;
    texto: string;
    foto?: string;
  }[];
  
  // Páginas do material por dentro (opcional)
  paginasPreview?: string[];

  // Selo de urgência (opcional)
  seloPromocional?: string; // ex: "🔥 Oferta de lançamento"
}

export const landings: Landing[] = [
  // ===== ATA-MF (Foco principal de tráfego pago) =====
  {
    slug: 'ata-mf-2026',
    concursoSigla: 'ATA-MF',
    concursoNomeCompleto: 'Ministério da Fazenda',
    cargo: 'Assistente Técnico Administrativo',
    headlinePrincipal: 'Sua aprovação no {{destaque}}ATA-MF{{/destaque}} começa com o material certo.',
    subheadline: 'Apostila completa, atualizada conforme o último edital, com questões comentadas das principais bancas.',
    capaUrl: 'https://i.ibb.co/B24z6Cw2/1.png',
    preco: 57.80,
    parcelamento: '6x de R$ 9,63',
    sobreConcurso: {
      vagas: '1.319',
      salarioInicial: 'R$ 6.120,00',
      nivelEscolaridade: 'Ensino Médio',
      statusEdital: 'Previsto',
      proximaProva: '2º semestre de 2026',
    },
    oQueRecebe: [
      'Conteúdo teórico completo conforme o último edital',
      'Questões comentadas das principais bancas',
      'Box de dicas, mnemônicos e fluxogramas',
      'Acesso vitalício ao material em PDF',
      'Suporte direto com a editora pelo WhatsApp',
    ],
    conteudoProgramatico: [
      'Língua Portuguesa',
      'Raciocínio Lógico-Matemático',
      'Noções de Informática',
      'Ética no Serviço Público',
      'Gestão de Pessoas e do Atendimento ao Público',
      'Administração Pública',
      'Regime Jurídico dos Agentes Públicos',
    ],
    linkCheckout: 'https://pay.cakto.com.br/m5yjj7h_884005',
    seloPromocional: '🔥 Oferta de lançamento',
    depoimentos: [
      {
        nome: 'Marcos Oliveira',
        texto: 'Material fantástico! A parte de Legislação e Administração Pública está muito bem resumida, direto ao ponto. Consegui entender tópicos que sempre tive dificuldade.',
        foto: 'https://i.ibb.co/LhzFBCnD/Whats-App-Image-2026-02-04-at-23-43-59.jpg'
      },
      {
        nome: 'Juliana Santos',
        texto: 'As questões comentadas são o grande diferencial. Ver a explicação de cada alternativa me ajudou demais a entender a lógica da banca. Recomendo!',
        foto: 'https://i.ibb.co/0jSmzbh2/Whats-App-Image-2026-02-02-at-22-12-02vv.jpg'
      },
      {
        nome: 'Ricardo Lima',
        texto: 'Apostila muito bem organizada e fácil de ler. O PDF é ótimo para estudar pelo tablet. Valeu cada centavo pela qualidade técnica do conteúdo.',
        foto: 'https://i.ibb.co/hxmKR8qX/Whats-App-Image-2026-02-02-at-2.jpg'
      },
      {
        nome: 'Patrícia Souza',
        texto: 'Fiquei impressionada com a rapidez da entrega. Em menos de 2 minutos recebi o link da área de membros e já comecei a estudar. Conteúdo nota 10!',
        foto: 'https://i.ibb.co/yFZLS7kB/Whats-App-Image-2026-02-02-at-22-12-01.jpg'
      },
      {
        nome: 'Felipe Menezes',
        texto: 'Estava procurando um material focado para o Ministério da Fazenda e este é, sem dúvida, o melhor custo-benefício. Didática excelente.',
        foto: 'https://i.ibb.co/60p7XvNN/Whats-App-Image-2026-02-02-at-22-12-02rv.jpg'
      }
    ],
    paginasPreview: [
      'https://i.ibb.co/GQNWPHSS/1.png',
      'https://i.ibb.co/TB7Xb7d0/2.png',
      'https://i.ibb.co/hJWMr9KG/3.png',
      'https://i.ibb.co/Hf1rHVcV/4.png'
    ],
  },
  
  // ===== INSS =====
  {
    slug: 'inss-2026',
    concursoSigla: 'INSS',
    concursoNomeCompleto: 'Instituto Nacional do Seguro Social',
    cargo: 'Técnico do Seguro Social',
    headlinePrincipal: 'Sua aprovação no INSS começa aqui.',
    subheadline: 'Apostila completa para Técnico do Seguro Social, atualizada conforme o último edital.',
    capaUrl: 'https://i.ibb.co/0RW9Qz3P/2.png',
    preco: 62.70,
    precoOriginal: 89.90,
    parcelamento: '6x de R$ 10,45',
    sobreConcurso: {
      vagas: 'Em definição',
      salarioInicial: 'R$ 5.905,79',
      nivelEscolaridade: 'Ensino Médio',
      statusEdital: 'Previsto',
      proximaProva: 'A confirmar',
    },
    oQueRecebe: [
      'Conteúdo teórico completo conforme o último edital',
      'Questões comentadas das principais bancas',
      'Box de dicas, mnemônicos e fluxogramas',
      'Acesso vitalício ao material em PDF',
      'Suporte direto com a editora pelo WhatsApp',
    ],
    conteudoProgramatico: [
      'Língua Portuguesa',
      'Raciocínio Lógico-Matemático',
      'Noções de Informática',
      'Ética no Serviço Público',
      'Noções de Direito Constitucional',
      'Noções de Direito Administrativo',
      'Conhecimentos Específicos (Seguridade Social)',
    ],
    linkCheckout: 'https://pay.cakto.com.br/35m3vfz',
    seloPromocional: '💰 Promoção especial',
  },
  
  // ===== PRF =====
  {
    slug: 'prf-2026',
    concursoSigla: 'PRF',
    concursoNomeCompleto: 'Polícia Rodoviária Federal',
    cargo: 'Agente Administrativo',
    headlinePrincipal: 'Conquiste sua vaga na PRF.',
    subheadline: 'Apostila completa para Agente Administrativo da Polícia Rodoviária Federal.',
    capaUrl: 'https://i.ibb.co/WWCr1JrL/3.png',
    preco: 24.00,
    precoOriginal: 46.00,
    parcelamento: '2x de R$ 12,00',
    sobreConcurso: {
      vagas: 'Em definição',
      salarioInicial: 'R$ 9.473,57',
      nivelEscolaridade: 'Ensino Médio',
      statusEdital: 'Previsto',
      proximaProva: 'A confirmar',
    },
    oQueRecebe: [
      'Conteúdo teórico completo conforme o último edital',
      'Questões comentadas das principais bancas',
      'Box de dicas, mnemônicos e fluxogramas',
      'Acesso vitalício ao material em PDF',
      'Suporte direto com a editora pelo WhatsApp',
    ],
    conteudoProgramatico: [
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
    seloPromocional: '⚡ Promoção Semanal Limitada',
    paginasPreview: [
      'https://i.ibb.co/YBQ6cky1/1.png',
      'https://i.ibb.co/XxFq1Vb6/2.png',
      'https://i.ibb.co/wZJMm7Y9/3.png',
      'https://i.ibb.co/0jm5jMFC/4.png',
      'https://i.ibb.co/d4XFWJ2m/5.png'
    ],
    depoimentos: [
      {
        nome: 'Leonardo',
        texto: 'Excelente conteúdo! Muito organizado e direto na teoria que realmente cai na prova da PRF. Recomendo demais!',
        foto: 'https://i.ibb.co/wNzJMxT4/Whats-App-Image-2026-02-02-at-2.jpg'
      },
      {
        nome: 'Michele',
        texto: 'O combo com o caderno de questões é maravilhoso! Já estava cansada de estudar com materiais desatualizados na internet. Esse material salvou a minha preparação.',
        foto: 'https://i.ibb.co/9mdY0nqK/Whats-App-Image-2026-02-02-at-22-12-01.jpg'
      },
      {
        nome: 'Roberta',
        texto: 'Amei a didática da parte de Legislação Aplicada à PRF! Super mastigada, com quadros resumos maravilhosos que facilitam demais a memorização rápida.',
        foto: 'https://i.ibb.co/k6xTvXYK/Whats-App-Image-2026-02-02-at-22-12-01bzfdeb.jpg'
      },
      {
        nome: 'André',
        texto: 'Apostila muito detalhada e bem formatada. O fato de ter acesso vitalício pelo Google Drive ajuda muito a estudar em qualquer lugar e a qualquer hora.',
        foto: 'https://i.ibb.co/0pCTV3pJ/Whats-App-Image-2026-02-02-at-22-12-02g-dfb.jpg'
      },
      {
        nome: 'Guilherme',
        texto: 'Focado 100% no edital de Agente Administrativo da PRF. Sem rodeios e sem perda de tempo teórica. O melhor investimento que eu fiz este ano.',
        foto: 'https://i.ibb.co/Jj69RTXG/Whats-App-Image-2026-02-04-at-23-43-59.jpg'
      },
      {
        nome: 'Andressa',
        texto: 'Suporte excelente e envio super rápido! O material de questões comentadas é crucial para fixar a teoria de forma eficiente. Nota 10 pro atendimento!',
        foto: 'https://i.ibb.co/JFpQ3h0D/Whats-App-Image-2026-02-02-at-22-12-02vv.jpg'
      }
    ],
  },
];
