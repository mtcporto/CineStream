
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

    setHlsError(null); 
    const videoElement = videoRef.current;

    if (hlsInstanceRef.current) {
      console.log('Destroying previous HLS instance.');
      hlsInstanceRef.current.destroy();
      hlsInstanceRef.current = null;
    }
    
    videoElement.pause();
    videoElement.removeAttribute('src'); 
    videoElement.load(); 


    if (streamUrl && streamUrl.endsWith('.m3u8')) {
      if (window.Hls && window.Hls.isSupported()) {
        console.log('HLS.js is supported and available. Attempting to play M3U8 stream:', streamUrl);
        const hls = new window.Hls({
          // xhrSetup: function (xhr, url) {
          //   // You can add headers here if needed for specific streams
          // }
        });
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
          // Log the raw event and data, then a stringified version of data for better debugging
          const stringifiedData = JSON.stringify(data, null, 2);
          const isFatal = data && data.fatal;

          if (isFatal) {
            console.error('HLS.js FATAL Error - Event:', event, 'Type:', data.type, 'Details:', data.details, 'URL:', data.url || 'N/A', '. Full data:', stringifiedData);
          } else {
            console.warn('HLS.js NON-FATAL Error - Event:', event, 'Type:', data.type, 'Details:', data.details, 'URL:', data.url || 'N/A', '. Full data:', stringifiedData);
          }
          
          let errorMessage = 'An HLS playback error occurred.';
          if (data && data.details) {
            errorMessage = `HLS Error: ${data.details}`;
          }
          if (data && data.response && data.response.code && data.response.code !== 200 && data.response.code !== 0) {
            errorMessage += ` (HTTP Status: ${data.response.code})`;
          }
          if (data && data.url) {
             errorMessage += ` - URL: ${data.url}`;
          }

          if (isFatal) {
            setHlsError(errorMessage);
            
            switch (data.type) {
              case window.Hls.ErrorTypes.NETWORK_ERROR:
                break;
              case window.Hls.ErrorTypes.MEDIA_ERROR:
                break;
              default:
                if (hlsInstanceRef.current) {
                  console.log(`Destroying HLS instance due to unhandled fatal error: ${data.type}`);
                  hlsInstanceRef.current.destroy();
                  hlsInstanceRef.current = null;
                }
                break;
            }
          }
        });
      } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
        console.log('HLS.js not found/supported, but native HLS playback might be available (e.g., Safari). Using native playback for:', streamUrl);
        videoElement.src = streamUrl;
        videoElement.addEventListener('loadedmetadata', () => {
          videoElement.play().catch(error => {
            console.error('Error attempting to play video natively:', error);
            setHlsError(`Could not start native playback: ${error.message}`);
          });
        });
        videoElement.addEventListener('error', (e) => {
            console.error('Native video element error:', e);
            setHlsError(`Native video playback error for ${streamUrl}`);
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
      // UI will show an error message for this case based on the rendering logic below
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
        if (videoElement.load) { 
          videoElement.load(); 
        }
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
        {/* Developer Note removed */}
      </CardContent>
    </Card>
  );
}
