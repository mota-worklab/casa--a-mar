import { SeaDecoration } from '../components/ui/SeaDecoration';
import { site } from '../data/site';
import { createWhatsAppUrl } from '../lib/whatsapp';
import { BookingLink } from '../components/ui/BookingLink';

export function Contact() {
  const url = createWhatsAppUrl(site.whatsapp);
  return <section id="reservas" className="contact section-space sea-decorated" aria-labelledby="contact-heading">
    <SeaDecoration motif="waves" className="sea-decoration--contact" />
    <div className="page-shell contact-inner"><p className="eyebrow">Leve tempo. Deixe saudade.</p>
      <h2 id="contact-heading">Seu próximo capítulo<br />começa <em>aqui.</em></h2>
      <p>Casa Amar · Guaibim, Bahia</p>
      {url ? <BookingLink className="button-primary" /> : <div className="contact-pending">
        <p>Estamos preparando sua chegada.</p>
        <span>O contato oficial será disponibilizado em breve para consultas de disponibilidade.</span>
      </div>}
      {url && <small>Converse diretamente com a casa pelo WhatsApp.</small>}
      <div className="contact-details">
        <a href="tel:+5575999269950">☎ 75 99926-9950</a>
        <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram @casaamarguaibim<span className="sr-only"> (abre em nova aba)</span></a>
      </div>
    </div>
  </section>;
}
