import { heroMedia } from '../data/site';
import { Header } from '../components/layout/Header';
import { Media } from '../components/media/Media';
import { BookingLink } from '../components/ui/BookingLink';
import { Arrow } from '../components/ui/Arrow';

// Keep words intact on narrow screens while staggering individual letters.
function titleLetters(text: string, start: number) {
  let index = start;
  return text.split(' ').map((word, wordIndex) => {
    const letters = Array.from(word).map(letter => {
      const order = index++;
      return <span className="hero-title-letter" key={order} style={{ animationDelay: (100 + order * 28) + 'ms' }}>{letter}</span>;
    });
    index++;
    return <span key={wordIndex}>{wordIndex > 0 && ' '}<span className="hero-title-word">{letters}</span></span>;
  });
}

export function Hero() {
  return <section id="inicio" className="hero" aria-labelledby="hero-heading">
    <Media item={heroMedia} className="hero-art" priority sizes="100vw" />
    <Header />
    <div className="hero-content page-shell">
      <p className="eyebrow">Guaibim · Bahia · Brasil</p>
      <h1 id="hero-heading" aria-label="O tempo passa mais devagar aqui.">
        <span className="hero-title-line" aria-hidden="true">{titleLetters('O tempo passa', 0)}</span>{' '}
        <span className="hero-title-line" aria-hidden="true"><em>{titleLetters('mais devagar', 14)}</em>{' '}{titleLetters('aqui.', 27)}</span>
      </h1>
      <p className="hero-description">Um convite para chegar, respirar<br className="desktop-break" /> e deixar a vida acontecer.</p>
      <div className="hero-actions"><a className="text-link" href="#a-casa">Explore a casa <Arrow down /></a><BookingLink /></div>
    </div>
  </section>;   

}
