export type Role = "driver" | "family" | "citizen" | "police" | "hospital" | "insurance" | "admin";

export type IncidentSeverity = "low" | "medium" | "high" | "critical";
export type IncidentStatus = "reported" | "acknowledged" | "dispatched" | "in_progress" | "resolved" | "closed";
export type ClaimStatus = "submitted" | "under_review" | "approved" | "rejected" | "paid";
export type EmergencyStatus = "triggered" | "dispatched" | "en_route" | "arrived" | "resolved";
export type VehicleStatus = "active" | "maintenance" | "inactive";
export type TripStatus = "in_progress" | "completed" | "aborted";

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatarUrl?: string;
  role: Role;
  isActive: boolean;
  emailVerified: boolean;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Driver {
  id: string;
  userId: string;
  user?: User;
  licenseNumber: string;
  licenseExpiry: string;
  safetyScore: number;
  driverScore: number;
  totalTrips: number;
  totalDistance: number;
  status: "online" | "offline" | "driving";
  lastLatitude?: number;
  lastLongitude?: number;
  createdAt: string;
  updatedAt: string;
  vehicles?: Vehicle[];
}

export interface Vehicle {
  id: string;
  driverId: string;
  make: string;
  model: string;
  year: number;
  plateNumber: string;
  vin?: string;
  fuelType: string;
  status: VehicleStatus;
  healthScore: number;
  lastServiceDate?: string;
  mileage: number;
  createdAt: string;
  updatedAt: string;
}

export interface Trip {
  id: string;
  driverId: string;
  vehicleId: string;
  startLatitude: number;
  startLongitude: number;
  endLatitude?: number;
  endLongitude?: number;
  startAddress?: string;
  endAddress?: string;
  distance?: number;
  duration?: number;
  avgSpeed?: number;
  maxSpeed?: number;
  fuelConsumed?: number;
  safetyScore?: number;
  status: TripStatus;
  startedAt: string;
  endedAt?: string;
  events?: TripEvent[];
}

export interface TripEvent {
  id: string;
  tripId: string;
  type: "harsh_brake" | "overspeed" | "sharp_turn" | "sudden_acceleration" | "fatigue_detected";
  latitude: number;
  longitude: number;
  value?: number;
  description?: string;
  timestamp: string;
}

export interface Incident {
  id: string;
  type: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  latitude: number;
  longitude: number;
  address?: string;
  description: string;
  reportedById?: string;
  driverId?: string;
  assignedOfficer?: string;
  evidenceUrls: string[];
  aiConfidence?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Emergency {
  id: string;
  driverId?: string;
  incidentId?: string;
  type: string;
  status: EmergencyStatus;
  latitude: number;
  longitude: number;
  priority: number;
  dispatchedAt?: string;
  resolvedAt?: string;
  responseTime?: number;
  hospitalId?: string;
  ambulanceId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Report {
  id: string;
  userId: string;
  type: string;
  title: string;
  description: string;
  latitude?: number;
  longitude?: number;
  address?: string;
  imageUrls: string[];
  videoUrls: string[];
  status: string;
  isAnonymous: boolean;
  upvotes: number;
  createdAt: string;
  updatedAt: string;
}

export interface Claim {
  id: string;
  incidentId: string;
  policyNumber: string;
  claimantName: string;
  claimAmount: number;
  status: ClaimStatus;
  fraudScore?: number;
  description: string;
  evidenceUrls: string[];
  verifiedAt?: string;
  resolvedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
  totalBeds: number;
  availableBeds: number;
  icuBeds: number;
  icuAvailable: number;
  isActive: boolean;
}

export interface Doctor {
  id: string;
  hospitalId: string;
  name: string;
  specialization: string;
  isAvailable: boolean;
  phone: string;
}

export interface Ambulance {
  id: string;
  hospitalId: string;
  vehicleNumber: string;
  status: "available" | "dispatched" | "en_route" | "at_scene" | "returning";
  latitude?: number;
  longitude?: number;
  crewMembers: number;
}

export interface PoliceStation {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
  jurisdiction?: string;
  isActive: boolean;
}

export interface Officer {
  id: string;
  stationId: string;
  name: string;
  badgeNumber: string;
  rank: string;
  isOnDuty: boolean;
  phone: string;
  status?: "available" | "busy" | "en_route";
  currentLatitude?: number;
  currentLongitude?: number;
}

export interface AIAlert {
  id: string;
  driverId?: string;
  type: string;
  severity: string;
  confidence: number;
  message: string;
  latitude?: number;
  longitude?: number;
  isAcknowledged: boolean;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "info" | "warning" | "error" | "success" | "emergency";
  isRead: boolean;
  actionUrl?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName?: string;
  action: string;
  entity: string;
  entityId?: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
  createdAt: string;
}

export interface StatCardData {
  label: string;
  value: string | number;
  change?: number;
  trend?: "up" | "down" | "neutral";
  icon?: React.ComponentType<{ className?: string }>;
  color?: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}

export interface MapMarker {
  id: string;
  latitude: number;
  longitude: number;
  type: "vehicle" | "incident" | "hospital" | "police" | "ambulance" | "hazard";
  label?: string;
  data?: Record<string, unknown>;
}

export interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  children?: NavItem[];
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

import type React from "react";
