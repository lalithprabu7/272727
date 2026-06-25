"use client";

import { motion } from "framer-motion";
import { Car, Wrench, Battery, Thermometer, Gauge, AlertCircle, CheckCircle2, AlertTriangle, Calendar } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScoreGauge } from "@/components/shared/score-gauge";
import { mockVehicles } from "@/data/mock";
import { staggerContainer, staggerItem } from "@/lib/constants";

export default function VehicleHealthPage() {
  const vehicle = mockVehicles[0];

  const systems = [
    { name: "Engine", status: "ok", icon: Gauge, value: "Optimal" },
    { name: "Battery", status: "ok", icon: Battery, value: "96%" },
    { name: "Tire Pressure", status: "warning", icon: AlertCircle, value: "Low (RL)" },
    { name: "Brakes", status: "ok", icon: AlertCircle, value: "Good" },
    { name: "Coolant", status: "ok", icon: Thermometer, value: "Normal" },
    { name: "Transmission", status: "ok", icon: Wrench, value: "Optimal" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Vehicle Health"
        description="Monitor diagnostics, maintenance schedules, and component status."
        breadcrumbs={[
          { label: "Home", href: "/driver" },
          { label: "Vehicle Health" },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={staggerItem} initial="initial" animate="animate" className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5 text-primary" />
                Vehicle Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center pt-2">
              <ScoreGauge score={vehicle.healthScore ?? 96} label="Overall Health" size="lg" />
              
              <div className="w-full mt-8 space-y-4">
                <div className="p-4 rounded-lg bg-bg-elevated border border-border-subtle flex justify-between items-center">
                  <div>
                    <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">Model</p>
                    <p className="text-sm font-medium mt-1">{vehicle.year} {vehicle.make} {vehicle.model}</p>
                  </div>
                  <Badge variant="outline">{vehicle.plateNumber}</Badge>
                </div>
                
                <div className="p-4 rounded-lg bg-bg-elevated border border-border-subtle flex justify-between items-center">
                  <div>
                    <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">Mileage</p>
                    <p className="text-sm font-medium mt-1">{vehicle.mileage?.toLocaleString()} mi</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">Next Service</p>
                    <p className="text-sm font-medium mt-1 text-amber-400">In 1,550 mi</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={staggerItem} initial="initial" animate="animate" className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-blue-400" />
                System Diagnostics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {systems.map((system) => (
                  <div key={system.name} className="flex items-center p-4 rounded-xl border border-border-subtle bg-bg-root">
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 mr-4 ${
                      system.status === "ok" ? "bg-emerald-400/10 text-emerald-400" : "bg-amber-400/10 text-amber-400"
                    }`}>
                      <system.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text-primary">{system.name}</p>
                      <p className={`text-xs mt-0.5 ${system.status === "ok" ? "text-text-muted" : "text-amber-400"}`}>
                        {system.value}
                      </p>
                    </div>
                    <div>
                      {system.status === "ok" ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-amber-400 animate-pulse" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-amber-400">Maintenance Recommendation</h4>
                  <p className="text-sm text-text-secondary mt-1">Rear left tire pressure is slightly below optimal levels (32 PSI). Consider inflating to 36 PSI to improve fuel efficiency and tire longevity.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
