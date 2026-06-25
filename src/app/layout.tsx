import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { QueryProvider } from "@/providers/query-provider";
import { ToastProvider } from "@/providers/toast-provider";

export const metadata: Metadata = {
  title: {
    default: "SafeDrive+ | AI-Powered Smart Road Safety Ecosystem",
    template: "%s | SafeDrive+",
  },
  description:
    "AI-Powered Smart Road Safety Ecosystem connecting Drivers, Citizens, Families, Police, Hospitals, Insurance, and Government through one intelligent platform.",
  keywords: [
    "road safety",
    "AI driving",
    "smart transportation",
    "emergency response",
    "fleet management",
    "accident detection",
    "driver monitoring",
  ],
  authors: [{ name: "SafeDrive+ Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://safedrive.plus",
    siteName: "SafeDrive+",
    title: "SafeDrive+ | AI-Powered Smart Road Safety Ecosystem",
    description:
      "Connecting Drivers, Citizens, Families, Police, Hospitals, Insurance, and Government through one intelligent AI-powered platform.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SafeDrive+ | AI-Powered Smart Road Safety Ecosystem",
    description:
      "Connecting Drivers, Citizens, Families, Police, Hospitals, Insurance, and Government through one intelligent AI-powered platform.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <QueryProvider>
            <ToastProvider>{children}</ToastProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
