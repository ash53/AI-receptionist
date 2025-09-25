'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { Message } from '@/lib/types';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { hotelReceptionist } from '@/ai/flows/hotel-receptionist-flow';
import { Send, Bot, User, Calendar, BrainCircuit, Building } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const faq: Record<string, string> = {
    'check-in': 'Check-in time is at 3:00 PM.',
    'check out': 'Check-out time is at 11:00 AM.',
    'breakfast': 'Breakfast is served from 7:00 AM to 10:00 AM in our main restaurant.',
    'restaurant': 'Our restaurant is open for dinner from 6:00 PM to 10:00 PM. We recommend making a reservation.',
    'wifi': 'Yes, we offer complimentary high-speed WiFi for all our guests. You can connect to the "HotelGuest" network with the password "welcome123".',
    'amenities': 'We have a fitness center, a swimming pool, and a full-service spa. All are available for guest use.',
    'parking': 'We offer complimentary valet parking for all our guests.',
    'pet': 'We are a pet-friendly hotel! A small fee of $50 per stay applies.',
    'location': 'We are located at 123 Luxury Lane, in the heart of the city.',
    'directions': 'You can find us easily by searching for "Grand Hotel" on your favorite map application. We are right next to the City Museum.'
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Welcome to our hotel! I'm your AI concierge. How may I assist you with your stay? You can ask about our amenities, book a room, and more.",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    let aiResponseText = "I'm sorry, I didn't quite understand that. Could you please rephrase?";
    let buttons = [];

    // FAQ Check
    const lowerCaseInput = currentInput.toLowerCase();
    const faqMatch = Object.keys(faq).find(key => lowerCaseInput.includes(key));

    if (faqMatch) {
      aiResponseText = faq[faqMatch];
    } else {
      try {
        const chatHistory = newMessages.map(m => `${m.sender}: ${m.text}`).join('\n');
        const aiResponse = await hotelReceptionist({ question: currentInput, chatHistory });
        aiResponseText = aiResponse.answer;
        if (aiResponse.shouldBook) {
            buttons.push({ text: 'Book a Room', link: '/book' });
        }
      } catch (error) {
        console.error('AI response error:', error);
        toast({
            variant: 'destructive',
            title: 'AI Error',
            description: 'There was an issue connecting to the AI service.'
        });
        aiResponseText = "My apologies, I'm having trouble connecting to my knowledge base at the moment. Please try again shortly."
      }
    }

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: aiResponseText,
      sender: 'ai',
      timestamp: new Date(),
      buttons: buttons.length > 0 ? buttons : undefined,
    };

    setMessages((prev) => [...prev, aiMessage]);
    setIsLoading(false);
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-2xl h-full flex flex-col shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between border-b">
           <div className="flex items-center space-x-4">
            <Avatar>
                <AvatarFallback className="bg-primary text-primary-foreground">
                    <Building className="h-5 w-5" />
                </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl font-headline">Hotel Concierge</CardTitle>
              <p className="text-sm text-muted-foreground">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
                <Link href="/book"><Calendar /><span className="sr-only">Book a Room</span></Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
                <Link href="/admin"><BrainCircuit /><span className="sr-only">Admin Panel</span></Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden p-0">
          <ScrollArea className="h-full" ref={scrollAreaRef}>
            <div className="p-6 space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'flex items-end gap-3',
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.sender === 'ai' && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Building className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div className="max-w-xs md:max-w-md lg:max-w-lg">
                    <div
                      className={cn(
                        'rounded-2xl p-3 text-sm',
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground rounded-br-none'
                          : 'bg-muted text-muted-foreground rounded-bl-none'
                      )}
                    >
                      <p>{message.text}</p>
                    </div>
                    {message.buttons && message.buttons.length > 0 && (
                      <div className="mt-2 flex flex-col space-y-2 items-start">
                        {message.buttons.map((button, index) => (
                          <Button key={index} size="sm" variant="outline" onClick={() => router.push(button.link)}>
                            {button.text}
                          </Button>
                        ))}
                      </div>
                    )}
                    <p className={cn(
                      'mt-1 text-xs text-muted-foreground',
                      message.sender === 'user' ? 'text-right' : 'text-left'
                    )}>
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {message.sender === 'user' && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-secondary text-secondary-foreground">
                        <User className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isLoading && (
                 <div className="flex items-end gap-3 justify-start">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Building className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="max-w-xs md:max-w-md lg:max-w-lg">
                      <div className="rounded-2xl p-3 text-sm bg-muted text-muted-foreground rounded-bl-none">
                         <div className="flex items-center space-x-2">
                           <span className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse delay-0"></span>
                           <span className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse delay-150"></span>
                           <span className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse delay-300"></span>
                         </div>
                      </div>
                    </div>
                 </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
            <Input
              type="text"
              placeholder="Ask about your stay..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send Message</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
