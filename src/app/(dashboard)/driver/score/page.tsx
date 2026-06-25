"use client";

import { motion } from "framer-motion";
import { Shield, TrendingUp, AlertTriangle, Zap, Activity, Award, Trophy } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScoreGauge } from "@/components/shared/score-gauge";
import { mockDrivers } from "@/data/mock";
import { staggerContainer, staggerItem } from "@/lib/constants";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";

const skillData = [
  { subject: 'Speed Control', A: 92, fullMark: 100 },
  { subject: 'Smooth Braking', A: 85, fullMark: 100 },
  { subject: 'Cornering', A: 88, fullMark: 100 },
  { subject: 'Attention', A: 95, fullMark: 100 },
  { subject: 'Following Dist.', A: 89, fullMark: 100 },
  { subject: 'Acceleration', A: 94, fullMark: 100 },
];

export default function DriverScorePage() {
  const driver = mockDrivers[0];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Driver Score"
        description="Detailed breakdown of your driving behavior and AI safety analysis."
        breadcrumbs={[
          { label: "Home", href: "/driver" },
          { label: "Driver Score" },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={staggerItem} initial="initial" animate="animate" className="lg:col-span-1">
          <Card className="h-full bg-gradient-to-b from-bg-card to-primary/5">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-text-muted text-sm font-normal uppercase tracking-wider">Overall Safety Score</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center pt-4 pb-8">
              <ScoreGauge score={driver.safetyScore ?? 92} label="" size="lg" />
              <div className="mt-6 flex items-center gap-2 text-emerald-400 bg-emerald-400/10 px-4 py-1.5 rounded-full text-sm font-medium">
                <TrendingUp className="h-4 w-4" /> Top 5% of drivers
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={staggerItem} initial="initial" animate="animate" className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-400" />
                Skill Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillData}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: "#9CA3AF", fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Score" dataKey="A" stroke="#2563EB" fill="#2563EB" fillOpacity={0.4} strokeWidth={2} />
                  <Tooltip contentStyle={{ backgroundColor: "#111827", border: "1px solid #374151", borderRadius: "8px", color: "#fff" }} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard label="Smooth Braking" value="85/100" change={-2} trend="down" icon={Zap} color="text-amber-400" description="Needs improvement" />
        <StatCard label="Speed Control" value="92/100" change={5} trend="up" icon={Activity} color="text-emerald-400" description="Excellent" />
        <StatCard label="Safe Distance" value="89/100" change={0} trend="neutral" icon={Shield} color="text-blue-400" description="Good" />
      </motion.div>
      
      {/* Achievements / Coaching */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-400" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-amber-400/20 flex items-center justify-center">
                <Award className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-medium">Safe Driver Streak</p>
                <p className="text-xs text-text-muted">14 consecutive days without hard braking</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                <Shield className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium">Speed Limit Pro</p>
                <p className="text-xs text-text-muted">Maintained legal speeds for 500+ miles</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-purple-400" />
              AI Coaching Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 rounded-lg border border-purple-500/20 bg-purple-500/5 text-sm">
              <span className="font-semibold text-purple-400">Tip:</span> Your braking tends to be sharper during morning traffic. Try increasing following distance by 1 car length to allow smoother deceleration.
            </div>
            <div className="p-3 rounded-lg border border-border-default bg-bg-elevated text-sm text-text-secondary">
              Consistent speed control on highways has improved your fuel efficiency by 4% this week. Keep it up!
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
