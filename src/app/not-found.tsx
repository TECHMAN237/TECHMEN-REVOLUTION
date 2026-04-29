"use client";

import Link from "next/link";
import { PageTransition } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <PageTransition>
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl font-light text-white/[0.06] tracking-tighter">404</div>
          <h1 className="text-xl font-medium mt-4 mb-2">Page Not Found</h1>
          <p className="text-muted text-sm mb-8">
            The page you are looking for does not exist.
          </p>
          <Link href="/">
            <Button variant="outline">Return Home</Button>
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}
