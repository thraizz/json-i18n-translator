import { test, expect } from "@playwright/test";

const EXAMPLE_JSON = {
  days: "Tage",
  device: "Gerät",
  devices: {
    Andere: "Anderes Gerät",
    Camera: "Kamera",
    GPS_Tracker: "GPS Tracker",
    IoT_Device: "IoT Gerät",
    Laptop: "Laptop",
    Mobile_Hotspot: "Mobile Hotspot",
    Router: "WLAN Home Router",
    Smartphone: "Smartphone",
    Tablet: "Tablet",
    Vehicle: "Fahrzeug",
    Wearable: "Wearable",
  },
  label: {
    back: "zurück",
    complete: "abschliessen",
    forward: "weiter",
    toShop: "Zum Shop",
  },
  language: "Sprache",
  logoName: "Digital Republic",
  nothingFound: "Nichts gefunden.",
  selected: "ausgewählt",
  support: "Support",
  welcome: "Willkommen",
  welcomeEsim: "eSIM Onboarding",
};

test("upload example json", async ({ page }) => {
  await page.goto("/app/dashboard/upload");
  await page.getByRole("combobox").selectOption("German");
  await page.getByPlaceholder("translation.json").click();
  await page
    .getByPlaceholder("translation.json")
    .fill("MyFirstTranslation.json");
  await page.getByPlaceholder("Paste JSON here").click();
  await page
    .getByPlaceholder("Paste JSON here")
    .fill(JSON.stringify(EXAMPLE_JSON));
  await page.getByRole("button", { name: "Upload JSON" }).click();
  await expect(page.getByText("JSON uploaded successfully!")).toBeVisible();

  await page.goto("/app/dashboard");
  await expect(page.getByText("MyFirstTranslation.json")).toBeVisible();
});
