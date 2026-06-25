import {
  LayoutDashboard,
  MapPin,
  History,
  Car,
  Shield,
  ShieldAlert,
  AlertTriangle,
  Mic,
  Camera,
  BarChart3,
  Fuel,
  Route,
  CloudSun,
  Bell,
  Settings,
  Users,
  HeartPulse,
  Phone,
  FileText,
  Flag,
  Upload,
  MessageSquare,
  Eye,
  Radio,
  Siren,
  Scale,
  Briefcase,
  UserCog,
  Map,
  Bed,
  Stethoscope,
  Ambulance,
  ClipboardList,
  Timer,
  PackageOpen,
  Activity,
  Search,
  Globe,
  Cpu,
  Flame,
  TrendingUp,
  ScrollText,
  type LucideIcon,
} from "lucide-react";

export interface SidebarNavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
}

export interface SidebarNavGroup {
  title: string;
  items: SidebarNavItem[];
}

export const navigationConfig: Record<string, SidebarNavGroup[]> = {
  driver: [
    {
      title: "Overview",
      items: [
        { title: "Dashboard", href: "/driver", icon: LayoutDashboard },
        { title: "Live GPS Tracking", href: "/driver/tracking", icon: MapPin },
        { title: "Trip History", href: "/driver/trips", icon: History },
      ],
    },
    {
      title: "Vehicle",
      items: [
        { title: "Vehicle Health", href: "/driver/vehicle", icon: Car },
        { title: "Fuel Analytics", href: "/driver/fuel", icon: Fuel },
        { title: "Route Suggestions", href: "/driver/routes", icon: Route },
      ],
    },
    {
      title: "Safety",
      items: [
        { title: "Driver Score", href: "/driver/score", icon: Shield },
        { title: "Emergency SOS", href: "/driver/emergency", icon: ShieldAlert },
        { title: "AI Alerts", href: "/driver/alerts", icon: AlertTriangle },
        { title: "Camera Feed", href: "/driver/camera", icon: Camera },
      ],
    },
    {
      title: "Insights",
      items: [
        { title: "Driving Analytics", href: "/driver/analytics", icon: BarChart3 },
        { title: "Weather Alerts", href: "/driver/weather", icon: CloudSun },
      ],
    },
    {
      title: "System",
      items: [
        { title: "Notifications", href: "/driver/notifications", icon: Bell },
        { title: "Settings", href: "/driver/settings", icon: Settings },
      ],
    },
  ],
  family: [
    {
      title: "Overview",
      items: [
        { title: "Dashboard", href: "/family", icon: LayoutDashboard },
        { title: "Live Location", href: "/family/tracking", icon: MapPin },
      ],
    },
    {
      title: "Monitoring",
      items: [
        { title: "Emergency Alerts", href: "/family/alerts", icon: AlertTriangle },
        { title: "Safety Monitoring", href: "/family/monitoring", icon: Shield },
        { title: "Trip History", href: "/family/trips", icon: History },
        { title: "Driver Health", href: "/family/health", icon: HeartPulse },
      ],
    },
    {
      title: "Contacts",
      items: [
        { title: "Emergency Contacts", href: "/family/contacts", icon: Phone },
        { title: "Route Tracking", href: "/family/routes", icon: Route },
      ],
    },
    {
      title: "System",
      items: [
        { title: "Notifications", href: "/family/notifications", icon: Bell },
      ],
    },
  ],
  citizen: [
    {
      title: "Overview",
      items: [
        { title: "Dashboard", href: "/citizen", icon: LayoutDashboard },
      ],
    },
    {
      title: "Reporting",
      items: [
        { title: "Report Hazard", href: "/citizen/report", icon: Flag },
        { title: "Upload Evidence", href: "/citizen/report?tab=upload", icon: Upload },
        { title: "Complaint Status", href: "/citizen/complaints", icon: FileText },
      ],
    },
    {
      title: "Community",
      items: [
        { title: "Nearby Reports", href: "/citizen/nearby", icon: MapPin },
        { title: "Road Conditions", href: "/citizen/roads", icon: Route },
        { title: "Traffic Updates", href: "/citizen/traffic", icon: Radio },
        { title: "Community Feed", href: "/citizen/community", icon: MessageSquare },
      ],
    },
    {
      title: "System",
      items: [
        { title: "Notifications", href: "/citizen/notifications", icon: Bell },
      ],
    },
  ],
  police: [
    {
      title: "Overview",
      items: [
        { title: "Dashboard", href: "/police", icon: LayoutDashboard },
        { title: "Live Incidents", href: "/police/incidents", icon: Siren },
      ],
    },
    {
      title: "Operations",
      items: [
        { title: "Emergency Dispatch", href: "/police/dispatch", icon: Radio },
        { title: "Live Tracking", href: "/police/tracking", icon: MapPin },
        { title: "Traffic Violations", href: "/police/violations", icon: Scale },
        { title: "Case Management", href: "/police/cases", icon: Briefcase },
      ],
    },
    {
      title: "Investigation",
      items: [
        { title: "Evidence Viewer", href: "/police/evidence", icon: Eye },
        { title: "Accident Analytics", href: "/police/analytics", icon: BarChart3 },
      ],
    },
    {
      title: "Management",
      items: [
        { title: "Officer Management", href: "/police/officers", icon: UserCog },
        { title: "Emergency Map", href: "/police/map", icon: Map },
      ],
    },
  ],
  hospital: [
    {
      title: "Overview",
      items: [
        { title: "Dashboard", href: "/hospital", icon: LayoutDashboard },
        { title: "Emergency Cases", href: "/hospital/emergencies", icon: Siren },
      ],
    },
    {
      title: "Resources",
      items: [
        { title: "Bed Availability", href: "/hospital/beds", icon: Bed },
        { title: "Doctor Availability", href: "/hospital/doctors", icon: Stethoscope },
        { title: "Ambulance Tracking", href: "/hospital/ambulance", icon: Ambulance },
      ],
    },
    {
      title: "Patients",
      items: [
        { title: "Patient Records", href: "/hospital/patients", icon: ClipboardList },
        { title: "Emergency Queue", href: "/hospital/queue", icon: Timer },
        { title: "Resource Mgmt", href: "/hospital/resources", icon: PackageOpen },
      ],
    },
    {
      title: "Insights",
      items: [
        { title: "Medical Analytics", href: "/hospital/analytics", icon: Activity },
      ],
    },
  ],
  insurance: [
    {
      title: "Overview",
      items: [
        { title: "Dashboard", href: "/insurance", icon: LayoutDashboard },
      ],
    },
    {
      title: "Claims",
      items: [
        { title: "All Claims", href: "/insurance/claims", icon: FileText },
        { title: "Fraud Detection", href: "/insurance/fraud", icon: Search },
        { title: "Evidence Viewer", href: "/insurance/evidence", icon: Eye },
        { title: "Verification", href: "/insurance/verification", icon: Shield },
      ],
    },
    {
      title: "Insights",
      items: [
        { title: "Analytics", href: "/insurance/analytics", icon: BarChart3 },
        { title: "Reports", href: "/insurance/reports", icon: ScrollText },
      ],
    },
  ],
  admin: [
    {
      title: "Overview",
      items: [
        { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { title: "Global Overview", href: "/admin/overview", icon: Globe },
      ],
    },
    {
      title: "Management",
      items: [
        { title: "User Management", href: "/admin/users", icon: Users },
        { title: "Device Management", href: "/admin/devices", icon: Cpu },
        { title: "Role Management", href: "/admin/roles", icon: UserCog },
      ],
    },
    {
      title: "Monitoring",
      items: [
        { title: "Incidents", href: "/admin/incidents", icon: Siren },
        { title: "Emergency Response", href: "/admin/emergency", icon: ShieldAlert },
        { title: "AI Analytics", href: "/admin/ai", icon: Flame },
        { title: "Heatmaps", href: "/admin/heatmaps", icon: Map },
      ],
    },
    {
      title: "Analytics",
      items: [
        { title: "Traffic Analytics", href: "/admin/traffic", icon: TrendingUp },
        { title: "Reports", href: "/admin/reports", icon: ScrollText },
      ],
    },
    {
      title: "System",
      items: [
        { title: "Audit Logs", href: "/admin/audit", icon: History },
        { title: "Settings", href: "/admin/settings", icon: Settings },
      ],
    },
  ],
};
