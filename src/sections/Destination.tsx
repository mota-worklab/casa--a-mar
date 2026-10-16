import { destinationMedia, site } from '../data/site';
import { Media } from '../components/media/Media';
import { Arrow } from '../components/ui/Arrow';

export function Destination() {
  return <section id="guaibim" className="destination" aria-labelledby="destination-heading">
    <div className="destination-inner page-shell"><div className="destination-copy">
      <p className="eyebrow">03 / Descubra Guaibim</p>
      <h2 id="destination-heading">Lá fora, um mundo<br />inteiro para <em>viver.</em></h2>
      <p>O destino é Guaibim, na Bahia.<br />O convite é encontrar o seu próprio ritmo.</p>
      <a className="text-link" href="#localizacao">Conheça a região <Arrow /></a>
    </div><div className="destination-visual"><Media item={destinationMedia} />
      <span className="destination-stamp" aria-hidden="true">BAHIA<br /><em>com afeto</em></span>
      <p>{site.location} <span>Um convite a desacelerar</span></p>
    </div></div>
  </section>;
}
