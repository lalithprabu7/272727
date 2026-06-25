"use client";

import { motion } from "framer-motion";
import { Search, Filter, Shield, Clock, Terminal } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { staggerContainer, staggerItem } from "@/lib/constants";
import { mockAuditLogs } from "@/data/mock";
import { formatRelativeTime } from "@/lib/utils";

export default function AuditLogsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Security Audit Logs"
        description="Immutable record of critical system actions, authentication events, and data access across the platform."
        breadcrumbs={[
          { label: "Home", href: "/admin" },
          { label: "Audit Logs" },
        ]}
      />

      <Card>
        <CardHeader className="pb-3 border-b border-border-subtle bg-bg-elevated">
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
              <Input placeholder="Search logs by user, action, or IP address..." className="pl-10 w-full font-mono text-sm" />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                <Filter className="h-4 w-4 mr-2" /> Time Range
              </Button>
              <Button size="sm" className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700">
                <Terminal className="h-4 w-4 mr-2" /> Export CSV
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-text-muted uppercase bg-bg-root border-b border-border-subtle">
                <tr>
                  <th className="px-6 py-4 font-semibold">Timestamp</th>
                  <th className="px-6 py-4 font-semibold">Action</th>
                  <th className="px-6 py-4 font-semibold">Actor</th>
                  <th className="px-6 py-4 font-semibold">Target Entity</th>
                  <th className="px-6 py-4 font-semibold">IP Address</th>
                </tr>
              </thead>
              <motion.tbody variants={staggerContainer} initial="initial" animate="animate" className="divide-y divide-border-subtle font-mono text-xs">
                {mockAuditLogs.map((log) => (
                  <motion.tr key={log.id} variants={staggerItem} className="hover:bg-bg-elevated/50 transition-colors">
                    <td className="px-6 py-4 text-text-muted">
                      {formatRelativeTime(log.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className={`uppercase text-[9px] border ${
                        log.action.includes("UPDATE") || log.action.includes("ASSIGN") ? "border-blue-500/50 text-blue-400" :
                        log.action.includes("LOGIN") ? "border-emerald-500/50 text-emerald-400" :
                        log.action.includes("SUSPEND") ? "border-red-500/50 text-red-400" : "border-border-default text-text-secondary"
                      }`}>
                        {log.action}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Shield className="h-3 w-3 text-text-muted" />
                        <span className="text-text-primary">{log.userName || log.userId}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-text-secondary">
                      {log.entity} <span className="text-text-muted">({log.entityId})</span>
                    </td>
                    <td className="px-6 py-4 text-text-muted">
                      {log.ipAddress}
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
