
'use client';

import { useState, useEffect } from 'react';
import { personalizedRecommendations, type PersonalizedRecommendationsOutput } from '@/ai/flows/personalized-recommendations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Wand2, AlertTriangle, Tv2, History } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

const VIEWING_HISTORY_KEY = 'channelViewingHistory';

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<PersonalizedRecommendationsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentHistory, setCurrentHistory] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem(VIEWING_HISTORY_KEY);
      if (storedHistory) {
        setCurrentHistory(JSON.parse(storedHistory));
      }
    } catch (e) {
      console.error("Erro ao carregar histórico do localStorage:", e);
      setCurrentHistory([]);
    }
  }, []);

  const handleGetRecommendations = async () => {
    setIsLoading(true);
    setError(null);
    setRecommendations(null);

    let viewingHistoryString = "Nenhum histórico de visualização encontrado.";
    if (currentHistory.length > 0) {
      viewingHistoryString = currentHistory.join(', ');
    } else {
        toast({
            title: "Histórico Vazio",
            description: "Seu histórico de visualização está vazio. Assista alguns canais para obter recomendações.",
            variant: "default",
        });
        setIsLoading(false);
        return;
    }

    try {
      const result = await personalizedRecommendations({ viewingHistory: viewingHistoryString });
      setRecommendations(result);
      toast({
        title: "Recomendações Geradas!",
        description: "Encontramos alguns canais que você pode gostar.",
      });
    } catch (e) {
      console.error("Erro ao buscar recomendações:", e);
      const errorMessage = e instanceof Error ? e.message : "Ocorreu um erro desconhecido.";
      setError(`Falha ao obter recomendações: ${errorMessage}`);
      toast({
        title: "Erro",
        description: "Não foi possível gerar recomendações no momento.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl py-8">
      <Card className="shadow-xl">
        <CardHeader className="text-center">
          <Wand2 className="mx-auto h-12 w-12 text-primary mb-2" />
          <CardTitle className="text-3xl font-bold">Recomendações Personalizadas de Canais</CardTitle>
          <CardDescription className="text-md">
            Com base no seu histórico de canais assistidos, nossa IA sugerirá novos canais para você!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <History className="mr-2 h-5 w-5" /> Seu Histórico de Visualização Atual:
            </h3>
            {currentHistory.length > 0 ? (
              <ScrollArea className="h-32 w-full rounded-md border p-3 bg-muted/50">
                <div className="flex flex-col space-y-1">
                  {currentHistory.map((item, index) => (
                    <Badge key={index} variant="secondary" className="text-sm py-1">
                      {item}
                    </Badge>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <p className="text-sm text-muted-foreground">
                Seu histórico de visualização está vazio. Assista alguns canais para que possamos gerar recomendações.
              </p>
            )}
          </div>
          
          <Button onClick={handleGetRecommendations} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-3" disabled={isLoading || currentHistory.length === 0}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Gerando...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-5 w-5" />
                Obter Recomendações
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {error && (
        <Card className="mt-8 border-destructive bg-destructive/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-6 w-6" />
              Algo Deu Errado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-destructive-foreground">{error}</p>
          </CardContent>
        </Card>
      )}

      {recommendations && !error && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2"> <Tv2 className="h-7 w-7" />Aqui estão suas recomendações:</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap rounded-md border bg-muted/50 p-4 font-mono text-sm">
              {recommendations.recommendations}
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">
              Estas recomendações são geradas por IA com base no seu histórico. Divirta-se explorando!
            </p>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
