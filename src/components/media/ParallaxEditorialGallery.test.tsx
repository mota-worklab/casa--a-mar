import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ParallaxEditorialGallery } from './ParallaxEditorialGallery';
import { editorialGallery } from '../../data/editorialGallery';

const motion = vi.hoisted(() => ({ mount: vi.fn(), dispose: vi.fn() }));
vi.mock('./editorialMotion', () => ({ mountEditorialMotion: motion.mount }));

beforeEach(() => { motion.mount.mockReset().mockReturnValue(motion.dispose); motion.dispose.mockReset(); });

describe('galeria editorial', () => {
  it('usa fotografias reais, título acessível e espaço reservado para cada foto', () => {
    render(<ParallaxEditorialGallery {...editorialGallery} />);
    expect(screen.getByRole('heading', { name: editorialGallery.title })).toBeInTheDocument();
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(10);
    for (const image of images) {
      expect(image.getAttribute('src')).toMatch(/^\/media\/galeria-/);
      expect(image).toHaveAttribute('width');
      expect(image).toHaveAttribute('height');
    }
  });

  it('desfaz somente as animações da instância ao desmontar', async () => {
    const { unmount } = render(<ParallaxEditorialGallery {...editorialGallery} />);
    await waitFor(() => expect(motion.mount).toHaveBeenCalledOnce());
    unmount();
    expect(motion.dispose).toHaveBeenCalledOnce();
  });

  it('permite abrir as fotos por teclado e mouse usando a galeria existente', async () => {
    const open = vi.fn();
    render(<ParallaxEditorialGallery {...editorialGallery} onOpenGallery={open} />);
    const button = screen.getByRole('button', { name: 'Abrir galeria' });
    button.focus();
    fireEvent.click(button);
    expect(open).toHaveBeenCalledWith(button, editorialGallery.images[0].id);
    await act(async () => {});
  });
});
