"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Shield,
  Zap,
  MapPin,
  Bell,
  BarChart3,
  Users,
  Brain,
  ArrowRight,
  ChevronRight,
  Car,
  Siren,
  Building2,
  Heart,
  ShieldCheck,
  Globe,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { staggerContainer, staggerItem, slideUp, fadeIn } from "@/lib/constants";

const features = [
  { icon: Brain, title: "AI-Powered Detection", description: "Real-time accident detection, fatigue monitoring, and predictive risk analysis using advanced AI.", color: "text-blue-400", bg: "bg-blue-400/10" },
  { icon: MapPin, title: "Live GPS Tracking", description: "Track vehicles in real-time with intelligent route optimization and emergency response routing.", color: "text-emerald-400", bg: "bg-emerald-400/10" },
  { icon: Bell, title: "Instant Alerts", description: "Emergency SOS, AI alerts, weather warnings, and real-time notifications across all stakeholders.", color: "text-amber-400", bg: "bg-amber-400/10" },
  { icon: BarChart3, title: "Advanced Analytics", description: "Comprehensive dashboards with traffic analytics, safety heatmaps, and predictive insights.", color: "text-purple-400", bg: "bg-purple-400/10" },
  { icon: Shield, title: "Safety Scoring", description: "Dynamic driver and vehicle safety scores with behavioral analysis and improvement tracking.", color: "text-cyan-400", bg: "bg-cyan-400/10" },
  { icon: Zap, title: "Emergency Response", description: "Automated emergency dispatch connecting police, hospitals, and ambulances in seconds.", color: "text-rose-400", bg: "bg-rose-400/10" },
];

const stakeholders = [
  { icon: Car, label: "Drivers", description: "Safety monitoring, AI coaching, and real-time assistance", color: "#2563EB" },
  { icon: Heart, label: "Families", description: "Track loved ones with live location and safety alerts", color: "#8B5CF6" },
  { icon: Users, label: "Citizens", description: "Report hazards, track complaints, and stay informed", color: "#16A34A" },
  { icon: Siren, label: "Police", description: "Incident management, dispatch, and traffic enforcement", color: "#DC2626" },
  { icon: Building2, label: "Hospitals", description: "Emergency coordination, bed management, and triage", color: "#EC4899" },
  { icon: ShieldCheck, label: "Insurance", description: "Claims processing, fraud detection, and risk analytics", color: "#F59E0B" },
  { icon: Globe, label: "Government", description: "City-wide analytics, heatmaps, and policy insights", color: "#6366F1" },
];

const stats = [
  { value: "24K+", label: "Active Users" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "4.2s", label: "Avg Response Time" },
  { value: "45%", label: "Accident Reduction" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg-root overflow-x-hidden">
      {/* Nav */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-border-subtle bg-bg-root/60 backdrop-blur-xl"
      >
        <div className="mx-auto max-w-7xl flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-text-primary">
              SafeDrive<span className="text-primary">+</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-text-secondary hover:text-text-primary transition-colors">Features</a>
            <a href="#stakeholders" className="text-sm text-text-secondary hover:text-text-primary transition-colors">Platform</a>
            <a href="#stats" className="text-sm text-text-secondary hover:text-text-primary transition-colors">Impact</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="relative pt-28 pb-16 sm:pt-40 lg:pt-48 sm:pb-24">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-cyan-500/3 blur-[150px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
              <Zap className="h-3.5 w-3.5" />
              <span>AI-Powered Road Safety Platform</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-text-primary sm:text-5xl lg:text-6xl leading-[1.15]">
              Making Every Road
              <br />
              <span className="gradient-text">Safer with AI</span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg text-text-secondary sm:text-xl leading-relaxed">
              One intelligent platform connecting drivers, families, citizens, police,
              hospitals, insurance, and government. Powered by real-time AI to predict,
              prevent, and respond to road emergencies.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup">
                <Button size="xl" className="glow-primary">
                  Start Free Trial <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="secondary" size="xl">
                  Sign In to Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Hero Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-20 relative overflow-hidden"
          >
            <div className="gradient-border p-1 rounded-2xl shadow-2xl">
              <div className="rounded-xl bg-bg-card p-2 sm:p-4">
                <div className="rounded-lg bg-bg-root border border-border-subtle p-4 sm:p-8">
                  {/* Simulated Dashboard */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
                    {[
                      { label: "Active Drivers", value: "12,430", color: "text-blue-400" },
                      { label: "Incidents Today", value: "23", color: "text-red-400" },
                      { label: "Safety Score", value: "87.3", color: "text-emerald-400" },
                      { label: "Response Time", value: "4.2s", color: "text-amber-400" },
                    ].map((stat) => (
                      <div key={stat.label} className="glass-card-static p-3 sm:p-4 text-left">
                        <p className="text-[10px] sm:text-xs text-text-muted">{stat.label}</p>
                        <p className={`text-lg sm:text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div className="sm:col-span-2 glass-card-static p-4 h-36 sm:h-48 flex items-center justify-center">
                      <div className="flex flex-col items-center gap-2 text-text-muted">
                        <BarChart3 className="h-8 w-8" />
                        <span className="text-xs">Real-time Analytics</span>
                      </div>
                    </div>
                    <div className="glass-card-static p-4 h-36 sm:h-48 flex items-center justify-center">
                      <div className="flex flex-col items-center gap-2 text-text-muted">
                        <MapPin className="h-8 w-8" />
                        <span className="text-xs">Live Map</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-b from-primary/10 via-transparent to-transparent rounded-3xl blur-xl -z-10" />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="py-16 border-y border-border-subtle bg-bg-card/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={staggerItem} className="text-center">
                <p className="text-3xl sm:text-4xl font-extrabold gradient-text">{stat.value}</p>
                <p className="text-sm text-text-secondary mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...slideUp} className="text-center mb-16">
            <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
              Intelligent Features for
              <span className="gradient-text"> Complete Safety</span>
            </h2>
            <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">
              Every feature is designed to save lives, reduce accidents, and connect all stakeholders in the road safety ecosystem.
            </p>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="glass-card p-6 group"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${feature.bg} mb-4 transition-transform group-hover:scale-110`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stakeholders */}
      <section id="stakeholders" className="py-24 bg-bg-card/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...slideUp} className="text-center mb-16">
            <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
              One Platform,
              <span className="gradient-text"> Seven Portals</span>
            </h2>
            <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">
              Each stakeholder gets a dedicated, purpose-built dashboard designed for their specific needs.
            </p>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {stakeholders.map((item) => (
              <motion.div
                key={item.label}
                variants={staggerItem}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="glass-card p-6 text-center group"
              >
                <div
                  className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl mb-4 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <item.icon className="h-7 w-7" style={{ color: item.color }} />
                </div>
                <h3 className="text-base font-semibold text-text-primary mb-1">
                  {item.label}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="gradient-border p-8 sm:p-12 rounded-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 pointer-events-none" />
            <div className="relative space-y-6">
              <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
                Ready to Transform Road Safety?
              </h2>
              <p className="text-lg text-text-secondary max-w-xl mx-auto">
                Join thousands of organizations using SafeDrive+ to protect lives and build safer communities.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/signup">
                  <Button size="xl" className="glow-primary">
                    Get Started Now <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" size="xl">
                    View Demo Dashboard
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-4 text-sm text-text-muted">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Free 30-day trial</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> No credit card</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Enterprise ready</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border-subtle py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-semibold text-text-primary">
                SafeDrive<span className="text-primary">+</span>
              </span>
            </div>
            <p className="text-sm text-text-muted">
              &copy; {new Date().getFullYear()} SafeDrive+. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
