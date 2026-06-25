"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/sidebar-store";
import { useAuthStore } from "@/store/auth-store";
import { navigationConfig, type SidebarNavGroup } from "@/config/navigation";

export function MobileNav() {
  const pathname = usePathname();
  const { isMobileOpen, setMobileOpen } = useSidebarStore();
  const { user } = useAuthStore();

  const role = user?.role ?? "driver";
  const navGroups: SidebarNavGroup[] = navigationConfig[role] ?? [];

  return (
    <AnimatePresence>
      {isMobileOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
          />
          {/* Panel */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 z-50 h-full w-72 border-r border-border-subtle bg-bg-card lg:hidden overflow-y-auto"
          >
            {/* Header */}
            <div className="flex h-16 items-center justify-between px-4 border-b border-border-subtle">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold text-text-primary">
                  SafeDrive<span className="text-primary">+</span>
                </span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-md text-text-muted hover:text-text-primary hover:bg-bg-elevated transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Nav */}
            <nav className="py-4 px-3 space-y-6">
              {navGroups.map((group) => (
                <div key={group.title}>
                  <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                    {group.title}
                  </p>
                  <div className="space-y-1">
                    {group.items.map((item) => {
                      const isActive = pathname === item.href;
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                            isActive
                              ? "bg-primary/10 text-primary"
                              : "text-text-secondary hover:text-text-primary hover:bg-bg-elevated"
                          )}
                        >
                          <Icon className={cn("h-[18px] w-[18px]", isActive ? "text-primary" : "text-text-muted")} />
                          <span>{item.title}</span>
                          {item.badge !== undefined && item.badge > 0 && (
                            <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-primary/20 px-1.5 text-[10px] font-bold text-primary">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
