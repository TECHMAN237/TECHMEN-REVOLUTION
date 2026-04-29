"use client";

import { useEffect, useState } from "react";
import { StatusBadge } from "@/components/dashboard/StatusBadge";

interface Project {
  _id: string;
  name: string;
  email: string;
  service: string;
  status: string;
  description: string;
  createdAt: string;
}

export function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch {
      // silent
    }
    setLoading(false);
  }

  async function updateStatus(id: string, newStatus: string) {
    try {
      const res = await fetch(`/api/projects?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        fetchProjects();
      }
    } catch {
      // silent
    }
  }

  const filtered =
    filter === "all"
      ? projects
      : projects.filter((p) => p.status === filter);

  if (loading) return <div className="text-sm text-muted">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">All Project Requests</h2>
        <div className="flex gap-2">
          {["all", "pending", "in-progress", "completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs px-3 py-1.5 border transition-colors ${
                filter === f
                  ? "text-text border-white/30 bg-white/5"
                  : "text-muted border-transparent hover:text-text"
              }`}
            >
              {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-muted">No projects found.</p>
      ) : (
        <div className="space-y-3">
          {filtered.map((project) => (
            <div
              key={project._id}
              className="bg-surface border border-border p-5 transition-colors hover:border-white/20"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-sm font-medium">{project.name}</h3>
                  <p className="text-xs text-muted mt-0.5">
                    {project.email} &middot; {project.service}
                  </p>
                </div>
                <StatusBadge status={project.status} />
              </div>
              <p className="text-xs text-muted/70 mb-3 line-clamp-2">
                {project.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted/40">
                  {new Date(project.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <select
                  value={project.status}
                  onChange={(e) => updateStatus(project._id, e.target.value)}
                  className="text-xs bg-bg border border-border text-text px-2 py-1 outline-none cursor-pointer"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
