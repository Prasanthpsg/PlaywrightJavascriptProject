export class SauceCartPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
         this.cartPage = this.page.locator('.cart_list');
         this.continueShoppingButton = this.page.locator('#continue-shopping');
         this.checkoutButton = this.page.locator('#checkout');
    }   

    async isLoaded() {
        await this.cartPage.waitFor({ state: 'visible' });
    }

    async verifyContinueShoppingButton() {
        return await this.continueShoppingButton.isVisible();
    }

    async clickCheckout() {
        await this.checkoutButton.waitFor({ state: 'visible' });
        await this.checkoutButton.click();
    }




}