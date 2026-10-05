# Antes do voto

Aplicação interativa em português com curadoria inicial sobre **Flávio Bolsonaro e Lula**. Next.js App Router, React, TypeScript e Tailwind CSS 4. Perfis, trajetórias e recortes dos programas de 2026 usam fontes públicas verificadas em 05/10/2026. Sem backend, login ou analytics.

## Executar

Requer Node.js 22 ou superior e npm.

```sh
npm ci
npm run dev
```

Abra http://localhost:3000. Para produção local:

```sh
npm run build
npm start
```

Copie `.env.example` para `.env.local` e configure `NEXT_PUBLIC_SITE_URL` com a origem pública quando houver publicação. Esse endereço é usado nos links canônicos e metadados sociais. A aplicação não foi publicada em um serviço externo.

## Páginas

| URL                    | Função                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------- |
| `/`                    | Apresentação e retomada                                                                     |
| `/experiencia`         | Jornada com um card por vez                                                                 |
| `/experiencia?card=ID` | Abrir um ponto específico do percurso                                                       |
| `/fato/ID`             | Conteúdo compartilhável, contexto completo, fontes e Open Graph                             |
| `/fontes`              | Biblioteca; filtros combinados por candidato, capítulo, categoria, órgão, tipo e data exata |
| `/busca`               | Busca normalizada por conteúdo, candidato, fonte, órgão e data                              |
| `/metodologia`         | Proposta de critérios editoriais e verificação                                              |
| `/sobre`               | Institucional, correções, contato e privacidade                                             |
| `/preview`             | Catálogo de oito tipos, textos longos, imagem opcional, múltiplas fontes e status jurídicos |

`/preview` é uma rota de desenvolvimento **sem proteção por senha**. Suas interações não alteram o progresso normal. O site permanece marcado como `noindex` nesta fase de curadoria inicial. O catálogo usa `src/data/demo-content.ts`, com exemplos fictícios e candidatos genéricos isolados do conteúdo publicado.

## Onde editar a curadoria

- `src/data/types.ts`: contrato discriminado dos oito tipos de card e lista de status jurídicos.
- `src/data/content.ts`: candidatos, capítulos, cards, categorias, tags, fontes e identificação do projeto.
- `src/data/demo-content.ts`: exemplos fictícios exclusivos do catálogo.
- `src/lib/repository.ts`: fronteira de leitura dos dados para a interface; permite criar um repositório separado para o catálogo.
- `src/lib/validate-content.ts`: valida referências, IDs, datas, fontes e ordem do percurso; erros de configuração são explícitos.
- `src/components/Cards.tsx`: renderizadores por tipo; textos editoriais vêm da camada de dados.
- `src/app/globals.css`: tokens, design system, layout responsivo e preferências de acessibilidade.
- `public/documentos`: documentos locais fictícios. Podem ser regenerados com `node scripts/create-demo-documents.mjs`.

### Adicionar ou reorganizar um conteúdo

1. Cadastre cada fonte em `sources`, com ID único, organização, URL, data de acesso, tipo e indicação de fonte primária. `publicationDate` e `archivedUrl` são opcionais. Se a publicação não estiver identificável, não invente uma data.
2. Crie o card em `cards`. Escolha `type`, preencha os campos comuns e os campos específicos definidos em `Card`.
3. Referencie candidatos, categoria, tags e fontes por seus IDs. Em `sourceIds`, o **primeiro ID é a fonte principal**; os demais são adicionais. Fonte principal e fonte primária são conceitos distintos.
4. Inclua o ID do card em `chapter.cardIds`. A ordem desse array define a sequência interna; a ordem de `chapters` define o percurso. `chapterId` precisa corresponder ao capítulo.
5. Ajuste `estimatedSeconds`. A estimativa restante soma as parcelas de cada capítulo, distribuídas igualmente entre seus cards. O dataset atual totaliza 300 segundos.
6. Confira `/preview`, a jornada e a biblioteca, e execute `npm run typecheck` e `npm test`.

Para retirar um capítulo do percurso, remova sua entrada em `chapters`; os cards podem continuar acessíveis pelos links diretos como arquivo. Para remover totalmente um conteúdo, remova também seus cards e referências. Mantenha ao menos um capítulo com cards.

Cards de fato usam `type: 'fact'`; não há uma coleção duplicada de fatos. Comparações aceitam itens por candidato, gráficos aceitam séries `{label, value}`, quizzes guardam a resposta e a explicação, e timelines usam eventos com ID. Os dois candidatos recebem o mesmo tratamento visual e editorial.

### Mídias

Imagens são opcionais, com texto alternativo, dimensões e `next/image`. Imagens locais podem ser colocadas em `public`. Para imagens remotas, configure explicitamente `images.remotePatterns` em `next.config.ts` para os domínios utilizados.

Vídeos aceitam `videoUrl` (arquivo reproduzido pelo player nativo), `captionsUrl` (legendas WebVTT), `timestamp` em segundos e `transcript`. Para players externos, use `embedUrl` com a URL de incorporação e o timestamp no formato do provedor. O iframe é carregado de forma preguiçosa e tem título acessível. Sem URL, aparece um estado “aguardando curadoria”, sem vídeo ou botão de reprodução falso.

### Futuro CMS

Os componentes trabalham com o contrato de conteúdo e o repositório local. A migração mais simples é um adaptador de build que exporta o mesmo snapshot a partir de Supabase, Firebase, PostgreSQL ou CMS. Para conteúdo atualizado em tempo real, mova a consulta para um loader no servidor e injete o snapshot nos componentes clientes. Não coloque credenciais ou SDKs administrativos no bundle cliente. Nesta entrega não há persistência remota nem painel administrativo.

## Decisões de experiência

- Fundo papel, tinta escura e violeta; candidatos têm nomes e iniciais FB/L, sem retratos ou cores partidárias como identidade principal.
- O percurso é controlado pela pessoa, com botões, teclado e gestos horizontais; não existe avanço automático.
- A descoberta tem três níveis: resumo, painel de contexto e documento de origem. O diálogo nativo contém o foco, fecha com Escape e devolve o foco ao botão.
- “Visualizado” significa que o card foi aberto; “fonte aberta” significa que a pessoa acionou seu link. Nenhum dos dois afirma que houve leitura ou verificação concluída.
- Não existem pontos, ranking ou julgamento de candidatos. O quiz permite continuar com qualquer resposta.
- Fonte maior, animações reduzidas, `prefers-reduced-motion`, navegação por teclado e link de salto. Tipografia usa fontes do sistema, sem requisições externas.
- Progresso e respostas ficam em `antes-do-voto:v2`, no `localStorage`; preferências ficam em `antes-do-voto:accessibility`. Armazenamento indisponível não bloqueia a experiência. “Recomeçar” limpa o percurso e mantém acessibilidade.
- URLs de cards têm HTML e metadados renderizados no servidor. Imagens sociais PNG são geradas por rota. O resultado visual nas redes depende do domínio público e dos caches de cada plataforma.
- A jornada contém apenas dados reais; os exemplos fictícios aparecem somente em `/preview`. Nome do responsável e contato ainda aguardam preenchimento. Fontes de campanha são identificadas como evidência de propostas, não de resultados.

## Verificação

```sh
npx playwright install chromium
npm run typecheck
npm test
npm run build
```

Os testes verificam referências, duração, progresso, quiz, retomada, contexto, fontes, filtros combinados, pesquisa, links diretos, metadados e imagem social, conclusão, teclado, gesto horizontal e texto ampliado. A varredura axe cobre WCAG A/AA nas páginas principais e no diálogo. Isso complementa, sem substituir, uma avaliação manual com leitores de tela e pessoas usuárias.

Capturas e verificações de overflow em **375, 430, 768, 1024 e 1440 px** ficam em `test-results/screenshots` após `npm test`. O catálogo cobre imagens ausentes/presentes e textos longos. O teste usa Chromium; Safari, Firefox e métricas de campo de Core Web Vitals dependem de validação posterior nos respectivos ambientes.

Para padronizar o código: `npm run format`. `package-lock.json` fixa a resolução das dependências.

## Curadoria inicial — versão 0.2.0

O percurso contém nove cards: perfis, trajetória de cada candidato, comparações de educação, saúde, política externa e segurança, um exercício de leitura crítica e o acesso aos programas completos. Todos têm `isDemo: false`. `evidenceType` distingue registro público, proposta e guia de leitura. Comparações oferecem fonte própria e referência de páginas para cada candidato.

As nove fontes estão no TSE, no Senado e na Câmara, incluindo os programas das duas campanhas. O selo primário se refere à origem do registro: um programa é primário para a intenção declarada, não para eficácia. A reportagem da Agência Senado é complementar às trajetórias. Datas não identificadas ficam como “Data não informada”; acesso em 05/10/2026. Não foram incluídos números de pesquisas, votos parcialmente apurados, vídeos sem conferência ou acusações pessoais.

O progresso foi versionado em `v2` para que respostas e leituras do protótipo fictício não sejam contabilizadas como leitura da curadoria real. O catálogo possui repositório e estado isolados, e seus cards não geram links de compartilhamento para o conteúdo real.
