import { describe, expect, it } from 'vitest';
import { createWhatsAppUrl } from './whatsapp';

describe('contato oficial', () => {
  it.each(['', '123', 'telefone pendente', '+55 (00) 00000-0000'])('recusa número inválido: %s', (number) => {
    expect(createWhatsAppUrl(number)).toBeNull();
  });
  it('formata o telefone e codifica a mensagem de disponibilidade', () => {
    const url = new URL(createWhatsAppUrl('+55 (71) 98888-7777')!);
    expect(url.origin + url.pathname).toBe('https://wa.me/5571988887777');
    expect(url.searchParams.get('text')).toContain('consultar a disponibilidade');
  });
});
