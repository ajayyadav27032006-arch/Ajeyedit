import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import LenisProvider from "@/components/LenisProvider";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ajey Edit — Video Editor & Motion Designer",
  description:
    "Ajey Edit is a video editor and motion designer specializing in documentary, long-form and short-form content for creators, brands and agencies.",
  openGraph: {
    title: "Ajey Edit — Video Editor & Motion Designer",
    description: "Ajey Edit is a video editor and motion designer specializing in documentary, long-form and short-form content for creators, brands and agencies.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Loader />
        <div className="noise-overlay" />
        <LenisProvider>
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
