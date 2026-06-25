"use client";

import { motion } from "framer-motion";
import { Scale, Search, Filter, Camera, Car, MapPin, Clock, FileText } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { staggerContainer, staggerItem } from "@/lib/constants";

// Mock data for violations
const mockViolations = [
  { id: "v1", type: "Speeding", speed: "84 mph", limit: "55 mph", plate: "NYC-8239", driver: "John Doe", location: "I-95 North", time: "2 mins ago", severity: "high", status: "pending", amount: "$250" },
  { id: "v2", type: "Red Light", plate: "NJ-AB123", driver: "Unknown", location: "5th Ave & 42nd St", time: "15 mins ago", severity: "medium", status: "issued", amount: "$150" },
  { id: "v3", type: "Illegal Turn", plate: "CT-XYZ9", driver: "Alice Smith", location: "Broadway & Wall St", time: "1 hour ago", severity: "medium", status: "issued", amount: "$100" },
  { id: "v4", type: "Reckless Driving", speed: "92 mph", limit: "55 mph", plate: "NY-G782", driver: "Bob Johnson", location: "I-278 East", time: "3 hours ago", severity: "critical", status: "pending", amount: "Court Mandatory" },
];

export default function TrafficViolationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Traffic Violations"
        description="Review AI-detected traffic violations, issue citations, and manage enforcement."
        breadcrumbs={[
          { label: "Home", href: "/police" },
          { label: "Traffic Violations" },
        ]}
      />

      <Card>
        <CardHeader className="pb-3 border-b border-border-subtle">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
              <Input placeholder="Search by plate number, driver, or location..." className="pl-10 w-full" />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button variant="secondary" className="flex-1 sm:flex-none">
                <Scale className="h-4 w-4" /> Type
              </Button>
              <Button variant="secondary" className="flex-1 sm:flex-none">
                <Filter className="h-4 w-4" /> Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="divide-y divide-border-subtle">
            {mockViolations.map((violation) => (
              <motion.div key={violation.id} variants={staggerItem} className="p-4 sm:p-6 hover:bg-bg-elevated transition-colors cursor-pointer group flex flex-col md:flex-row gap-4 justify-between">
                
                <div className="flex flex-1 items-start gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl shrink-0 mt-1 ${
                    violation.severity === "critical" ? "bg-red-500/20 text-red-500" : 
                    violation.severity === "high" ? "bg-orange-500/20 text-orange-500" : 
                    "bg-amber-500/20 text-amber-500"
                  }`}>
                    <Camera className="h-6 w-6" />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-semibold text-text-primary">{violation.type}</h4>
                      <Badge variant={violation.status === "issued" ? "default" : "warning"} className="uppercase text-[10px]">
                        {violation.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-3 text-sm text-text-secondary mt-1">
                      <span className="flex items-center gap-1 font-mono text-text-primary bg-bg-root px-2 py-0.5 rounded border border-border-default"><Car className="h-3 w-3" /> {violation.plate}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {violation.location}</span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-text-muted mt-2">
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {violation.time}</span>
                      <span>Driver: {violation.driver}</span>
                      {violation.speed && <span className="text-orange-400">Speed: {violation.speed} (Limit: {violation.limit})</span>}
                    </div>
                  </div>
                </div>

                <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-3 pt-4 border-t border-border-subtle md:border-t-0 md:pt-0">
                  <p className="font-semibold text-lg text-text-primary">{violation.amount}</p>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Camera className="h-4 w-4 mr-2" /> Evidence
                    </Button>
                    <Button size="sm" variant={violation.status === "pending" ? "default" : "secondary"} disabled={violation.status !== "pending"}>
                      <FileText className="h-4 w-4 mr-2" /> Issue Citation
                    </Button>
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
