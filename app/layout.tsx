import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { CartProvider } from "@/components/CartProvider";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ScrollProgress } from "@/components/ScrollProgress";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://trophygains.vercel.app";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TrophyGains | Train. Fuel. Win.",
    template: "%s | TrophyGains",
  },
  description:
    "Premium fitnesscoaching, trainingsschema's, voedingsschema's en custom plans voor serieuze progressie.",
  keywords: [
    "fitness schema",
    "trainingsschema",
    "voedingsschema",
    "online coaching",
    "TrophyGains",
  ],
  openGraph: {
    title: "TrophyGains | Train. Fuel. Win.",
    description:
      "Premium fitnesscoaching, trainingsschema's, voedingsschema's en custom plans voor serieuze progressie.",
    url: siteUrl,
    siteName: "TrophyGains",
    images: [
      {
        url: "/trophygains-social-banner.png",
        width: 1774,
        height: 887,
        alt: "TrophyGains - Premium fitness coaching en custom plans",
      },
    ],
    locale: "nl_NL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TrophyGains | Train. Fuel. Win.",
    description:
      "Premium fitnesscoaching, trainingsschema's, voedingsschema's en custom plans voor serieuze progressie.",
    images: ["/trophygains-social-banner.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nl"
      className={`${inter.variable} ${playfair.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-black text-white">
        <CartProvider>
          <ScrollProgress />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
