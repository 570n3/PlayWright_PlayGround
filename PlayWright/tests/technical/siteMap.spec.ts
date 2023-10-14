import { chromium, Browser, Page, test, expect } from '@playwright/test';
import isAccessible from '../../strategies/technical/siteMap/siteMap';

const urlsToTest: string[] = [
  'https://www.example.com/sitemap-index.xml',
  'https://www.example.com/en/sitemap.xml',
  'https://www.example.com/en/sitemap-images.xml'
];

test('is Accessible', async () => {
    const browser: Browser = await chromium.launch();
    const context = await browser.newContext();
    const page: Page = await context.newPage();
  
    for (const url of urlsToTest) {
      const webPage = new isAccessible(url);
      const statusCode = await webPage.getStatusCode(page);
      if (statusCode === 200) {
        console.log(`${url} is accessible!`);
      } else if (statusCode !== 0) {
        console.log(`${url} returned status code ${statusCode}`);
      } else {
        console.log(`${url} is not accessible.`);
      }
  
      await expect(statusCode).toBe(200);
    }
  
    await browser.close();
  });

  
  
  
  
  
  
  