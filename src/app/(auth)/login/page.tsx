"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { mockUsers } from "@/data/mock";
import { roleDashboardPaths } from "@/config/site";
import { 
  Eye, EyeOff, Mail, Lock, ShieldAlert,
  Car, Users, Shield, Heart, Building, User
} from "lucide-react";

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

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const user = mockUsers.find((u) => u.email === email);
    if (user) {
      login(user);
      router.push(roleDashboardPaths[user.role] ?? "/driver");
    } else if (email && password) {
      const demoUser = mockUsers[0];
      login(demoUser);
      router.push(roleDashboardPaths[demoUser.role] ?? "/driver");
    } else {
      setError("Invalid credentials. Try using one of the Quick Access cards below.");
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (roleIndex: number) => {
    setIsLoading(true);
    setTimeout(() => {
      const user = mockUsers[roleIndex];
      if (user) {
        login(user);
        router.push(roleDashboardPaths[user.role] ?? "/driver");
      }
    }, 800);
  };

  const demoRoles = [
    { label: "Driver", index: 0, icon: Car, desc: "Active road patrols", color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
    { label: "Family", index: 1, icon: Users, desc: "Real-time safety circles", color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
    { label: "Police", index: 3, icon: Shield, desc: "Emergency dispatch", color: "text-red-400 bg-red-500/10 border-red-500/20" },
    { label: "Hospital", index: 4, icon: Heart, desc: "Emergency medical responses", color: "text-pink-400 bg-pink-500/10 border-pink-500/20" },
    { label: "Insurance", index: 5, icon: Building, desc: "Claims & telemetry audits", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
    { label: "Citizen", index: 2, icon: User, desc: "Public reports & alerts", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
  ];

  return (
    <div className="w-full flex items-center justify-center">
      {/* Premium Glass Login Card */}
      <div className="w-full max-w-[480px] bg-[#122131]/60 backdrop-blur-2xl p-6 md:p-8 rounded-[24px] border border-white/10 relative overflow-hidden shadow-[0_0_50px_rgba(47,128,255,0.15)] flex flex-col justify-between">
        {/* Soft decorative light flares inside the card */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="space-y-1 mb-5 relative z-10 text-center">
          <h2 className="text-2xl font-black text-white tracking-tight">Welcome Back</h2>
          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
            Sign in to secure your journey today
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-[12px] border border-red-500/20 bg-red-500/10 p-2.5 text-[11px] text-red-300 text-center font-medium">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5 relative z-10 text-left">
          {/* Email */}
          <div className="space-y-1">
            <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-400">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#05111d]/90 border border-white/5 rounded-[12px] py-2.5 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-blue-400/50 focus:border-blue-400 transition-all text-white placeholder:text-slate-600 text-xs"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-400">Password</label>
              <Link
                href="/forgot-password"
                className="text-[9px] font-bold text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-wider"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative group">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#05111d]/90 border border-white/5 rounded-[12px] py-2.5 pl-10 pr-10 focus:outline-none focus:ring-1 focus:ring-blue-400/50 focus:border-blue-400 transition-all text-white placeholder:text-slate-600 text-xs"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors cursor-pointer text-[10px] font-bold uppercase tracking-wider"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-2 pt-0.5">
            <input
              id="remember"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-3.5 w-3.5 rounded border-white/10 bg-slate-950 text-blue-400 focus:ring-blue-400/50 cursor-pointer"
            />
            <label htmlFor="remember" className="text-[10px] cursor-pointer font-medium text-slate-400 select-none">
              Keep me signed in for 30 days
            </label>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider rounded-[12px] glow-hover active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
          >
            {isLoading ? (
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Securing session...</span>
              </span>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>

        {/* Separator */}
        <div className="relative py-3">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/5"></div>
          </div>
          <div className="relative flex justify-center text-[8px] uppercase font-bold tracking-widest">
            <span className="bg-[#122131]/90 px-2 text-slate-500">Quick Access Portals</span>
          </div>
        </div>

        {/* Clean cards quick access list - Compact 2 columns x 3 rows grid */}
        <div className="grid grid-cols-2 gap-1.5 text-left">
          {demoRoles.map((role) => {
            const Icon = role.icon;
            return (
              <button
                key={role.label}
                onClick={() => handleDemoLogin(role.index)}
                className="flex items-center gap-2 p-2 rounded-[12px] border border-white/5 bg-slate-950/15 hover:bg-slate-900/60 hover:border-white/10 text-left transition-all group"
              >
                <div className={`p-1 rounded-lg border ${role.color} group-hover:scale-105 transition-transform`}>
                  <Icon className="w-3 h-3" />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] font-bold text-white tracking-wide truncate">{role.label}</p>
                  <p className="text-[8px] text-slate-500 truncate">{role.desc}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Account creation */}
        <div className="mt-4 pt-4 border-t border-white/5 text-center">
          <p className="text-[11px] text-slate-400 font-medium">
            New to SafeDrive+?{" "}
            <Link href="/signup" className="text-blue-400 hover:text-blue-300 font-bold transition-colors">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
