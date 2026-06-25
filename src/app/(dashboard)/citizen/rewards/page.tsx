"use client";

import { motion } from "framer-motion";
import { Award, Star, ShieldCheck, Zap, TrendingUp, Gift } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { staggerContainer, staggerItem } from "@/lib/constants";

export default function RewardsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Civic Rewards & Badges"
        description="Earn points and unlock badges by reporting hazards and contributing to community road safety."
        breadcrumbs={[
          { label: "Home", href: "/citizen" },
          { label: "Rewards" },
        ]}
      />

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-900/40 to-blue-600/10 border-blue-500/20 shadow-[0_0_15px_rgba(37,99,235,0.1)]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <Star className="h-5 w-5" />
              </div>
              <Badge className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border-blue-500/30">Level 4</Badge>
            </div>
            <p className="text-3xl font-bold text-white mb-1">1,250</p>
            <p className="text-sm text-blue-200/70">Total Civic Points</p>
            <div className="mt-4 space-y-1.5">
              <div className="flex justify-between text-xs text-blue-200/50">
                <span>Progress to Lvl 5</span>
                <span>250 pts needed</span>
              </div>
              <Progress value={83} className="h-2 bg-blue-950" indicatorClassName="bg-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Recent Contributions</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border-subtle pb-3">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded bg-emerald-500/10 text-emerald-500 flex items-center justify-center"><ShieldCheck className="h-4 w-4" /></div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">Verified Hazard Report</p>
                    <p className="text-xs text-text-muted">Pothole on 5th Ave</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-emerald-400">+50 pts</span>
              </div>
              <div className="flex items-center justify-between border-b border-border-subtle pb-3">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded bg-amber-500/10 text-amber-500 flex items-center justify-center"><Zap className="h-4 w-4" /></div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">Early Warning Bonus</p>
                    <p className="text-xs text-text-muted">First to report I-95 accident</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-emerald-400">+100 pts</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Badges */}
      <h3 className="text-lg font-semibold text-text-primary mt-8 mb-4">Unlocked Badges</h3>
      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {[
          { icon: ShieldCheck, name: "First Report", color: "emerald", unlocked: true },
          { icon: TrendingUp, name: "Active Citizen", color: "blue", unlocked: true },
          { icon: Star, name: "Top 10%", color: "amber", unlocked: true },
          { icon: Award, name: "Local Hero", color: "purple", unlocked: false },
          { icon: Zap, name: "Fast Reflex", color: "orange", unlocked: false },
          { icon: Gift, name: "Community Savior", color: "pink", unlocked: false },
        ].map((badge, i) => (
          <motion.div key={i} variants={staggerItem}>
            <Card className={`h-full text-center transition-all ${badge.unlocked ? "border-primary/30 bg-primary/5 hover:border-primary/50" : "opacity-50 grayscale"}`}>
              <CardContent className="p-4 flex flex-col items-center justify-center gap-3">
                <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                  badge.unlocked ? `bg-${badge.color}-500/20 text-${badge.color}-500 shadow-[0_0_15px_rgba(var(--${badge.color}-500),0.2)]` : "bg-bg-elevated text-text-muted"
                }`}>
                  <badge.icon className="h-6 w-6" />
                </div>
                <h4 className="text-sm font-medium text-text-primary">{badge.name}</h4>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
