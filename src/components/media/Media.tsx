import { useState } from 'react';
import type { MediaItem } from '../../data/site';

interface MediaProps { item: MediaItem; className?: string; priority?: boolean; sizes?: string }

export function Media({ item, className = '', priority = false, sizes = '(max-width: 700px) 90vw, 50vw' }: MediaProps) {
  const [failed, setFailed] = useState(false);
  const placeholder = !item.src || failed;
  return <figure className={`media-frame ${placeholder ? 'is-placeholder' : ''} ${className}`}>
    <img src={placeholder ? item.poster : item.src} srcSet={placeholder ? undefined : item.srcSet}
      sizes={sizes} alt={placeholder ? `Composição abstrata ilustrativa — ${item.title}. Foto real pendente.` : item.alt}
      width="1200" height="900" loading={priority ? 'eager' : 'lazy'} decoding="async"
      fetchPriority={priority ? 'high' : 'auto'} style={{ objectPosition: item.objectPosition }}
      onError={() => setFailed(true)} />
    {(placeholder || item.provisional) && <figcaption className="media-label">{failed ? 'Imagem indisponível' : 'Composição ilustrativa'}<span>{item.title} · foto real a inserir</span></figcaption>}
  </figure>;
}
