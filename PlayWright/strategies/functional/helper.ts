import { FrameLocator } from '@playwright/test';

export class iFrameHelper {
  private readonly frameLocator: FrameLocator;

  constructor(frameLocator: FrameLocator) {
    this.frameLocator = frameLocator;
  }

  private async getByLabel(label: string, options?: { exact?: boolean }) {
    return await this.frameLocator.getByLabel(label, options);
  }

  async fillField(label: string, value: string) {
    const input = await this.getByLabel(label);
    await input.click();
    await input.fill(value);
  }

  async selectOption(label: string, option: string) {
    const select = await this.getByLabel(label, { exact: true });
    await select.selectOption(option);
  }

  async checkCheckbox(label: string) {
    const checkbox = await this.getByLabel(label);
    await checkbox.check();
  }

  async clickButton(label: string) {
    const button = await this.getByLabel(label);
    await button.click();
  }
}
