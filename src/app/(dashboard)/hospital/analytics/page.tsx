"use client";

import { motion } from "framer-motion";
import { Siren, Clock, Activity, Shield, Users, BarChart3, TrendingUp, HeartPulse, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/shared/stat-card";
import { staggerContainer, staggerItem } from "@/lib/constants";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  AreaChart, Area, LineChart, Line
} from "recharts";

const intakeData = [
  { name: "Mon", Collision: 12, Medical: 8, Hazard: 4 },
  { name: "Tue", Collision: 15, Medical: 10, Hazard: 3 },
  { name: "Wed", Collision: 8, Medical: 12, Hazard: 6 },
  { name: "Thu", Collision: 18, Medical: 7, Hazard: 2 },
  { name: "Fri", Collision: 22, Medical: 15, Hazard: 5 },
  { name: "Sat", Collision: 30, Medical: 20, Hazard: 8 },
  { name: "Sun", Collision: 25, Medical: 14, Hazard: 10 }
];

const waitTimeData = [
  { time: "08:00", wait: 15 },
  { time: "10:00", wait: 18 },
  { time: "12:00", wait: 24 },
  { time: "14:00", wait: 20 },
  { time: "16:00", wait: 14 },
  { time: "18:00", wait: 22 },
  { time: "20:00", wait: 28 },
  { time: "22:00", wait: 12 }
];

const performanceData = [
  { name: "Trauma Prep", Target: 5, Actual: 4.8 },
  { name: "Triage Intake", Target: 15, Actual: 12 },
  { name: "ICU Admit", Target: 30, Actual: 26 },
  { name: "Ambulance Desp.", Target: 3, Actual: 2.1 }
];

export default function MedicalAnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Medical & Dispatch Analytics"
        description="Review trauma intake history, analyze response metrics, and monitor ER performance trends."
        breadcrumbs={[
          { label: "Home", href: "/hospital" },
          { label: "Medical Analytics" },
        ]}
      />

      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Admissions" value="294" change={12} trend="up" icon={Users} color="text-primary" description="Weekly intake count" />
        <StatCard label="Trauma Response Avg" value="4.8s" change={-14} trend="down" icon={Siren} color="text-red-400" description="Prep-to-admit time" />
        <StatCard label="Critical Success" value="96.2%" change={1.8} trend="up" icon={HeartPulse} color="text-emerald-400" description="Trauma resolution rate" />
        <StatCard label="Patient Satisfaction" value="94.6%" icon={CheckCircle2} color="text-blue-400" description="Discharge exit score" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Intake Sources chart */}
        <motion.div variants={staggerItem} initial="initial" animate="animate">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Weekly Emergency Intake by Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={intakeData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1F2937" />
                  <XAxis dataKey="name" stroke="#6B7280" fontSize={12} axisLine={false} tickLine={false} />
                  <YAxis stroke="#6B7280" fontSize={12} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "#111827", border: "1px solid #374151", borderRadius: "8px", color: "#fff" }} />
                  <Legend verticalAlign="top" height={36} iconType="circle" />
                  <Bar dataKey="Collision" fill="#EC4899" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Medical" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Hazard" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Wait Time trends */}
        <motion.div variants={staggerItem} initial="initial" animate="animate">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-400" />
                ER Wait Time Trends by Hour (Min)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={waitTimeData}>
                  <defs>
                    <linearGradient id="colorWait" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1F2937" />
                  <XAxis dataKey="time" stroke="#6B7280" fontSize={12} axisLine={false} tickLine={false} />
                  <YAxis stroke="#6B7280" fontSize={12} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "#111827", border: "1px solid #374151", borderRadius: "8px", color: "#fff" }} />
                  <Area type="monotone" dataKey="wait" stroke="#F59E0B" fillOpacity={1} fill="url(#colorWait)" strokeWidth={2} name="Wait Time (min)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Target Performance benchmarking */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-emerald-400" />
            Trauma Operations Benchmarks (Minutes)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1F2937" />
              <XAxis dataKey="name" stroke="#6B7280" fontSize={12} axisLine={false} tickLine={false} />
              <YAxis stroke="#6B7280" fontSize={12} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: "#111827", border: "1px solid #374151", borderRadius: "8px", color: "#fff" }} />
              <Legend verticalAlign="top" height={36} />
              <Line type="monotone" dataKey="Target" stroke="#374151" strokeWidth={2} strokeDasharray="5 5" />
              <Line type="monotone" dataKey="Actual" stroke="#10B981" strokeWidth={3} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
