
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
  const [hlsError, setHlsError] = useState<string | null>(null); // State for HLS error messages

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !videoRef.current) {
      return;
    }

    setHlsError(null); // Reset error on new streamUrl or component mount/update
    const videoElement = videoRef.current;

    // Clean up any existing HLS instance
    if (hlsInstanceRef.current) {
      hlsInstanceRef.current.destroy();
      hlsInstanceRef.current = null;
    }
    // Reset video element src
    videoElement.src = '';
    videoElement.load();


    if (streamUrl && streamUrl.endsWith('.m3u8')) {
      if (window.Hls && window.Hls.isSupported()) {
        console.log('HLS.js is supported and available. Attempting to play M3U8 stream:', streamUrl);
        const hls = new window.Hls();
        hlsInstanceRef.current = hls;
        hls.loadSource(streamUrl);
        hls.attachMedia(videoElement);
        hls.on(window.Hls.Events.MANIFEST_PARSED, () => {
          console.log('HLS.js manifest parsed, attempting to play.');
          videoElement.play().catch(error => {
            console.error('Error attempting to play video with HLS.js:', error);
            setHlsError(`Could not start playback: ${error.message}`);
          });
        });
        hls.on(window.Hls.Events.ERROR, function (event: any, data: any) {
          console.error('HLS.js ERROR event object:', event, 'HLS.js ERROR data object:', data);
          
          let errorMessage = 'An HLS playback error occurred.';
          if (data && data.details) {
            errorMessage = `HLS Error: ${data.details}`;
          }
          if (data && data.response && data.response.code) {
            errorMessage += ` (HTTP Status: ${data.response.code})`;
          }
          if (data && data.url) {
             errorMessage += ` - URL: ${data.url}`;
          }


          if (data && data.fatal) {
            console.error(`HLS.js Fatal Error - Type: ${data.type}, Details: ${data.details}. Full data:`, JSON.stringify(data, null, 2));
            setHlsError(errorMessage);
            switch (data.type) {
              case window.Hls.ErrorTypes.NETWORK_ERROR:
                // Specific logging for network error already covered by the general fatal error log and setHlsError
                break;
              case window.Hls.ErrorTypes.MEDIA_ERROR:
                if (hlsInstanceRef.current) {
                  // Attempt to recover media error
                  // hlsInstanceRef.current.recoverMediaError(); // This can sometimes create loops, use with caution or specific strategies
                }
                break;
              default:
                // For other fatal errors, the instance might be unusable
                if (hlsInstanceRef.current) {
                  hlsInstanceRef.current.destroy();
                  hlsInstanceRef.current = null;
                }
                break;
            }
          } else {
            console.warn('HLS.js non-fatal error:', data);
            // Optionally set a non-fatal error message if needed, or just log
          }
        });
      } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
        console.log('HLS.js not found/supported, but native HLS playback might be available (e.g., Safari). Using native playback for:', streamUrl);
        videoElement.src = streamUrl;
        videoElement.play().catch(error => {
          console.error('Error attempting to play video natively:', error);
          setHlsError(`Could not start native playback: ${error.message}`);
        });
      } else {
        const message = 'HLS.js is not supported and native HLS playback is not available. M3U8 stream may not play.';
        console.warn(message, streamUrl);
        setHlsError(message);
      }
    } else if (streamUrl && (streamUrl.startsWith('http://') || streamUrl.startsWith('https://'))) {
      console.log('Playing non-HLS stream directly:', streamUrl);
      videoElement.src = streamUrl;
      videoElement.play().catch(error => {
         console.error('Error attempting to play non-HLS video:', error);
         setHlsError(`Could not play video: ${error.message}`);
      });
    } else if (streamUrl) {
      // Stream URL is present but not m3u8 and not http/https (e.g. placeholder)
      // This case is handled by the JSX rendering logic below
    }

    return () => {
      if (hlsInstanceRef.current) {
        console.log('Destroying HLS instance on cleanup.');
        hlsInstanceRef.current.destroy();
        hlsInstanceRef.current = null;
      }
      if (videoElement) {
        videoElement.pause();
        videoElement.removeAttribute('src');
        videoElement.load();
      }
    };
  }, [streamUrl, isClient]);

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
          {!isClient ? (
            <div className="aspect-video w-full bg-muted flex items-center justify-center rounded-md border">
              <div className="text-center p-4">
                <Tv2 className="h-16 w-16 text-muted-foreground mx-auto mb-4 animate-pulse" />
                <p className="text-lg font-medium">Carregando Player...</p>
              </div>
            </div>
          ) : hlsError ? (
            <div className="text-center p-4">
              <AlertTriangle className="h-16 w-16 text-destructive mx-auto mb-4" />
              <p className="text-lg font-medium">Erro ao Carregar o Stream</p>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{hlsError}</p>
            </div>
          ) : !(streamUrl && (streamUrl.startsWith('http://') || streamUrl.startsWith('https://'))) ? (
            <div className="text-center p-4">
              <AlertTriangle className="h-16 w-16 text-destructive mx-auto mb-4" />
              <p className="text-lg font-medium">URL de Stream Inválida ou Ausente</p>
              <p className="text-sm text-muted-foreground">
                A URL fornecida para "{streamTitle}" não parece ser válida ou não foi fornecida.
              </p>
              <p className="mt-2 text-xs text-muted-foreground/70">URL: {streamUrl || 'Não fornecida'}</p>
            </div>
          ) : (
            <video ref={videoRef} controls className="w-full h-full" playsInline autoPlay muted>
              Seu navegador não suporta a tag de vídeo ou o formato do stream.
            </video>
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
                Outros formatos podem tocar diretamente. Verifique o console para logs detalhados do HLS.js.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
