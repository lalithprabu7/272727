"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Search, FileText, Camera, Video, AlertTriangle, ShieldCheck, Download, ChevronRight, Activity, Calendar, MapPin } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockClaims } from "@/data/mock";
import { staggerContainer, staggerItem } from "@/lib/constants";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const telemetryData = [
  { time: "14:24:50", speed: 45, gForce: 0.1 },
  { time: "14:24:51", speed: 46, gForce: 0.2 },
  { time: "14:24:52", speed: 48, gForce: 0.25 },
  { time: "14:24:53", speed: 42, gForce: 0.8 },
  { time: "14:24:54", speed: 12, gForce: 3.8 }, // Impact point
  { time: "14:24:55", speed: 0, gForce: 0.4 },
  { time: "14:24:56", speed: 0, gForce: 0.1 },
];

export default function EvidenceViewerPage() {
  const [selectedClaimId, setSelectedClaimId] = useState(mockClaims[0]?.id || "");
  const selectedClaim = mockClaims.find((c) => c.id === selectedClaimId) || mockClaims[0];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Evidence Viewer"
        description="Verify accident details using live sensor logs, media files, and police summaries."
        breadcrumbs={[
          { label: "Home", href: "/insurance" },
          { label: "Evidence Viewer" },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Claims selector */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Select Claim</CardTitle>
              <CardDescription>Choose a claim to load evidence package</CardDescription>
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
                    <Badge variant={(claim.fraudScore ?? 0) > 0.5 ? "danger" : "default"} className="text-[9px]">
                      {(claim.fraudScore ?? 0) > 0.5 ? "High Risk" : "Low Risk"}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-xs text-text-muted">
                    <span>Policy: {claim.policyNumber}</span>
                    <span className="font-semibold">${claim.claimAmount.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick claim details */}
          {selectedClaim && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-400" />
                  Claim Dossier
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex justify-between py-2 border-b border-border-subtle">
                  <span className="text-text-secondary">Claimant Name</span>
                  <span className="font-medium text-text-primary">{selectedClaim.claimantName}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border-subtle">
                  <span className="text-text-secondary">Policy Number</span>
                  <span className="font-mono text-text-primary">{selectedClaim.policyNumber}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border-subtle">
                  <span className="text-text-secondary">Requested Amount</span>
                  <span className="font-mono text-emerald-400 font-bold">${selectedClaim.claimAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border-subtle">
                  <span className="text-text-secondary">Fraud Score</span>
                  <span className={`font-semibold ${selectedClaim.fraudScore && selectedClaim.fraudScore > 0.5 ? "text-red-400" : "text-emerald-400"}`}>
                    {selectedClaim.fraudScore ? `${Math.round(selectedClaim.fraudScore * 100)}%` : "N/A"}
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-text-secondary block">Accident Narrative</span>
                  <p className="text-xs text-text-muted leading-relaxed p-2.5 rounded bg-bg-root border border-border-default">
                    {selectedClaim.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Columns: Evidence dashboard */}
        <div className="lg:col-span-2 space-y-6">
          {/* Telemetry charts */}
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  <Activity className="h-5 w-5 text-amber-400" />
                  G-Force & Speed Telematics
                </CardTitle>
                <CardDescription>Blackbox sensor telemetry at impact timestamp</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" /> Export Logs
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={telemetryData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="time" />
                    <YAxis yAxisId="left" label={{ value: 'Speed (mph)', angle: -90, position: 'insideLeft' }} />
                    <YAxis yAxisId="right" orientation="right" label={{ value: 'G-Force', angle: 90, position: 'insideRight' }} />
                    <Tooltip contentStyle={{ backgroundColor: "#111827", border: "1px solid #374151" }} />
                    <Area yAxisId="left" type="monotone" dataKey="speed" stroke="#2563EB" fill="#2563EB" fillOpacity={0.1} />
                    <Area yAxisId="right" type="monotone" dataKey="gForce" stroke="#DC2626" fill="#DC2626" fillOpacity={0.1} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Media Attachments */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Video className="h-4 w-4 text-blue-400" />
                  Dashcam Footage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video w-full rounded-lg bg-bg-root border border-border-default flex flex-col items-center justify-center text-text-muted relative overflow-hidden group">
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-all cursor-pointer">
                    <Button size="icon" variant="glow" className="rounded-full h-12 w-12 glow-primary">
                      ▶
                    </Button>
                  </div>
                  <span className="text-xs text-text-secondary mt-16 z-10 font-mono">dashcam_front_clip.mp4</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Camera className="h-4 w-4 text-purple-400" />
                  Impact Damage Photos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <div className="aspect-video rounded bg-bg-root border border-border-default flex items-center justify-center text-[10px] text-text-muted">
                    front_bumper.jpg
                  </div>
                  <div className="aspect-video rounded bg-bg-root border border-border-default flex items-center justify-center text-[10px] text-text-muted">
                    side_fender.jpg
                  </div>
                  <div className="aspect-video rounded bg-bg-root border border-border-default flex items-center justify-center text-[10px] text-text-muted">
                    road_scene.jpg
                  </div>
                  <div className="aspect-video rounded bg-bg-root border border-border-default flex items-center justify-center text-[10px] text-text-muted">
                    license_plate.jpg
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Official reports link/metadata */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <FileText className="h-4 w-4 text-emerald-400" />
                Linked Police Report Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between gap-4 p-4 rounded-xl bg-bg-root border border-border-default text-sm">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-text-primary font-medium">
                    <MapPin className="h-4 w-4 text-text-muted" /> NYC Police Station #19
                  </div>
                  <div className="text-xs text-text-muted">Report ID: PR-99120511</div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-text-primary font-medium">
                    <Calendar className="h-4 w-4 text-text-muted" /> June 24, 2026
                  </div>
                  <div className="text-xs text-text-muted">Officer Maria Reyes (Badge NYPD-4521)</div>
                </div>
                <Badge variant="success" className="h-fit">Verified Match</Badge>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed bg-bg-card/50 p-3 rounded border border-border-subtle">
                &quot;Responding officer confirmed collision between vehicle A (claimant) and vehicle B. Damages are matching telematics telemetry. Speed limits and conditions logged correctly in report dossier.&quot;
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
