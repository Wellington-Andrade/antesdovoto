import type { Card, Chapter, Source, Candidate } from "@/data/types";
export function validateContent(data: {
  cards: Card[];
  chapters: Chapter[];
  sources: Source[];
  candidates: Candidate[];
  categories: { id: string }[];
  tags: { id: string }[];
}) {
  const fail = (message: string): never => {
    throw new Error(`Conteúdo inválido: ${message}`);
  };
  for (const [name, items] of Object.entries(data)) {
    const ids = items.map((item) => item.id);
    if (new Set(ids).size !== ids.length) fail(`IDs repetidos em ${name}.`);
    if (ids.some((id) => !id.trim())) fail(`ID vazio em ${name}.`);
  }
  if (!data.chapters.length) fail("configure pelo menos um capítulo.");
  const ids = (items: { id: string }[]) =>
    new Set(items.map((item) => item.id));
  const sourceIds = ids(data.sources),
    candidateIds = ids(data.candidates),
    categoryIds = ids(data.categories),
    tagIds = ids(data.tags);
  const assigned = new Set<string>();
  for (const chapter of data.chapters) {
    if (!chapter.cardIds.length || chapter.estimatedSeconds <= 0)
      fail(`capítulo ${chapter.id} precisa de cards e duração positiva.`);
    for (const id of chapter.cardIds) {
      const card = data.cards.find((c) => c.id === id);
      if (!card || card.chapterId !== chapter.id)
        fail(`referência ${id} no capítulo ${chapter.id}.`);
      if (assigned.has(id))
        fail(`card ${id} aparece mais de uma vez no percurso.`);
      assigned.add(id);
    }
  }
  for (const card of data.cards) {
    if (card.type === "comparison")
      for (const item of card.items) {
        if (!candidateIds.has(item.candidateId))
          fail(`candidato na comparação ${card.id}.`);
        if (
          item.sourceIds?.some(
            (id) => !sourceIds.has(id) || !card.sourceIds.includes(id),
          )
        )
          fail(`fonte na comparação ${card.id}.`);
      }
    if (
      !card.sourceIds.length ||
      card.sourceIds.some((id) => !sourceIds.has(id))
    )
      fail(`fontes do card ${card.id}.`);
    if (card.candidateIds.some((id) => !candidateIds.has(id)))
      fail(`candidato do card ${card.id}.`);
    if (
      !categoryIds.has(card.categoryId) ||
      card.tags.some((id) => !tagIds.has(id))
    )
      fail(`categoria ou tag do card ${card.id}.`);
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(card.date) ||
      Number.isNaN(Date.parse(card.date))
    )
      fail(`data do card ${card.id}.`);
  }
  for (const source of data.sources) {
    if (!source.url.startsWith("/") && !/^https?:\/\//.test(source.url))
      fail(`URL da fonte ${source.id}.`);
  }
}
