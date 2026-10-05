import {
  candidates,
  cards,
  categories,
  chapters,
  sources,
  tags,
} from "@/data/content";
import { validateContent } from "./validate-content";
export type ContentDataset = Omit<
  Parameters<typeof validateContent>[0],
  "categories" | "tags"
> & { categories: typeof categories; tags: typeof tags };
export function createContentRepository(data: ContentDataset) {
  const { candidates, cards, categories, chapters, sources, tags } = data;
  validateContent(data);
  // The UI consumes this boundary. Replace its implementation with a CMS adapter.
  return {
    getCandidates: () => candidates,
    getChapters: () => chapters,
    getCards: () =>
      chapters
        .flatMap((chapter) =>
          chapter.cardIds.map((id) => cards.find((card) => card.id === id)!),
        )
        .filter(Boolean),
    getCard: (id: string) => cards.find((card) => card.id === id),
    getSources: () => sources,
    getCategories: () => categories,
    getTags: () => tags,
  };
}
export const contentRepository = createContentRepository({
  candidates,
  cards,
  categories,
  chapters,
  sources,
  tags,
});
export const formatDate = (date?: string) =>
  date
    ? new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(
        new Date(date + "T12:00:00Z"),
      )
    : "Data não informada";
export const normalize = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
