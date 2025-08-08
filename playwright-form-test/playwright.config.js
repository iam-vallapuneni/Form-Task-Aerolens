import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 90000,   // 90 seconds timeout per test
  reporter: [
    ['html', { open: 'always' }],   // HTML report, auto-open after tests
    ['allure-playwright']            // Allure report integration
  ],
  use: {
    headless: false,   // Run tests with browser UI visible
    // You can add other global options here, e.g.:
    // viewport: { width: 1280, height: 720 },
    // actionTimeout: 0,
    // ignoreHTTPSErrors: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    // Add other browsers if you want:
    // {
    //   name: 'firefox',
    //   use: { browserName: 'firefox' },
    // },
    // {
    //   name: 'webkit',
    //   use: { browserName: 'webkit' },
    // },
  ],
});
