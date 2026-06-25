"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, ClipboardList, Shield, Activity, Clock, Users, HeartPulse, UserPlus, FileText, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatCard } from "@/components/shared/stat-card";
import { staggerContainer, staggerItem } from "@/lib/constants";
import { formatRelativeTime } from "@/lib/utils";

const initialPatients = [
  { id: "p1", name: "Robert Zhang", age: 42, condition: "Trauma / Internal Bleeding", status: "ICU", severity: "critical", doctor: "Dr. Sarah Jenkins", admittedAt: "2026-06-24T08:48:00Z" },
  { id: "p2", name: "Jane Smith", age: 29, condition: "Concussion / Fractured Arm", status: "Ward", severity: "medium", doctor: "Dr. Ravi Patel", admittedAt: "2026-06-24T07:16:00Z" },
  { id: "p3", name: "Michael Vance", age: 35, condition: "Whiplash / Lacerations", status: "ER / Triage", severity: "low", doctor: "Dr. Marcus Vance", admittedAt: "2026-06-24T09:05:00Z" },
  { id: "p4", name: "David Kim", age: 51, condition: "Chest Pain / Arrhythmia", status: "ICU", severity: "critical", doctor: "Dr. Angela Martinez", admittedAt: "2026-06-23T15:30:00Z" },
  { id: "p5", name: "Emily Taylor", age: 8, condition: "Minor Abrasions / Shock", status: "Discharged", severity: "low", doctor: "Dr. Emily Taylor", admittedAt: "2026-06-24T06:12:00Z" }
];

export default function PatientRecordsPage() {
  const [patients, setPatients] = useState(initialPatients);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredPatients = patients.filter(pat => {
    const matchesSearch = pat.name.toLowerCase().includes(search.toLowerCase()) || 
                          pat.condition.toLowerCase().includes(search.toLowerCase()) ||
                          pat.doctor.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || pat.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const criticalCount = patients.filter(p => p.severity === "critical").length;
  const icuCount = patients.filter(p => p.status === "ICU").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Patient Records & Admissions"
        description="View and coordinate admitting records, check active ER intakes, and assign trauma surgeons."
        breadcrumbs={[
          { label: "Home", href: "/hospital" },
          { label: "Patient Records" },
        ]}
        actions={
          <Button size="sm" className="glow-primary">
            <UserPlus className="h-4 w-4 mr-2" /> Admit New Patient
          </Button>
        }
      />

      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Admitted Patients" value={patients.filter(p => p.status !== "Discharged").length} icon={Users} color="text-primary" />
        <StatCard label="Critical Condition" value={criticalCount} icon={HeartPulse} color="text-red-400" />
        <StatCard label="ICU Admissions" value={icuCount} icon={Shield} color="text-orange-400" />
        <StatCard label="Discharged Today" value={patients.filter(p => p.status === "Discharged").length} icon={CheckCircle2} color="text-emerald-400" />
      </motion.div>

      <Card>
        <CardHeader className="pb-3 border-b border-border-subtle">
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
              <Input 
                placeholder="Search patient, condition, or doctor..." 
                className="pl-10 w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select 
                className="bg-bg-card border border-border-subtle rounded-lg px-3 py-1.5 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-primary w-full sm:w-48"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Wards / Status</option>
                <option value="ICU">ICU</option>
                <option value="Ward">Ward</option>
                <option value="ER / Triage">ER / Triage</option>
                <option value="Discharged">Discharged</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border-subtle bg-bg-elevated/30 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  <th className="py-4 px-6">Patient Name</th>
                  <th className="py-4 px-6">Age</th>
                  <th className="py-4 px-6">Severity</th>
                  <th className="py-4 px-6">Admitting Reason / Condition</th>
                  <th className="py-4 px-6">Ward / Status</th>
                  <th className="py-4 px-6">Admitting Doctor</th>
                  <th className="py-4 px-6">Admitted</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle text-sm">
                {filteredPatients.length > 0 ? filteredPatients.map((pat) => (
                  <tr key={pat.id} className="hover:bg-bg-elevated/40 transition-colors">
                    <td className="py-4 px-6 font-medium text-text-primary">{pat.name}</td>
                    <td className="py-4 px-6 text-text-secondary">{pat.age}</td>
                    <td className="py-4 px-6">
                      <Badge 
                        variant={pat.severity === "critical" ? "danger" : pat.severity === "medium" ? "warning" : "secondary"}
                        className="text-[10px] uppercase font-bold"
                      >
                        {pat.severity}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-text-primary">{pat.condition}</td>
                    <td className="py-4 px-6">
                      <Badge variant="outline" className="text-[10px] uppercase">
                        {pat.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-text-secondary">{pat.doctor}</td>
                    <td className="py-4 px-6 text-text-muted">{formatRelativeTime(pat.admittedAt)}</td>
                    <td className="py-4 px-6 text-right">
                      <Button variant="ghost" size="sm" className="hover:text-primary">
                        <FileText className="h-4 w-4 mr-1" /> Records
                      </Button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-text-muted">
                      No patient records found matching the criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
