import { Browser, BrowserContext } from "@playwright/test";
import { pageFixture } from "./page.fixture";
import { After, AfterAll, Before, BeforeAll, Status } from "@cucumber/cucumber";
import { invokeBrowser } from "../../helper/browser.manager";
import { getEnv } from "../../helper/env/env";

// setDefaultTimeout(60 * 1000 * 2);
let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
  getEnv();
  browser = await invokeBrowser();
});

Before(async function () {
  context = await browser.newContext({
    // httpCredentials: {},
    // permissions: ["geolocation"],
    // geolocation: { latitude: 27.6648, longitude: 81.5158 },
  });
  pageFixture.page = await context.newPage();
});

// BeforeStep({ timeout: 60000 }, async function () {});

After(async function ({ pickle, result }) {
  if (result?.status == Status.FAILED) {
    const img = await pageFixture.page.screenshot({
      path: `./test-results/screenshots/${pickle.name}.png`,
      type: "png",
    });
    await this.attach(img, "image/png");
  }
  await pageFixture.page.close();
  await context.close();
});

AfterAll(async function () {
  await browser.close();
});
