"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCheck,
  Clock3,
  RotateCcw,
} from "lucide-react";
import { contentRepository } from "@/lib/repository";
import { ContentCard } from "./Cards";
import { useProgress } from "./Preferences";
const cards = contentRepository.getCards();
const chapters = contentRepository.getChapters();
function time(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}
export function ProgressBar({ value }: { value: number }) {
  return (
    <div
      className="progress-track"
      role="progressbar"
      aria-label="Progresso de leitura"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
    >
      <div style={{ width: value + "%" }} />
    </div>
  );
}
export function ChapterHeader({
  index,
  title,
}: {
  index: number;
  title: string;
}) {
  return (
    <div className="chapter-header">
      <span className="eyebrow">
        CAPÍTULO {String(index + 1).padStart(2, "0")} /{" "}
        {String(chapters.length).padStart(2, "0")}
      </span>
      <h1>{title}</h1>
    </div>
  );
}
export function Experience() {
  const { progress, ready, update, reset } = useProgress();
  const [index, setIndex] = useState(0);
  const [initialized, setInitialized] = useState(false);
  const [finished, setFinished] = useState(false);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ready && !initialized) {
      const requested = new URLSearchParams(window.location.search).get("card");
      const saved = cards.findIndex(
        (c) => c.id === (requested || progress.currentId),
      );
      setIndex(saved < 0 ? 0 : saved);
      setInitialized(true);
    }
  }, [ready, initialized, progress.currentId]);
  useEffect(() => {
    if (initialized) {
      const card = cards[index];
      update((p) => ({
        ...p,
        currentId: card.id,
        viewed: [...new Set([...p.viewed, card.id])],
      }));
      window.history.replaceState(null, "", "?card=" + card.id);
    }
  }, [index, initialized, update]);
  function move(delta: number) {
    setIndex((i) => Math.max(0, Math.min(cards.length - 1, i + delta)));
    titleRef.current?.focus();
  }
  useEffect(() => {
    function key(e: KeyboardEvent) {
      if (
        document.querySelector("dialog[open]") ||
        (e.target as HTMLElement).closest(
          "button,a,input,select,textarea,summary,video",
        )
      )
        return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setIndex((i) => Math.min(cards.length - 1, i + 1));
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setIndex((i) => Math.max(0, i - 1));
      }
    }
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, []);
  const card = cards[index];
  const chapterIndex = chapters.findIndex((c) => c.id === card.chapterId);
  const chapter = chapters[chapterIndex];
  const viewed = cards.filter((c) => progress.viewed.includes(c.id)).length;
  const completedChapters = chapters.filter((ch) =>
    ch.cardIds.every((id) => progress.viewed.includes(id)),
  ).length;
  const remaining = cards.slice(index).reduce((sum, c) => {
    const ch = chapters.find((ch) => ch.id === c.chapterId)!;
    return sum + ch.estimatedSeconds / ch.cardIds.length;
  }, 0);
  if (!initialized)
    return (
      <div className="page-wrap">
        <p role="status">Preparando sua experiência…</p>
      </div>
    );
  if (finished)
    return (
      <section className="completion page-wrap">
        <div className="completion-icon">
          <CheckCheck size={38} />
        </div>
        <span className="eyebrow">A CURIOSIDADE NÃO TERMINA AQUI</span>
        <h1>
          {viewed === cards.length
            ? "Você chegou até aqui."
            : "Você chegou ao último card."}
          <br />
          <span className="purple">Agora, vá até a fonte.</span>
        </h1>
        <p>
          Você visualizou {viewed} de {cards.length} cards, percorreu{" "}
          {completedChapters} de {chapters.length} capítulos e abriu fontes de{" "}
          {progress.verified.length} conteúdos.
        </p>
        <p>
          Esta é uma curadoria inicial de trajetórias e propostas documentadas.
          Continue nos programas completos e confira as fontes.
        </p>
        <div className="completion-actions">
          <Link href="/fontes" className="button primary">
            Explorar todas as fontes <ArrowRight size={18} />
          </Link>
          <button
            className="button secondary"
            onClick={() => {
              reset();
              setIndex(0);
              setFinished(false);
              update((p) => ({
                ...p,
                currentId: cards[0].id,
                viewed: [cards[0].id],
              }));
            }}
          >
            <RotateCcw size={16} /> Recomeçar
          </button>
        </div>
      </section>
    );
  return (
    <div className="experience-layout">
      <aside className="chapter-sidebar">
        <Link href="/" className="text-link">
          <ArrowLeft size={16} /> Voltar ao início
        </Link>
        <h2>
          Seu percurso<span>.</span>
        </h2>
        <p>
          Um pouco de atenção.
          <br />
          Mais espaço para pensar.
        </p>
        <nav aria-label="Capítulos">
          {chapters.map((ch, i) => (
            <button
              key={ch.id}
              className={i === chapterIndex ? "active" : ""}
              aria-current={i === chapterIndex ? "step" : undefined}
              onClick={() =>
                setIndex(cards.findIndex((c) => c.id === ch.cardIds[0]))
              }
            >
              <span>
                {ch.cardIds.every((id) => progress.viewed.includes(id)) ? (
                  <Check size={16} />
                ) : (
                  String(i + 1).padStart(2, "0")
                )}
              </span>
              {ch.title}
            </button>
          ))}
        </nav>
        <div className="sidebar-note">
          <CheckCheck size={20} />
          <strong>
            {progress.verified.length} de {cards.length}
          </strong>
          <span>conteúdos com fonte aberta</span>
          <small>Abrir uma fonte é o primeiro passo para verificá-la.</small>
        </div>
      </aside>
      <section className="experience-main">
        <div className="experience-progress">
          <div>
            <span>
              {completedChapters} de {chapters.length} capítulos percorridos
            </span>
            <span>
              <Clock3 size={14} /> ~{time(Math.ceil(remaining))} restantes
            </span>
          </div>
          <ProgressBar value={Math.round((viewed / cards.length) * 100)} />
        </div>
        <div
          ref={titleRef}
          tabIndex={-1}
          className="focus-heading"
          aria-live="polite"
        >
          <ChapterHeader index={chapterIndex} title={chapter.title} />
        </div>
        <select
          className="mobile-chapters"
          aria-label="Ir para capítulo"
          value={chapter.id}
          onChange={(e) =>
            setIndex(cards.findIndex((c) => c.chapterId === e.target.value))
          }
        >
          {chapters.map((ch) => (
            <option key={ch.id} value={ch.id}>
              {ch.title}
            </option>
          ))}
        </select>
        <div
          onTouchStart={(e) => {
            touch.current = {
              x: e.touches[0].clientX,
              y: e.touches[0].clientY,
            };
          }}
          onTouchEnd={(e) => {
            if (
              !touch.current ||
              (e.target as HTMLElement).closest("button,a,video,dialog")
            )
              return;
            const dx = e.changedTouches[0].clientX - touch.current.x;
            const dy = e.changedTouches[0].clientY - touch.current.y;
            if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5)
              move(dx < 0 ? 1 : -1);
            touch.current = null;
          }}
        >
          <ContentCard key={card.id} card={card} />
        </div>
        <div className="experience-navigation">
          <button
            className="button secondary"
            disabled={index === 0}
            onClick={() => move(-1)}
          >
            <ArrowLeft size={18} /> Voltar
          </button>
          <span>
            {String(index + 1).padStart(2, "0")}{" "}
            <span>/ {String(cards.length).padStart(2, "0")}</span>
          </span>
          <button
            className="button primary"
            onClick={() => {
              if (index === cards.length - 1) {
                setFinished(true);
                update((p) => ({
                  ...p,
                  completed: cards.every((c) => p.viewed.includes(c.id)),
                }));
              } else move(1);
            }}
          >
            {index === cards.length - 1 ? "Concluir" : "Próximo"}
            <ArrowRight size={18} />
          </button>
        </div>
        <p className="navigation-hint">
          Siga no seu ritmo. Use as setas ou deslize para navegar.
        </p>
      </section>
    </div>
  );
}
