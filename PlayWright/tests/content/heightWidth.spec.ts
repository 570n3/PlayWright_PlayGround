import { chromium } from "playwright";
import { test, expect } from "@playwright/test";
import { setupTestEnvironment } from '../../strategies/helpers/testSetup';


test("height and width", async () => {
  const browser = await chromium.launch();
  const { page } = await setupTestEnvironment('https://example.com/en');
  const componentSize = await page.evaluate(() => {
    const component = document.querySelector(
      "locator"
    );
    if (!component) {
      return null;
    }
    const { width, height } = component.getBoundingClientRect();
    return { width, height };
  });
  const expectedWidth = 1200;
  const expectedHeight = 400;
  let testPassed = true;
  if (componentSize === null) {
    console.error("Component not found on the page.");
    testPassed = false;
  } else {
    if (componentSize.width !== expectedWidth) {
      console.error(
        `Width does not match the expected value: ${expectedWidth} ${componentSize.width}`
      );
      testPassed = false;
    }
    if (componentSize.height !== expectedHeight) {
      console.error(
        `Height does not match the expected value: ${expectedHeight} ${componentSize.height}`
      );
      testPassed = false;
    }
  }
  await browser.close();
  expect(testPassed).toBeTruthy();
});
