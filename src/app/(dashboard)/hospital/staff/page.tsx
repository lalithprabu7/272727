"use client";

import { motion } from "framer-motion";
import { Stethoscope, Search, Filter, Phone, Mail, MoreVertical, BadgePlus } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { staggerContainer, staggerItem } from "@/lib/constants";

// Mock data for staff
const mockStaff = [
  { id: "s1", name: "Dr. Sarah Jenkins", role: "Trauma Surgeon", department: "Emergency", status: "on_call", phone: "+1-555-0100" },
  { id: "s2", name: "Dr. Michael Chen", role: "Anesthesiologist", department: "Surgery", status: "busy", phone: "+1-555-0101", currentPatient: "P-4921" },
  { id: "s3", name: "Dr. Emily Rodriguez", role: "ER Physician", department: "Emergency", status: "available", phone: "+1-555-0102" },
  { id: "s4", name: "Dr. James Wilson", role: "Neurosurgeon", department: "Surgery", status: "off_duty", phone: "+1-555-0103" },
  { id: "s5", name: "Nurse Lisa Wong", role: "Charge Nurse", department: "ICU", status: "available", phone: "+1-555-0104" },
  { id: "s6", name: "Dr. Robert King", role: "Orthopedic Surgeon", department: "Surgery", status: "on_call", phone: "+1-555-0105" },
];

export default function StaffAvailabilityPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Staff & Specialist Availability"
        description="Monitor real-time availability of doctors, surgeons, and critical care staff."
        breadcrumbs={[
          { label: "Home", href: "/hospital" },
          { label: "Staff" },
        ]}
      />

      <Card>
        <CardHeader className="pb-3 border-b border-border-subtle">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
              <Input placeholder="Search staff by name, role, or department..." className="pl-10 w-full" />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button variant="secondary" className="flex-1 sm:flex-none">
                <Filter className="h-4 w-4 mr-2" /> Department
              </Button>
              <Button className="flex-1 sm:flex-none">
                <BadgePlus className="h-4 w-4 mr-2" /> Request Consult
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockStaff.map((staff) => (
              <motion.div key={staff.id} variants={staggerItem}>
                <Card className="hover:border-primary/50 transition-colors cursor-pointer overflow-hidden group">
                  <div className={`h-2 w-full ${
                    staff.status === "available" ? "bg-emerald-500" :
                    staff.status === "on_call" ? "bg-blue-500" :
                    staff.status === "busy" ? "bg-amber-500" : "bg-border-default"
                  }`} />
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-bg-elevated border-2 border-border-default flex items-center justify-center shrink-0">
                          <Stethoscope className={`h-6 w-6 ${
                            staff.status === "available" ? "text-emerald-400" :
                            staff.status === "on_call" ? "text-blue-400" :
                            staff.status === "busy" ? "text-amber-400" : "text-text-muted"
                          }`} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-text-primary text-lg">{staff.name}</h4>
                          <p className="text-sm text-text-muted">{staff.role}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 -mt-1 -mr-2">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-3 mb-5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-muted">Status</span>
                        <Badge variant={
                          staff.status === "available" ? "success" :
                          staff.status === "on_call" ? "default" :
                          staff.status === "busy" ? "warning" : "secondary"
                        } className="uppercase text-[10px]">
                          {staff.status.replace("_", " ")}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-muted">Department</span>
                        <span className="font-medium">{staff.department}</span>
                      </div>
                      {staff.currentPatient && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-text-muted">Current Patient</span>
                          <span className="font-medium font-mono text-amber-400">{staff.currentPatient}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 border-t border-border-subtle pt-4">
                      <Button variant="secondary" size="sm" className="flex-1" disabled={staff.status === "off_duty"}>
                        <Phone className="h-3 w-3 mr-2" /> Page
                      </Button>
                      <Button variant="secondary" size="sm" className="flex-1">
                        <Mail className="h-3 w-3 mr-2" /> Message
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}
