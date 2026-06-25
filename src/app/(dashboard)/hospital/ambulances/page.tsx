"use client";

import { motion } from "framer-motion";
import { Navigation, Search, Filter, Shield, Clock, Users, Activity } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapWrapper } from "@/components/shared/map-wrapper";
import { mockAmbulances } from "@/data/mock";

export default function AmbulanceTrackingPage() {
  const mapMarkers = mockAmbulances.map(amb => ({
    id: amb.id,
    lat: amb.latitude ?? 40.7425,
    lng: amb.longitude ?? -73.9742,
    title: amb.vehicleNumber,
    description: `Status: ${amb.status.replace("_", " ")} | Crew: ${amb.crewMembers}`,
    type: "car" as const,
  }));

  return (
    <div className="space-y-6 lg:h-[calc(100vh-12rem)] lg:min-h-[400px] flex flex-col">
      <PageHeader
        title="Ambulance Fleet Tracking"
        description="Monitor hospital ambulance fleet, check real-time availability, and coordinate EMS routes."
        breadcrumbs={[
          { label: "Home", href: "/hospital" },
          { label: "Ambulance Tracking" },
        ]}
        actions={
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
              <Input placeholder="Search vehicle ID..." className="pl-10 w-64 h-9" />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" /> Status
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
        {/* Map Area */}
        <div className="lg:col-span-3 h-[400px] lg:h-full relative rounded-xl border border-border-subtle shadow-glass overflow-hidden z-10">
          <MapWrapper
            center={[40.7425, -73.9742]}
            zoom={13}
            markers={mapMarkers}
          />
        </div>

        {/* Sidebar Info */}
        <div className="flex flex-col gap-6 overflow-y-auto pr-1 pb-4 scrollbar-thin">
          <Card className="border-border-subtle">
            <CardHeader className="py-3 px-4 border-b border-border-subtle">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary" />
                Fleet Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 grid grid-cols-2 gap-4">
              <div className="text-center p-3 rounded-lg bg-bg-root">
                <p className="text-2xl font-bold text-text-primary">{mockAmbulances.length}</p>
                <p className="text-xs text-text-muted uppercase tracking-wider mt-1">Total</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-bg-root">
                <p className="text-2xl font-bold text-emerald-400">{mockAmbulances.filter(a => a.status === "available").length}</p>
                <p className="text-xs text-text-muted uppercase tracking-wider mt-1">Available</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-bg-root col-span-2">
                <p className="text-2xl font-bold text-amber-400">{mockAmbulances.filter(a => a.status !== "available").length}</p>
                <p className="text-xs text-text-muted uppercase tracking-wider mt-1">Dispatched / En Route</p>
              </div>
            </CardContent>
          </Card>

          <Card className="flex-1 flex flex-col overflow-hidden">
            <CardHeader className="py-3 px-4 border-b border-border-subtle bg-bg-elevated sticky top-0 z-10">
              <CardTitle className="text-sm font-medium">Unit Status</CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-y-auto flex-1">
              <div className="divide-y divide-border-subtle">
                {mockAmbulances.map((amb) => (
                  <div key={amb.id} className="p-4 hover:bg-bg-elevated transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold text-sm font-mono">{amb.vehicleNumber}</span>
                      <Badge variant={amb.status === "available" ? "default" : "warning"} className="uppercase text-[10px]">
                        {amb.status.replace("_", " ")}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-text-muted">
                      <span className="flex items-center gap-1"><Users className="h-3 w-3" /> Crew: {amb.crewMembers}</span>
                      {amb.status !== "available" && <span className="flex items-center gap-1"><Clock className="h-3 w-3 text-primary" /> Active Run</span>}
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
