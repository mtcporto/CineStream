
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tv2, AlertTriangle, Info } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

// Declare Hls type for global Hls object from CDN
declare global {
  interface Window {
    Hls: any; 
  }
}

interface VideoPlayerProps {
  streamTitle: string;
  streamUrl: string;
}

export function VideoPlayer({ streamTitle, streamUrl }: VideoPlayerProps) {
  const [isClient, setIsClient] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsInstanceRef = useRef<any>(null); // To store HLS instance

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !videoRef.current) {
      return;
    }

    const videoElement = videoRef.current;
    let hls: any; // hls.js instance

    if (streamUrl && streamUrl.endsWith('.m3u8')) {
      if (window.Hls && window.Hls.isSupported()) {
        console.log('HLS.js is supported and available. Attempting to play M3U8 stream.');
        hls = new window.Hls();
        hlsInstanceRef.current = hls; // Store instance for cleanup
        hls.loadSource(streamUrl);
        hls.attachMedia(videoElement);
        hls.on(window.Hls.Events.MANIFEST_PARSED, () => {
          console.log('HLS.js manifest parsed, attempting to play.');
          videoElement.play().catch(error => console.error('Error attempting to play video with HLS.js:', error));
        });
        hls.on(window.Hls.Events.ERROR, function (event: any, data: any) {
          if (data.fatal) {
            switch (data.type) {
              case window.Hls.ErrorTypes.NETWORK_ERROR:
                console.error('HLS.js fatal network error occurred:', data);
                // Potentially retry or display error to user
                break;
              case window.Hls.ErrorTypes.MEDIA_ERROR:
                console.error('HLS.js fatal media error occurred:', data);
                hls.recoverMediaError(); // Attempt to recover
                break;
              default:
                console.error('HLS.js an fatal error occurred:', data);
                hls.destroy(); // Destroy HLS instance on fatal error
                hlsInstanceRef.current = null;
                break;
            }
          } else {
            console.warn('HLS.js non-fatal error:', data);
          }
        });
      } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
        // Native HLS support (e.g., Safari)
        console.log('HLS.js not found or not supported, but native HLS playback might be available (e.g., Safari).');
        videoElement.src = streamUrl;
        videoElement.play().catch(error => console.error('Error attempting to play video natively:', error));
      } else {
        console.warn('HLS.js is not supported and native HLS playback is not available. M3U8 stream may not play.');
        // Optionally display a message to the user
      }
    } else if (streamUrl && (streamUrl.startsWith('http://') || streamUrl.startsWith('https://'))) {
      // For non-HLS streams (e.g., MP4)
      console.log('Playing non-HLS stream directly.');
      videoElement.src = streamUrl;
      videoElement.play().catch(error => console.error('Error attempting to play non-HLS video:', error));
    }

    // Cleanup function
    return () => {
      if (hlsInstanceRef.current) {
        console.log('Destroying HLS instance.');
        hlsInstanceRef.current.destroy();
        hlsInstanceRef.current = null;
      }
      if (videoElement) {
        videoElement.pause();
        videoElement.removeAttribute('src'); // Remove src to prevent memory leaks
        videoElement.load(); // Reset video element
      }
    };
  }, [streamUrl, isClient]); // Rerun effect if streamUrl or isClient changes

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Tv2 className="h-6 w-6 text-accent" />
          Transmitindo Agora: {streamTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video w-full bg-muted flex items-center justify-center rounded-md border overflow-hidden">
          {isClient ? (
             (streamUrl && (streamUrl.startsWith('http://') || streamUrl.startsWith('https://'))) ? (
              <video ref={videoRef} controls className="w-full h-full" playsInline autoPlay muted>
                Seu navegador não suporta a tag de vídeo ou o formato do stream.
              </video>
            ) : (
              <div className="text-center p-4">
                <AlertTriangle className="h-16 w-16 text-destructive mx-auto mb-4" />
                <p className="text-lg font-medium">URL de Stream Inválida ou Ausente</p>
                <p className="text-sm text-muted-foreground">
                  A URL fornecida para "{streamTitle}" não parece ser válida ou não foi fornecida.
                </p>
                <p className="mt-2 text-xs text-muted-foreground/70">URL: {streamUrl || 'Não fornecida'}</p>
              </div>
            )
          ) : (
            <div className="aspect-video w-full bg-muted flex items-center justify-center rounded-md border">
              <div className="text-center p-4">
                <Tv2 className="h-16 w-16 text-muted-foreground mx-auto mb-4 animate-pulse" />
                <p className="text-lg font-medium">Carregando Player...</p>
              </div>
            </div>
          )}
        </div>
        <div className="mt-4 p-3 border rounded-md bg-card text-sm space-y-2">
          <div className="flex items-start gap-2">
            <Info className="h-5 w-5 text-accent shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Nota do Desenvolvedor:</p>
              <p className="text-muted-foreground text-xs">
                Player tentando reproduzir: <code className="bg-muted px-1 py-0.5 rounded text-xs">{streamUrl || 'N/A'}</code>.
              </p>
              <p className="text-muted-foreground text-xs mt-1">
                Para streams HLS (.m3u8), <code className="bg-muted px-1 py-0.5 rounded text-xs">hls.js</code> é usado em navegadores como Chrome/Firefox. Safari tem suporte nativo.
                Outros formatos podem tocar diretamente.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
