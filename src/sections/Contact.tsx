import { site } from '../data/site';
import { createWhatsAppUrl } from '../lib/whatsapp';
import { BookingLink } from '../components/ui/BookingLink';

export function Contact() {
  const url = createWhatsAppUrl(site.whatsapp);
  return <section id="reservas" className="contact section-space" aria-labelledby="contact-heading">
    <div className="page-shell contact-inner"><p className="eyebrow">Leve tempo. Deixe saudade.</p>
      <h2 id="contact-heading">Seu próximo capítulo<br />começa <em>aqui.</em></h2>
      <p>Casa Amar · Guaibim, Bahia</p>
      {url ? <BookingLink className="button-primary" /> : <div className="contact-pending">
        <p>Estamos preparando sua chegada.</p>
        <span>O contato oficial será disponibilizado em breve para consultas de disponibilidade.</span>
      </div>}
      {url && <small>Converse diretamente com a casa pelo WhatsApp.</small>}
    </div>
  </section>;
}
