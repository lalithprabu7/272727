"use client";

import { motion } from "framer-motion";
import { UserPlus, Activity, Search, Filter, Phone, Clock, FileText, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { staggerContainer, staggerItem } from "@/lib/constants";

// Mock data for incoming patients
const mockIncomingPatients = [
  { id: "p1", name: "John Doe", age: 45, condition: "Blunt Force Trauma (Chest)", vitals: { hr: 110, bp: "140/90", o2: "94%" }, eta: "5 mins", priority: "critical", ambulance: "AMB-001", status: "en_route" },
  { id: "p2", name: "Jane Smith", age: 28, condition: "Minor Lacerations", vitals: { hr: 85, bp: "120/80", o2: "98%" }, eta: "15 mins", priority: "low", ambulance: "AMB-003", status: "dispatched" },
  { id: "p3", name: "Unknown Male", age: "approx 30", condition: "Unconscious, Suspected Concussion", vitals: { hr: 130, bp: "90/60", o2: "92%" }, eta: "2 mins", priority: "critical", ambulance: "AMB-002", status: "arriving" },
];

export default function IncomingPatientsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Incoming Patients (Pre-Arrival)"
        description="Review vital signs, EMS field reports, and triage incoming patients before they arrive at the ER."
        breadcrumbs={[
          { label: "Home", href: "/hospital" },
          { label: "Incoming Patients" },
        ]}
      />

      <Card>
        <CardHeader className="pb-3 border-b border-border-subtle">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
              <Input placeholder="Search patient name, ID, or ambulance..." className="pl-10 w-full" />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button variant="secondary" className="flex-1 sm:flex-none">
                <Filter className="h-4 w-4 mr-2" /> Filter Triage
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="divide-y divide-border-subtle">
            {mockIncomingPatients.map((patient) => (
              <motion.div key={patient.id} variants={staggerItem} className="p-4 sm:p-6 hover:bg-bg-elevated transition-colors cursor-pointer group flex flex-col md:flex-row gap-4 justify-between">
                
                <div className="flex flex-1 items-start gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl shrink-0 mt-1 ${
                    patient.priority === "critical" ? "bg-red-500/20 text-red-500" : 
                    "bg-amber-500/20 text-amber-500"
                  }`}>
                    <UserPlus className="h-6 w-6" />
                  </div>
                  
                  <div className="space-y-1.5 w-full max-w-xl">
                    <div className="flex items-center justify-between sm:justify-start gap-2">
                      <h4 className="text-base font-semibold text-text-primary">{patient.name} <span className="text-sm font-normal text-text-muted">(Age: {patient.age})</span></h4>
                      <Badge variant={patient.status === "arriving" ? "danger" : "warning"} className="uppercase text-[10px] ml-2 animate-pulse-glow">
                        ETA: {patient.eta}
                      </Badge>
                    </div>
                    
                    <p className="text-sm font-medium text-text-secondary">{patient.condition}</p>

                    <div className="grid grid-cols-3 gap-2 mt-3 p-3 rounded-lg bg-bg-root border border-border-default">
                      <div>
                        <p className="text-[10px] uppercase text-text-muted font-semibold tracking-wider">Heart Rate</p>
                        <p className={`text-sm font-bold ${patient.vitals.hr > 100 ? "text-red-400" : "text-emerald-400"}`}>{patient.vitals.hr} bpm</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase text-text-muted font-semibold tracking-wider">Blood Pressure</p>
                        <p className="text-sm font-bold text-text-primary">{patient.vitals.bp}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase text-text-muted font-semibold tracking-wider">SpO2</p>
                        <p className={`text-sm font-bold ${parseInt(patient.vitals.o2) < 95 ? "text-orange-400" : "text-emerald-400"}`}>{patient.vitals.o2}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-text-muted mt-2 pt-1">
                      <span className="flex items-center gap-1 font-mono bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20">{patient.ambulance}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Status: {patient.status.replace("_", " ")}</span>
                    </div>
                  </div>
                </div>

                <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-3 pt-4 border-t border-border-subtle md:border-t-0 md:pt-0">
                  <Button variant="outline" size="sm" className="w-full md:w-auto">
                    <FileText className="h-4 w-4 mr-2" /> EMS Report
                  </Button>
                  <Button variant="outline" size="sm" className="w-full md:w-auto">
                    <Phone className="h-4 w-4 mr-2" /> Call Paramedic
                  </Button>
                  <Button size="sm" variant={patient.status === "arriving" ? "default" : "secondary"} className="w-full md:w-auto">
                    <CheckCircle2 className="h-4 w-4 mr-2" /> Admit to ER
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}
