"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShieldCheck, ShieldAlert } from "lucide-react";
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
    <motion.div 
      {...slideUp} 
      className="glass-card-static p-6 sm:p-8 w-full max-w-[480px] mx-auto shadow-2xl border border-border-subtle rounded-2xl relative overflow-hidden"
    >
      <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      
      <div className="relative z-10 space-y-6">
        <div>
          <Link
            href="/forgot-password"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-text-primary transition-colors mb-4"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </Link>

          <div className="flex flex-col items-center text-center space-y-2">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-muted/30 border border-primary/20 mb-2">
              <ShieldCheck className="h-6 w-6 text-primary animate-pulse" />
            </div>
            <h2 className="text-xl font-extrabold text-text-primary tracking-tight">Verify identity</h2>
            <p className="text-xs text-text-secondary max-w-[250px]">
              Enter the 6-digit code sent to your email address.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-lg border border-danger/20 bg-danger-muted/30 p-3 text-xs text-danger text-center font-medium flex items-center justify-center gap-2">
              <ShieldAlert className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex justify-between gap-1.5 sm:gap-2" onPaste={handlePaste}>
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
                className="h-12 w-full max-w-12 flex-1 rounded-xl border border-border-default bg-bg-root/50 text-center text-lg font-bold text-text-primary transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                aria-label={`Digit ${index + 1}`}
              />
            ))}
          </div>

          <Button type="submit" className="w-full h-11 font-bold shadow-lg shadow-primary/25 mt-2" size="default" loading={isLoading}>
            Verify Code
          </Button>
        </form>

        <p className="text-center text-xs text-text-muted">
          Didn&apos;t receive the code?{" "}
          <button type="button" className="text-primary hover:text-primary-hover font-semibold cursor-pointer">
            Resend
          </button>
        </p>
      </div>
    </motion.div>
  );
}
