import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://teoriamusical.info/');
  await page.getByRole('button', { name: 'Jugar' }).nth(2).click();
  await page.close();
});