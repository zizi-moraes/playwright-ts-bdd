import { defineConfig, devices, PlaywrightTestConfig, BrowserContextOptions } from '@playwright/test';

const baseConfig: PlaywrightTestConfig = {
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
  },
};

const createBrowserConfig = (name: string, headless: boolean, contextOptions?: BrowserContextOptions) => ({
  name: `${name.toLowerCase()}-${headless ? 'headless' : 'non-headless'}`,
  use: {
    ...devices[`Desktop ${name}`],
    headless,
    contextOptions,
  },
});

export default defineConfig({
  ...baseConfig,
  projects: [
    {
      name: 'chromium-headless',
      use: { ...devices['Desktop Chrome'], headless: false },
    },
    {
      name: 'firefox-headless',
      use: { ...devices['Desktop Firefox'], headless: false },
    },
    {
      name: 'webkit-headless',
      use: { ...devices['Desktop Safari'], headless: false },
    },
  ],
});
