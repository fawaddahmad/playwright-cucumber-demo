import { Given, Then, When, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { pageFixture } from "../hooks/page.fixture";

setDefaultTimeout(60 * 1000 * 2);

Given("I navigate to the application", { timeout: 60000 }, async function () {
  await pageFixture.page.goto(process.env.BASEURL);
  try {
    if (pageFixture.page.locator("#bfx-wm-wrapper")) {
      await pageFixture.page.keyboard.press("Escape");
    }
    await pageFixture.page.click("#bfx-cc-flag-link");
    await pageFixture.page
      .locator("#bfx-cc-countries-select")
      .selectOption({ label: "United States" });
    await pageFixture.page.locator("#bfx-cc-btn").click();
  } catch (error) {}
});

Given("I click on login button", async function () {
  await pageFixture.page.click("svg[class*=icon-icon-account-desktop-dims]");
  try {
    if (pageFixture.page.locator("#bfx-wm-wrapper")) {
      await pageFixture.page.keyboard.press("Escape");
    }
    await pageFixture.page.click("#bfx-cc-flag-link");
    await pageFixture.page
      .locator("#bfx-cc-countries-select")
      .selectOption({ label: "United States" });
    await pageFixture.page.locator("#bfx-cc-btn").click();
  } catch (error) {}
});

Given("I enter my email address as {string}", async function (email: string) {
  await pageFixture.page.type("#login-form-email", email);
});

Given("I enter my password as {string}", async function (password: string) {
  await pageFixture.page.type("#login-form-password", password);
});

Given("I click the Sign In button", async function () {
  await pageFixture.page.waitForTimeout(1000 * 3);
  await pageFixture.page.locator('//button[text()="Sign In"]').click();
});

Then("I should be redirected to the My Account page", async function () {
  await expect(
    pageFixture.page.locator('//h2[contains(text(),"My Account")]')
  ).toBeVisible();
});
