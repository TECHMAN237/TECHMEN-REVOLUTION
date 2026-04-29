"use client";

import { SessionProvider, useSession } from "next-auth/react";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SessionWatcher />
      {children}
    </SessionProvider>
  );
}

// Hidden component that manages loading state
function SessionWatcher() {
  const { status } = useSession();

  return (
    <div
      className="loading-screen"
      style={{ display: status === "loading" ? "flex" : "none" }}
    />
  );
}
