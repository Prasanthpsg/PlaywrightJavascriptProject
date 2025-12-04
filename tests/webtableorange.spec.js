import { test, expect } from '@playwright/test'

test('Web table handling', async ({ page }) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await expect(page).toHaveTitle("OrangeHRM")
    await page.getByRole('textbox', { name: 'username' }).fill("Admin")
    await page.getByRole('textbox', { name: 'password' }).pressSequentially('admin123')
    await page.getByRole('button', { name: ' Login ' }).click()

    await page.waitForSelector("//span[text()='Admin']", { state: 'visible' })
    await page.getByText('Admin', { exact: true }).click()

    await page.waitForSelector(".oxd-table-card .oxd-table-row.oxd-table-row--with-border",
        { state: 'visible' })
    const row = page.locator(".oxd-table-card .oxd-table-row.oxd-table-row--with-border",
        { state: 'visible' })
    // const texts = await row.locator('div:nth-child(3)').allTextContents()
    // console.log(texts)

    const matchedrow = row.filter({
        has: page.locator('div:nth-child(3)'),
        hasText: 'ESS'
    }).nth(0)

   console.log(await matchedrow.locator('div:nth-child(4)').textContent()) 

    await matchedrow.locator('input[type="checkbox"]').check({ force: true })
  //  await page.pause()

})

test('webtable handling with loop',  async ({ page }) => {

     await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await expect(page).toHaveTitle("OrangeHRM")
    await page.getByRole('textbox', { name: 'username' }).fill("Admin")
    await page.getByRole('textbox', { name: 'password' }).pressSequentially('admin123')
    await page.getByRole('button', { name: ' Login ' }).click()

    await page.waitForSelector("//span[text()='Admin']", { state: 'visible' })
    await page.getByText('Admin', { exact: true }).click()

    await page.waitForSelector(".oxd-table-card .oxd-table-row.oxd-table-row--with-border",
        { state: 'visible' })
    const row = page.locator(".oxd-table-card .oxd-table-row.oxd-table-row--with-border",
        { state: 'visible' })

    const rowCount = await row.count()
    console.log(`total rows are ${rowCount}`)
    for (let i = 0; i < rowCount; i++) {
        const role = await row.nth(i).locator('div:nth-child(3)').textContent()
        console.log(`role at row ${i} is ${role}`)
        if (role?.trim() === 'ESS') {
            await row.nth(i).locator('input[type="checkbox"]').check({ force: true })
            break;
        }
    }

   // await page.waitForSelector(page.getByRole('button', { name: ' Delete Selected ' }), { state: 'visible' })
    await page.getByRole('button', { name: ' Delete Selected ' }).waitFor({ state: 'visible' })
    await page.getByRole('button', { name: ' Delete Selected ' }).click()

    await expect(page.locator('.oxd-text--card-title')).toHaveText('Are you Sure?', {exact:true})

    await expect(page.locator('.oxd-text--card-body')).
    toContainText('The selected record will be permanently deleted. Are you sure you want to continue?')

    await expect(page.getByRole('button', { name: ' No, Cancel ' })).toBeVisible()
     await expect(page.getByRole('button', { name: ' Yes, Delete ' })).toBeVisible()

     await page.getByRole('button', { name: ' Yes, Delete ' }).click()
     await page.locator('.oxd-toast--success').waitFor({state: 'visible'})
     await expect(page.locator('.oxd-toast--success')).toContainText('Success') 



})


test.describe('orange hrm error scenario', () =>{

    test('invalid username and valid password', async({page}) =>{

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await expect(page).toHaveTitle("OrangeHRM")
    await page.getByRole('textbox', { name: 'username' }).fill("Admin22")
    await page.getByRole('textbox', { name: 'password' }).pressSequentially('admin123')
    await page.getByRole('button', { name: ' Login ' }).click()

    await page.locator("//p[text()='Invalid credentials']").waitFor({state:'visible'})
    await expect(page.locator("//p[text()='Invalid credentials']")).toHaveText("Invalid credentials")

    })

     test('Valid username and invalid password', async({page}) =>{

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await expect(page).toHaveTitle("OrangeHRM")
    await page.getByRole('textbox', { name: 'username' }).fill("Admin")
    await page.getByRole('textbox', { name: 'password' }).pressSequentially('admin13')
    await page.getByRole('button', { name: ' Login ' }).click()

    await page.locator("//p[text()='Invalid credentials']").waitFor({state:'visible'})
    await expect(page.locator("//p[text()='Invalid credentials']")).toHaveText("Invalid credentials")
    
    })
})