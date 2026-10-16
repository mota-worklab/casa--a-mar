export interface MediaItem {
  id: string;
  title: string;
  alt: string;
  poster: string;
  src?: string;
  srcSet?: string;
  videoSrc?: string;
  objectPosition?: string;
  provisional: boolean;
}

export const site = {
  name: 'Casa Amar',
  location: 'Guaibim, Bahia',
  whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER ?? '',
  regionMapUrl: 'https://www.google.com/maps/search/?api=1&query=Guaibim%2C+Bahia',
  exactMapUrl: '',
  reservationMessage: 'Olá! Gostaria de consultar a disponibilidade da Casa Amar. Podemos conversar sobre as datas da minha estadia?',
};

export const navigation = [
  { href: '#a-casa', label: 'A casa' },
  { href: '#ambientes', label: 'Ambientes' },
  { href: '#guaibim', label: 'Guaibim' },
  { href: '#localizacao', label: 'Localização' },
];

// Substitua pelos arquivos do proprietário e marque provisional: false apenas
// após confirmar a origem, autorização e correspondência com cada ambiente.
export const media: MediaItem[] = [
  { id: 'casa', title: 'Um primeiro olhar', alt: 'Fachada da Casa Amar', poster: '/media/placeholder-ocean.svg', provisional: true },
  { id: 'detalhes', title: 'Os pequenos detalhes', alt: 'Detalhes da Casa Amar', poster: '/media/placeholder-sand.svg', provisional: true },
  { id: 'paisagem', title: 'A paisagem ao redor', alt: 'Paisagem nos arredores da Casa Amar', poster: '/media/placeholder-coast.svg', provisional: true },
  { id: 'convivencia', title: 'Tempo de estar junto', alt: 'Área de convivência da Casa Amar', poster: '/media/placeholder-sand.svg', provisional: true },
  { id: 'descanso', title: 'Uma pausa só sua', alt: 'Ambiente de descanso da Casa Amar', poster: '/media/placeholder-ocean.svg', provisional: true },
];

export const heroMedia: MediaItem = {
  id: 'hero', title: 'Um olhar sobre a Casa Amar',
  alt: 'Fachada da Casa Amar com piscina, espreguiçadeiras e palmeiras sob o céu azul',
  src: '/media/casa-amar-hero.png', poster: '/media/placeholder-coast.svg',
  provisional: false,
};

export const destinationMedia: MediaItem = {
  id: 'destino', title: 'A atmosfera de Guaibim', alt: 'Paisagem de Guaibim, Bahia',
  poster: '/media/placeholder-ocean.svg', provisional: true,
};

// Somente comodidades verificadas. A lista vazia exibe uma mensagem honesta.
export const amenities: string[] = [];

export const questions = [
  { question: 'Como consultar a disponibilidade?', answer: 'Assim que o contato oficial estiver disponível, você poderá falar diretamente com a Casa Amar pelo WhatsApp. Tenha em mãos as datas desejadas e o número de pessoas. A disponibilidade depende de confirmação.' },
  { question: 'Quantas pessoas a casa recebe?', answer: 'A capacidade, a configuração dos quartos e a distribuição das camas estão em confirmação. Esses detalhes serão informados antes de qualquer reserva.' },
  { question: 'Quais são as comodidades e regras da estadia?', answer: 'A relação de comodidades e as regras de check-in, check-out, animais de estimação e uso dos espaços serão publicadas após confirmação do proprietário.' },
  { question: 'Onde fica a Casa Amar?', answer: 'A Casa Amar fica em Guaibim, Bahia. O endereço exato, as orientações de chegada e eventuais distâncias serão disponibilizados após aprovação do proprietário.' },
];
