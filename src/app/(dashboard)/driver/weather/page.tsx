"use client";

import { motion } from "framer-motion";
import { CloudRain, Wind, ThermometerSnowflake, Sun, MapPin, AlertCircle } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const alerts = [
  {
    id: 1,
    title: "Heavy Rainfall Warning",
    location: "Highway 401, Exits 20-45",
    time: "Next 2 Hours",
    severity: "High",
    impact: "Reduced visibility, slippery roads.",
    icon: CloudRain,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    id: 2,
    title: "High Wind Gusts",
    location: "Downtown Bridge",
    time: "Ongoing",
    severity: "Medium",
    impact: "Crosswinds may affect handling.",
    icon: Wind,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
  },
  {
    id: 3,
    title: "Black Ice Risk",
    location: "Northern Route",
    time: "Tonight 22:00 - 06:00",
    severity: "High",
    impact: "Extremely slippery conditions. Reduce speed.",
    icon: ThermometerSnowflake,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
  },
];

export default function WeatherPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Weather Alerts"
        description="Real-time weather conditions and road hazard warnings for your route."
        breadcrumbs={[
          { label: "Home", href: "/driver" },
          { label: "Insights", href: "/driver/analytics" },
          { label: "Weather" },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 bg-gradient-to-br from-blue-900/40 to-bg-card border-blue-500/20">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-4 h-full">
            <Sun className="h-16 w-16 text-yellow-400" />
            <div>
              <h2 className="text-4xl font-bold text-text-primary">24°C</h2>
              <p className="text-text-secondary mt-1 flex items-center justify-center gap-1">
                <MapPin className="h-4 w-4" /> Current Location
              </p>
            </div>
            <div className="flex gap-4 text-sm text-text-muted pt-4 border-t border-border-subtle w-full justify-center">
              <span>H: 26° L: 18°</span>
              <span>Precip: 10%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              Active Route Warnings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {alerts.map((alert, idx) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-lg border border-border-subtle bg-bg-elevated/50 hover:bg-bg-elevated transition-colors"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl shrink-0 ${alert.bg}`}>
                  <alert.icon className={`h-6 w-6 ${alert.color}`} />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-text-primary">{alert.title}</h4>
                    <Badge variant={alert.severity === "High" ? "danger" : "warning"}>
                      {alert.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-text-secondary flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {alert.location} • {alert.time}
                  </p>
                  <p className="text-sm text-text-muted mt-2">
                    {alert.impact}
                  </p>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
