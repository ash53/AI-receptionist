'use server';
/**
 * @fileOverview Summarizes chat logs for admins to quickly understand user inquiries and receptionist responses.
 *
 * - summarizeChatLog - A function that summarizes a chat log.
 * - SummarizeChatLogInput - The input type for the summarizeChatLog function.
 * - SummarizeChatLogOutput - The return type for the summarizeChatLog function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeChatLogInputSchema = z.object({
  chatLog: z.string().describe('The complete chat log as a single string.'),
});
export type SummarizeChatLogInput = z.infer<typeof SummarizeChatLogInputSchema>;

const SummarizeChatLogOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the chat log.'),
});
export type SummarizeChatLogOutput = z.infer<typeof SummarizeChatLogOutputSchema>;

export async function summarizeChatLog(input: SummarizeChatLogInput): Promise<SummarizeChatLogOutput> {
  return summarizeChatLogFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeChatLogPrompt',
  input: {schema: SummarizeChatLogInputSchema},
  output: {schema: SummarizeChatLogOutputSchema},
  prompt: `You are an AI assistant that summarizes chat logs between a receptionist and a customer.

  Given the following chat log, provide a concise summary of the user's inquiry and the receptionist's response.

  Chat Log:
  {{chatLog}}

  Summary: `,
});

const summarizeChatLogFlow = ai.defineFlow(
  {
    name: 'summarizeChatLogFlow',
    inputSchema: SummarizeChatLogInputSchema,
    outputSchema: SummarizeChatLogOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
