"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function DashboardSidebar() {
  const { data: session } = useSession();
  const role = (session?.user as any)?.role;

  return (
    <aside className="w-full md:w-56 border-b md:border-b-0 md:border-r border-white/[0.06] p-6 md:min-h-[calc(100vh-4rem)]">
      <div className="text-xs tracking-[0.2em] uppercase text-muted mb-8">
        Dashboard
      </div>
      <nav className="space-y-4 mb-8">
        <Link
          href="/dashboard"
          className="block text-sm text-text hover:text-muted transition-colors"
        >
          My Projects
        </Link>
        {role === "admin" && (
          <>
            <Link
              href="/dashboard?view=admin"
              className="block text-sm text-text hover:text-muted transition-colors"
            >
              All Requests
            </Link>
          </>
        )}
      </nav>
      <div className="pt-6 border-t border-white/[0.06]">
        <p className="text-xs text-muted mb-3">{session?.user?.name}</p>
        <Button
          variant="ghost"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="text-xs px-0 h-auto"
        >
          Sign Out
        </Button>
      </div>
    </aside>
  );
}
