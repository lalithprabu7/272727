"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { Navbar } from "@/components/layout/navbar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { CommandPalette } from "@/components/shared/command-palette";
import { useSidebarStore } from "@/store/sidebar-store";
import { useHasMounted } from "@/hooks/use-has-mounted";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isCollapsed: storeCollapsed } = useSidebarStore();
  const mounted = useHasMounted();

  const isCollapsed = mounted ? storeCollapsed : false;
  const sidebarWidth = isCollapsed ? "72px" : "280px";

  return (
    <div className="min-h-screen bg-bg-root gradient-mesh">
      <Sidebar />
      <MobileNav />
      <CommandPalette />
      <main
        style={{
          "--sidebar-width": sidebarWidth,
        } as React.CSSProperties}
        className="min-h-screen transition-all duration-300 pl-0 lg:pl-[var(--sidebar-width)]"
      >
        <Navbar />
        <div className="mx-auto max-w-7xl w-full p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
