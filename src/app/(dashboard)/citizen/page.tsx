"use client";

import { motion } from "framer-motion";
import { Flag, MessageSquare, MapPin, AlertTriangle, TrendingUp, ThumbsUp, Eye } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { staggerContainer, staggerItem } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockReports } from "@/data/mock";
import { formatRelativeTime } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const reportsByType = [
  { name: "Hazards", value: 45, fill: "#DC2626" },
  { name: "Potholes", value: 38, fill: "#F59E0B" },
  { name: "Traffic", value: 27, fill: "#2563EB" },
  { name: "Signals", value: 15, fill: "#16A34A" },
  { name: "Other", value: 12, fill: "#8B5CF6" },
];

export default function CitizenDashboard() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Citizen Dashboard"
        description="Report hazards, track complaints, and stay informed about your community."
        breadcrumbs={[{ label: "Home", href: "/citizen" }, { label: "Dashboard" }]}
        actions={
          <Button size="sm">
            <Flag className="h-4 w-4" /> Report Hazard
          </Button>
        }
      />

      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="My Reports" value={12} change={8} trend="up" icon={Flag} color="text-emerald-400" />
        <StatCard label="Resolved" value={8} icon={Eye} color="text-blue-400" description="67% resolution rate" />
        <StatCard label="Nearby Hazards" value={5} icon={AlertTriangle} color="text-amber-400" description="Within 2km radius" />
        <StatCard label="Community Posts" value={156} change={12} trend="up" icon={MessageSquare} color="text-purple-400" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Reports Chart */}
        <motion.div variants={staggerItem} initial="initial" animate="animate">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-400" />
                Reports by Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={reportsByType} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" axisLine={false} tickLine={false} />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={70} />
                  <Tooltip contentStyle={{ backgroundColor: "#111827", border: "1px solid #374151", borderRadius: "8px", color: "#fff" }} />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Nearby Hazard Map Placeholder */}
        <motion.div variants={staggerItem} initial="initial" animate="animate">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-red-400" />
                Nearby Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl bg-bg-elevated border border-border-subtle h-[260px] flex items-center justify-center">
                <div className="text-center space-y-3">
                  <div className="flex h-14 w-14 mx-auto items-center justify-center rounded-2xl bg-red-400/10">
                    <MapPin className="h-7 w-7 text-red-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">5 reports nearby</p>
                    <p className="text-xs text-text-muted">Within 2km of your location</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flag className="h-5 w-5 text-emerald-400" />
            My Recent Reports
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockReports.map((report) => (
            <div key={report.id} className="flex items-center gap-4 rounded-lg border border-border-subtle p-4 hover:bg-bg-elevated transition-colors">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg shrink-0 ${
                report.type === "hazard" ? "bg-red-400/10" : report.type === "road_damage" ? "bg-amber-400/10" : "bg-blue-400/10"
              }`}>
                <AlertTriangle className={`h-5 w-5 ${
                  report.type === "hazard" ? "text-red-400" : report.type === "road_damage" ? "text-amber-400" : "text-blue-400"
                }`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">{report.title}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-text-muted">
                  <span>{formatRelativeTime(report.createdAt)}</span>
                  <span className="flex items-center gap-1"><ThumbsUp className="h-3 w-3" />{report.upvotes}</span>
                  {report.address && <span className="truncate">{report.address}</span>}
                </div>
              </div>
              <Badge variant={report.status === "resolved" ? "success" : report.status === "acknowledged" ? "default" : "warning"}>
                {report.status}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
