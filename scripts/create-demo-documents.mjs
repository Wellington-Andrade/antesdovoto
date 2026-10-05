import { mkdirSync, writeFileSync } from "node:fs";
mkdirSync("public/documentos", { recursive: true });
const documents = [
  [
    "trajetoria",
    "Documento demonstrativo de trajetória",
    "Arquivo Exemplo",
    "2018: início do projeto exemplo. 2022: publicação de relatório exemplo. 2026: atualização demonstrativa. Estes marcos não correspondem a uma trajetória real.",
  ],
  [
    "educacao",
    "Caderno do Programa Educacional Exemplo",
    "Instituto Fictício",
    "Programa A: bibliotecas. Programa B: laboratórios. Indicador fictício de participação: 2018 — 35%; 2022 — 52%; 2026 — 68%. Não há amostra, coleta ou metodologia empírica: estes números existem exclusivamente para demonstrar o componente de visualização.",
  ],
  [
    "entrevista",
    "Entrevista demonstrativa — transcrição",
    "Acervo Demonstrativo",
    "CANDIDATO B: “Este é um exemplo de declaração sobre cooperação internacional.” Não existe gravação real deste exemplo. O campo de vídeo será preenchido após curadoria.",
  ],
  [
    "registro",
    "Registro processual fictício",
    "Órgão Demonstrativo",
    "Status demonstrativo: arquivado. Não existe processo, tribunal, decisão ou pessoa real relacionado a este registro. O documento serve exclusivamente para demonstrar a distinção de estados processuais na interface.",
  ],
  [
    "contexto",
    "Nota de contexto demonstrativa",
    "Observatório Exemplo",
    "Uma variação numérica não prova, isoladamente, uma relação causal. Este texto demonstra o uso de fontes adicionais para contextualizar um card. Não constitui evidência sobre candidatos reais.",
  ],
];
for (const [slug, title, organization, text] of documents)
  writeFileSync(
    `public/documentos/${slug}.html`,
    `<!doctype html><html lang="pt-BR"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${title} — EXEMPLO FICTÍCIO</title><style>body{font:18px/1.8 Arial,sans-serif;background:#f7f6f2;color:#242624;max-width:720px;margin:50px auto;padding:24px}h1{font-size:36px;line-height:1.2;letter-spacing:-1px}aside{background:#ece7fa;color:#513c84;padding:18px;border-radius:8px}a{color:#6850b7}small{color:#62655f}</style><main><aside><strong>EXEMPLO FICTÍCIO — SEM VALOR DOCUMENTAL</strong><br>Este arquivo é parte do protótipo Antes do voto. Não é uma fonte política real.</aside><h1>${title}</h1><p>Organização fictícia: ${organization}</p><p>${text}</p><hr><p>Nenhuma informação deste documento deve ser atribuída a políticos ou instituições reais.</p><small>Versão demonstrativa 0.1.0 · 05/10/2026</small><p><a href="/fontes">← Biblioteca de fontes</a></p></main></html>`,
  );
writeFileSync(
  "public/placeholder.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450"><rect width="800" height="450" fill="#ece7fa"/><circle cx="275" cy="225" r="120" fill="#c6b7e5"/><rect x="400" y="105" width="200" height="240" rx="30" fill="#d6e7ba"/><text x="400" y="415" text-anchor="middle" fill="#55476d" font-family="Arial" font-size="18">IMAGEM DEMONSTRATIVA • SEM CONTEÚDO REAL</text></svg>`,
);
writeFileSync(
  "public/og.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#f7f6f2"/><text x="75" y="100" fill="#6850b7" font-family="Arial" font-size="28">ANTES DO VOTO · EXEMPLO FICTÍCIO</text><text x="75" y="280" fill="#242624" font-family="Arial" font-size="95">5 minutos</text><text x="75" y="390" fill="#242624" font-family="Arial" font-size="95">antes do voto.</text><text x="75" y="535" fill="#62655f" font-family="Arial" font-size="30">Não acredite no site. Confira a fonte.</text></svg>`,
);
