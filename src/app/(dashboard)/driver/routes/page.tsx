"use client";

import { motion } from "framer-motion";
import { Route, MapPin, Navigation, Clock, ShieldCheck, Zap } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const routeSuggestions = [
  {
    id: 1,
    start: "Downtown Central",
    end: "Northside Logistics Hub",
    eta: "45 mins",
    distance: "32 km",
    safetyScore: 98,
    efficiency: "High",
    hazards: 0,
    tags: ["Fastest", "Safest"],
  },
  {
    id: 2,
    start: "Downtown Central",
    end: "Northside Logistics Hub",
    eta: "55 mins",
    distance: "38 km",
    safetyScore: 92,
    efficiency: "Medium",
    hazards: 2,
    tags: ["Scenic", "Avoids Tolls"],
  },
  {
    id: 3,
    start: "Downtown Central",
    end: "Northside Logistics Hub",
    eta: "50 mins",
    distance: "35 km",
    safetyScore: 88,
    efficiency: "Low",
    hazards: 1,
    tags: ["Heavy Traffic"],
  },
];

export default function RoutesPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Route Suggestions"
        description="AI-powered routing optimized for safety, fuel efficiency, and speed."
        breadcrumbs={[
          { label: "Home", href: "/driver" },
          { label: "Vehicle", href: "/driver/vehicle" },
          { label: "Routes" },
        ]}
        actions={
          <Button className="gap-2">
            <Navigation className="h-4 w-4" />
            Start Navigation
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="h-[400px] flex items-center justify-center bg-bg-elevated/50 border-dashed">
            <div className="text-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <p className="text-text-muted">Interactive Map Visualization Area</p>
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Route className="h-5 w-5 text-blue-400" />
                Current Active Route
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div className="space-y-1">
                  <p className="text-lg font-semibold text-text-primary">
                    Downtown Central → Northside Hub
                  </p>
                  <p className="text-sm text-text-muted">
                    ETA: 14:30 (On time) • Remaining: 28 km
                  </p>
                </div>
                <Badge variant="success" className="px-3 py-1 text-sm">
                  Optimal Flow
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-400" />
            Alternative Routes
          </h3>
          <div className="space-y-4">
            {routeSuggestions.map((route, idx) => (
              <motion.div
                key={route.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-4 space-y-4 hover:border-primary/50 cursor-pointer transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="font-medium text-text-primary">{route.eta}</p>
                    <p className="text-sm text-text-muted">{route.distance}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {route.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-[10px]">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border-subtle">
                  <div className="flex items-center gap-2 text-sm">
                    <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    <span className="text-text-secondary">{route.safetyScore}/100</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-blue-400" />
                    <span className="text-text-secondary">{route.efficiency}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
