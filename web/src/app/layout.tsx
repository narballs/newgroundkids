import type { Metadata } from "next";
import { Libre_Franklin, Bebas_Neue } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

// Primary font - Street-style body text (Franklin Gothic equivalent)
// Solid, trusted, cool - like Vans typography
const libreFranklin = Libre_Franklin({
  variable: "--font-libre-franklin",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

// Heading font - bold, impactful (from parent brand)
const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "NewGround Kids | Epic Parties & Camps for Kids",
    template: "%s | NewGround Kids",
  },
  description:
    "Unforgettable birthday parties and camps for kids in Sherman Oaks, CA. Action-packed packages from $299. Safe, fun, stress-free. Book your event today!",
  keywords: [
    "kids birthday party venue",
    "birthday party sherman oaks",
    "kids party packages",
    "summer camp sherman oaks",
    "kids camp near me",
    "holiday camp for kids",
    "martial arts birthday party",
    "action birthday party",
    "private event space kids",
    "kids event venue",
    "NewGround Kids",
  ],
  authors: [{ name: "NewGround Kids" }],
  creator: "NewGround Kids",
  metadataBase: new URL("https://newgroundkids.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://newgroundkids.com",
    siteName: "NewGround Kids",
    title: "NewGround Kids | Epic Parties & Camps for Kids",
    description:
      "Unforgettable birthday parties and camps for kids in Sherman Oaks. Action-packed packages from $299. Book your event today!",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NewGround Kids - Epic Parties & Camps",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NewGround Kids | Epic Parties & Camps for Kids",
    description:
      "Unforgettable birthday parties and camps for kids in Sherman Oaks. Book your event today!",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body
        className={`${libreFranklin.variable} ${bebasNeue.variable} font-sans antialiased`}
      >
        {/* Global noise texture overlay for street aesthetic */}
        <div className="noise-overlay" aria-hidden="true" />
        {children}
        <Toaster 
          position="top-center"
          toastOptions={{
            style: {
              background: "var(--background)",
              border: "2px solid var(--border-hard)",
              boxShadow: "var(--shadow-hard)",
            },
            classNames: {
              success: "!border-green-600",
              error: "!border-red-600",
            },
          }}
        />
      </body>
    </html>
  );
}
