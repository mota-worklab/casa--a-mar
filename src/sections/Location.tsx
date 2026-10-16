import { site } from '../data/site';
import { Arrow } from '../components/ui/Arrow';

export function Location() {
  const exact = Boolean(site.exactMapUrl);
  return <section id="localizacao" className="location section-space page-shell" aria-labelledby="location-heading">
    <div><p className="eyebrow">04 / O caminho até aqui</p><h2 id="location-heading">Nos encontramos<br />em <em>Guaibim.</em></h2></div>
    <div className="location-copy"><p className="location-address">Guaibim <span>Bahia, Brasil</span></p>
      <p>{exact ? 'Consulte o endereço no mapa e combine os detalhes da chegada antes da viagem.' : 'Por enquanto, explore a região no mapa. O endereço exato da casa e as orientações de chegada serão disponibilizados após confirmação.'}</p>
      <a className="text-link" href={site.exactMapUrl || site.regionMapUrl} target="_blank" rel="noopener noreferrer">{exact ? 'Ver localização da casa' : 'Ver Guaibim no mapa'} <Arrow /><span className="sr-only"> (abre em nova aba)</span></a>
      {!exact && <small>O mapa indica a região, não a localização da casa.</small>}
    </div>
  </section>;
}
