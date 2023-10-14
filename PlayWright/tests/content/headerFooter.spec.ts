import { test, expect } from '@playwright/test';
import { headerFooter } from '../../strategies/content/headerFooter/headerFooter';
import { setupTestEnvironment } from '../../strategies/helpers/testSetup';

test.describe('Component Visibility Test', () => {
    let visible: headerFooter;

    test.beforeAll(async ({}, testInfo) => {

        testInfo.setTimeout(testInfo.timeout + 180000);

        const { page } = await setupTestEnvironment('https://example.com/en');

        visible = new headerFooter(page);
    });

    test('header is displayed', async () => {
        expect(await visible.isHeaderDisplayed).toBeTruthy();
    });

    test('header logo is displayed', async () => {
        expect(await visible.isHeaderLogoDisplayed).toBeTruthy();
    });

    test('footer is displayed', async () => {
        expect(await visible.isFooterDisplayed).toBeTruthy();
    });

    test('footer image is displayed', async () => {
        expect(await visible.isFooterImageDisplayed).toBeTruthy();
    });

    test('socila media text is displayed', async () => {
        expect(await visible.isSocialMedia1Displayed).toBeTruthy();
        expect(await visible.isSocialMedia2Displayed).toBeTruthy();
    });

    test('copywright year is displayed', async () => {
        expect(await visible.isCopywrightDisplayed).toBeTruthy();
    });
});
