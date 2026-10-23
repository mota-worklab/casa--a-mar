import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Gallery from './Gallery';
import type { MediaItem } from '../../data/site';

const items: MediaItem[] = ['Uma', 'Duas'].map((title, index) => ({
  id: String(index), title, alt: title, src: '/photo.webp', poster: '/poster.webp', provisional: false,
}));

describe('gestos na galeria', () => {
  it('navega com gesto horizontal sem transformar rolagem vertical em troca de foto', () => {
    render(<Gallery items={items} onClose={vi.fn()} returnFocusTo={document.body} />);
    const image = screen.getByRole('img');
    fireEvent.touchStart(image, { touches: [{ clientX: 220, clientY: 100 }] });
    fireEvent.touchEnd(image, { changedTouches: [{ clientX: 80, clientY: 110 }] });
    expect(screen.getByText('2 / 2')).toBeInTheDocument();
    fireEvent.touchStart(screen.getByRole('img'), { touches: [{ clientX: 150, clientY: 200 }] });
    fireEvent.touchEnd(screen.getByRole('img'), { changedTouches: [{ clientX: 140, clientY: 50 }] });
    expect(screen.getByText('2 / 2')).toBeInTheDocument();
  });
});
