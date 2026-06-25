"use client";

import { motion } from "framer-motion";
import { LayoutDashboard, AlertCircle, Activity, Shield } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FamilyContactsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Contacts Dashboard"
        description="Comprehensive overview and management for Contacts."
        breadcrumbs={[
          { label: "Home", href: "/family" },
          { label: "Contacts" },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LayoutDashboard className="h-5 w-5 text-primary" />
              System Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col h-48 items-center justify-center rounded-lg border border-dashed border-border-subtle bg-bg-elevated/50 space-y-4">
              <Shield className="h-10 w-10 text-text-muted opacity-50" />
              <p className="text-text-muted">Detailed Contacts data will populate here.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-emerald-400" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-text-secondary">All systems operational.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-400" />
              Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-text-secondary">No current alerts to display.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
