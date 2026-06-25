"use client";

import { User, Bell, Shield, Key, Moon, Sun } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <PageHeader
        title="Settings"
        description="Manage your account preferences, notifications, and privacy."
        breadcrumbs={[
          { label: "Home", href: "/driver" },
          { label: "System", href: "/driver/notifications" },
          { label: "Settings" },
        ]}
      />

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Profile Details
            </CardTitle>
            <CardDescription>Update your personal information and contact details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-secondary">Full Name</label>
                <input
                  type="text"
                  defaultValue="John Doe"
                  className="w-full h-10 px-3 rounded-md bg-bg-elevated border border-border-default focus:border-primary focus:outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-secondary">Email Address</label>
                <input
                  type="email"
                  defaultValue="john@example.com"
                  className="w-full h-10 px-3 rounded-md bg-bg-elevated border border-border-default focus:border-primary focus:outline-none transition-colors"
                />
              </div>
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-amber-400" />
              Notification Preferences
            </CardTitle>
            <CardDescription>Choose how you want to be alerted about driving events.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-text-primary">Push Notifications</p>
                  <p className="text-sm text-text-muted">Receive alerts on your mobile device.</p>
                </div>
                <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-text-primary">Email Summaries</p>
                  <p className="text-sm text-text-muted">Weekly driving performance reports.</p>
                </div>
                <div className="w-12 h-6 bg-bg-elevated border border-border-default rounded-full relative cursor-pointer">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-text-muted rounded-full"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
