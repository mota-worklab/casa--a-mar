import { lazy, Suspense, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Footer } from '../components/layout/Footer';
import { GalleryBoundary } from '../components/media/GalleryBoundary';
import { BookingLink } from '../components/ui/BookingLink';
import { galleryMedia } from '../data/site';
import { Hero } from '../sections/Hero';
import { About } from '../sections/About';
import { Spaces } from '../sections/Spaces';
import { Destination } from '../sections/Destination';
import { Location } from '../sections/Location';
import { FAQ } from '../sections/FAQ';
import { Contact } from '../sections/Contact';

const Gallery = lazy(() => import('../components/media/Gallery'));

export default function App() {
  const revealRef = useScrollReveal();
  const [galleryTrigger, setGalleryTrigger] = useState<HTMLButtonElement | null>(null);
  return <>
    <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
    <Hero />
    <main id="conteudo" ref={revealRef}>
      <div className="shoreline">
        <About />
        <Spaces onOpenGallery={setGalleryTrigger} />
      </div>
      <Destination />
      <div className="shoreline shoreline--quiet">
        <Location />
        <FAQ />
      </div>
      <Contact />
    </main>
    <Footer />
    <BookingLink className="mobile-booking" />
    {galleryTrigger && <GalleryBoundary onDismiss={() => { galleryTrigger.focus(); setGalleryTrigger(null); }}>
      <Suspense fallback={<p className="gallery-loading" role="status">Abrindo galeria…</p>}>
        <Gallery items={galleryMedia} returnFocusTo={galleryTrigger} onClose={() => setGalleryTrigger(null)} />
      </Suspense>
    </GalleryBoundary>}
  </>;
}
