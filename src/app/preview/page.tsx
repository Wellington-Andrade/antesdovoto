import { ContentCard } from "@/components/Cards";
import {
  cards,
  candidates,
  categories,
  chapters,
  sources,
  tags,
} from "@/data/demo-content";
import { legalStatuses } from "@/data/types";
import { Preferences } from "@/components/Preferences";
import { ContentCatalog } from "@/components/ContentCatalog";
export const metadata = {
  title: "Catálogo de componentes",
  robots: { index: false, follow: false },
};
export default function Page() {
  const fact = cards.find((c) => c.type === "fact")!;
  return (
    <Preferences storageKey={null}>
      <ContentCatalog
        data={{ cards, candidates, categories, chapters, sources, tags }}
      >
        <div className="page-wrap preview-page">
          <span className="eyebrow">DESENVOLVIMENTO / DESIGN SYSTEM</span>
          <h1>
            Um sistema.
            <br />
            <span className="purple">Muitas formas de descobrir.</span>
          </h1>
          <p className="page-intro">
            Catálogo interno de desenvolvimento, sem autenticação nesta etapa.
            Todos os tipos, estados e conteúdos demonstrativos.
          </p>
          <nav className="preview-links" aria-label="Tipos de cards">
            {cards.map((c) => (
              <a key={c.id} href={"#preview-" + c.id}>
                {c.type}
              </a>
            ))}
          </nav>
          <div className="preview-grid">
            {cards.map((card) => (
              <section id={"preview-" + card.id} key={card.id}>
                <span className="eyebrow">
                  {card.type} / {card.id}
                </span>
                <ContentCard card={card} />
              </section>
            ))}
          </div>
          <h2>Texto longo e imagem opcional</h2>
          <ContentCard
            card={{
              ...fact,
              title:
                "Um título mais longo para testar a leitura, o espaçamento e a adaptação da interface em diferentes tamanhos de tela.",
              shortText:
                "Texto fictício para conferir que o conteúdo permanece legível sem cortes. ".repeat(
                  6,
                ),
              image: {
                url: "/placeholder.svg",
                alt: "Ilustração geométrica demonstrativa",
              },
            }}
          />
          <h2>Todos os status jurídicos</h2>
          <p>Variações visuais; não representam processos reais.</p>
          <div className="status-catalog">
            {legalStatuses.map((status) => (
              <span key={status} className="legal-status">
                {status}
              </span>
            ))}
          </div>
        </div>
      </ContentCatalog>
    </Preferences>
  );
}
