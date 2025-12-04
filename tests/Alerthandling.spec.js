import {test} from '@playwright/test'

test('Simple alert', async ({page}, testInfo) =>{
    console.log(`${testInfo.workerIndex}`)
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts')
    page.once('dialog', async dialog => {
        console.log(`message: ${dialog.message()}`)
          console.log(`message: ${dialog.type()}`)
        dialog.accept()
})

// Get the iframe
    //const frame = page.frameLocator('iframe');
    await page.getByRole('button', {name: 'Click for JS Alert'}).click()

})

test('Confirmation alert', async ({page}, testInfo) =>{
     console.log(`${testInfo.workerIndex}`)
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts')
    page.once('dialog', async dialog => {
        console.log(`message: ${dialog.message()}`)
          console.log(`message: ${dialog.type()}`)
       // dialog.accept()
       dialog.dismiss()
})

// Get the iframe
    //const frame = page.frameLocator('iframe');
    await page.getByRole('button', {name: 'Click for JS Confirm'}).click()

})

test('Prompt alert', async ({page}, testInfo) =>{
     console.log(`${testInfo.workerIndex}`)
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts')
    page.once('dialog', async dialog => {
        console.log(`message: ${dialog.message()}`)
          console.log(`message: ${dialog.type()}`)
        dialog.accept('prompt entered')
})

// Get the iframe
    //const frame = page.frameLocator('iframe');
    await page.getByRole('button', {name: 'Click for JS Prompt'}).click()
    await page.close()
})