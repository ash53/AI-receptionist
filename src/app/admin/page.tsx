import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Calendar, ArrowRight, Phone, Ticket } from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Welcome, Admin!</CardTitle>
          <CardDescription>
            This is your dashboard to manage guest interactions, bookings, and support tickets.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            From here, you can review chat logs, see upcoming appointments, check call history, manage tickets, and help train the AI.
          </p>
        </CardContent>
      </Card>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Chat History</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15 New Chats</div>
            <p className="text-xs text-muted-foreground">
              +3 from last hour
            </p>
          </CardContent>
          <CardContent>
            <Button asChild>
              <Link href="/admin/chats">
                View Chats <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8 Booked Today</div>
            <p className="text-xs text-muted-foreground">
              +20% from yesterday
            </p>
          </CardContent>
          <CardContent>
             <Button asChild>
              <Link href="/admin/appointments">
                Manage Appointments <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Call Logs</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5 New Calls</div>
            <p className="text-xs text-muted-foreground">
              2 unresolved
            </p>
          </CardContent>
          <CardContent>
             <Button asChild>
              <Link href="/admin/calls">
                View Call Logs <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Support Tickets</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 Open Tickets</div>
            <p className="text-xs text-muted-foreground">
              1 new ticket today
            </p>
          </CardContent>
          <CardContent>
             <Button asChild>
              <Link href="/admin/tickets">
                Manage Tickets <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
