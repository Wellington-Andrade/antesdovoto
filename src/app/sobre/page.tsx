import Link from "next/link";
import { project } from "@/data/content";
export const metadata = { title: "Quem fez este projeto?" };
export default function Page() {
  return (
    <div className="page-wrap editorial-page">
      <span className="eyebrow">UM PROJETO INDEPENDENTE</span>
      <h1>
        Quem fez
        <br />
        <span className="purple">este projeto?</span>
      </h1>
      <p className="page-intro">
        Projeto independente criado por {project.author}.
      </p>
      <section className="about-block">
        <h2>Informação pública, mais acessível.</h2>
        <p>
          O objetivo desta plataforma é facilitar o acesso a informações
          públicas e documentos relacionados à eleição.
        </p>
        <p>
          Não aceite nenhuma informação apenas porque ela aparece aqui. Confira
          as fontes originais.
        </p>
        <p>
          A versão atual apresenta uma curadoria inicial sobre Flávio Bolsonaro
          e Lula, com fontes públicas consultadas em 05/10/2026. A seleção
          inclui trajetórias e recortes dos programas de governo; não pretende
          cobrir todos os temas da eleição.
        </p>
      </section>
      <section className="about-block">
        <h2>Critérios editoriais</h2>
        <p>
          Mesmos critérios para ambos os candidatos, distinção entre fatos e
          interpretações, explicitação de limitações e acesso à origem de cada
          informação. Não há ranking ou pontuação de candidatos.
        </p>
        <Link href="/metodologia" className="text-link">
          Conheça a metodologia proposta ↗
        </Link>
      </section>
      <section className="about-block">
        <h2>Política de correções e contato</h2>
        <p>
          Erros deverão ser revistos à luz da documentação e registrados com
          transparência. O canal de contato e a identificação do responsável
          aguardam preenchimento.
        </p>
        {project.contact ? (
          <a href={"mailto:" + project.contact}>{project.contact}</a>
        ) : (
          <span className="tag">CONTATO A DEFINIR</span>
        )}
      </section>
      <section className="about-block">
        <h2>Privacidade</h2>
        <p>
          Seu progresso e suas preferências ficam apenas no navegador, por meio
          de armazenamento local. Não há login, analytics ou envio de respostas.
          Vídeos externos, quando configurados futuramente, poderão envolver
          serviços de terceiros.
        </p>
        <p>Versão {project.version} · Última atualização: 05/10/2026</p>
      </section>
    </div>
  );
}
