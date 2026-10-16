import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import type { MediaItem } from '../../data/site';
import { Media } from './Media';
import { Film } from './Film';

const realMedia: MediaItem = {
  id: 'test', title: 'Ambiente', alt: 'Foto aprovada da casa', src: '/media/casa.webp',
  poster: '/media/placeholder-ocean.svg', provisional: false,
};

describe('mídias e carregamento', () => {
  it('exibe fallback identificado quando uma foto falha', () => {
    render(<Media item={realMedia} />);
    fireEvent.error(screen.getByRole('img'));
    expect(screen.getByRole('img')).toHaveAttribute('src', realMedia.poster);
    expect(screen.getByText('Imagem indisponível')).toBeInTheDocument();
  });

  it('não oferece um player para vídeo ausente', () => {
    const { container } = render(<Film item={realMedia} />);
    expect(container.querySelector('video')).toBeNull();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('carrega o vídeo apenas após interação, sem autoplay, com controles e poster', async () => {
    const user = userEvent.setup();
    const { container } = render(<Film item={{ ...realMedia, videoSrc: '/media/tour.mp4' }} />);
    expect(container.querySelector('video')).toBeNull();
    await user.click(screen.getByRole('button', { name: /Assistir ao filme/ }));
    const video = container.querySelector('video')!;
    expect(video).toHaveAttribute('controls');
    expect(video).toHaveAttribute('preload', 'none');
    expect(video).toHaveAttribute('poster', realMedia.src);
    expect(video).not.toHaveAttribute('autoplay');
    fireEvent.error(video);
    expect(screen.getByRole('status')).toHaveTextContent('não pôde ser carregado');
    expect(screen.getByRole('button', { name: /Assistir ao filme/ })).toBeInTheDocument();
  });
});
