import type { Stream } from './types';

export const mockStreams: Stream[] = [
  {
    id: '1',
    title: 'Canal de Notícias 24h (Teste HLS)',
    description: 'Fique por dentro das últimas notícias do Brasil e do mundo, ao vivo, 24 horas por dia.',
    genre: 'Notícias',
    language: 'Português',
    quality: 'Adaptável',
    thumbnailUrl: 'https://placehold.co/400x225.png',
    // Exemplo de stream HLS público para teste (Apple's BipBop)
    streamUrl: 'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8',
    dataAiHint: 'news live',
  },
  {
    id: '2',
    title: 'Esportes Ao Vivo HD (Teste HLS)',
    description: 'Transmissão ao vivo dos principais eventos esportivos, análises e debates.',
    genre: 'Esportes',
    language: 'Português',
    quality: 'Adaptável',
    thumbnailUrl: 'https://placehold.co/400x225.png',
    // Usando o stream da Apple como substituto para o Mux que estava com erro 400
    streamUrl: 'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8',
    dataAiHint: 'sports soccer',
  },
  {
    id: '3',
    title: 'Culinária da Vovó',
    description: 'Receitas tradicionais e dicas de culinária para o dia a dia, com um toque caseiro.',
    genre: 'Culinária',
    language: 'Português',
    quality: '720p',
    thumbnailUrl: 'https://placehold.co/400x225.png',
    streamUrl: 'placeholder_tv_channel_url_3', 
    dataAiHint: 'cooking food',
  },
  {
    id: '4',
    title: 'Sessão de Filmes Clássicos (Teste HLS)',
    description: 'Relembre os grandes clássicos do cinema mundial, dublados e legendados.',
    genre: 'Filmes',
    language: 'Português',
    quality: 'Adaptável',
    thumbnailUrl: 'https://placehold.co/400x225.png',
    // Outro stream de teste HLS (Bitmovin Sintel)
    streamUrl: 'https://bitmovin-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
    dataAiHint: 'classic movie',
  },
  {
    id: '5',
    title: 'Mundo Infantil',
    description: 'Desenhos animados, séries e programas educativos para crianças de todas as idades.',
    genre: 'Infantil',
    language: 'Português',
    quality: '720p',
    thumbnailUrl: 'https://placehold.co/400x225.png',
    streamUrl: 'placeholder_tv_channel_url_5',
    dataAiHint: 'kids cartoon',
  },
  {
    id: '6',
    title: 'Documentários Incríveis (Teste HLS)',
    description: 'Explore a natureza, história, ciência e cultura com documentários fascinantes.',
    genre: 'Documentário',
    language: 'Inglês',
    quality: 'Adaptável',
    thumbnailUrl: 'https://placehold.co/400x225.png',
    streamUrl: 'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8',
    dataAiHint: 'nature documentary',
  },
  {
    id: '7',
    title: 'Variedades Show',
    description: 'Programas de auditório, entrevistas, música e entretenimento para toda a família.',
    genre: 'Variedades',
    language: 'Português',
    quality: '720p',
    thumbnailUrl: 'https://placehold.co/400x225.png',
    streamUrl: 'placeholder_tv_channel_url_7',
    dataAiHint: 'tv show',
  },
  {
    id: '8',
    title: 'Canal Retro Gamer (Teste HLS)',
    description: 'Gameplay de jogos clássicos, reviews e nostalgia do mundo dos games.',
    genre: 'Games',
    language: 'Português',
    quality: 'Adaptável',
    thumbnailUrl: 'https://placehold.co/400x225.png',
    // Usando o stream da Apple como substituto para o Mux que estava com erro 400
    streamUrl: 'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8',
    dataAiHint: 'retro gaming',
  },
];

export const genres = Array.from(new Set(mockStreams.map(s => s.genre))).sort();
export const languages = Array.from(new Set(mockStreams.map(s => s.language))).sort();
export const qualities = Array.from(new Set(mockStreams.map(s => s.quality))).sort();

export function getStreamById(id: string): Stream | undefined {
  return mockStreams.find(stream => stream.id === id);
}
