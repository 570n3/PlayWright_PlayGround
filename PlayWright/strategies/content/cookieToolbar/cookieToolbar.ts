import { Page, Locator } from "@playwright/test";

export class cookieToolbar {
  private page: Page;
  private toolbarContainer: Locator;
  private toolbarTitle: Locator;
  private toolbarDescription: Locator;
  private toolbarReadMore: Locator;
  private toolbarDomains: Locator;
  private toolbarSettings: Locator;
  private toolbarShowDetails: Locator;
  private toolbarAccept: Locator;
  private strictlyNecessary: Locator;

  constructor(page: Page) {
    this.page = page;
    this.toolbarContainer = this.page.locator('locator');
    this.toolbarTitle = this.page.locator('locator');
    this.toolbarDescription = this.page.locator(
      'locator'
    );
    this.toolbarReadMore = this.page.locator("locator");
    this.toolbarDomains = this.page.getByText(
      "text"
    );
    this.toolbarSettings = this.page.getByLabel("Settings", { exact: true });
    this.toolbarShowDetails = this.page.getByLabel("Show details");
    this.toolbarAccept = this.page.getByLabel("Accept all", { exact: true });
    this.strictlyNecessary = this.page.getByText(
      "text"
    );
  }

  public async isToolbarDisplayed(): Promise<boolean> {
    return await this.toolbarContainer.isVisible();
  }

  public async getToolbarHeadline(): Promise<string> {
    const text = await this.toolbarTitle.textContent();
    return text ?? "";
  }

  public async getToolbarDescription(): Promise<string> {
    const text = await this.toolbarDescription.textContent();
    return text ?? "";
  }

  public async clickReadMore(): Promise<void> {
    await this.toolbarReadMore.click();
  }

  public async getToolbarDomains(): Promise<string> {
    await this.toolbarReadMore.click();
    const text = await this.toolbarDomains.textContent();
    return text ?? "";
  }

  public async verifyShowDetails(): Promise<string> {
    await this.toolbarSettings.click();
    await this.toolbarShowDetails.click();
    const text = await this.strictlyNecessary.textContent();
    return text ?? "";
  }

  public async clickAccept(): Promise<void> {
    await this.toolbarAccept.click();
  }

  public async isToolbarNotDisplayed(): Promise<boolean> {
    await this.toolbarAccept.click();
    const isContainerVisible = await this.toolbarContainer.isVisible();
    return !isContainerVisible;
  }
}
