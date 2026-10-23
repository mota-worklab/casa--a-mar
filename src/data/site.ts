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
  { id: 'casa', title: 'Balanços no jardim da Casa Amar', alt: 'Balanços sob o pergolado florido, com o jardim e a Casa Amar ao fundo', poster: '/media/placeholder-ocean.svg', src: '/media/balancos-casa-amar-1600.webp', srcSet: '/media/balancos-casa-amar-800.webp 800w, /media/balancos-casa-amar-1600.webp 1600w', objectPosition: 'center center', provisional: false },
  { id: 'detalhes', title: 'Um instante à beira da piscina', alt: 'Guarda-sol, cadeiras e piscina no pátio da Casa Amar', poster: '/media/placeholder-sand.svg', src: '/media/patio-casa-amar.jpeg', objectPosition: 'center 62%', provisional: false },
  { id: 'paisagem', title: 'O mar de Guaibim', alt: 'Praia de Guaibim entre coqueiros e vegetação costeira, sob céu azul com nuvens', poster: '/media/placeholder-coast.svg', src: '/media/praia-guaibim-ceu-coqueiros-1600.webp', srcSet: '/media/praia-guaibim-ceu-coqueiros-800.webp 800w, /media/praia-guaibim-ceu-coqueiros-1600.webp 1600w', objectPosition: 'center 60%', provisional: false },
  { id: 'convivencia', title: 'Tempo de estar junto', alt: 'Sala de estar da Casa Amar com sofá de fibra trançada, televisão e cortinas claras', poster: '/media/placeholder-sand.svg', src: '/media/sala-estar-casa-amar.jpeg', objectPosition: 'center 58%', provisional: false },
  { id: 'descanso', title: 'Uma pausa só sua', alt: 'Quarto da Casa Amar com cama arrumada e luz natural pela janela', poster: '/media/placeholder-ocean.svg', src: '/media/quarto-casa-amar-1448.webp', srcSet: '/media/quarto-casa-amar-720.webp 720w, /media/quarto-casa-amar-1448.webp 1448w', objectPosition: '52% center', provisional: false },
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

export const arrivalMedia: MediaItem = {
  id: 'chegada', title: 'Voo de chegada à Casa Amar',
  alt: 'Vista aérea da Casa Amar, com piscina, casas do entorno e o mar ao fundo',
  poster: '/media/voo-chegada-casa-amar.webp', src: '/media/voo-chegada-casa-amar.webp',
  videoSrc: '/media/voo-chegada-casa-amar.mp4', provisional: false,
};

export const galleryMedia = [...media, destinationMedia];

export type AmenityIconName = 'bed' | 'bath' | 'sofa' | 'terrace' | 'hammock' | 'pool' | 'grill' | 'shower' | 'beach' | 'kitchen' | 'utensils' | 'wifi' | 'car';

export const amenityGroups: { title: string; items: { label: string; icon: AmenityIconName }[] }[] = [
  { title: 'Conforto', items: [{ label: '5 suítes climatizadas', icon: 'bed' }, { label: '6 banheiros no total', icon: 'bath' }] },
  { title: 'Convivência', items: [{ label: 'Sala de estar e jantar integradas à cozinha', icon: 'sofa' }, { label: 'Terraço', icon: 'terrace' }, { label: 'Pergolado com balanço e rede', icon: 'hammock' }] },
  { title: 'Lazer', items: [{ label: 'Piscina', icon: 'pool' }, { label: 'Área gourmet com churrasqueira e lavabo', icon: 'grill' }, { label: 'Chuveirão ao ar livre', icon: 'shower' }, { label: 'Próxima à praia', icon: 'beach' }] },
  { title: 'Estrutura', items: [{ label: 'Cozinha completa e área de serviço', icon: 'kitchen' }, { label: 'Utensílios domésticos', icon: 'utensils' }, { label: 'TV e internet Wi-Fi', icon: 'wifi' }, { label: 'Área para até 5 carros', icon: 'car' }] },
];

export const questions = [
  { question: 'Como consultar a disponibilidade?', answer: 'Fale diretamente com a Casa Amar pelo WhatsApp. Tenha em mãos as datas desejadas e o número de pessoas; a disponibilidade depende de confirmação.' },
  { question: 'Quantas pessoas a casa recebe?', answer: 'A casa tem 5 suítes climatizadas. Consulte pelo WhatsApp a capacidade total e a configuração das camas para as datas desejadas.' },
  { question: 'Quais são as comodidades e regras da estadia?', answer: 'A casa tem piscina, área gourmet com churrasqueira, cozinha completa e utensílios domésticos, entre outras comodidades. Roupas de cama e banho não estão inclusas; consulte as demais regras antes da reserva.' },
  { question: 'Onde fica a Casa Amar?', answer: 'A Casa Amar fica em Guaibim, Bahia. O endereço exato, as orientações de chegada e eventuais distâncias serão disponibilizados após aprovação do proprietário.' },
];

// Original sea film supplied by the owner; HEVC/AAC, pending web transcode.
export const seaMedia: MediaItem = {
  id: 'som-do-mar', title: 'Escute o som do mar',
  alt: 'O mar e a praia de Guaibim',
  poster: '/media/praia-guaibim-mar.webp',
  videoSrc: '/media/som-do-mar.mov',
  provisional: false,
};
