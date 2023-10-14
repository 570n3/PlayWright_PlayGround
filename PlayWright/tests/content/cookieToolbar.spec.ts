import { chromium, test, expect } from "@playwright/test";
import { cookieToolbar } from "../../strategies/content/cookieToolbar/cookieToolbar";

test.describe("Component Visibility Test", () => {
  let toolbar: cookieToolbar;

  test.beforeAll(async ({}, testInfo) => {
    testInfo.setTimeout(testInfo.timeout + 180000);

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://example.com/en");
    toolbar = new cookieToolbar(page);
  });

  test("Toolbar is Displayed", async () => {
    expect(await toolbar.isToolbarDisplayed).toBeTruthy();
  });

  test("Toolbar Title", async () => {
    const expectedDescription = "Text to expect";
    const actualDescription = await toolbar.getToolbarHeadline();
    expect(actualDescription).toBe(expectedDescription);
  });

  test("Toolbar Description", async () => {
    const expectedDescription =
      "Text to expect";
    const actualDescription = await toolbar.getToolbarDescription();
    expect(actualDescription).toBe(expectedDescription);
  });

  test("Verify Domains", async () => {
    const expectedDescription = "example.com, example2.com";
    const actualDescription = await toolbar.getToolbarDomains();
    expect(actualDescription).toBe(expectedDescription);
  });

  test("Verify Strictly Necessary Desciption", async () => {
    const expectedDescription =
      "Text to expect";
    const actualDescription = await toolbar.verifyShowDetails();
    expect(actualDescription).toBe(expectedDescription);
  });

  test("Toolbar Hidden", async () => {
    expect(await toolbar.isToolbarNotDisplayed()).toBeTruthy();
  });
});
