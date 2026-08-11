import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

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
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <style>{`
          :root {
            --font-inter: 'Inter', sans-serif;
          }
        `}</style>
      </head>
      <body className="antialiased bg-white text-gray-800" style={{ fontFamily: "var(--font-inter)" }}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
