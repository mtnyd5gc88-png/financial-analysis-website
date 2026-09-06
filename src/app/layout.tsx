import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navigation from "@/components/layout/Navigation";
import SiteFooter from "@/components/layout/SiteFooter";
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
  title: "FinLearn — Educational Financial Analysis",
  description:
    "Learn financial concepts, apply them to real companies, and form your own investment judgements.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        <Navigation />
        <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
