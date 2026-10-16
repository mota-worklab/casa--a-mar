import { site } from '../data/site';

export function createWhatsAppUrl(number: string): string | null {
  if (!/^[+\d\s()-]+$/.test(number)) return null;
  const digits = number.replace(/\D/g, '');
  if (!/^[1-9]\d{9,14}$/.test(digits) || /0{8}/.test(digits)) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(site.reservationMessage)}`;
}
