import { test, expect } from "@playwright/test";
import { cards, chapters, sources } from "../src/data/content";

test("data references and configured duration are consistent", () => {
  expect(new Set(cards.map((c) => c.id)).size).toBe(cards.length);
  expect(chapters.reduce((sum, ch) => sum + ch.estimatedSeconds, 0)).toBe(300);
  for (const ch of chapters)
    for (const id of ch.cardIds)
      expect(cards.find((c) => c.id === id)?.chapterId).toBe(ch.id);
  for (const c of cards) {
    expect(c.isDemo).toBe(false);
    expect(c.sourceIds.length).toBeGreaterThan(0);
    for (const id of c.sourceIds)
      expect(sources.some((s) => s.id === id)).toBe(true);
  }
  for (const s of sources) {
    expect(s.isDemo).toBe(false);
    expect(s.url).toMatch(/^https:\/\//);
  }
});
test("guided experience, context, sources, quiz and persistence", async ({
  page,
  context,
}) => {
  await context.route(
    sources.find((s) => s.id === "tse-segundo-turno")!.url,
    (route) =>
      route.fulfill({
        contentType: "text/html",
        body: "<h1>Fonte externa simulada apenas no teste</h1>",
      }),
  );
  await page.goto("/");
  await page.getByRole("link", { name: "Começar a experiência" }).click();
  await expect(
    page.getByRole("heading", {
      name: "Flávio Bolsonaro e Lula: quem são.",
    }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Entender contexto" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.getByRole("button", { name: "Ver fonte", exact: true }).click();
  const tabPromise = context.waitForEvent("page");
  await page
    .getByRole("link", { name: /Ver fonte original/ })
    .first()
    .click();
  const tab = await tabPromise;
  await expect(tab).toHaveURL(
    sources.find((s) => s.id === "tse-segundo-turno")!.url,
  );
  await tab.close();
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Próximo", exact: true }).click();
  await page.reload();
  await expect(
    page.getByRole("heading", {
      name: "Flávio: da Assembleia do Rio ao Senado.",
    }),
  ).toBeVisible();
  await page.goto("/experiencia?card=quiz-contexto");
  await page.getByRole("button", { name: "Falso", exact: true }).click();
  await expect(
    page.getByRole("status").filter({ hasText: "Falta contexto" }),
  ).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Falso", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Próximo", exact: true }).click();
  await page.getByRole("button", { name: "Concluir", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: /Agora, vá até a fonte/ }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Recomeçar", exact: true }).click();
  await expect(
    page.getByRole("heading", {
      name: "Flávio Bolsonaro e Lula: quem são.",
    }),
  ).toBeVisible();
});
test("source filters, search, direct links and social metadata", async ({
  page,
  request,
}) => {
  await page.goto("/fontes");
  await page
    .getByRole("combobox", { name: "Candidato", exact: true })
    .selectOption("b");
  await page
    .getByRole("combobox", { name: "Categoria", exact: true })
    .selectOption("educacao");
  await expect(page.getByRole("status")).toContainText("4 fontes");
  await page
    .getByRole("combobox", { name: "Órgão", exact: true })
    .selectOption("Tribunal Superior Eleitoral");
  await expect(page.getByRole("status")).toContainText("2 fontes");
  await page.getByLabel("Data de publicação").fill("2000-01-01");
  await expect(
    page.getByRole("heading", { name: "Nenhum resultado por aqui." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Limpar filtros" }).click();
  await expect(page.getByRole("status")).toContainText("9 fontes");
  await page.goto("/busca");
  await page.getByRole("textbox").fill("alfabetização");
  await expect(
    page
      .locator(".search-results")
      .getByRole("link", { name: /Educação: o que/ }),
  ).toBeVisible();
  await page
    .locator(".search-results")
    .getByRole("link", { name: /Educação: o que/ })
    .click();
  await expect(page).toHaveURL(/fato\/comparacao-educacao/);
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    "Educação: o que os planos propõem.",
  );
  const image = await request.get("/fato/comparacao-educacao/opengraph-image");
  expect(image.status()).toBe(200);
  expect(image.headers()["content-type"]).toContain("image/png");
  await page.goto("/fato/nao-existe");
  await expect(
    page.getByRole("heading", { name: "Este conteúdo não foi encontrado." }),
  ).toBeVisible();
});
test("keyboard, accessibility settings and complete journey", async ({
  page,
}) => {
  await page.goto("/experiencia");
  await page
    .getByRole("heading", { name: "Flávio Bolsonaro e Lula: quem são." })
    .waitFor();
  await page.locator("body").click({ position: { x: 5, y: 200 } });
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("heading", {
      name: "Flávio: da Assembleia do Rio ao Senado.",
    }),
  ).toBeVisible();
  await page.keyboard.press("ArrowLeft");
  await expect(
    page.getByRole("heading", {
      name: "Flávio Bolsonaro e Lula: quem são.",
    }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Aumentar tamanho da fonte" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-large", "true");
  await page
    .getByRole("button", { name: "Reduzir animações", exact: true })
    .click();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-reduce", "true");
  await expect(page.locator("html")).toHaveAttribute("data-large", "true");
  for (let i = 0; i < 8; i++)
    await page.getByRole("button", { name: "Próximo", exact: true }).click();
  await page.getByRole("button", { name: "Concluir", exact: true }).click();
  await expect(page.getByText(/visualizou 9 de 9 cards/)).toBeVisible();
});
test("responsive visual verification at requested widths", async ({ page }) => {
  for (const width of [375, 430, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of ["/", "/experiencia", "/fontes", "/preview"]) {
      await page.goto(route);
      if (route === "/experiencia")
        await page
          .getByRole("heading", {
            name: "Flávio Bolsonaro e Lula: quem são.",
          })
          .waitFor();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `overflow ${route} at ${width}`,
      ).toBe(true);
      await page.screenshot({
        path: `test-results/screenshots/${width}-${route === "/" ? "home" : route.slice(1)}.png`,
        fullPage: true,
        animations: "disabled",
      });
    }
  }
});
