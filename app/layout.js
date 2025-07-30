import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/sections/CTASection";

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
        url: "/og-image.jpg", // Replace with actual image
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
    site: "@oladayoakinmokun", // Replace with real Twitter
    creator: "@oladayoakinmokun",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  authors: [{ name: "Oladayo Akinmokun" }],
};



export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="dark:bg-black text-[#111827] dark:text-white font-sans min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          {children}
          <CTASection />
        </main>
        <Footer />
      </body>
    </html>
  );
}
