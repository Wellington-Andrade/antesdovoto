import Link from "next/link";
import { ArrowUpRight, Asterisk, Search } from "lucide-react";
import { AccessibilityControls } from "./Preferences";
import { project } from "@/data/content";
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <div className="demo-bar">
        <span className="demo-dot" /> CURADORIA INICIAL{" "}
        <span className="demo-divider">/</span>{" "}
        <span>{project.contentNotice}</span>
      </div>
      <header className="site-header">
        <Link href="/" className="brand" aria-label="Antes do voto — início">
          <Asterisk size={32} strokeWidth={2.5} />
          <span>
            antes do voto<span className="brand-period">.</span>
          </span>
        </Link>
        <nav aria-label="Navegação principal">
          <Link href="/fontes" className="nav-library">
            Biblioteca de fontes <ArrowUpRight size={14} />
          </Link>
          <Link href="/metodologia" className="nav-method">
            O projeto
          </Link>
          <Link
            href="/busca"
            aria-label="Buscar conteúdo"
            className="icon-button"
          >
            <Search size={20} />
          </Link>
          <AccessibilityControls />
        </nav>
      </header>
      <main id="conteudo">{children}</main>
      <footer className="site-footer">
        <Link href="/" className="footer-brand">
          antes do voto.
        </Link>
        <p>Não acredite no site. Confira a fonte.</p>
        <div>
          <Link href="/sobre">Quem fez</Link>
          <Link href="/metodologia">Metodologia</Link>
          <Link href="/fontes">Fontes</Link>
          <Link href="/preview">Componentes</Link>
        </div>
        <span className="footer-note">
          2026 · Projeto independente · Versão {project.version}
        </span>
      </footer>
    </>
  );
}
