import { LoginForm } from "@/components/admin/login-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building } from "lucide-react";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 bg-primary text-primary-foreground rounded-full p-3 w-fit">
            <Building className="h-8 w-8" />
          </div>
          <CardTitle className="text-2xl font-headline">Hotel Staff Access</CardTitle>
          <CardDescription>Sign in to manage bookings and guest chats.</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
