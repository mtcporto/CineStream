
import type { Stream } from './types';

export const mockStreams: Stream[] = [
  {
    id: '1',
    title: 'ISTV Nacional',
    description: 'Fique por dentro das últimas notícias do Brasil e do mundo, ao vivo, 24 horas por dia.',
    genre: 'Notícias',
    language: 'Português',
    quality: 'Adaptável',
    thumbnailUrl: 'https://placehold.co/400x225.png',
    streamUrl: 'https://video08.logicahost.com.br/istvnacional/srt.stream/istvnacional.m3u8',
    dataAiHint: 'news live',
  },
  {
    id: '4', // Mantendo o ID para consistência se já houver links ou favoritos
    title: 'Cinema Livre: Sintel',
    description: 'Assista ao filme de animação open-source "Sintel", uma produção da Blender Foundation.',
    genre: 'Filmes',
    language: 'Inglês',
    quality: 'Adaptável',
    thumbnailUrl: 'https://placehold.co/400x225.png',
    streamUrl: 'https://bitmovin-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
    dataAiHint: 'animation movie',
  },
  {
    id: '10', // Novo ID para o novo canal
    title: 'NASA TV (Public)',
    description: 'Transmissão ao vivo da NASA com cobertura de missões, eventos e documentários espaciais.',
    genre: 'Educacional',
    language: 'Inglês',
    quality: 'Adaptável',
    thumbnailUrl: 'https://placehold.co/400x225.png',
    streamUrl: 'https://nasa-i.akamaihd.net/hls/live/253565/NASA-NTV1-Public/master.m3u8',
    dataAiHint: 'nasa space',
  },
  // Adicione mais canais com streams públicos/abertos aqui, se encontrados.
  // Exemplo de outro filme open-source (Big Buck Bunny), se encontrarmos um HLS estável:
  // {
  //   id: '11',
  //   title: 'Cinema Livre: Big Buck Bunny',
  //   description: 'Divirta-se com "Big Buck Bunny", outro clássico da Blender Foundation.',
  //   genre: 'Animação',
  //   language: 'Sem diálogo',
  //   quality: 'Adaptável',
  //   thumbnailUrl: 'https://placehold.co/400x225.png',
  //   streamUrl: 'URL_HLS_BIG_BUCK_BUNNY_SE_ENCONTRADA', // Ex: https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8 (Nota: este é um stream de teste genérico da Mux, pode não ser o BBB)
  //   dataAiHint: 'bunny animation',
  // },
];

export const genres = Array.from(new Set(mockStreams.map(s => s.genre))).sort();
export const languages = Array.from(new Set(mockStreams.map(s => s.language))).sort();
export const qualities = Array.from(new Set(mockStreams.map(s => s.quality))).sort();

export function getStreamById(id: string): Stream | undefined {
  return mockStreams.find(stream => stream.id === id);
}
