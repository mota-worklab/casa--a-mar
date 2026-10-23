import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ThingsToDo } from './ThingsToDo';

describe('o que fazer em Guaibim', () => {
  it('apresenta sugestões e um link real para explorar a região', () => {
    render(<ThingsToDo />);
    expect(screen.getByRole('heading', { name: 'Guaibim e arredores' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Praia de Guaibim' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Guaibimzinho' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Praia de Taquari' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Ponta do Curral' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Coroa Vermelha' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Morro de São Paulo' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Provar os sabores da Bahia' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Explorar Guaibim no mapa/ })).toHaveAttribute('href', expect.stringContaining('google.com/maps'));
  });

  it('usa apenas as imagens reais disponíveis, com descrição acessível', () => {
    render(<ThingsToDo />);
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    for (const image of images) {
      expect(image).toHaveAttribute('loading', 'lazy');
      expect(image.getAttribute('alt')).toBeTruthy();
      expect(image.getAttribute('src')).not.toContain('placeholder');
    }
  });
});
