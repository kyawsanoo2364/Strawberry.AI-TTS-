import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/footer";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Strawberry AI — Burmese Text-to-Speech",
  description:
    "Burmese language text-to-speech powered by AI. Fast, clear, natural voice generation.",
  keywords: [
    "Burmese TTS",
    "Text to Speech Myanmar",
    "Strawberry AI",
    "AI Voice",
  ],
  metadataBase: new URL("https://strawberry-ai-tts-frontend.vercel.app"),

  openGraph: {
    title: "Strawberry AI — Burmese Text-to-Speech",
    description: "Generate natural Burmese voice using Strawberry AI.",
    url: "https://strawberry-ai-tts-frontend.vercel.app",
    siteName: "Strawberry AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Strawberry AI - Burmese TTS",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Strawberry AI — Burmese Text-to-Speech",
    description: "Generate natural Burmese TTS instantly.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Navbar />
          {children}
          <Toaster position="top-right" />
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
