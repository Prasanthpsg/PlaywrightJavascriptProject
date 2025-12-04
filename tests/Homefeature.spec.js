import {test} from '@playwright/test'

test('1st home test', async ({page}, testInfo) =>{
     console.log(`${testInfo.workerIndex}`)
    console.log('1 test - home feature')
     await page.goto('https://www.cricbuzz.com/cricket-series/9237/indian-premier-league-2025')
    await page.getByTitle('Squads', {exact:true}).click()
})


test('2nd home test', async ({page}, testInfo) =>{
     console.log(`${testInfo.workerIndex}`)
    console.log('2 test - home feature')
     await page.goto('https://www.cricbuzz.com/cricket-series/9237/indian-premier-league-2025')
    await page.getByTitle('Squads', {exact:true}).click()
})


test('3rd home test', async ({page}, testInfo) =>{
     console.log(`${testInfo.workerIndex}`)
    console.log('3 test - home feature')
     await page.goto('https://www.cricbuzz.com/cricket-series/9237/indian-premier-league-2025')
    await page.getByTitle('Squads', {exact:true}).click()
})

