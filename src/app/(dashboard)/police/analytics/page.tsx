"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp, AlertTriangle, Shield, Calendar } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/shared/stat-card";
import { staggerContainer, staggerItem } from "@/lib/constants";
import { mockAnalyticsData } from "@/data/mock";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell,
} from "recharts";

export default function AccidentAnalyticsPage() {
  const data = mockAnalyticsData;

  const hotspots = [
    { name: "Downtown Intersection", accidents: 14, severity: "High" },
    { name: "I-95 Northbound", accidents: 9, severity: "Critical" },
    { name: "5th Ave Shopping Dist.", accidents: 7, severity: "Medium" },
    { name: "Westside Highway", accidents: 5, severity: "High" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Accident Analytics"
        description="Data-driven insights into accident trends, hotspots, and historical data."
        breadcrumbs={[
          { label: "Home", href: "/police" },
          { label: "Analytics" },
        ]}
      />

      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Accidents" value={142} change={-5} trend="down" icon={AlertTriangle} color="text-red-400" description="Year to date" />
        <StatCard label="Critical Injuries" value={12} change={-18} trend="down" icon={Shield} color="text-orange-400" />
        <StatCard label="Hotspots Identified" value={8} icon={TrendingUp} color="text-amber-400" description="AI analyzed" />
        <StatCard label="Safety Compliance" value="84%" change={2} trend="up" icon={BarChart3} color="text-emerald-400" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Incident Trend */}
        <motion.div variants={staggerItem} initial="initial" animate="animate" className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-400" />
                Accident Trend (Monthly)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.monthlyIncidents}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "#111827", border: "1px solid #374151", borderRadius: "8px", color: "#fff" }} />
                  <Bar dataKey="accidents" fill="#DC2626" radius={[4, 4, 0, 0]} name="Accidents" />
                  <Bar dataKey="hazards" fill="#F59E0B" radius={[4, 4, 0, 0]} name="Hazards" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Severity */}
        <motion.div variants={staggerItem} initial="initial" animate="animate">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-400" />
                Severity Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={data.incidentsBySeverity} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
                    {data.incidentsBySeverity.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "#111827", border: "1px solid #374151", borderRadius: "8px", color: "#fff" }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {data.incidentsBySeverity.map((item) => (
                  <div key={item.name} className="flex items-center gap-2 text-xs">
                    <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-text-secondary">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Hotspots */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            AI-Identified Accident Hotspots
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hotspots.map((hotspot) => (
            <div key={hotspot.name} className="flex items-center justify-between p-4 rounded-lg border border-border-subtle bg-bg-elevated hover:border-red-500/50 transition-colors">
              <div>
                <p className="font-semibold text-text-primary">{hotspot.name}</p>
                <p className="text-xs text-text-muted mt-1">{hotspot.accidents} accidents this year</p>
              </div>
              <Badge variant={hotspot.severity === "Critical" ? "danger" : hotspot.severity === "High" ? "warning" : "default"}>
                {hotspot.severity} Risk
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
