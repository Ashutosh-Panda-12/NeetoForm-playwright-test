import { defineConfig, devices } from '@playwright/test';
import { STORAGE_STATE } from './e2e/constants/common';
import dotenv from "dotenv";

dotenv.config({ path: ".env"});

export default defineConfig({
  testDir: './e2e',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: 'html',
  timeout: 2 * 60 * 1000,
  expect: {
    timeout: 15*1000,
  },
  use: {
    trace: 'on',
    testIdAttribute: 'data-cy',
    baseURL: 'https://neeto-form-web-playwright.neetodeployapp.com/',
  },

  projects: [
    {
      name: 'login',
      use: { ...devices['Desktop Chrome'] },
      testMatch: "/login.setup.ts",
    },
    {
      name: "teardown",
      use: { ...devices["Desktop Chrome"] },
      testMatch: "/global.teardown.ts",
    },
    {
      name: "Logged In tests",
      use: { ...devices["Desktop Chrome"], storageState: STORAGE_STATE },
      dependencies: ["login"],
      teardown: "teardown",
      testMatch: "/*.spec.ts",
    },
  ],
});
