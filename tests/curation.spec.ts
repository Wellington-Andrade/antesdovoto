import { test, expect } from "@playwright/test";
import { cards, sources, candidates } from "../src/data/content";
test("public content is sourced, proposals have separate references and preview is isolated", async ({
  page,
}) => {
  expect(candidates.map((c) => c.name)).toEqual(["Lula", "Flávio Bolsonaro"]);
  const comparisons = cards.filter((c) => c.type === "comparison");
  expect(comparisons).toHaveLength(4);
  for (const card of comparisons) {
    expect(card.evidenceType).toBe("proposal");
    expect(card.items.map((i) => i.candidateId)).toEqual(["a", "b"]);
    for (const item of card.items) {
      expect(item.sourceIds?.length).toBeGreaterThan(0);
      expect(item.reference).toBeTruthy();
    }
  }
  for (const route of [
    "/",
    "/experiencia",
    "/fontes",
    "/fato/comparacao-educacao",
  ]) {
    await page.goto(route);
    if (route === "/experiencia")
      await page.getByRole("button", { name: "Entender contexto" }).waitFor();
    await expect(
      page.getByText("EXEMPLO FICTÍCIO", { exact: true }),
    ).toHaveCount(0);
  }
  await page.goto("/fato/comparacao-educacao");
  await expect(
    page.locator('meta[property="og:description"]'),
  ).not.toHaveAttribute("content", /FICTÍCIO/);
  await expect(
    page.getByRole("link", {
      name: "Fonte original de Flávio Bolsonaro (nova aba)",
    }),
  ).toHaveAttribute("href", sources.find((s) => s.id === "plano-flavio")!.url);
  await expect(
    page.getByRole("link", { name: "Fonte original de Lula (nova aba)" }),
  ).toHaveAttribute("href", sources.find((s) => s.id === "plano-lula")!.url);
  await page.goto("/fontes");
  await expect(
    page.getByText("Data não informada", { exact: false }).first(),
  ).toBeVisible();
  await page.goto("/preview");
  await expect(
    page.getByText("EXEMPLO FICTÍCIO", { exact: true }).first(),
  ).toBeVisible();
  const comparison = page.locator("#preview-comparacao-educacao");
  await expect(
    comparison.locator(".candidate-badge").filter({ hasText: "CANDIDATO A" }),
  ).toBeVisible();
  await expect(
    comparison.locator(".candidate-badge").filter({ hasText: "CANDIDATO B" }),
  ).toBeVisible();
  await expect(
    comparison.getByRole("button", { name: "Compartilhar card" }),
  ).toBeDisabled();
  await comparison
    .getByRole("button", { name: "Ver fonte", exact: true })
    .click();
  await expect(
    page.getByRole("dialog").getByRole("heading", {
      name: "Caderno do Programa Educacional Exemplo",
    }),
  ).toBeVisible();
});
