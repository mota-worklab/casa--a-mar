import { SeaDecoration } from '../components/ui/SeaDecoration';
import { AmenityIcon } from '../components/ui/AmenityIcon';
import { ParallaxEditorialGallery } from '../components/media/ParallaxEditorialGallery';
import { editorialGallery } from '../data/editorialGallery';
import { amenityGroups, media } from '../data/site';
import { Media } from '../components/media/Media';
import { Film } from '../components/media/Film';
import { Arrow } from '../components/ui/Arrow';

export function Spaces({ onOpenGallery }: { onOpenGallery: (trigger: HTMLButtonElement, initialId?: string) => void }) {
  return <section id="ambientes" className="spaces section-space page-shell sea-decorated" aria-labelledby="spaces-heading">
    <SeaDecoration motif="seaweed" className="sea-decoration--spaces" />
    <div className="section-heading-row"><div><p className="eyebrow">02 / Cada canto, uma história</p>
      <h2 id="spaces-heading">Espaços para ficar.<br />Momentos para <em>lembrar.</em></h2></div>
      <button type="button" className="text-link" onClick={(event) => onOpenGallery(event.currentTarget)}>Explorar a galeria <Arrow /></button>
    </div>
    <div className="spaces-composition">
      <div className="space-wide"><Media item={media[3]} /><div className="space-caption"><span>01</span><div><h3>Tempo de estar junto</h3><p>Um lugar na memória começa com os encontros.</p></div></div>{media[3].videoSrc && <Film item={media[3]} />}</div>
      <div className="space-tall"><Media item={media[4]} sizes="(max-width: 700px) 90vw, 80vw" /><div className="space-caption"><span>02</span><div><h3>Uma pausa só sua</h3><p>Outros dias. Outro ritmo.</p></div></div>{media[4].videoSrc && <Film item={media[4]} />}</div>
    </div>
    <ParallaxEditorialGallery {...editorialGallery} onOpenGallery={onOpenGallery} />
    <SeaDecoration motif="waves" className="sea-decoration--before-amenities" />
    <div className="amenities">
      <div className="amenities-heading"><p className="eyebrow">Conforto sem complicação</p><h3>O que você encontra na casa</h3></div>
      <div className="amenities-content">
        <div className="amenities-groups">{amenityGroups.map((group) => <div className="amenity-group" key={group.title}>
          <h4>{group.title}</h4><ul>{group.items.map((item) => <li key={item.label}><AmenityIcon name={item.icon} /><span>{item.label}</span></li>)}</ul>
        </div>)}</div>
      </div>
    </div>
  </section>;
}
