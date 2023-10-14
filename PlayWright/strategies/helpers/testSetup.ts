import { chromium, Browser, BrowserContext, Page, Locator } from '@playwright/test';

export async function setupTestEnvironment(url: string): Promise<{ browser: Browser, context: BrowserContext, page: Page }> {
    const browser = await chromium.launch({ headless: true });
 
    const context = await browser.newContext({
        httpCredentials: {
            username: 'username', 
            password: 'password' 
        }
    });
    const page = await context.newPage();

    await page.goto(url);

    const acceptAllButton = await page.locator("locator");
    const isVisible = await acceptAllButton.isVisible();

    if (isVisible) {
        await acceptAllButton.click();
    } else {
        console.log('Accept All button not found/visible.');
    }

    return { browser, context, page };
}
