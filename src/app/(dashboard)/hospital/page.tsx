"use client";

import { motion } from "framer-motion";
import { Siren, Bed, Stethoscope, Ambulance, Timer, Activity, Users, HeartPulse, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { staggerContainer, staggerItem } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockHospitals, mockAmbulances, mockEmergencies } from "@/data/mock";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
} from "recharts";

const bedUtilization = [
  { name: "General", total: 450, occupied: 412 },
  { name: "ICU", total: 60, occupied: 55 },
  { name: "Emergency", total: 30, occupied: 24 },
  { name: "Surgery", total: 20, occupied: 18 },
  { name: "Pediatric", total: 40, occupied: 28 },
];

const resourceMetrics = [
  { metric: "Doctors", value: 85 },
  { metric: "Nurses", value: 78 },
  { metric: "Beds", value: 92 },
  { metric: "Equipment", value: 95 },
  { metric: "Ambulances", value: 70 },
  { metric: "Supplies", value: 88 },
];

export default function HospitalDashboard() {
  const hospital = mockHospitals[0];
  const ambulances = mockAmbulances.filter((a) => a.hospitalId === hospital.id);
  const availableAmbulances = ambulances.filter((a) => a.status === "available");
  const activeEmergencies = mockEmergencies.filter((e) => e.hospitalId === hospital.id && e.status !== "resolved");

  return (
    <div className="space-y-8">
      <PageHeader
        title="Hospital Dashboard"
        description="Emergency coordination, resource management, and patient care oversight."
        breadcrumbs={[{ label: "Home", href: "/hospital" }, { label: "Dashboard" }]}
        actions={
          <Badge variant="danger" className="text-sm px-3 py-1.5 animate-pulse-glow">
            <Siren className="h-4 w-4 mr-1" /> {activeEmergencies.length} Active Emergencies
          </Badge>
        }
      />

      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Available Beds" value={`${hospital.availableBeds}/${hospital.totalBeds}`} icon={Bed} color="text-emerald-400" description={`${Math.round(((hospital.totalBeds - hospital.availableBeds) / hospital.totalBeds) * 100)}% occupied`} />
        <StatCard label="ICU Available" value={`${hospital.icuAvailable}/${hospital.icuBeds}`} icon={HeartPulse} color="text-red-400" description="Critical care capacity" />
        <StatCard label="Ambulances" value={`${availableAmbulances.length}/${ambulances.length}`} icon={Ambulance} color="text-blue-400" description={`${ambulances.length - availableAmbulances.length} dispatched`} />
        <StatCard label="Avg Wait Time" value="12 min" change={-18} trend="down" icon={Timer} color="text-amber-400" description="18% faster this week" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bed Utilization */}
        <motion.div variants={staggerItem} initial="initial" animate="animate">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bed className="h-5 w-5 text-emerald-400" />
                Bed Utilization by Department
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={bedUtilization}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "#111827", border: "1px solid #374151", borderRadius: "8px", color: "#fff" }} />
                  <Bar dataKey="total" fill="#374151" radius={[6, 6, 0, 0]} name="Total" />
                  <Bar dataKey="occupied" fill="#EC4899" radius={[6, 6, 0, 0]} name="Occupied" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Resource Radar */}
        <motion.div variants={staggerItem} initial="initial" animate="animate">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-pink-400" />
                Resource Availability
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={resourceMetrics}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="metric" tick={{ fill: "#9CA3AF", fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Availability %" dataKey="value" stroke="#EC4899" fill="#EC4899" fillOpacity={0.2} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Emergency Queue */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Siren className="h-5 w-5 text-red-400" />
            Emergency Queue
            <span className="relative flex h-2.5 w-2.5 ml-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockEmergencies.map((emergency) => (
            <div key={emergency.id} className="flex items-center gap-4 rounded-lg border border-border-subtle p-4 hover:bg-bg-elevated transition-colors">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-400/10 shrink-0">
                <Siren className="h-5 w-5 text-red-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-text-primary">{emergency.type}</p>
                  <Badge variant="danger" className="text-[10px]">Priority {emergency.priority}</Badge>
                </div>
                <p className="text-xs text-text-muted mt-0.5">Ambulance dispatched • ETA calculating</p>
              </div>
              <Badge variant={emergency.status === "en_route" ? "default" : emergency.status === "dispatched" ? "warning" : "danger"}>
                {emergency.status.replace("_", " ")}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
