import type { Stream } from './types';

export const mockStreams: Stream[] = [
  {
    id: '1',
    title: 'Action Packed Adventures',
    description: 'A thrilling collection of action movies and series, guaranteed to keep you on the edge of your seat.',
    genre: 'Action',
    language: 'English',
    quality: '1080p',
    thumbnailUrl: 'https://placehold.co/400x225.png',
    streamUrl: 'placeholder_stream_url_1',
    dataAiHint: 'action movie',
  },
  {
    id: '2',
    title: 'Comedy Central',
    description: 'Laugh out loud with our best selection of comedy films and stand-up shows.',
    genre: 'Comedy',
    language: 'English',
    quality: '720p',
    thumbnailUrl: 'https://placehold.co/400x225.png',
    streamUrl: 'placeholder_stream_url_2',
    dataAiHint: 'comedy show',
  },
  {
    id: '3',
    title: 'Drama Queens & Kings',
    description: 'Explore compelling narratives and character-driven stories in our drama collection.',
    genre: 'Drama',
    language: 'Spanish',
    quality: '1080p',
    thumbnailUrl: 'https://placehold.co/400x225.png',
    streamUrl: 'placeholder_stream_url_3',
    dataAiHint: 'drama film',
  },
  {
    id: '4',
    title: 'Sci-Fi Universe',
    description: 'Journey to other worlds and explore futuristic technologies with our sci-fi streams.',
    genre: 'Sci-Fi',
    language: 'English',
    quality: '4K',
    thumbnailUrl: 'https://placehold.co/400x225.png',
    streamUrl: 'placeholder_stream_url_4',
    dataAiHint: 'sci-fi space',
  },
  {
    id: '5',
    title: 'Animated Wonders',
    description: 'Fun for all ages! Dive into colorful animated movies and series.',
    genre: 'Animation',
    language: 'French',
    quality: '1080p',
    thumbnailUrl: 'https://placehold.co/400x225.png',
    streamUrl: 'placeholder_stream_url_5',
    dataAiHint: 'animation cartoon',
  },
  {
    id: '6',
    title: 'Documentary Discoveries',
    description: 'Learn about the world around us with thought-provoking documentaries.',
    genre: 'Documentary',
    language: 'English',
    quality: '720p',
    thumbnailUrl: 'https://placehold.co/400x225.png',
    streamUrl: 'placeholder_stream_url_6',
    dataAiHint: 'nature documentary',
  },
  {
    id: '7',
    title: 'Horror Nights',
    description: 'Get your thrills with a selection of terrifying horror movies.',
    genre: 'Horror',
    language: 'English',
    quality: '1080p',
    thumbnailUrl: 'https://placehold.co/400x225.png',
    streamUrl: 'placeholder_stream_url_7',
    dataAiHint: 'horror scary',
  },
  {
    id: '8',
    title: 'Romantic Escapes',
    description: 'Fall in love with our curated list of romantic movies.',
    genre: 'Romance',
    language: 'Italian',
    quality: '1080p',
    thumbnailUrl: 'https://placehold.co/400x225.png',
    streamUrl: 'placeholder_stream_url_8',
    dataAiHint: 'romance couple',
  },
];

export const genres = Array.from(new Set(mockStreams.map(s => s.genre))).sort();
export const languages = Array.from(new Set(mockStreams.map(s => s.language))).sort();
export const qualities = Array.from(new Set(mockStreams.map(s => s.quality))).sort();

export function getStreamById(id: string): Stream | undefined {
  return mockStreams.find(stream => stream.id === id);
}
