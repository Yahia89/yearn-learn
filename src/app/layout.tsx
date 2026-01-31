import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/ui/ScrollToTop";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"], // Premium weights
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"], // Friendly weights
});

export const metadata: Metadata = {
  title: "Yearn & Learn | Premium Virtual Tutoring",
  description:
    "Professional virtual tutoring for beginner to advanced students. English and Math (K-6th). Unlock your potential with Layann Hamida.",
  openGraph: {
    title: "Yearn & Learn | Premium Virtual Tutoring",
    description:
      "Expert virtual tutoring in English and Math. Professional instructor with 3+ years of experience.",
    type: "website",
    url: "https://yearnandlearn.com",
    siteName: "Yearn & Learn",
    locale: "en_US",
    images: [
      {
        url: "https://yearnandlearn.com/og-image.jpg", // Replace with actual image URL later
        width: 1200,
        height: 630,
        alt: "Yearn & Learn Tutoring",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yearn & Learn | Premium Virtual Tutoring",
    description:
      "Expert virtual tutoring in English and Math. Professional instructor with 3+ years of experience.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Yearn & Learn",
    description:
      "Professional virtual tutoring for beginner to advanced students.",
    url: "https://yearnandlearn.com",
    telephone: "+1-626-536-3944",
    email: "YEARNNDLEARN@GMAIL.COM",
    founder: {
      "@type": "Person",
      name: "Layann Hamida",
    },
    offers: [
      {
        "@type": "Offer",
        name: "English Tutoring",
        description: "All grades English tutoring",
      },
      {
        "@type": "Offer",
        name: "Math Tutoring",
        description: "K-6th Grade Math tutoring",
      },
    ],
  };

  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${outfit.variable} antialiased bg-background text-foreground font-sans overflow-x-hidden`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
