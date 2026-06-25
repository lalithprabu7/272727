"use client";

import { motion } from "framer-motion";
import { ShieldAlert, Search, Filter, AlertTriangle, FileText, CheckCircle2, ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { mockClaims } from "@/data/mock";
import { staggerContainer, staggerItem } from "@/lib/constants";

export default function FraudDetectionPage() {
  const highRiskClaims = mockClaims
    .filter(c => c.fraudScore && c.fraudScore > 70)
    .sort((a, b) => (b.fraudScore || 0) - (a.fraudScore || 0));

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Fraud Detection"
        description="Review high-risk claims flagged by SafeDrive+ AI models using telematics data and pattern recognition."
        breadcrumbs={[
          { label: "Home", href: "/insurance" },
          { label: "Fraud Detection" },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-red-900/20 to-bg-card border-red-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center">
                <ShieldAlert className="h-5 w-5" />
              </div>
            </div>
            <p className="text-3xl font-bold text-text-primary mb-1">{highRiskClaims.length}</p>
            <p className="text-sm text-text-muted">High-Risk Claims Flagged</p>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" /> AI Detection Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 text-sm text-text-secondary leading-relaxed">
            SafeDrive+ AI cross-references claimant damage reports with raw telematics (g-force, speed, GPS logs) recorded at the exact moment of the alleged incident. 
            Claims lacking corresponding telematics data or showing impossible physical trajectories are automatically flagged for manual review.
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3 border-b border-border-subtle bg-bg-elevated sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <CardTitle className="text-sm font-medium">Flagged Queue</CardTitle>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" /> Sort by Score
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="divide-y divide-border-subtle">
            {highRiskClaims.map((claim) => (
              <motion.div key={claim.id} variants={staggerItem} className="p-6 hover:bg-bg-elevated transition-colors cursor-pointer group">
                <div className="flex flex-col lg:flex-row gap-6">
                  
                  {/* Left: Claim Info */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <h4 className="text-base font-semibold text-text-primary">{claim.claimantName}</h4>
                        <span className="font-mono text-xs text-text-muted bg-bg-root px-2 py-0.5 rounded border border-border-default">
                          ID: {claim.id}
                        </span>
                      </div>
                      <Badge variant="danger" className="animate-pulse-glow">
                        {claim.fraudScore}% Risk Score
                      </Badge>
                    </div>
                    
                    <div className="text-sm text-text-muted border-l-2 border-red-500/50 pl-3">
                      <strong>AI Red Flag:</strong> &quot;Damage report claims severe front-end collision at 60mph. Telematics data shows maximum speed of 12mph and no sudden deceleration events in the specified 4-hour window.&quot;
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-text-primary font-medium">Claim Amount: <span className="text-emerald-400">${claim.claimAmount.toLocaleString()}</span></span>
                      <span className="text-text-muted flex items-center gap-1"><FileText className="h-4 w-4" /> {claim.evidenceUrls.length} evidence files</span>
                    </div>
                  </div>

                  {/* Right: AI Analysis Breakdown */}
                  <div className="w-full lg:w-72 space-y-4 p-4 rounded-xl bg-bg-root border border-border-default">
                    <h5 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">AI Confidence Factors</h5>
                    
                    <div className="space-y-3">
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <span>Telematics Mismatch</span>
                          <span className="text-red-400">98%</span>
                        </div>
                        <Progress value={98} className="h-1.5" indicatorClassName="bg-red-500" />
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <span>Historical Claims (Freq)</span>
                          <span className="text-amber-400">65%</span>
                        </div>
                        <Progress value={65} className="h-1.5" indicatorClassName="bg-amber-500" />
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <span>Evidence Metadata Inconsistencies</span>
                          <span className="text-red-400">82%</span>
                        </div>
                        <Progress value={82} className="h-1.5" indicatorClassName="bg-red-500" />
                      </div>
                    </div>

                    <Button className="w-full mt-4" variant="secondary">
                      Investigate <ChevronRight className="h-4 w-4 ml-2" />
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
