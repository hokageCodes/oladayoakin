// app/layout.js or app/layout.tsx

import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/sections/CTASection";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GiftClientWrapper from "@/components/layout/GiftClientWrapper";
import { Analytics } from "@vercel/analytics/next"


// ✅ This stays
export const metadata = {
  title: "Oladayo Akinmokun – The Cyber Lawyer | Cybersecurity & Branding Expert",
  description:
    "Helping startups, legal professionals, and organizations navigate cybersecurity, data privacy, and personal branding. Lawyer. Speaker. Thought Leader.",
  keywords: [
    "Cybersecurity Lawyer",
    "Data Privacy Law",
    "Personal Branding for Lawyers",
    "Legal Tech",
    "GRC Compliance",
    "Cyber Law Expert",
    "Oladayo Akinmokun",
    "Cybersecurity Speaker",
    "LinkedIn Legal Branding",
    "Nigerian Cyber Lawyer",
    "Digital Law Nigeria",
    "Branding for Legal Professionals"
  ],
  metadataBase: new URL("https://oladayoakinmokun.com"),
  openGraph: {
    title: "Oladayo Akinmokun – The Cyber Lawyer",
    description:
      "Empowering lawyers and businesses through Cybersecurity Law, Data Privacy, and Personal Branding.",
    url: "https://oladayoakinmokun.com",
    type: "website",
    siteName: "The Cyber Lawyer",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Oladayo Akinmokun – The Cyber Lawyer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oladayo Akinmokun – The Cyber Lawyer",
    description:
      "Cybersecurity & Data Privacy Lawyer | Personal Branding Advocate | Speaker & Thought Leader",
    site: "@oladayoakinmokun",
    creator: "@oladayoakinmokun",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  // ❌ Remove this line from metadata
  // viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  authors: [{ name: "Oladayo Akinmokun" }],
};

// ✅ Move viewport to its own export
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-black scroll-smooth">
      <body className="bg-black text-[#111827] dark:text-white font-sans min-h-screen flex flex-col">
        <Navbar />
        <ToastContainer />
        <main className="flex-grow">
          {children}

          <CTASection />
          <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          // theme="dark"
        />
        </main>
        <GiftClientWrapper />
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
