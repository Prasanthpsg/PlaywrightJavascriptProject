import { chromium, test } from '@playwright/test'

test('multi browser validation', async ({ }, testInfo) => {
     console.log(`${testInfo.workerIndex}`)
    const browser = await chromium.launch()
    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto('https://google.com')
    console.log(await page.title())

    const browser1 = await chromium.launch()
    const context1 = await browser1.newContext()
    const page1 = await context1.newPage()

    await page1.goto('https://the-internet.herokuapp.com/javascript_alerts')
    console.log(await page1.title())

})


test('Multi tab validation', async ({ context }, testInfo) => {
     console.log(`${testInfo.workerIndex}`)
    const page1 = await context.newPage()
    await page1.goto('https://google.com')
    console.log(await page1.title())


    const page2 = await context.newPage()
     await page2.goto('https://the-internet.herokuapp.com/javascript_alerts')
    console.log(await page2.title())
})

test('switch to new tab', async({browser })=>{

    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    const [newtab] = await Promise.all([
         context.waitForEvent('page'),
         page.getByRole('link', {name: 'OrangeHRM, Inc'}).click()

    ])

    await newtab.waitForLoadState();
    console.log("New Tab URL:", newtab.url());

    await newtab.getByPlaceholder('Your email address').fill('new tab')
  //  const allLinks = await newtab.locator('.nav-link').allInnerTexts()
    const allLinks =  newtab.locator('.nav-link')
  //  console.log(`all links: ${allLinks}`)
    for(let i=0;i<await allLinks.count();i++){
        console.log(await allLinks.nth(i).textContent())
    }

    await newtab.close()

    // Back to parent tab
    console.log("Back to parent tab:", page.url());

    console.log(await page.title()) // Continue actions on parent

})