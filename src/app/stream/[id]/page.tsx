
import { getStreamById } from '@/lib/data';
import type { Stream as Channel } from '@/lib/types';
import { VideoPlayer } from '@/components/video-player';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, Tv, CalendarDays, Globe, Film, ShieldCheck, Tv2, Info } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface ChannelDetailsPageProps {
  params: { id: string }; 
}

export async function generateMetadata({ params }: ChannelDetailsPageProps) {
  // Reverted to direct access as per standard Next.js App Router.
  // If "params should be awaited" error persists, it's an environment-specific issue.
  const channelId = params.id;
  const channel = getStreamById(channelId);
  if (!channel) {
    return { title: 'Canal Não Encontrado - Canal Play' };
  }
  return { title: `${channel.title} - Canal Play` };
}

export default async function ChannelDetailsPage({ params }: ChannelDetailsPageProps) {
  // Reverted to direct access.
  const channelId = params.id;
  const channel = getStreamById(channelId);

  if (!channel) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center">
        <AlertCircle className="h-16 w-16 text-destructive mb-4" />
        <h1 className="text-3xl font-bold mb-2">Canal Não Encontrado</h1>
        <p className="text-muted-foreground mb-6">
          O canal que você está procurando não existe ou foi removido.
        </p>
        <Button asChild>
          <Link href="/">Voltar para Todos os Canais</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl py-8">
      <div className="mb-8">
        <VideoPlayer streamTitle={channel.title} streamUrl={channel.streamUrl} />
      </div>

      <Card className="overflow-hidden shadow-lg">
        <div className="md:flex">
          <div className="md:w-1/3 relative hidden md:block">
            <Image
              src={channel.thumbnailUrl}
              alt={`Logo do canal ${channel.title}`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw" 
              className="rounded-l-lg object-cover"
              data-ai-hint={channel.dataAiHint || "tv channel logo"}
            />
          </div>
          <div className="md:w-2/3">
            <CardHeader>
              <CardTitle className="tracking-tight text-3xl font-bold text-foreground flex items-center gap-2"> {/* Changed text-primary to text-foreground */}
                <Tv2 className="h-8 w-8" /> {channel.title}
              </CardTitle>
              <CardDescription className="text-base">{channel.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Separator />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-2">
                  <Film className="h-5 w-5 text-accent" />
                  <span className="font-semibold">Categoria:</span>
                  <Badge variant="secondary">{channel.genre}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-accent" />
                  <span className="font-semibold">Idioma:</span>
                  <Badge variant="outline">{channel.language}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-accent" />
                  <span className="font-semibold">Qualidade:</span>
                  <Badge variant="outline">{channel.quality}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-accent" />
                  <span className="font-semibold">ID do Canal:</span>
                  <span className="text-sm">{channel.id}</span>
                </div>
              </div>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-accent" />
                  Programação / Sobre o Canal
                </h3>
                <p className="text-sm text-muted-foreground">
                  Esta seção pode conter detalhes sobre a programação do canal, horários ou outras informações relevantes. Atualmente, este é um texto de exemplo.
                </p>
              </div>
              <div className="pt-4">
                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <Link href="/">
                    <Tv2 className="mr-2 h-4 w-4" /> Voltar para Todos os Canais
                  </Link>
                </Button>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
}
