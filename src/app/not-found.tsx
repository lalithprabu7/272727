"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { slideUp } from "@/lib/constants";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-root gradient-mesh flex items-center justify-center p-4">
      <motion.div {...slideUp} className="text-center space-y-6 max-w-md">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-primary-muted">
          <MapPin className="h-10 w-10 text-primary" />
        </div>
        <div className="space-y-2">
          <h1 className="text-6xl font-extrabold gradient-text">404</h1>
          <h2 className="text-xl font-semibold text-text-primary">Page Not Found</h2>
          <p className="text-sm text-text-secondary">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
        <Link href="/">
          <Button size="lg">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
