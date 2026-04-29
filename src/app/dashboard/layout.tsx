import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { PageTransition } from "@/components/layout/PageTransition";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageTransition>
      <div className="flex flex-col md:flex-row">
        <DashboardSidebar />
        {children}
      </div>
    </PageTransition>
  );
}
