"use client";

import { motion } from "framer-motion";
import { type LucideIcon, FileX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { scaleIn } from "@/lib/constants";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon: Icon = FileX,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <motion.div
      {...scaleIn}
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-bg-elevated mb-6">
        <Icon className="h-8 w-8 text-text-muted" />
      </div>
      <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
      <p className="text-sm text-text-secondary max-w-sm mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} size="sm">
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
}
