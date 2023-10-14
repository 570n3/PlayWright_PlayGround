import { test, expect } from '@playwright/test';

test('should load a specific JavaScript file with a 200 status code', async ({ page }) => {
  let jsLoaded = false;

  page.on('response', async (response) => {
    if (response.url() === 'https://exaple.com/test.js') {
      if (response.status() === 200) {
        console.log('The JS file loaded successfully with a 200 status code.');
        jsLoaded = true;
      } else {
        console.log('Failed to load the JS file. Status code: ' + response.status());
      }
    }
  });

  await page.goto('https://example.com');

  await expect(jsLoaded).toBeTruthy();
});
