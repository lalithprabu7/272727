"use client";

import { motion } from "framer-motion";
import { History, Search, Filter, Calendar, MapPin, Clock, Route, Star, Download } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockTrips, mockDrivers } from "@/data/mock";
import { formatRelativeTime } from "@/lib/utils";
import { staggerContainer, staggerItem } from "@/lib/constants";

export default function TripHistoryPage() {
  const driver = mockDrivers[0];
  const trips = mockTrips.filter((t) => t.driverId === driver.id && t.status === "completed");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Trip History"
        description="Review your past trips, routes, and performance metrics."
        breadcrumbs={[
          { label: "Home", href: "/driver" },
          { label: "Trip History" },
        ]}
        actions={
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" /> Export Log
          </Button>
        }
      />

      <Card>
        <CardHeader className="pb-3 border-b border-border-subtle">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
              <Input placeholder="Search locations..." className="pl-10 w-full" />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button variant="secondary" className="flex-1 sm:flex-none">
                <Calendar className="h-4 w-4" /> Date
              </Button>
              <Button variant="secondary" className="flex-1 sm:flex-none">
                <Filter className="h-4 w-4" /> Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="divide-y divide-border-subtle">
            {trips.length > 0 ? trips.map((trip) => (
              <motion.div key={trip.id} variants={staggerItem} className="p-4 sm:p-6 hover:bg-bg-elevated transition-colors cursor-pointer group">
                <div className="flex flex-col md:flex-row gap-4 justify-between">
                  {/* Route Info */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2 text-sm text-text-muted">
                      <Clock className="h-4 w-4" />
                      <span>{trip.startedAt ? new Date(trip.startedAt).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) : "Unknown Date"}</span>
                    </div>
                    
                    <div className="space-y-2 relative before:absolute before:inset-y-3 before:left-[9px] before:w-[2px] before:bg-border-default">
                      <div className="flex gap-3 relative z-10">
                        <div className="mt-1 flex h-[20px] w-[20px] items-center justify-center rounded-full bg-bg-root border-[1.5px] border-primary shrink-0">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-text-primary">{trip.startAddress ?? "Unknown Location"}</p>
                        </div>
                      </div>
                      <div className="flex gap-3 relative z-10">
                        <div className="mt-1 flex h-[20px] w-[20px] items-center justify-center rounded-full bg-bg-root border-[1.5px] border-text-muted shrink-0">
                          <MapPin className="h-2.5 w-2.5 text-text-muted" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-text-primary">{trip.endAddress ?? "Unknown Location"}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 md:flex md:flex-col md:items-end gap-4 md:gap-2 pt-2 md:pt-0 border-t border-border-subtle md:border-t-0 md:min-w-[120px]">
                    <div className="text-center md:text-right">
                      <p className="text-sm text-text-muted mb-0.5">Distance</p>
                      <p className="font-semibold text-text-primary flex items-center justify-center md:justify-end gap-1">
                        <Route className="h-3.5 w-3.5 text-blue-400" />
                        {trip.distance?.toFixed(1)} mi
                      </p>
                    </div>
                    <div className="text-center md:text-right">
                      <p className="text-sm text-text-muted mb-0.5">Duration</p>
                      <p className="font-semibold text-text-primary flex items-center justify-center md:justify-end gap-1">
                        <Clock className="h-3.5 w-3.5 text-purple-400" />
                        {trip.duration ? Math.round(trip.duration / 60) : 0} min
                      </p>
                    </div>
                    <div className="text-center md:text-right">
                      <p className="text-sm text-text-muted mb-0.5">Score</p>
                      <p className="font-semibold text-emerald-400 flex items-center justify-center md:justify-end gap-1">
                        <Star className="h-3.5 w-3.5 fill-emerald-400" />
                        {trip.safetyScore}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )) : (
              <div className="p-12 text-center text-text-muted">No completed trips found.</div>
            )}
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}
