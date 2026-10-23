import { useEffect, useId, useRef, useState } from 'react';
import type { MediaItem } from '../../data/site';
import './ParallaxEditorialGallery.css';

export interface ParallaxEditorialGalleryProps {
  title: string;
  description: string;
  eyebrow?: string;
  images: readonly MediaItem[];
  onOpenGallery?: (trigger: HTMLButtonElement, initialId?: string) => void;
}

function EditorialPhoto({ item, wide }: { item: MediaItem; wide: boolean }) {
  const [failed, setFailed] = useState(false);
  return failed ? <p className="editorial-photo-error">Imagem indisponível: {item.title}</p> :
    <img src={item.src} srcSet={item.srcSet} alt={item.alt} width="1200" height="900"
      sizes={wide ? '(max-width: 767px) 88vw, (prefers-reduced-motion: reduce) 45vw, 24vw' : '(max-width: 767px) 42vw, (prefers-reduced-motion: reduce) 45vw, (max-width: 1023px) 28vw, 24vw'}
      loading="lazy" decoding="async" style={{ objectPosition: item.objectPosition }}
      onError={() => setFailed(true)} />;
}

export function ParallaxEditorialGallery({ title, description, eyebrow, images, onOpenGallery }: ParallaxEditorialGalleryProps) {
  const rootRef = useRef<HTMLElement>(null);
  const headingId = useId();
  const photographs = images.filter(item => item.src && !item.provisional);

  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;
    // Keep the static composition usable if the split motion module cannot load.
    void import('./editorialMotion').then(({ mountEditorialMotion }) => {
      if (!disposed && rootRef.current) cleanup = mountEditorialMotion(rootRef.current);
    }).catch(() => {});
    return () => { disposed = true; cleanup?.(); };
  }, [images]);

  if (!photographs.length) return null;
  return <section ref={rootRef} className="editorial-gallery" data-editorial-gallery aria-labelledby={headingId}>
    <div className="editorial-gallery-canvas">
      <div className="editorial-gallery-copy">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h3 id={headingId}>{title}</h3>
        <p className="editorial-gallery-description">{description}</p>
        {onOpenGallery && <button type="button" className="text-link editorial-gallery-open" onClick={event => onOpenGallery(event.currentTarget, photographs[0].id)}>Abrir galeria <span aria-hidden="true">↗</span></button>}
      </div>
      <div className="editorial-gallery-photos">
        {photographs.map((item, index) => <figure key={item.id}
          className={'editorial-gallery-photo editorial-gallery-photo--' + (index % 10 + 1)}
          data-editorial-photo data-depth={[.9, 1.35, .65, 1.1, .75, 1.4][index % 6]}>
          {onOpenGallery ? <button type="button" onClick={event => onOpenGallery(event.currentTarget, item.id)}
            aria-label={'Ver na galeria — ' + item.title}><EditorialPhoto item={item} wide={index % 10 === 2 || index % 10 === 5} /></button>
            : <EditorialPhoto item={item} wide={index % 10 === 2 || index % 10 === 5} />}
        </figure>)}
      </div>
    </div>
  </section>;
}
