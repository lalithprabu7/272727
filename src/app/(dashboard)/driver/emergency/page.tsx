"use client";

import { motion } from "framer-motion";
import { ShieldAlert, Phone, MapPin, AlertTriangle, Cross, Siren } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function EmergencyPage() {
  const [isPressing, setIsPressing] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const { toast } = useToast();

  const handleSosPress = () => {
    setIsPressing(true);
    let count = 3;
    setCountdown(count);
    
    const interval = setInterval(() => {
      count -= 1;
      setCountdown(count);
      
      if (count === 0) {
        clearInterval(interval);
        setIsPressing(false);
        toast({
          title: "SOS Activated!",
          description: "Emergency services have been dispatched to your location.",
          variant: "destructive",
        });
      }
    }, 1000);

    // Cancel mechanism could be added here
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="Emergency SOS"
        description="Immediately dispatch emergency services to your location."
        breadcrumbs={[
          { label: "Home", href: "/driver" },
          { label: "Emergency" },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="md:col-span-2 border-red-500/20 bg-gradient-to-b from-bg-card to-red-500/5">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onPointerDown={handleSosPress}
              onPointerUp={() => setIsPressing(false)}
              onPointerLeave={() => setIsPressing(false)}
              className={`relative h-48 w-48 rounded-full flex items-center justify-center transition-colors shadow-[0_0_50px_rgba(220,38,38,0.3)] ${
                isPressing ? "bg-red-700" : "bg-red-600 hover:bg-red-500"
              }`}
            >
              <div className="absolute inset-0 rounded-full border-[6px] border-red-400/30 animate-ping" style={{ animationDuration: '3s' }} />
              <div className="flex flex-col items-center gap-2 text-white">
                <ShieldAlert className="h-12 w-12" />
                <span className="text-2xl font-bold tracking-widest uppercase">SOS</span>
                {isPressing && (
                  <span className="absolute bottom-6 text-sm font-medium">Hold... {countdown}</span>
                )}
              </div>
            </motion.button>
            <p className="mt-8 text-center text-text-secondary max-w-md">
              Press and hold the SOS button for 3 seconds to immediately dispatch police, ambulance, and notify your emergency contacts.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-blue-400" />
              Quick Dial
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start h-14 text-lg">
              <Siren className="mr-3 h-5 w-5 text-red-500" /> Police (911)
            </Button>
            <Button variant="outline" className="w-full justify-start h-14 text-lg">
              <Cross className="mr-3 h-5 w-5 text-emerald-500" /> Ambulance
            </Button>
            <Button variant="outline" className="w-full justify-start h-14 text-lg">
              <AlertTriangle className="mr-3 h-5 w-5 text-amber-500" /> Roadside Assistance
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-purple-400" />
              Your Current Location
            </CardTitle>
            <CardDescription>This location is sent to emergency responders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-32 bg-bg-elevated rounded-lg border border-border-subtle flex items-center justify-center flex-col gap-2">
              <p className="font-medium text-text-primary">123 Main St, New York, NY</p>
              <p className="text-sm font-mono text-text-muted">Lat: 40.7128, Lng: -74.0060</p>
            </div>
            <div className="mt-4 flex gap-2">
              <Button className="flex-1" variant="secondary">Share Location</Button>
              <Button className="flex-1" variant="secondary">Refresh</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
