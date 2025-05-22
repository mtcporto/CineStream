export interface Stream {
  id: string;
  title: string;
  description: string;
  genre: string;
  language: string;
  quality: string;
  thumbnailUrl: string;
  streamUrl: string; // This would be the actual stream URL for playback
  dataAiHint?: string; // For placeholder image generation
}
