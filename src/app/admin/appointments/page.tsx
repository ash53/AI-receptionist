import type { Booking } from "@/lib/types";
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

const mockBookings: Booking[] = [
  {
    id: "booking-1",
    name: "Alice",
    email: "alice@example.com",
    phone: "123-456-7890",
    date: new Date(new Date().setDate(new Date().getDate() + 1)),
    time: "10:00 AM",
    createdAt: new Date(),
  },
  {
    id: "booking-2",
    name: "Charles",
    email: "charles@example.com",
    phone: "234-567-8901",
    date: new Date(new Date().setDate(new Date().getDate() + 1)),
    time: "02:30 PM",
    createdAt: new Date(Date.now() - 3600000 * 5),
  },
  {
    id: "booking-3",
    name: "Diana",
    email: "diana@example.com",
    phone: "345-678-9012",
    date: new Date(new Date().setDate(new Date().getDate() + 2)),
    time: "11:00 AM",
    createdAt: new Date(Date.now() - 3600000 * 24),
  },
];


export default function AdminAppointmentsPage() {
    return (
        <Card>
        <CardHeader>
            <CardTitle>Appointments</CardTitle>
            <CardDescription>View and manage upcoming appointments.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Appointment</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Booked On</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mockBookings.map((booking) => (
                        <TableRow key={booking.id}>
                            <TableCell>
                                <div className="font-medium">{booking.name}</div>
                                <div className="text-sm text-muted-foreground">{booking.email}</div>
                                <div className="text-sm text-muted-foreground">{booking.phone}</div>
                            </TableCell>
                            <TableCell>
                                <div>{format(booking.date, "PPP")}</div>
                                <div className="text-muted-foreground">{booking.time}</div>
                            </TableCell>
                            <TableCell>
                                <Badge variant={new Date() > booking.date ? "destructive" : "default"}>
                                    {new Date() > booking.date ? 'Past' : 'Upcoming'}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                {format(booking.createdAt, "PPP")}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
        </Card>
    );
}
