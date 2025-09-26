import type { Call } from "@/lib/types";
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

const mockCalls: Call[] = [
  {
    id: "call-1",
    from: "+14155552671",
    startTime: new Date(Date.now() - 3600000 * 2),
    endTime: new Date(Date.now() - 3600000 * 1.9),
    transcript: "User: Hi, I'd like to know about your pet policy. AI: We are a pet-friendly hotel! A small fee of $50 per stay applies.",
    summary: "User asked about the pet policy.",
    status: "completed",
  },
  {
    id: "call-2",
    from: "+14155552672",
    startTime: new Date(Date.now() - 3600000 * 4),
    endTime: new Date(Date.now() - 3600000 * 3.8),
    transcript: "User: I need to speak to a manager about a problem with my room. AI: I understand. I am creating a support ticket for you, and a manager will contact you shortly.",
    summary: "User had a problem with their room and requested a manager.",
    status: "unresolved",
  },
];

export default function AdminCallsPage() {
    return (
        <Card>
        <CardHeader>
            <CardTitle>Call Logs</CardTitle>
            <CardDescription>Review recent voice calls with guests.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Caller</TableHead>
                        <TableHead>Summary</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mockCalls.map((call) => (
                        <TableRow key={call.id}>
                            <TableCell>
                                <div className="font-medium">{call.from}</div>
                            </TableCell>
                            <TableCell>{call.summary}</TableCell>
                            <TableCell>
                                {format(call.startTime, "PPP p")}
                            </TableCell>
                            <TableCell>
                                <Badge variant={call.status === "unresolved" ? "destructive" : "default"}>
                                    {call.status}
                                </Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
        </Card>
    );
}
