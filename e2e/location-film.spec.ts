import { expect, test } from '@playwright/test';

for (const width of [375, 1440]) {
  test(`vídeo de chegada inicia na seção em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');

    const video = page.locator('#localizacao video');
    await video.scrollIntoViewIfNeeded();
    await expect.poll(() => video.evaluate((element: HTMLVideoElement) => !element.paused), { timeout: 15000 }).toBe(true);
    expect(await video.evaluate((element) => getComputedStyle(element.parentElement!).clipPath)).toContain('polygon(');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.waitForTimeout(700);
    await page.screenshot({ path: `test-results/localizacao-video-${width}.png` });

    await page.evaluate(() => scrollTo(0, 0));
    await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.paused)).toBe(true);
  });
}
