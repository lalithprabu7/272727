"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { staggerItem } from "@/lib/constants";

interface ScoreGaugeProps {
  score: number;
  max?: number;
  label: string;
  color?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function ScoreGauge({
  score,
  max = 100,
  label,
  color,
  size = "md",
  className,
}: ScoreGaugeProps) {
  const percentage = Math.min((score / max) * 100, 100);
  const strokeWidth = size === "sm" ? 6 : size === "lg" ? 10 : 8;
  const svgSize = size === "sm" ? 80 : size === "lg" ? 160 : 120;
  const radius = (svgSize - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const resolvedColor = color ?? (
    percentage >= 90 ? "#16A34A" :
    percentage >= 70 ? "#F59E0B" :
    percentage >= 50 ? "#F97316" :
    "#DC2626"
  );

  const textSize = size === "sm" ? "text-lg" : size === "lg" ? "text-4xl" : "text-2xl";
  const labelSize = size === "sm" ? "text-[10px]" : "text-xs";

  return (
    <motion.div
      variants={staggerItem}
      className={cn("flex flex-col items-center gap-2", className)}
    >
      <div className="relative" style={{ width: svgSize, height: svgSize }}>
        <svg
          width={svgSize}
          height={svgSize}
          className="-rotate-90"
        >
          {/* Background Circle */}
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-bg-elevated"
          />
          {/* Progress Circle */}
          <motion.circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            fill="none"
            stroke={resolvedColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
          />
        </svg>
        {/* Center Value */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className={cn("font-bold text-text-primary", textSize)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {score}
          </motion.span>
        </div>
      </div>
      <span className={cn("font-medium text-text-secondary", labelSize)}>
        {label}
      </span>
    </motion.div>
  );
}
