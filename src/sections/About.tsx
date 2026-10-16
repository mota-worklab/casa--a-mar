import { media } from '../data/site';
import { Media } from '../components/media/Media';

export function About() {
  return <section id="a-casa" className="about section-space page-shell" aria-labelledby="about-heading">
    <p className="eyebrow">01 / A essência da casa</p>
    <div className="about-heading-row"><h2 id="about-heading">Entre o azul do mar<br />e a calma de <em>estar.</em></h2>
      <p className="section-copy">Uma casa de temporada em Guaibim, Bahia. Um convite para reunir quem você ama e abrir espaço para dias com mais presença.</p>
    </div>
    <div className="editorial-composition">
      <Media item={media[0]} className="editorial-main" />
      <Media item={media[1]} className="editorial-detail" sizes="(max-width: 700px) 48vw, 25vw" />
      <div className="editorial-aside"><Media item={media[2]} className="editorial-landscape" sizes="(max-width: 700px) 80vw, 30vw" />
        <p>O melhor de uma viagem<br />é poder <em>se sentir em casa.</em></p><span className="handwritten-mark" aria-hidden="true">amar.</span>
      </div>
    </div>
  </section>;
}
