"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Package, Activity, Shield, Users, Search, Filter, AlertTriangle, CheckCircle2, ShoppingCart, RefreshCw } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatCard } from "@/components/shared/stat-card";
import { staggerContainer, staggerItem } from "@/lib/constants";

const initialResources = [
  { id: "res1", name: "ICU Ventilators", category: "Equipment", total: 45, available: 41, status: "Normal" },
  { id: "res2", name: "Defibrillators", category: "Equipment", total: 20, available: 18, status: "Normal" },
  { id: "res3", name: "O-Negative Blood (Units)", category: "Blood Bank", total: 100, available: 32, status: "Low" },
  { id: "res4", name: "Trauma Kits", category: "Supplies", total: 150, available: 135, status: "Normal" },
  { id: "res5", name: "Surgical Gloves (Boxes)", category: "Supplies", total: 2000, available: 450, status: "Reorder Required" },
  { id: "res6", name: "Emergency Oxygen Tanks", category: "Equipment", total: 80, available: 76, status: "Normal" }
];

export default function ResourceManagementPage() {
  const [resources, setResources] = useState(initialResources);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const handleReorder = (id: string) => {
    setResources(prev => prev.map(res => {
      if (res.id === id) {
        return { ...res, status: "Ordering...", available: res.available };
      }
      return res;
    }));
  };

  const filteredResources = resources.filter(res => {
    const matchesSearch = res.name.toLowerCase().includes(search.toLowerCase()) || 
                          res.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || res.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const lowStockCount = resources.filter(r => r.status === "Low" || r.status === "Reorder Required").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Medical Resource Management"
        description="Monitor vital hospital equipment, track blood bank reserves, and manage medical supplies."
        breadcrumbs={[
          { label: "Home", href: "/hospital" },
          { label: "Resource Management" },
        ]}
      />

      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Resources tracked" value={resources.length} icon={Package} color="text-primary" />
        <StatCard label="Low Stock Alerts" value={lowStockCount} icon={AlertTriangle} color="text-red-400" />
        <StatCard label="Equipment Uptime" value="99.8%" icon={Shield} color="text-emerald-400" />
        <StatCard label="Last Audit" value="4h ago" icon={RefreshCw} color="text-blue-400" />
      </motion.div>

      <Card>
        <CardHeader className="pb-3 border-b border-border-subtle">
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
              <Input 
                placeholder="Search resources by name or category..." 
                className="pl-10 w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select 
                className="bg-bg-card border border-border-subtle rounded-lg px-3 py-1.5 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-primary w-full sm:w-48"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="Equipment">Equipment</option>
                <option value="Blood Bank">Blood Bank</option>
                <option value="Supplies">Supplies</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.length > 0 ? filteredResources.map((res) => {
              const availabilityPercent = (res.available / res.total) * 100;
              const isCritical = res.status === "Low" || res.status === "Reorder Required";
              
              return (
                <motion.div key={res.id} variants={staggerItem}>
                  <Card className={`border ${isCritical ? "border-red-500/30" : "border-border-subtle"} hover:border-border-hover transition-colors`}>
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-text-primary text-base">{res.name}</h4>
                          <p className="text-xs text-text-muted mt-0.5">{res.category}</p>
                        </div>
                        <Badge 
                          variant={isCritical ? "danger" : res.status === "Ordering..." ? "warning" : "default"}
                          className="uppercase text-[10px]"
                        >
                          {res.status}
                        </Badge>
                      </div>

                      <div className="space-y-4 pt-3 border-t border-border-subtle">
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-2xl font-bold text-text-primary">{res.available}</p>
                            <p className="text-[10px] text-text-muted uppercase font-semibold mt-0.5">Available Units</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-text-secondary">{res.total} Total</p>
                            <p className="text-[10px] text-text-muted uppercase font-semibold mt-0.5">Capacity</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="h-1.5 w-full bg-bg-root rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-1000 ${
                                isCritical ? "bg-red-500" : "bg-primary"
                              }`} 
                              style={{ width: `${availabilityPercent}%` }} 
                            />
                          </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                          {isCritical && (
                            <Button size="sm" className="w-full" onClick={() => handleReorder(res.id)}>
                              <ShoppingCart className="h-3.5 w-3.5 mr-1.5" /> Reorder Supply
                            </Button>
                          )}
                          {!isCritical && res.status !== "Ordering..." && (
                            <Button size="sm" variant="ghost" className="w-full text-text-secondary hover:text-text-primary">
                              Log Usage Audit
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            }) : (
              <div className="col-span-full py-12 text-center text-text-muted">
                No resources found matching the criteria.
              </div>
            )}
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}
