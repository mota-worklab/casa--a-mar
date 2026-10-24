import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { SeaExperience } from './SeaExperience';
import type { MediaItem } from '../data/site';

const film: MediaItem = { id: 'mar', title: 'Som do mar', alt: 'Ondas do mar', poster: '/poster.webp', videoSrc: '/mar.mp4', provisional: false };

beforeEach(() => {
  vi.stubGlobal('IntersectionObserver', class { observe() {} disconnect() {} });
});

afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });

describe('pausa à beira-mar', () => {
  it('conecta o filme recebido sem aviso de produção', () => {
    const { container } = render(<SeaExperience />);
    expect(container.querySelector('video')).toHaveAttribute('src', '/media/som-do-mar.mov');
    expect(screen.queryByText(/filme em produção/i)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Silenciar o mar' })).toBeInTheDocument();
  });

  it('identifica o vídeo pendente sem oferecer reprodução fictícia', () => {
    render(<SeaExperience item={{ ...film, videoSrc: undefined, provisional: true }} />);
    expect(screen.getByRole('heading', { name: 'Escute o som do mar.' })).toBeInTheDocument();
    expect(screen.getByText(/filme em produção/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /escutar o mar/i })).not.toBeInTheDocument();
  });

  it('mantém o som ativado por padrão e permite silenciar e reativar', () => {
    const play = vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
    const { container } = render(<SeaExperience item={film} />);
    const video = container.querySelector('video')!;
    expect(play).not.toHaveBeenCalled();
    expect(video).toHaveAttribute('preload', 'none');
    expect(video).toHaveAttribute('controls');
    expect(video.muted).toBe(false);
    expect(video.loop).toBe(true);
    fireEvent.click(screen.getByRole('button', { name: 'Silenciar o mar' }));
    expect(video.muted).toBe(true);
    fireEvent.click(screen.getByRole('button', { name: 'Ativar som do mar' }));
    expect(play).toHaveBeenCalledOnce();
    expect(video.muted).toBe(false);
    play.mockRestore();
  });

  it('reproduz automaticamente somente quando a seção entra na tela', () => {
    const play = vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
    const pause = vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
    let notify: IntersectionObserverCallback = () => {};
    vi.stubGlobal('IntersectionObserver', class {
      constructor(callback: IntersectionObserverCallback) { notify = callback; }
      observe() {}
      disconnect() {}
    });
    render(<SeaExperience item={film} />);
    expect(play).not.toHaveBeenCalled();
    notify([{ isIntersecting: true, intersectionRatio: .2 } as IntersectionObserverEntry], {} as IntersectionObserver);
    expect(play).toHaveBeenCalledOnce();
    notify([{ isIntersecting: false, intersectionRatio: 0 } as IntersectionObserverEntry], {} as IntersectionObserver);
    expect(pause).toHaveBeenCalled();
    vi.unstubAllGlobals();
    play.mockRestore();
    pause.mockRestore();
  });


  it('inicia sem som quando o navegador bloqueia somente o áudio automático', async () => {
    const play = vi.spyOn(HTMLMediaElement.prototype, 'play')
      .mockRejectedValueOnce(new DOMException('Audio blocked', 'NotAllowedError'))
      .mockResolvedValue();
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
    let notify: IntersectionObserverCallback = () => {};
    vi.stubGlobal('IntersectionObserver', class {
      constructor(callback: IntersectionObserverCallback) { notify = callback; }
      observe() {}
      disconnect() {}
    });
    const { container } = render(<SeaExperience item={film} />);
    await act(async () => notify([{ isIntersecting: true, intersectionRatio: .2 } as IntersectionObserverEntry], {} as IntersectionObserver));
    await waitFor(() => expect(play).toHaveBeenCalledTimes(2));
    expect(container.querySelector('video')!.muted).toBe(true);
    expect(screen.getByRole('button', { name: 'Ativar som do mar' })).toBeInTheDocument();
    expect(screen.queryByText('Toque para iniciar o vídeo.')).not.toBeInTheDocument();
  });

  it('não retoma a reprodução se o visitante sair antes da tentativa terminar', async () => {
    let rejectPlay: (error: DOMException) => void = () => {};
    const play = vi.spyOn(HTMLMediaElement.prototype, 'play').mockImplementationOnce(() =>
      new Promise<void>((_resolve, reject) => { rejectPlay = reject; }));
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
    let notify: IntersectionObserverCallback = () => {};
    vi.stubGlobal('IntersectionObserver', class {
      constructor(callback: IntersectionObserverCallback) { notify = callback; }
      observe() {}
      disconnect() {}
    });
    render(<SeaExperience item={film} />);
    await act(async () => {
      notify([{ isIntersecting: true, intersectionRatio: .2 } as IntersectionObserverEntry], {} as IntersectionObserver);
      notify([{ isIntersecting: false, intersectionRatio: 0 } as IntersectionObserverEntry], {} as IntersectionObserver);
      rejectPlay(new DOMException('Audio blocked', 'NotAllowedError'));
    });
    expect(play).toHaveBeenCalledOnce();
  });

  it('oferece nova tentativa quando a mídia falha', () => {
    const { container } = render(<SeaExperience item={film} />);
    fireEvent.error(container.querySelector('video')!);
    expect(screen.getByRole('status')).toHaveTextContent(/não pôde ser carregado/i);
    expect(screen.getByRole('button', { name: 'Tentar novamente' })).toBeInTheDocument();
  });
});
