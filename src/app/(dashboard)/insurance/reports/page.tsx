"use client";

import { motion } from "framer-motion";
import { ScrollText, Download, Calendar, BarChart3, TrendingUp, DollarSign, FileText, CheckCircle2, ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/shared/stat-card";
import { staggerContainer, staggerItem } from "@/lib/constants";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const reportData = [
  { month: "Jan", Payouts: 180000, Premiums: 240000 },
  { month: "Feb", Payouts: 145000, Premiums: 245000 },
  { month: "Mar", Payouts: 220000, Premiums: 250000 },
  { month: "Apr", Payouts: 160000, Premiums: 242000 },
  { month: "May", Payouts: 195000, Premiums: 260000 },
  { month: "Jun", Payouts: 130000, Premiums: 270000 },
];

const availableReports = [
  { title: "Monthly Claims Payout Summary", date: "June 2026", format: "PDF, CSV", size: "2.4 MB" },
  { title: "AI Telematics & Fraud False-Positive Audit", date: "Q2 2026", format: "PDF", size: "4.1 MB" },
  { title: "Dynamic Premium Actuarial Adjustments", date: "June 2026", format: "CSV", size: "1.2 MB" },
  { title: "Ecosystem Safety & Liability Report", date: "H1 2026", format: "PDF, XLSX", size: "8.9 MB" },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports & Analytics"
        description="Generate, review, and download insurance financial statements and telematics reports."
        breadcrumbs={[
          { label: "Home", href: "/insurance" },
          { label: "Reports" },
        ]}
      />

      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard label="Total Payouts YTD" value="$1,030,000" change={-12} trend="down" icon={DollarSign} color="text-rose-400" description="12% lower than budget" />
        <StatCard label="Total Premium Income" value="$1,507,000" change={8} trend="up" icon={TrendingUp} color="text-emerald-400" description="8% YoY growth" />
        <StatCard label="Loss Ratio" value="68.3%" change={-4} trend="down" icon={BarChart3} color="text-blue-400" description="Healthy target range" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payouts vs Premiums chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Premiums vs Payouts Trend</CardTitle>
              <CardDescription>Visual comparison of monthly financial inflow and outflow</CardDescription>
            </div>
            <Badge variant="success">YTD Target Achieved</Badge>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={reportData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(val) => `$${val / 1000}k`} />
                  <Tooltip contentStyle={{ backgroundColor: "#111827", border: "1px solid #374151" }} />
                  <Legend />
                  <Bar dataKey="Premiums" fill="#16A34A" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Payouts" fill="#DC2626" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Available Reports list */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <ScrollText className="h-5 w-5 text-amber-400" />
              Download Statements
            </CardTitle>
            <CardDescription>Select standard reports ready for download</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {availableReports.map((report, i) => (
              <div key={i} className="p-3.5 rounded-lg border border-border-subtle hover:bg-bg-elevated transition-colors flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="text-xs font-semibold text-text-primary leading-snug">{report.title}</h4>
                  <div className="flex items-center gap-2 text-[10px] text-text-muted">
                    <span className="flex items-center gap-0.5"><Calendar className="h-2.5 w-2.5" /> {report.date}</span>
                    <span>•</span>
                    <span>{report.format}</span>
                    <span>•</span>
                    <span>{report.size}</span>
                  </div>
                </div>
                <Button size="icon" variant="outline" className="h-8 w-8 shrink-0 text-text-secondary hover:text-text-primary">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
