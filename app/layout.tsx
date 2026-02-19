import type { Metadata } from "next";
import { Crimson_Pro, DM_Sans } from "next/font/google";
import "./globals.css";

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-crimson",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Study AI Hub — AI Tools for UPSC, JEE, NEET & SSC",
    template: "%s | Study AI Hub",
  },
  description:
    "AI-assisted study tools built for Indian competitive exam aspirants. Prepare for UPSC, JEE, NEET, and SSC with tools that match your exam's syllabus.",
  keywords: [
    "UPSC preparation tools",
    "JEE AI tutor",
    "NEET study assistant",
    "SSC exam prep",
    "competitive exam AI India",
    "answer writing UPSC",
    "NCERT explainer",
  ],
  authors: [{ name: "Study AI Hub" }],
  metadataBase: new URL("https://studyaihub.in"),
  openGraph: {
    title: "Study AI Hub — AI Tools for UPSC, JEE, NEET & SSC",
    description:
      "AI-assisted study tools built for Indian competitive exam aspirants.",
    type: "website",
    locale: "en_IN",
    siteName: "Study AI Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "Study AI Hub",
    description:
      "AI study tools for UPSC, JEE, NEET & SSC. Syllabus-accurate. No fluff.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN">
      <body
        className={`${crimsonPro.variable} ${dmSans.variable} font-sans bg-paper text-ink antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
