"use client";

import { motion } from "framer-motion";
import { FileText, Search, Eye, Shield, BarChart3, DollarSign, AlertTriangle, TrendingUp, Clock } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { staggerContainer, staggerItem } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockClaims } from "@/data/mock";
import { formatCurrency, formatRelativeTime } from "@/lib/utils";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";

const claimsTrend = [
  { name: "Jan", claims: 45, amount: 320000 },
  { name: "Feb", claims: 38, amount: 275000 },
  { name: "Mar", claims: 52, amount: 410000 },
  { name: "Apr", claims: 41, amount: 295000 },
  { name: "May", claims: 48, amount: 365000 },
  { name: "Jun", claims: 35, amount: 280000 },
];

const claimsByStatus = [
  { name: "Under Review", value: 12, color: "#2563EB" },
  { name: "Approved", value: 28, color: "#16A34A" },
  { name: "Rejected", value: 5, color: "#DC2626" },
  { name: "Paid", value: 22, color: "#8B5CF6" },
  { name: "Submitted", value: 8, color: "#F59E0B" },
];

export default function InsuranceDashboard() {
  const totalClaimValue = mockClaims.reduce((sum, c) => sum + c.claimAmount, 0);
  const highFraudClaims = mockClaims.filter((c) => c.fraudScore && c.fraudScore > 0.5);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Insurance Portal"
        description="Claims processing, fraud detection, evidence analysis, and risk assessment."
        breadcrumbs={[{ label: "Home", href: "/insurance" }, { label: "Dashboard" }]}
      />

      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Claims" value={75} change={-8} trend="down" icon={FileText} color="text-blue-400" description="This month" />
        <StatCard label="Claim Value" value={formatCurrency(totalClaimValue)} icon={DollarSign} color="text-emerald-400" />
        <StatCard label="Fraud Alerts" value={highFraudClaims.length} icon={AlertTriangle} color="text-red-400" description="High-risk detected" />
        <StatCard label="Avg Processing" value="3.2 days" change={-22} trend="down" icon={Clock} color="text-amber-400" description="22% faster" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Claims Trend */}
        <motion.div variants={staggerItem} initial="initial" animate="animate" className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-400" />
                Claims Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={claimsTrend}>
                  <defs>
                    <linearGradient id="claimsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "#111827", border: "1px solid #374151", borderRadius: "8px", color: "#fff" }} />
                  <Area type="monotone" dataKey="claims" stroke="#F59E0B" strokeWidth={2} fill="url(#claimsGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Status Breakdown */}
        <motion.div variants={staggerItem} initial="initial" animate="animate">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-amber-400" />
                Claims by Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={claimsByStatus} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                    {claimsByStatus.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "#111827", border: "1px solid #374151", borderRadius: "8px", color: "#fff" }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-4">
                {claimsByStatus.map((item) => (
                  <div key={item.name} className="flex items-center gap-2 text-xs">
                    <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-text-secondary flex-1">{item.name}</span>
                    <span className="font-medium text-text-primary">{item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Claims */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-400" />
            Recent Claims
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockClaims.map((claim) => (
            <div key={claim.id} className="flex items-center gap-4 rounded-lg border border-border-subtle p-4 hover:bg-bg-elevated transition-colors">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg shrink-0 ${
                (claim.fraudScore ?? 0) > 0.5 ? "bg-red-400/10" : "bg-blue-400/10"
              }`}>
                {(claim.fraudScore ?? 0) > 0.5 ? (
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                ) : (
                  <FileText className="h-5 w-5 text-blue-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-text-primary">{claim.claimantName}</p>
                  {(claim.fraudScore ?? 0) > 0.5 && (
                    <Badge variant="danger" className="text-[10px]">⚠ Fraud Risk</Badge>
                  )}
                </div>
                <p className="text-xs text-text-muted mt-0.5">{claim.policyNumber} • {formatCurrency(claim.claimAmount)}</p>
                <p className="text-xs text-text-muted">{formatRelativeTime(claim.createdAt)}</p>
              </div>
              <Badge variant={claim.status === "approved" ? "success" : claim.status === "rejected" ? "danger" : claim.status === "under_review" ? "default" : "warning"}>
                {claim.status.replace("_", " ")}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
