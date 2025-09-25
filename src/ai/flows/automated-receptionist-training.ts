// src/ai/flows/automated-receptionist-training.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow for automatically training the AI receptionist using past chat logs.
 *
 * - automatedReceptionistTraining - A function that triggers the AI receptionist training process.
 * - AutomatedReceptionistTrainingInput - The input type for the automatedReceptionistTraining function.
 * - AutomatedReceptionistTrainingOutput - The return type for the automatedReceptionistTraining function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutomatedReceptionistTrainingInputSchema = z.object({
  chatLogs: z.string().describe('A string containing the chat logs to use for training.'),
});
export type AutomatedReceptionistTrainingInput = z.infer<typeof AutomatedReceptionistTrainingInputSchema>;

const AutomatedReceptionistTrainingOutputSchema = z.object({
  trainingResult: z.string().describe('A message indicating the result of the training process.'),
});
export type AutomatedReceptionistTrainingOutput = z.infer<typeof AutomatedReceptionistTrainingOutputSchema>;

export async function automatedReceptionistTraining(input: AutomatedReceptionistTrainingInput): Promise<AutomatedReceptionistTrainingOutput> {
  return automatedReceptionistTrainingFlow(input);
}

const trainingPrompt = ai.definePrompt({
  name: 'trainingPrompt',
  input: {schema: AutomatedReceptionistTrainingInputSchema},
  output: {schema: AutomatedReceptionistTrainingOutputSchema},
  prompt: `You are responsible for training the AI receptionist using the following chat logs:

  {{{chatLogs}}}

  Analyze the chat logs and identify areas where the AI receptionist can improve its responses. Focus on accuracy, politeness, and helpfulness.

  Provide a summary of the training results and any specific recommendations for improvement. Based on the chat logs, suggest additional information that should be provided to the receptionist, or changes to the receptionist's prompt.
  Be concise and to the point.
  `,config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const automatedReceptionistTrainingFlow = ai.defineFlow(
  {
    name: 'automatedReceptionistTrainingFlow',
    inputSchema: AutomatedReceptionistTrainingInputSchema,
    outputSchema: AutomatedReceptionistTrainingOutputSchema,
  },
  async input => {
    const {output} = await trainingPrompt(input);
    return output!;
  }
);
