import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "confseal — Environment secrets, sealed in your repo",
  description:
    "Securely manage and encrypt environment variables per environment inside your project repository. AES-256-GCM, git-safe by default, zero config.",
  keywords: [
    "env",
    "environment variables",
    "encryption",
    "aes-256-gcm",
    "cli",
    "dotenv",
    "secrets",
  ],
  openGraph: {
    title: "confseal — Environment secrets, sealed in your repo",
    description:
      "Store development, staging, and production secrets in your repo — encrypted with AES-256-GCM, safe to commit, shareable with your team.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
