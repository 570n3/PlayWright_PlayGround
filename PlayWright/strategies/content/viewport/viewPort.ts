import { Page, Locator, ElementHandle } from '@playwright/test';

export class componentVisible {
    private page: Page;
    private contactUs: Locator;
    private teaser: Locator;
    private heroBanner: Locator;
    private megaMenu: Locator;
    private menuParentItem: Locator;
    private menuChildItem: Locator;
    private menuSecondLayerItem: Locator;

    constructor(page: Page) {
        this.page = page;
        this.contactUs = this.page.locator('locator');
        this.teaser = this.page.locator('#locator');
        this.heroBanner = this.page.locator('locator');
        this.megaMenu = this.page.locator('/locator');
        this.menuParentItem = this.page.locator("locator")
        this.menuChildItem = this.page.locator("locator").getByText('text');
        this.menuSecondLayerItem = this.page.locator("locator").getByText('text');
    }

    public async isContactUsDisplayed(): Promise<boolean> {
        return await this.contactUs.isVisible();
    }

    public async isteaserDisplayed(): Promise<boolean> {
        return await this.teaser.isVisible();
    }

    public async isheroBannerDisplayed(): Promise<boolean> {
        return await this.heroBanner.isVisible();
    }

    public async ismegaMenuDisplayed(): Promise<boolean> {
        return await this.megaMenu.isVisible();
    }

    public async ismenuParentItemDisplayed(): Promise<boolean> {
        return await this.menuParentItem.isVisible();
    }
    
    public async getItemElement(index: number): Promise<ElementHandle> {
        const itemXPath = `locator[${index + 1}]`;
        await this.page.waitForTimeout(1000);
        return await this.page.waitForSelector(itemXPath);
    }

    public async hoverMenuParentItem() {
        const parentItemElement = await this.menuParentItem;
        await parentItemElement.hover({ force: true });
        await this.page.waitForTimeout(1000);
      }
    
    public async isMenuParentItemHovered() {
        return await this.menuParentItem.isVisible();
      }

    public async ismenuChildItemDisplayed(): Promise<boolean> {
        return await this.menuChildItem.isVisible();
    }

    public async ismenuChildItemClickednVisible(): Promise<boolean> {
        await this.page.locator('locator').first().click();
        await this.page.locator('li').filter({ hasText: 'text' }).click();
        await this.page.locator('li').filter({ hasText: 'text' }).click();
        return await this.menuSecondLayerItem.isVisible();
    }
}
