import { chromium, test, expect } from "@playwright/test";
import { componentVisible } from "../../strategies/content/viewport/viewPort";
//import { setupTestEnvironment } from '../../compHelpers/helpers/testSetup';

//added viewvports
const viewports = [
  { width: 1200, height: 800 },
  { width: 768, height: 1024 },
  { width: 375, height: 812 },
];

test.describe.skip("Component Visibility Test", () => {
  let context;
  let page;
  let visible;
  const itemsToHover = [1, 2];

  test.beforeEach(async ({}, testInfo) => {
    testInfo.setTimeout(testInfo.timeout + 180000);

    const browser = await chromium.launch({ headless: true });
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto("https://example.com/en");
    const acceptAllButton = await page.locator(
      'locator'
    );
    const isVisible = await acceptAllButton.isVisible();

    if (isVisible) {
      await acceptAllButton.click();
    } else {
      console.log("Accept All button not found/visible.");
    }
    visible = new componentVisible(page);
  });

  for (const viewport of viewports) {
    test.describe(`Running tests on viewport: ${viewport.width}x${viewport.height}`, () => {
      test.beforeEach(async () => {
        await page.setViewportSize(viewport);
      });

      test("Contact Us Button should be visible", async () => {
        expect(await visible.isContactUsDisplayed()).toBeTruthy;
      });

      test("Teaser component is displayed", async () => {
        expect(await visible.isteaserDisplayed()).toBeTruthy();
      });

      test("Hero Banner is Displayed", async () => {
        expect(await visible.isheroBannerDisplayed).toBeTruthy();
      });
    });
  }
});
