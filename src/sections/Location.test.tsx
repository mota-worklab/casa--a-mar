import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Location } from './Location';

function intersectionEntry(target: Element, intersectionRatio: number): IntersectionObserverEntry {
  const bounds = target.getBoundingClientRect();
  return {
    target, intersectionRatio, isIntersecting: intersectionRatio > 0,
    boundingClientRect: bounds, intersectionRect: bounds, rootBounds: bounds, time: 0,
  };
}

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('Location', () => {
  it('mostra um mapa da região de Guaibim sem marcar o endereço exato da casa', () => {
    render(<Location />);

    expect(screen.getByTitle('Mapa da região de Guaibim, Bahia')).toBeInTheDocument();
    expect(screen.getByText('O mapa indica a região, não a localização da casa.')).toBeInTheDocument();
  });

  it('inicia o voo ao aparecer na tela e pausa quando sai', async () => {
    let callback: IntersectionObserverCallback = () => {};
    vi.stubGlobal('IntersectionObserver', class {
      constructor(cb: IntersectionObserverCallback) { callback = cb; }
      observe = vi.fn();
      disconnect = vi.fn();
    });
    const play = vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
    const pause = vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
    const { container } = render(<Location />);

    const video = container.querySelector('video');
    const map = screen.getByTitle('Mapa da região de Guaibim, Bahia');
    expect(video).toHaveAttribute('poster', '/media/voo-chegada-casa-amar.webp');
    expect(video).toHaveAttribute('src', '/media/voo-chegada-casa-amar.mp4');
    expect(video).toHaveAttribute('preload', 'none');
    expect(video).not.toHaveAttribute('autoplay');
    expect(video).toHaveProperty('muted', true);
    expect(video!.compareDocumentPosition(map) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(play).not.toHaveBeenCalled();

    await act(async () => callback([intersectionEntry(video!, .6)], {} as IntersectionObserver));
    expect(play).toHaveBeenCalledOnce();
    act(() => callback([intersectionEntry(video!, 0)], {} as IntersectionObserver));
    expect(pause).toHaveBeenCalled();
  });

  it('mantém o voo parado quando a pessoa prefere movimento reduzido', () => {
    let callback: IntersectionObserverCallback = () => {};
    vi.stubGlobal('IntersectionObserver', class {
      constructor(cb: IntersectionObserverCallback) { callback = cb; }
      observe = vi.fn();
      disconnect = vi.fn();
    });
    vi.spyOn(window, 'matchMedia').mockImplementation((query) => ({ matches: query.includes('prefers-reduced-motion') } as MediaQueryList));
    const play = vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
    const { container } = render(<Location />);
    const video = container.querySelector('video');

    act(() => callback([intersectionEntry(video!, .6)], {} as IntersectionObserver));
    expect(play).not.toHaveBeenCalled();
    expect(video).toHaveAttribute('controls');
  });

  it('mostra a imagem da chegada caso o vídeo falhe', () => {
    const { container } = render(<Location />);
    fireEvent.error(container.querySelector('video')!);

    expect(screen.getByRole('status')).toHaveTextContent('O vídeo não pôde ser carregado');
    expect(screen.getByAltText('Vista aérea da Casa Amar, com piscina, casas do entorno e o mar ao fundo')).toHaveAttribute('src', '/media/voo-chegada-casa-amar.webp');
  });
});
