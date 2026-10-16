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
    await page.getByRole('button', { name: 'Fechar galeria' }).focus();
    await page.keyboard.press('Shift+Tab');
    await expect(page.getByRole('button', { name: 'Próxima imagem' })).toBeFocused();
    await page.keyboard.press('ArrowRight');
    await expect(page.getByText('2 / 5')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Explorar a galeria' })).toBeFocused();
    const question = page.locator('summary').first();
    await question.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('details').first()).toHaveAttribute('open', '');
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

for (const width of [320, 375, 768, 1024, 1440]) {
  test(`rasgo do hero estável e responsivo em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    const hero = page.locator('#inicio');
    const mask = await hero.evaluate((el) => getComputedStyle(el).maskImage);
    expect(mask).toContain('hero-torn-edge.svg');
    await expect(hero.getByRole('heading', { level: 1 })).toBeVisible();
    expect(await hero.evaluate((el) => getComputedStyle(el).animationName)).toBe('none');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await hero.screenshot({ path: `test-results/hero-torn-${width}.png` });
    await page.evaluate(() => window.scrollTo(0, 160));
    expect(await hero.evaluate((el) => getComputedStyle(el).maskImage)).toBe(mask);
  });
}

for (const viewport of [
  { width: 1024, height: 600 },
  { width: 1280, height: 720 },
  { width: 1366, height: 768 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
]) {
  test(`hero ocupa uma tela em ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    const hero = page.locator('#inicio');
    const bounds = await hero.boundingBox();
    expect(bounds).not.toBeNull();
    expect(Math.abs(bounds!.height - viewport.height)).toBeLessThanOrEqual(1);
    const safeBottom = await hero.evaluate((el) => {
      const style = getComputedStyle(el);
      return el.getBoundingClientRect().bottom - parseFloat(style.paddingBottom);
    });
    for (const selector of ['.site-header', 'h1', '.hero-description', '.hero-actions', '.hero-bottom']) {
      const box = await hero.locator(selector).boundingBox();
      expect(box).not.toBeNull();
      expect(box!.y).toBeGreaterThanOrEqual(0);
      expect(box!.y + box!.height).toBeLessThanOrEqual(safeBottom + 1);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await hero.screenshot({ path: `test-results/hero-viewport-${viewport.width}x${viewport.height}.png` });
  });
}
