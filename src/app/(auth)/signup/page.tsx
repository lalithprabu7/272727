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
    <motion.div 
      {...slideUp} 
      className="glass-card-static p-6 sm:p-8 w-full max-w-[480px] mx-auto shadow-2xl border border-border-subtle rounded-2xl relative overflow-hidden"
    >
      <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      
      <div className="space-y-1 text-center mb-6 relative z-10">
        <h2 className="text-2xl font-extrabold text-text-primary tracking-tight">Create an Account</h2>
        <p className="text-xs text-text-secondary">
          {step === 1
            ? "Enter your details to get started"
            : "Select your role to customize your experience"}
        </p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-md shadow-primary/20">
            {step > 1 ? <CheckCircle2 className="h-3.5 w-3.5" /> : "1"}
          </div>
          <span className="text-xs font-bold text-text-primary">Details</span>
        </div>
        <div className="flex-1 h-px bg-border-subtle" />
        <div className="flex items-center gap-2">
          <div className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold transition-colors ${step === 2 ? "bg-primary text-white shadow-md shadow-primary/20" : "bg-bg-elevated text-text-muted"}`}>
            2
          </div>
          <span className={`text-xs font-bold transition-colors ${step === 2 ? "text-text-primary" : "text-text-muted"}`}>Role</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
        {step === 1 ? (
          <>
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-xs font-semibold text-text-secondary">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                <Input id="name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} className="pl-10 bg-bg-root/50 text-sm h-11" required />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="signup-email" className="text-xs font-semibold text-text-secondary">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                <Input id="signup-email" type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 bg-bg-root/50 text-sm h-11" required />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-xs font-semibold text-text-secondary">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" value={phone} onChange={(e) => setPhone(e.target.value)} className="pl-10 bg-bg-root/50 text-sm h-11" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="signup-password" className="text-xs font-semibold text-text-secondary">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                <Input id="signup-password" type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 pr-10 bg-bg-root/50 text-sm h-11" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary cursor-pointer">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full font-bold shadow-lg shadow-primary/25 h-11 mt-2" size="default">
              Continue
            </Button>
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-2.5">
              {roles.map((role) => (
                <button
                  key={role.value}
                  type="button"
                  onClick={() => setSelectedRole(role.value)}
                  className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 transition-all cursor-pointer ${
                    selectedRole === role.value
                      ? "border-primary bg-primary/5 ring-1 ring-primary/30 shadow-sm"
                      : "border-border-default bg-bg-root/30 hover:border-border-hover hover:bg-bg-elevated/40"
                  }`}
                >
                  <span className="text-xl">{role.icon}</span>
                  <span className="text-xs font-bold text-text-primary">{role.label}</span>
                </button>
              ))}
            </div>
            <p className="text-[11px] text-text-secondary text-center px-2 py-1.5 font-medium min-h-[36px]">
              {roleDescriptions[selectedRole]}
            </p>
            <div className="flex gap-2.5 mt-2">
              <Button type="button" variant="outline" className="flex-1 font-bold bg-bg-root/30 h-11" onClick={() => setStep(1)} size="default">
                Back
              </Button>
              <Button type="submit" className="flex-1 font-bold shadow-lg shadow-primary/25 h-11" loading={isLoading} size="default">
                Complete
              </Button>
            </div>
          </>
        )}
      </form>

      <p className="mt-6 text-center text-xs text-text-secondary relative z-10">
        Already have an account?{" "}
        <Link href="/login" className="text-primary hover:text-primary-hover font-semibold transition-colors">
          Sign in
        </Link>
      </p>
    </motion.div>
  );
}
