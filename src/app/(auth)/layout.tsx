import { Shield } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg-root gradient-mesh flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[100px] pointer-events-none" />
      
      <div className="w-full max-w-[480px] relative z-10">
        <div className="mb-8 flex justify-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl gradient-primary shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-3xl font-extrabold text-text-primary tracking-tight">
              SafeDrive<span className="text-primary">+</span>
            </span>
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
