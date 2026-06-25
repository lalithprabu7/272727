export const siteConfig = {
  name: "SafeDrive+",
  description: "AI-Powered Smart Road Safety Ecosystem connecting Drivers, Citizens, Families, Police, Hospitals, Insurance, and Government.",
  url: "https://safedrive.plus",
  ogImage: "/images/og-image.png",
  creator: "SafeDrive+ Team",
  keywords: [
    "road safety",
    "AI driving",
    "smart transportation",
    "emergency response",
    "fleet management",
    "accident detection",
    "driver monitoring",
  ],
} as const;

export const roleLabels: Record<string, string> = {
  driver: "Driver",
  family: "Family",
  citizen: "Citizen",
  police: "Police",
  hospital: "Hospital",
  insurance: "Insurance",
  admin: "Admin",
};

export const roleDescriptions: Record<string, string> = {
  driver: "Monitor your driving, track trips, and stay safe on the road",
  family: "Keep your loved ones safe with real-time tracking and alerts",
  citizen: "Report hazards and stay informed about road conditions",
  police: "Manage incidents, dispatch emergency response, and enforce safety",
  hospital: "Coordinate emergency care, manage resources, and save lives",
  insurance: "Process claims, detect fraud, and analyze risk data",
  admin: "Oversee the entire ecosystem with full administrative control",
};

export const roleColors: Record<string, string> = {
  driver: "#2563EB",
  family: "#8B5CF6",
  citizen: "#16A34A",
  police: "#DC2626",
  hospital: "#EC4899",
  insurance: "#F59E0B",
  admin: "#6366F1",
};

export const roleDashboardPaths: Record<string, string> = {
  driver: "/driver",
  family: "/family",
  citizen: "/citizen",
  police: "/police",
  hospital: "/hospital",
  insurance: "/insurance",
  admin: "/admin",
};
