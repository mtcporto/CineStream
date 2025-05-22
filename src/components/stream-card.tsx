'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Stream } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlayCircle } from 'lucide-react';

interface StreamCardProps {
  stream: Stream;
}

export function StreamCard({ stream }: StreamCardProps) {
  return (
    <Link href={`/stream/${stream.id}`} className="group block">
      <Card className="h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:border-accent">
        <CardHeader className="p-0">
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              src={stream.thumbnailUrl}
              alt={`Thumbnail for ${stream.title}`}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={stream.dataAiHint || "video thumbnail"}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <PlayCircle className="h-16 w-16 text-white/80" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="mb-1 line-clamp-1 text-lg">{stream.title}</CardTitle>
          <CardDescription className="mb-2 line-clamp-2 text-sm text-muted-foreground">
            {stream.description}
          </CardDescription>
          <div className="flex flex-wrap gap-2 text-xs">
            <Badge variant="secondary">{stream.genre}</Badge>
            <Badge variant="outline">{stream.language}</Badge>
            <Badge variant="outline">{stream.quality}</Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
