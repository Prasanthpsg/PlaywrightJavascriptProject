import { expect } from '@playwright/test';

export class SauceHomePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.inventoryContainer = this.page.locator('.inventory_container');
        this.sauceLabsBackpack = this.page.locator('#add-to-cart-sauce-labs-backpack');
        this.sauceLabsBikelight = this.page.locator('#add-to-cart-sauce-labs-bike-light');
        this.sauceLabsBackpackImage = this.page.getByAltText('Sauce Labs Backpack');
        this.sauceLabsBackpackprice = this.page.locator('//button[@id="add-to-cart-sauce-labs-backpack"]/../div[@data-test="inventory-item-price"]');
        this.sauceLabsBikelightprice = this.page.locator('//button[@id="add-to-cart-sauce-labs-bike-light"]/../div[@data-test="inventory-item-price"]');
         this.sauceLabsBackpackremove = this.page.locator('#remove-sauce-labs-backpack');
        this.sauceLabsBikelightremove = this.page.locator('#remove-sauce-labs-bike-light');
        this.cartBadge = this.page.locator('.shopping_cart_badge');
        this.shoppingCartLink = this.page.locator('.shopping_cart_link');
        this.productNameHomePage = this.page.locator('//div[@class="inventory_item_name "]');
         
    }

    async isLoaded() {
        await this.inventoryContainer.waitFor({ state: 'visible' });
    }

    async addBackpackToCart() {
        await this.sauceLabsBackpack.click();
    }

    async addBikeLightToCart() {
        await this.sauceLabsBikelight.click();
    }

    async verifyBackpackImage() {
        return await this.sauceLabsBackpackImage.isVisible();
    }

    async getBackpackPrice() {
        return await this.sauceLabsBackpackprice.textContent();
    }

    async getBikeLightPrice() {
        return await this.sauceLabsBikelightprice.textContent();
    }

    async validateRemoveBackpackFromCart() {
        const remove1 = await this.sauceLabsBackpackremove.textContent();
        expect(remove1).toBe('Remove');
    }

    async validateRemoveBikeLightFromCart() {
        const remove2 = await this.sauceLabsBikelightremove.textContent();
        expect(remove2).toBe('Remove');
    }

    async getCartItemCount() {
        await this.cartBadge.waitFor({ state: 'visible' });
        return await this.cartBadge.textContent();
    }

    async goToCart() {
        await this.shoppingCartLink.waitFor({ state: 'visible' });
        await this.shoppingCartLink.click();
    }

    async clickProductByName(productName) {
        const productLocator =  this.productNameHomePage.filter({ hasText: productName, exact: true });
        await productLocator.waitFor({ state: 'visible' });
        await productLocator.click();
    }

    async getproductPriceByName(productName) {
        const productPriceLocator =  this.productNameHomePage.filter({ hasText: productName, exact: true })
                            .locator('..').locator('..').locator('..')
                            .locator('//div[@class="pricebar"]/div[@class="inventory_item_price"]');
        await productPriceLocator.waitFor({ state: 'visible' });
        return await productPriceLocator.textContent();
    }

}