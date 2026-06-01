import { chromium } from "playwright";

const base = process.env.BASE || "http://localhost:3100";
const shots = [
  ["home-desktop", "/", 1440],
  ["service-desktop", "/services/panel-upgrades", 1440],
  ["home-mobile", "/", 390],
];

const browser = await chromium.launch();
for (const [name, path, width] of shots) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await page.goto(base + path, { waitUntil: "networkidle" });
  await page.screenshot({
    path: `.stitch/phase2-screens/${name}.png`,
    fullPage: true,
  });
  await page.close();
  console.log("shot", name);
}
await browser.close();
