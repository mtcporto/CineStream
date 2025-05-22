
import type { Stream } from './types';

export const mockStreams: Stream[] = [
  {
    id: '1',
    title: 'ISTV Nacional (Ao Vivo)',
    description: 'Fique por dentro das últimas notícias do Brasil e do mundo, com transmissão ao vivo.',
    genre: 'Notícias',
    language: 'Português',
    quality: 'Adaptável',
    thumbnailUrl: 'https://placehold.co/400x225.png',
    streamUrl: 'https://video08.logicahost.com.br/istvnacional/srt.stream/istvnacional.m3u8',
    dataAiHint: 'news live tv',
  },
  {
    id: '4',
    title: 'Sintel (Filme Open-Source)',
    description: 'Curta o filme de animação open-source "Sintel", uma aventura épica da Blender Foundation.',
    genre: 'Filmes',
    language: 'Inglês (sem diálogo principal)',
    quality: 'Adaptável',
    thumbnailUrl: 'https://placehold.co/400x225.png',
    streamUrl: 'https://bitmovin-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
    dataAiHint: 'animation fantasy movie',
  },
  {
    id: '12',
    title: 'Art of Motion (Demo Visual)',
    description: 'Um stream de demonstração com belas imagens da natureza e esportes, ideal para testar a qualidade do vídeo.',
    genre: 'Demonstração',
    language: 'Instrumental',
    quality: 'Adaptável',
    thumbnailUrl: 'https://placehold.co/400x225.png',
    streamUrl: 'https://bitmovin-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
    dataAiHint: 'nature sports demo',
  },
];

export const genres = Array.from(new Set(mockStreams.map(s => s.genre))).sort();
export const languages = Array.from(new Set(mockStreams.map(s => s.language))).sort();
export const qualities = Array.from(new Set(mockStreams.map(s => s.quality))).sort();

export function getStreamById(id: string): Stream | undefined {
  return mockStreams.find(stream => stream.id === id);
}
