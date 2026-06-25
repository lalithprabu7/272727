"use client";

import { AlertTriangle, Search } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapWrapper } from "@/components/shared/map-wrapper";
import { mockIncidents } from "@/data/mock";

export default function SafetyMapPage() {
  const mapMarkers = mockIncidents.map(i => ({
    id: i.id,
    lat: i.latitude,
    lng: i.longitude,
    title: i.type,
    description: i.description,
    type: "alert" as const,
  }));

  return (
    <div className="space-y-6 lg:h-[calc(100vh-12rem)] lg:min-h-[400px] flex flex-col">
      <PageHeader
        title="Local Safety Map"
        description="View verified community reports, accident hotspots, and active road hazards near you."
        breadcrumbs={[
          { label: "Home", href: "/citizen" },
          { label: "Safety Map" },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
        {/* Map Area */}
        <div className="lg:col-span-3 h-[400px] lg:h-full relative rounded-xl border border-border-subtle shadow-glass overflow-hidden z-10">
          <MapWrapper
            center={[40.7128, -74.0060]}
            zoom={12}
            markers={mapMarkers}
          />
        </div>

        {/* Sidebar Info */}
        <div className="flex flex-col gap-6 overflow-y-auto pr-1 pb-4 scrollbar-thin">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <Input placeholder="Search location..." className="pl-10 w-full" />
          </div>

          <Card className="flex-1 flex flex-col overflow-hidden">
            <CardHeader className="py-3 px-4 border-b border-border-subtle bg-bg-elevated sticky top-0 z-10">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                Nearby Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-y-auto flex-1">
              <div className="divide-y divide-border-subtle">
                {mockIncidents.map((incident) => (
                  <div key={incident.id} className="p-4 hover:bg-bg-elevated transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold text-sm">{incident.type}</span>
                      <Badge variant={incident.severity === "critical" || incident.severity === "high" ? "danger" : "warning"} className="uppercase text-[10px]">
                        {incident.severity}
                      </Badge>
                    </div>
                    <p className="text-xs text-text-muted line-clamp-2 mb-2">{incident.description}</p>
                    <div className="text-[10px] text-text-secondary flex items-center justify-between">
                      <span>{incident.address || "Location unavailable"}</span>
                      <span className="font-medium text-blue-400">Verified</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
