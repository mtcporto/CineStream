
import type { Stream } from './types';

export const mockStreams: Stream[] = [
  {
    id: '1',
    title: 'ISTV Nacional (Teste HLS Confirmado)',
    description: 'Fique por dentro das últimas notícias do Brasil e do mundo, ao vivo, 24 horas por dia. Testando com stream confirmado.',
    genre: 'Notícias',
    language: 'Português',
    quality: 'Adaptável',
    thumbnailUrl: 'https://placehold.co/400x225.png',
    streamUrl: 'https://video08.logicahost.com.br/istvnacional/srt.stream/istvnacional.m3u8', // URL Confirmada
    dataAiHint: 'news live',
  },
  {
    id: '2',
    title: 'Esportes Ao Vivo HD (Teste HLS Apple)',
    description: 'Transmissão ao vivo dos principais eventos esportivos, análises e debates. Usando stream de teste da Apple.',
    genre: 'Esportes',
    language: 'Português',
    quality: 'Adaptável',
    thumbnailUrl: 'https://placehold.co/400x225.png',
    streamUrl: 'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8', // Stream de teste da Apple
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
    title: 'Sessão de Filmes Clássicos (Sintel)',
    description: 'Relembre os grandes clássicos do cinema mundial. Exibindo filme open-source "Sintel".',
    genre: 'Filmes',
    language: 'Inglês', // Sintel não tem dublagem PT-BR oficial em HLS público
    quality: 'Adaptável',
    thumbnailUrl: 'https://placehold.co/400x225.png',
    streamUrl: 'https://bitmovin-a.akamaihd.net/content/sintel/hls/playlist.m3u8', // Stream HLS do Sintel
    dataAiHint: 'animation movie',
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
    title: 'Documentários Incríveis (Teste HLS Apple)',
    description: 'Explore a natureza, história, ciência e cultura com documentários fascinantes. Usando stream de teste da Apple.',
    genre: 'Documentário',
    language: 'Inglês',
    quality: 'Adaptável',
    thumbnailUrl: 'https://placehold.co/400x225.png',
    streamUrl: 'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8', // Stream de teste da Apple
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
    title: 'Canal Retro Gamer (Teste HLS Apple)',
    description: 'Gameplay de jogos clássicos, reviews e nostalgia do mundo dos games. Usando stream de teste da Apple.',
    genre: 'Games',
    language: 'Português', // O stream em si é mudo ou com áudio genérico
    quality: 'Adaptável',
    thumbnailUrl: 'https://placehold.co/400x225.png',
    streamUrl: 'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8', // Stream de teste da Apple
    dataAiHint: 'retro gaming',
  },
  {
    id: '9',
    title: 'Teste Playlist Brasil (HLS Genérica)',
    description: 'Testando uma playlist M3U8 de canais brasileiros. A reprodução dependerá do primeiro stream válido na lista.',
    genre: 'Teste',
    language: 'Português',
    quality: 'Variável',
    thumbnailUrl: 'https://placehold.co/400x225.png',
    streamUrl: 'https://raw.githubusercontent.com/Free-TV/IPTV/refs/heads/master/playlists/playlist_brazil.m3u8',
    dataAiHint: 'brazil iptv',
  },
];

export const genres = Array.from(new Set(mockStreams.map(s => s.genre))).sort();
export const languages = Array.from(new Set(mockStreams.map(s => s.language))).sort();
export const qualities = Array.from(new Set(mockStreams.map(s => s.quality))).sort();

export function getStreamById(id: string): Stream | undefined {
  return mockStreams.find(stream => stream.id === id);
}
