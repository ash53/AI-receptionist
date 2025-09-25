'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { Message } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ReceptionistIcon } from '@/components/icons';
import { Send, Bot, User, Calendar, BrainCircuit } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI Receptionist. How can I help you today? You can ask me about our services, pricing, or book an appointment.",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
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

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      let aiResponseText = "I'm sorry, I didn't quite understand that. Could you please rephrase?";
      const buttons = [];

      if (input.toLowerCase().includes('book') || input.toLowerCase().includes('appointment')) {
        aiResponseText = "Of course! I can help you book an appointment. Please click the button below to go to our booking page.";
        buttons.push({ text: 'Book an Appointment', link: '/book' });
      } else if (input.toLowerCase().includes('service')) {
        aiResponseText = "We offer a wide range of services to meet your needs. What specific service are you interested in?";
      } else if (input.toLowerCase().includes('pricing')) {
        aiResponseText = "Our pricing is competitive. A standard consultation is $50. For other services, could you specify what you're looking for?";
      } else if (input.toLowerCase().includes('hello') || input.toLowerCase().includes('hi')) {
        aiResponseText = "Hello there! How can I assist you today?";
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponseText,
        sender: 'ai',
        timestamp: new Date(),
        buttons: buttons,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-2xl h-full flex flex-col shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between border-b">
           <div className="flex items-center space-x-4">
            <Bot className="h-8 w-8 text-primary" />
            <div>
              <CardTitle className="text-xl font-headline">AI Receptionist</CardTitle>
              <p className="text-sm text-muted-foreground">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
                <Link href="/book"><Calendar /><span className="sr-only">Book</span></Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
                <Link href="/admin"><BrainCircuit /><span className="sr-only">Admin</span></Link>
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
                        <ReceptionistIcon className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div className="max-w-xs md:max-w-md lg:max-w-lg">
                    <div
                      className={cn(
                        'rounded-2xl p-3 text-sm',
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground rounded-br-none'
                          : 'bg-secondary text-secondary-foreground rounded-bl-none'
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
                      <AvatarFallback className="bg-accent text-accent-foreground">
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
                        <ReceptionistIcon className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="max-w-xs md:max-w-md lg:max-w-lg">
                      <div className="rounded-2xl p-3 text-sm bg-secondary text-secondary-foreground rounded-bl-none">
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
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
