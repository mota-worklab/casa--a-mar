import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  contextRevert: vi.fn(), mediaRevert: vi.fn(), fromTo: vi.fn(), timeline: vi.fn(),
  reduced: false, desktop: true, cleanup: undefined as (() => void) | undefined,
}));
vi.mock('gsap', () => ({
  gsap: {
    registerPlugin: vi.fn(),
    context: (callback: () => (() => void)) => {
      mocks.cleanup = callback();
      return { revert: () => { mocks.contextRevert(); mocks.cleanup?.(); } };
    },
    matchMedia: () => ({
      add: (_queries: unknown, callback: (context: { conditions: Record<string, boolean> }) => void) =>
        callback({ conditions: { desktop: mocks.desktop, tablet: false, mobile: !mocks.desktop, reduced: mocks.reduced } }),
      revert: mocks.mediaRevert,
    }),
    timeline: mocks.timeline,
  },
}));
vi.mock('gsap/ScrollTrigger', () => ({ ScrollTrigger: {} }));
import { mountEditorialMotion } from './editorialMotion';

beforeEach(() => {
  vi.clearAllMocks();
  mocks.reduced = false;
  mocks.desktop = true;
  mocks.timeline.mockReturnValue({ fromTo: mocks.fromTo });
});

function fixture() {
  const root = document.createElement('section');
  root.innerHTML = '<div class="editorial-gallery-copy"></div><figure data-editorial-photo data-depth=".9"></figure><figure data-editorial-photo data-depth="1.35"></figure>';
  return root;
}

describe('coreografia editorial', () => {
  it('sincroniza movimentos individuais sem easing, pin ou animação de opacidade', () => {
    const root = fixture();
    const dispose = mountEditorialMotion(root);
    const options = mocks.timeline.mock.calls[0][0];
    expect(options.scrollTrigger).toMatchObject({ trigger: root, scrub: 1, invalidateOnRefresh: true });
    expect(options.scrollTrigger.pin).toBeUndefined();
    expect(options.defaults).toMatchObject({ ease: 'none', force3D: true });
    const first = mocks.fromTo.mock.calls[0];
    const second = mocks.fromTo.mock.calls[1];
    expect(first[2].y()).not.toBe(second[2].y());
    expect(first[2].opacity).toBeUndefined();
    dispose();
    expect(mocks.contextRevert).toHaveBeenCalledOnce();
    expect(mocks.mediaRevert).toHaveBeenCalledOnce();
  });

  it('reduz os deslocamentos no mobile', () => {
    const dispose = mountEditorialMotion(fixture());
    const desktopDistance = Math.abs(mocks.fromTo.mock.calls[0][2].y());
    dispose();
    mocks.fromTo.mockClear();
    mocks.desktop = false;
    mountEditorialMotion(fixture())();
    expect(Math.abs(mocks.fromTo.mock.calls[0][2].y())).toBeLessThan(desktopDistance);
  });

  it('não cria timeline com movimento reduzido', () => {
    mocks.reduced = true;
    mountEditorialMotion(fixture())();
    expect(mocks.timeline).not.toHaveBeenCalled();
  });
});
