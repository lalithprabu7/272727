"use client";

import { motion } from "framer-motion";
import { Activity, Server, Database, Globe, Cpu, AlertTriangle } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/shared/stat-card";
import { Progress } from "@/components/ui/progress";
import { staggerContainer, staggerItem } from "@/lib/constants";

export default function SystemHealthPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="System Health & Infrastructure"
        description="Monitor API latency, database health, and core WebSocket infrastructure for the SafeDrive+ ecosystem."
        breadcrumbs={[
          { label: "Home", href: "/admin" },
          { label: "System Health" },
        ]}
      />

      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="API Uptime" value="99.99%" icon={Globe} color="text-emerald-400" />
        <StatCard label="Global Latency" value="42ms" icon={Activity} color="text-emerald-400" />
        <StatCard label="Active WebSocket Conns" value="24,501" icon={Server} color="text-blue-400" />
        <StatCard label="AI Inference Queue" value="12ms" icon={Cpu} color="text-emerald-400" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3 border-b border-border-subtle">
            <CardTitle className="text-lg flex items-center gap-2">
              <Database className="h-5 w-5 text-blue-500" /> Database Clusters
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Primary Cluster (US-East)</span>
                <span className="text-emerald-400">Healthy</span>
              </div>
              <div className="flex items-center gap-4">
                <Progress value={45} className="h-2 flex-1" />
                <span className="text-xs text-text-muted w-16 text-right">45% Load</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Replica (EU-West)</span>
                <span className="text-emerald-400">Healthy</span>
              </div>
              <div className="flex items-center gap-4">
                <Progress value={28} className="h-2 flex-1" />
                <span className="text-xs text-text-muted w-16 text-right">28% Load</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Telemetry Cache (Redis)</span>
                <span className="text-amber-400 flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> High Usage</span>
              </div>
              <div className="flex items-center gap-4">
                <Progress value={88} className="h-2 flex-1" indicatorClassName="bg-amber-500" />
                <span className="text-xs text-text-muted w-16 text-right">88% Load</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3 border-b border-border-subtle">
            <CardTitle className="text-lg flex items-center gap-2">
              <Server className="h-5 w-5 text-purple-500" /> Microservices Status
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border-subtle">
              {[
                { name: "Auth Service", status: "Operational", ping: "12ms" },
                { name: "Telematics Ingestion", status: "Operational", ping: "8ms" },
                { name: "AI Fraud Detection Engine", status: "Operational", ping: "45ms" },
                { name: "Push Notification Gateway", status: "Degraded", ping: "210ms" },
                { name: "Geofencing Evaluator", status: "Operational", ping: "15ms" },
              ].map((service, i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-bg-elevated transition-colors">
                  <span className="font-medium text-sm text-text-primary">{service.name}</span>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-text-muted">{service.ping}</span>
                    <div className="flex items-center gap-1.5">
                      <div className={`h-2 w-2 rounded-full ${service.status === "Operational" ? "bg-emerald-500" : "bg-amber-500 animate-pulse"}`} />
                      <span className={`text-xs ${service.status === "Operational" ? "text-emerald-400" : "text-amber-400"}`}>{service.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
