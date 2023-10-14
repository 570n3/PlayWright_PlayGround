import { Page, Locator, FrameLocator } from '@playwright/test';
import { iFrameHelper } from './helper';

export class iFrame {
  private readonly page: Page;

  private readonly acceptAllButton: Locator;
  private readonly formFrameLocator: FrameLocator;

  constructor(page: Page) {
    this.page = page;

    this.acceptAllButton = page.locator('locator');
    this.formFrameLocator = page.frameLocator('locator');
  }

  async acceptCookies() {
    if (await this.acceptAllButton.isVisible()) {
      await this.acceptAllButton.click();
    }
  }

  async fillContactForm() {
    const contactForm = new iFrameHelper(this.formFrameLocator);
    await contactForm.fillField('Field Name', 'input');
    await contactForm.selectOption('Field Name', 'input');
    await contactForm.fillField('Field Name', 'input');
    await contactForm.fillField('Field Name', 'input');
    await contactForm.selectOption('Field Name', 'input');
    await contactForm.fillField('Field Name', 'input');
    await contactForm.fillField('Field Name', 'input');
    await contactForm.fillField('Field Name', 'input');
    await contactForm.fillField('Field Name', 'input');
    await contactForm.fillField('Field Name', 'input');
    await contactForm.fillField('Field Name', 'input');
    await contactForm.fillField('Field Name', 'input');
    await contactForm.fillField('Field Name', 'input');
    await contactForm.fillField('Field Name', 'input');
    await contactForm.fillField('Field Name', 'input');
    await contactForm.selectOption('Field Name', 'input');
    await contactForm.selectOption('Field Name', 'input');
    await contactForm.checkCheckbox('Field Name');
    await contactForm.clickButton('Field Name');
  }

  async waitForThankYouPage() {
    await this.page.waitForURL('https://www.example.com');
  }

  async getThankYouPageURL() {
    return this.page.url();
  }
}
