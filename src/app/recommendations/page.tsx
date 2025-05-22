'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { personalizedRecommendations, type PersonalizedRecommendationsInput, type PersonalizedRecommendationsOutput } from '@/ai/flows/personalized-recommendations';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Wand2, AlertTriangle, Tv2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const recommendationSchema = z.object({
  viewingHistory: z.string().min(10, 'Por favor, forneça algum histórico de canais assistidos (pelo menos 10 caracteres).').max(2000),
  preferences: z.string().min(5, 'Por favor, descreva suas preferências (pelo menos 5 caracteres).').max(1000),
});

type RecommendationFormValues = z.infer<typeof recommendationSchema>;

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<PersonalizedRecommendationsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<RecommendationFormValues>({
    resolver: zodResolver(recommendationSchema),
    defaultValues: {
      viewingHistory: '',
      preferences: '',
    },
  });

  const onSubmit: SubmitHandler<RecommendationFormValues> = async (data) => {
    setIsLoading(true);
    setError(null);
    setRecommendations(null);

    try {
      const result = await personalizedRecommendations(data);
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
            Diga-nos quais canais você assistiu e do que você gosta, e nossa IA sugerirá novos canais para você!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="viewingHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Seu Histórico de Canais</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ex: Assisti 'Canal de Notícias 24h', 'Esportes Ao Vivo HD', e gostei de canais de culinária."
                        className="min-h-[120px] resize-y"
                        {...field}
                        aria-describedby="viewingHistory-description"
                      />
                    </FormControl>
                    <p id="viewingHistory-description" className="text-sm text-muted-foreground">
                      Liste alguns canais, programas ou tipos de conteúdo que você assistiu recentemente.
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="preferences"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Suas Preferências</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ex: Prefiro canais de documentários sobre natureza, programas de entrevistas ou canais de música. Não gosto muito de canais de política."
                        className="min-h-[100px] resize-y"
                        {...field}
                         aria-describedby="preferences-description"
                      />
                    </FormControl>
                     <p id="preferences-description" className="text-sm text-muted-foreground">
                      Que tipo de conteúdo você está procurando? Alguma categoria, tema ou apresentador específico que você gosta/não gosta?
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-3" disabled={isLoading}>
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
            </form>
          </Form>
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
              Estas recomendações são geradas por IA. Divirta-se explorando!
            </p>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
