"use client";

import { motion } from "framer-motion";
import { TrendingUp, ShieldCheck, Activity, Users, FileText, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/shared/stat-card";
import { staggerContainer, staggerItem } from "@/lib/constants";

// Mock data for analytics
const mockAnalytics = [
  { group: "High Safety Score (>90)", count: 4250, claimsRatio: "0.2%", premiumAdj: "-15%" },
  { group: "Average Safety Score (70-89)", count: 8100, claimsRatio: "1.5%", premiumAdj: "0%" },
  { group: "Low Safety Score (<70)", count: 1200, claimsRatio: "8.4%", premiumAdj: "+20%" },
];

export default function PolicyholderAnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Policyholder Analytics & Premiums"
        description="Analyze global telematics data to dynamically adjust premiums based on real-world driving behavior."
        breadcrumbs={[
          { label: "Home", href: "/insurance" },
          { label: "Analytics" },
        ]}
      />

      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Connected Policies" value="13,550" icon={Users} color="text-blue-400" />
        <StatCard label="Avg. Portfolio Safety" value="84/100" icon={ShieldCheck} color="text-emerald-400" />
        <StatCard label="Live Vehicles" value="2,140" icon={Activity} color="text-amber-400" />
        <StatCard label="Claim Reduction (YoY)" value="-24%" icon={TrendingUp} color="text-emerald-400" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3 border-b border-border-subtle">
            <CardTitle className="text-lg">Telematics Risk Segmentation</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-text-muted uppercase bg-bg-elevated border-b border-border-subtle">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Driver Risk Cohort</th>
                    <th className="px-6 py-4 font-semibold">Total Policies</th>
                    <th className="px-6 py-4 font-semibold">Claims Ratio</th>
                    <th className="px-6 py-4 font-semibold text-right">Dynamic Premium Adj.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {mockAnalytics.map((row, i) => (
                    <tr key={i} className="hover:bg-bg-elevated/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-text-primary">
                        <div className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${
                            i === 0 ? "bg-emerald-500" : i === 1 ? "bg-blue-500" : "bg-red-500"
                          }`} />
                          {row.group}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono">{row.count.toLocaleString()}</td>
                      <td className="px-6 py-4 font-mono">{row.claimsRatio}</td>
                      <td className="px-6 py-4 text-right">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          row.premiumAdj.startsWith("-") ? "bg-emerald-500/20 text-emerald-400" : 
                          row.premiumAdj.startsWith("+") ? "bg-red-500/20 text-red-400" : "bg-bg-root text-text-muted border border-border-default"
                        }`}>
                          {row.premiumAdj}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3 border-b border-border-subtle">
            <CardTitle className="text-lg">Premium Automation</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-text-primary">SafeDrive+ Auto-Adjustments</h4>
              <p className="text-xs text-text-muted leading-relaxed">
                The smart contract system will automatically adjust monthly premiums for the upcoming billing cycle based on the last 30 days of telematics scoring.
              </p>
            </div>
            
            <div className="space-y-4 pt-4 border-t border-border-subtle">
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">Next Sync:</span>
                <span className="font-mono text-text-primary">Nov 1, 00:00 UTC</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">Policies to Update:</span>
                <span className="font-mono text-blue-400">13,550</span>
              </div>
              <Button className="w-full mt-2" variant="default">
                <CheckCircle2 className="h-4 w-4 mr-2" /> Force Manual Sync
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
