import type React from "react"
import type { Metadata } from "next"
import Script from 'next/script';
import { Space_Grotesk, Fraunces } from "next/font/google"
import "./globals.css"

// assumption: sharp, geometric grotesk for headings + body (user asked for
// less rounded letterforms). See .claude/skills/brand-visual/assumptions.md
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
})

// assumption: wide, expressive serif italic for emphasis moments — set larger
// so the italic reads as a real visual beat, not a narrow aside.
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
})

export const metadata: Metadata = {
  title: "Gaudi AI | The AI estimator that helps you win more work",
  description:
    "Gaudi turns blueprints, RFPs, and site notes into accurate, ready-to-send estimates in minutes, so you can bid faster and win more work. $150 per estimate. First 5 free.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${fraunces.variable} antialiased bg-background`}>
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
