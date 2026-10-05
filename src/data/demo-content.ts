import { Card, Candidate, Chapter, Source } from "./types";
export const project = {
  name: "Antes do voto",
  version: "0.1.0",
  updatedAt: "2026-10-05",
  author: "[NOME]",
  contact: "",
  isDemo: true,
};
export const candidates: Candidate[] = [
  {
    id: "a",
    name: "CANDIDATO A",
    label: "A",
    description:
      "Perfil demonstrativo. Trajetória, formação e atuação serão adicionadas após a curadoria.",
  },
  {
    id: "b",
    name: "CANDIDATO B",
    label: "B",
    description:
      "Perfil demonstrativo. Trajetória, formação e atuação serão adicionadas após a curadoria.",
  },
];
export const categories = [
  { id: "perfil", name: "Perfil e trajetória" },
  { id: "educacao", name: "Educação" },
  { id: "internacional", name: "Relações internacionais" },
  { id: "justica", name: "Registros e Justiça" },
  { id: "metodo", name: "Verificação" },
];
export const tags = [
  { id: "exemplo", name: "Exemplo fictício" },
  { id: "documento", name: "Documentos" },
  { id: "indicador", name: "Indicadores" },
];
export const sources: Source[] = [
  {
    id: "s1",
    title: "Documento demonstrativo de trajetória",
    organization: "Arquivo Exemplo",
    url: "/documentos/trajetoria.html",
    publicationDate: "2026-01-10",
    accessedAt: "2026-10-05",
    sourceType: "Documento oficial",
    primarySource: true,
    isDemo: true,
  },
  {
    id: "s2",
    title: "Caderno do Programa Educacional Exemplo",
    organization: "Instituto Fictício",
    url: "/documentos/educacao.html",
    publicationDate: "2026-02-15",
    accessedAt: "2026-10-05",
    sourceType: "Banco de dados",
    primarySource: true,
    isDemo: true,
  },
  {
    id: "s3",
    title: "Entrevista demonstrativa — transcrição",
    organization: "Acervo Demonstrativo",
    url: "/documentos/entrevista.html",
    publicationDate: "2026-03-20",
    accessedAt: "2026-10-05",
    sourceType: "Entrevista",
    primarySource: true,
    isDemo: true,
  },
  {
    id: "s4",
    title: "Registro processual fictício",
    organization: "Órgão Demonstrativo",
    url: "/documentos/registro.html",
    publicationDate: "2026-04-12",
    accessedAt: "2026-10-05",
    sourceType: "Decisão judicial",
    primarySource: true,
    isDemo: true,
  },
  {
    id: "s5",
    title: "Nota de contexto demonstrativa",
    organization: "Observatório Exemplo",
    url: "/documentos/contexto.html",
    publicationDate: "2026-05-01",
    accessedAt: "2026-10-05",
    sourceType: "Outras",
    primarySource: false,
    isDemo: true,
  },
];
const base = {
  isDemo: true,
  date: "2026-05-01",
  tags: ["exemplo"],
  fullContext:
    "Este conteúdo é inteiramente fictício e demonstra a estrutura editorial. Na versão com curadoria, este espaço apresentará os antecedentes, o recorte temporal, as limitações da informação e as evidências pertinentes. Nenhum destes exemplos descreve pessoas, propostas ou acontecimentos reais.",
};
export const cards: Card[] = [
  {
    ...base,
    id: "conheca-os-perfis",
    chapterId: "quem-sao",
    type: "fact",
    title: "Antes das opiniões, conheça a trajetória.",
    shortText:
      "Dois perfis. O mesmo espaço para conhecer formação, experiência e atuação pública.",
    candidateIds: ["a", "b"],
    categoryId: "perfil",
    sourceIds: ["s1", "s5"],
  },
  {
    ...base,
    id: "trajetoria-exemplo",
    chapterId: "historico",
    type: "timeline",
    title: "Uma trajetória precisa de contexto.",
    shortText:
      "Explore uma sequência de acontecimentos inteiramente demonstrativos.",
    candidateIds: ["a"],
    categoryId: "perfil",
    sourceIds: ["s1"],
    events: [
      {
        id: "e1",
        date: "2018",
        title: "Início do projeto exemplo",
        text: "Marco fictício para demonstrar a linha do tempo.",
      },
      {
        id: "e2",
        date: "2022",
        title: "Publicação de relatório exemplo",
        text: "Um segundo marco, com contexto e documentação.",
      },
      {
        id: "e3",
        date: "2026",
        title: "Atualização demonstrativa",
        text: "Uma trajetória deve ser lida em sua sequência.",
      },
    ],
  },
  {
    ...base,
    id: "comparacao-educacao",
    chapterId: "educacao",
    type: "comparison",
    title: "Uma pauta. Duas propostas para examinar.",
    shortText: "Compare os mesmos critérios, lado a lado.",
    candidateIds: ["a", "b"],
    categoryId: "educacao",
    sourceIds: ["s2"],
    items: [
      {
        candidateId: "a",
        heading: "Programa Educacional Exemplo A",
        text: "Proposta fictícia de ampliação de bibliotecas. Metas e orçamento aguardam curadoria.",
      },
      {
        candidateId: "b",
        heading: "Programa Educacional Exemplo B",
        text: "Proposta fictícia de ampliação de laboratórios. Metas e orçamento aguardam curadoria.",
      },
    ],
  },
  {
    ...base,
    id: "indicador-educacional",
    chapterId: "educacao",
    type: "statistic",
    title: "O número é só o começo da conversa.",
    shortText:
      "Indicador fictício de participação no Programa Exemplo. Valores ilustrativos, sem relação com dados reais.",
    candidateIds: ["a", "b"],
    categoryId: "educacao",
    sourceIds: ["s2", "s5"],
    unit: "%",
    values: [
      { label: "2018", value: 35 },
      { label: "2022", value: 52 },
      { label: "2026", value: 68 },
    ],
  },
  {
    ...base,
    id: "declaracao-exemplo",
    chapterId: "mundo",
    type: "statement",
    title: "Uma frase, no seu contexto.",
    shortText:
      "Declaração inventada para demonstrar a apresentação de citações.",
    candidateIds: ["b"],
    categoryId: "internacional",
    sourceIds: ["s3"],
    person: "CANDIDATO B",
    quote: "“Este é um exemplo de declaração sobre cooperação internacional.”",
  },
  {
    ...base,
    id: "video-exemplo",
    chapterId: "mundo",
    type: "video",
    title: "Assista ao trecho. Confira o que veio antes.",
    shortText:
      "Espaço reservado para um vídeo curado, com origem e transcrição.",
    candidateIds: ["a"],
    categoryId: "internacional",
    sourceIds: ["s3"],
    timestamp: 42,
    transcript:
      "[Transcrição fictícia] Este trecho demonstra como uma fala será acompanhada de contexto e acesso à gravação original.",
  },
  {
    ...base,
    id: "status-exemplo",
    chapterId: "justica",
    type: "fact",
    title: "O status de um registro faz diferença.",
    shortText:
      "Um registro demonstrativo com status explícito. Uma etapa processual não deve ser confundida com outra.",
    candidateIds: ["a"],
    categoryId: "justica",
    sourceIds: ["s4", "s5"],
    status: "arquivado",
  },
  {
    ...base,
    id: "quiz-contexto",
    chapterId: "verifique",
    type: "quiz",
    title: "Um dado isolado conta a história toda?",
    shortText:
      "“O Indicador Exemplo cresceu. Isso comprova, sozinho, o sucesso do Programa Exemplo.”",
    candidateIds: [],
    categoryId: "metodo",
    sourceIds: ["s2", "s5"],
    answer: "Falta contexto",
    explanation:
      "Neste exemplo, a variação de um indicador não estabelece uma relação de causa e efeito.",
    evidence:
      "É necessário examinar metodologia, período e fatores externos. Os números apresentados são fictícios.",
  },
  {
    ...base,
    id: "documento-exemplo",
    chapterId: "verifique",
    type: "document",
    title: "A última palavra é da fonte.",
    shortText:
      "Veja o documento demonstrativo e descubra como as evidências ficarão acessíveis.",
    candidateIds: [],
    categoryId: "metodo",
    sourceIds: ["s1"],
    organization: "Arquivo Exemplo",
    documentType: "Documento HTML demonstrativo",
  },
];
export const chapters: Chapter[] = [
  {
    id: "quem-sao",
    title: "Quem são",
    description: "Conheça os dois perfis",
    estimatedSeconds: 35,
    cardIds: ["conheca-os-perfis"],
  },
  {
    id: "historico",
    title: "Histórico",
    description: "Conecte os acontecimentos",
    estimatedSeconds: 40,
    cardIds: ["trajetoria-exemplo"],
  },
  {
    id: "educacao",
    title: "Educação e políticas sociais",
    description: "Compare propostas e dados",
    estimatedSeconds: 70,
    cardIds: ["comparacao-educacao", "indicador-educacional"],
  },
  {
    id: "mundo",
    title: "Brasil no mundo",
    description: "Declarações em contexto",
    estimatedSeconds: 55,
    cardIds: ["declaracao-exemplo", "video-exemplo"],
  },
  {
    id: "justica",
    title: "Registros, controvérsias e Justiça",
    description: "Entenda cada status",
    estimatedSeconds: 40,
    cardIds: ["status-exemplo"],
  },
  {
    id: "verifique",
    title: "Verifique você mesmo",
    description: "Vá até a fonte",
    estimatedSeconds: 60,
    cardIds: ["quiz-contexto", "documento-exemplo"],
  },
];
