"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, Navigation2, Clock, Car, Activity, Zap } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapWrapper } from "@/components/shared/map-wrapper";
import { mockDrivers, mockTrips, mockAIAlerts } from "@/data/mock";
import { staggerContainer, staggerItem } from "@/lib/constants";

export default function LiveTrackingPage() {
  const driver = mockDrivers[0];
  const activeTrip = mockTrips.find((t) => t.driverId === driver.id && t.status === "in_progress");
  const recentAlerts = mockAIAlerts.filter((a) => a.driverId === driver.id).slice(0, 2);

  const [isNavigating, setIsNavigating] = useState(false);

  // Mock route from Financial District to Times Square
  const routePositions: [number, number][] = [
    [40.7128, -74.0060], // Start
    [40.7200, -74.0020],
    [40.7300, -73.9980],
    [40.7400, -73.9920],
    [40.7500, -73.9880],
    [40.7589, -73.9851], // End
  ];

  const mapMarkers = [
    {
      id: "car-1",
      lat: driver.lastLatitude ?? 40.7128,
      lng: driver.lastLongitude ?? -74.0060,
      title: "Current Location",
      description: `Speed: ${activeTrip?.avgSpeed ?? 0} mph`,
      type: "car" as const,
    },
    ...(activeTrip && activeTrip.endLatitude && activeTrip.endLongitude ? [{
      id: "dest-1",
      lat: activeTrip.endLatitude,
      lng: activeTrip.endLongitude,
      title: "Destination",
      description: activeTrip.endAddress,
      type: "destination" as const,
    }] : []),
    ...recentAlerts.map(alert => ({
      id: alert.id,
      lat: alert.latitude ?? 40.7128,
      lng: alert.longitude ?? -74.0060,
      title: "AI Alert",
      description: alert.message,
      type: "alert" as const,
    }))
  ];

  return (
    <div className="space-y-6 lg:h-[calc(100vh-12rem)] lg:min-h-[400px] flex flex-col">
      <PageHeader
        title="Live GPS Tracking"
        description="Monitor your current trip, speed, and real-time route optimization."
        breadcrumbs={[
          { label: "Home", href: "/driver" },
          { label: "Live Tracking" },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
        {/* Map Area */}
        <div className="lg:col-span-3 h-[400px] lg:h-full relative rounded-xl border border-border-subtle shadow-glass overflow-hidden z-10">
          <MapWrapper
            center={[driver.lastLatitude ?? 40.7128, driver.lastLongitude ?? -74.0060]}
            zoom={13}
            markers={mapMarkers}
            routes={[{ id: "r1", positions: routePositions }]}
          />
          
          {/* Floating Map Actions */}
          <div className="absolute top-4 right-4 z-[400] flex flex-col gap-2">
            <Button size="icon" variant="secondary" className="shadow-lg bg-bg-card/90 backdrop-blur" onClick={() => setIsNavigating(!isNavigating)}>
              <Navigation className={isNavigating ? "text-primary" : "text-text-primary"} />
            </Button>
            <Button size="icon" variant="secondary" className="shadow-lg bg-bg-card/90 backdrop-blur">
              <MapPin />
            </Button>
          </div>
        </div>

        {/* Sidebar Info */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="flex flex-col gap-6 overflow-y-auto pr-1 pb-4 scrollbar-thin"
        >
          {/* Trip Status */}
          <motion.div variants={staggerItem}>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-base">
                  <span className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-primary" />
                    Trip Status
                  </span>
                  {activeTrip ? (
                    <Badge variant="default" className="animate-pulse-glow">Active</Badge>
                  ) : (
                    <Badge variant="secondary">Idle</Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                    <Navigation2 className="h-5 w-5 text-blue-400 rotate-45" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{activeTrip?.avgSpeed ?? 0} mph</p>
                    <p className="text-xs text-text-muted">Current Speed</p>
                  </div>
                </div>
                
                <div className="space-y-3 relative before:absolute before:inset-y-3 before:left-[11px] before:w-[2px] before:bg-border-default">
                  <div className="flex gap-3 relative z-10">
                    <div className="mt-1 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-bg-root border-2 border-primary shrink-0">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Start</p>
                      <p className="text-sm font-medium text-text-primary mt-0.5">{activeTrip?.startAddress ?? "Financial District"}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 relative z-10">
                    <div className="mt-1 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-bg-root border-2 border-text-muted shrink-0">
                      <MapPin className="h-3 w-3 text-text-muted" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Destination</p>
                      <p className="text-sm font-medium text-text-primary mt-0.5">{activeTrip?.endAddress ?? "Midtown, NYC"}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border-subtle flex items-center justify-between">
                  <div className="text-center">
                    <p className="text-lg font-bold text-text-primary">12<span className="text-xs text-text-muted font-normal ml-1">min</span></p>
                    <p className="text-xs text-text-muted">ETA</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-text-primary">2.4<span className="text-xs text-text-muted font-normal ml-1">mi</span></p>
                    <p className="text-xs text-text-muted">Remaining</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-emerald-400">94</p>
                    <p className="text-xs text-text-muted">Trip Score</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Real-time Alerts */}
          <motion.div variants={staggerItem}>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Zap className="h-4 w-4 text-amber-400" />
                  Live AI Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentAlerts.length > 0 ? recentAlerts.map(alert => (
                  <div key={alert.id} className="flex gap-3 items-start border-l-2 border-amber-500 pl-3 py-1">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text-primary">{alert.message}</p>
                      <p className="text-xs text-text-muted mt-1 flex items-center gap-1">
                        <Clock className="h-3 w-3" /> Just now
                      </p>
                    </div>
                  </div>
                )) : (
                  <p className="text-sm text-text-muted text-center py-4">No active alerts. Good driving!</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
