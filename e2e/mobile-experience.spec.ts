import { expect, test } from '@playwright/test';

for (const width of [320, 375, 390, 430, 768]) {
  test('leitura e toque em ' + width + 'px', async ({ page }) => {
    await page.setViewportSize({ width, height: 812 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    for (const selector of ['.hero-description', '.section-copy', '.space-caption p', '.amenity-group li', '.faq summary', '.faq details p']) {
      for (const element of await page.locator(selector).all()) {
        expect(await element.evaluate(el => parseFloat(getComputedStyle(el).fontSize))).toBeGreaterThanOrEqual(15);
      }
    }
    for (const selector of ['.menu-toggle', '.hero-actions .booking-link', '.section-heading-row button', '.faq summary']) {
      const box = await page.locator(selector).first().boundingBox();
      expect(box!.height).toBeGreaterThanOrEqual(44);
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width).toBeLessThanOrEqual(width);
    }
    if (width < 700) {
      const sticky = await page.locator('.mobile-booking').boundingBox();
      expect(sticky!.y + sticky!.height).toBeLessThanOrEqual(812);
    }
    await page.getByRole('button', { name: 'Abrir menu' }).click();
    await page.getByRole('link', { name: 'Ambientes', exact: true }).click();
    await page.getByRole('button', { name: 'Explorar a galeria' }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    expect(await dialog.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
    await page.getByRole('button', { name: 'Fechar galeria' }).click();
    await page.locator('.faq summary').first().click();
    await expect(page.locator('.faq details').first()).toHaveAttribute('open', '');
    await page.screenshot({ path: 'test-results/mobile-experience-' + width + '.png', fullPage: true });
  });
}
