import { SiteEntrance } from '../components/motion/SiteEntrance';
import { lazy, Suspense, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Footer } from '../components/layout/Footer';
import { GalleryBoundary } from '../components/media/GalleryBoundary';
import { BookingLink } from '../components/ui/BookingLink';
import { galleryMedia } from '../data/site';
import { editorialGallery } from '../data/editorialGallery';
import { Hero } from '../sections/Hero';
import { About } from '../sections/About';
import { Spaces } from '../sections/Spaces';
import { SeaExperience } from '../sections/SeaExperience';
import { ThingsToDo } from '../sections/ThingsToDo';
import { Destination } from '../sections/Destination';
import { Location } from '../sections/Location';
import { FAQ } from '../sections/FAQ';
import { Contact } from '../sections/Contact';

const Gallery = lazy(() => import('../components/media/Gallery'));
const allGalleryMedia = [...galleryMedia, ...editorialGallery.images];

export default function App() {
  const revealRef = useScrollReveal();
  const [galleryRequest, setGalleryRequest] = useState<{ trigger: HTMLButtonElement; initialId?: string } | null>(null);
  const openGallery = (trigger: HTMLButtonElement, initialId?: string) => setGalleryRequest({ trigger, initialId });
  return <>
    <SiteEntrance />
    <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
    <Hero />
    <main id="conteudo" ref={revealRef}>
      <div className="shoreline">
        <About />
        <Spaces onOpenGallery={openGallery} />
      </div>
      <Destination />
      <ThingsToDo />
      <SeaExperience />
      <div className="shoreline shoreline--quiet">
        <Location />
        <FAQ />
      </div>
      <Contact />
    </main>
    <Footer />
    <BookingLink className="mobile-booking" />
    {galleryRequest && <GalleryBoundary onDismiss={() => { galleryRequest.trigger.focus(); setGalleryRequest(null); }}>
      <Suspense fallback={<p className="gallery-loading" role="status">Abrindo galeria…</p>}>
        <Gallery items={allGalleryMedia} initialIndex={Math.max(0, allGalleryMedia.findIndex(item => item.id === galleryRequest.initialId))}
          returnFocusTo={galleryRequest.trigger} onClose={() => setGalleryRequest(null)} />
      </Suspense>
    </GalleryBoundary>}
  </>;
}
