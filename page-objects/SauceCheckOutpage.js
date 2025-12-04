export class SauceCheckOutPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.title = this.page.locator('.title');
        this.firstNameInput = this.page.locator('#first-name');
        this.lastNameInput = this.page.locator('#last-name');
        this.postalCodeInput = this.page.locator('#postal-code');
        this.continueButton = this.page.locator('#continue');
    }
    
    async isLoaded() {
        await this.title.waitFor({ state: 'visible' });
    }

    async validateCheckoutTitle() {
       return await this.title.textContent();
    }

    async enterCheckoutInformation(firstName, lastName, postalCode) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async clickContinue() {
        await this.continueButton.click();
    }

}