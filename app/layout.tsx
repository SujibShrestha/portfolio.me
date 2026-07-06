import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Sujib Shrestha | SWE",
  description: "Portfolio of Sujib Shrestha, a Backend and Generative AI developer skilled in full-stack development, React, Node.js, and AI-powered applications.",
  keywords: "Sujib Shrestha, Portfolio, Backend Developer, AI Developer, Full-Stack, React, Node.js, Generative AI, Projects, GitHub, Software Developer",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1.0",
  openGraph: {
    title: "Sujib Shrestha | Backend & AI Developer Portfolio",
    description: "Portfolio of Sujib Shrestha, showcasing full-stack and AI projects.",
    type: "website",
    url: "https://www.sujibshrestha.com.np/",
    siteName: "Sujib Shrestha",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        "dark",
        "scroll-smooth",
        outfit.variable,
        jetbrainsMono.variable,
        "font-sans"
      )}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

