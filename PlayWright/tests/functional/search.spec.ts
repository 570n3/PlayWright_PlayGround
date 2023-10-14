import { test, expect } from "@playwright/test";
import { Search } from "../../strategies/functional/search";
import { setupTestEnvironment } from "../../strategies/helpers/testSetup";

test.describe("Search Test", () => {
  let varSearch: Search;

  test.beforeAll(async ({}, testInfo) => {
    testInfo.setTimeout(testInfo.timeout + 180000);

    const { page } = await setupTestEnvironment(
      "https://example.com/search"
    );

    varSearch = new Search(page);
  });

  test("Search Operation", async () => {
    const expectedDescription =
      "Text to expect";
    const actualDescription = await varSearch.searchOp();
    expect(actualDescription).toBe(expectedDescription);
  });

  test("Test Name200", async () => {
    const expectedDescription =
      "Text to expect";
    const actualDescription = await varSearch.contentResults();
    expect(actualDescription).toBe(expectedDescription);
  });
  
  test("TestName10", async () => {
    const expectedDescription =
      "Text to expect";
    const actualDescription = await varSearch.overViewResults();
    expect(actualDescription).toBe(expectedDescription);
  });

  test("Test Name1", async () => {
    const expectedDescription =
      "Text to expect";
    const actualDescription = await varSearch.productResults();
    expect(actualDescription).toBe(expectedDescription);
  });

  test("Test Name2", async () => {
    const expectedDescription =
      "Text to expect";
    const actualDescription = await varSearch.sortBy();
    expect(actualDescription).toBe(expectedDescription);
  });

  test("Test Name4", async () => {
    const expectedDescription =
      "Text to expect";
    const actualDescription = await varSearch.filter();
    expect(actualDescription).toBe(expectedDescription);
  });
  
  test("Test Name5", async () => {
    expect(await varSearch.showMoreVisible).toBeTruthy();
  });

  test("Test Name6", async () => {
    expect(await varSearch.showLessVisible).toBeTruthy();
  });

  test("Test Name7", async () => {
    expect(await varSearch.clearOneFilter).toBeTruthy();
  });

  test("Test Name8", async ({page}) => {
    page.pause()
    const expectedDescription =
      "Text to expect2"; 
    const actualDescription = await varSearch.clearAllbutton();
    expect(actualDescription).toBe(expectedDescription);
  });

   test("Test Name11", async () => {
    const expectedDescription =
      "Text to expect";
    const actualDescription = await varSearch.clearSearchQuery();
    expect(actualDescription).toBe(expectedDescription);
  });

});
