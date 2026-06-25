"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, ArrowLeft, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { slideUp } from "@/lib/constants";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSent(true);
    setIsLoading(false);
  };

  if (isSent) {
    return (
      <motion.div {...slideUp} className="space-y-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-success-muted">
          <Mail className="h-8 w-8 text-success" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-text-primary">Check your email</h2>
          <p className="text-sm text-text-secondary">
            We&apos;ve sent a verification code to <strong className="text-text-primary">{email}</strong>.
            Enter the code on the next page to reset your password.
          </p>
        </div>
        <Button className="w-full" size="lg" onClick={() => router.push("/verify-otp")}>
          Enter Verification Code
        </Button>
        <p className="text-sm text-text-muted">
          Didn&apos;t receive the email?{" "}
          <button onClick={() => setIsSent(false)} className="text-primary hover:text-primary-hover font-medium cursor-pointer">
            Try again
          </button>
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div {...slideUp} className="space-y-8">
      <div className="flex items-center gap-3 lg:hidden mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary">
          <Shield className="h-5 w-5 text-white" />
        </div>
        <span className="text-xl font-bold text-text-primary">
          SafeDrive<span className="text-primary">+</span>
        </span>
      </div>

      <Link
        href="/login"
        className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to login
      </Link>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-text-primary">Reset your password</h2>
        <p className="text-sm text-text-secondary">
          Enter your email address and we&apos;ll send you a verification code.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="reset-email">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <Input
              id="reset-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>
        <Button type="submit" className="w-full" size="lg" loading={isLoading}>
          Send Verification Code
        </Button>
      </form>
    </motion.div>
  );
}
