import type { Card, Candidate, Chapter, Source } from "./types";
export const project = {
  name: "Antes do voto",
  version: "0.2.0",
  updatedAt: "2026-10-05",
  author: "[NOME]",
  contact: "",
  isDemo: false,
  edition: "SEGUNDO TURNO",
  contentNotice: "Curadoria inicial · Fontes consultadas em 05/10/2026.",
};
export const candidates: Candidate[] = [
  {
    id: "b",
    name: "Lula",
    label: "L",
    party: "PT",
    ballotNumber: "13",
    role: "Presidente da República",
    runningMate: "Geraldo Alckmin (PSB)",
    description:
      "Luiz Inácio Lula da Silva, nascido em Garanhuns (PE) em 27/10/1945. Metalúrgico e ex-sindicalista. Presidente em 2003–2010 e desde 2023.",
  },
  {
    id: "a",
    name: "Flávio Bolsonaro",
    label: "FB",
    party: "PL",
    ballotNumber: "22",
    role: "Senador pelo Rio de Janeiro",
    runningMate: "Alfredo Gaspar (PL)",
    description:
      "Advogado, nascido em Resende (RJ) em 30/04/1981. Senador desde 2019, após atuar como deputado estadual.",
  },
];
export const categories = [
  { id: "perfil", name: "Perfil e trajetória" },
  { id: "educacao", name: "Educação" },
  { id: "saude", name: "Saúde e assistência" },
  { id: "internacional", name: "Relações internacionais" },
  { id: "justica", name: "Segurança e Justiça" },
  { id: "metodo", name: "Verificação" },
];
export const tags = [
  { id: "documento", name: "Documentos" },
  { id: "trajetoria", name: "Trajetória" },
  { id: "proposta", name: "Propostas de 2026" },
  { id: "eleicoes", name: "Eleições 2026" },
  { id: "metodologia", name: "Metodologia" },
];
const tsePlans =
  "https://www.tse.jus.br/eleicoes/eleicoes-2026-content/propostas-de-governo-dos-candidatos-ao-cargo-de-presidente-da-republica-eleicoes-2026/";
const sourceBase = {
  accessedAt: "2026-10-05",
  isDemo: false,
  primarySource: true,
};
export const sources: Source[] = [
  {
    ...sourceBase,
    id: "tse-segundo-turno",
    title: "TSE confirma Flávio Bolsonaro e Lula no segundo turno",
    organization: "Tribunal Superior Eleitoral",
    url: "https://www.tse.jus.br/comunicacao/noticias/2026/Outubro/flavio-bolsonaro-e-lula-vao-disputar-o-2o-turno-para-a-presidencia-da-republica",
    publicationDate: "2026-10-05",
    sourceType: "Comunicação oficial",
  },
  {
    ...sourceBase,
    id: "senado-flavio",
    title: "Perfil parlamentar de Flávio Bolsonaro",
    organization: "Senado Federal",
    url: "https://www25.senado.leg.br/pt_BR/web/senadores/senador/-/perfil/5894",
    sourceType: "Perfil institucional",
  },
  {
    ...sourceBase,
    id: "camara-lula",
    title: "Biografia parlamentar de Luiz Inácio Lula da Silva",
    organization: "Câmara dos Deputados",
    url: "https://www.camara.leg.br/deputados/139289/biografia",
    sourceType: "Perfil institucional",
  },
  {
    ...sourceBase,
    id: "senado-trajetorias",
    title: "Trajetórias dos candidatos no segundo turno de 2026",
    organization: "Agência Senado",
    url: "https://www12.senado.leg.br/noticias/materias/2026/10/04/flavio-bolsonaro-e-lula-disputam-o-segundo-turno-das-eleicoes-para-presidente",
    publicationDate: "2026-10-04",
    sourceType: "Reportagem institucional",
    primarySource: false,
  },
  {
    ...sourceBase,
    id: "plano-flavio",
    title: "Plano de governo de Flávio Bolsonaro — PDF",
    organization: "Campanha de Flávio Bolsonaro · arquivo no TSE",
    url: "https://www.tse.jus.br/eleicoes/eleicoes-2026-content/arquivos/proposta-pl",
    sourceType: "Plano de governo",
  },
  {
    ...sourceBase,
    id: "plano-lula",
    title: "Plano de governo de Lula — PDF",
    organization: "Campanha de Lula · arquivo no TSE",
    url: "https://www.tse.jus.br/eleicoes/eleicoes-2026-content/arquivos/proposta-pt",
    sourceType: "Plano de governo",
  },
  {
    ...sourceBase,
    id: "tse-planos",
    title: "Planos de governo dos presidenciáveis — Eleições 2026",
    organization: "Tribunal Superior Eleitoral",
    url:
      tsePlans +
      "planos-de-governo-dos-candidatos-ao-cargo-de-presidente-da-republica-eleicoes-2026",
    sourceType: "Consulta eleitoral",
  },
  {
    ...sourceBase,
    id: "tse-temas-flavio",
    title: "Propostas de Flávio Bolsonaro por assunto",
    organization: "Tribunal Superior Eleitoral",
    url: tsePlans + "flavio-bolsonaro",
    sourceType: "Índice de propostas",
  },
  {
    ...sourceBase,
    id: "tse-temas-lula",
    title: "Propostas de Lula por assunto",
    organization: "Tribunal Superior Eleitoral",
    url: tsePlans + "lula-propostas-de-governo",
    sourceType: "Índice de propostas",
  },
];
const base = {
  isDemo: false,
  date: "2026-10-05",
  tags: ["documento"],
  evidenceType: "record" as const,
};
const proposalContext =
  "Recorte inicial dos planos apresentados para a eleição de 2026. A fonte primária é o programa de cada campanha, hospedado no TSE; o índice do Tribunal ajuda a localizar os assuntos. A presença de uma proposta no documento comprova o compromisso declarado, não sua execução, seu impacto ou sua viabilidade. Os planos não são uma avaliação independente. Compare também financiamento, prazos, responsabilidades e dependência de leis ou de outros entes públicos. Este resumo não esgota os documentos.";
export const cards: Card[] = [
  {
    ...base,
    id: "conheca-os-perfis",
    chapterId: "quem-sao",
    type: "fact",
    title: "Flávio Bolsonaro e Lula: quem são.",
    shortText:
      "Flávio disputa pelo PL, com o número 22. Lula disputa pelo PT, com o número 13. O TSE confirmou ambos no segundo turno.",
    candidateIds: ["b", "a"],
    categoryId: "perfil",
    tags: ["eleicoes", "trajetoria"],
    sourceIds: ["tse-segundo-turno", "senado-flavio", "camara-lula"],
    fullContext:
      "O perfil reúne identidade, partido, cargo e composição da chapa. Flávio concorre à Presidência pela primeira vez; Lula busca a reeleição. Os dados foram conferidos em páginas do TSE, do Senado e da Câmara em 05/10/2026. A apresentação de trajetórias não constitui uma avaliação de desempenho.",
  },
  {
    ...base,
    id: "trajetoria-flavio",
    chapterId: "historico",
    type: "timeline",
    title: "Flávio: da Assembleia do Rio ao Senado.",
    shortText:
      "Sua trajetória reúne mandatos no Legislativo estadual e federal.",
    candidateIds: ["a"],
    categoryId: "perfil",
    tags: ["trajetoria"],
    sourceIds: ["senado-flavio", "senado-trajetorias"],
    fullContext:
      "A linha do tempo apresenta marcos institucionais, sem medir qualidade de atuação. O perfil do Senado registra o período do mandato senatorial como 2019–2027. Projetos, relatorias, votos e prestação de contas podem ser consultados separadamente no perfil parlamentar.",
    events: [
      {
        id: "flavio-2003",
        date: "2003",
        title: "Deputado estadual",
        text: "Começa a atuar na Assembleia Legislativa do Rio de Janeiro.",
      },
      {
        id: "flavio-2019",
        date: "2019",
        title: "Senador pelo Rio de Janeiro",
        text: "Passa ao Senado Federal.",
      },
      {
        id: "flavio-2026",
        date: "2026",
        title: "Disputa a Presidência",
        text: "Concorre pelo PL e chega ao segundo turno.",
      },
    ],
  },
  {
    ...base,
    id: "trajetoria-lula",
    chapterId: "historico",
    type: "timeline",
    title: "Lula: do sindicalismo à Presidência.",
    shortText:
      "Sua trajetória reúne atuação sindical, mandato constituinte e mandatos no Executivo federal.",
    candidateIds: ["b"],
    categoryId: "perfil",
    tags: ["trajetoria"],
    sourceIds: ["camara-lula", "tse-segundo-turno"],
    fullContext:
      "A Câmara registra Lula como metalúrgico, dirigente sindical e deputado constituinte. O mandato parlamentar corresponde à legislatura 1987–1991. Os períodos presidenciais são apresentados como intervalos de governo; os marcos não equivalem a uma avaliação dos resultados de cada gestão.",
    events: [
      {
        id: "lula-1975",
        date: "1975",
        title: "Presidência do sindicato",
        text: "Preside o Sindicato dos Metalúrgicos de São Bernardo do Campo e Diadema.",
      },
      {
        id: "lula-1987",
        date: "1987–1991",
        title: "Deputado federal constituinte",
        text: "Representa São Paulo pelo PT e participa da Constituinte.",
      },
      {
        id: "lula-2003",
        date: "2003–2010",
        title: "Dois mandatos presidenciais",
        text: "Exerce a Presidência por dois mandatos consecutivos.",
      },
      {
        id: "lula-2023",
        date: "2023",
        title: "Retorno à Presidência",
        text: "Inicia seu terceiro mandato.",
      },
    ],
  },
  {
    ...base,
    id: "comparacao-educacao",
    chapterId: "educacao",
    type: "comparison",
    evidenceType: "proposal",
    title: "Educação: o que os planos propõem.",
    shortText:
      "Alfabetização e expansão de oportunidades aparecem nos dois programas, com escolhas distintas.",
    fullContext: proposalContext,
    candidateIds: ["b", "a"],
    categoryId: "educacao",
    tags: ["proposta"],
    sourceIds: [
      "plano-flavio",
      "plano-lula",
      "tse-temas-flavio",
      "tse-temas-lula",
    ],
    items: [
      {
        candidateId: "a",
        heading: "Aprendizagem e gestão escolar",
        text: "Propõe priorizar a alfabetização pelo método fônico, ampliar escolas cívico-militares e usar metas de aprendizagem na gestão escolar.",
        sourceIds: ["plano-flavio"],
        reference: "PDF, páginas 34–36",
      },
      {
        candidateId: "b",
        heading: "Cooperação e permanência",
        text: "Propõe seguir com o Criança Alfabetizada, expandir o ensino em tempo integral e manter o Pé-de-Meia.",
        sourceIds: ["plano-lula"],
        reference: "PDF, páginas 30–34",
      },
    ],
  },
  {
    ...base,
    id: "comparacao-saude",
    chapterId: "educacao",
    type: "comparison",
    evidenceType: "proposal",
    title: "Saúde: como cada programa aborda o acesso.",
    shortText:
      "Compare os instrumentos propostos para atendimento e medicamentos.",
    fullContext: proposalContext,
    candidateIds: ["b", "a"],
    categoryId: "saude",
    tags: ["proposta"],
    sourceIds: [
      "plano-flavio",
      "plano-lula",
      "tse-temas-flavio",
      "tse-temas-lula",
    ],
    items: [
      {
        candidateId: "a",
        heading: "Digitalização e serviços",
        text: "Propõe prontuário eletrônico integrado, uso de tecnologia para agendamento e entrega de medicamentos em domicílio.",
        sourceIds: ["plano-flavio"],
        reference: "PDF, páginas 25–26 e 37–39",
      },
      {
        candidateId: "b",
        heading: "Atenção e medicamentos",
        text: "Propõe continuidade do Agora Tem Especialistas, fortalecimento do Mais Médicos e da Farmácia Popular.",
        sourceIds: ["plano-lula"],
        reference: "PDF, páginas 34–40",
      },
    ],
  },
  {
    ...base,
    id: "comparacao-politica-externa",
    chapterId: "mundo",
    type: "comparison",
    evidenceType: "proposal",
    title: "Brasil no mundo: prioridades declaradas.",
    shortText: "Conheça recortes da política externa nos programas de 2026.",
    fullContext: proposalContext,
    candidateIds: ["b", "a"],
    categoryId: "internacional",
    tags: ["proposta"],
    sourceIds: [
      "plano-flavio",
      "plano-lula",
      "tse-temas-flavio",
      "tse-temas-lula",
    ],
    items: [
      {
        candidateId: "a",
        heading: "Comércio e integração",
        text: "Propõe retomar o processo de adesão à OCDE e ampliar a integração comercial e produtiva internacional.",
        sourceIds: ["plano-flavio"],
        reference: "PDF, páginas 62–63",
      },
      {
        candidateId: "b",
        heading: "Cooperação e clima",
        text: "Apresenta a Aliança Global contra a Fome e a Pobreza e a diplomacia climática entre as frentes internacionais.",
        sourceIds: ["plano-lula"],
        reference: "PDF, páginas 79–82",
      },
    ],
  },
  {
    ...base,
    id: "comparacao-seguranca",
    chapterId: "justica",
    type: "comparison",
    evidenceType: "proposal",
    title: "Segurança: compare medidas, não slogans.",
    shortText:
      "Um recorte das propostas para crime organizado e sistema de segurança.",
    fullContext:
      proposalContext +
      " Este card trata de políticas propostas, não de acusações ou processos pessoais dos candidatos.",
    candidateIds: ["b", "a"],
    categoryId: "justica",
    tags: ["proposta"],
    sourceIds: [
      "plano-flavio",
      "plano-lula",
      "tse-temas-flavio",
      "tse-temas-lula",
    ],
    items: [
      {
        candidateId: "a",
        heading: "Penas e fronteiras",
        text: "Propõe reduzir a maioridade penal para 16 anos e reforçar a atuação nas fronteiras.",
        sourceIds: ["plano-flavio"],
        reference: "PDF, página 13",
      },
      {
        candidateId: "b",
        heading: "Inteligência e finanças",
        text: "Propõe atingir as finanças do crime organizado e fortalecer a integração de inteligência e o controle de armas.",
        sourceIds: ["plano-lula"],
        reference: "PDF, páginas 26–28",
      },
    ],
  },
  {
    ...base,
    id: "quiz-contexto",
    chapterId: "verifique",
    type: "quiz",
    evidenceType: "method",
    title: "Publicar uma proposta comprova um resultado?",
    shortText:
      "“A proposta está no plano registrado no TSE. Logo, sua eficácia está comprovada.”",
    candidateIds: [],
    categoryId: "metodo",
    tags: ["metodologia"],
    sourceIds: ["tse-planos"],
    fullContext:
      "O portal do TSE reúne propostas apresentadas pelas candidaturas. Um registro de intenção não é um estudo de impacto. Para avaliar resultados, procure dados de implementação, indicadores, metodologia e estudos independentes. Essa distinção vale igualmente para os dois candidatos.",
    answer: "Falta contexto",
    explanation:
      "O registro permite conferir o que foi proposto. Ele não comprova que a medida funcionará ou já foi executada.",
    evidence:
      "A página do TSE explica que as informações vêm das propostas apresentadas pelos candidatos. A classificação aqui é uma orientação de leitura, não uma checagem de uma fala atribuída a um candidato.",
  },
  {
    ...base,
    id: "documento-planos",
    chapterId: "verifique",
    type: "document",
    evidenceType: "method",
    title: "Leia os programas completos.",
    shortText:
      "O TSE reúne os PDFs e os índices por assunto dos candidatos. Use os documentos para conferir os recortes apresentados aqui.",
    candidateIds: ["b", "a"],
    categoryId: "metodo",
    tags: ["documento", "proposta"],
    sourceIds: ["tse-planos", "plano-flavio", "plano-lula"],
    fullContext:
      "Abra o programa de cada candidato e leia os trechos ao redor das propostas resumidas. A seleção inicial cobre alguns temas; não é um inventário de tudo o que os candidatos defendem. Páginas sem data de publicação identificável são marcadas como “Data não informada”, com a data de consulta registrada separadamente.",
    organization: "Tribunal Superior Eleitoral",
    documentType: "Planos de governo · PDFs e índice temático",
  },
];
export const chapters: Chapter[] = [
  {
    id: "quem-sao",
    title: "Quem são",
    description: "Perfis, partidos e chapas",
    estimatedSeconds: 35,
    cardIds: ["conheca-os-perfis"],
  },
  {
    id: "historico",
    title: "Histórico",
    description: "Uma trajetória de cada vez",
    estimatedSeconds: 60,
    cardIds: ["trajetoria-flavio", "trajetoria-lula"],
  },
  {
    id: "educacao",
    title: "Educação e saúde",
    description: "Compare os programas",
    estimatedSeconds: 75,
    cardIds: ["comparacao-educacao", "comparacao-saude"],
  },
  {
    id: "mundo",
    title: "Brasil no mundo",
    description: "Prioridades internacionais",
    estimatedSeconds: 40,
    cardIds: ["comparacao-politica-externa"],
  },
  {
    id: "justica",
    title: "Segurança e Justiça",
    description: "Medidas propostas",
    estimatedSeconds: 40,
    cardIds: ["comparacao-seguranca"],
  },
  {
    id: "verifique",
    title: "Verifique você mesmo",
    description: "Dos resumos aos documentos",
    estimatedSeconds: 50,
    cardIds: ["quiz-contexto", "documento-planos"],
  },
];
