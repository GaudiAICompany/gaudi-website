import type React from "react"
import type { Metadata } from "next"
import Script from 'next/script';
import { Playfair_Display, Source_Sans_3 } from "next/font/google"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "700"],
})

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans",
  weight: ["400", "600"],
})

export const metadata: Metadata = {
  title: "Gaudi AI",
  description:
    "Transform your construction projects with cutting-edge AI technology. Build smarter, faster, and more efficiently.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${sourceSans.variable} antialiased`}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RDKTVR94C3"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RDKTVR94C3');
          `}
        </Script>
      </head>
      <body className="font-sans">{children}</body>
    </html>
  )
}
