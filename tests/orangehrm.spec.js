// @ts-check

import { expect, test } from '@playwright/test';

test('login test', async ({ page }) => {

    await page.goto(`${process.env.orangehrmURL}`)
    await expect(page).toHaveTitle("OrangeHRM")
    await page.getByRole('textbox', { name: 'username' }).fill(`${process.env.USER_NAME}`)
    await page.getByRole('textbox', { name: 'password' }).pressSequentially(`${process.env.PASSWORD}`)
    await page.getByRole('button', { name: ' Login ' }).click()


})

test('Found it page', async ({ page }) => {

    await page.goto('https://recruiter.foundit.in/create-profile-page/')
    await page.getByPlaceholder('First Name').fill('prasanth')
    await page.getByPlaceholder('Last Name').fill('kandasam')
    await expect(page.locator('#email_id')).toBeVisible();
    await page.locator('#email_id').fill('kprasan252@gmail.com')
    await page.getByPlaceholder('Enter mobile number with country code').fill("+91 93434344")
    await page.locator("select[name='current_location']").selectOption('Chennai')
    await page.locator('textarea[name="description_one"]').fill('text area enter')

    //professional details
    await page.getByRole('textbox', { name: 'Current Company Name' }).fill('sdd company')
    await page.getByRole('textbox', { name: 'Current Designation' }).fill('latest designation')
    await page.locator('select[name="current_company_from"]').first().selectOption('2019')
    await page.locator('select[name="current_company_to"]').first().selectOption('2024')

    //company address
    await page.getByLabel('Address 1*', { exact: true }).fill('25/237B, sathy road')
    await page.getByLabel('Address 2').fill('kamaraj street')
    await page.getByLabel('City').fill('city name')
    await page.getByLabel('State/ Province/ Region').fill('state name')
    await page.getByLabel('Country').fill('india')
    await page.getByLabel('Zip Code').fill('231114')

    //Hiring
    await page.locator('select[name="total_experience"]').first().selectOption('8+ Year')
    await page.locator('.dropdown.level-i-hire').first().click()
    await page.getByLabel('Junior Level').check()
    await page.getByLabel('Mid Level').check()
    await expect(page.getByLabel('Mid Level')).toBeChecked()

    await page.locator('#get_industry_list').first().click()
    await page.getByLabel('Beverages/Liquor').check()
    await page.getByLabel('Fertilizers/Pesticides/Agro chemicals').check()
    await expect(page.getByLabel('Beverages/Liquor')).toBeChecked()

    //Function selection
    await page.locator('#get_category_list').first().click()
    await page.getByLabel('Pharmaceutical/Biotechnology').check()
    await page.getByLabel('Manufacturing/Engineering/R&D').check()
    await expect(page.getByLabel('Pharmaceutical/Biotechnology')).toBeChecked()
    // const functionSection = page.getByLabel(' Function ', {exact: false}).locator('..')
    await expect(page.getByLabel('Banking', { exact: true })).not.toBeChecked()
    await page.getByRole('textbox', {name: 'Skills I hire for'}).fill('UAE role')

    await page.getByRole('button', {name: 'Submit'}).click()

   // await page.pause()

})


test('@orange login test validation', async({page}) => {

      await page.goto('https://recruiter.foundit.in/create-profile-page/')
      await page.getByRole('link', {name: 'Login'}).nth(2).click()
      console.log(await page.title())

      await page.getByText('Login/Sign up', {exact:true}).first().click()
      await page.getByRole('textbox', {name : 'Enter Username', exact:true}).fill('qqwqw12')
      await page.locator('#password').first().fill('wewesas')
      await page.getByText('Login', {exact:true}).first().click()
      await page.waitForSelector('.error-msg.login_form_error', {state: 'visible'})
     const errormsg= await page.locator('.error-msg.login_form_error').textContent()
     console.log(`error is ${errormsg}`)
})

test('@orange get attribute value', async ({page}) =>{

    await page.goto('https://recruiter.foundit.in/create-profile-page/')
    console.log(await page.locator('textarea[name="description_one"]').getAttribute("maxlength"))

    const allText = await page.locator('//input[@type="text"]//../label').allTextContents()
    console.log(allText)

    //await page.getByRole('button', {name: 'Toggle navigation'}).click()
    const list =  page.locator("li[class='nav-item22']")
    await list.locator('a').filter({hasText: 'Testimonials'}).click()
    await page.waitForURL('**/testimonial/')

  //  await page.pause()


})