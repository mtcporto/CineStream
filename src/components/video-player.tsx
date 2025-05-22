'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tv2, AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface VideoPlayerProps {
  streamTitle: string;
  streamUrl: string;
}

export function VideoPlayer({ streamTitle, streamUrl }: VideoPlayerProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Tv2 className="h-6 w-6 text-accent" />
          Transmitindo Agora: {streamTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isClient ? (
          <div className="aspect-video w-full bg-muted flex items-center justify-center rounded-md border overflow-hidden">
            {streamUrl && (streamUrl.startsWith('http://') || streamUrl.startsWith('https://')) ? (
              <video controls src={streamUrl} className="w-full h-full" playsInline autoPlay muted>
                Seu navegador não suporta a tag de vídeo ou o formato do stream.
                Para streams HLS (.m3u8), a reprodução nativa funciona melhor no Safari.
                Outros navegadores podem precisar de bibliotecas como hls.js.
              </video>
            ) : (
              <div className="text-center p-4">
                <AlertTriangle className="h-16 w-16 text-destructive mx-auto mb-4" />
                <p className="text-lg font-medium">URL de Stream Inválida</p>
                <p className="text-sm text-muted-foreground">
                  A URL fornecida para "{streamTitle}" não parece ser válida.
                </p>
                <p className="mt-2 text-xs text-muted-foreground/70">URL: {streamUrl || 'Não fornecida'}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="aspect-video w-full bg-muted flex items-center justify-center rounded-md border">
            <div className="text-center p-4">
              <Tv2 className="h-16 w-16 text-muted-foreground mx-auto mb-4 animate-pulse" />
              <p className="text-lg font-medium">Carregando Player...</p>
            </div>
          </div>
        )}
        <div className="mt-4 p-2 border rounded-md bg-card text-xs">
          <p className="font-semibold">Nota do Desenvolvedor:</p>
          <p className="text-muted-foreground">
            Este é um player de vídeo básico. A URL do stream atual é: <code className="bg-muted px-1 rounded">{streamUrl}</code>.
          </p>
          <p className="text-muted-foreground mt-1">
            Para reprodução de HLS (.m3u8) em navegadores como Chrome/Firefox, bibliotecas como <code className="bg-muted px-1 rounded">hls.js</code> ou <code className="bg-muted px-1 rounded">Video.js</code> são geralmente necessárias. O Safari costuma ter suporte nativo.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
