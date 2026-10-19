import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import LenisProvider from "@/components/LenisProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ajey.edit — Video Editor & Motion Designer",
  description:
    "ajey.edit is an independent video editor and motion designer specializing in documentary, long-form and short-form content. Stories, told through motion.",
  openGraph: {
    title: "ajey.edit — Video Editor & Motion Designer",
    description:
      "ajey.edit is an independent video editor and motion designer specializing in documentary, long-form and short-form content. Stories, told through motion.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="preconnect" href="https://drive.google.com" />
        <link rel="preconnect" href="https://lh3.googleusercontent.com" />
        <link rel="dns-prefetch" href="https://drive.google.com" />
      </head>
      <body className={inter.className}>
        <div className="noise-overlay" />
        <LenisProvider>
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </LenisProvider>
      </body>
    </html>
  );
}
