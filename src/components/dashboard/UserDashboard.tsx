"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import Link from "next/link";

interface Project {
  _id: string;
  name: string;
  service: string;
  status: string;
  description: string;
  createdAt: string;
}

export function UserDashboard() {
  const { data: session } = useSession();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects");
        if (res.ok) {
          const data = await res.json();
          setProjects(data);
        }
      } catch {
        // silent fail
      }
      setLoading(false);
    }
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="text-sm text-muted">Loading projects...</div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-sm text-muted">
        No projects submitted yet.{" "}
        <Link href="/request" className="text-text underline underline-offset-4">
          Start a project
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium mb-6">My Projects</h2>
      {projects.map((project) => (
        <div
          key={project._id}
          className="bg-surface border border-border p-5 transition-colors hover:border-white/20"
        >
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-sm font-medium">{project.name}</h3>
              <p className="text-xs text-muted mt-0.5">{project.service}</p>
            </div>
            <StatusBadge status={project.status} />
          </div>
          <p className="text-xs text-muted/70 mt-3 line-clamp-2">
            {project.description}
          </p>
          <p className="text-xs text-muted/40 mt-3">
            {new Date(project.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
      ))}
    </div>
  );
}
