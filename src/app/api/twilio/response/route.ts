import {NextRequest, NextResponse} from 'next/server';
import {VoiceResponse} from 'twilio/lib/twiml/VoiceResponse';
import {hotelReceptionist} from '@/ai/flows/hotel-receptionist-flow';

export const config = {
  runtime: 'edge',
};

// This webhook handles the user's speech input from the call.
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const speechResult = (formData.get('SpeechResult') as string) || '...';
  const callSid = formData.get('CallSid') as string;
  const from = formData.get('From') as string;

  const twiml = new VoiceResponse();

  try {
    // In a real app, you'd retrieve conversation history from a database using the callSid
    const fakeHistory = `User said: ${speechResult}`;
    const aiResponse = await hotelReceptionist({
      question: speechResult,
      chatHistory: fakeHistory,
    });

    twiml.say(
      {
        voice: 'Polly.Joanna-Neural',
      },
      aiResponse.answer
    );

    if (aiResponse.shouldBook) {
      twiml.say(
        {
          voice: 'Polly.Joanna-Neural',
        },
        'I am sending a link to your phone now to complete the booking.'
      );
      // In a real application, you would uncomment the following lines
      // and use a separate function or webhook to send an SMS via Twilio's API,
      // as making API calls from this response can be complex.
      // twilio.messages.create({
      //   body: 'Here is your link to book a room: https://your-hotel-app.com/book',
      //   from: process.env.TWILIO_PHONE_NUMBER,
      //   to: from,
      // });
      twiml.hangup();
    } else if (aiResponse.shouldCreateTicket) {
      twiml.say(
        {
          voice: 'Polly.Joanna-Neural',
        },
        'A support ticket has been created, and a member of our staff will get back to you shortly.'
      );
      // In a real application, you would save this ticket to Firestore.
      console.log(`Creating ticket for ${from}: ${aiResponse.ticketIssue}`);
      twiml.hangup();
    } else {
      // If no other action, continue the conversation
      twiml.gather({
        input: ['speech'],
        action: '/api/twilio/response',
        speechTimeout: 'auto',
      });

      // If the user doesn't say anything, end the call.
      twiml.say('We did not receive any input. Goodbye!');
      twiml.hangup();
    }
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
