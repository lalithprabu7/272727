"use client";

import { motion } from "framer-motion";
import { Siren, Search, Filter, AlertTriangle, Clock, MapPin, ChevronRight, Eye } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockIncidents } from "@/data/mock";
import { formatRelativeTime } from "@/lib/utils";
import { staggerContainer, staggerItem } from "@/lib/constants";

export default function LiveIncidentsPage() {
  const activeIncidents = mockIncidents.filter((i) => i.status !== "resolved" && i.status !== "closed");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Live Incidents"
        description="Real-time monitor of active accidents, hazards, and traffic violations."
        breadcrumbs={[
          { label: "Home", href: "/police" },
          { label: "Live Incidents" },
        ]}
      />

      <Card>
        <CardHeader className="pb-3 border-b border-border-subtle">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
              <Input placeholder="Search incidents by location, type, or ID..." className="pl-10 w-full" />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button variant="secondary" className="flex-1 sm:flex-none">
                <Siren className="h-4 w-4" /> Severity
              </Button>
              <Button variant="secondary" className="flex-1 sm:flex-none">
                <Filter className="h-4 w-4" /> Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="divide-y divide-border-subtle">
            {activeIncidents.length > 0 ? activeIncidents.map((incident) => (
              <motion.div key={incident.id} variants={staggerItem} className="p-4 sm:p-6 hover:bg-bg-elevated transition-colors cursor-pointer group">
                <div className="flex flex-col md:flex-row gap-4 justify-between">
                  {/* Incident Info */}
                  <div className="flex flex-1 items-start gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl shrink-0 mt-1 ${
                      incident.severity === "critical" ? "bg-red-500/20 text-red-500" : 
                      incident.severity === "high" ? "bg-orange-500/20 text-orange-500" : 
                      "bg-amber-500/20 text-amber-500"
                    }`}>
                      <Siren className="h-6 w-6" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-base font-semibold text-text-primary capitalize">{incident.type.replace("_", " ")}</h4>
                        <Badge variant={incident.severity === "critical" || incident.severity === "high" ? "danger" : "warning"} className="uppercase text-[10px]">
                          {incident.severity}
                        </Badge>
                        <Badge variant={incident.status === "dispatched" ? "default" : incident.status === "in_progress" ? "default" : "warning"} className="uppercase text-[10px]">
                          {incident.status.replace("_", " ")}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-text-secondary">
                        <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {incident.address}</span>
                        <span className="hidden sm:flex items-center gap-1.5"><Clock className="h-4 w-4" /> {formatRelativeTime(incident.createdAt)}</span>
                      </div>
                      
                      {incident.description && (
                        <p className="text-sm text-text-muted line-clamp-2 max-w-3xl">{incident.description}</p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-3 pt-4 border-t border-border-subtle md:border-t-0 md:pt-0">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" /> View
                      </Button>
                      <Button size="sm">
                        Dispatch Unit
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )) : (
              <div className="p-12 text-center text-text-muted flex flex-col items-center">
                <AlertTriangle className="h-8 w-8 mb-4 text-emerald-500" />
                <p>No active incidents right now. The streets are safe.</p>
              </div>
            )}
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}
