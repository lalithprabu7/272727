"use client";

import { motion } from "framer-motion";
import {
  Users, Cpu, Siren, Shield, Globe, TrendingUp, Activity,
  AlertTriangle, BarChart3, Clock, Car, Zap,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { staggerContainer, staggerItem } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockAnalyticsData, mockAuditLogs } from "@/data/mock";
import { formatNumber, formatRelativeTime } from "@/lib/utils";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
} from "recharts";

export default function AdminDashboard() {
  const data = mockAnalyticsData;
  const accidentChange = Math.round(((data.accidentsThisMonth - data.accidentsLastMonth) / data.accidentsLastMonth) * 100);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Admin Dashboard"
        description="Global overview of the SafeDrive+ ecosystem with real-time analytics and system monitoring."
        breadcrumbs={[{ label: "Home", href: "/admin" }, { label: "Dashboard" }]}
        actions={
          <div className="flex items-center gap-2">
            <Badge variant="success" className="text-xs px-3 py-1">
              <span className="relative flex h-2 w-2 mr-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              All Systems Operational
            </Badge>
          </div>
        }
      />

      {/* Primary Stats */}
      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Users" value={formatNumber(data.totalUsers)} change={14} trend="up" icon={Users} color="text-blue-400" />
        <StatCard label="Active Devices" value={formatNumber(data.activeDevices)} change={8} trend="up" icon={Cpu} color="text-purple-400" />
        <StatCard label="Accidents (Month)" value={data.accidentsThisMonth} change={accidentChange} trend="down" icon={Siren} color="text-red-400" description="Fewer is better" />
        <StatCard label="Avg Response Time" value={`${data.emergencyResponseAvg}s`} change={-15} trend="down" icon={Clock} color="text-emerald-400" />
      </motion.div>

      {/* Secondary Stats */}
      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Drivers" value={formatNumber(data.totalDrivers)} icon={Car} color="text-cyan-400" />
        <StatCard label="Total Trips" value={formatNumber(data.totalTrips)} icon={Activity} color="text-indigo-400" />
        <StatCard label="Safety Score Avg" value={data.safetyScoreAvg} change={2.1} trend="up" icon={Shield} color="text-emerald-400" />
        <StatCard label="AI Detections" value="2,847" change={32} trend="up" icon={Zap} color="text-amber-400" description="This month" />
      </motion.div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trip Volume */}
        <motion.div variants={staggerItem} initial="initial" animate="animate" className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-400" />
                Weekly Trip Volume
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={data.weeklyTrips}>
                  <defs>
                    <linearGradient id="adminTripsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "#111827", border: "1px solid #374151", borderRadius: "8px", color: "#fff" }} />
                  <Area type="monotone" dataKey="value" stroke="#6366F1" strokeWidth={2} fill="url(#adminTripsGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Incident Severity */}
        <motion.div variants={staggerItem} initial="initial" animate="animate">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-400" />
                Incidents by Severity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={data.incidentsBySeverity} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
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
                    <span className="ml-auto font-medium text-text-primary">{formatNumber(item.value)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Incidents */}
        <motion.div variants={staggerItem} initial="initial" animate="animate">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-red-400" />
                Monthly Incident Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={data.monthlyIncidents}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "#111827", border: "1px solid #374151", borderRadius: "8px", color: "#fff" }} />
                  <Bar dataKey="accidents" fill="#DC2626" radius={[4, 4, 0, 0]} name="Accidents" />
                  <Bar dataKey="violations" fill="#F59E0B" radius={[4, 4, 0, 0]} name="Violations" />
                  <Bar dataKey="hazards" fill="#2563EB" radius={[4, 4, 0, 0]} name="Hazards" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Response Time */}
        <motion.div variants={staggerItem} initial="initial" animate="animate">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-emerald-400" />
                Response Time by Hour
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={data.responseTimeByHour}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} unit=" min" />
                  <Tooltip contentStyle={{ backgroundColor: "#111827", border: "1px solid #374151", borderRadius: "8px", color: "#fff" }} />
                  <Line type="monotone" dataKey="value" stroke="#16A34A" strokeWidth={2} dot={{ fill: "#16A34A", r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Audit Logs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-indigo-400" />
            Recent Audit Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockAuditLogs.map((log) => (
            <div key={log.id} className="flex items-center gap-4 rounded-lg border border-border-subtle p-4 hover:bg-bg-elevated transition-colors">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-400/10 shrink-0">
                <Activity className="h-5 w-5 text-indigo-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary">{log.action.replace("_", " ")}</p>
                <p className="text-xs text-text-muted mt-0.5">
                  {log.userName} • {log.entity} • {formatRelativeTime(log.createdAt)}
                </p>
              </div>
              <span className="text-xs text-text-muted font-mono">{log.ipAddress}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
