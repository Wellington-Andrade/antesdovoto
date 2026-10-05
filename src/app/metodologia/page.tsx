import Link from "next/link";
export const metadata = { title: "Metodologia" };
const sections = [
  [
    "Como selecionamos informações?",
    "A curadoria inicial reúne identificação das chapas, trajetórias institucionais e recortes dos planos de governo de 2026. Os mesmos temas são apresentados para ambos os candidatos. Os resumos são uma seleção editorial, não um inventário completo nem uma recomendação de voto.",
  ],
  [
    "Como classificamos fontes?",
    "A fonte principal sustenta diretamente a informação; fontes adicionais fornecem contexto, contrapontos ou confirmação independente. O tipo, a organização, a publicação e a data de acesso são registrados separadamente.",
  ],
  [
    "O que consideramos fonte primária?",
    "É o registro de origem: o documento emitido pelo órgão responsável, a base que produziu os dados ou a gravação original. O plano de uma campanha é primário para saber o que ela promete, mas não comprova resultados ou viabilidade. A hospedagem no TSE não é um aval ao conteúdo político do programa.",
  ],
  [
    "Como tratamos informações contestadas?",
    "A interface permite explicitar a contestação, os diferentes posicionamentos e o status processual. Investigação, denúncia, condenação, absolvição e arquivamento são estados distintos. A curadoria deverá informar a data do status e suas fontes.",
  ],
  [
    "Como corrigimos erros?",
    "A política proposta é reexaminar a fonte, corrigir o conteúdo e registrar data, motivo e versão da alteração. O contato do responsável será preenchido antes da publicação editorial. Esta versão não recebe denúncias ou solicitações por formulário.",
  ],
  [
    "Quando uma página foi atualizada?",
    "Cada conteúdo tem uma data de revisão; cada fonte registra publicação quando identificável e consulta separadamente. Datas desconhecidas não são preenchidas por estimativa. A curadoria inicial foi consultada em 05/10/2026, na versão 0.2.0. Não há atualização automática de fatos ou do andamento de processos.",
  ],
];
export default function Page() {
  return (
    <div className="page-wrap editorial-page">
      <span className="eyebrow">TRANSPARÊNCIA, DESDE O COMEÇO</span>
      <h1>
        Você não precisa
        <br />
        <span className="purple">confiar de olhos fechados.</span>
      </h1>
      <p className="page-intro">
        O essencial em segundos. O contexto quando você quiser. A fonte sempre
        ao alcance.
      </p>
      <div className="method-levels">
        {["01 / O essencial", "02 / O contexto", "03 / A evidência"].map(
          (s, i) => (
            <div key={s}>
              <strong>{s}</strong>
              <p>
                {
                  [
                    "Uma informação por card, para uma leitura de 10–15 segundos.",
                    "Abra as explicações e entenda o que um recorte não mostra.",
                    "Consulte o documento original e forme sua própria avaliação.",
                  ][i]
                }
              </p>
            </div>
          ),
        )}
      </div>
      <div className="notice">
        CURADORIA INICIAL · Propostas são identificadas como compromissos de
        campanha. Os exemplos fictícios ficam apenas no catálogo de
        desenvolvimento.
      </div>
      {sections.map(([title, text], i) => (
        <section className="editorial-section" key={title}>
          <span>0{i + 1}</span>
          <div>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
        </section>
      ))}
      <Link href="/sobre" className="text-link">
        Quem fez este projeto? ↗
      </Link>
    </div>
  );
}
