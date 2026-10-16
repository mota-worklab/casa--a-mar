import type { Plugin } from 'vite';

export function publicOrigin(value?: string): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.username || url.password || url.pathname !== '/' || url.search || url.hash) return null;
    return url.origin;
  } catch { return null; }
}

export function seoPlugin(siteUrl?: string): Plugin {
  const origin = publicOrigin(siteUrl);
  return {
    name: 'casa-amar-seo',
    transformIndexHtml() {
      return origin ? [
        { tag: 'link', attrs: { rel: 'canonical', href: `${origin}/` }, injectTo: 'head' },
        { tag: 'meta', attrs: { property: 'og:url', content: `${origin}/` }, injectTo: 'head' },
      ] : [{ tag: 'meta', attrs: { name: 'robots', content: 'noindex, nofollow' }, injectTo: 'head' }];
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: origin ? `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n` : 'User-agent: *\nDisallow: /\n' });
      if (origin) this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${origin}/</loc></url></urlset>` });
    },
  };
}
