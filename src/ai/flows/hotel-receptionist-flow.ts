'use server';
/**
 * @fileOverview A Hotel AI Receptionist flow that answers guest questions.
 *
 * - hotelReceptionist - A function that handles guest inquiries.
 * - HotelReceptionistInput - The input type for the hotelReceptionist function.
 * - HotelReceptionistOutput - The return type for the hotelReceptionist function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const HotelReceptionistInputSchema = z.object({
  question: z.string().describe('The guest\'s question.'),
  chatHistory: z.string().describe('The history of the conversation so far.')
});
export type HotelReceptionistInput = z.infer<typeof HotelReceptionistInputSchema>;

const HotelReceptionistOutputSchema = z.object({
  answer: z.string().describe('The AI\'s answer to the guest\'s question.'),
  shouldBook: z.boolean().describe('Whether the user is expressing intent to book a room.'),
});
export type HotelReceptionistOutput = z.infer<typeof HotelReceptionistOutputSchema>;

export async function hotelReceptionist(input: HotelReceptionistInput): Promise<HotelReceptionistOutput> {
  return hotelReceptionistFlow(input);
}

const prompt = ai.definePrompt({
  name: 'hotelReceptionistPrompt',
  input: { schema: HotelReceptionistInputSchema },
  output: { schema: HotelReceptionistOutputSchema },
  prompt: `You are a friendly and helpful AI receptionist for an elegant hotel. Your goal is to assist guests with their questions.

  Here is the conversation history:
  {{{chatHistory}}}
  
  Here is the guest's latest question:
  "{{{question}}}"

  - Answer the guest's question concisely and politely.
  - If the guest indicates they want to book a room, make a reservation, or check availability, set the 'shouldBook' flag to true in your response. Do not ask them for booking details, just set the flag.
  - Keep your answers brief and to the point.
  - Do not answer questions that are not related to the hotel.
  `,
  config: {
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

const hotelReceptionistFlow = ai.defineFlow(
  {
    name: 'hotelReceptionistFlow',
    inputSchema: HotelReceptionistInputSchema,
    outputSchema: HotelReceptionistOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
