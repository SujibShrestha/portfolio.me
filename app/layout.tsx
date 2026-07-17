import type { Metadata, Viewport } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1.0,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sujibshrestha.com.np"),
  title: {
    default: "Sujib Shrestha | Backend & Generative AI Developer",
    template: "%s | Sujib Shrestha",
  },
  description: "Portfolio of Sujib Shrestha, a Backend and Generative AI developer specializing in scalable API design, RAG pipelines, LLM fine-tuning, and full-stack applications with React & Next.js.",
  keywords: [
    "Sujib Shrestha",
    "Sujib Shrestha Developer",
    "Backend Developer",
    "Generative AI Developer",
    "AI Engineer",
    "Software Engineer",
    "React Developer",
    "Next.js Developer",
    "FastAPI",
    "Python Developer",
    "TypeScript",
    "JavaScript",
    "LLM",
    "Generative AI",
    "Machine Learning",
    "Web Development",
    "Backend Development",
    "Frontend Development",
    "REST API",
    "PostgreSQL",
    "Docker",
    "Cloud",
    "Hackathon Winner",
    "Open Source",
    "Portfolio",
    "Software Projects"
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sujib Shrestha | Backend & Generative AI Developer",
    description: "Sujib Shrestha's portfolio. Showcasing scalable APIs, LLM integration, LangChain projects, and full-stack React/Next.js systems.",
    type: "website",
    url: "https://www.sujibshrestha.com.np/",
    siteName: "Sujib Shrestha",
    locale: "en_US",
    images: [
      {
        url: "/assets/profile.png",
        width: 1200,
        height: 1200,
        alt: "Sujib Shrestha - Backend & Generative AI Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sujib Shrestha | Backend & Generative AI Developer",
    description: "Sujib Shrestha's portfolio. Showcasing scalable APIs, LLM integration, LangChain projects, and full-stack React/Next.js systems.",
    creator: "@sujibshrestha",
    images: ["/assets/profile.png"],
  },
  appleWebApp: {
    capable: true,
    title: "Sujib Shrestha",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: [
      { url: "/assets/favicon.png", type: "image/png" },
    ],
    shortcut: "/assets/favicon.png",
    apple: [
      { url: "/assets/favicon.png", sizes: "180x180", type: "image/png" },
    ],
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


