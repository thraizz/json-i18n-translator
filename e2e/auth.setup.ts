import { test as setup, expect } from "@playwright/test";

const authFile = ".auth/auth.json";

setup("authenticate", async ({ page }) => {
  await page.goto("/login");
  const page1Promise = page.waitForEvent("popup");
  await page.getByRole("button", { name: "Sign in with Google" }).click();
  const page1 = await page1Promise;
  await expect(page1.getByText("Orange Panda")).toBeVisible();
  await page1.getByText("Orange Panda").click();

  await expect(page.getByText("Uploaded Documents")).toBeVisible();
  await expect(page.getByText("translation.json")).toBeVisible();

  await page.context().storageState({ path: authFile });
});
