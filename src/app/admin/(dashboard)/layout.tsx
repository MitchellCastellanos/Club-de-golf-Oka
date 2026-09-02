import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen grid-cols-1 bg-[#EEF0E9] md:grid-cols-[236px_1fr]">
      <AdminSidebar />
      <div className="min-w-0">{children}</div>
    </div>
  );
}
