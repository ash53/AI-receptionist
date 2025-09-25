"use client";

import { useState } from "react";
import type { Chat, Message } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";

const mockChats: Chat[] = [
  {
    id: "chat-1",
    user: { id: "user-1", name: "Alice" },
    startTime: new Date(Date.now() - 3600000 * 1),
    endTime: new Date(Date.now() - 3600000 * 0.9),
    summary: "Inquired about service pricing and booked an appointment.",
    messages: [
        { id: "1-1", text: "Hi, what are your prices?", sender: 'user', timestamp: new Date(Date.now() - 3600000 * 1) },
        { id: "1-2", text: "Hello! Our standard consultation is $50. What service are you interested in?", sender: 'ai', timestamp: new Date(Date.now() - 3600000 * 0.99) },
        { id: "1-3", text: "The basic one. Can I book for tomorrow?", sender: 'user', timestamp: new Date(Date.now() - 3600000 * 0.95) },
        { id: "1-4", text: "Of course! I can help you book an appointment.", sender: 'ai', timestamp: new Date(Date.now() - 3600000 * 0.9), buttons: [{text: 'Book Now', link: '/book'}] },
    ],
  },
  {
    id: "chat-2",
    user: { id: "user-2", name: "Bob" },
    startTime: new Date(Date.now() - 3600000 * 3),
    endTime: new Date(Date.now() - 3600000 * 2.8),
    summary: "Asked about opening hours.",
    messages: [
        { id: "2-1", text: "When are you open?", sender: 'user', timestamp: new Date(Date.now() - 3600000 * 3) },
        { id: "2-2", text: "We are open from 9 AM to 5 PM, Monday to Friday.", sender: 'ai', timestamp: new Date(Date.now() - 3600000 * 2.8) },
    ]
  },
];


export default function AdminChatsPage() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chat History</CardTitle>
        <CardDescription>Review recent conversations with users.</CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Summary</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockChats.map((chat) => (
                <TableRow key={chat.id}>
                  <TableCell>
                    <div className="font-medium">{chat.user.name}</div>
                    <div className="text-sm text-muted-foreground">ID: {chat.user.id}</div>
                  </TableCell>
                  <TableCell>{chat.summary}</TableCell>
                  <TableCell>{format(chat.startTime, "PPP p")}</TableCell>
                  <TableCell className="text-right">
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedChat(chat)}>
                        View Log
                      </Button>
                    </DialogTrigger>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {selectedChat && (
             <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle>Chat with {selectedChat.user.name}</DialogTitle>
                  <DialogDescription>
                    {format(selectedChat.startTime, "PPP p")}
                  </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                  <div className="space-y-4">
                  {selectedChat.messages.map((message: Message) => (
                      <div key={message.id}>
                          <Badge variant={message.sender === 'ai' ? 'default' : 'secondary'}>{message.sender}</Badge>
                          <p className="mt-1 text-sm">{message.text}</p>
                          <p className="text-xs text-muted-foreground mt-1">{format(message.timestamp, 'p')}</p>
                      </div>
                  ))}
                  </div>
                </ScrollArea>
            </DialogContent>
          )}

        </Dialog>
      </CardContent>
    </Card>
  );
}
