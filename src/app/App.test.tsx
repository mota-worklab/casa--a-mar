import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { site } from '../data/site';
import App from './App';

describe('experiência Casa Amar', () => {
  const originalPhone = site.whatsapp;
  beforeEach(() => { site.whatsapp = ''; });
  afterEach(() => { site.whatsapp = originalPhone; });
  it('apresenta a casa sem telefone fictício ou atributos não confirmados', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('O tempo passa mais devagar aqui.');
    expect(screen.getByText(/Versão de apresentação/)).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /Consultar disponibilidade/ })[0]).toHaveAttribute('href', '#reservas');
    expect(screen.getByText(/contato oficial será disponibilizado/i)).toBeInTheDocument();
  });

  it('abre o menu e fecha ao selecionar uma seção', async () => {
    const user = userEvent.setup();
    render(<App />);
    const menu = screen.getByRole('button', { name: 'Abrir menu' });
    await user.click(menu);
    expect(menu).toHaveAttribute('aria-expanded', 'true');
    await user.click(screen.getByRole('link', { name: 'A casa' }));
    expect(menu).toHaveAttribute('aria-expanded', 'false');
  });

  it('abre a galeria, navega e fecha com retorno ao disparador', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'Explorar a galeria' }));
    expect(await screen.findByRole('dialog', { name: 'Galeria da Casa Amar' })).toBeInTheDocument();
    expect(screen.getByText('1 / 5')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Próxima imagem' }));
    expect(screen.getByText('2 / 5')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Fechar galeria' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('permite expandir as informações práticas', async () => {
    const user = userEvent.setup();
    render(<App />);
    const question = screen.getByText('Como consultar a disponibilidade?');
    await user.click(question);
    expect(question.closest('details')).toHaveAttribute('open');
  });
});
