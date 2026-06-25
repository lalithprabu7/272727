"use client";

import { motion } from "framer-motion";
import { Radio, MapPin, Users, Shield, Navigation, AlertTriangle, PhoneCall } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapWrapper } from "@/components/shared/map-wrapper";
import { mockOfficers, mockIncidents } from "@/data/mock";
import { formatRelativeTime } from "@/lib/utils";
import { staggerContainer, staggerItem } from "@/lib/constants";

export default function EmergencyDispatchPage() {
  const activeIncidents = mockIncidents.filter((i) => i.status !== "resolved" && i.status !== "closed");
  const onDutyOfficers = mockOfficers.filter((o) => o.isOnDuty);

  const mapMarkers = [
    ...activeIncidents.map(inc => ({
      id: inc.id,
      lat: inc.latitude,
      lng: inc.longitude,
      title: inc.type,
      description: inc.address,
      type: "alert" as const,
    })),
    ...onDutyOfficers.map(off => ({
      id: off.id,
      lat: off.currentLatitude ?? 40.7128,
      lng: off.currentLongitude ?? -74.0060,
      title: off.name,
      description: `Badge: ${off.badgeNumber}`,
      type: "car" as const,
    }))
  ];

  return (
    <div className="space-y-6 lg:h-[calc(100vh-12rem)] lg:min-h-[400px] flex flex-col">
      <PageHeader
        title="Emergency Dispatch Center"
        description="Coordinate police units, dispatch responders to active incidents, and monitor unit availability."
        breadcrumbs={[
          { label: "Home", href: "/police" },
          { label: "Dispatch" },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
        {/* Map Area */}
        <div className="lg:col-span-2 xl:col-span-3 h-[400px] lg:h-full relative rounded-xl border border-border-subtle shadow-glass overflow-hidden z-10">
          <MapWrapper
            center={[40.7128, -74.0060]}
            zoom={13}
            markers={mapMarkers}
          />
        </div>

        {/* Dispatch Sidebar */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="flex flex-col gap-6 overflow-y-auto pr-1 pb-4 scrollbar-thin"
        >
          {/* Active Queue */}
          <motion.div variants={staggerItem}>
            <Card>
              <CardHeader className="pb-3 border-b border-border-subtle bg-red-500/5">
                <CardTitle className="flex items-center justify-between text-base">
                  <span className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    Unassigned Incidents
                  </span>
                  <Badge variant="danger" className="animate-pulse-glow">{activeIncidents.filter(i => i.status === "reported").length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border-subtle">
                  {activeIncidents.filter(i => i.status === "reported").map(inc => (
                    <div key={inc.id} className="p-4 hover:bg-bg-elevated transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold text-sm capitalize">{inc.type.replace("_", " ")}</span>
                        <span className="text-xs text-text-muted">{formatRelativeTime(inc.createdAt)}</span>
                      </div>
                      <p className="text-xs text-text-secondary mb-3 flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {inc.address}
                      </p>
                      <Button size="sm" className="w-full">Dispatch Unit</Button>
                    </div>
                  ))}
                  {activeIncidents.filter(i => i.status === "reported").length === 0 && (
                    <div className="p-6 text-center text-sm text-text-muted">No pending incidents.</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Available Units */}
          <motion.div variants={staggerItem}>
            <Card>
              <CardHeader className="pb-3 border-b border-border-subtle">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Shield className="h-4 w-4 text-blue-400" />
                  Available Units
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border-subtle">
                  {onDutyOfficers.filter(o => o.status === "available").map(officer => (
                    <div key={officer.id} className="p-4 hover:bg-bg-elevated transition-colors flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                          <Users className="h-4 w-4 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{officer.name}</p>
                          <p className="text-xs text-text-muted">Unit {officer.badgeNumber}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Radio className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
