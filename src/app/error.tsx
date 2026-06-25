"use client";

import { motion } from "framer-motion";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { slideUp } from "@/lib/constants";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-bg-root gradient-mesh flex items-center justify-center p-4">
      <motion.div {...slideUp} className="text-center space-y-6 max-w-md">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-danger-muted">
          <AlertTriangle className="h-10 w-10 text-danger" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-text-primary">Something went wrong</h1>
          <p className="text-sm text-text-secondary">
            An unexpected error occurred. Please try again or contact support if the issue persists.
          </p>
        </div>
        <Button onClick={reset} size="lg">
          <RotateCcw className="h-4 w-4" /> Try Again
        </Button>
      </motion.div>
    </div>
  );
}
