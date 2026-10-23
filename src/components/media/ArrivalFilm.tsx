import { useEffect, useRef, useState } from 'react';
import type { MediaItem } from '../../data/site';
import { Media } from './Media';

export function ArrivalFilm({ item }: { item: MediaItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || typeof IntersectionObserver === 'undefined') return;

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    const canStartAutomatically = !reducedMotion && !saveData;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && entry.intersectionRatio >= .4) {
        if (canStartAutomatically && !document.hidden) void video.play().catch(() => {});
      } else {
        video.pause();
      }
    }, { threshold: [0, .4] });

    observer.observe(video);
    const pauseWhenHidden = () => { if (document.hidden) video.pause(); };
    document.addEventListener('visibilitychange', pauseWhenHidden);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', pauseWhenHidden);
    };
  }, []);

  if (!item.videoSrc || failed) return <div className="location-flight-visual">
    <Media item={item} />
    {failed && <p role="status">O vídeo não pôde ser carregado. A imagem da casa permanece disponível.</p>}
  </div>;

  return <div className="location-flight-visual">
    <video ref={videoRef} src={item.videoSrc} poster={item.src ?? item.poster}
      aria-label={item.title} controls muted playsInline preload="none" onError={() => setFailed(true)}>
      Seu navegador não suporta vídeo.
    </video>
  </div>;
}
