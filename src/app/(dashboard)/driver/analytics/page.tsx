"use client";

import { motion } from "framer-motion";
import { BarChart3, Activity, ArrowUpRight, ArrowDownRight, Target } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { staggerContainer, staggerItem } from "@/lib/constants";

const performanceData = [
  { month: "Jan", score: 82 },
  { month: "Feb", score: 85 },
  { month: "Mar", score: 84 },
  { month: "Apr", score: 89 },
  { month: "May", score: 92 },
  { month: "Jun", score: 95 },
];

const skillsData = [
  { subject: "Braking", A: 85, fullMark: 100 },
  { subject: "Speed", A: 90, fullMark: 100 },
  { subject: "Cornering", A: 78, fullMark: 100 },
  { subject: "Awareness", A: 95, fullMark: 100 },
  { subject: "Acceleration", A: 88, fullMark: 100 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Driving Analytics"
        description="Deep dive into your driving behaviors and skill progression."
        breadcrumbs={[
          { label: "Home", href: "/driver" },
          { label: "Insights", href: "/driver/analytics" },
          { label: "Analytics" },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={staggerItem} initial="initial" animate="animate">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Skill Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillsData}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="Driver Skills"
                    dataKey="A"
                    stroke="#2563EB"
                    fill="#2563EB"
                    fillOpacity={0.4}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#111827",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={staggerItem} initial="initial" animate="animate">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-emerald-400" />
                Score Progression (6 Months)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF' }} />
                  <YAxis domain={[60, 100]} axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#111827",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#10B981"
                    strokeWidth={3}
                    dot={{ fill: '#10B981', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium text-text-secondary">Harsh Braking</h3>
              <Activity className="h-4 w-4 text-amber-400" />
            </div>
            <p className="text-2xl font-bold text-text-primary">12 Events</p>
            <p className="text-xs text-emerald-400 flex items-center mt-1">
              <ArrowDownRight className="h-3 w-3 mr-1" /> -15% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium text-text-secondary">Over Speeding</h3>
              <Activity className="h-4 w-4 text-red-400" />
            </div>
            <p className="text-2xl font-bold text-text-primary">3 Events</p>
            <p className="text-xs text-red-400 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +2% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium text-text-secondary">Eco Driving</h3>
              <Activity className="h-4 w-4 text-blue-400" />
            </div>
            <p className="text-2xl font-bold text-text-primary">85% Time</p>
            <p className="text-xs text-emerald-400 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +5% from last month
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
