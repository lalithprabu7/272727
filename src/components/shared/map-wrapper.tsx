"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

// Dynamically import the map component with SSR disabled
const MapComponent = dynamic(() => import("./map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-bg-elevated rounded-xl flex items-center justify-center border border-border-subtle overflow-hidden relative">
      <Skeleton className="absolute inset-0 w-full h-full" />
      <span className="relative z-10 text-sm text-text-muted bg-bg-card/50 px-3 py-1.5 rounded-md backdrop-blur-md">Loading interactive map...</span>
    </div>
  ),
});

export function MapWrapper(props: React.ComponentProps<typeof import("./map").default>) {
  return <MapComponent {...props} />;
}
