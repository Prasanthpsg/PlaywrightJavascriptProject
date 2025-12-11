import { test, expect } from '@playwright/test'
import { SauceLoginPage } from '../page-objects/SauceLoginPage.js'
import { SauceHomePage } from '../page-objects/SauceHomePage.js'
import { SauceCartPage } from '../page-objects/SauceCartPage.js'
import { SauceCheckOutPage } from '../page-objects/SauceCheckOutpage.js'
import { SauceOverviewPage } from '../page-objects/SauceOverviewPage.js'
import { SauceConfirmationPage } from '../page-objects/SauceConfirmationPage.js'

test('Sauce Lab demo test', async ({ page }) => {

    const sauceLoginPage = new SauceLoginPage(page);
    await sauceLoginPage.goto();
    await sauceLoginPage.login('standard_user', 'secret_sauce');

    const sauceHomePage = new SauceHomePage(page);
    await sauceHomePage.isLoaded();
    await expect(page).toHaveTitle('Swag Labs');

    expect(await sauceHomePage.verifyBackpackImage()).toBeTruthy();
    let backpackPrice = await sauceHomePage.getBackpackPrice();
    backpackPrice = parseFloat(backpackPrice.replace("$", ""));
    console.log(`Backpack price is ${backpackPrice}`);

    let bikeLightPrice = await sauceHomePage.getBikeLightPrice();
    bikeLightPrice = parseFloat(bikeLightPrice.replace("$", ""));
    console.log(`Bike Light price is ${bikeLightPrice}`);

    const totalPrice1 = backpackPrice + bikeLightPrice;
    console.log(`Total price is ${totalPrice1}`);

    await sauceHomePage.addBackpackToCart();
    await sauceHomePage.addBikeLightToCart();

    await sauceHomePage.validateRemoveBackpackFromCart();
    await sauceHomePage.validateRemoveBikeLightFromCart();

    expect(await sauceHomePage.getCartItemCount()).toBe('2');

    await sauceHomePage.goToCart();
    const sauceCartPage = new SauceCartPage(page);
    sauceCartPage.isLoaded();
    expect(await sauceCartPage.verifyContinueShoppingButton()).toBeTruthy();
    await sauceCartPage.clickCheckout();


    const sauceCheckOutPage = new SauceCheckOutPage(page);
    await sauceCheckOutPage.isLoaded();
    const checkoutTitle = await sauceCheckOutPage.validateCheckoutTitle();
    expect(checkoutTitle).toBe('Checkout: Your Information');


    await sauceCheckOutPage.enterCheckoutInformation('John', 'Doe', '12345');
    await sauceCheckOutPage.clickContinue();

    const sauceOverviewPage = new SauceOverviewPage(page);
    await sauceOverviewPage.isLoaded();
    const overviewTitle = await sauceOverviewPage.validateOverviewTitle();
    expect(overviewTitle).toBe('Checkout: Overview');
    const paymentInfo = await sauceOverviewPage.getPaymentInformation();
    console.log(`Payment Information: ${paymentInfo}`);
    const shippingInfo = await sauceOverviewPage.getShippingInformation();
    console.log(`Shipping Information: ${shippingInfo}`);
    let totalPrice = await sauceOverviewPage.getTotalPrice();
    console.log(`Total Price in the overview screen: ${totalPrice}`);

    expect(parseFloat(totalPrice.split(":")[1].trim().replace("$", ""))).toBeCloseTo(totalPrice1, 2);

    await sauceOverviewPage.clickFinish();

    await expect(page).toHaveURL(/.*checkout-complete.html/);
    const sauceConfirmationPage = new SauceConfirmationPage(page);
    await sauceConfirmationPage.isLoaded();
    const confirmationMessage = await sauceConfirmationPage.getConfirmationMessage();
    expect(confirmationMessage).toContain('Thank you for your order!'); 
    const confirmationSubMessage = await sauceConfirmationPage.getConfirmationSubMessage();
    console.log(`Confirmation Sub Message: ${confirmationSubMessage}`);

})

test.only('home page fetch test', async ({ page }) => {

    const sauceLoginPage = new SauceLoginPage(page);
    await sauceLoginPage.goto();
    await sauceLoginPage.login('standard_user', 'secret_sauce');

    const sauceHomePage = new SauceHomePage(page);
    await sauceHomePage.isLoaded();
    //  await sauceHomePage.clickProductByName('Sauce Labs Onesie');
    const onesiePrice = await sauceHomePage.getproductPriceByName('Sauce Labs Onesie');
    console.log(`Price of Sauce Labs Onesie: ${onesiePrice}`);

});

