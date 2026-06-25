"use client";

import { motion } from "framer-motion";
import {
  Car,
  MapPin,
  Shield,
  AlertTriangle,
  Fuel,
  Route,
  TrendingUp,
  Activity,
  Clock,
  Zap,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { staggerContainer, staggerItem } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockDrivers, mockTrips, mockAIAlerts, mockAnalyticsData } from "@/data/mock";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const drivingData = [
  { name: "Mon", score: 88, trips: 5 },
  { name: "Tue", score: 91, trips: 7 },
  { name: "Wed", score: 85, trips: 4 },
  { name: "Thu", score: 93, trips: 8 },
  { name: "Fri", score: 90, trips: 6 },
  { name: "Sat", score: 95, trips: 3 },
  { name: "Sun", score: 92, trips: 2 },
];

const fuelData = [
  { name: "Mon", consumption: 12.4 },
  { name: "Tue", consumption: 15.2 },
  { name: "Wed", consumption: 10.8 },
  { name: "Thu", consumption: 18.1 },
  { name: "Fri", consumption: 14.3 },
  { name: "Sat", consumption: 8.7 },
  { name: "Sun", consumption: 6.2 },
];

export default function DriverDashboard() {
  const driver = mockDrivers[0];
  const recentTrips = mockTrips.filter((t) => t.driverId === driver.id).slice(0, 3);
  const recentAlerts = mockAIAlerts.filter((a) => a.driverId === driver.id).slice(0, 3);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Driver Dashboard"
        description="Monitor your driving performance, safety metrics, and vehicle health."
        breadcrumbs={[
          { label: "Home", href: "/driver" },
          { label: "Dashboard" },
        ]}
      />

      {/* Stats Grid */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <StatCard
          label="Safety Score"
          value={driver.safetyScore}
          change={3.2}
          trend="up"
          icon={Shield}
          color="text-emerald-400"
          description="Based on last 30 days"
        />
        <StatCard
          label="Total Trips"
          value={driver.totalTrips.toLocaleString()}
          change={12}
          trend="up"
          icon={Route}
          color="text-blue-400"
        />
        <StatCard
          label="Total Distance"
          value={`${(driver.totalDistance / 1000).toFixed(1)}K km`}
          change={8.5}
          trend="up"
          icon={MapPin}
          color="text-purple-400"
        />
        <StatCard
          label="AI Alerts"
          value={recentAlerts.length}
          change={-15}
          trend="down"
          icon={AlertTriangle}
          color="text-amber-400"
          description="Fewer alerts is better"
        />
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={staggerItem} initial="initial" animate="animate">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Driving Score Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={drivingData}>
                  <defs>
                    <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis domain={[70, 100]} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#111827",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#2563EB"
                    strokeWidth={2}
                    fill="url(#scoreGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={staggerItem} initial="initial" animate="animate">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Fuel className="h-5 w-5 text-amber-400" />
                Fuel Consumption
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={fuelData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#111827",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />
                  <Bar
                    dataKey="consumption"
                    fill="#F59E0B"
                    radius={[6, 6, 0, 0]}
                    opacity={0.8}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Trips & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Trips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5 text-blue-400" />
              Recent Trips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentTrips.map((trip) => (
              <div
                key={trip.id}
                className="flex items-center gap-4 rounded-lg border border-border-subtle p-4 hover:bg-bg-elevated transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-400/10 shrink-0">
                  <Route className="h-5 w-5 text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">
                    {trip.startAddress ?? "Unknown"} → {trip.endAddress ?? "In Progress"}
                  </p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-text-muted">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {trip.duration ? `${Math.round(trip.duration / 60)}m` : "Active"}
                    </span>
                    {trip.distance && (
                      <span>{trip.distance.toFixed(1)} km</span>
                    )}
                  </div>
                </div>
                <Badge variant={trip.status === "completed" ? "success" : trip.status === "in_progress" ? "default" : "warning"}>
                  {trip.status.replace("_", " ")}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AI Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-amber-400" />
              AI Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-center gap-4 rounded-lg border border-border-subtle p-4 hover:bg-bg-elevated transition-colors"
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg shrink-0 ${
                  alert.severity === "high" ? "bg-red-400/10" : "bg-amber-400/10"
                }`}>
                  <AlertTriangle className={`h-5 w-5 ${
                    alert.severity === "high" ? "text-red-400" : "text-amber-400"
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">
                    {alert.message}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-text-muted">
                    <span>{alert.type.replace("_", " ")}</span>
                    <span>•</span>
                    <span>{Math.round(alert.confidence * 100)}% confidence</span>
                  </div>
                </div>
                <Badge variant={alert.severity === "high" ? "danger" : "warning"}>
                  {alert.severity}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
