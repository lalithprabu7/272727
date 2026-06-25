import type {
  User, Driver, Vehicle, Trip, Incident, Emergency,
  Report, Claim, Notification, AIAlert, Hospital, Officer, Ambulance, AuditLog,
} from "@/types";

export const mockUsers: User[] = [
  { id: "u1", email: "alex.morgan@safedrive.plus", name: "Alex Morgan", phone: "+1-555-0101", role: "driver", isActive: true, emailVerified: true, lastLoginAt: "2026-06-24T08:30:00Z", createdAt: "2025-01-15T10:00:00Z", updatedAt: "2026-06-24T08:30:00Z" },
  { id: "u2", email: "sarah.chen@safedrive.plus", name: "Sarah Chen", phone: "+1-555-0102", role: "family", isActive: true, emailVerified: true, lastLoginAt: "2026-06-24T09:00:00Z", createdAt: "2025-02-20T10:00:00Z", updatedAt: "2026-06-24T09:00:00Z" },
  { id: "u3", email: "james.wilson@safedrive.plus", name: "James Wilson", phone: "+1-555-0103", role: "citizen", isActive: true, emailVerified: true, lastLoginAt: "2026-06-23T14:00:00Z", createdAt: "2025-03-10T10:00:00Z", updatedAt: "2026-06-23T14:00:00Z" },
  { id: "u4", email: "officer.reyes@safedrive.plus", name: "Maria Reyes", phone: "+1-555-0104", role: "police", isActive: true, emailVerified: true, lastLoginAt: "2026-06-24T07:00:00Z", createdAt: "2025-01-05T10:00:00Z", updatedAt: "2026-06-24T07:00:00Z" },
  { id: "u5", email: "dr.patel@safedrive.plus", name: "Dr. Ravi Patel", phone: "+1-555-0105", role: "hospital", isActive: true, emailVerified: true, lastLoginAt: "2026-06-24T06:00:00Z", createdAt: "2025-04-01T10:00:00Z", updatedAt: "2026-06-24T06:00:00Z" },
  { id: "u6", email: "insurance.kim@safedrive.plus", name: "David Kim", phone: "+1-555-0106", role: "insurance", isActive: true, emailVerified: true, lastLoginAt: "2026-06-24T10:00:00Z", createdAt: "2025-05-15T10:00:00Z", updatedAt: "2026-06-24T10:00:00Z" },
  { id: "u7", email: "admin@safedrive.plus", name: "System Admin", phone: "+1-555-0100", role: "admin", isActive: true, emailVerified: true, lastLoginAt: "2026-06-24T09:30:00Z", createdAt: "2025-01-01T10:00:00Z", updatedAt: "2026-06-24T09:30:00Z" },
];

export const mockDrivers: Driver[] = [
  { id: "d1", userId: "u1", licenseNumber: "DL-2024-001234", licenseExpiry: "2028-06-15T00:00:00Z", safetyScore: 92, driverScore: 88, totalTrips: 1247, totalDistance: 45280, status: "online", lastLatitude: 40.7128, lastLongitude: -74.006, createdAt: "2025-01-15T10:00:00Z", updatedAt: "2026-06-24T08:30:00Z" },
  { id: "d2", userId: "u8", licenseNumber: "DL-2024-005678", licenseExpiry: "2027-03-20T00:00:00Z", safetyScore: 76, driverScore: 71, totalTrips: 832, totalDistance: 28900, status: "driving", lastLatitude: 40.7589, lastLongitude: -73.9851, createdAt: "2025-03-01T10:00:00Z", updatedAt: "2026-06-24T09:15:00Z" },
  { id: "d3", userId: "u9", licenseNumber: "DL-2023-009012", licenseExpiry: "2027-11-30T00:00:00Z", safetyScore: 95, driverScore: 93, totalTrips: 2103, totalDistance: 78450, status: "offline", lastLatitude: 40.6892, lastLongitude: -74.0445, createdAt: "2024-11-10T10:00:00Z", updatedAt: "2026-06-23T18:00:00Z" },
];

export const mockVehicles: Vehicle[] = [
  { id: "v1", driverId: "d1", make: "Tesla", model: "Model 3", year: 2025, plateNumber: "NYC-1234", vin: "5YJ3E1EA1NF000001", fuelType: "Electric", status: "active", healthScore: 96, lastServiceDate: "2026-05-15T00:00:00Z", mileage: 32450, createdAt: "2025-01-20T10:00:00Z", updatedAt: "2026-06-24T08:00:00Z" },
  { id: "v2", driverId: "d1", make: "Toyota", model: "Camry", year: 2024, plateNumber: "NYC-5678", fuelType: "Hybrid", status: "active", healthScore: 88, lastServiceDate: "2026-04-20T00:00:00Z", mileage: 18900, createdAt: "2025-03-15T10:00:00Z", updatedAt: "2026-06-20T12:00:00Z" },
  { id: "v3", driverId: "d2", make: "Honda", model: "Civic", year: 2024, plateNumber: "NYC-9012", fuelType: "Gasoline", status: "active", healthScore: 72, lastServiceDate: "2026-02-10T00:00:00Z", mileage: 41200, createdAt: "2025-04-01T10:00:00Z", updatedAt: "2026-06-22T16:00:00Z" },
];

export const mockTrips: Trip[] = [
  { id: "t1", driverId: "d1", vehicleId: "v1", startLatitude: 40.7128, startLongitude: -74.006, endLatitude: 40.758, endLongitude: -73.9855, startAddress: "Financial District, NYC", endAddress: "Times Square, NYC", distance: 8.2, duration: 1800, avgSpeed: 28, maxSpeed: 52, fuelConsumed: 0.4, safetyScore: 94, status: "completed", startedAt: "2026-06-24T07:30:00Z", endedAt: "2026-06-24T08:00:00Z" },
  { id: "t2", driverId: "d1", vehicleId: "v1", startLatitude: 40.758, startLongitude: -73.9855, endLatitude: 40.7829, endLongitude: -73.9654, startAddress: "Times Square, NYC", endAddress: "Central Park, NYC", distance: 4.5, duration: 900, avgSpeed: 22, maxSpeed: 45, fuelConsumed: 0.2, safetyScore: 98, status: "completed", startedAt: "2026-06-24T08:15:00Z", endedAt: "2026-06-24T08:30:00Z" },
  { id: "t3", driverId: "d2", vehicleId: "v3", startLatitude: 40.7589, startLongitude: -73.9851, startAddress: "Midtown, NYC", distance: undefined, duration: undefined, avgSpeed: 32, maxSpeed: 48, status: "in_progress", startedAt: "2026-06-24T09:00:00Z" },
];

export const mockIncidents: Incident[] = [
  { id: "i1", type: "Collision", severity: "high", status: "dispatched", latitude: 40.7489, longitude: -73.9680, address: "34th St & 5th Ave, NYC", description: "Two-vehicle collision at intersection. Moderate injuries reported.", reportedById: "u3", driverId: "d2", assignedOfficer: "Officer Reyes", evidenceUrls: [], aiConfidence: 0.94, createdAt: "2026-06-24T08:45:00Z", updatedAt: "2026-06-24T09:00:00Z" },
  { id: "i2", type: "Road Hazard", severity: "medium", status: "acknowledged", latitude: 40.7214, longitude: -73.9879, address: "Houston St & Broadway, NYC", description: "Large pothole causing vehicles to swerve. Multiple reports from citizens.", reportedById: "u3", evidenceUrls: [], aiConfidence: 0.87, createdAt: "2026-06-24T07:30:00Z", updatedAt: "2026-06-24T07:45:00Z" },
  { id: "i3", type: "Speeding", severity: "low", status: "resolved", latitude: 40.7831, longitude: -73.9712, address: "West Side Hwy, NYC", description: "Vehicle detected exceeding speed limit by 25 mph.", driverId: "d2", evidenceUrls: [], aiConfidence: 0.99, createdAt: "2026-06-23T16:20:00Z", updatedAt: "2026-06-23T17:00:00Z" },
  { id: "i4", type: "Hit and Run", severity: "critical", status: "in_progress", latitude: 40.6946, longitude: -73.9866, address: "Atlantic Ave, Brooklyn", description: "Hit and run incident. Suspect vehicle fled eastbound. Pedestrian injured.", reportedById: "u4", evidenceUrls: [], aiConfidence: 0.91, createdAt: "2026-06-24T09:15:00Z", updatedAt: "2026-06-24T09:20:00Z" },
];

export const mockEmergencies: Emergency[] = [
  { id: "e1", driverId: "d2", incidentId: "i1", type: "Accident", status: "dispatched", latitude: 40.7489, longitude: -73.9680, priority: 1, dispatchedAt: "2026-06-24T08:48:00Z", hospitalId: "h1", ambulanceId: "a1", createdAt: "2026-06-24T08:46:00Z", updatedAt: "2026-06-24T08:48:00Z" },
  { id: "e2", incidentId: "i4", type: "Hit and Run", status: "en_route", latitude: 40.6946, longitude: -73.9866, priority: 1, dispatchedAt: "2026-06-24T09:18:00Z", hospitalId: "h2", ambulanceId: "a3", createdAt: "2026-06-24T09:16:00Z", updatedAt: "2026-06-24T09:18:00Z" },
];

export const mockReports: Report[] = [
  { id: "r1", userId: "u3", type: "hazard", title: "Broken Street Light on 5th Ave", description: "Street light at the intersection of 5th Ave and 42nd St is not functioning. Very dangerous at night.", latitude: 40.7527, longitude: -73.9816, address: "5th Ave & 42nd St, NYC", imageUrls: [], videoUrls: [], status: "pending", isAnonymous: false, upvotes: 23, createdAt: "2026-06-23T20:00:00Z", updatedAt: "2026-06-23T20:00:00Z" },
  { id: "r2", userId: "u3", type: "road_damage", title: "Severe Pothole on Broadway", description: "Large pothole approximately 2 feet wide on Broadway near Houston St. Has caused at least two flat tires today.", latitude: 40.7214, longitude: -73.9879, address: "Broadway & Houston St, NYC", imageUrls: [], videoUrls: [], status: "acknowledged", isAnonymous: false, upvotes: 45, createdAt: "2026-06-23T14:30:00Z", updatedAt: "2026-06-24T08:00:00Z" },
  { id: "r3", userId: "u3", type: "traffic", title: "Construction Blocking Lane", description: "Unauthorized construction blocking the right lane without proper signage. Creating dangerous merge situation.", latitude: 40.7306, longitude: -73.9866, address: "Astor Place, NYC", imageUrls: [], videoUrls: [], status: "resolved", isAnonymous: true, upvotes: 12, createdAt: "2026-06-22T11:00:00Z", updatedAt: "2026-06-23T09:00:00Z" },
];

export const mockClaims: Claim[] = [
  { id: "c1", incidentId: "i1", policyNumber: "POL-2024-78901", claimantName: "Robert Zhang", claimAmount: 15000, status: "under_review", fraudScore: 0.12, description: "Claim for vehicle damage from collision at 34th & 5th Ave. Front bumper, hood, and radiator damage.", evidenceUrls: [], createdAt: "2026-06-24T09:30:00Z", updatedAt: "2026-06-24T09:30:00Z" },
  { id: "c2", incidentId: "i3", policyNumber: "POL-2023-45678", claimantName: "Lisa Park", claimAmount: 3500, status: "approved", fraudScore: 0.05, description: "Claim for minor fender damage from speeding-related incident on West Side Hwy.", evidenceUrls: [], verifiedAt: "2026-06-24T08:00:00Z", createdAt: "2026-06-23T18:00:00Z", updatedAt: "2026-06-24T08:00:00Z" },
  { id: "c3", incidentId: "i4", policyNumber: "POL-2024-12345", claimantName: "Miguel Santos", claimAmount: 42000, status: "submitted", fraudScore: 0.78, description: "Claim for total vehicle loss and medical expenses from hit and run. Suspiciously high amount.", evidenceUrls: [], createdAt: "2026-06-24T09:45:00Z", updatedAt: "2026-06-24T09:45:00Z" },
];

export const mockNotifications: Notification[] = [
  { id: "n1", userId: "u1", title: "Safety Score Updated", message: "Your safety score improved to 92! Keep up the great driving.", type: "success", isRead: false, actionUrl: "/driver/score", createdAt: "2026-06-24T09:00:00Z" },
  { id: "n2", userId: "u1", title: "AI Alert: Harsh Braking", message: "Harsh braking detected on your last trip near Times Square.", type: "warning", isRead: false, actionUrl: "/driver/alerts", createdAt: "2026-06-24T08:32:00Z" },
  { id: "n3", userId: "u1", title: "Vehicle Service Due", message: "Your Toyota Camry is due for scheduled maintenance in 5 days.", type: "info", isRead: true, actionUrl: "/driver/vehicle", createdAt: "2026-06-23T10:00:00Z" },
  { id: "n4", userId: "u4", title: "Emergency Dispatch", message: "New collision reported at 34th & 5th Ave. Units dispatched.", type: "emergency", isRead: false, actionUrl: "/police/incidents", createdAt: "2026-06-24T08:46:00Z" },
  { id: "n5", userId: "u5", title: "Incoming Emergency", message: "Accident victim en route via Ambulance A1. ETA: 8 minutes.", type: "emergency", isRead: false, actionUrl: "/hospital/emergencies", createdAt: "2026-06-24T08:50:00Z" },
];

export const mockAIAlerts: AIAlert[] = [
  { id: "ai1", driverId: "d1", type: "harsh_brake", severity: "medium", confidence: 0.92, message: "Harsh braking detected. Reduce speed in approaching intersections.", latitude: 40.758, longitude: -73.9855, isAcknowledged: false, createdAt: "2026-06-24T08:28:00Z" },
  { id: "ai2", driverId: "d2", type: "overspeed", severity: "high", confidence: 0.99, message: "Speed limit exceeded by 25 mph on West Side Highway.", latitude: 40.7831, longitude: -73.9712, isAcknowledged: true, createdAt: "2026-06-23T16:15:00Z" },
  { id: "ai3", driverId: "d1", type: "fatigue_detected", severity: "high", confidence: 0.85, message: "Fatigue indicators detected. Please take a break.", latitude: 40.7128, longitude: -74.006, isAcknowledged: false, createdAt: "2026-06-24T07:45:00Z" },
  { id: "ai4", type: "road_damage", severity: "medium", confidence: 0.87, message: "Road damage detected via citizen reports and AI analysis at Broadway & Houston.", latitude: 40.7214, longitude: -73.9879, isAcknowledged: false, createdAt: "2026-06-23T15:00:00Z" },
];

export const mockHospitals: Hospital[] = [
  { id: "h1", name: "NYC General Hospital", address: "123 Medical Center Dr, NYC", latitude: 40.7425, longitude: -73.9742, phone: "+1-555-0201", totalBeds: 450, availableBeds: 38, icuBeds: 60, icuAvailable: 5, isActive: true },
  { id: "h2", name: "Brooklyn Emergency Center", address: "456 Atlantic Ave, Brooklyn", latitude: 40.6862, longitude: -73.9776, phone: "+1-555-0202", totalBeds: 280, availableBeds: 22, icuBeds: 35, icuAvailable: 3, isActive: true },
  { id: "h3", name: "Manhattan Medical Center", address: "789 Park Ave, NYC", latitude: 40.7694, longitude: -73.9640, phone: "+1-555-0203", totalBeds: 620, availableBeds: 54, icuBeds: 80, icuAvailable: 8, isActive: true },
];

export const mockAmbulances: Ambulance[] = [
  { id: "a1", hospitalId: "h1", vehicleNumber: "AMB-001", status: "dispatched", latitude: 40.7450, longitude: -73.9700, crewMembers: 3 },
  { id: "a2", hospitalId: "h1", vehicleNumber: "AMB-002", status: "available", latitude: 40.7425, longitude: -73.9742, crewMembers: 2 },
  { id: "a3", hospitalId: "h2", vehicleNumber: "AMB-003", status: "en_route", latitude: 40.6900, longitude: -73.9850, crewMembers: 3 },
  { id: "a4", hospitalId: "h3", vehicleNumber: "AMB-004", status: "available", latitude: 40.7694, longitude: -73.9640, crewMembers: 2 },
];

export const mockOfficers: Officer[] = [
  { id: "o1", stationId: "ps1", name: "Maria Reyes", badgeNumber: "NYPD-4521", rank: "Sergeant", isOnDuty: true, phone: "+1-555-0301", status: "available", currentLatitude: 40.7128, currentLongitude: -74.0060 },
  { id: "o2", stationId: "ps1", name: "David Johnson", badgeNumber: "NYPD-4522", rank: "Officer", isOnDuty: true, phone: "+1-555-0302", status: "busy", currentLatitude: 40.7489, currentLongitude: -73.9680 },
  { id: "o3", stationId: "ps1", name: "Amanda Torres", badgeNumber: "NYPD-4523", rank: "Detective", isOnDuty: false, phone: "+1-555-0303" },
  { id: "o4", stationId: "ps2", name: "Michael Brown", badgeNumber: "NYPD-7801", rank: "Lieutenant", isOnDuty: true, phone: "+1-555-0304", status: "available", currentLatitude: 40.7589, currentLongitude: -73.9851 },
];

export const mockAuditLogs: AuditLog[] = [
  { id: "al1", userId: "u7", userName: "System Admin", action: "USER_CREATED", entity: "User", entityId: "u3", details: { role: "citizen" }, ipAddress: "192.168.1.100", createdAt: "2026-06-24T09:00:00Z" },
  { id: "al2", userId: "u4", userName: "Maria Reyes", action: "INCIDENT_UPDATED", entity: "Incident", entityId: "i1", details: { status: "dispatched" }, ipAddress: "10.0.0.50", createdAt: "2026-06-24T08:48:00Z" },
  { id: "al3", userId: "u7", userName: "System Admin", action: "ROLE_UPDATED", entity: "User", entityId: "u6", details: { oldRole: "citizen", newRole: "insurance" }, ipAddress: "192.168.1.100", createdAt: "2026-06-23T15:30:00Z" },
  { id: "al4", userId: "u5", userName: "Dr. Ravi Patel", action: "EMERGENCY_ACCEPTED", entity: "Emergency", entityId: "e1", details: { hospitalId: "h1" }, ipAddress: "172.16.0.25", createdAt: "2026-06-24T08:49:00Z" },
];

export const mockAnalyticsData = {
  totalUsers: 24856,
  totalDrivers: 12430,
  activeDevices: 8921,
  totalIncidents: 3247,
  totalTrips: 892450,
  emergencyResponseAvg: 4.2,
  safetyScoreAvg: 87.3,
  accidentsThisMonth: 156,
  accidentsLastMonth: 189,
  revenueThisMonth: 2450000,

  weeklyTrips: [
    { name: "Mon", value: 4200 },
    { name: "Tue", value: 3800 },
    { name: "Wed", value: 4500 },
    { name: "Thu", value: 4100 },
    { name: "Fri", value: 5200 },
    { name: "Sat", value: 3100 },
    { name: "Sun", value: 2800 },
  ],
  monthlyIncidents: [
    { name: "Jan", accidents: 145, violations: 320, hazards: 89 },
    { name: "Feb", accidents: 132, violations: 285, hazards: 76 },
    { name: "Mar", accidents: 158, violations: 340, hazards: 95 },
    { name: "Apr", accidents: 121, violations: 298, hazards: 82 },
    { name: "May", accidents: 167, violations: 356, hazards: 101 },
    { name: "Jun", accidents: 156, violations: 332, hazards: 94 },
  ],
  incidentsBySeverity: [
    { name: "Low", value: 1240, color: "#16A34A" },
    { name: "Medium", value: 980, color: "#F59E0B" },
    { name: "High", value: 720, color: "#F97316" },
    { name: "Critical", value: 307, color: "#DC2626" },
  ],
  responseTimeByHour: [
    { name: "00:00", value: 3.2 },
    { name: "04:00", value: 2.8 },
    { name: "08:00", value: 5.1 },
    { name: "12:00", value: 4.8 },
    { name: "16:00", value: 5.6 },
    { name: "20:00", value: 4.1 },
  ],
  driverScoreDistribution: [
    { name: "90-100", value: 3240 },
    { name: "80-89", value: 4580 },
    { name: "70-79", value: 2890 },
    { name: "60-69", value: 1230 },
    { name: "Below 60", value: 490 },
  ],
};
