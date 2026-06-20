import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { CartProvider } from "@/components/CartProvider";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ScrollProgress } from "@/components/ScrollProgress";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://trophygains.nl"),
  title: {
    default: "TrophyGains | Premium fitnessschema's en coaching",
    template: "%s | TrophyGains",
  },
  description:
    "Premium digitale trainingsschema's, voedingsschema's, ebooks en persoonlijke coaching voor ambitieuze sporters.",
  keywords: [
    "fitness schema",
    "trainingsschema",
    "voedingsschema",
    "online coaching",
    "TrophyGains",
  ],
  openGraph: {
    title: "TrophyGains",
    description:
      "Digitale fitness producten en coaching met een premium, resultaatgerichte aanpak.",
    url: "https://trophygains.nl",
    siteName: "TrophyGains",
    locale: "nl_NL",
    type: "website",
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
