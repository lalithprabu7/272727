"use client";

import { useState } from "react";
import { ShieldCheck, ShieldAlert, CheckCircle2, XCircle, Search, Filter, AlertTriangle, FileText, Activity, Clock } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockClaims } from "@/data/mock";
import { staggerContainer, staggerItem } from "@/lib/constants";

export default function VerificationPage() {
  const [selectedClaimId, setSelectedClaimId] = useState(mockClaims[0]?.id || "");
  const selectedClaim = mockClaims.find((c) => c.id === selectedClaimId) || mockClaims[0];

  const verificationSteps = [
    { name: "Identity & Policy Check", description: "Verifying claimant's credentials, active policy coverage status and limits.", status: "success" },
    { name: "Incident Timestamp Match", description: "Cross-referencing telemetry logs with reported time of accident.", status: "success" },
    { name: "Police Report Integration", description: "Verifying the existence and details of a matching police crash report.", status: "success" },
    { name: "Damage Physical Trajectory", description: "Running AI crash physics simulation to verify telemetry matched reported damage areas.", status: selectedClaim?.id === "c3" ? "danger" : "success" },
    { name: "Telemetry G-Force Analysis", description: "Confirming sensor logs recorded deceleration matching a collision event.", status: selectedClaim?.id === "c3" ? "warning" : "success" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Claim Verification Hub"
        description="Verify claims automatically using multi-source telematics cross-checks."
        breadcrumbs={[
          { label: "Home", href: "/insurance" },
          { label: "Verification" },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: claim selection */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Pending Verification</CardTitle>
              <CardDescription>Select a claim to review verification pipeline</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockClaims.map((claim) => (
                <div
                  key={claim.id}
                  onClick={() => setSelectedClaimId(claim.id)}
                  className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                    selectedClaim.id === claim.id
                      ? "border-primary bg-primary/10"
                      : "border-border-subtle hover:bg-bg-elevated"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm text-text-primary">{claim.claimantName}</span>
                    <Badge variant={claim.status === "approved" ? "success" : "warning"} className="text-[9px] uppercase">
                      {claim.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-xs text-text-muted">
                    <span>ID: {claim.id}</span>
                    <span className="font-semibold text-emerald-400">${claim.claimAmount.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-gradient-to-br from-primary/5 to-bg-card border-primary/20">
            <CardContent className="p-6">
              <h4 className="text-sm font-semibold text-text-primary mb-2 flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-primary" /> Auto-Verification
              </h4>
              <p className="text-xs text-text-muted leading-relaxed">
                Our verification system runs 15 checks on every claim submission. Claims matching all criteria within threshold limits are automatically approved.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right column: verification checks list */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3 border-b border-border-subtle flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-400" />
                  Verification Audit Log
                </CardTitle>
                <CardDescription>Checking validity of policy {selectedClaim?.policyNumber}</CardDescription>
              </div>
              <Badge variant={(selectedClaim?.fraudScore ?? 0) > 0.5 ? "danger" : "success"} className="text-sm px-3 py-1">
                {(selectedClaim?.fraudScore ?? 0) > 0.5 ? "FAILED VERIFICATION" : "PASSED VERIFICATION"}
              </Badge>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border-subtle">
                {verificationSteps.map((step, i) => (
                  <div key={i} className="p-5 flex items-start gap-4 hover:bg-bg-elevated/20 transition-colors">
                    <div className="shrink-0 mt-0.5">
                      {step.status === "success" && <CheckCircle2 className="h-5 w-5 text-emerald-500" />}
                      {step.status === "warning" && <AlertTriangle className="h-5 w-5 text-amber-500" />}
                      {step.status === "danger" && <XCircle className="h-5 w-5 text-red-500" />}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-semibold text-text-primary">{step.name}</h4>
                        <span className={`text-xs font-mono px-2 py-0.5 rounded ${
                          step.status === "success" ? "text-emerald-400 bg-emerald-500/10" :
                          step.status === "warning" ? "text-amber-400 bg-amber-500/10" : "text-red-400 bg-red-500/10"
                        }`}>
                          {step.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-xs text-text-muted leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions panel */}
              <div className="p-6 border-t border-border-subtle bg-bg-elevated flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="text-xs text-text-muted">
                  Last updated {selectedClaim ? <span className="font-mono text-text-secondary">Just now</span> : ""}
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                  <Button variant="outline" className="flex-1 sm:flex-none text-red-400 border-red-500/20 hover:bg-red-500/10">
                    <XCircle className="h-4 w-4 mr-2" /> Decline Claim
                  </Button>
                  <Button className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-500 text-white">
                    <CheckCircle2 className="h-4 w-4 mr-2" /> Approve & Pay
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
