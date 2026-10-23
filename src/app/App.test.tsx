import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import App from './App';

vi.mock('../components/media/editorialMotion', () => ({ mountEditorialMotion: () => () => {} }));

describe('experiência Casa Amar', () => {
  it('apresenta as comodidades confirmadas e os contatos oficiais', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('O tempo passa mais devagar aqui.');
    expect(screen.getByText('5 suítes climatizadas')).toBeInTheDocument();
    expect(screen.queryByText(/Para trazer:/i)).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /75 99926-9950/ })).toHaveAttribute('href', 'tel:+5575999269950');
    expect(screen.getByRole('link', { name: /@casaamarguaibim/ })).toHaveAttribute('href', 'https://www.instagram.com/casaamarguaibim/');
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
    expect(screen.getByText('1 / 16')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Próxima imagem' }));
    expect(screen.getByText('2 / 16')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Fechar galeria' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('abre a fotografia selecionada na composição editorial', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'Ver na galeria — Pátio e piscina' }));
    expect(await screen.findByRole('dialog', { name: 'Galeria da Casa Amar' })).toBeInTheDocument();
    expect(screen.getByText('Pátio e piscina')).toBeInTheDocument();
    expect(screen.getByText('7 / 16')).toBeInTheDocument();
  });

  it('permite expandir as informações práticas', async () => {
    const user = userEvent.setup();
    render(<App />);
    const question = screen.getByText('Como consultar a disponibilidade?');
    await user.click(question);
    expect(question.closest('details')).toHaveAttribute('open');
  });
});
