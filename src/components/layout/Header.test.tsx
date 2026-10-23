import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Header } from './Header';

describe('menu mobile', () => {
  it('fecha ao tocar fora do cabeçalho', () => {
    render(<Header />);
    fireEvent.click(screen.getByRole('button', { name: 'Abrir menu' }));
    fireEvent.pointerDown(document.body);
    expect(screen.getByRole('button', { name: 'Abrir menu' })).toHaveAttribute('aria-expanded', 'false');
  });

  it('mantém aberto ao tocar dentro e devolve foco com Escape', () => {
    render(<Header />);
    const toggle = screen.getByRole('button', { name: 'Abrir menu' });
    fireEvent.click(toggle);
    fireEvent.pointerDown(screen.getByRole('navigation'));
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(toggle).toHaveFocus();
  });
});
