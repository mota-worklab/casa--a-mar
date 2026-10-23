import { useEffect, useRef, useState } from 'react';
import { navigation } from '../../data/site';
import { BookingLink } from '../ui/BookingLink';

export function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); }
    };
    const onOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) setOpen(false);
    };
    const desktop = window.matchMedia('(min-width: 900px)');
    const onResize = () => { if (desktop.matches) setOpen(false); };
    document.addEventListener('pointerdown', onOutside);
    desktop.addEventListener('change', onResize);
    document.addEventListener('keydown', close);
    return () => {
      document.removeEventListener('keydown', close);
      document.removeEventListener('pointerdown', onOutside);
      desktop.removeEventListener('change', onResize);
    };
  }, [open]);
  return (
    <header ref={headerRef} className="site-header">
      <a className="wordmark" href="#inicio" aria-label="Casa Amar — início">casa amar<span>GUAIBIM · BAHIA</span></a>
      <button ref={toggle} type="button" className="menu-toggle" aria-expanded={open} aria-controls="main-navigation"
        aria-label={open ? 'Fechar menu' : 'Abrir menu'} onClick={() => setOpen(!open)}>
        <span>{open ? 'Fechar' : 'Menu'}</span><span aria-hidden="true">{open ? '×' : '☰'}</span>
      </button>
      <nav id="main-navigation" aria-label="Navegação principal" className={`main-navigation ${open ? 'is-open' : ''}`}>
        {navigation.map((item) => <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>)}
      </nav>
      <BookingLink className="header-booking" compact />
    </header>
  );
}
