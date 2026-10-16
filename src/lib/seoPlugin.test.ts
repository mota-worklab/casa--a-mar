import { describe, expect, it } from 'vitest';
import { publicOrigin } from './seoPlugin';

describe('origem pública para SEO', () => {
  it.each([undefined, '', 'javascript:alert(1)', 'http://example.org', 'https://user:pass@example.org', 'https://example.org/subpath', 'https://example.org/?x=1'])('recusa origem ausente ou inválida: %s', (value) => {
    expect(publicOrigin(value)).toBeNull();
  });
  it('normaliza apenas a origem HTTPS aprovada', () => {
    expect(publicOrigin('https://example.org/')).toBe('https://example.org');
  });
});
