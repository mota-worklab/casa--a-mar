import { lazy, Suspense, useState } from 'react';
import { Footer } from '../components/layout/Footer';
import { media } from '../data/site';
import { Hero } from '../sections/Hero';
import { About } from '../sections/About';
import { Spaces } from '../sections/Spaces';
import { Destination } from '../sections/Destination';
import { Location } from '../sections/Location';
import { FAQ } from '../sections/FAQ';
import { Contact } from '../sections/Contact';

const Gallery = lazy(() => import('../components/media/Gallery'));

export default function App() {
  const [galleryOpen, setGalleryOpen] = useState(false);
  return <>
    <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
    <Hero />
    <main id="conteudo">
      <aside className="preview-notice" aria-label="Sobre esta apresentação">Versão de apresentação · Ilustrações provisórias. Fotos, vídeos e detalhes da estadia em confirmação.</aside>
      <About />
      <Spaces onOpenGallery={() => setGalleryOpen(true)} />
      <Destination />
      <Location />
      <FAQ />
      <Contact />
    </main>
    <Footer />
    {galleryOpen && <Suspense fallback={<p className="gallery-loading" role="status">Abrindo galeria…</p>}>
      <Gallery items={media} onClose={() => setGalleryOpen(false)} />
    </Suspense>}
  </>;
}
