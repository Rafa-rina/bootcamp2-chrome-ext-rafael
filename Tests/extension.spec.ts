import { test, expect, chromium } from '@playwright/test';
import path from 'node:path';

const dist = path.resolve(__dirname, '..', 'dist');

test('content script injeta elemento na página', async () => {
  const context = await chromium.launchPersistentContext('', {
    headless: true,
    args: [
      `--disable-extensions-except=${dist}`,
      `--load-extension=${dist}`
    ]
  });

  const page = await context.newPage();
  await page.goto('https://example.com', { waitUntil: 'networkidle' });

  const exists = await page.locator('#ext-marker').count();
  expect(exists).toBeGreaterThan(0);

  await context.close();
});
