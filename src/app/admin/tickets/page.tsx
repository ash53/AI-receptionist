"use client";

import type { SupportTicket } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

const mockTickets: SupportTicket[] = [
  {
    id: "ticket-1",
    source: "chat",
    customerName: "Bob",
    customerContact: "ID: user-2",
    issue: "User was asking about something not on the FAQ and the AI could not find an answer.",
    status: "open",
    createdAt: new Date(Date.now() - 3600000 * 1),
    chatId: "chat-2",
  },
  {
    id: "ticket-2",
    source: "call",
    customerName: "Unknown Caller",
    customerContact: "+14155552672",
    issue: "User had a problem with their room and requested a manager.",
    status: "open",
    createdAt: new Date(Date.now() - 3600000 * 3.9),
    callId: "call-2",
  },
  {
    id: "ticket-4",
    source: "call",
    customerName: "Unknown Caller",
    customerContact: "+14155552678",
    issue: "User wants to know if they can bring their pet tiger. The AI was not sure how to answer.",
    status: "open",
    createdAt: new Date(Date.now() - 3600000 * 0.5),
    callId: "call-4",
  },
  {
    id: "ticket-3",
    source: 'chat',
    customerName: 'Eve',
    customerContact: 'ID: user-3',
    issue: 'The user was repeatedly asking to speak to a human.',
    status: 'resolved',
    createdAt: new Date(Date.now() - 3600000 * 24),
    chatId: 'chat-3'
  }
];

export default function AdminTicketsPage() {
    // In a real app, this would be a server action to update Firestore
    const handleResolve = (ticketId: string) => {
        alert(`Resolving ticket ${ticketId}. This would update its status in Firestore.`);
    };

    return (
        <Card>
        <CardHeader>
            <CardTitle>Support Tickets</CardTitle>
            <CardDescription>Manage and resolve guest support tickets.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Issue</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mockTickets.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).map((ticket) => (
                        <TableRow key={ticket.id}>
                            <TableCell>
                                <div className="font-medium">{ticket.customerName}</div>
                                <div className="text-sm text-muted-foreground">{ticket.customerContact}</div>
                            </TableCell>
                            <TableCell>
                                <Badge variant="secondary">{ticket.source}</Badge>
                            </TableCell>
                            <TableCell className="max-w-[400px] truncate">{ticket.issue}</TableCell>
                            <TableCell>{format(ticket.createdAt, "PPP p")}</TableCell>
                            <TableCell>
                                <Badge variant={ticket.status === 'open' ? 'destructive' : 'default'}>
                                    {ticket.status}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                {ticket.status === 'open' && (
                                    <Button size="sm" onClick={() => handleResolve(ticket.id)}>Mark as Resolved</Button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
        </Card>
    );
}
