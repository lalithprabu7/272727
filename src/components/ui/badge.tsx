import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-primary/20 bg-primary-muted text-primary",
        success: "border-success/20 bg-success-muted text-success",
        warning: "border-warning/20 bg-warning-muted text-warning",
        danger: "border-danger/20 bg-danger-muted text-danger",
        outline: "border-border-default text-text-secondary",
        secondary: "border-border-default bg-bg-elevated text-text-secondary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
