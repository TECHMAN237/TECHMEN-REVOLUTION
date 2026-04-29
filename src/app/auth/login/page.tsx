"use client";

import { PageTransition } from "@/components/layout/PageTransition";
import { LoginForm } from "@/components/auth/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <PageTransition>
      <div className="min-h-[80vh] flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="text-xs tracking-[0.2em] uppercase text-muted mb-8 text-center">
            Sign In
          </div>
          <LoginForm />
        </div>
      </div>
    </PageTransition>
  );
}
