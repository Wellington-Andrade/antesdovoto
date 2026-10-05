"use client";
import { useEffect, useRef } from "react";
import { ExternalLink, FileText, X } from "lucide-react";
import { Card, Source } from "@/data/types";
import { formatDate } from "@/lib/repository";
import { useProgress } from "./Preferences";
import { useContentRepository } from "./ContentCatalog";
export function Drawer({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const el = ref.current;
    const focused = document.activeElement as HTMLElement;
    el?.showModal();
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      el?.close();
      document.body.style.overflow = old;
      focused?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="drawer"
      aria-label={title}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="drawer-inner">
        <header>
          <span className="eyebrow">MAIS PERTO DA INFORMAÇÃO</span>
          <button
            className="icon-button"
            onClick={onClose}
            aria-label="Fechar painel"
          >
            <X />
          </button>
        </header>
        <h2>{title}</h2>
        {children}
      </div>
    </dialog>
  );
}
export function SourceBadge({ source }: { source: Source }) {
  return (
    <span
      className={`source-badge ${source.primarySource ? "primary-source" : ""}`}
    >
      {source.primarySource ? "✓ Fonte primária" : "Fonte complementar"}
      {source.isDemo ? " · exemplo" : ""}
    </span>
  );
}
export function SourceDrawer({
  card,
  onClose,
}: {
  card: Card;
  onClose: () => void;
}) {
  const { update } = useProgress();
  const contentRepository = useContentRepository();
  return (
    <Drawer title="Confira por você mesmo." onClose={onClose}>
      <p>
        {card.isDemo
          ? "Estas fontes locais são demonstrativas. Não documentam fatos reais."
          : card.evidenceType === "proposal"
            ? "O plano comprova a proposta declarada pela campanha. Consulte o trecho completo para avaliar detalhes e limites."
            : "Consulte os registros de origem e confira o contexto completo."}
      </p>
      {card.sourceIds.map((id, i) => {
        const source = contentRepository.getSources().find((s) => s.id === id)!;
        return (
          <article className="source-entry" key={id}>
            <SourceBadge source={source} />
            <h3>{source.title}</h3>
            <p>
              {source.organization} · {formatDate(source.publicationDate)}
            </p>
            <small>
              {i === 0 ? "Fonte principal" : "Fonte adicional"} ·{" "}
              {source.sourceType}
              <br />
              Consultada em {formatDate(source.accessedAt)}
            </small>
            <a
              className="text-link"
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
              Ver fonte original <ExternalLink size={16} />
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
            {source.archivedUrl && (
              <a
                href={source.archivedUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Versão arquivada
              </a>
            )}
          </article>
        );
      })}
    </Drawer>
  );
}
export function ContextDrawer({
  card,
  onClose,
}: {
  card: Card;
  onClose: () => void;
}) {
  return (
    <Drawer title="O contexto também importa." onClose={onClose}>
      <span className="tag">
        {card.isDemo
          ? "EXEMPLO FICTÍCIO"
          : card.evidenceType === "proposal"
            ? "PROPOSTA DE CAMPANHA"
            : "CURADORIA INICIAL"}
      </span>
      <h3>{card.title}</h3>
      <p className="context-text">{card.fullContext}</p>
      {card.status && (
        <p>
          Status do registro{card.isDemo ? " demonstrativo" : ""}:{" "}
          <strong>{card.status}</strong>.
        </p>
      )}
      <p className="subtle">
        Atualizado em {formatDate(card.date)}. A leitura completa inclui o
        documento de origem e suas limitações.
      </p>
      <FileText size={28} />
    </Drawer>
  );
}
