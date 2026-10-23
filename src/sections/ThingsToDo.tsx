import { experiences, experiencesMedia } from '../data/experiences';
import { site } from '../data/site';
import { Media } from '../components/media/Media';
import { Arrow } from '../components/ui/Arrow';
import './ThingsToDo.css';

export function ThingsToDo() {
  return <section id="experiencias" className="local-experiences section-space sea-decorated" aria-labelledby="experiences-heading">
    <div className="page-shell">
      <header className="local-experiences-heading">
        <p className="eyebrow">Dias de sol, planos sem pressa</p>
        <h2 id="experiences-heading">Guaibim e arredores</h2>
        <p className="section-copy">Praias, rios, ilhas e sabores para descobrir no seu ritmo.</p>
      </header>
      <div className="local-experiences-layout">
        <div className="local-experiences-visual">
          <Media item={experiencesMedia.beach} className="local-experiences-beach" sizes="(max-width: 767px) 90vw, 48vw" />
          <div className="local-experiences-detail-slot"><Media item={experiencesMedia.taquari} className="local-experiences-detail" sizes="(max-width: 767px) 35vw, 20vw" /></div>
          <p className="local-experiences-caption">Guaibim, no seu tempo.</p>
        </div>
        <div className="local-experiences-copy">
          <ol className="local-experiences-list">
            {experiences.map((experience, index) => <li key={experience.id}>
              <span className="local-experiences-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <div><h3>{experience.title}</h3><p>{experience.description}</p></div>
            </li>)}
          </ol>
          <a className="text-link" href={site.regionMapUrl} target="_blank" rel="noreferrer">
            Explorar Guaibim no mapa <Arrow />
          </a>
        </div>
      </div>
    </div>
  </section>;
}
