import Link from "next/link";
import { notFound } from "next/navigation";
import { contentRepository, formatDate } from "@/lib/repository";
import { ContentCard } from "@/components/Cards";
export function generateStaticParams() {
  return contentRepository.getCards().map((c) => ({ id: c.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const card = contentRepository.getCard(id);
  if (!card) return { title: "Conteúdo não encontrado" };
  return {
    title: card.title,
    description: card.shortText,
    alternates: { canonical: "/fato/" + id },
    openGraph: {
      title: card.title,
      description: card.shortText,
      url: "/fato/" + id,
      type: "article",
      images: [
        { url: "/fato/" + id + "/opengraph-image", width: 1200, height: 630 },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: card.title,
      description: card.shortText,
      images: ["/fato/" + id + "/opengraph-image"],
    },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const card = contentRepository.getCard(id);
  if (!card) notFound();
  return (
    <div className="standalone page-wrap">
      <span className="eyebrow">INFORMAÇÃO ABERTA. CONTEXTO COMPLETO.</span>
      <ContentCard card={card} />
      <section className="standalone-context">
        <h1>Contexto e evidências</h1>
        <p>{card.fullContext}</p>
        <p>Atualizado em {formatDate(card.date)} · Curadoria inicial</p>
        <h2>Fontes deste conteúdo</h2>
        {card.sourceIds.map((id) => {
          const s = contentRepository.getSources().find((s) => s.id === id)!;
          return (
            <p key={id}>
              <a href={s.url} target="_blank" rel="noopener noreferrer">
                {s.title} ↗
              </a>{" "}
              — {s.organization}
            </p>
          );
        })}
      </section>
      <Link className="button primary" href={"/experiencia?card=" + card.id}>
        Continuar a experiência completa →
      </Link>
    </div>
  );
}
