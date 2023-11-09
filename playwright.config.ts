import { defineConfig, devices } from '@playwright/test';
import { URL } from 'node:url'

const port = 5173
const basePath = process.env.BASE_PATH
const url = new URL(basePath || '', `http://localhost:${port}`).toString()

const shellescape = (s: string | { toString: () => string }): string => {
  const s0 = typeof s !== 'string' ? s.toString() : s
  if (s0 === '') return "''"
  return s0.replaceAll(/[^A-Za-z0-9_\-.,:+\/@\n]/g, c => `\\${c}`)
    .replaceAll(/\n/g, "'\n'")
}

const shelljoin = (a: (string | { toString: () => string })[]): string =>
  a.map(shellescape).join(' ')

// https://playwright.dev/docs/test-configuration.
export default defineConfig({
  testDir: './test/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: url,
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  webServer: {
    command: shelljoin([
      'npm', 'run', 'preview', '--', '--port', port,
      ...(basePath ? ['--base', basePath] : []),
    ]),
    url: url,
    reuseExistingServer: !process.env.CI,
  },
})
