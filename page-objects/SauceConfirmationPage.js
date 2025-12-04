export class SauceConfirmationPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.confirmationTitle = this.page.locator('.title');
        this.confirmationMessage = this.page.locator('.complete-header');
        this.confirmationSubMessage = this.page.locator('.complete-text');
    }

    async isLoaded() {
        await this.confirmationTitle.waitFor({ state: 'visible' });
    }

    async getConfirmationMessage() {
        return await this.confirmationMessage.textContent();
    }

    async getConfirmationSubMessage() {
        return await this.confirmationSubMessage.textContent();
    }
}