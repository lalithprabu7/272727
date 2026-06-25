"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  iconColor?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function ChartCard({
  title,
  description,
  icon: Icon,
  iconColor = "text-primary",
  actions,
  children,
  className,
}: ChartCardProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {Icon && <Icon className={cn("h-5 w-5", iconColor)} />}
            {title}
          </CardTitle>
          {actions}
        </div>
        {description && (
          <p className="text-xs text-text-muted mt-1">{description}</p>
        )}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
