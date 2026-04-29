"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function SignupForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      setError("");

      const formData = new FormData(e.currentTarget);
      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        if (!res.ok) {
          const data = await res.json();
          setError(data.message || "Signup failed");
          setLoading(false);
          return;
        }

        // Auto sign in after signup
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (result?.error) {
          setError("Account created. Please sign in.");
          setLoading(false);
          router.push("/auth/login");
          return;
        }

        router.push("/dashboard");
        router.refresh();
      } catch {
        setError("Something went wrong");
        setLoading(false);
      }
    },
    [router]
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          name="name"
          type="text"
          placeholder="Full Name"
          required
          autoComplete="name"
        />
      </div>
      <div>
        <Input
          name="email"
          type="email"
          placeholder="Email"
          required
          autoComplete="email"
        />
      </div>
      <div>
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
          autoComplete="new-password"
          minLength={6}
        />
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <Button type="submit" variant="primary" className="w-full" disabled={loading}>
        {loading ? "Creating account..." : "Create Account"}
      </Button>

      <p className="text-xs text-muted text-center mt-6">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-text underline underline-offset-4 hover:no-underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
