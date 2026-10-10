import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://atelier-eclat.com"),
  title: "ATELIER ÉCLAT — Paris | Bespoke Beauty Sanctuary & Editorial Salon",
  description:
    "An intimate Parisian beauty sanctuary dedicated to thoughtful skin rituals, couture makeup artistry, architectural manicures, and personalized care. Book your appointment with our master artisans.",
  keywords: [
    "luxury beauty salon",
    "Parisian beauty atelier",
    "bespoke facial treatment",
    "editorial makeup artist",
    "Japanese gel manicure",
    "brow lamination Paris",
    "Atelier Éclat",
  ],
  authors: [{ name: "Atelier Éclat" }],
  creator: "Atelier Éclat Studio",
  openGraph: {
    title: "ATELIER ÉCLAT — Paris | Bespoke Beauty Sanctuary",
    description:
      "Thoughtful treatments. Exceptional specialists. A beauty experience designed around you.",
    url: "https://atelier-eclat.com",
    siteName: "ATELIER ÉCLAT",
    images: [
      {
        url: "/images/atelier-hero.jpg",
        width: 1920,
        height: 1080,
        alt: "Atelier Éclat Editorial Beauty Campaign",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ATELIER ÉCLAT — Luxury Beauty Atelier",
    description: "Beauty, Refined. Bespoke skin rituals and editorial makeup.",
    images: ["/images/atelier-hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#FAF8F5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-[#FAF8F5] text-[#261C18] selection:bg-[#E8DCD8] selection:text-[#261C18] font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
