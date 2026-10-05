export const legalStatuses = [
  "investigação",
  "inquérito",
  "denúncia apresentada",
  "denúncia recebida",
  "ação em andamento",
  "condenado em primeira instância",
  "condenado",
  "absolvido",
  "arquivado",
  "decisão revertida",
  "decisão anulada",
  "informação contestada",
] as const;
export type LegalStatus = (typeof legalStatuses)[number];
export type Source = {
  id: string;
  title: string;
  organization: string;
  url: string;
  publicationDate?: string;
  accessedAt: string;
  sourceType: string;
  primarySource: boolean;
  archivedUrl?: string;
  isDemo: boolean;
};
export type Candidate = {
  id: string;
  name: string;
  label: string;
  description: string;
  party?: string;
  ballotNumber?: string;
  role?: string;
  runningMate?: string;
};
export type Chapter = {
  id: string;
  title: string;
  description: string;
  estimatedSeconds: number;
  cardIds: string[];
};
export type BaseCard = {
  id: string;
  chapterId: string;
  title: string;
  shortText: string;
  fullContext: string;
  candidateIds: string[];
  categoryId: string;
  tags: string[];
  date: string;
  sourceIds: string[];
  status?: LegalStatus;
  image?: { url: string; alt: string };
  isDemo: boolean;
  evidenceType?: "record" | "proposal" | "method";
};
export type Card = BaseCard &
  (
    | { type: "fact" }
    | {
        type: "comparison";
        items: {
          candidateId: string;
          heading: string;
          text: string;
          sourceIds?: string[];
          reference?: string;
        }[];
      }
    | {
        type: "quiz";
        answer: "Verdadeiro" | "Falso" | "Falta contexto";
        explanation: string;
        evidence: string;
      }
    | {
        type: "timeline";
        events: { id: string; date: string; title: string; text: string }[];
      }
    | {
        type: "statistic";
        unit: string;
        values: { label: string; value: number }[];
      }
    | {
        type: "video";
        videoUrl?: string;
        embedUrl?: string;
        captionsUrl?: string;
        timestamp: number;
        transcript: string;
      }
    | { type: "document"; organization: string; documentType: string }
    | { type: "statement"; person: string; quote: string }
  );
