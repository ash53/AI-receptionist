import {NextRequest, NextResponse} from 'next/server';
import {VoiceResponse} from 'twilio/lib/twiml/VoiceResponse';
import {hotelReceptionist} from '@/ai/flows/hotel-receptionist-flow';

export const config = {
  runtime: 'edge',
};

// This webhook handles the user's speech input from the initial call.
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const speechResult = formData.get('SpeechResult') as string;

  const twiml = new VoiceResponse();

  try {
    // Call the AI flow with the user's speech
    const aiResponse = await hotelReceptionist({
      question: speechResult,
      chatHistory: `User said: ${speechResult}`, // Keep it simple for now
    });

    twiml.say(
      {
        voice: 'Polly.Joanna-Neural',
      },
      aiResponse.answer
    );

    // TODO: Handle booking, ticket creation, etc. based on aiResponse flags

    // Listen for the next user input
    twiml.gather({
      input: ['speech'],
      action: '/api/twilio/response', // Loop back to this endpoint
      speechTimeout: 'auto',
    });

    // If the user doesn't say anything, end the call.
    twiml.say('We did not receive any input. Goodbye!');
    
  } catch (error) {
    console.error('Error processing Twilio response:', error);
    twiml.say('My apologies, I seem to be having some technical difficulties. Please try again later.');
    twiml.hangup();
  }

  // Return the TwiML response to Twilio.
  return new NextResponse(twiml.toString(), {
    headers: {
      'Content-Type': 'text/xml',
    },
  });
}
