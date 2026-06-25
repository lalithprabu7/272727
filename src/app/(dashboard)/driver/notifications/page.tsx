"use client";

import { motion } from "framer-motion";
import { Bell, ShieldAlert, Navigation, Settings } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const notificationsList = [
  {
    id: 1,
    title: "Safety Score Updated",
    message: "Your weekly driving score has increased by 3 points. Keep up the good work!",
    time: "2 hours ago",
    icon: Bell,
    read: false,
  },
  {
    id: 2,
    title: "New Route Suggestion",
    message: "A faster route to your regular destination is available. Save up to 15 mins.",
    time: "5 hours ago",
    icon: Navigation,
    read: false,
  },
  {
    id: 3,
    title: "System Maintenance",
    message: "Dashcam software update scheduled for tonight at 2:00 AM.",
    time: "1 day ago",
    icon: Settings,
    read: true,
  },
  {
    id: 4,
    title: "Harsh Braking Detected",
    message: "An event was recorded on Main St. Please review the footage in your camera tab.",
    time: "2 days ago",
    icon: ShieldAlert,
    read: true,
  },
];

export default function NotificationsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Notifications"
        description="Stay updated with system alerts, route changes, and safety updates."
        breadcrumbs={[
          { label: "Home", href: "/driver" },
          { label: "System", href: "/driver/settings" },
          { label: "Notifications" },
        ]}
        actions={
          <Button variant="outline" size="sm">
            Mark all as read
          </Button>
        }
      />

      <Card>
        <CardContent className="p-0 divide-y divide-border-subtle">
          {notificationsList.map((notif) => (
            <div
              key={notif.id}
              className={`p-6 flex items-start gap-4 transition-colors hover:bg-bg-elevated/50 ${
                !notif.read ? "bg-primary/5" : ""
              }`}
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                  !notif.read ? "bg-primary/20 text-primary" : "bg-bg-elevated text-text-muted"
                }`}
              >
                <notif.icon className="h-5 w-5" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-start">
                  <p className={`font-medium ${!notif.read ? "text-text-primary" : "text-text-secondary"}`}>
                    {notif.title}
                  </p>
                  <span className="text-xs text-text-muted">{notif.time}</span>
                </div>
                <p className="text-sm text-text-muted max-w-2xl">{notif.message}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
