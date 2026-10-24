import { experiences } from '../src/data/experiences';
import { expect, test } from '@playwright/test';

for (const viewport of [
  { width: 320, height: 640 }, { width: 375, height: 812 },
  { width: 768, height: 1024 }, { width: 1024, height: 768 },
  { width: 1440, height: 900 },
]) {
  test('experiências legíveis e sobreposição em ' + viewport.width + 'px', async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    const section = page.locator('#experiencias');
    const box = await section.boundingBox();
    if (viewport.width >= 1024) expect(box!.height).toBeLessThanOrEqual(viewport.height + 1);
    const beach = await section.locator('.local-experiences-beach').boundingBox();
    const detail = await section.locator('.local-experiences-detail').boundingBox();
    if (viewport.width < 768) {
      expect(beach!.height).toBeGreaterThanOrEqual(250);
      expect(detail!.height).toBeGreaterThanOrEqual(170);
      expect(detail!.width).toBeGreaterThanOrEqual(100);
      const list = await section.locator('.local-experiences-list').boundingBox();
      expect(list!.y).toBeGreaterThanOrEqual(Math.max(beach!.y + beach!.height, detail!.y + detail!.height) + 20);
    }
    expect(detail!.x).toBeGreaterThan(beach!.x);
    expect(detail!.x).toBeLessThan(beach!.x + beach!.width);
    expect(detail!.x + detail!.width).toBeGreaterThan(beach!.x + beach!.width);
    expect(detail!.y).toBeGreaterThanOrEqual(beach!.y);
    expect(detail!.y + detail!.height).toBeLessThanOrEqual(beach!.y + beach!.height + 26);
    const bottom = box!.y + box!.height;
    const map = await section.getByRole('link', { name: /Explorar Guaibim no mapa/ }).boundingBox();
    expect(map!.y + map!.height).toBeLessThanOrEqual(bottom);
    await expect(section.locator('ol li')).toHaveCount(experiences.length);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await section.screenshot({ path: 'test-results/experiences-one-screen-' + viewport.width + '.png' });
  });
}
