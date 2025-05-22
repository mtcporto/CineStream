export interface Stream { // Conceptually, this now represents a TV Channel
  id: string;
  title: string;
  description: string;
  genre: string; // Category of the channel (e.g., News, Sports, Movies)
  language: string;
  quality: string; // Streaming quality (e.g., 1080p, 720p)
  thumbnailUrl: string; // URL for the channel logo or a representative image
  streamUrl: string; // The actual stream URL for playback
  dataAiHint?: string; // For placeholder image generation, e.g., "tv channel logo"
}
