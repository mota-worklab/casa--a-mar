import { expect, test } from '@playwright/test';

for (const width of [320, 375, 768, 1024, 1440]) {
  test(`navegação e composição em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    if (width < 900) {
      await page.getByRole('button', { name: 'Abrir menu' }).click();
      await page.getByRole('link', { name: 'A casa', exact: true }).click();
      await expect(page.getByRole('button', { name: 'Abrir menu' })).toHaveAttribute('aria-expanded', 'false');
    }
    await page.getByRole('button', { name: 'Explorar a galeria' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('ArrowRight');
    await expect(page.getByText('2 / 5')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Explorar a galeria' })).toBeFocused();
    await page.screenshot({ path: `test-results/casa-amar-${width}.png`, fullPage: true });
  });
}

test('respeita redução de movimento e mantém conteúdo sem vídeo', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  expect(await page.locator('html').evaluate((el) => getComputedStyle(el).scrollBehavior)).toBe('auto');
  await expect(page.locator('video[autoplay]')).toHaveCount(0);
});
