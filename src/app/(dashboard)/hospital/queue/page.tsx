"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Siren, Clock, Activity, Shield, Users, Radio, UserPlus, Heart, AlertTriangle, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/shared/stat-card";
import { staggerContainer, staggerItem } from "@/lib/constants";

const initialQueue = [
  { id: "q1", patient: "Robert Zhang", status: "Trauma Prep", eta: "Arrived", priority: 1, type: "Vehicle Collision", ambulance: "AMB-001" },
  { id: "q2", patient: "Miguel Santos", status: "En Route", eta: "8 min", priority: 1, type: "Hit and Run", ambulance: "AMB-003" },
  { id: "q3", patient: "Jane Smith", status: "ER Triage", eta: "In ER", priority: 2, type: "Pedestrian Accident", ambulance: "Walk-in" },
  { id: "q4", patient: "TBD", status: "Dispatched", eta: "14 min", priority: 3, type: "Medical SOS Alert", ambulance: "AMB-002" }
];

export default function EmergencyQueuePage() {
  const [queue, setQueue] = useState(initialQueue);

  const handleAction = (id: string, newStatus: string) => {
    setQueue(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Emergency Intake Queue"
        description="Monitor real-time incoming emergencies, assign trauma bays, and coordinate EMT-to-ER handoffs."
        breadcrumbs={[
          { label: "Home", href: "/hospital" },
          { label: "Emergency Queue" },
        ]}
      />

      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Active Alerts" value={queue.length} icon={Siren} color="text-red-400" description="Incoming ER cases" />
        <StatCard label="Critical Priority 1" value={queue.filter(q => q.priority === 1).length} icon={Heart} color="text-orange-400" description="Requires immediate trauma bay" />
        <StatCard label="Units En Route" value={queue.filter(q => q.status === "En Route" || q.status === "Dispatched").length} icon={Radio} color="text-blue-400" description="Ambulance tracking active" />
        <StatCard label="Avg ER Wait Time" value="12 min" icon={Clock} color="text-amber-400" description="-18% change this week" />
      </motion.div>

      <Card>
        <CardHeader className="border-b border-border-subtle bg-bg-elevated/20 py-4 px-6">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Activity className="h-5 w-5 text-red-500 animate-pulse" />
            Live ER Triage Intake Pipeline
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-4">
            {queue.length > 0 ? queue.map((item) => (
              <motion.div 
                key={item.id} 
                variants={staggerItem}
                className="flex flex-col md:flex-row items-start md:items-center gap-4 rounded-xl border border-border-subtle p-5 hover:bg-bg-elevated/30 transition-all hover:shadow-glow"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl shrink-0 ${
                  item.priority === 1 ? "bg-red-500/15 text-red-400" :
                  item.priority === 2 ? "bg-orange-500/15 text-orange-400" :
                  "bg-amber-500/15 text-amber-400"
                }`}>
                  <Siren className="h-6 w-6" />
                </div>

                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-base font-semibold text-text-primary">{item.type}</h4>
                    <Badge variant={item.priority === 1 ? "danger" : "warning"} className="text-[10px] uppercase font-extrabold">
                      Priority {item.priority}
                    </Badge>
                    <Badge variant="outline" className="text-[10px] uppercase border-border-default">
                      {item.status}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5 text-xs text-text-secondary">
                    <span className="flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5" />
                      Patient: <strong className="text-text-primary">{item.patient}</strong>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-primary" />
                      ETA: <strong className="text-text-primary">{item.eta}</strong>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Radio className="h-3.5 w-3.5" />
                      EMS Unit: <span className="font-mono text-text-muted">{item.ambulance}</span>
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-4 md:pt-0 border-t border-border-subtle md:border-t-0 w-full md:w-auto justify-end">
                  {item.status === "Dispatched" && (
                    <Button size="sm" onClick={() => handleAction(item.id, "En Route")}>
                      Acknowledge Run
                    </Button>
                  )}
                  {item.status === "En Route" && (
                    <Button size="sm" variant="outline" onClick={() => handleAction(item.id, "Trauma Prep")}>
                      Prepare Trauma Bay
                    </Button>
                  )}
                  {item.status === "Trauma Prep" && (
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => handleAction(item.id, "ER Triage")}>
                      Mark Arrived
                    </Button>
                  )}
                  {item.status === "ER Triage" && (
                    <Button size="sm" variant="ghost" className="text-emerald-400 hover:text-emerald-300">
                      <CheckCircle2 className="h-4 w-4 mr-1.5" /> Admitted to Ward
                    </Button>
                  )}
                </div>
              </motion.div>
            )) : (
              <div className="text-center py-12 text-text-muted flex flex-col items-center">
                <CheckCircle2 className="h-8 w-8 mb-4 text-emerald-500" />
                <p>Intake queue is clear. No active alerts.</p>
              </div>
            )}
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}
