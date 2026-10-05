import Link from "next/link";
export default function NotFound() {
  return (
    <div className="page-wrap">
      <span className="eyebrow">404</span>
      <h1>Este conteúdo não foi encontrado.</h1>
      <p>
        O link pode ter mudado. Explore a experiência ou procure na biblioteca.
      </p>
      <Link className="button primary" href="/">
        Voltar ao início →
      </Link>
    </div>
  );
}
