import type { Role } from "@/types";

export type Permission =
  | "dashboard:view"
  | "gps:track"
  | "gps:view_others"
  | "trips:view"
  | "trips:manage"
  | "vehicle:manage"
  | "emergency:sos"
  | "emergency:dispatch"
  | "emergency:view"
  | "incidents:report"
  | "incidents:manage"
  | "incidents:view"
  | "reports:create"
  | "reports:view"
  | "reports:manage"
  | "claims:create"
  | "claims:manage"
  | "claims:view"
  | "fraud:detect"
  | "hospital:manage"
  | "hospital:view"
  | "users:manage"
  | "users:view"
  | "devices:manage"
  | "roles:manage"
  | "audit:view"
  | "analytics:view"
  | "analytics:global"
  | "ai:alerts"
  | "ai:manage"
  | "settings:manage"
  | "settings:global"
  | "export:data"
  | "community:participate"
  | "family:track"
  | "family:alerts";

const rolePermissions: Record<Role, Permission[]> = {
  driver: [
    "dashboard:view",
    "gps:track",
    "trips:view",
    "trips:manage",
    "vehicle:manage",
    "emergency:sos",
    "incidents:report",
    "analytics:view",
    "ai:alerts",
    "settings:manage",
    "export:data",
  ],
  family: [
    "dashboard:view",
    "family:track",
    "family:alerts",
    "trips:view",
    "analytics:view",
    "settings:manage",
  ],
  citizen: [
    "dashboard:view",
    "reports:create",
    "reports:view",
    "incidents:report",
    "community:participate",
    "settings:manage",
  ],
  police: [
    "dashboard:view",
    "gps:view_others",
    "incidents:manage",
    "incidents:view",
    "emergency:dispatch",
    "emergency:view",
    "analytics:view",
    "ai:alerts",
    "settings:manage",
    "export:data",
  ],
  hospital: [
    "dashboard:view",
    "hospital:manage",
    "hospital:view",
    "emergency:view",
    "analytics:view",
    "settings:manage",
    "export:data",
  ],
  insurance: [
    "dashboard:view",
    "claims:create",
    "claims:manage",
    "claims:view",
    "fraud:detect",
    "analytics:view",
    "settings:manage",
    "export:data",
  ],
  admin: [
    "dashboard:view",
    "gps:track",
    "gps:view_others",
    "trips:view",
    "trips:manage",
    "vehicle:manage",
    "emergency:sos",
    "emergency:dispatch",
    "emergency:view",
    "incidents:report",
    "incidents:manage",
    "incidents:view",
    "reports:create",
    "reports:view",
    "reports:manage",
    "claims:create",
    "claims:manage",
    "claims:view",
    "fraud:detect",
    "hospital:manage",
    "hospital:view",
    "users:manage",
    "users:view",
    "devices:manage",
    "roles:manage",
    "audit:view",
    "analytics:view",
    "analytics:global",
    "ai:alerts",
    "ai:manage",
    "settings:manage",
    "settings:global",
    "export:data",
    "community:participate",
    "family:track",
    "family:alerts",
  ],
};

export function hasPermission(role: Role, permission: Permission): boolean {
  return rolePermissions[role]?.includes(permission) ?? false;
}

export function getPermissions(role: Role): Permission[] {
  return rolePermissions[role] ?? [];
}

export function hasAnyPermission(role: Role, permissions: Permission[]): boolean {
  return permissions.some((p) => hasPermission(role, p));
}

export function hasAllPermissions(role: Role, permissions: Permission[]): boolean {
  return permissions.every((p) => hasPermission(role, p));
}
