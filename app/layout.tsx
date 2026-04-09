import type { Metadata } from "next";
import type { ReactNode } from "react";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Binary Labs | Production-Grade AI Agentic Workflows on Cloud",
  description:
    "Johannesburg-based Cloud & AI consultancy specialising in production-grade agentic AI workflows, multi-agent systems, and cloud-native AI platforms.",
  keywords: [
    "AI agents",
    "agentic workflows",
    "cloud AI",
    "multi-agent systems",
    "Johannesburg",
    "AI consultancy",
  ],
  openGraph: {
    title: "Binary Labs | Production-Grade AI Agentic Workflows",
    description:
      "Turning autonomous AI agents into reliable business infrastructure.",
    siteName: "Binary Labs",
    locale: "en_ZA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Binary Labs",
    description: "We Build Production-Grade AI Agentic Workflows on Cloud",
  },
  other: {
    "color-scheme": "dark",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} dark`}>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
