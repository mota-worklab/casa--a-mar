import type { MediaItem } from './site';

export interface LocalExperience {
  id: string;
  title: string;
  description: string;
  sourceUrl: string;
}

export const experiences: LocalExperience[] = [
  {
    id: 'praia',
    title: 'Praia de Guaibim',
    description: 'O trecho mais movimentado da orla reúne barracas e restaurantes diante do mar aberto.',
    sourceUrl: 'https://www.valenca.ba.gov.br/Site/dadosmunicipais',
  },
  {
    id: 'guaibimzinho',
    title: 'Guaibimzinho',
    description: 'Um trecho mais tranquilo junto à foz de um pequeno rio de água doce.',
    sourceUrl: 'https://www.guaibim.com.br/localizacao.html',
  },
  {
    id: 'taquari',
    title: 'Praia de Taquari',
    description: 'Mais ao norte, o Rio Taquari encontra o mar em uma paisagem que muda com a maré.',
    sourceUrl: 'https://www.guaibim.com.br/localizacao.html',
  },
  {
    id: 'ponta-curral',
    title: 'Ponta do Curral',
    description: 'Na APA de Guaibim, uma faixa de praia importante para a desova de tartarugas marinhas.',
    sourceUrl: 'https://www.ufrb.edu.br/pgcienciaanimal/dissertacoes-ppgca/category/27-2015?download=588%3Adiagnostico-do-extrativismo-de-moluscos-bivalves-no-distrito-de-guaibim-valenca-bahia-brasil',
  },
  {
    id: 'morro-sao-paulo',
    title: 'Morro de São Paulo',
    description: 'Na Ilha de Tinharé, uma vila com praias e paisagens para conhecer em uma visita à parte.',
    sourceUrl: 'https://www.ba.gov.br/inema/gestao-2/unidades-de-conservacao/apa/apa-ilhas-do-tinhare-e-boipeba',
  },
  {
    id: 'sabores',
    title: 'Provar os sabores da Bahia',
    description: 'Experimente peixes e frutos do mar nas barracas e restaurantes locais.',
    sourceUrl: 'https://pousadasolnascenteguaibim.com.br/a-praia-de-guaibim/',
  },
];

export const experiencesMedia: { beach: MediaItem; taquari: MediaItem } = {
  beach: {
    id: 'praia-coqueiros',
    title: 'Coqueiros à beira-mar',
    alt: 'Praia vista da janela de um carro, com coqueiros e o mar ao fundo',
    poster: '/media/placeholder-coast.svg',
    src: '/media/praia-guaibim-coqueiros-vista-1600.webp',
    srcSet: '/media/praia-guaibim-coqueiros-vista-800.webp 800w, /media/praia-guaibim-coqueiros-vista-1600.webp 1600w',
    objectPosition: 'center 36%',
    provisional: false,
  },
  taquari: {
    id: 'taquari',
    title: 'Taquari',
    alt: 'Águas rasas junto à vegetação de mangue em Taquari',
    poster: '/media/placeholder-ocean.svg',
    src: '/media/taquari-mangue.jpeg',
    objectPosition: 'center 60%',
    provisional: false,
  },
};
