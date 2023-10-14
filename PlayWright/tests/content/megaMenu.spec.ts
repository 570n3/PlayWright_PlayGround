import { test, expect } from '@playwright/test';
import { componentVisible } from '../../strategies/content/megaMenu/megeMenu';
import { setupTestEnvironment } from '../../strategies/helpers/testSetup';

test.describe('Component Visibility Test', () => {
    let visible: componentVisible;
    const itemsToHover = [1, 2];


    test.beforeAll(async ({}, testInfo) => {

        testInfo.setTimeout(testInfo.timeout + 180000);

        const { page } = await setupTestEnvironment('https://example.com/en');

        visible = new componentVisible(page);
    });

    test('MegaMenu is Displayed', async () => {
        expect(await visible.ismegaMenuDisplayed).toBeTruthy();
    });

    test('Hover Over Menu Items', async () => {
        for (const itemIndex of itemsToHover) {
            const element = await visible.getItemElement(itemIndex);
            await element.hover();
            await new Promise((resolve) => setTimeout(resolve, 1000));
          }
          expect(await visible.ismenuParentItemDisplayed()).toBeTruthy();
    });

    test('Hover Over Child Items and Layers Displayed', async () => {
        await visible.hoverMenuParentItem();
        const isHovered = await visible.isMenuParentItemHovered();
        expect(isHovered).toBeTruthy();
        expect(await visible.ismenuChildItemDisplayed()).toBeTruthy();  
    });

    test('All Layers Displayed', async () => {
        await visible.hoverMenuParentItem();
        expect(await visible.ismenuChildItemClickednVisible()).toBeTruthy(); 
    });

});