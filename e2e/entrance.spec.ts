import { expect, test } from '@playwright/test';

for (const width of [320, 375, 768, 1440]) {
  test('abertura e recarregamento em ' + width + 'px', async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('/');
    await expect(page.locator('.site-entrance')).toBeVisible();
    await page.getByRole('button', { name: 'Pular abertura' }).click();
    await expect(page.locator('.site-entrance')).toHaveCount(0);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await page.reload();
    await expect(page.locator('.site-entrance')).toBeVisible();
    await expect(page.locator('.site-entrance')).toHaveCount(0, { timeout: 3500 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.locator('#inicio').screenshot({ path: 'test-results/entrance-hero-' + width + '.png' });
  });
}

test('movimento reduzido acessa a página diretamente', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.site-entrance')).toHaveCount(0);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});
