"use client";

import { Bell, Command, Menu, Search, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSidebarStore } from "@/store/sidebar-store";
import { useNotificationStore } from "@/store/notification-store";
import { useCommandPaletteStore } from "@/store/command-palette-store";
import { useAuthStore } from "@/store/auth-store";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getInitials } from "@/lib/utils";
import { useHasMounted } from "@/hooks/use-has-mounted";


export function Navbar() {
  const mounted = useHasMounted();
  const { theme, setTheme } = useTheme();
  const { setMobileOpen } = useSidebarStore();
  const { unreadCount, toggleOpen: toggleNotifications } = useNotificationStore();
  const { toggle: toggleCommandPalette } = useCommandPaletteStore();
  const { user } = useAuthStore();


  return (
    <header
      className="sticky top-0 z-30 flex h-16 w-full items-center border-b border-border-subtle bg-bg-root/80 backdrop-blur-xl px-4 sm:px-6 lg:px-8"
    >
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="mr-3 flex h-9 w-9 items-center justify-center rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-elevated transition-colors lg:hidden cursor-pointer"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Command Search */}
      <button
        onClick={toggleCommandPalette}
        className="flex h-9 items-center gap-2 rounded-lg border border-border-default bg-bg-elevated px-3 text-sm text-text-muted hover:border-border-hover hover:text-text-secondary transition-all cursor-pointer w-full max-w-xs"
      >
        <Search className="h-4 w-4 shrink-0" />
        <span className="hidden sm:inline">Search everything...</span>
        <span className="sm:hidden">Search...</span>
        <kbd className="ml-auto hidden rounded bg-bg-card px-1.5 py-0.5 text-[10px] font-mono font-medium text-text-muted border border-border-default sm:inline-flex items-center gap-0.5">
          <Command className="h-2.5 w-2.5" />K
        </kbd>
      </button>

      {/* Right Actions */}
      <div className="ml-auto flex items-center gap-1 sm:gap-2">
        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-elevated transition-colors cursor-pointer"
          aria-label="Toggle theme"
        >
          {mounted ? (
            theme === "dark" ? (
              <Sun className="h-[18px] w-[18px]" />
            ) : (
              <Moon className="h-[18px] w-[18px]" />
            )
          ) : (
            <div className="h-[18px] w-[18px]" />
          )}
        </button>

        {/* Notifications */}
        <button
          onClick={toggleNotifications}
          className="relative flex h-9 w-9 items-center justify-center rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-elevated transition-colors cursor-pointer"
          aria-label="Notifications"
        >
          <Bell className="h-[18px] w-[18px]" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-bold text-white animate-pulse-glow">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>

        {/* User Avatar */}
        <div className="ml-1 flex items-center gap-3 pl-2 border-l border-border-subtle">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-text-primary leading-tight">
              {user?.name ?? "SafeDrive User"}
            </p>
            <Badge variant="outline" className="text-[10px] h-4 mt-0.5 capitalize">
              {user?.role ?? "driver"}
            </Badge>
          </div>
          <Avatar className="h-9 w-9 cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all">
            <AvatarFallback className="text-xs gradient-primary text-white">
              {user ? getInitials(user.name) : "SD"}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
