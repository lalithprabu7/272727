"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShieldCheck, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { slideUp } from "@/lib/constants";

export default function VerifyOtpPage() {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = useCallback(
    (index: number, value: string) => {
      if (!/^\d*$/.test(value)) return;

      const newOtp = [...otp];
      newOtp[index] = value.slice(-1);
      setOtp(newOtp);
      setError("");

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [otp]
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && !otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    },
    [otp]
  );

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newOtp = [...Array(6).fill("")];
    pastedData.split("").forEach((char, i) => {
      newOtp[i] = char;
    });
    setOtp(newOtp);
    const nextEmpty = pastedData.length < 6 ? pastedData.length : 5;
    inputRefs.current[nextEmpty]?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== 6) {
      setError("Please enter the complete 6-digit code.");
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    router.push("/login");
  };

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
        href="/forgot-password"
        className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>

      <div className="space-y-2 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-muted mb-4">
          <ShieldCheck className="h-7 w-7 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary">Verify your identity</h2>
        <p className="text-sm text-text-secondary">
          Enter the 6-digit code sent to your email
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="rounded-lg border border-danger/20 bg-danger-muted p-3 text-sm text-danger text-center">
            {error}
          </div>
        )}

        <div className="flex justify-center gap-2 sm:gap-3" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="h-14 w-12 rounded-xl border border-border-default bg-bg-elevated text-center text-xl font-bold text-text-primary transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              aria-label={`Digit ${index + 1}`}
            />
          ))}
        </div>

        <Button type="submit" className="w-full" size="lg" loading={isLoading}>
          Verify Code
        </Button>
      </form>

      <p className="text-center text-sm text-text-muted">
        Didn&apos;t receive the code?{" "}
        <button className="text-primary hover:text-primary-hover font-medium cursor-pointer">
          Resend
        </button>
      </p>
    </motion.div>
  );
}
