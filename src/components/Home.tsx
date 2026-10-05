"use client";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock3,
  FileCheck2,
  Layers3,
  ScanLine,
  Sparkles,
} from "lucide-react";
import { contentRepository } from "@/lib/repository";
import { useProgress } from "./Preferences";
export function Home() {
  const candidates = contentRepository.getCandidates();
  const chapters = contentRepository.getChapters();
  const estimatedMinutes = Math.ceil(
    chapters.reduce((total, chapter) => total + chapter.estimatedSeconds, 0) /
      60,
  );
  const { progress, reset, ready } = useProgress();
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-copy">
          <div className="edition">
            <span className="tiny-dot" /> ELEIÇÕES 2026 <span>/</span> SEGUNDO
            TURNO
          </div>
          <h1>
            5 minutos
            <br />
            antes do{" "}
            <span className="vote-word">
              voto
              <svg viewBox="0 0 270 18" aria-hidden="true">
                <path d="M3 12 Q100 -2 267 8 M12 17 Q142 5 252 14" />
              </svg>
            </span>
            <span className="purple">.</span>
          </h1>
          <p className="hero-description">
            Menos ruído. Mais informação.
            <br />
            Conheça os candidatos e confira as fontes.
            <br />
            No seu tempo, do seu jeito.
          </p>
          <div className="hero-cta">
            <Link href="/experiencia" className="button primary">
              {ready && progress.viewed.length
                ? "Continuar experiência"
                : "Começar a experiência"}
              <ArrowRight size={21} />
            </Link>
            <span>
              <Clock3 size={15} /> Tempo estimado: {estimatedMinutes} minutos
            </span>
          </div>
          {ready && progress.viewed.length > 0 && (
            <div className="resume-note">
              Continuar de onde você parou? {progress.viewed.length} cards
              vistos.{" "}
              <Link href="/experiencia" onClick={reset}>
                Recomeçar
              </Link>
            </div>
          )}
          <Link href="/metodologia" className="how-link">
            Como este projeto funciona? <ArrowUpRight size={15} />
          </Link>
        </div>
        <div
          className="hero-visual"
          aria-label="Prévia ilustrativa da experiência"
        >
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="floating-note note-top">
            <span className="note-icon">
              <FileCheck2 size={19} />
            </span>
            Informação com origem.
            <Check size={16} />
          </div>
          <div className="preview-stack stack-back" />
          <div className="preview-stack stack-middle" />
          <div className="hero-demo-card">
            <div className="demo-card-head">
              <span>UM OLHAR MAIS ATENTO</span>
              <ScanLine size={19} />
            </div>
            <div className="demo-segments">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <i key={n} className={n < 3 ? "filled" : ""} />
              ))}
            </div>
            <div className="demo-candidate-row">
              <div>
                <div className={`candidate-symbol symbol-${candidates[0].id}`}>
                  {candidates[0].label}
                  <span>✳</span>
                </div>
                <strong>{candidates[0].name}</strong>
              </div>
              <span className="versus">&</span>
              <div>
                <div className={`candidate-symbol symbol-${candidates[1].id}`}>
                  {candidates[1].label}
                  <span>✳</span>
                </div>
                <strong>{candidates[1].name}</strong>
              </div>
            </div>
            <div className="demo-card-title">
              Dois candidatos.
              <br />O seu próprio olhar.
            </div>
            <p>Conheça. Compare. Confira.</p>
            <div className="demo-card-bottom">
              <span>
                <span className="tiny-dot" /> FONTES PÚBLICAS
              </span>
              <span className="demo-arrow">
                <ArrowRight size={19} />
              </span>
            </div>
          </div>
          <div className="floating-note note-bottom">
            <span className="note-icon">
              <Sparkles size={19} />
            </span>
            Você descobre. Você decide.
          </div>
          <span className="visual-caption">
            INFORMAÇÃO PARA FORMAR A SUA OPINIÃO.
          </span>
        </div>
      </section>
      <section className="manifesto">
        <div>
          <span className="manifesto-icon">↗</span>
          <p>
            Não acredite no site.
            <br />
            <strong>Confira a fonte.</strong>
          </p>
        </div>
        <span className="manifesto-description">
          Sem textão. Sem corrente de WhatsApp.
          <br />
          Cada afirmação tem um caminho até a origem.
        </span>
        <Link href="/fontes" aria-label="Explorar biblioteca de fontes">
          <ArrowUpRight size={27} />
        </Link>
      </section>
      <section className="journey">
        <div className="section-heading">
          <div>
            <span className="eyebrow">UM ASSUNTO DE CADA VEZ</span>
            <h2>O que você vai descobrir.</h2>
          </div>
          <span className="journey-counter">
            {String(chapters.length).padStart(2, "0")} capítulos <span>·</span>{" "}
            ~{String(estimatedMinutes).padStart(2, "0")} min{" "}
            <ArrowDown size={16} />
          </span>
        </div>
        <div className="chapter-grid">
          {contentRepository.getChapters().map((chapter, i) => (
            <Link
              href={`/experiencia?card=${chapter.cardIds[0]}`}
              className="chapter-tile"
              key={chapter.id}
            >
              <div>
                <span className="chapter-number">0{i + 1}</span>
                <ArrowUpRight size={20} />
              </div>
              <h3>{chapter.title}</h3>
              <p>{chapter.description}</p>
              <span className="chapter-duration">
                {chapter.estimatedSeconds} segundos
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="home-end">
        <Layers3 size={21} />
        <p>
          Uma informação. Três camadas.
          <span> O essencial, o contexto e a fonte original.</span>
        </p>
        <Link href="/metodologia">
          Conheça o método <ArrowUpRight size={15} />
        </Link>
      </section>
    </div>
  );
}
