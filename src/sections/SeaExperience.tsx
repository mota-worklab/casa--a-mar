import { SeaDecoration } from '../components/ui/SeaDecoration';
import { useEffect, useRef, useState } from 'react';
import { seaMedia, type MediaItem } from '../data/site';
import './SeaExperience.css';

export function SeaExperience({ item = seaMedia }: { item?: MediaItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(false);
  const [failed, setFailed] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    let visible = false;
    const syncPlayback = () => {
      if (!visible || document.hidden) { video.pause(); return; }
      if (!reducedMotion.matches && !saveData) {
        void video.play().catch(() => setBlocked(true));
      }
    };
    // Trigger playback near the viewport, keeping the large film off the initial download.
    const observer = typeof IntersectionObserver !== 'undefined'
      ? new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting && entry.intersectionRatio >= .35;
        syncPlayback();
      }, { threshold: [0, .35] }) : null;
    observer?.observe(video);
    document.addEventListener('visibilitychange', syncPlayback);
    const onMotionChange = () => { if (reducedMotion.matches) video.pause(); };
    reducedMotion.addEventListener('change', onMotionChange);
    return () => {
      observer?.disconnect();
      document.removeEventListener('visibilitychange', syncPlayback);
      reducedMotion.removeEventListener('change', onMotionChange);
    };
  }, [item.videoSrc]);

  const enableSound = () => {
    const video = videoRef.current;
    if (!video) return;
    if (failed) video.load();
    setFailed(false);
    setBlocked(false);
    video.muted = false;
    setMuted(false);
    void video.play().catch(() => setBlocked(true));
  };

  return <section id="som-do-mar" className="sea-experience" aria-labelledby="sea-heading">
      <div className="page-shell sea-intro">
        <SeaDecoration motif="shell" className="sea-decoration--sea" />
        <p className="eyebrow">Uma pausa à beira-mar</p>
        <h2 id="sea-heading">Escute o som do <em>mar.</em></h2>
        <p>Respire fundo. Deixe as ondas ditarem o ritmo por um instante.</p>
      </div>
    <div className="sea-stage">
      {item.videoSrc ? <video ref={videoRef} className="sea-video" src={item.videoSrc}
        controls muted={muted} loop playsInline preload="none" aria-label={item.title}
        onVolumeChange={() => setMuted(videoRef.current?.muted ?? true)}
        onError={() => setFailed(true)} onPlay={() => setBlocked(false)}>
        Seu navegador não suporta vídeo.
      </video> : <img className="sea-poster" src={item.poster} alt={item.alt}
        loading="lazy" width="1600" height="900" />}
    </div>
    <div className="page-shell sea-details">
      {item.videoSrc ? <div className="sea-controls">
        {(muted || failed || blocked) && <button type="button" className="text-link" onClick={enableSound}>
          {failed ? 'Tentar novamente' : blocked ? 'Reproduzir com som' : 'Ativar som do mar'} <span aria-hidden="true">▷</span>
        </button>}
        {!muted && !failed && !blocked && <button type="button" className="text-link" onClick={() => {
          if (videoRef.current) videoRef.current.muted = true;
          setMuted(true);
        }}>Silenciar o mar</button>}
        {failed && <p role="status">O vídeo não pôde ser carregado. <a className="text-link" href={item.videoSrc} target="_blank" rel="noreferrer">Abrir vídeo original</a></p>}
        {blocked && <p role="status">Toque para iniciar o vídeo.</p>}
      </div> : <p className="sea-pending">Filme em produção · fotografia de Guaibim como prévia</p>}
    </div>
  </section>;
}
