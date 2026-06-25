"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { cardHover, staggerItem } from "@/lib/constants";

interface StatCardProps {
  label: string;
  value: string | number;
  change?: number;
  trend?: "up" | "down" | "neutral";
  icon: LucideIcon;
  color?: string;
  description?: string;
  className?: string;
}

export function StatCard({
  label,
  value,
  change,
  trend = "neutral",
  icon: Icon,
  color = "text-primary",
  description,
  className,
}: StatCardProps) {
  const trendColor =
    trend === "up"
      ? "text-emerald-400"
      : trend === "down"
        ? "text-red-400"
        : "text-text-muted";

  const TrendIcon =
    trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;

  const iconBgColor = color
    .replace("text-", "bg-")
    .concat("/10");

  return (
    <motion.div
      variants={staggerItem}
      {...cardHover}
      className={cn("glass-card p-6 group cursor-default", className)}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-3 flex-1 min-w-0">
          <p className="text-sm font-medium text-text-secondary truncate">
            {label}
          </p>
          <div className="flex items-end gap-2">
            <p className="text-3xl font-bold tracking-tight text-text-primary">
              {value}
            </p>
            {change !== undefined && (
              <div className={cn("flex items-center gap-0.5 text-xs font-medium pb-1", trendColor)}>
                <TrendIcon className="h-3 w-3" />
                <span>{Math.abs(change)}%</span>
              </div>
            )}
          </div>
          {description && (
            <p className="text-xs text-text-muted">{description}</p>
          )}
        </div>
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
            iconBgColor
          )}
        >
          <Icon className={cn("h-6 w-6", color)} />
        </div>
      </div>
    </motion.div>
  );
}
