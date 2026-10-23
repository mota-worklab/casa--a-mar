import { editorialGallery } from '../src/data/editorialGallery';
import { expect, test } from '@playwright/test';

for (const width of [320, 375, 430, 767]) {
  test('galeria editorial no mobile em ' + width + 'px', async ({ page }) => {
    await page.setViewportSize({ width, height: 850 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    const gallery = page.locator('[data-editorial-gallery]');
    await gallery.scrollIntoViewIfNeeded();
    const button = gallery.getByRole('button', { name: 'Abrir galeria', exact: true });
    await expect(button).toBeVisible();
    const buttonBox = await button.boundingBox();
    expect(buttonBox!.height).toBeGreaterThanOrEqual(48);
    const copy = await gallery.locator('.editorial-gallery-copy').boundingBox();
    const photos = gallery.locator('[data-editorial-photo]');
    await expect(photos).toHaveCount(editorialGallery.images.length);
    for (const photo of await photos.all()) {
      const box = await photo.boundingBox();
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width).toBeLessThanOrEqual(width);
      expect(box!.y).toBeGreaterThanOrEqual(copy!.y + copy!.height);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await button.click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(button).toBeFocused();
    await gallery.screenshot({ path: 'test-results/editorial-mobile-' + width + '.png' });
  });
}
