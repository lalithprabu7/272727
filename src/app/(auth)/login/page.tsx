"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/auth-store";
import { mockUsers } from "@/data/mock";
import { roleDashboardPaths } from "@/config/site";
import { slideUp } from "@/lib/constants";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1200));

    const user = mockUsers.find((u) => u.email === email);
    if (user) {
      login(user);
      router.push(roleDashboardPaths[user.role] ?? "/driver");
    } else if (email && password) {
      const demoUser = mockUsers[0];
      login(demoUser);
      router.push(roleDashboardPaths[demoUser.role] ?? "/driver");
    } else {
      setError("Please enter your email and password.");
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (roleIndex: number) => {
    const user = mockUsers[roleIndex];
    if (user) {
      login(user);
      router.push(roleDashboardPaths[user.role] ?? "/driver");
    }
  };

  return (
    <motion.div {...slideUp} className="glass-card-static p-8 sm:p-10 w-full shadow-2xl ring-1 ring-border-subtle rounded-2xl">
      <div className="space-y-2 text-center mb-8">
        <h2 className="text-3xl font-extrabold text-text-primary tracking-tight">Welcome Back</h2>
        <p className="text-sm text-text-secondary">
          Sign in to your account to continue
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="rounded-lg border border-danger/20 bg-danger-muted p-3 text-sm text-danger text-center font-medium">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email" className="font-semibold">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 bg-bg-root"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="font-semibold">Password</Label>
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-primary hover:text-primary-hover transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 pr-10 bg-bg-root"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <input
            id="remember"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 rounded border-border-default bg-bg-elevated text-primary focus:ring-primary/50 cursor-pointer"
          />
          <Label htmlFor="remember" className="text-sm cursor-pointer font-medium text-text-secondary">
            Remember me for 30 days
          </Label>
        </div>

        <Button type="submit" className="w-full font-bold shadow-lg shadow-primary/20" size="lg" loading={isLoading}>
          Sign In
        </Button>
      </form>

      {/* Demo Quick Login */}
      <div className="mt-8 space-y-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border-subtle" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-bg-card px-3 text-text-muted uppercase tracking-wider font-semibold">Quick Demo Access</span>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: "Driver", index: 0, color: "bg-blue-500/10 text-blue-500 border-blue-500/20 hover:bg-blue-500/20" },
            { label: "Police", index: 3, color: "bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20" },
            { label: "Hospital", index: 4, color: "bg-pink-500/10 text-pink-500 border-pink-500/20 hover:bg-pink-500/20" },
            { label: "Admin", index: 6, color: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20 hover:bg-indigo-500/20" },
          ].map((demo) => (
            <button
              key={demo.label}
              onClick={() => handleDemoLogin(demo.index)}
              className={`rounded-lg border px-1 py-2 text-[11px] font-bold transition-all cursor-pointer ${demo.color}`}
            >
              {demo.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Family", index: 1, color: "bg-purple-500/10 text-purple-500 border-purple-500/20 hover:bg-purple-500/20" },
            { label: "Citizen", index: 2, color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20" },
            { label: "Insurance", index: 5, color: "bg-amber-500/10 text-amber-500 border-amber-500/20 hover:bg-amber-500/20" },
          ].map((demo) => (
            <button
              key={demo.label}
              onClick={() => handleDemoLogin(demo.index)}
              className={`rounded-lg border px-1 py-2 text-[11px] font-bold transition-all cursor-pointer ${demo.color}`}
            >
              {demo.label}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-8 text-center text-sm text-text-secondary">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-primary hover:text-primary-hover font-semibold transition-colors">
          Sign up
        </Link>
      </p>
    </motion.div>
  );
}
