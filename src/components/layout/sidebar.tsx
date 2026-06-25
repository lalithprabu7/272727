"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronLeft,
  Search,
  Shield,
  LogOut,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/sidebar-store";
import { useAuthStore } from "@/store/auth-store";
import { navigationConfig, type SidebarNavGroup } from "@/config/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { useHasMounted } from "@/hooks/use-has-mounted";

export function Sidebar() {
  const pathname = usePathname();
  const { isCollapsed: storeCollapsed, toggle } = useSidebarStore();
  const { user, logout } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  const mounted = useHasMounted();

  const isCollapsed = mounted ? storeCollapsed : false;

  const role = user?.role ?? "driver";
  const navGroups: SidebarNavGroup[] = navigationConfig[role] ?? [];

  const filteredGroups = searchQuery
    ? navGroups
        .map((group) => ({
          ...group,
          items: group.items.filter((item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
          ),
        }))
        .filter((group) => group.items.length > 0)
    : navGroups;

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 72 : 280 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed left-0 top-0 z-40 hidden h-screen flex-col border-r border-border-subtle bg-bg-card/80 backdrop-blur-xl lg:flex"
    >
      {/* Floating Toggle Button on Border */}
      <button
        onClick={toggle}
        className="absolute -right-3 top-5 z-50 flex h-6 w-6 items-center justify-center rounded-full border border-border-subtle bg-bg-elevated text-text-muted hover:text-text-primary shadow-md hover:scale-110 transition-all cursor-pointer"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <ChevronLeft
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-300",
            isCollapsed && "rotate-180"
          )}
        />
      </button>

      {/* Logo */}
      <div
        className={cn(
          "flex h-16 items-center border-b border-border-subtle transition-all duration-300",
          isCollapsed ? "justify-center px-0" : "px-7"
        )}
      >
        <Link href="/" className="flex items-center gap-3 overflow-hidden shrink-0">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg gradient-primary">
            <Shield className="h-5 w-5 text-white" />
          </div>
          {!isCollapsed && (
            <span className="text-lg font-bold text-text-primary whitespace-nowrap">
              SafeDrive<span className="text-primary">+</span>
            </span>
          )}
        </Link>
      </div>

      {/* Search */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="px-4 pt-4"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 w-full rounded-lg border border-border-default bg-bg-elevated pl-9 pr-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary transition-all"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav
        className={cn(
          "flex-1 overflow-y-auto py-4 space-y-6 scrollbar-thin transition-all duration-300",
          isCollapsed ? "px-2 space-y-3" : "px-4 space-y-6"
        )}
      >
        {filteredGroups.map((group) => (
          <div
            key={group.title}
            className={cn("transition-all duration-300", isCollapsed ? "space-y-3" : "space-y-1")}
          >
            {!isCollapsed && (
              <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                {group.title}
              </p>
            )}
            <div className={cn("transition-all duration-300", isCollapsed ? "space-y-3" : "space-y-1")}>
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={isCollapsed ? item.title : undefined}
                    className={cn(
                      "group relative flex items-center rounded-lg transition-all duration-200",
                      isCollapsed
                        ? "h-10 w-10 justify-center mx-auto"
                        : "gap-3 px-3 py-2.5 text-sm font-medium",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-text-secondary hover:text-text-primary hover:bg-bg-elevated"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-active"
                        className={cn(
                          "absolute bg-primary rounded-r",
                          isCollapsed
                            ? "left-[-8px] top-1/2 -translate-y-1/2 h-8 w-[3px]"
                            : "left-[-12px] top-1/2 -translate-y-1/2 h-6 w-[3px]"
                        )}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <Icon
                      className={cn(
                        "h-[18px] w-[18px] shrink-0 transition-colors",
                        isActive ? "text-primary" : "text-text-muted group-hover:text-text-primary"
                      )}
                    />
                    {!isCollapsed && (
                      <span className="whitespace-nowrap overflow-hidden text-sm">
                        {item.title}
                      </span>
                    )}
                    {!isCollapsed && item.badge !== undefined && item.badge > 0 && (
                      <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-primary/20 px-1.5 text-[10px] font-bold text-primary">
                        {item.badge}
                      </span>
                    )}
                    {isCollapsed && (
                      <div className="absolute left-full ml-3 hidden rounded-lg bg-bg-elevated border border-border-default px-3 py-1.5 text-sm text-text-primary shadow-lg group-hover:block z-50 whitespace-nowrap">
                        {item.title}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User Profile */}
      <div
        className={cn(
          "border-t border-border-subtle transition-all duration-300",
          isCollapsed ? "p-2" : "p-4"
        )}
      >
        <div
          className={cn(
            "flex items-center rounded-lg transition-all duration-300",
            isCollapsed ? "justify-center p-0 h-10 w-10 mx-auto" : "gap-3 px-3 py-2"
          )}
        >
          <Avatar
            className="h-9 w-9 shrink-0"
            title={isCollapsed ? `Logged in as ${user?.name ?? "User"}` : undefined}
          >
            <AvatarFallback className="text-xs gradient-primary text-white">
              {user ? getInitials(user.name) : "SD"}
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <>
              <div className="flex-1 min-w-0 overflow-hidden">
                <p className="text-sm font-medium text-text-primary truncate">
                  {user?.name ?? "SafeDrive User"}
                </p>
                <p className="text-xs text-text-muted truncate capitalize">
                  {user?.role ?? "driver"}
                </p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Link
                  href="/settings"
                  className="flex h-7 w-7 items-center justify-center rounded-md text-text-muted hover:text-text-primary hover:bg-bg-elevated transition-colors"
                  title="Settings"
                >
                  <Settings className="h-4 w-4" />
                </Link>
                <button
                  onClick={logout}
                  className="flex h-7 w-7 items-center justify-center rounded-md text-text-muted hover:text-red-400 hover:bg-red-400/10 transition-colors cursor-pointer"
                  title="Log Out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.aside>
  );
}
