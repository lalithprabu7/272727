"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Stethoscope, Clock, Users, Activity, Shield, CheckCircle2, UserCheck, AlertTriangle, Phone } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatCard } from "@/components/shared/stat-card";
import { staggerContainer, staggerItem } from "@/lib/constants";

const mockDoctors = [
  { id: "doc1", name: "Dr. Sarah Jenkins", specialty: "Trauma Surgery", status: "On Duty", activePatients: 3, shift: "Day (07:00 - 19:00)", email: "s.jenkins@hospital.org" },
  { id: "doc2", name: "Dr. Ravi Patel", specialty: "Emergency Medicine", status: "On Duty", activePatients: 4, shift: "Day (07:00 - 19:00)", email: "r.patel@hospital.org" },
  { id: "doc3", name: "Dr. Angela Martinez", specialty: "Cardiology", status: "On Call", activePatients: 1, shift: "24h On Call", email: "a.martinez@hospital.org" },
  { id: "doc4", name: "Dr. William Vance", specialty: "Neurology", status: "On Duty", activePatients: 2, shift: "Night (19:00 - 07:00)", email: "w.vance@hospital.org" },
  { id: "doc5", name: "Dr. Emily Taylor", specialty: "Pediatrics", status: "Off Duty", activePatients: 0, shift: "Off Duty", email: "e.taylor@hospital.org" },
  { id: "doc6", name: "Dr. Marcus Vance", specialty: "Orthopedics", status: "On Duty", activePatients: 3, shift: "Day (07:00 - 19:00)", email: "m.vance@hospital.org" },
];

export default function HospitalDoctorsPage() {
  const [search, setSearch] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("all");

  const filteredDoctors = mockDoctors.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(search.toLowerCase()) || 
                          doc.specialty.toLowerCase().includes(search.toLowerCase());
    const matchesSpecialty = specialtyFilter === "all" || doc.specialty === specialtyFilter;
    return matchesSearch && matchesSpecialty;
  });

  const onDutyCount = mockDoctors.filter(d => d.status === "On Duty").length;
  const onCallCount = mockDoctors.filter(d => d.status === "On Call").length;

  const specialties = Array.from(new Set(mockDoctors.map(d => d.specialty)));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Doctor Roster & Availability"
        description="Monitor staff on duty, track active patient loads, and manage on-call schedules."
        breadcrumbs={[
          { label: "Home", href: "/hospital" },
          { label: "Doctors Availability" },
        ]}
      />

      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Doctors On Duty" value={onDutyCount} icon={UserCheck} color="text-emerald-400" description="Active in trauma/ER" />
        <StatCard label="Doctors On Call" value={onCallCount} icon={Phone} color="text-blue-400" description="Standby response team" />
        <StatCard label="Total Staff" value={mockDoctors.length} icon={Stethoscope} color="text-primary" description="Registered staff members" />
        <StatCard label="Avg Patient Load" value="2.2" icon={Users} color="text-purple-400" description="Patients per active doctor" />
      </motion.div>

      <Card>
        <CardHeader className="pb-3 border-b border-border-subtle">
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
              <Input 
                placeholder="Search by doctor name or specialty..." 
                className="pl-10 w-full" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select 
                className="bg-bg-card border border-border-subtle rounded-lg px-3 py-1.5 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-primary w-full sm:w-48"
                value={specialtyFilter}
                onChange={(e) => setSpecialtyFilter(e.target.value)}
              >
                <option value="all">All Specialties</option>
                {specialties.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.length > 0 ? filteredDoctors.map((doc) => (
              <motion.div key={doc.id} variants={staggerItem}>
                <Card className="border border-border-subtle hover:border-border-hover transition-colors overflow-hidden">
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-text-primary text-base">{doc.name}</h4>
                        <p className="text-xs text-text-muted mt-0.5">{doc.specialty}</p>
                      </div>
                      <Badge 
                        variant={doc.status === "On Duty" ? "default" : doc.status === "On Call" ? "warning" : "secondary"}
                        className="uppercase text-[10px]"
                      >
                        {doc.status}
                      </Badge>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-border-subtle">
                      <div className="flex justify-between items-center text-xs text-text-secondary">
                        <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> Shift</span>
                        <span className="font-medium text-text-primary">{doc.shift}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs text-text-secondary">
                        <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> Active Patients</span>
                        <span className="font-semibold text-text-primary">{doc.activePatients} Patients</span>
                      </div>
                      <div className="flex justify-between items-center text-xs text-text-secondary">
                        <span className="flex items-center gap-1.5"><Activity className="h-3.5 w-3.5" /> Direct Email</span>
                        <span className="text-text-muted font-mono">{doc.email}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )) : (
              <div className="col-span-full py-12 text-center text-text-muted flex flex-col items-center">
                <AlertTriangle className="h-8 w-8 mb-4 text-amber-500" />
                <p>No doctors found matching the search criteria.</p>
              </div>
            )}
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}

