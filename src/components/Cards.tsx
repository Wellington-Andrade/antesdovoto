"use client";
import { useState } from "react";
import Image from "next/image";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  CheckCheck,
  CirclePlay,
  FileText,
  Fingerprint,
  Quote,
  Share2,
} from "lucide-react";
import { Card } from "@/data/types";
import { formatDate } from "@/lib/repository";
import { useProgress } from "./Preferences";
import { ContextDrawer, SourceDrawer } from "./Drawers";
import { useContentRepository } from "./ContentCatalog";
export function CandidateBadge({ id }: { id: string }) {
  const contentRepository = useContentRepository();
  const c = contentRepository.getCandidates().find((c) => c.id === id);
  return c ? (
    <span className={`candidate-badge candidate-${id}`}>
      <span>{c.label}</span>
      {c.name}
    </span>
  ) : null;
}
export function ShareButton({ card }: { card: Card }) {
  const [message, setMessage] = useState("");
  async function share() {
    const url = new URL("/fato/" + card.id, window.location.origin).href;
    try {
      if (navigator.share)
        await navigator.share({
          title: card.title,
          text: card.isDemo
            ? "Exemplo fictício — Antes do voto"
            : "Antes do voto — Confira a fonte",
          url,
        });
      else {
        await navigator.clipboard.writeText(url);
        setMessage("Link copiado");
      }
    } catch (e) {
      if ((e as Error).name !== "AbortError") setMessage(url);
    }
  }
  return (
    <span className="share-wrap">
      <button
        className="icon-button"
        onClick={share}
        aria-label="Compartilhar card"
        disabled={card.isDemo}
        title={
          card.isDemo
            ? "Exemplos do catálogo não possuem publicação compartilhável."
            : "Compartilhar este conteúdo"
        }
      >
        <Share2 size={18} />
      </button>
      <span role="status" className="share-message">
        {message}
      </span>
    </span>
  );
}
export function FactCard({ card }: { card: Extract<Card, { type: "fact" }> }) {
  const contentRepository = useContentRepository();
  return card.candidateIds.length === 2 ? (
    <div className="profile-grid">
      {contentRepository.getCandidates().map((c) => (
        <div className={`profile profile-${c.id}`} key={c.id}>
          <div className="profile-avatar">
            <Fingerprint size={54} strokeWidth={1} />
            <span>{c.label}</span>
          </div>
          <CandidateBadge id={c.id} />
          {c.party && (
            <div className="profile-details">
              <strong>
                {c.party} · Número {c.ballotNumber}
              </strong>
              <span>{c.role}</span>
              <span>Vice: {c.runningMate}</span>
            </div>
          )}
          <p>{c.description}</p>
        </div>
      ))}
    </div>
  ) : (
    <div className="record-box">
      <FileText size={30} />
      <span>
        {card.isDemo ? "REGISTRO DEMONSTRATIVO" : "REGISTRO DOCUMENTADO"}
      </span>
      <strong>
        {card.status ||
          (card.isDemo ? "Informação de exemplo" : "Informação pública")}
      </strong>
      <p>Consulte a etapa e o contexto no documento de origem.</p>
    </div>
  );
}
export function ComparisonCard({
  card,
}: {
  card: Extract<Card, { type: "comparison" }>;
}) {
  const contentRepository = useContentRepository();
  const { update } = useProgress();
  return (
    <div className="comparison-grid">
      {[...card.items]
        .sort((a, b) => {
          const candidates = contentRepository.getCandidates();
          return (
            candidates.findIndex((c) => c.id === a.candidateId) -
            candidates.findIndex((c) => c.id === b.candidateId)
          );
        })
        .map((item) => (
          <section key={item.candidateId}>
            <CandidateBadge id={item.candidateId} />
            <h3>{item.heading}</h3>
            <p>{item.text}</p>
            <span className="tag">
              {card.isDemo ? "PROPOSTA FICTÍCIA" : "PROPOSTA DE CAMPANHA"}
            </span>
            {item.sourceIds?.map((id) => {
              const source = contentRepository
                .getSources()
                .find((s) => s.id === id);
              return (
                source && (
                  <a
                    key={id}
                    className="comparison-source"
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      update((p) => ({
                        ...p,
                        verified: [...new Set([...p.verified, card.id])],
                      }))
                    }
                  >
                    Fonte original <ArrowUpRight size={13} />
                    <span className="sr-only">
                      {" "}
                      de{" "}
                      {
                        contentRepository
                          .getCandidates()
                          .find((c) => c.id === item.candidateId)?.name
                      }{" "}
                      (nova aba)
                    </span>
                  </a>
                )
              );
            })}
            {item.reference && (
              <small className="comparison-reference">{item.reference}</small>
            )}
          </section>
        ))}
    </div>
  );
}
export function QuizCard({ card }: { card: Extract<Card, { type: "quiz" }> }) {
  const { progress, update } = useProgress();
  const answer = progress.answers[card.id];
  return (
    <div>
      <p className="eyebrow">QUAL É O STATUS DESTA AFIRMAÇÃO?</p>
      <div className="quiz-options">
        {(["Verdadeiro", "Falso", "Falta contexto"] as const).map((option) => (
          <button
            key={option}
            aria-pressed={answer === option}
            className={answer === option ? "selected" : ""}
            onClick={() =>
              update((p) => ({
                ...p,
                answers: { ...p.answers, [card.id]: option },
              }))
            }
          >
            {option}
            {answer === option && <Check size={18} />}
          </button>
        ))}
      </div>
      {answer && (
        <div className="quiz-answer" role="status">
          <strong>{card.answer}</strong>
          <p>{card.explanation}</p>
          <p>{card.evidence}</p>
          <small>
            Você pode seguir independentemente da resposta. A descoberta é o que
            importa.
          </small>
        </div>
      )}
    </div>
  );
}
export function TimelineCard({
  card,
}: {
  card: Extract<Card, { type: "timeline" }>;
}) {
  return (
    <ol className="timeline">
      {card.events.map((event) => (
        <li key={event.id}>
          <time>{event.date}</time>
          <div>
            <h3>{event.title}</h3>
            <p>{event.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
export function StatisticCard({
  card,
}: {
  card: Extract<Card, { type: "statistic" }>;
}) {
  const max = Math.max(...card.values.map((v) => v.value), 1);
  return (
    <div className="statistic">
      <div className="big-stat">
        {card.values.at(-1)?.value}
        <span>{card.unit}</span>
        <small>
          {card.isDemo ? "Indicador fictício" : "Indicador documentado"} ·{" "}
          {card.values.at(-1)?.label}
        </small>
      </div>
      <div
        className="chart"
        role="img"
        aria-label={card.values
          .map((v) => `${v.label}: ${v.value}${card.unit}`)
          .join(", ")}
      >
        {card.values.map((v) => (
          <div className="chart-column" key={v.label}>
            <span>
              {v.value}
              {card.unit}
            </span>
            <div
              className="chart-bar"
              style={{ height: Math.max((v.value / max) * 100, 2) + "px" }}
            />
            <small>{v.label}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
export function VideoCard({
  card,
}: {
  card: Extract<Card, { type: "video" }>;
}) {
  return (
    <div>
      {card.embedUrl ? (
        <iframe
          className="video-player"
          loading="lazy"
          src={card.embedUrl}
          title={card.title}
          allow="fullscreen; picture-in-picture"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : card.videoUrl ? (
        <video
          controls
          preload="none"
          className="video-player"
          src={`${card.videoUrl}#t=${card.timestamp}`}
          aria-label={card.title}
        >
          {card.captionsUrl && (
            <track
              kind="captions"
              src={card.captionsUrl}
              srcLang="pt-BR"
              label="Português"
              default
            />
          )}
        </video>
      ) : (
        <div className="video-placeholder">
          <CirclePlay size={44} strokeWidth={1} />
          <strong>Vídeo aguardando curadoria</strong>
          <span>
            Nenhuma gravação real nesta versão · trecho{" "}
            {Math.floor(card.timestamp / 60)}:
            {String(card.timestamp % 60).padStart(2, "0")}
          </span>
        </div>
      )}
      <details className="transcript">
        <summary>Leia a transcrição curta</summary>
        <p>{card.transcript}</p>
      </details>
    </div>
  );
}
export function DocumentCard({
  card,
}: {
  card: Extract<Card, { type: "document" }>;
}) {
  return (
    <div className="document-preview">
      <div className="paper-icon">
        <FileText size={50} strokeWidth={1} />
      </div>
      <div>
        <span className="eyebrow">VEJA O DOCUMENTO ORIGINAL</span>
        <h3>{card.organization}</h3>
        <p>{card.documentType}</p>
        <span className="tag">
          {card.isDemo ? "EXEMPLO FICTÍCIO" : "DOCUMENTO PÚBLICO"}
        </span>
      </div>
    </div>
  );
}
export function StatementCard({
  card,
}: {
  card: Extract<Card, { type: "statement" }>;
}) {
  return (
    <blockquote>
      <Quote size={32} />
      <p>{card.quote}</p>
      <cite>
        {card.person}
        {card.isDemo ? " · declaração fictícia" : ""}
      </cite>
    </blockquote>
  );
}
export const cardTypeNames: Record<Card["type"], string> = {
  fact: "Fato documentado",
  comparison: "Compare os dois",
  quiz: "Teste seu olhar",
  timeline: "Linha do tempo",
  statistic: "Por trás do número",
  video: "Direto da gravação",
  document: "Documento original",
  statement: "Em suas palavras",
};
export function CardRenderer({ card }: { card: Card }) {
  switch (card.type) {
    case "fact":
      return <FactCard card={card} />;
    case "comparison":
      return <ComparisonCard card={card} />;
    case "quiz":
      return <QuizCard card={card} />;
    case "timeline":
      return <TimelineCard card={card} />;
    case "statistic":
      return <StatisticCard card={card} />;
    case "video":
      return <VideoCard card={card} />;
    case "document":
      return <DocumentCard card={card} />;
    case "statement":
      return <StatementCard card={card} />;
  }
}
export function ContentCard({ card }: { card: Card }) {
  const contentRepository = useContentRepository();
  const [drawer, setDrawer] = useState<"context" | "source" | null>(null);
  const { progress } = useProgress();
  return (
    <article className="content-card">
      <div className="card-top">
        <span className="eyebrow">
          <span className="tiny-dot" />
          {cardTypeNames[card.type]}
        </span>
        <span className="tag">
          {card.isDemo
            ? "EXEMPLO FICTÍCIO"
            : card.evidenceType === "proposal"
              ? "PROPOSTA DOCUMENTADA"
              : card.evidenceType === "method"
                ? "GUIA DE LEITURA"
                : "REGISTRO PÚBLICO"}
        </span>
        <ShareButton card={card} />
      </div>
      <h2>{card.title}</h2>
      <p className="card-summary">{card.shortText}</p>
      {card.type !== "comparison" &&
        !(card.type === "fact" && card.candidateIds.length === 2) &&
        card.candidateIds.length > 0 && (
          <div className="card-candidates">
            {card.candidateIds.map((id) => (
              <CandidateBadge id={id} key={id} />
            ))}
          </div>
        )}
      {card.status && (
        <span className="legal-status">Status: {card.status}</span>
      )}
      {card.image && (
        <Image
          className="card-image"
          src={card.image.url}
          alt={card.image.alt}
          loading="lazy"
          width={800}
          height={450}
        />
      )}
      <CardRenderer card={card} />
      <div className="card-actions">
        <button className="context-button" onClick={() => setDrawer("context")}>
          Entender contexto <ArrowDown size={16} />
        </button>
        <button className="source-button" onClick={() => setDrawer("source")}>
          {progress.verified.includes(card.id) ? (
            <CheckCheck size={17} />
          ) : (
            <FileText size={17} />
          )}
          Ver fonte <ArrowUpRight size={16} />
        </button>
      </div>
      <div className="card-source-note">
        {formatDate(card.date)} ·{" "}
        {
          contentRepository.getSources().find((s) => s.id === card.sourceIds[0])
            ?.organization
        }{" "}
        · {card.sourceIds.length}{" "}
        {card.sourceIds.length === 1 ? "fonte" : "fontes"}
        {card.isDemo ? " demonstrativas" : ""}
      </div>
      {drawer === "context" && (
        <ContextDrawer card={card} onClose={() => setDrawer(null)} />
      )}{" "}
      {drawer === "source" && (
        <SourceDrawer card={card} onClose={() => setDrawer(null)} />
      )}
    </article>
  );
}
