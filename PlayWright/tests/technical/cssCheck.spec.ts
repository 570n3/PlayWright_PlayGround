import { chromium, expect, test } from "@playwright/test";
import * as fs from "fs/promises";

async function verifyCSSValues(page, locator, cssValues) {
  await page.waitForSelector(locator, { state: "visible" });
  const element = await page.locator(locator);

  let hasError = false;

  for (const [property, expectedValue] of Object.entries(cssValues)) {
    try {
      await expect(element).toHaveCSS(property, expectedValue as string);
      console.log(`CSS value matched for locator '${locator}', property '${property}': ${expectedValue}`);
    } catch (error) {
      console.error(`CSS value mismatch for locator '${locator}', property '${property}': ${error.message}`);
      hasError = true;
    }
  }

  if (hasError) {
    console.error(`CSS values verification failed for locator '${locator}'`);
    return false;
  }
  return true;
}

test("Verify CSS values from JSON file", async ({}, testInfo) => {
  testInfo.timeout = 60000;
  const browser = await chromium.launch({ headless: false });

  let hasTestFailed = false;

  try {
    const path = require("path");
    const jsonFile = path.join(__dirname, "../data/urlsAndCSSWithLocators.json");
    const fileContents = await fs.readFile(jsonFile, "utf-8");
    const urlsAndCSS = JSON.parse(fileContents);
    const urlsData = urlsAndCSS.urls;

    for (const urlData of urlsData) {
      const url = urlData.url;
      const elements = urlData.elements;
      let hasError = false;

      const context = await browser.newContext();
      const page = await context.newPage();
      await page.goto(url);

      for (const elementData of elements) {
        const locator = elementData.locator;
        const cssProperties = elementData.cssProperties;

        const result = await verifyCSSValues(page, locator, cssProperties);
        if (!result) {
          hasError = true;
        }
      }

      await context.close();

      if (hasError) {
        console.error(`Test failed for URL '${url}'`);
        hasTestFailed = true;
      }
    }

    if (hasTestFailed) {
      throw new Error("Test failed due to CSS value mismatch");
    }
  } catch (error) {
    console.error("Error reading JSON file:", error);
    throw error; 
  } finally {
    await browser.close(); 
  }
});
