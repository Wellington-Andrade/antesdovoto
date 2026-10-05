import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("WCAG automated checks on main routes and open dialog", async ({
  page,
}) => {
  for (const route of [
    "/",
    "/experiencia",
    "/fontes",
    "/metodologia",
    "/sobre",
    "/busca",
    "/preview",
    "/fato/quiz-contexto",
  ]) {
    await page.goto(route);
    if (route === "/experiencia")
      await page.getByRole("button", { name: "Entender contexto" }).waitFor();
    await page.emulateMedia({ reducedMotion: "reduce" });
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      results.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
      route,
    ).toEqual([]);
  }
  await page.goto("/experiencia");
  await page.getByRole("button", { name: "Entender contexto" }).click();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Entender contexto" }),
  ).toBeFocused();
});
test("mobile text enlargement and swipe keep content usable", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/experiencia");
  await page.getByRole("button", { name: "Aumentar tamanho da fonte" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-large", "true");
  for (let i = 0; i < 9; i++) {
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    if (i < 8)
      await page.getByRole("button", { name: "Próximo", exact: true }).click();
  }
  await page.goto("/experiencia?card=conheca-os-perfis");
  const card = page.locator(".content-card");
  await card.waitFor();
  await card.dispatchEvent("touchstart", {
    touches: [{ identifier: 1, clientX: 300, clientY: 400 }],
  });
  await card.dispatchEvent("touchend", {
    changedTouches: [{ identifier: 1, clientX: 100, clientY: 410 }],
  });
  await expect(
    page.getByRole("heading", {
      name: "Flávio: da Assembleia do Rio ao Senado.",
    }),
  ).toBeVisible();
});
