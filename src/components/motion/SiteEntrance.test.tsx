import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { SiteEntrance } from './SiteEntrance';

afterEach(() => vi.useRealTimers());

describe('abertura da Casa Amar', () => {
  it('libera a abertura ao primeiro toque', () => {
    render(<SiteEntrance />);
    fireEvent.pointerDown(window);
    expect(screen.queryByRole('button', { name: 'Pular abertura' })).not.toBeInTheDocument();
  });
  it('aparece novamente a cada montagem e permite pular', () => {
    const { unmount } = render(<SiteEntrance />);
    fireEvent.click(screen.getByRole('button', { name: 'Pular abertura' }));
    expect(screen.queryByRole('button', { name: 'Pular abertura' })).not.toBeInTheDocument();
    unmount();
    render(<SiteEntrance />);
    expect(screen.getByRole('button', { name: 'Pular abertura' })).toBeInTheDocument();
  });

  it('libera a página mesmo se o evento CSS não ocorrer', () => {
    vi.useFakeTimers();
    render(<SiteEntrance />);
    act(() => vi.advanceTimersByTime(2500));
    expect(screen.queryByRole('button', { name: 'Pular abertura' })).not.toBeInTheDocument();
  });

  it('sai ao navegar por teclado sem interceptar o foco', () => {
    render(<SiteEntrance />);
    fireEvent.keyDown(window, { key: 'Tab' });
    expect(screen.queryByRole('button', { name: 'Pular abertura' })).not.toBeInTheDocument();
  });

  it('não mostra a abertura com movimento reduzido', () => {
    vi.mocked(window.matchMedia).mockReturnValueOnce({
      matches: true, media: '(prefers-reduced-motion: reduce)',
      addEventListener: vi.fn(), removeEventListener: vi.fn(),
    } as unknown as MediaQueryList);
    render(<SiteEntrance />);
    expect(screen.queryByRole('button', { name: 'Pular abertura' })).not.toBeInTheDocument();
  });
});
