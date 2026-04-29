import { Badge } from "@/components/ui/Badge";

export function StatusBadge({ status }: { status: string }) {
  const labels: Record<string, string> = {
    pending: "Pending",
    "in-progress": "In Progress",
    completed: "Completed",
  };

  return <Badge status={status}>{labels[status] || status}</Badge>;
}
