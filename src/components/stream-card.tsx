
'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Stream as Channel } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlayCircle, Tv2 } from 'lucide-react';

interface StreamCardProps {
  stream: Channel;
}

const MAX_HISTORY_ITEMS = 15;
const VIEWING_HISTORY_KEY = 'channelViewingHistory';

export function StreamCard({ stream: channel }: StreamCardProps) {
  const handleChannelClick = () => {
    try {
      let history: string[] = JSON.parse(localStorage.getItem(VIEWING_HISTORY_KEY) || '[]');
      
      // Remove o canal da lista se já existir para movê-lo para o topo (mais recente)
      history = history.filter(title => title !== channel.title);
      
      // Adiciona o novo canal no início da lista
      history.unshift(channel.title);
      
      // Mantém apenas os últimos MAX_HISTORY_ITEMS
      if (history.length > MAX_HISTORY_ITEMS) {
        history = history.slice(0, MAX_HISTORY_ITEMS);
      }
      
      localStorage.setItem(VIEWING_HISTORY_KEY, JSON.stringify(history));
    } catch (error) {
      console.error("Erro ao salvar histórico de visualização:", error);
      // Não impede a navegação se o localStorage falhar
    }
  };

  return (
    <Link href={`/stream/${channel.id}`} className="group block" onClick={handleChannelClick}>
      <Card className="h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:border-accent">
        <CardHeader className="p-0">
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              src={channel.thumbnailUrl}
              alt={`Logo para ${channel.title}`}
              fill
              sizes="(max-width: 639px) 100vw, (max-width: 767px) 50vw, (max-width: 1023px) 33vw, (max-width: 1279px) 25vw, 20vw"
              className="transition-transform duration-300 group-hover:scale-105 object-cover"
              data-ai-hint={channel.dataAiHint || "tv channel logo"}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <PlayCircle className="h-16 w-16 text-white/80" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="mb-1 line-clamp-1 text-lg flex items-center gap-1">
            <Tv2 className="h-5 w-5 inline-block shrink-0" />
            {channel.title}
          </CardTitle>
          <CardDescription className="mb-2 line-clamp-2 text-sm text-muted-foreground">
            {channel.description}
          </CardDescription>
          <div className="flex flex-wrap gap-2 text-xs">
            <Badge variant="secondary">{channel.genre}</Badge>
            <Badge variant="outline">{channel.language}</Badge>
            <Badge variant="outline">{channel.quality}</Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
