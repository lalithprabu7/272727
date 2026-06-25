"use client";

import { motion } from "framer-motion";
import { MapPin, AlertTriangle, Shield, Heart, Route, Phone, Clock, Activity } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { ScoreGauge } from "@/components/shared/score-gauge";
import { staggerContainer, staggerItem } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockDrivers, mockTrips } from "@/data/mock";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const weeklyActivity = [
  { name: "Mon", trips: 5, alerts: 1 },
  { name: "Tue", trips: 7, alerts: 0 },
  { name: "Wed", trips: 4, alerts: 2 },
  { name: "Thu", trips: 8, alerts: 0 },
  { name: "Fri", trips: 6, alerts: 1 },
  { name: "Sat", trips: 3, alerts: 0 },
  { name: "Sun", trips: 2, alerts: 0 },
];

export default function FamilyDashboard() {
  const driver = mockDrivers[0];
  const recentTrips = mockTrips.filter((t) => t.driverId === driver.id).slice(0, 3);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Family Dashboard"
        description="Keep your loved ones safe with real-time monitoring and alerts."
        breadcrumbs={[{ label: "Home", href: "/family" }, { label: "Dashboard" }]}
        actions={
          <Button variant="destructive" size="sm">
            <Phone className="h-4 w-4" /> Emergency Call
          </Button>
        }
      />

      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Driver Status" value="Online" icon={Activity} color="text-emerald-400" description="Alex Morgan is active" />
        <StatCard label="Safety Score" value={driver.safetyScore} change={3.2} trend="up" icon={Shield} color="text-blue-400" />
        <StatCard label="Active Alerts" value={1} icon={AlertTriangle} color="text-amber-400" description="1 unacknowledged alert" />
        <StatCard label="Today's Distance" value="18.7 km" icon={Route} color="text-purple-400" description="2 trips completed" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Driver Location Card */}
        <motion.div variants={staggerItem} initial="initial" animate="animate" className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-emerald-400" />
                Live Driver Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl bg-bg-elevated border border-border-subtle h-[300px] flex items-center justify-center">
                <div className="text-center space-y-3">
                  <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-2xl bg-emerald-400/10">
                    <MapPin className="h-8 w-8 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">Alex Morgan</p>
                    <p className="text-xs text-text-muted">Last seen: Times Square, NYC</p>
                    <p className="text-xs text-emerald-400 mt-1">● Online — 2 min ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Safety Score */}
        <motion.div variants={staggerItem} initial="initial" animate="animate">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-rose-400" />
                Driver Health
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-6 py-4">
              <ScoreGauge score={driver.safetyScore} label="Safety Score" size="lg" />
              <div className="w-full space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Fatigue Level</span>
                  <Badge variant="success">Low</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Stress Level</span>
                  <Badge variant="success">Normal</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Last Break</span>
                  <span className="text-text-primary font-medium">45 min ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-400" />
              Weekly Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={weeklyActivity}>
                <defs>
                  <linearGradient id="familyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "#111827", border: "1px solid #374151", borderRadius: "8px", color: "#fff" }} />
                <Area type="monotone" dataKey="trips" stroke="#8B5CF6" strokeWidth={2} fill="url(#familyGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Trips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Route className="h-5 w-5 text-purple-400" />
              Recent Trips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentTrips.map((trip) => (
              <div key={trip.id} className="flex items-center gap-4 rounded-lg border border-border-subtle p-4 hover:bg-bg-elevated transition-colors">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-400/10 shrink-0">
                  <Route className="h-5 w-5 text-purple-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">{trip.startAddress ?? "Unknown"} → {trip.endAddress ?? "In Progress"}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-text-muted">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{trip.duration ? `${Math.round(trip.duration / 60)}m` : "Active"}</span>
                    {trip.distance && <span>{trip.distance.toFixed(1)} km</span>}
                  </div>
                </div>
                <Badge variant={trip.safetyScore && trip.safetyScore >= 90 ? "success" : "warning"}>
                  {trip.safetyScore ?? "—"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
