"use client";

import { motion } from "framer-motion";
import { Fuel, TrendingDown, DollarSign, Activity, Settings2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { staggerContainer, staggerItem } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const fuelData = [
  { day: "Mon", consumption: 12.4, cost: 45.2, efficiency: 8.2 },
  { day: "Tue", consumption: 15.2, cost: 55.4, efficiency: 7.9 },
  { day: "Wed", consumption: 10.8, cost: 39.5, efficiency: 8.5 },
  { day: "Thu", consumption: 18.1, cost: 66.2, efficiency: 7.5 },
  { day: "Fri", consumption: 14.3, cost: 52.1, efficiency: 8.1 },
  { day: "Sat", consumption: 8.7, cost: 31.8, efficiency: 8.8 },
  { day: "Sun", consumption: 6.2, cost: 22.6, efficiency: 9.1 },
];

export default function FuelAnalyticsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Fuel Analytics"
        description="Monitor fuel consumption, costs, and driving efficiency."
        breadcrumbs={[
          { label: "Home", href: "/driver" },
          { label: "Vehicle", href: "/driver/vehicle" },
          { label: "Fuel" },
        ]}
        actions={
          <Button variant="outline" className="gap-2">
            <Settings2 className="h-4 w-4" />
            Preferences
          </Button>
        }
      />

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <StatCard
          label="Weekly Consumption"
          value="85.7 L"
          change={-4.2}
          trend="down"
          icon={Fuel}
          color="text-amber-400"
        />
        <StatCard
          label="Total Cost"
          value="$312.80"
          change={-2.1}
          trend="down"
          icon={DollarSign}
          color="text-emerald-400"
        />
        <StatCard
          label="Avg Efficiency"
          value="8.3 L/100km"
          change={1.5}
          trend="up"
          icon={Activity}
          color="text-blue-400"
        />
        <StatCard
          label="Eco Score"
          value="92/100"
          change={5.0}
          trend="up"
          icon={TrendingDown}
          color="text-purple-400"
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={staggerItem} initial="initial" animate="animate">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Fuel className="h-5 w-5 text-amber-400" />
                Consumption Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={fuelData}>
                  <defs>
                    <linearGradient id="fuelGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#111827",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="consumption"
                    stroke="#F59E0B"
                    strokeWidth={2}
                    fill="url(#fuelGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={staggerItem} initial="initial" animate="animate">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-400" />
                Efficiency (L/100km)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={fuelData}>
                  <defs>
                    <linearGradient id="effGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 15]} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#111827",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="efficiency"
                    stroke="#2563EB"
                    strokeWidth={2}
                    fill="url(#effGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
