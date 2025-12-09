import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rosemere Ltd. UK",
  description: "Rosemere Limited is a specialised SAP consulting firm focused on OpenText Vendor Invoice Management (VIM) and SAP Document & Reporting Compliance (DRC).",
  keywords: 'SAP OpenText VIM, invoice automation, VIM rollout, SAP consulting, UK',

  icons: {
    icon: '/favicon.ico',                    // main favicon
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',          // iOS home screen
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        url: '/icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '512x512',
        url: '/icon.png',
      },
    ],
  },
  
  // Optional: Open Graph (for LinkedIn, WhatsApp, etc.)
  openGraph: {
    title: 'Rosemere Limited',
    description: 'SAP OpenText VIM Global Rollout Specialists',
    url: 'https://rosemere-ltd.co.uk',
    images: ['/logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
