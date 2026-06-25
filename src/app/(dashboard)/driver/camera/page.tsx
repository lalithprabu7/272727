"use client";

import { motion } from "framer-motion";
import { Camera, AlertTriangle, ShieldAlert, Video, Disc2, Share2, Download } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const recordings = [
  {
    id: 1,
    title: "Harsh Braking Event",
    time: "Today, 14:32",
    duration: "00:45",
    type: "AI Alert",
    severity: "Medium",
  },
  {
    id: 2,
    title: "Close Tailgating",
    time: "Yesterday, 09:15",
    duration: "01:20",
    type: "Safety Event",
    severity: "High",
  },
  {
    id: 3,
    title: "Lane Departure",
    time: "Oct 12, 18:45",
    duration: "00:30",
    type: "AI Alert",
    severity: "Low",
  },
];

export default function CameraPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashcam Feed"
        description="Live view and recent recordings from your vehicle's cameras."
        breadcrumbs={[
          { label: "Home", href: "/driver" },
          { label: "Safety", href: "/driver/score" },
          { label: "Camera" },
        ]}
        actions={
          <Button variant="outline" className="gap-2">
            <Video className="h-4 w-4" />
            Connect Camera
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="overflow-hidden">
            <div className="relative aspect-video bg-black flex items-center justify-center">
              {/* Fake Live Feed */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="flex h-3 w-3 rounded-full bg-red-500 animate-pulse" />
                <span className="text-white text-sm font-medium tracking-wider shadow-sm">LIVE</span>
              </div>
              <div className="absolute top-4 right-4 text-white text-sm font-mono shadow-sm">
                CAM_FRONT_1080P
              </div>
              <Camera className="h-16 w-16 text-white/20" />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white/70 text-xs font-mono">
                <span>{new Date().toISOString().split('T')[0]} 14:35:22</span>
                <span>65 km/h • 45.42°N 75.69°W</span>
              </div>
            </div>
            <div className="p-4 border-t border-border-subtle bg-bg-card flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Button size="sm" className="gap-2">
                  <Disc2 className="h-4 w-4" /> Record Clip
                </Button>
                <Button size="sm" variant="outline" className="gap-2">
                  <Share2 className="h-4 w-4" /> Share
                </Button>
              </div>
              <Badge variant="outline" className="text-emerald-400 border-emerald-400/20 bg-emerald-400/10">
                System Online
              </Badge>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-red-400" />
            Event Recordings
          </h3>
          <div className="space-y-4">
            {recordings.map((rec) => (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-4 space-y-3 hover:border-primary/50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-text-primary">{rec.title}</h4>
                    <p className="text-xs text-text-muted mt-1">{rec.time}</p>
                  </div>
                  <Badge variant={rec.severity === "High" ? "danger" : rec.severity === "Medium" ? "warning" : "outline"}>
                    {rec.severity}
                  </Badge>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2 text-xs text-text-secondary">
                    <Video className="h-3 w-3" /> {rec.duration}
                  </div>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
