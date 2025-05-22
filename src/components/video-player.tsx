'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tv } from 'lucide-react';

interface VideoPlayerProps {
  streamTitle: string;
  streamUrl: string; // In a real app, this would be used by a video player library
}

export function VideoPlayer({ streamTitle, streamUrl }: VideoPlayerProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Tv className="h-6 w-6 text-accent" />
          Now Playing: {streamTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video w-full bg-muted flex items-center justify-center rounded-md border">
          <div className="text-center p-4">
            <Tv className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium">Video Playback Area</p>
            <p className="text-sm text-muted-foreground">
              Playback for "{streamTitle}" would start here.
            </p>
            {/* In a real application, you would integrate a video player component here.
                For example, using libraries like Plyr, Video.js, or a simple HTML5 video tag if the URL is a direct video file.
                <video controls src={streamUrl} className="w-full h-full rounded-md" /> 
            */}
            <p className="mt-2 text-xs text-muted-foreground/70">Stream URL: {streamUrl}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
