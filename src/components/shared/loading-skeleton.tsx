import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
  variant?: "card" | "table" | "chart" | "list" | "stat-cards" | "page";
  className?: string;
}

export function LoadingSkeleton({ variant = "card", className }: LoadingSkeletonProps) {
  switch (variant) {
    case "stat-cards":
      return (
        <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", className)}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="glass-card-static p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-3 flex-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-20" />
                </div>
                <Skeleton className="h-12 w-12 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      );
    case "table":
      return (
        <div className={cn("glass-card-static p-6 space-y-4", className)}>
          <div className="flex justify-between items-center">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-9 w-24 rounded-lg" />
          </div>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-4 flex-1" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      );
    case "chart":
      return (
        <div className={cn("glass-card-static p-6 space-y-4", className)}>
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-[250px] w-full rounded-lg" />
        </div>
      );
    case "list":
      return (
        <div className={cn("space-y-3", className)}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="glass-card-static p-4 flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      );
    case "page":
      return (
        <div className={cn("space-y-8", className)}>
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-72" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="glass-card-static p-6 space-y-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-20" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass-card-static p-6 space-y-4">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-[250px] w-full rounded-lg" />
            </div>
            <div className="glass-card-static p-6 space-y-4">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-[250px] w-full rounded-lg" />
            </div>
          </div>
        </div>
      );
    default:
      return (
        <div className={cn("glass-card-static p-6 space-y-4", className)}>
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-24 w-full rounded-lg" />
        </div>
      );
  }
}
