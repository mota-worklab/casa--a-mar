import { site } from '../../data/site';
import { createWhatsAppUrl } from '../../lib/whatsapp';
import { Arrow } from './Arrow';

export function BookingLink({ className = '', compact = false }: { className?: string; compact?: boolean }) {
  const url = createWhatsAppUrl(site.whatsapp);
  return (
    <a className={`booking-link ${className}`} href={url ?? '#reservas'}
      target={url ? '_blank' : undefined} rel={url ? 'noopener noreferrer' : undefined}>
      {compact ? 'Sua próxima estadia' : 'Consultar disponibilidade'}<Arrow />
      {url && <span className="sr-only"> (WhatsApp, abre em nova aba)</span>}
    </a>
  );
}
