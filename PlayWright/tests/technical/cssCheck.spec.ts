import { chromium, expect, test } from "@playwright/test";
import * as fs from "fs/promises";
//import { setupTestEnvironment } from "../../compHelpers/helpers/testSetup";

async function verifyCSSValues(page, locator, cssValues) {
  await page.waitForSelector(locator, { state: "visible" });
  const element = await page.locator(locator);

  for (const [property, expectedValue] of Object.entries(cssValues)) {
    try {
      await expect(element).toHaveCSS(property, expectedValue as string);
    } catch (error) {
      console.error(
        `CSS value mismatch for property '${property}': ${error.message}`
      );
      throw error;
    }
  }
}


async function acceptCookieBanner(page) {
    const acceptAllButton = await page.locator('//*[@id="coiPage-1"]/div[2]/div[1]/button[3]');
    const isVisible = await acceptAllButton.isVisible();
  
    if (isVisible) {
      await acceptAllButton.click();
    } else {
      console.log('Accept All button not found/visible.');
    }
  }
test.skip("Verify CSS values from JSON file", async ({}, testInfo) => {
  testInfo.timeout = 60000;
  const browser = await chromium.launch({ headless: true });

  try {
    const path = require("path");
    const jsonFile = path.join(
      __dirname,
      "../../strategies/data/urlsAndCSSWithLocators.json"
    );
    const fileContents = await fs.readFile(jsonFile, "utf-8");
    const urlsAndCSS = JSON.parse(fileContents);
    const urlsData = urlsAndCSS.urls;

    for (const urlData of urlsData) {
      const url = urlData.url;
      const elements = urlData.elements;

      const context = await browser.newContext();
      const page = await context.newPage();
      await page.goto(url);

      await acceptCookieBanner(page);

      for (const elementData of elements) {
        const locator = elementData.locator;
        const cssProperties = elementData.cssProperties;

        await verifyCSSValues(page, locator, cssProperties);
      }

      await context.close();
    }
  } catch (error) {
    console.error("Error reading JSON file:", error);
  } finally {
    await browser.close();
  }
});
