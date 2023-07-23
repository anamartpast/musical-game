import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://127.0.0.1:8080/home/home.html');
  await page.getByRole('link', { name: 'Jugar' }).getByRole('button').click();
});