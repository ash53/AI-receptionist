import {NextRequest, NextResponse} from 'next/server';
import {VoiceResponse} from 'twilio/lib/twiml/VoiceResponse';

export const config = {
  runtime: 'edge',
};

// This is your new Twilio voice webhook.
// Twilio will make a POST request to this route when a call is received.
export async function POST(req: NextRequest) {
  const twiml = new VoiceResponse();

  // For now, let's just greet the caller.
  twiml.say(
    {
      voice: 'Polly.Joanna-Neural',
    },
    'Welcome to the Hotel Concierge. How can I help you today?'
  );

  // We'll use <Gather> to listen for the user's speech.
  // The 'action' URL is where Twilio will send the transcribed text.
  // We will implement that in the next step.
  twiml.gather({
    input: ['speech'],
    action: '/api/twilio/response',
    speechTimeout: 'auto',
  });

  // If the user doesn't say anything, we can loop or hang up.
  twiml.say('We did not receive any input. Goodbye!');

  // Return the TwiML response.
  return new NextResponse(twiml.toString(), {
    headers: {
      'Content-Type': 'text/xml',
    },
  });
}
