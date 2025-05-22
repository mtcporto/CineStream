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
import { Loader2, Wand2, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const recommendationSchema = z.object({
  viewingHistory: z.string().min(10, 'Please provide some viewing history (at least 10 characters).').max(2000),
  preferences: z.string().min(5, 'Please describe your preferences (at least 5 characters).').max(1000),
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
        title: "Recommendations Generated!",
        description: "We've found some streams you might like.",
      });
    } catch (e) {
      console.error("Error fetching recommendations:", e);
      const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
      setError(`Failed to get recommendations: ${errorMessage}`);
      toast({
        title: "Error",
        description: "Could not generate recommendations at this time.",
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
          <CardTitle className="text-3xl font-bold">Personalized Recommendations</CardTitle>
          <CardDescription className="text-md">
            Tell us what you've watched and what you like, and our AI will suggest streams for you!
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
                    <FormLabel className="text-lg">Your Viewing History</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Watched 'Action Packed Adventures', 'Sci-Fi Universe', and enjoyed comedies like 'Comedy Central'."
                        className="min-h-[120px] resize-y"
                        {...field}
                        aria-describedby="viewingHistory-description"
                      />
                    </FormControl>
                    <p id="viewingHistory-description" className="text-sm text-muted-foreground">
                      List some movies, shows, or genres you've watched recently.
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
                    <FormLabel className="text-lg">Your Preferences</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., I prefer fast-paced action movies, documentaries about space, or light-hearted comedies. Not a fan of horror."
                        className="min-h-[100px] resize-y"
                        {...field}
                         aria-describedby="preferences-description"
                      />
                    </FormControl>
                     <p id="preferences-description" className="text-sm text-muted-foreground">
                      What kind of content are you in the mood for? Any specific genres, themes, or actors you like/dislike?
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-3" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-5 w-5" />
                    Get Recommendations
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
              Something Went Wrong
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
            <CardTitle className="text-2xl">Here are your recommendations:</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap rounded-md border bg-muted/50 p-4 font-mono text-sm">
              {recommendations.recommendations}
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">
              These recommendations are AI-generated. Enjoy exploring!
            </p>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
