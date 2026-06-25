"use client";

import { motion } from "framer-motion";
import { Siren, Radio, MapPin, Scale, Shield, Users, BarChart3, AlertTriangle, Clock, Eye } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { staggerContainer, staggerItem } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockIncidents, mockEmergencies, mockOfficers } from "@/data/mock";
import { formatRelativeTime } from "@/lib/utils";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";

const hourlyIncidents = [
  { name: "00:00", incidents: 2 }, { name: "04:00", incidents: 1 },
  { name: "08:00", incidents: 8 }, { name: "12:00", incidents: 6 },
  { name: "16:00", incidents: 9 }, { name: "20:00", incidents: 5 },
];

const severityData = [
  { name: "Critical", value: 4, color: "#DC2626" },
  { name: "High", value: 8, color: "#F97316" },
  { name: "Medium", value: 15, color: "#F59E0B" },
  { name: "Low", value: 23, color: "#16A34A" },
];

export default function PoliceDashboard() {
  const activeIncidents = mockIncidents.filter((i) => i.status !== "resolved" && i.status !== "closed");
  const activeEmergencies = mockEmergencies.filter((e) => e.status !== "resolved");
  const onDutyOfficers = mockOfficers.filter((o) => o.isOnDuty);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Police Command Center"
        description="Real-time incident management, dispatch coordination, and traffic enforcement."
        breadcrumbs={[{ label: "Home", href: "/police" }, { label: "Dashboard" }]}
        actions={
          <Button variant="destructive" size="sm">
            <Radio className="h-4 w-4" /> Emergency Dispatch
          </Button>
        }
      />

      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Active Incidents" value={activeIncidents.length} icon={Siren} color="text-red-400" description="Requiring attention" />
        <StatCard label="Active Emergencies" value={activeEmergencies.length} icon={AlertTriangle} color="text-amber-400" />
        <StatCard label="Officers On Duty" value={onDutyOfficers.length} icon={Shield} color="text-blue-400" description={`of ${mockOfficers.length} total`} />
        <StatCard label="Avg Response Time" value="4.2 min" change={-12} trend="down" icon={Clock} color="text-emerald-400" description="12% faster this week" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Incident Timeline */}
        <motion.div variants={staggerItem} initial="initial" animate="animate" className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-red-400" />
                Incident Activity (Today)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={hourlyIncidents}>
                  <defs>
                    <linearGradient id="policeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#DC2626" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#DC2626" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "#111827", border: "1px solid #374151", borderRadius: "8px", color: "#fff" }} />
                  <Area type="monotone" dataKey="incidents" stroke="#DC2626" strokeWidth={2} fill="url(#policeGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Severity Breakdown */}
        <motion.div variants={staggerItem} initial="initial" animate="animate">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-amber-400" />
                By Severity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={severityData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                    {severityData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "#111827", border: "1px solid #374151", borderRadius: "8px", color: "#fff" }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {severityData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2 text-xs">
                    <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-text-secondary">{item.name}</span>
                    <span className="ml-auto font-medium text-text-primary">{item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Live Incidents */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Siren className="h-5 w-5 text-red-400" />
              Live Incidents
              <span className="relative flex h-2.5 w-2.5 ml-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
              </span>
            </CardTitle>
            <Button variant="outline" size="sm"><Eye className="h-4 w-4" /> View All</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockIncidents.filter((i) => i.status !== "closed").map((incident) => (
            <div key={incident.id} className="flex items-center gap-4 rounded-lg border border-border-subtle p-4 hover:bg-bg-elevated transition-colors">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg shrink-0 ${
                incident.severity === "critical" ? "bg-red-400/10" : incident.severity === "high" ? "bg-orange-400/10" : "bg-amber-400/10"
              }`}>
                <Siren className={`h-5 w-5 ${
                  incident.severity === "critical" ? "text-red-400" : incident.severity === "high" ? "text-orange-400" : "text-amber-400"
                }`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-text-primary">{incident.type}</p>
                  <Badge variant={incident.severity === "critical" || incident.severity === "high" ? "danger" : "warning"} className="text-[10px]">
                    {incident.severity}
                  </Badge>
                </div>
                <p className="text-xs text-text-muted mt-0.5 truncate">{incident.address}</p>
                <p className="text-xs text-text-muted">{formatRelativeTime(incident.createdAt)}</p>
              </div>
              <Badge variant={incident.status === "dispatched" ? "default" : incident.status === "in_progress" ? "default" : "warning"}>
                {incident.status.replace("_", " ")}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
