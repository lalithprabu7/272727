"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Clock, MapPin, Bell, ShieldAlert, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { staggerContainer, staggerItem } from "@/lib/constants";

const mockFamilyAlerts = [
  { id: "fa1", type: "Harsh Braking", familyMember: "Alex (Son)", location: "Times Square, NYC", time: "4 mins ago", severity: "medium", isRead: false },
  { id: "fa2", type: "Geofence Exit", familyMember: "Jane (Daughter)", location: "Left: Brooklyn High School", time: "45 mins ago", severity: "low", isRead: false },
  { id: "fa3", type: "Speeding", familyMember: "Alex (Son)", location: "I-95 North", time: "2 hours ago", severity: "high", speed: "82 mph", limit: "65 mph", isRead: true },
  { id: "fa4", type: "Destination Reached", familyMember: "Jane (Daughter)", location: "Arrived: Home", time: "Yesterday, 3:30 PM", severity: "info", isRead: true },
];

export default function FamilyAlertsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Safety Alerts & Notifications"
        description="Review AI driving alerts, geofence breaches, and safety notifications for your family."
        breadcrumbs={[
          { label: "Home", href: "/family" },
          { label: "Alerts" },
        ]}
      />

      <Card>
        <CardHeader className="pb-3 border-b border-border-subtle">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="h-5 w-5" /> Recent Alerts
            </CardTitle>
            <Button variant="outline" size="sm">
              <CheckCircle2 className="h-4 w-4 mr-2" /> Mark All as Read
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="divide-y divide-border-subtle">
            {mockFamilyAlerts.map((alert) => (
              <motion.div key={alert.id} variants={staggerItem} className={`p-4 sm:p-6 transition-colors ${alert.isRead ? "bg-transparent hover:bg-bg-elevated" : "bg-primary/5 hover:bg-primary/10"}`}>
                <div className="flex gap-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full shrink-0 mt-0.5 ${
                    alert.severity === "high" ? "bg-red-500/20 text-red-500" : 
                    alert.severity === "medium" ? "bg-orange-500/20 text-orange-500" : 
                    alert.severity === "low" ? "bg-amber-500/20 text-amber-500" :
                    "bg-blue-500/20 text-blue-500"
                  }`}>
                    {alert.severity === "info" ? <Bell className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
                  </div>
                  
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-base font-semibold text-text-primary">
                          {alert.familyMember}: {alert.type}
                        </h4>
                        <div className="flex items-center gap-3 text-sm text-text-secondary mt-1">
                          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {alert.location}</span>
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {alert.time}</span>
                        </div>
                      </div>
                      {!alert.isRead && <div className="h-2.5 w-2.5 bg-primary rounded-full shrink-0 mt-1.5 shadow-[0_0_8px_rgba(37,99,235,0.8)]" />}
                    </div>

                    {alert.speed && (
                      <div className="mt-2 text-sm text-text-muted">
                        Recorded Speed: <span className="text-red-400 font-medium">{alert.speed}</span> (Limit: {alert.limit})
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}
