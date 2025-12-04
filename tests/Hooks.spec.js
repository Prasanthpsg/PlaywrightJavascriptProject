import {test, expect} from '@playwright/test'

test.beforeAll('before all' , async({page}) => {
     console.log('It will run before all the available test cases executes')
})

test.afterAll('After all' , async({page}) => {
     console.log('It will run after all the available test cases executes')
})

test.beforeEach('before each run', async({page}) =>{
    console.log('It will run before each test case executes')
})

test.afterEach('After each run', async({page}) =>{
    console.log('It will run after each test case executes')
})

test('1st testcase - click table', async ({page}) => {

    await page.goto('https://www.cricbuzz.com/cricket-series/9237/indian-premier-league-2025')
    await page.getByTitle('Table', {exact:true}).click()
    await page.screenshot({path: 'test-results/screenshots/IPL.jpg',
        fullPage : true
    })
    console.log('1st testcase done')
})


test('2nd testcase - squads table', async ({page}) => {

    await page.goto('https://www.cricbuzz.com/cricket-series/9237/indian-premier-league-2025')
    await page.getByTitle('Squads', {exact:true}).click()
     console.log('2nd testcase done')
})