"use client";

import { motion } from "framer-motion";
import { Search, Filter, FileText, CheckCircle2, XCircle, Clock } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockClaims } from "@/data/mock";
import { staggerContainer, staggerItem } from "@/lib/constants";
import { formatRelativeTime } from "@/lib/utils";

export default function ClaimsManagementPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Claims Management"
        description="Review, process, and manage incoming vehicle accident claims submitted by policyholders."
        breadcrumbs={[
          { label: "Home", href: "/insurance" },
          { label: "Claims" },
        ]}
      />

      <Card>
        <CardHeader className="pb-3 border-b border-border-subtle">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
              <Input placeholder="Search claims by ID, policy number, or claimant..." className="pl-10 w-full" />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button variant="secondary" className="flex-1 sm:flex-none">
                <Filter className="h-4 w-4 mr-2" /> Filter Status
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="divide-y divide-border-subtle">
            {mockClaims.map((claim) => (
              <motion.div key={claim.id} variants={staggerItem} className="p-4 sm:p-6 hover:bg-bg-elevated transition-colors cursor-pointer group flex flex-col md:flex-row gap-6 justify-between">
                
                <div className="flex flex-1 items-start gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl shrink-0 ${
                    claim.status === "approved" ? "bg-emerald-500/20 text-emerald-500" : 
                    claim.status === "rejected" ? "bg-red-500/20 text-red-500" : 
                    "bg-blue-500/20 text-blue-500"
                  }`}>
                    <FileText className="h-6 w-6" />
                  </div>
                  
                  <div className="space-y-2 w-full max-w-2xl">
                    <div className="flex items-center justify-between sm:justify-start gap-3">
                      <h4 className="text-base font-semibold text-text-primary">{claim.claimantName}</h4>
                      <Badge variant={
                        claim.status === "approved" ? "success" : 
                        claim.status === "rejected" ? "danger" : 
                        claim.status === "under_review" ? "warning" : "default"
                      } className="uppercase text-[10px]">
                        {claim.status.replace("_", " ")}
                      </Badge>
                      {claim.fraudScore && claim.fraudScore > 75 && (
                        <Badge variant="danger" className="uppercase text-[10px] ml-2 animate-pulse-glow">
                          High Fraud Risk ({claim.fraudScore}%)
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary">
                      <span className="font-mono bg-bg-root px-2 py-0.5 rounded border border-border-default text-xs">Policy: {claim.policyNumber}</span>
                      <span className="font-mono bg-bg-root px-2 py-0.5 rounded border border-border-default text-xs">Claim ID: {claim.id}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {formatRelativeTime(claim.createdAt)}</span>
                    </div>

                    <p className="text-sm text-text-muted border-l-2 border-border-default pl-3 mt-2">{claim.description}</p>
                    
                    <div className="flex items-center gap-4 mt-3">
                      <div className="text-sm font-semibold text-text-primary">
                        Claim Amount: <span className="text-emerald-400">${claim.claimAmount.toLocaleString()}</span>
                      </div>
                      <div className="text-xs text-text-muted flex items-center gap-1">
                        <FileText className="h-3 w-3" /> {claim.evidenceUrls.length} files attached
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-3 pt-4 border-t border-border-subtle md:border-t-0 md:pt-0">
                  <Button variant="outline" size="sm" className="w-full md:w-auto">
                    View Details
                  </Button>
                  <div className="flex gap-2 w-full md:w-auto">
                    <Button variant="outline" size="sm" className="flex-1 md:flex-none text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 border-emerald-500/20" disabled={claim.status === "approved" || claim.status === "rejected"}>
                      <CheckCircle2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 md:flex-none text-red-400 hover:text-red-300 hover:bg-red-500/10 border-red-500/20" disabled={claim.status === "approved" || claim.status === "rejected"}>
                      <XCircle className="h-4 w-4" />
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
