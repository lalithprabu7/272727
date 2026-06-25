"use client";

import { motion } from "framer-motion";
import { Bed, Activity, Shield, Users, Search, Filter } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatCard } from "@/components/shared/stat-card";
import { staggerContainer, staggerItem } from "@/lib/constants";
import { mockHospitals } from "@/data/mock";

// Mock data for ward breakdown
const mockWards = [
  { id: "w1", name: "Trauma ICU", total: 40, occupied: 38, type: "critical" },
  { id: "w2", name: "Surgical ICU", total: 20, occupied: 15, type: "critical" },
  { id: "w3", name: "Emergency Room", total: 60, occupied: 45, type: "high" },
  { id: "w4", name: "General Admission", total: 200, occupied: 180, type: "medium" },
  { id: "w5", name: "Pediatrics", total: 50, occupied: 30, type: "medium" },
  { id: "w6", name: "Maternity", total: 40, occupied: 25, type: "low" },
  { id: "w7", name: "Psychiatry", total: 40, occupied: 38, type: "high" },
];

export default function BedCapacityPage() {
  const hospital = mockHospitals[0];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Bed Capacity & Ward Management"
        description="Monitor real-time hospital occupancy and manage ICU/ER bed availability."
        breadcrumbs={[
          { label: "Home", href: "/hospital" },
          { label: "Bed Capacity" },
        ]}
      />

      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Beds" value={hospital.totalBeds} icon={Bed} color="text-blue-400" />
        <StatCard label="Available Beds" value={hospital.availableBeds} icon={Activity} color="text-emerald-400" />
        <StatCard label="ICU Beds (Total)" value={hospital.icuBeds} icon={Shield} color="text-orange-400" />
        <StatCard label="ICU Beds (Available)" value={hospital.icuAvailable} icon={Users} color="text-red-400" />
      </motion.div>

      <Card>
        <CardHeader className="pb-3 border-b border-border-subtle">
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
            <CardTitle className="text-lg">Ward Breakdown</CardTitle>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                <Input placeholder="Search ward..." className="pl-10 w-full sm:w-64 h-9" />
              </div>
              <Button variant="outline" size="sm" className="shrink-0">
                <Filter className="h-4 w-4 mr-2" /> Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockWards.map((ward) => {
              const occupancyRate = (ward.occupied / ward.total) * 100;
              const isFull = occupancyRate >= 95;
              const isHigh = occupancyRate >= 80 && occupancyRate < 95;
              
              return (
                <motion.div key={ward.id} variants={staggerItem}>
                  <Card className={`border ${isFull ? "border-red-500/50" : isHigh ? "border-amber-500/50" : "border-border-subtle"} overflow-hidden relative`}>
                    {isFull && <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                      <div className="absolute top-4 -right-6 bg-red-500/80 text-white text-[10px] font-bold py-1 w-24 text-center rotate-45 transform origin-center">FULL</div>
                    </div>}
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-semibold text-text-primary text-lg">{ward.name}</h4>
                        <Badge variant={ward.type === "critical" ? "danger" : ward.type === "high" ? "warning" : "default"} className="uppercase text-[10px]">
                          {ward.type}
                        </Badge>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-3xl font-bold text-text-primary">{ward.total - ward.occupied}</p>
                            <p className="text-xs text-text-muted uppercase tracking-wider font-semibold mt-1">Available</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-medium text-text-secondary">{ward.occupied} / {ward.total}</p>
                            <p className="text-xs text-text-muted uppercase tracking-wider font-semibold mt-1">Occupied</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-xs text-text-muted">
                            <span>Occupancy</span>
                            <span className={isFull ? "text-red-400" : isHigh ? "text-amber-400" : "text-emerald-400"}>{occupancyRate.toFixed(1)}%</span>
                          </div>
                          <div className="h-2 w-full bg-bg-root rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-1000 ${isFull ? "bg-red-500" : isHigh ? "bg-amber-500" : "bg-emerald-500"}`} 
                              style={{ width: `${occupancyRate}%` }} 
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}
