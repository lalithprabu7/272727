"use client";

import { motion } from "framer-motion";
import { Navigation, MapPin, Search, Filter, Shield, Clock } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapWrapper } from "@/components/shared/map-wrapper";
import { mockOfficers } from "@/data/mock";

export default function FleetTrackingPage() {
  const onDutyOfficers = mockOfficers.filter((o) => o.isOnDuty);

  const mapMarkers = onDutyOfficers.map(off => ({
    id: off.id,
    lat: off.currentLatitude ?? 40.7128,
    lng: off.currentLongitude ?? -74.0060,
    title: off.name,
    description: `Status: ${off.status} | Unit: ${off.badgeNumber}`,
    type: "car" as const,
  }));

  return (
    <div className="space-y-6 lg:h-[calc(100vh-12rem)] lg:min-h-[400px] flex flex-col">
      <PageHeader
        title="Fleet Tracking"
        description="Monitor the real-time location and status of all police units."
        breadcrumbs={[
          { label: "Home", href: "/police" },
          { label: "Fleet Tracking" },
        ]}
        actions={
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
              <Input placeholder="Search unit or officer..." className="pl-10 w-64 h-9" />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" /> Filter
            </Button>
          </div>
        }
      />

      <div className="flex-1 min-h-0 relative rounded-xl border border-border-subtle shadow-glass overflow-hidden z-10">
        <MapWrapper
          center={[40.7128, -74.0060]}
          zoom={12}
          markers={mapMarkers}
        />
        
        {/* Floating Legend / Quick Status */}
        <div className="absolute bottom-6 left-6 z-[400]">
          <Card className="bg-bg-card/90 backdrop-blur-md shadow-2xl border-border-subtle">
            <CardHeader className="py-3 px-4 border-b border-border-subtle">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                Active Fleet Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 flex gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-text-primary">{onDutyOfficers.length}</p>
                <p className="text-xs text-text-muted uppercase tracking-wider font-semibold mt-1">Total On Duty</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-emerald-400">{onDutyOfficers.filter(o => o.status === "available").length}</p>
                <p className="text-xs text-text-muted uppercase tracking-wider font-semibold mt-1">Available</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-amber-400">{onDutyOfficers.filter(o => o.status === "busy").length}</p>
                <p className="text-xs text-text-muted uppercase tracking-wider font-semibold mt-1">Busy / En Route</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
