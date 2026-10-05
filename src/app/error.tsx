"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="page-wrap">
      <h1>Não foi possível carregar este conteúdo.</h1>
      <p>Seu progresso permanece salvo neste navegador.</p>
      <button className="button primary" onClick={reset}>
        Tentar novamente
      </button>
    </div>
  );
}
