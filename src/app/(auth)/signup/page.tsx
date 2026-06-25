"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, User, Phone, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/auth-store";
import { roleDashboardPaths, roleDescriptions } from "@/config/site";
import { slideUp } from "@/lib/constants";
import type { Role } from "@/types";

const roles: { value: Role; label: string; icon: string }[] = [
  { value: "driver", label: "Driver", icon: "🚗" },
  { value: "family", label: "Family", icon: "👨‍👩‍👧‍👦" },
  { value: "citizen", label: "Citizen", icon: "🏘️" },
  { value: "police", label: "Police", icon: "🚔" },
  { value: "hospital", label: "Hospital", icon: "🏥" },
  { value: "insurance", label: "Insurance", icon: "📋" },
];

export default function SignupPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role>("driver");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    login({
      id: `u_${Date.now()}`,
      email,
      name,
      phone,
      role: selectedRole,
      isActive: true,
      emailVerified: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    router.push(roleDashboardPaths[selectedRole] ?? "/driver");
  };

  return (
    <motion.div {...slideUp} className="glass-card-static p-8 sm:p-10 w-full shadow-2xl ring-1 ring-border-subtle rounded-2xl">
      <div className="space-y-2 text-center mb-8">
        <h2 className="text-3xl font-extrabold text-text-primary tracking-tight">Create an Account</h2>
        <p className="text-sm text-text-secondary">
          {step === 1
            ? "Enter your details to get started"
            : "Select your role to customize your experience"}
        </p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-white shadow-md shadow-primary/20">
            {step > 1 ? <CheckCircle2 className="h-4 w-4" /> : "1"}
          </div>
          <span className="text-sm font-bold text-text-primary">Details</span>
        </div>
        <div className="flex-1 h-px bg-border-subtle" />
        <div className="flex items-center gap-2">
          <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors ${step === 2 ? "bg-primary text-white shadow-md shadow-primary/20" : "bg-bg-elevated text-text-muted"}`}>
            2
          </div>
          <span className={`text-sm font-bold transition-colors ${step === 2 ? "text-text-primary" : "text-text-muted"}`}>Role</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {step === 1 ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="name" className="font-semibold">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                <Input id="name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} className="pl-10 bg-bg-root" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-email" className="font-semibold">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                <Input id="signup-email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 bg-bg-root" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="font-semibold">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" value={phone} onChange={(e) => setPhone(e.target.value)} className="pl-10 bg-bg-root" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-password" className="font-semibold">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                <Input id="signup-password" type={showPassword ? "text" : "password"} placeholder="Create a strong password" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 pr-10 bg-bg-root" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary cursor-pointer">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full font-bold shadow-lg shadow-primary/20 mt-4" size="lg">
              Continue
            </Button>
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3">
              {roles.map((role) => (
                <button
                  key={role.value}
                  type="button"
                  onClick={() => setSelectedRole(role.value)}
                  className={`flex flex-col items-center gap-2 rounded-xl border p-4 transition-all cursor-pointer ${
                    selectedRole === role.value
                      ? "border-primary bg-primary/5 ring-1 ring-primary/30 shadow-sm"
                      : "border-border-default bg-bg-root hover:border-border-hover hover:bg-bg-elevated"
                  }`}
                >
                  <span className="text-2xl">{role.icon}</span>
                  <span className="text-sm font-bold text-text-primary">{role.label}</span>
                </button>
              ))}
            </div>
            <p className="text-xs text-text-secondary text-center px-4 py-2 font-medium">
              {roleDescriptions[selectedRole]}
            </p>
            <div className="flex gap-3 mt-4">
              <Button type="button" variant="outline" className="flex-1 font-bold bg-bg-root" onClick={() => setStep(1)} size="lg">
                Back
              </Button>
              <Button type="submit" className="flex-1 font-bold shadow-lg shadow-primary/20" loading={isLoading} size="lg">
                Complete
              </Button>
            </div>
          </>
        )}
      </form>

      <p className="mt-8 text-center text-sm text-text-secondary">
        Already have an account?{" "}
        <Link href="/login" className="text-primary hover:text-primary-hover font-semibold transition-colors">
          Sign in
        </Link>
      </p>
    </motion.div>
  );
}
