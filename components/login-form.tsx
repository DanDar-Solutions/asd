"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const [tab, setTab] = useState<"school" | "registry">("school"); // active tab
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      let valid = false;

      if (tab === "school") {
        if (/^[\w.-]+@[\w.-]+\.(edu|gmail\.com)$/.test(identifier) && password.length > 0) {
          valid = true;
        }
      } else {
        if (/^\d+$/.test(identifier) && /^\d{4}\/\d{2}\/\d{2}$/.test(password)) {
          valid = true;
        }
      }

      if (!valid) throw new Error("Invalid credentials");
      document.cookie = `user=${identifier}; path=/; max-age=86400`;
      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Select how you want to login</CardDescription>
          <div className="mt-4 flex border-b border-gray-200">
            <button
              type="button"
              onClick={() => setTab("school")}
              className={cn(
                "px-4 py-2 -mb-px font-medium",
                tab === "school" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"
              )}
            >
              School Email
            </button>
            <button
              type="button"
              onClick={() => setTab("registry")}
              className={cn(
                "px-4 py-2 -mb-px font-medium",
                tab === "registry" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"
              )}
            >
              Registry ID
            </button>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="identifier">
                  {tab === "school" ? "Email" : "Registry ID"}
                </Label>
                <Input
                  id="identifier"
                  type="text"
                  placeholder={tab === "school" ? "you@school.edu" : "123456789"}
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">
                  {tab === "school" ? "Password" : "Birthdate (YYYY/MM/DD)"}
                </Label>
                <Input
                  id="password"
                  type="text"
                  placeholder={tab === "school" ? "Your password" : "YYYY/MM/DD"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}