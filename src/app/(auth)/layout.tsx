import { Shield } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#05111d] text-[#d4e4fa] min-h-screen flex flex-col font-sans select-none overflow-x-hidden relative">
      {/* TopNavBar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#05111d]/60 backdrop-blur-md border-b border-white/5 shadow-sm">
        <nav className="flex justify-between items-center w-full px-4 sm:px-8 py-4 max-w-[1440px] mx-auto">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <span className="text-white font-bold text-base">S</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">SafeDrive+</span>
          </div>
          <div className="hidden lg:flex items-center gap-8">
            <a className="text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-white transition-colors" href="#">Platform</a>
            <a className="text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-white transition-colors" href="#">Solutions</a>
            <a className="text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-white transition-colors" href="#">Safety Insights</a>
            <a className="text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-white transition-colors" href="#">Security</a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors">
              Sign In
            </Link>
            <button 
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-all active:scale-95 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
              style={{
                background: 'linear-gradient(135deg, #2F80FF 0%, #1e40af 100%)'
              }}
            >
              Request Demo
            </button>
          </div>
        </nav>
      </header>

      {/* Main Content Split Screen */}
      <main className="flex-grow flex flex-col lg:flex-row pt-[72px] min-h-[calc(100vh-72px)]">
        {/* Left Side: Tesla/Apple Inspired Smart Road Visual Section (55% width) */}
        <section className="relative hidden lg:flex lg:w-[55%] flex-col justify-between p-8 xl:p-16 overflow-hidden border-r border-white/5 min-h-[calc(100vh-72px)]">
          {/* Futuristic smart highway network background */}
          <div className="absolute inset-0 z-0">
            <div 
              className="w-full h-full bg-cover bg-center transition-transform duration-10000 hover:scale-105" 
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAxd8kiwY76DRhqAfZFhXAR7PNPO55RTMxlQZ-L5HrSngYUA2X3YBu9VbZ0GvsmtKaQIJ9uMELxU0o4rHZQIcZApySDxJ3HKbS7HoGHctLNk7pWD5FeV0u4wjte6en4-73LDOSgHfTW3mlaPjtFxkzd-DsAnnb8kVtw7dsBQy0cJFpxLf-ohRTYkwwQrqfeQ7WB9WoU3M5RINcW4xHRbx1Rw3kAyaNAaUhF8Wt8wHUEkp7-e-ArR1WvN6Zrq-h-biGNgLPT_PhUptmf')`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#05111d] via-[#05111d]/70 to-[#05111d]/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05111d] via-transparent to-transparent" />
          </div>

          {/* Top text indicator */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-blue-400">AI Intelligent Active Defense</span>
            </div>
          </div>

          {/* Promotional Marketing Center */}
          <div className="relative z-10 my-auto max-w-xl space-y-6">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Drive Safer. <br />
              <span 
                style={{
                  background: 'linear-gradient(to right, #2F80FF, #adc6ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Respond Faster.
              </span>
            </h1>
            <p className="text-base lg:text-lg text-slate-400 leading-relaxed max-w-md">
              AI-powered road safety ecosystem protecting every journey with real-time proactive safety coordination.
            </p>

            {/* Floating Glass Stats Cards */}
            <div className="grid grid-cols-3 gap-3 lg:gap-4 pt-6 max-w-lg">
              <div className="p-3 lg:p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/10 transition-all">
                <span className="block text-xl lg:text-2xl font-black text-blue-400">98%</span>
                <span className="text-[9px] uppercase font-bold tracking-wider text-slate-500">Accident Detection</span>
              </div>
              <div className="p-3 lg:p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/10 transition-all">
                <span className="block text-xl lg:text-2xl font-black text-indigo-400">2s</span>
                <span className="text-[9px] uppercase font-bold tracking-wider text-slate-500">Emergency Alert</span>
              </div>
              <div className="p-3 lg:p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/10 transition-all">
                <span className="block text-xl lg:text-2xl font-black text-white">24/7</span>
                <span className="text-[9px] uppercase font-bold tracking-wider text-slate-500">Active Monitoring</span>
              </div>
            </div>
          </div>

          {/* Left Footer Branding */}
          <div className="relative z-10">
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-600">
              SafeDrive+ Global Security Architecture v3.4
            </span>
          </div>
        </section>

        {/* Right Side: Render Form Component centered (45% width) */}
        <section className="w-full lg:w-[45%] flex items-start lg:items-center justify-center px-4 py-8 sm:px-6 sm:py-10 lg:px-8 bg-[#05111d] overflow-y-auto">
          <div className="w-full max-w-[480px] mx-auto">
            {children}
          </div>
        </section>
      </main>
    </div>
  );
}
