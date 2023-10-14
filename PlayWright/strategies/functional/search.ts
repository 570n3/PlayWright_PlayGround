import { Page, Locator, Keyboard } from '@playwright/test';

export class Search {
  private page: Page;
  private searchField: Locator;
  private contentPageTab: Locator;
  private contentResult: Locator;
  private noResult: Locator;
  private productResult: Locator;
  private newsPageTab: Locator;
  private sort: Locator;
  private sortAlphabetical: Locator;
  private tagsFilterIndustry: Locator;
  private tagFilterApplication: Locator;
  private tagFilterContentType: Locator;
  private tagAsset: Locator;
  private tagDurabilty: Locator;
  private tagElectric: Locator;
  private tagArticle: Locator;
  private tagCaseStudy: Locator;
  private showMore: Locator;
  private showLess: Locator;
  private clearAll: Locator;
  private clearElectric: Locator;
  private searchClose: Locator;
  private allSection: Locator;
  private tagSearch: Locator;
  private tagSearchParent: Locator;
  private overViewPageTab: Locator;
  private productPageTab: Locator;
  private listView: Locator

  constructor(page: Page) {
    this.page = page;
    this.searchField = this.page.getByPlaceholder("Locator");
    this.contentPageTab = this.page.locator("Locator");
    this.contentResult = this.page.locator('Locator')
    this.overViewPageTab = this.page.locator("Locator");
    this.noResult = this.page.locator("Locator");
    this.productPageTab = this.page.locator("Locator");
    this.productResult = this.page.locator("Locator");
    this.sort = this.page.locator("Locator");
    this.allSection = this.page.locator('Locator');
    this.sortAlphabetical = this.page.locator("Locator");
    this.tagsFilterIndustry = this.page.locator("Locator");
    this.tagFilterApplication = this.page.getByText("Application", { exact: true });
    this.tagAsset = this.page.locator('Locator')
    this.tagDurabilty = this.page.locator('Locator')
    this.tagElectric = this.page.locator('Locator');
    this.tagFilterContentType = this.page.getByText("Locator");
    this.tagArticle = this.page.locator('Locator');
    this.tagCaseStudy = this.page.locator('Locator');
    this.showMore = this.page.getByRole("link", { name: "Locator" });
    this.showLess = this.page.getByRole("link", { name: "Locator" });
    this.clearElectric = this.page.locator('Locator');
    this.clearAll = this.page.locator('Locator')
    this.searchClose = this.page.locator('Locator');
    this.tagSearch = this.page.locator('Locator');
    this.tagSearchParent = this.page.locator("Locator");
    this.listView = this.page.locator('Locator')
  }
   public async searchOp(): Promise<string>{
     await this.searchField.fill('Input');
     await this.page.keyboard.press('Enter');
     await this.page.waitForSelector('Input', {state: "visible"});
    const text = await this.contentResult.textContent();
    return text ?? '';
   }


  public async contentResults(): Promise<string> {
    await this.contentPageTab.click();
    await this.page.waitForSelector('Input', {state: "visible"});
    const text = await this.contentResult.textContent();
    return text ?? '';
  }

  public async overViewResults(): Promise<string> {
    await this.overViewPageTab.click();
    const text = await this.noResult.textContent();
    return text ?? '';
  }

  public async productResults(): Promise<string> {
    await this.productPageTab.click();
    await this.page.waitForSelector(`Input`, {state: "visible"});
    const text = await this.productResult.textContent();
    return text ?? '';
  }


  public async sortBy(): Promise<string>{
    await this.sort.click();
    await this.sortAlphabetical.click();
    await this.contentPageTab.click();
    await this.page.waitForSelector('Input', {state: "visible"});
    const text = await this.contentResult.textContent();
    return text ?? '';
  }

  public async filter(): Promise<string>{
    await this.allSection.click();
    await this.tagsFilterIndustry.click();
    await this.tagFilterApplication.click();
    await this.tagAsset.click();
    await this.tagDurabilty.click();
    await this.tagElectric.click();
    await this.tagFilterContentType.click();
    await this.tagArticle.click();
    await this.tagCaseStudy.click();
    await this.tagSearchParent.click()
    await this.tagSearch.click();
    const text = await this.noResult.textContent();
    return text ?? '';
  }

  public async showMoreVisible(): Promise<boolean> {
    return await this.showMore.isVisible();
  }

  public async showLessVisible(): Promise<boolean>{
    await this.showMore.click();
    return await this.showLess.isVisible();
  }

  public async clearOneFilter(): Promise<boolean>{
    await this.clearElectric.click()
    return await this.showLess.isHidden();
  }

   public async clearAllbutton(): Promise<string>{
    await this.listView.click(); 
    await this.clearAll.click();
    await new Promise(resolve => setTimeout(resolve, 5000));
    const text = await this.contentResult.textContent();
    return text ?? '';
   }

  public async clearSearchQuery(): Promise<string> {
    await this.searchClose.click()
    await new Promise(resolve => setTimeout(resolve, 2000));
    const text = await this.contentResult.textContent();
    return text ?? '';
  }

  

}