import { SeaDecoration } from '../components/ui/SeaDecoration';
import { arrivalMedia, site } from '../data/site';
import { ArrivalFilm } from '../components/media/ArrivalFilm';
import { Arrow } from '../components/ui/Arrow';
import './Location.css';

export function Location() {
  const exact = Boolean(site.exactMapUrl);
  return <section id="localizacao" className="location section-space page-shell" aria-labelledby="location-heading">
    <div><p className="eyebrow">04 / O caminho até aqui</p><h2 id="location-heading">Nos encontramos<br />em <em>Guaibim.</em></h2></div>
    <div className="location-copy"><p className="location-address">Guaibim <span>Bahia, Brasil</span></p>
      <p>{exact ? 'Consulte o endereço no mapa e combine os detalhes da chegada antes da viagem.' : 'Por enquanto, explore a região no mapa. O endereço exato da casa e as orientações de chegada serão disponibilizados após confirmação.'}</p>
      <a className="text-link" href={site.exactMapUrl || site.regionMapUrl} target="_blank" rel="noopener noreferrer">{exact ? 'Ver localização da casa' : 'Ver Guaibim no mapa'} <Arrow /><span className="sr-only"> (abre em nova aba)</span></a>
      {!exact && <small>O mapa indica a região, não a localização da casa.</small>}
    </div>
    <SeaDecoration motif="fish" className="sea-decoration--location" />
    <div className="location-flight">
      <div className="location-flight-copy">
        <p className="eyebrow">Um voo por Guaibim</p>
        <h3>Entre o verde e o mar,<br /><em>a chegada.</em></h3>
        <p>Do alto, a paisagem de coqueiros dá lugar às ruas do entorno e, por fim, à Casa Amar.</p>
        <ol className="location-flight-path" aria-label="Momentos do voo">
          <li><span>01</span>Paisagem</li>
          <li><span>02</span>Entorno</li>
          <li><span>03</span>Casa Amar</li>
        </ol>
        <small>O vídeo apresenta o entorno. Confirme o endereço e as orientações de chegada antes da viagem.</small>
      </div>
      <ArrivalFilm item={arrivalMedia} />
    </div>
    <div className="location-map">
      <iframe title="Mapa da região de Guaibim, Bahia" src={site.regionMapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
    </div>
  </section>;
}
