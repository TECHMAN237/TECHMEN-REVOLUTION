"use client";

import { PageTransition } from "@/components/layout/PageTransition";
import { SignupForm } from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <PageTransition>
      <div className="min-h-[80vh] flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="text-xs tracking-[0.2em] uppercase text-muted mb-8 text-center">
            Create Account
          </div>
          <SignupForm />
        </div>
      </div>
    </PageTransition>
  );
}
