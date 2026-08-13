import type React from "react"
import type { Metadata } from "next"
import Script from 'next/script';
import { Bricolage_Grotesque, Instrument_Serif } from "next/font/google"
import "./globals.css"

// assumption: heading + body face, not yet an approved brand decision.
// See .claude/skills/brand-visual/assumptions.md
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage",
  weight: ["400", "500", "600", "700", "800"],
})

// assumption: serif used only for italic emphasis + wordmark accents.
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-serif",
  weight: ["400"],
  style: ["normal", "italic"],
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
    <html lang="en" className={`${bricolage.variable} ${instrumentSerif.variable} antialiased bg-background`}>
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
