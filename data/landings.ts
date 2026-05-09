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
  linkKiwify: string;
  
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
    headlinePrincipal: 'Sua aprovação no ATA-MF começa com o material certo.',
    subheadline: 'Apostila completa, atualizada conforme o último edital, com questões comentadas das principais bancas.',
    capaUrl: 'https://i.ibb.co/9xxfrTG/ata-mf-png-removebg-preview.png',
    preco: 99.90,
    parcelamento: '8x de R$ 12,49',
    sobreConcurso: {
      vagas: 'Em definição',
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
    linkKiwify: 'https://pay.kiwify.com.br/PLACEHOLDER-ATA-MF',
    seloPromocional: '🔥 Oferta de lançamento',
  },
  
  // ===== INSS =====
  {
    slug: 'inss-2026',
    concursoSigla: 'INSS',
    concursoNomeCompleto: 'Instituto Nacional do Seguro Social',
    cargo: 'Técnico do Seguro Social',
    headlinePrincipal: 'Sua aprovação no INSS começa aqui.',
    subheadline: 'Apostila completa para Técnico do Seguro Social, atualizada conforme o último edital.',
    capaUrl: 'https://i.ibb.co/qZ04RSs/inss-png-removebg-preview.png',
    preco: 89.90,
    precoOriginal: 129.90,
    parcelamento: '8x de R$ 11,24',
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
    linkKiwify: 'https://pay.kiwify.com.br/PLACEHOLDER-INSS',
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
    capaUrl: 'https://i.ibb.co/mCWQm6YC/prf-png-removebg-preview.png',
    preco: 109.90,
    parcelamento: '9x de R$ 12,21',
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
    linkKiwify: 'https://pay.kiwify.com.br/PLACEHOLDER-PRF',
    seloPromocional: '🔥 Oferta de lançamento',
  },
  
  // ===== SEDES-DF =====
  {
    slug: 'sedes-df-2026',
    concursoSigla: 'SEDES-DF',
    concursoNomeCompleto: 'Secretaria de Desenvolvimento Social do Distrito Federal',
    cargo: 'Técnico Administrativo / Técnico em Assistência Social',
    headlinePrincipal: 'SEDES-DF: a vaga é sua.',
    subheadline: 'Material completo para os cargos de Técnico Administrativo e Técnico em Assistência Social.',
    capaUrl: 'https://i.ibb.co/bgfWSfFN/sedes-df-png-removebg-preview.png',
    preco: 79.90,
    precoOriginal: 99.90,
    parcelamento: '7x de R$ 11,41',
    sobreConcurso: {
      vagas: 'Em definição',
      salarioInicial: 'R$ 4.840,00',
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
      'Atualidades',
      'Noções de Direito Constitucional',
      'Noções de Direito Administrativo',
      'Conhecimentos Específicos (Assistência Social)',
    ],
    linkKiwify: 'https://pay.kiwify.com.br/PLACEHOLDER-SEDES-DF',
    seloPromocional: '💰 Promoção especial',
  },
];
