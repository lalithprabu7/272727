"use client";

import { motion } from "framer-motion";
import { Navigation, Phone, MessageSquare, AlertCircle, MapPin, Search } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapWrapper } from "@/components/shared/map-wrapper";
import { mockDrivers } from "@/data/mock";
import { staggerContainer, staggerItem } from "@/lib/constants";

export default function FamilyTrackingPage() {
  const familyDrivers = mockDrivers.filter(d => d.status !== "offline");

  const mapMarkers = familyDrivers.map(d => ({
    id: d.id,
    lat: d.lastLatitude ?? 40.7128,
    lng: d.lastLongitude ?? -74.0060,
    title: d.id === "d1" ? "Alex Morgan (Son)" : "Jane Smith (Daughter)",
    description: `Status: ${d.status} | Speed: 28 mph`,
    type: "car" as const,
  }));

  return (
    <div className="space-y-6 lg:h-[calc(100vh-12rem)] lg:min-h-[400px] flex flex-col">
      <PageHeader
        title="Family Tracking"
        description="Monitor the real-time location and safety status of your linked family members."
        breadcrumbs={[
          { label: "Home", href: "/family" },
          { label: "Live Tracking" },
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
          <Card className="flex-1 flex flex-col overflow-hidden">
            <CardHeader className="py-3 px-4 border-b border-border-subtle bg-bg-elevated sticky top-0 z-10">
              <CardTitle className="text-sm font-medium">Linked Members</CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-y-auto flex-1">
              <div className="divide-y divide-border-subtle">
                {familyDrivers.map((driver) => (
                  <div key={driver.id} className="p-4 hover:bg-bg-elevated transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="font-semibold text-sm">{driver.id === "d1" ? "Alex Morgan" : "Jane Smith"}</span>
                        <p className="text-xs text-text-muted mt-0.5">{driver.id === "d1" ? "Son" : "Daughter"}</p>
                      </div>
                      <Badge variant={driver.status === "driving" ? "default" : "secondary"} className="uppercase text-[10px]">
                        {driver.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-3 text-xs text-text-muted mb-4">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> Near Times Square</span>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 h-8">
                        <Phone className="h-3 w-3 mr-1" /> Call
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 h-8">
                        <MessageSquare className="h-3 w-3 mr-1" /> SMS
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border-subtle bg-amber-500/5">
            <CardHeader className="py-3 px-4 border-b border-border-subtle/50">
              <CardTitle className="text-sm font-medium flex items-center gap-2 text-amber-500">
                <AlertCircle className="h-4 w-4" />
                Recent AI Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-sm text-text-primary">Alex (Son) had a <span className="font-semibold text-amber-500">Harsh Braking</span> event 4 mins ago.</p>
              <Button size="sm" variant="secondary" className="w-full mt-3">View Details</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
