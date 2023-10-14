import { Page, Locator } from "@playwright/test";

export class headerFooter {
  private page: Page;
  private header: Locator;
  private headerLogo: Locator;
  private footer: Locator;
  private footerImage: Locator;
  private socialMedia1: Locator;
  private socialMedia2: Locator;
  private copywright: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = this.page.locator("locator");
    this.headerLogo = this.page.locator("locator");
    this.footer = this.page.locator("locator");
    this.footerImage = this.page.locator("locator");
    this.socialMedia1 = this.page.locator(
      'locator'
    );
    this.socialMedia2 = this.page.locator(
      'locator'
    );
    this.copywright = this.page.locator("locator");
  }

  public async isHeaderDisplayed(): Promise<boolean> {
    return await this.header.isVisible();
  }

  public async isHeaderLogoDisplayed(): Promise<boolean> {
    return await this.headerLogo.isVisible();
  }

  public async isFooterDisplayed(): Promise<boolean> {
    return await this.footer.isVisible();
  }

  public async isFooterImageDisplayed(): Promise<boolean> {
    return await this.footerImage.isVisible();
  }

  public async isSocialMedia1Displayed(): Promise<boolean> {
    return await this.socialMedia1.isVisible();
  }

  public async isSocialMedia2Displayed(): Promise<boolean> {
    return await this.socialMedia2.isVisible();
  }

  public async isCopywrightDisplayed(): Promise<boolean> {
    return await this.copywright.isVisible();
  }
}
