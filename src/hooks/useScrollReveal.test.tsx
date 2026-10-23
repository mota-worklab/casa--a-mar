import { act, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useScrollReveal } from './useScrollReveal';

function Fixture() {
  const ref = useScrollReveal();
  return <main ref={ref}><h2>Uma pausa</h2></main>;
}

afterEach(() => vi.unstubAllGlobals());

describe('revelação ao rolar', () => {
  it('revela uma única vez ao entrar na tela e limpa o observer', () => {
    let callback: IntersectionObserverCallback = () => {};
    const observe = vi.fn();
    const unobserve = vi.fn();
    const disconnect = vi.fn();
    vi.stubGlobal('IntersectionObserver', class {
      constructor(cb: IntersectionObserverCallback) { callback = cb; }
      observe = observe;
      unobserve = unobserve;
      disconnect = disconnect;
    });
    const { getByText, unmount } = render(<Fixture />);
    const heading = getByText('Uma pausa');
    expect(heading).toHaveClass('scroll-reveal');
    act(() => callback([{ target: heading, isIntersecting: true, boundingClientRect: heading.getBoundingClientRect(), intersectionRatio: 1, intersectionRect: heading.getBoundingClientRect(), rootBounds: null, time: 0 }], {} as IntersectionObserver));
    expect(heading).toHaveClass('is-revealed');
    expect(unobserve).toHaveBeenCalledWith(heading);
    unmount();
    expect(disconnect).toHaveBeenCalled();
  });

  it('mantém o conteúdo estático quando o movimento reduzido está ativo', () => {
    vi.spyOn(window, 'matchMedia').mockReturnValueOnce({ matches: true } as MediaQueryList);
    const { getByText } = render(<Fixture />);
    expect(getByText('Uma pausa')).not.toHaveClass('scroll-reveal');
  });

  it('mantém o conteúdo visível sem IntersectionObserver', () => {
    vi.stubGlobal('IntersectionObserver', undefined);
    const { getByText } = render(<Fixture />);
    expect(getByText('Uma pausa')).not.toHaveClass('scroll-reveal');
  });
});
