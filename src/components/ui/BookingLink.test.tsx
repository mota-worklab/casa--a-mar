import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { site } from '../../data/site';
import { BookingLink } from './BookingLink';

const original = site.whatsapp;
afterEach(() => { site.whatsapp = original; });

describe('consulta de disponibilidade', () => {
  it('usa o WhatsApp configurado, com mensagem e indicação de nova aba', () => {
    site.whatsapp = '5571988887777';
    render(<BookingLink />);
    const link = screen.getByRole('link', { name: /Consultar disponibilidade.*nova aba/ });
    expect(link).toHaveAttribute('href', expect.stringContaining('https://wa.me/5571988887777?text='));
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
  it('leva às informações de reserva se o contato não estiver configurado', () => {
    site.whatsapp = '';
    render(<BookingLink />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '#reservas');
    expect(screen.getByRole('link')).not.toHaveAttribute('target');
  });
});
