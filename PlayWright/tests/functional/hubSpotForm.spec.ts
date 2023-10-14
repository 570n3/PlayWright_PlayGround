import { test, expect } from '@playwright/test';
import { iFrame } from '../../strategies/functional/hubSpotForm';

test.skip('Contact Form Test', async ({ page }) => {
  const contactPage = new iFrame(page);

  await page.goto('https://example.com/en/contact-us');

  await contactPage.acceptCookies();

  await contactPage.fillContactForm();

  await contactPage.waitForThankYouPage();
  const thankYouPageURL = await contactPage.getThankYouPageURL();

  expect(thankYouPageURL).toBe('https://www.example.com/en/thank-you');
});
