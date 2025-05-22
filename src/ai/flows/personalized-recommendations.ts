'use server';

/**
 * @fileOverview Um agente de IA para recomendação personalizada de canais de TV.
 *
 * - personalizedRecommendations - Uma função que lida com o processo de recomendação personalizada de canais.
 * - PersonalizedRecommendationsInput - O tipo de entrada para a função personalizedRecommendations.
 * - PersonalizedRecommendationsOutput - O tipo de retorno para a função personalizedRecommendations.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedRecommendationsInputSchema = z.object({
  viewingHistory: z
    .string()
    .describe('O histórico de canais assistidos pelo usuário, como uma string. Ex: "Canal de Notícias X, Programa de Culinária Y, Série de Documentários Z".'),
  preferences: z
    .string()
    .describe('As preferências do usuário, como uma string. Ex: "Gosto de canais de esportes e filmes de ação, não gosto de reality shows".'),
});
export type PersonalizedRecommendationsInput = z.infer<
  typeof PersonalizedRecommendationsInputSchema
>;

const PersonalizedRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe('As recomendações personalizadas de canais de TV para o usuário.'),
});
export type PersonalizedRecommendationsOutput = z.infer<
  typeof PersonalizedRecommendationsOutputSchema
>;

export async function personalizedRecommendations(
  input: PersonalizedRecommendationsInput
): Promise<PersonalizedRecommendationsOutput> {
  return personalizedRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedRecommendationsPrompt',
  input: {schema: PersonalizedRecommendationsInputSchema},
  output: {schema: PersonalizedRecommendationsOutputSchema},
  prompt: `Você é um agente de IA que fornece recomendações personalizadas de canais de TV para o usuário.

  Com base no histórico de canais assistidos e nas preferências do usuário, você fornecerá recomendações personalizadas de canais de TV.
  Seja criativo e sugira uma variedade de canais que possam interessar ao usuário.
  Formate a saída como uma lista de recomendações, cada uma com o nome do canal e uma breve justificativa.

  Histórico de Canais Assistidos: {{{viewingHistory}}}
  Preferências: {{{preferences}}}

  Recomendações:`,
});

const personalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedRecommendationsFlow',
    inputSchema: PersonalizedRecommendationsInputSchema,
    outputSchema: PersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
