import { heroMedia } from '../data/site';
import { Header } from '../components/layout/Header';
import { Film } from '../components/media/Film';
import { BookingLink } from '../components/ui/BookingLink';
import { Arrow } from '../components/ui/Arrow';

export function Hero() {
  return <section id="inicio" className="hero" aria-labelledby="hero-heading">
    <div className="hero-art" aria-hidden="true" />
    <Header />
    <div className="hero-content page-shell">
      <p className="eyebrow"><span className="small-line" /> Guaibim · Bahia · Brasil</p>
      <h1 id="hero-heading">O tempo passa<br /><em>mais devagar</em> aqui.</h1>
      <p className="hero-description">Um convite para chegar, respirar<br className="desktop-break" /> e deixar a vida acontecer.</p>
      <div className="hero-actions"><a className="text-link" href="#a-casa">Explore a casa <Arrow down /></a><BookingLink /></div>
    </div>
    <div className="hero-bottom page-shell"><span className="hero-index">01 — Um novo ritmo</span><Film item={heroMedia} /></div>
    <p className="hero-art-label">Paisagem abstrata ilustrativa · filmagem de drone pendente</p>
  </section>;
}
