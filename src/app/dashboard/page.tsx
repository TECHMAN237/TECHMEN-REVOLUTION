"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { UserDashboard } from "@/components/dashboard/UserDashboard";
import { AdminDashboard } from "@/components/dashboard/AdminDashboard";
import { useSearchParams } from "next/navigation";

export default function DashboardPage() {
  const { status, data: session } = useSession();
  const searchParams = useSearchParams();
  const view = searchParams.get("view");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      window.location.href = "/auth/login?callbackUrl=/dashboard";
      return;
    }
    setLoading(false);
  }, [status]);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <p className="text-sm text-muted">Loading...</p>
      </div>
    );
  }

  const isAdmin = (session?.user as any)?.role === "admin";
  const showAdmin = isAdmin && view === "admin";

  return (
    <div className="min-h-[calc(100vh-4rem)] flex">
      <div className="flex-1 p-6 md:p-10">
        {showAdmin ? <AdminDashboard /> : <UserDashboard />}
      </div>
    </div>
  );
}
