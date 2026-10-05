"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Search, SlidersHorizontal } from "lucide-react";
import { contentRepository, formatDate, normalize } from "@/lib/repository";
import { SourceBadge } from "./Drawers";
const cards = contentRepository.getCards();
const sources = contentRepository.getSources();
export function Library({ searchOnly = false }: { searchOnly?: boolean }) {
  const [query, setQuery] = useState("");
  const [candidate, setCandidate] = useState("");
  const [chapter, setChapter] = useState("");
  const [category, setCategory] = useState("");
  const [organization, setOrganization] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const matchCard = (c: (typeof cards)[number]) =>
    (!candidate || c.candidateIds.includes(candidate)) &&
    (!chapter || c.chapterId === chapter) &&
    (!category || c.categoryId === category);
  const textMatch = (text: string) =>
    normalize(text).includes(normalize(query));
  const foundSources = sources.filter((s) => {
    const uses = cards.filter((c) => c.sourceIds.includes(s.id));
    return (
      (!organization || s.organization === organization) &&
      (!type || s.sourceType === type) &&
      (!date || s.publicationDate === date) &&
      uses.some(matchCard) &&
      textMatch(
        [
          s.title,
          s.organization,
          s.publicationDate,
          s.sourceType,
          ...uses.map((c) =>
            [
              c.title,
              c.shortText,
              c.fullContext,
              c.date,
              c.categoryId,
              ...c.tags,
              ...c.candidateIds.map(
                (id) =>
                  contentRepository.getCandidates().find((x) => x.id === id)
                    ?.name,
              ),
            ].join(" "),
          ),
        ].join(" "),
      )
    );
  });
  const foundCards = cards.filter((c) =>
    textMatch(
      [
        c.title,
        c.shortText,
        c.fullContext,
        c.date,
        c.categoryId,
        ...c.tags,
        ...c.candidateIds.map(
          (id) =>
            contentRepository.getCandidates().find((x) => x.id === id)?.name,
        ),
        ...sources
          .filter((s) => c.sourceIds.includes(s.id))
          .map((s) => `${s.title} ${s.organization} ${s.publicationDate}`),
      ].join(" "),
    ),
  );
  return (
    <div className="page-wrap library-page">
      <span className="eyebrow">INFORMAÇÃO COM ORIGEM</span>
      <h1>
        {searchOnly ? "O que você quer conferir?" : "Não pare na afirmação."}
        <br />
        <span className="purple">
          {searchOnly ? "Encontre o contexto." : "Encontre a fonte."}
        </span>
      </h1>
      <p className="page-intro">
        {searchOnly
          ? "Busque por tema, candidato, data ou órgão."
          : "Todas as referências da experiência, reunidas em um só lugar."}{" "}
        As fontes documentam trajetórias e propostas. A consulta foi registrada
        separadamente da publicação.
      </p>
      <label className="search-field">
        <Search size={22} />
        <input
          aria-label="Buscar fatos, cards e fontes"
          placeholder="Busque por assunto, palavra ou fonte…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span>BUSCAR</span>
      </label>
      {!searchOnly && (
        <div className="filter-panel">
          <div className="eyebrow">
            <SlidersHorizontal size={15} /> FILTRAR FONTES
          </div>
          <div className="filters">
            {[
              {
                label: "Candidato",
                value: candidate,
                set: setCandidate,
                items: contentRepository
                  .getCandidates()
                  .map((c) => [c.id, c.name]),
              },
              {
                label: "Capítulo",
                value: chapter,
                set: setChapter,
                items: contentRepository
                  .getChapters()
                  .map((c) => [c.id, c.title]),
              },
              {
                label: "Categoria",
                value: category,
                set: setCategory,
                items: contentRepository
                  .getCategories()
                  .map((c) => [c.id, c.name]),
              },
              {
                label: "Órgão",
                value: organization,
                set: setOrganization,
                items: [...new Set(sources.map((s) => s.organization))].map(
                  (s) => [s, s],
                ),
              },
              {
                label: "Tipo de fonte",
                value: type,
                set: setType,
                items: [...new Set(sources.map((s) => s.sourceType))].map(
                  (s) => [s, s],
                ),
              },
            ].map((filter) => (
              <label key={filter.label}>
                {filter.label}
                <select
                  value={filter.value}
                  onChange={(e) => filter.set(e.target.value)}
                >
                  <option value="">Todos</option>
                  {filter.items.map(([id, name]) => (
                    <option value={id} key={id}>
                      {name}
                    </option>
                  ))}
                </select>
              </label>
            ))}
            <label>
              Data de publicação
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>
          </div>
          <button
            className="text-link"
            onClick={() => {
              setQuery("");
              setCandidate("");
              setChapter("");
              setCategory("");
              setOrganization("");
              setType("");
              setDate("");
            }}
          >
            Limpar filtros
          </button>
        </div>
      )}
      <p className="result-count" role="status">
        {searchOnly ? `${foundCards.length} conteúdos e ` : ""}
        {foundSources.length} fontes encontradas
      </p>
      {searchOnly && (
        <div className="search-results">
          {foundCards.map((c) => (
            <Link className="search-result" key={c.id} href={"/fato/" + c.id}>
              <span className="tag">CARD · EXEMPLO</span>
              <h2>{c.title}</h2>
              <p>{c.shortText}</p>
              <ArrowUpRight size={18} />
            </Link>
          ))}
        </div>
      )}
      <div className="source-grid">
        {foundSources.map((s) => (
          <article className="source-library-card" key={s.id}>
            <SourceBadge source={s} />
            <span className="eyebrow">{s.sourceType}</span>
            <h2>{s.title}</h2>
            <p>
              {s.organization} <span>·</span> {formatDate(s.publicationDate)}
            </p>
            <div className="source-used">
              <span>UTILIZADA EM</span>
              {cards
                .filter((c) => c.sourceIds.includes(s.id))
                .map((c) => (
                  <Link href={"/fato/" + c.id} key={c.id}>
                    {c.title}
                    <ArrowUpRight size={13} />
                  </Link>
                ))}
            </div>
            <a
              className="text-link"
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Abrir fonte original <ArrowUpRight size={16} />
              <span className="sr-only"> (nova aba)</span>
            </a>
          </article>
        ))}
      </div>
      {foundSources.length === 0 &&
        (!searchOnly || foundCards.length === 0) && (
          <div className="empty-state">
            <Search size={32} />
            <h2>Nenhum resultado por aqui.</h2>
            <p>Tente outro termo ou remova os filtros.</p>
          </div>
        )}
    </div>
  );
}
