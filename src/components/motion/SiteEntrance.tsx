import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { site } from '../../data/site';
import './SiteEntrance.css';

export function SiteEntrance() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(() =>
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
    window.scrollY < 40 && (!window.location.hash || window.location.hash === '#inicio'),
  );

  useEffect(() => {
    if (!active) return;
    const dismiss = () => setActive(false);
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onPreference = () => { if (preference.matches) dismiss(); };
    const onKey = (event: KeyboardEvent) => {
      if (['Escape', 'Tab', 'PageDown', 'ArrowDown', 'End', ' '].includes(event.key)) dismiss();
    };
    const onFocus = (event: FocusEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) dismiss();
    };
    // A bounded fallback also releases the screen when animation events are unavailable.
    const fallback = window.setTimeout(dismiss, 2400);
    window.addEventListener('scroll', dismiss, { passive: true, once: true });
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', dismiss, { passive: true, once: true });
    document.addEventListener('focusin', onFocus);
    preference.addEventListener('change', onPreference);
    return () => {
      window.clearTimeout(fallback);
      window.removeEventListener('scroll', dismiss);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', dismiss);
      document.removeEventListener('focusin', onFocus);
      preference.removeEventListener('change', onPreference);
    };
  }, [active]);

  if (!active) return null;
  return <div ref={rootRef} className="site-entrance">
    <div className="site-entrance-underlay" aria-hidden="true" onAnimationEnd={event => {
      if (event.target === event.currentTarget && event.animationName === 'entrance-curtain') setActive(false);
    }} />
    <div className="site-entrance-curtain">
      <div className="site-entrance-composition" aria-hidden="true">
        <svg className="site-entrance-wave" viewBox="0 0 180 76" fill="none">
          <path pathLength="1" d="M4 52C29 54 47 47 59 29C73 7 99 2 121 14C105 9 91 16 90 29C89 42 102 47 116 43C135 38 149 54 176 51" />
          <path pathLength="1" d="M16 65C40 68 57 56 77 57C98 58 111 69 132 66C148 63 160 62 171 65" />
        </svg>
        <p className="site-entrance-place">{site.location}</p>
        <p className="site-entrance-brand">{site.name.toLowerCase().split(' ').map((word, index) =>
          <span className="site-entrance-word" key={index}><span style={{ '--word-order': index } as CSSProperties}>{word}</span></span>,
        )}</p>
        <div className="site-entrance-rule" />
        <p className="site-entrance-note">O tempo de estar.</p>
      </div>
    </div>
    <button className="site-entrance-skip" type="button" onClick={() => setActive(false)}>
      Pular abertura <span aria-hidden="true">↗</span>
    </button>
  </div>;
}
