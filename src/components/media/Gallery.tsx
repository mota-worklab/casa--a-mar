import { useEffect, useRef, useState } from 'react';
import type { MediaItem } from '../../data/site';
import { Media } from './Media';

interface GalleryProps { items: MediaItem[]; onClose: () => void; returnFocusTo: HTMLElement }

export default function Gallery({ items, onClose, returnFocusTo }: GalleryProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    const previousOverflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
      returnFocusTo.focus();
    };
  }, [returnFocusTo]);
  const move = (step: number) => setIndex((current) => (current + step + items.length) % items.length);
  if (!items.length) return null;
  return <dialog ref={dialog} className="gallery-dialog" aria-labelledby="gallery-title"
    onCancel={(event) => { event.preventDefault(); onClose(); }}
    onKeyDown={(event) => {
      if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
    }}>
    <div className="gallery-top"><h2 id="gallery-title">Galeria da Casa Amar</h2>
      <button type="button" className="icon-button" aria-label="Fechar galeria" onClick={onClose} autoFocus>×</button>
    </div>
    <Media key={items[index].id} item={items[index]} className="gallery-image" priority sizes="90vw" />
    <div className="gallery-bottom">
      <button type="button" className="icon-button" aria-label="Imagem anterior" onClick={() => move(-1)}>←</button>
      <p aria-live="polite">{items[index].title}<span>{index + 1} / {items.length}</span></p>
      <button type="button" className="icon-button" aria-label="Próxima imagem" onClick={() => move(1)}>→</button>
    </div>
  </dialog>;
}
