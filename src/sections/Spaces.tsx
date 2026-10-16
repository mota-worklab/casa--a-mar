import { amenities, media } from '../data/site';
import { Media } from '../components/media/Media';
import { Film } from '../components/media/Film';
import { Arrow } from '../components/ui/Arrow';

export function Spaces({ onOpenGallery }: { onOpenGallery: (trigger: HTMLButtonElement) => void }) {
  return <section id="ambientes" className="spaces section-space page-shell" aria-labelledby="spaces-heading">
    <div className="section-heading-row"><div><p className="eyebrow">02 / Cada canto, uma história</p>
      <h2 id="spaces-heading">Espaços para ficar.<br />Momentos para <em>lembrar.</em></h2></div>
      <button type="button" className="text-link" onClick={(event) => onOpenGallery(event.currentTarget)}>Explorar a galeria <Arrow /></button>
    </div>
    <div className="spaces-composition">
      <div className="space-wide"><Media item={media[3]} /><div className="space-caption"><span>01</span><div><h3>Tempo de estar junto</h3><p>Um lugar na memória começa com os encontros.</p></div></div>{media[3].videoSrc && <Film item={media[3]} />}</div>
      <div className="space-tall"><Media item={media[4]} /><div className="space-caption"><span>02</span><div><h3>Uma pausa só sua</h3><p>Outros dias. Outro ritmo.</p></div></div>{media[4].videoSrc && <Film item={media[4]} />}</div>
    </div>
    <div className="amenities"><h3>Os detalhes da sua estadia</h3>
      {amenities.length > 0 ? <ul>{amenities.map((item) => <li key={item}>{item}</li>)}</ul> : <p>Fotos dos ambientes, capacidade e comodidades serão apresentadas após confirmação do proprietário.</p>}
    </div>
  </section>;
}
