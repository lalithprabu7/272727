"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  LayoutDashboard,
  Bell,
  Settings,
  type LucideIcon,
} from "lucide-react";
import { useCommandPaletteStore } from "@/store/command-palette-store";
import { useAuthStore } from "@/store/auth-store";
import { navigationConfig } from "@/config/navigation";

interface CommandItem {
  label: string;
  href: string;
  icon: LucideIcon;
  group: string;
}

const quickActions: CommandItem[] = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard, group: "Quick Actions" },
  { label: "Notifications", href: "/notifications", icon: Bell, group: "Quick Actions" },
  { label: "Settings", href: "/settings", icon: Settings, group: "Quick Actions" },
];

export function CommandPalette() {
  const router = useRouter();
  const { isOpen, close, toggle } = useCommandPaletteStore();
  const { user } = useAuthStore();

  const role = user?.role ?? "driver";
  const navGroups = navigationConfig[role] ?? [];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        toggle();
      }
    },
    [toggle]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleSelect = (href: string) => {
    close();
    router.push(href);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15 }}
            className="fixed left-1/2 top-[20%] z-[60] w-full max-w-lg -translate-x-1/2"
          >
            <Command className="rounded-xl border border-border-default bg-bg-card shadow-modal overflow-hidden">
              <div className="flex items-center border-b border-border-default px-4">
                <Search className="h-4 w-4 shrink-0 text-text-muted" />
                <Command.Input
                  placeholder="Type a command or search..."
                  className="flex h-12 w-full bg-transparent px-3 text-sm text-text-primary placeholder:text-text-muted outline-none"
                />
                <kbd className="rounded bg-bg-elevated px-1.5 py-0.5 text-[10px] font-mono text-text-muted border border-border-default">
                  ESC
                </kbd>
              </div>
              <Command.List className="max-h-[300px] overflow-y-auto p-2">
                <Command.Empty className="py-6 text-center text-sm text-text-muted">
                  No results found.
                </Command.Empty>

                <Command.Group heading="Quick Actions" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-text-muted">
                  {quickActions.map((item) => (
                    <Command.Item
                      key={item.label}
                      onSelect={() => handleSelect(item.href)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-text-secondary cursor-pointer data-[selected=true]:bg-bg-elevated data-[selected=true]:text-text-primary transition-colors"
                    >
                      <item.icon className="h-4 w-4 text-text-muted" />
                      {item.label}
                    </Command.Item>
                  ))}
                </Command.Group>

                {navGroups.map((group) => (
                  <Command.Group
                    key={group.title}
                    heading={group.title}
                    className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-text-muted"
                  >
                    {group.items.map((item) => (
                      <Command.Item
                        key={item.href}
                        onSelect={() => handleSelect(item.href)}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-text-secondary cursor-pointer data-[selected=true]:bg-bg-elevated data-[selected=true]:text-text-primary transition-colors"
                      >
                        <item.icon className="h-4 w-4 text-text-muted" />
                        {item.title}
                      </Command.Item>
                    ))}
                  </Command.Group>
                ))}
              </Command.List>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
