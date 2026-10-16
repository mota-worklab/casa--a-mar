import { useState } from 'react';
import type { MediaItem } from '../../data/site';

export function Film({ item }: { item: MediaItem }) {
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  if (!item.videoSrc) return <p className="film-note"><span aria-hidden="true">◌</span> Filme da casa em breve<span>Vídeo real a inserir</span></p>;
  return <div className="film">
    {playing && !failed ? <video controls playsInline preload="none" poster={item.src ?? item.poster}
      aria-label={item.title} onError={() => setFailed(true)}>
      <source src={item.videoSrc} />Seu navegador não suporta vídeo.
    </video> : <button type="button" className="text-link" onClick={() => { setFailed(false); setPlaying(true); }}>Assistir ao filme <span aria-hidden="true">▷</span></button>}
    {failed && <p role="status">O vídeo não pôde ser carregado. Você pode tentar novamente.</p>}
  </div>;
}
