import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RegisterForm, signUp } from "@/features/auth";

export default function RegisterPage() {




  return (
    <div className="flex min-h-[calc(100vh-14rem)] items-center justify-center">
      <Card className="w-full max-w-sm border-0 bg-transparent shadow-none ring-0">
        <CardHeader className="space-y-1.5 px-0 text-center sm:text-left">
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Create an account
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4 px-0">
          <RegisterForm action={signUp} />

        </CardContent>

        <CardFooter className="flex justify-center border-t-0 bg-transparent px-0 pt-2 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="ml-1 font-medium text-foreground underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
