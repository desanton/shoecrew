import React from "react";
import type { Metadata } from "next";
import { Space_Grotesk, Teko } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SessionProvider } from "@/components/providers/session-provider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
  weight: ["400", "500", "700"],
});

const teko = Teko({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-teko",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Javaria - Premium Footwear Store",
  description:
    "Discover the latest collection of premium athletic shoes and footwear. Free delivery on orders over $140.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${teko.variable}`}>
      <body className="font-sans antialiased">
        <SessionProvider>
          {children}
          <Analytics />
        </SessionProvider>
      </body>
    </html>
  );
}
