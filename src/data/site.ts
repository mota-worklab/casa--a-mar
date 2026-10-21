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
  whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER || '5575999269950',
  instagramUrl: 'https://www.instagram.com/casaamarguaibim/',
  regionMapUrl: 'https://www.google.com/maps/search/?api=1&query=Guaibim%2C+Bahia',
  regionMapEmbedUrl: 'https://maps.google.com/maps?q=Guaibim%2C%20Bahia&z=12&output=embed',
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
  { id: 'casa', title: 'A casa entre o jardim', alt: 'Casa Amar vista sob a pérgola florida e as palmeiras do jardim', poster: '/media/placeholder-ocean.svg', src: '/media/pergolado-casa-amar.jpeg', objectPosition: 'center center', provisional: false },
  { id: 'detalhes', title: 'Um instante à beira da piscina', alt: 'Guarda-sol, cadeiras e piscina no pátio da Casa Amar', poster: '/media/placeholder-sand.svg', src: '/media/patio-casa-amar.jpeg', objectPosition: 'center 62%', provisional: false },
  { id: 'paisagem', title: 'O mar de Guaibim', alt: 'Mar e faixa de areia da praia de Guaibim', poster: '/media/placeholder-coast.svg', src: '/media/praia-guaibim-mar.webp', provisional: false },
  { id: 'convivencia', title: 'Tempo de estar junto', alt: 'Área de convivência da Casa Amar', poster: '/media/placeholder-sand.svg', provisional: true },
  { id: 'descanso', title: 'Uma pausa só sua', alt: 'Ambiente de descanso da Casa Amar', poster: '/media/placeholder-ocean.svg', provisional: true },
];

export const heroMedia: MediaItem = {
  id: 'hero', title: 'Um olhar sobre a Casa Amar',
  alt: 'Fachada da Casa Amar com piscina, espreguiçadeiras e palmeiras sob o céu azul',
  src: '/media/casa-tropical-moderna-piscina.png', poster: '/media/placeholder-coast.svg',
  provisional: false,
};

export const destinationMedia: MediaItem = {
  id: 'destino', title: 'Palmeiras à beira-mar', alt: 'Palmeiras, vegetação e mar na paisagem de Guaibim',
  poster: '/media/placeholder-ocean.svg', src: '/media/palmeiras-guaibim.jpeg', objectPosition: 'center 68%', provisional: false,
};

export const galleryMedia = [...media, destinationMedia];

export const amenityGroups = [
  { title: 'Conforto', items: ['5 suítes climatizadas', '6 banheiros no total'] },
  { title: 'Convivência', items: ['Sala de estar e jantar integradas à cozinha', 'Terraço', 'Pergolado com balanço e rede'] },
  { title: 'Lazer', items: ['Piscina', 'Área gourmet com churrasqueira e lavabo', 'Chuveirão ao ar livre', 'Próxima à praia'] },
  { title: 'Estrutura', items: ['Cozinha completa e área de serviço', 'Utensílios domésticos', 'TV e internet Wi-Fi', 'Área para até 5 carros'] },
];

export const questions = [
  { question: 'Como consultar a disponibilidade?', answer: 'Fale diretamente com a Casa Amar pelo WhatsApp. Tenha em mãos as datas desejadas e o número de pessoas; a disponibilidade depende de confirmação.' },
  { question: 'Quantas pessoas a casa recebe?', answer: 'A casa tem 5 suítes climatizadas. Consulte pelo WhatsApp a capacidade total e a configuração das camas para as datas desejadas.' },
  { question: 'Quais são as comodidades e regras da estadia?', answer: 'A casa tem piscina, área gourmet com churrasqueira, cozinha completa e utensílios domésticos, entre outras comodidades. Roupas de cama e banho não estão inclusas; consulte as demais regras antes da reserva.' },
  { question: 'Onde fica a Casa Amar?', answer: 'A Casa Amar fica em Guaibim, Bahia. O endereço exato, as orientações de chegada e eventuais distâncias serão disponibilizados após aprovação do proprietário.' },
];
