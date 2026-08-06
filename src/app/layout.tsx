import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "FlamingoBeach.com.tn | Réservation plages privées & restaurants",
  description:
    "Réservez votre coin de paradis sur la plage. Cabanes, paillotes et parasols à louer sur les plus belles plages de Tunisie.",
  keywords: [
    "plage",
    "Tunisie",
    "réservation",
    "cabane",
    "paillote",
    "parasol",
    "Ghar El Melh",
    "Bizerte",
    "Coucou Beach",
  ],
  icons: {
    icon: "data:;",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased bg-white text-gray-800`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}