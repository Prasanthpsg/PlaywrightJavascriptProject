import {expect, test} from '@playwright/test'


test.only('1st login test', {tag : '@login',}, async ({page,browser }, testInfo) =>{
    test.info().annotations.push({
    type: 'browser version',
    description: browser.version(),})
    console.log(`${testInfo.workerIndex}`)
    console.log('1 test - login feature')
    await page.goto('https://www.cricbuzz.com/cricket-series/9237/indian-premier-league-2025')
    await page.getByTitle('Table', {exact:true}).click()
   console.log(`user name ${process.env.USER_NAME}`)
    console.log(`user name ${process.env.PASSWORD}`)
})


test('2nd login test',async ({page}, testInfo) =>{
     console.log(`${testInfo.workerIndex}`)
    console.log('2 test - login feature')
     await page.goto('https://www.cricbuzz.com/cricket-series/9237/indian-premier-league-2025')
    await page.getByTitle('Table', {exact:true}).click()
})


test('3rd login test',async ({page}, testInfo) =>{
     console.log(`${testInfo.workerIndex}`)
    console.log('3 test - login feature')
     await page.goto('https://www.cricbuzz.com/cricket-series/9237/indian-premier-league-2025')
    await page.getByTitle('Table', {exact:true}).click()
})

test('4th login test',async ({page}, testInfo) =>{
     console.log(`${testInfo.workerIndex}`)
    console.log('4 test - login feature')
     await page.goto('https://www.cricbuzz.com/cricket-series/9237/indian-premier-league-2025')
    await page.getByTitle('Table', {exact:true}).click()
}) 