import type React from "react"
import type { Metadata, Viewport } from "next"
import Script from 'next/script';
import { DM_Sans } from "next/font/google"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Gaudi AI — The AI back office for contractors",
  description:
    "Gaudi is the AI back office for construction teams. Automate estimating, bid leveling, proposal generation, document review, and project updates.",
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#c35a25",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} antialiased bg-section-dark`}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RDKTVR94C3"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('set', 'debug_mode', true); // TODO: remove in production
            gtag('js', new Date());
            gtag('config', 'G-RDKTVR94C3', {
              debug_mode: true, // TODO: remove in production})
              send_page_view: true
            });
          `}
        </Script>
      </head>
      <body className="font-sans">
        {children}
        <Script id="linkedin-insight" strategy="afterInteractive">
          {`
            _linkedin_partner_id = "8731324";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          `}
        </Script>

        <Script id="linkedin-insight-loader" strategy="afterInteractive">
          {`
            (function(l) {
              if (!l){
                window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
                window.lintrk.q=[];
              }
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript";
              b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);
            })(window.lintrk);
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src="https://px.ads.linkedin.com/collect/?pid=8731324&fmt=gif"
          />
        </noscript>
      </body>
    </html>
  )
}
