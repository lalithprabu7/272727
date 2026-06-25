"use client";

import { motion } from "framer-motion";
import { Users, Search, Filter, Shield, Award, MapPin, Phone, Mail, MoreVertical } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { staggerContainer, staggerItem } from "@/lib/constants";
import { mockOfficers } from "@/data/mock";

export default function OfficerManagementPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Officer Management"
        description="Manage police personnel, view duty status, and monitor officer performance metrics."
        breadcrumbs={[
          { label: "Home", href: "/police" },
          { label: "Officers" },
        ]}
      />

      <Card>
        <CardHeader className="pb-3 border-b border-border-subtle">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
              <Input placeholder="Search officer by name, badge, or precinct..." className="pl-10 w-full" />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button variant="secondary" className="flex-1 sm:flex-none">
                <Filter className="h-4 w-4 mr-2" /> Filter
              </Button>
              <Button className="flex-1 sm:flex-none">
                <Users className="h-4 w-4 mr-2" /> Add Officer
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockOfficers.map((officer) => (
              <motion.div key={officer.id} variants={staggerItem}>
                <Card className="hover:border-primary/50 transition-colors cursor-pointer overflow-hidden group">
                  <div className="h-2 w-full bg-gradient-to-r from-blue-500 to-indigo-500" />
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-bg-elevated border-2 border-border-default flex items-center justify-center shrink-0">
                          {officer.isOnDuty ? (
                            <Shield className="h-6 w-6 text-blue-400" />
                          ) : (
                            <Users className="h-6 w-6 text-text-muted" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold text-text-primary text-lg">{officer.name}</h4>
                          <p className="text-sm text-text-muted">Badge: {officer.badgeNumber}</p>
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
                          officer.status === "available" ? "default" :
                          officer.status === "busy" ? "warning" : "secondary"
                        } className="uppercase text-[10px]">
                          {officer.isOnDuty ? officer.status : "Off Duty"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-muted">Precinct</span>
                        <span className="font-medium">{officer.stationId.toUpperCase()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-muted">Current Location</span>
                        <span className="font-medium flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {officer.isOnDuty ? "Active Area" : "N/A"}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 border-t border-border-subtle pt-4">
                      <Button variant="secondary" size="sm" className="flex-1">
                        <Phone className="h-3 w-3 mr-2" /> Call
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
