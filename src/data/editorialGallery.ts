import type { MediaItem } from './site';

function galleryPhoto(id: string, title: string, alt: string, widths: [number, number], objectPosition = 'center'): MediaItem {
  const src = `/media/galeria-${id}-1600.webp`;
  const preview = `/media/galeria-${id}-800.webp`;
  return { id: `editorial-${id}`, title, alt, poster: preview, src,
    srcSet: `${preview} ${widths[0]}w, ${src} ${widths[1]}w`, objectPosition, provisional: false };
}

export const editorialGallery = {
  eyebrow: 'Entre um mergulho e outro',
  title: 'Dias leves. Memórias que ficam.',
  description: 'O encontro, o descanso, a brisa. Cada detalhe convida a viver a casa no seu tempo.',
  images: [
    galleryPhoto('piscina-patio', 'Pátio e piscina', 'Espreguiçadeiras sob o guarda-sol ao lado da piscina', [600, 960]),
    galleryPhoto('casa-vista-aerea', 'Vista aérea da casa', 'Casa Amar vista de cima, com piscina e coqueiros no pátio', [800, 1280]),
    galleryPhoto('coqueiros-praia', 'Coqueiros à beira-mar', 'Coqueiros diante do mar e do céu azul com nuvens', [600, 960]),
    galleryPhoto('jardim-mar', 'Jardim e mar', 'Árvore sombreando o jardim com coqueiros e mar ao fundo', [450, 900], 'center 72%'),
    galleryPhoto('quarto-duas-camas', 'Quarto com duas camas', 'Duas camas arrumadas em quarto claro com janela e ar-condicionado', [800, 1030]),
    galleryPhoto('rio-encontro', 'Águas rasas', 'Água rasa junto à margem arenosa, com vegetação e céu azul', [600, 1200]),
    galleryPhoto('praia-areia', 'Praia de areia clara', 'Faixa ampla de areia clara diante do mar e do céu azul', [600, 1200]),
    {
      id: 'editorial-sala-detalhes',
      title: 'Detalhes da sala',
      alt: 'Luminária de corda, plantas e detalhes da sala de estar',
      poster: '/media/galeria-sala-detalhes.jpeg',
      src: '/media/galeria-sala-detalhes.jpeg',
      objectPosition: 'center',
      provisional: false,
    },
    galleryPhoto('lua-coqueiros', 'Noite entre coqueiros', 'Lua aparecendo entre coqueiros junto à praia à noite', [600, 1200]),
    galleryPhoto('pergolado-balancos', 'Pergolado com balanços', 'Balanços sob pergolado florido no pátio da casa', [600, 960]),
  ],
};
