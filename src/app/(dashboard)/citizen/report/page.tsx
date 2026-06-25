"use client";

import { useState } from "react";
import { Camera, MapPin, Upload, AlertTriangle, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function ReportIncidentPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Report Submitted Successfully",
        description: "Thank you for making our roads safer. Police have been notified.",
        variant: "default",
      });
      // In a real app, we would clear the form here
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="Report an Incident"
        description="Help keep your community safe by reporting road hazards, accidents, or reckless driving directly to local authorities."
        breadcrumbs={[
          { label: "Home", href: "/citizen" },
          { label: "Report Incident" },
        ]}
      />

      <Card>
        <CardHeader className="border-b border-border-subtle">
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            New Report Form
          </CardTitle>
          <CardDescription>All reports are securely transmitted to the SafeDrive+ Police Command Center.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="p-6 space-y-8">
            {/* Type & Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="incident-type">Incident Type <span className="text-red-500">*</span></Label>
                <Select required>
                  <SelectTrigger id="incident-type">
                    <SelectValue placeholder="Select type..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="accident">Traffic Accident</SelectItem>
                    <SelectItem value="hazard">Road Hazard / Debris</SelectItem>
                    <SelectItem value="reckless">Reckless Driving</SelectItem>
                    <SelectItem value="traffic">Severe Traffic Jam</SelectItem>
                    <SelectItem value="weather">Weather Condition</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                <Label htmlFor="location">Location <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                  <Input id="location" placeholder="Street address or GPS coords..." className="pl-10" required />
                  <Button type="button" variant="ghost" size="sm" className="absolute right-1 top-1/2 -translate-y-1/2 text-primary hover:bg-primary/10 h-7 px-2">
                    Locate Me
                  </Button>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <Label htmlFor="description">Detailed Description <span className="text-red-500">*</span></Label>
              <Textarea 
                id="description" 
                placeholder="Please describe what you saw. Include vehicle descriptions, license plates, or specific hazards if possible." 
                className="min-h-[120px]"
                required
              />
            </div>

            {/* Evidence Upload */}
            <div className="space-y-3">
              <Label>Photographic Evidence</Label>
              <div className="border-2 border-dashed border-border-default rounded-xl p-8 text-center hover:bg-bg-elevated transition-colors cursor-pointer group">
                <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Camera className="h-6 w-6" />
                </div>
                <h4 className="text-sm font-semibold text-text-primary mb-1">Click to upload or drag and drop</h4>
                <p className="text-xs text-text-muted">SVG, PNG, JPG or MP4 (max. 10MB)</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-6 border-t border-border-subtle bg-bg-elevated flex justify-between items-center rounded-b-xl">
            <div className="flex items-center gap-2 text-xs text-text-muted">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              Your identity is protected.
            </div>
            <div className="flex gap-3">
              <Button type="button" variant="outline">Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Report"}
                {!isSubmitting && <Upload className="h-4 w-4 ml-2" />}
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
