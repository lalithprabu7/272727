"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, ArrowLeft } from "lucide-react";
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

  return (
    <motion.div 
      {...slideUp} 
      className="glass-card-static p-6 sm:p-8 w-full max-w-[480px] mx-auto shadow-2xl border border-border-subtle rounded-2xl relative overflow-hidden"
    >
      <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      {isSent ? (
        <div className="space-y-6 text-center relative z-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-success-muted/30 border border-success/20">
            <Mail className="h-7 w-7 text-success animate-pulse" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-extrabold text-text-primary">Check your email</h2>
            <p className="text-xs text-text-secondary leading-relaxed">
              We&apos;ve sent a verification code to <strong className="text-text-primary">{email}</strong>.
              Enter the code on the next page to reset your password.
            </p>
          </div>
          <Button className="w-full h-11 font-bold" size="default" onClick={() => router.push("/verify-otp")}>
            Enter Verification Code
          </Button>
          <p className="text-xs text-text-muted">
            Didn&apos;t receive the email?{" "}
            <button onClick={() => setIsSent(false)} className="text-primary hover:text-primary-hover font-semibold cursor-pointer">
              Try again
            </button>
          </p>
        </div>
      ) : (
        <div className="space-y-6 relative z-10">
          <div>
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-text-primary transition-colors mb-4"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to login
            </Link>

            <div className="space-y-1">
              <h2 className="text-xl font-extrabold text-text-primary tracking-tight">Reset password</h2>
              <p className="text-xs text-text-secondary">
                We will send you a 6-digit verification code.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="reset-email" className="text-xs font-semibold text-text-secondary">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-bg-root/50 border-border-default focus:border-primary/50 text-sm h-11"
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full h-11 font-bold shadow-lg shadow-primary/25" size="default" loading={isLoading}>
              Send Code
            </Button>
          </form>
        </div>
      )}
    </motion.div>
  );
}
