import { getStreamById } from '@/lib/data';
import type { Stream } from '@/lib/types';
import { VideoPlayer } from '@/components/video-player';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, Tv, CalendarDays, Globe, Film, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface StreamDetailsPageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: StreamDetailsPageProps) {
  const stream = getStreamById(params.id);
  if (!stream) {
    return { title: 'Stream Not Found' };
  }
  return { title: `${stream.title} - CineStream Navigator` };
}

export default function StreamDetailsPage({ params }: StreamDetailsPageProps) {
  const stream = getStreamById(params.id);

  if (!stream) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center">
        <AlertCircle className="h-16 w-16 text-destructive mb-4" />
        <h1 className="text-3xl font-bold mb-2">Stream Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The stream you are looking for does not exist or has been removed.
        </p>
        <Button asChild>
          <Link href="/">Go Back to Streams</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl py-8">
      <div className="mb-8">
        <VideoPlayer streamTitle={stream.title} streamUrl={stream.streamUrl} />
      </div>

      <Card className="overflow-hidden shadow-lg">
        <div className="md:flex">
          <div className="md:w-1/3 relative hidden md:block">
            <Image
              src={stream.thumbnailUrl}
              alt={`Thumbnail for ${stream.title}`}
              layout="fill"
              objectFit="cover"
              className="rounded-l-lg"
              data-ai-hint={stream.dataAiHint || "movie poster"}
            />
          </div>
          <div className="md:w-2/3">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-primary">{stream.title}</CardTitle>
              <CardDescription className="text-base">{stream.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Separator />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-2">
                  <Film className="h-5 w-5 text-accent" />
                  <span className="font-semibold">Genre:</span>
                  <Badge variant="secondary">{stream.genre}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-accent" />
                  <span className="font-semibold">Language:</span>
                  <Badge variant="outline">{stream.language}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-accent" />
                  <span className="font-semibold">Quality:</span>
                  <Badge variant="outline">{stream.quality}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Tv className="h-5 w-5 text-accent" />
                  <span className="font-semibold">Channel ID:</span>
                  <span className="text-sm">{stream.id}</span>
                </div>
              </div>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-accent" />
                  Additional Information
                </h3>
                <p className="text-sm text-muted-foreground">
                  This section can contain more details about the stream, such as release date, cast, director, or any other relevant metadata. Currently, this is placeholder text.
                </p>
              </div>
              <div className="pt-4">
                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <Link href="/">
                    <Tv className="mr-2 h-4 w-4" /> Back to All Streams
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
