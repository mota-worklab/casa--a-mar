import { questions, site } from '../data/site';
import { createWhatsAppUrl } from '../lib/whatsapp';

export function FAQ() {
  const hasContact = Boolean(createWhatsAppUrl(site.whatsapp));
  return <section className="faq page-shell section-space" aria-labelledby="faq-heading">
    <div><p className="eyebrow">Antes de fazer as malas</p><h2 id="faq-heading">Bom <em>saber.</em></h2></div>
    <div className="faq-list">{questions.map((item, index) => <details key={item.question}>
      <summary>{item.question}<span aria-hidden="true">+</span></summary>
      <p>{index === 0 && hasContact ? 'Clique em Consultar disponibilidade para falar com a Casa Amar pelo WhatsApp. Informe as datas desejadas e o número de pessoas; a disponibilidade depende de confirmação.' : item.answer}</p>
    </details>)}</div>
  </section>;
}
