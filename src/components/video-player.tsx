'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tv2 } from 'lucide-react'; // Changed from Tv to Tv2 for a more generic TV icon

interface VideoPlayerProps {
  streamTitle: string; // Will represent channel title
  streamUrl: string; // In a real app, this would be used by a video player library
}

export function VideoPlayer({ streamTitle, streamUrl }: VideoPlayerProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Tv2 className="h-6 w-6 text-accent" />
          Transmitindo Agora: {streamTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video w-full bg-muted flex items-center justify-center rounded-md border">
          <div className="text-center p-4">
            <Tv2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium">Área de Transmissão do Canal</p>
            <p className="text-sm text-muted-foreground">
              A transmissão de "{streamTitle}" começaria aqui.
            </p>
            {/* In a real application, you would integrate a video player component here.
                For example, using libraries like Plyr, Video.js, or a simple HTML5 video tag if the URL is a direct video file.
                <video controls src={streamUrl} className="w-full h-full rounded-md" /> 
            */}
            <p className="mt-2 text-xs text-muted-foreground/70">URL do Canal: {streamUrl}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
