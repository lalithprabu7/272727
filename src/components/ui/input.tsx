import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <input
          type={type}
          className={cn(
            "flex h-11 w-full rounded-lg border bg-bg-elevated px-4 py-2 text-sm text-text-primary placeholder:text-text-muted transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
            error
              ? "border-danger/50 focus:ring-danger/50 focus:border-danger"
              : "border-border-default hover:border-border-hover",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-xs text-danger">{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
