// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */

// Read command-line argument: --env=mqa or --env=preprod
let envName = process.env.ENV ? process.env.ENV : 'mqa';
console.log('loaded environemnt: ', envName)

dotenv.config({ path: path.resolve(__dirname, `.env.${envName.trim()}`) , override:true});

//dotenv.config();
//console.log("File exists:", fs.existsSync(path.resolve(__dirname, `.env.${envName}`)));
// if(  envName.trim() === 'mqa'){
//   console.log(`inside mqa`)
//   dotenv.config({ path: path.join(__dirname, '.env.mqa') , override:true});
// }else{
//   console.log(`inside dev`)
//   dotenv.config({ path: path.join(__dirname, '.env.dev') , override:true});
// }

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  retries : 0,
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  //forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  //retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  //workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', {open: 'never'}]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',
    headless : false,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'off',
   screenshot: 'only-on-failure' ,
   fullPage: true,
   video: 'off',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'MQASmoke',
      testMatch: /MQAsmoke\.spec\.js/,
      fullyParallel : true, // to run test cases parallely
      workers:2, // to run spec/test files in parallel
      retries :0
    },

    // {
    //   name: 'Sanity',
    //   testMatch: /.*feature\.spec\.js$/i,
    //   fullyParallel : false, // to run test cases parallely
    //   workers:3, // to run spec/test files in parallel
    //   retries :0
    // },

    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], 
        viewport : 
        {width: 1280, height: 600} 
      },
      
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

