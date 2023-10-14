import { Page } from '@playwright/test';

class isAccessible {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  async getStatusCode(page: Page): Promise<number> {
    try {
      await page.goto(this.url, { waitUntil: 'domcontentloaded' });
      const statusCode = await page.evaluate(async (url) => {
        const response = await fetch(url);
        return response.status;
      }, this.url);
      return statusCode;
    } catch (error) {
      console.log(`Error while accessing ${this.url}: ${error.message}`);
      return 0;
    }
  }
}

export default isAccessible;
