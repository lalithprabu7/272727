"use client";

import { motion } from "framer-motion";
import { Map, Plus, Settings, ShieldAlert, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapWrapper } from "@/components/shared/map-wrapper";
import { staggerContainer, staggerItem } from "@/lib/constants";

const mockGeofences = [
  { id: "gf1", name: "High School", type: "Arrival/Departure", radius: "500m", member: "Jane (Daughter)", isActive: true },
  { id: "gf2", name: "Downtown NYC", type: "No-Go Zone", radius: "2km", member: "Alex (Son)", isActive: true },
  { id: "gf3", name: "Home", type: "Arrival/Departure", radius: "100m", member: "All Members", isActive: false },
];

export default function GeofencingPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Geofencing Settings"
        description="Create safe zones and no-go areas to receive instant alerts when family members enter or exit."
        breadcrumbs={[
          { label: "Home", href: "/family" },
          { label: "Geofencing" },
        ]}
        actions={
          <Button>
            <Plus className="h-4 w-4 mr-2" /> Create New Zone
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 relative h-[500px] rounded-xl border border-border-subtle shadow-glass overflow-hidden z-10">
          {/* Note: In a real app we'd draw circles, but for mock purposes we'll just show markers representing the zones */}
          <MapWrapper
            center={[40.7128, -74.0060]}
            zoom={11}
            markers={[
              { id: "m1", lat: 40.7306, lng: -73.9866, title: "Downtown NYC", description: "No-Go Zone (Alex)", type: "alert" },
              { id: "m2", lat: 40.6782, lng: -73.9442, title: "High School", description: "Arrival Zone (Jane)", type: "destination" }
            ]}
          />
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3 border-b border-border-subtle">
              <CardTitle className="text-lg">Active Zones</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <motion.div variants={staggerContainer} initial="initial" animate="animate" className="divide-y divide-border-subtle">
                {mockGeofences.map((zone) => (
                  <motion.div key={zone.id} variants={staggerItem} className="p-4 hover:bg-bg-elevated transition-colors">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-semibold text-text-primary flex items-center gap-2">
                        {zone.type === "No-Go Zone" ? <ShieldAlert className="h-4 w-4 text-red-500" /> : <Map className="h-4 w-4 text-emerald-500" />}
                        {zone.name}
                      </h4>
                      <Badge variant={zone.isActive ? (zone.type === "No-Go Zone" ? "danger" : "default") : "secondary"} className="uppercase text-[10px]">
                        {zone.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <p className="text-sm text-text-muted mb-3">{zone.type} • {zone.radius} radius</p>
                    <p className="text-xs text-text-secondary bg-bg-root p-2 rounded border border-border-default mb-3">
                      Applies to: <span className="font-medium text-text-primary">{zone.member}</span>
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 h-8">
                        <Settings className="h-3 w-3 mr-1" /> Edit
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-500/10">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
