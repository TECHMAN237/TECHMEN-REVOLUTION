import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { GrainOverlay } from "@/components/effects/GrainOverlay";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Techman Revolution — We Design & Build Digital Experiences",
  description:
    "Premium digital studio specializing in web development, mobile apps, data analysis, graphic design, and video editing.",
  keywords: [
    "web development",
    "mobile apps",
    "data analysis",
    "graphic design",
    "video editing",
    "digital studio",
  ],
  authors: [{ name: "Techman Revolution" }],
  openGraph: {
    title: "Techman Revolution",
    description: "We design and build digital experiences.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} font-sans bg-bg min-h-screen`}
      >
        <AuthProvider>
          <CustomCursor />
          <GrainOverlay />
          <div className="relative z-10">
            <Header />
            <main className="pt-16">{children}</main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
