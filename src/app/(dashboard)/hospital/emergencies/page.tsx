"use client";

import { motion } from "framer-motion";
import { AlertCircle, Clock, MapPin, Activity, Stethoscope, Search, Filter } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockEmergencies, mockIncidents } from "@/data/mock";
import { formatRelativeTime } from "@/lib/utils";
import { staggerContainer, staggerItem } from "@/lib/constants";

export default function ActiveEmergenciesPage() {
  // Join emergencies with their corresponding incidents to get full details
  const activeEmergencies = mockEmergencies
    .filter((e) => e.status !== "resolved")
    .map((e) => {
      const incident = mockIncidents.find((i) => i.id === e.incidentId);
      return { ...e, incidentDetails: incident };
    })
    .sort((a, b) => a.priority - b.priority); // Priority 1 is highest

  return (
    <div className="space-y-6">
      <PageHeader
        title="Active Emergencies"
        description="Monitor critical health emergencies, trauma cases, and coordinate immediate trauma bay preparations."
        breadcrumbs={[
          { label: "Home", href: "/hospital" },
          { label: "Active Emergencies" },
        ]}
      />

      <Card>
        <CardHeader className="pb-3 border-b border-border-subtle">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
              <Input placeholder="Search emergency by ID, type, or location..." className="pl-10 w-full" />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button variant="secondary" className="flex-1 sm:flex-none">
                <AlertCircle className="h-4 w-4 mr-2" /> Priority
              </Button>
              <Button variant="secondary" className="flex-1 sm:flex-none">
                <Filter className="h-4 w-4 mr-2" /> Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="divide-y divide-border-subtle">
            {activeEmergencies.length > 0 ? activeEmergencies.map((emergency) => (
              <motion.div key={emergency.id} variants={staggerItem} className="p-4 sm:p-6 hover:bg-bg-elevated transition-colors cursor-pointer group">
                <div className="flex flex-col md:flex-row gap-4 justify-between">
                  {/* Emergency Info */}
                  <div className="flex flex-1 items-start gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl shrink-0 mt-1 ${
                      emergency.priority === 1 ? "bg-red-500/20 text-red-500 animate-pulse" : 
                      emergency.priority === 2 ? "bg-orange-500/20 text-orange-500" : 
                      "bg-amber-500/20 text-amber-500"
                    }`}>
                      <Activity className="h-6 w-6" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-semibold text-text-primary">{emergency.type}</h4>
                        <Badge variant={emergency.priority === 1 ? "danger" : "warning"} className="uppercase text-[10px]">
                          Priority {emergency.priority}
                        </Badge>
                        <Badge variant="secondary" className="uppercase text-[10px]">
                          {emergency.status.replace("_", " ")}
                        </Badge>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary">
                        <span className="flex items-center gap-1.5 text-text-primary font-medium"><Clock className="h-4 w-4 text-primary" /> ETA: {emergency.responseTime ? `${emergency.responseTime} min` : "Calculating..."}</span>
                        <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {emergency.incidentDetails?.address || "Location Unavailable"}</span>
                        <span className="hidden sm:flex items-center gap-1.5"><Clock className="h-4 w-4" /> Dispatched {formatRelativeTime(emergency.dispatchedAt || emergency.createdAt)}</span>
                      </div>
                      
                      {emergency.incidentDetails?.description && (
                        <p className="text-sm text-text-muted max-w-3xl border-l-2 border-border-default pl-3 mt-2">{emergency.incidentDetails.description}</p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-3 pt-4 border-t border-border-subtle md:border-t-0 md:pt-0">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button size="sm" variant={emergency.priority === 1 ? "destructive" : "default"}>
                        <Stethoscope className="h-4 w-4 mr-2" /> Prepare Trauma Bay
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )) : (
              <div className="p-12 text-center text-text-muted flex flex-col items-center">
                <AlertCircle className="h-8 w-8 mb-4 text-emerald-500" />
                <p>No active emergencies en route. Trauma bays are standing by.</p>
              </div>
            )}
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}
