import { Shield } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-bg-root flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl gradient-primary animate-pulse-glow">
            <Shield className="h-7 w-7 text-white" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:0ms]" />
          <div className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:150ms]" />
          <div className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}
