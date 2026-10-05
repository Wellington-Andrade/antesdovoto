import { test, expect } from "@playwright/test";

test("hydrates with extension attributes on html and preserves accessibility preferences", async ({
  page,
}) => {
  const hydrationErrors: string[] = [];
  page.on("console", (message) => {
    if (
      message.type() === "error" &&
      /hydrat|server rendered HTML|server-rendered/i.test(message.text())
    ) {
      hydrationErrors.push(message.text());
    }
  });
  page.on("pageerror", (error) => hydrationErrors.push(error.message));

  // Change the document before React loads, as a browser extension does.
  await page.addInitScript(() => {
    const installAttributes = () => {
      if (!document.documentElement) return false;
      document.documentElement.setAttribute("data-lt-installed", "true");
      document.documentElement.setAttribute("suppresshydrationwarning", "true");
      return true;
    };
    if (!installAttributes()) {
      const observer = new MutationObserver(() => {
        if (installAttributes()) observer.disconnect();
      });
      observer.observe(document, { childList: true });
    }
  });

  await page.goto("/");
  // This attribute is set by the accessibility effect after hydration.
  await expect(page.locator("html")).toHaveAttribute("data-large", "false");
  await expect(page.locator("html")).toHaveAttribute(
    "data-lt-installed",
    "true",
  );
  expect(hydrationErrors).toEqual([]);

  await page.getByRole("button", { name: "Aumentar tamanho da fonte" }).click();
  await page.getByRole("button", { name: "Reduzir animações" }).click();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-large", "true");
  await expect(page.locator("html")).toHaveAttribute("data-reduce", "true");
  await page.getByRole("link", { name: "Começar a experiência" }).click();
  await expect(
    page.getByRole("heading", {
      name: "Flávio Bolsonaro e Lula: quem são.",
    }),
  ).toBeVisible();
  expect(hydrationErrors).toEqual([]);
});
