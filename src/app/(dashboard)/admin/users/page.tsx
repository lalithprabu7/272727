"use client";

import { motion } from "framer-motion";
import { Search, Filter, ShieldCheck, Mail, Edit, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { staggerContainer, staggerItem } from "@/lib/constants";
import { mockUsers } from "@/data/mock";

export default function UserManagementPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="User & Access Management"
        description="Manage cross-platform roles, permissions, and account status for all SafeDrive+ users."
        breadcrumbs={[
          { label: "Home", href: "/admin" },
          { label: "Users" },
        ]}
        actions={
          <Button>
            <ShieldCheck className="h-4 w-4 mr-2" /> Invite User
          </Button>
        }
      />

      <Card>
        <CardHeader className="pb-3 border-b border-border-subtle">
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
              <Input placeholder="Search users by name, email, or role..." className="pl-10 w-full" />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button variant="secondary" className="flex-1 sm:flex-none">
                <Filter className="h-4 w-4 mr-2" /> Filter Role
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-text-muted uppercase bg-bg-elevated border-b border-border-subtle">
                <tr>
                  <th className="px-6 py-4 font-semibold">User</th>
                  <th className="px-6 py-4 font-semibold">Role</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Last Active</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <motion.tbody variants={staggerContainer} initial="initial" animate="animate" className="divide-y divide-border-subtle">
                {mockUsers.map((user) => (
                  <motion.tr key={user.id} variants={staggerItem} className="hover:bg-bg-elevated/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-text-primary">{user.name}</p>
                          <p className="text-xs text-text-muted">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className="uppercase text-[10px] bg-bg-root">
                        {user.role}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={user.isActive ? "success" : "secondary"} className="uppercase text-[10px]">
                        {user.isActive ? "Active" : "Suspended"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-text-muted">
                      {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleDateString() : "Never"}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-400">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
