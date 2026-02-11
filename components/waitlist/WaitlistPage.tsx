"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Share2, Linkedin, Twitter, Facebook } from "lucide-react"
import type { WaitlistProductConfig } from "@/lib/waitlist-config"

function getShareUrl(
  platform: "twitter" | "linkedin" | "facebook",
  pageUrl: string,
  shareText: string
): string {
  const encodedUrl = encodeURIComponent(pageUrl)
  const encodedText = encodeURIComponent(shareText)
  switch (platform) {
    case "twitter":
      return `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`
    case "linkedin":
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
    case "facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
    default:
      return pageUrl
  }
}

export default function WaitlistPage({
  config,
  baseUrl,
  functionApiBase,
  functionApiKey,
}: {
  config: WaitlistProductConfig
  baseUrl: string
  functionApiBase: string
  functionApiKey: string
}) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [copied, setCopied] = useState(false)

  const shareUrl = `${baseUrl}/waitlist/${config.slug}`
  const shareText = config.shareOneLiner ?? config.subtitle

  const handleCopyLink = async () => {
    const textToCopy = `${shareText} ${shareUrl}`
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(textToCopy)
      } else {
        const textArea = document.createElement("textarea")
        textArea.value = textToCopy
        textArea.style.position = "fixed"
        textArea.style.opacity = "0"
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand("copy")
        document.body.removeChild(textArea)
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Copy failed:", err)
    }
  }

  const splitName = (fullName: string) => {
    const parts = fullName.trim().split(/\s+/)
  
    if (parts.length === 0) {
      return { firstName: "", lastName: "" }
    }
  
    if (parts.length === 1) {
      return { firstName: parts[0], lastName: "" }
    }
  
    return {
      firstName: parts[0],
      lastName: parts.slice(1).join(" ")
    };
  }
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const url = `${functionApiBase}/api/capture_cta_email?code=${functionApiKey}`
    const { firstName, lastName } = splitName(name);
    const payload = {
      email,
      firstName: firstName,
      lastName: lastName,
      company: "Waitlist",
      message: `Waitlist signup for ${config.title}`,
    }
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        setSubmitted(true)
        setEmail("")
      }
    } catch (err) {
      console.error("Waitlist submission error", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#08090a] text-white relative overflow-hidden font-[var(--font-source-sans)]">
      {/* Industrial grid overlay - like floor plans / blueprints */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #fff 1px, transparent 1px),
            linear-gradient(to bottom, #fff 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Depth gradient - corridor / building interior feel */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% 100%, rgba(204,105,67,0.06) 0%, transparent 50%),
                      linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 100%)`,
        }}
      />

      {/* Corner accents - architectural frame */}
      <div className="absolute top-0 left-0 w-40 h-px bg-white/10" />
      <div className="absolute top-0 left-0 w-px h-40 bg-white/10" />
      <div className="absolute bottom-0 right-0 w-56 h-px bg-white/10" />
      <div className="absolute bottom-0 right-0 w-px h-56 bg-white/10" />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Top bar / nav */}
        <header className="px-6 md:px-12 py-6">
          <Link href="/" className="inline-block">
            <img
              src="/logo_text.png"
              alt="Gaudi AI"
              className="h-6 w-auto filter brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
            />
          </Link>
        </header>

        {/* Main content */}
        <main className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-16 px-4 md:px-6 pb-24">
          {/* Left: Title, subtitle, form */}
          <div className="flex-1 max-w-xl w-full space-y-8">
            <div>
              <div className="space-y-2">
                <h1
                  className="font-[var(--font-playfair)] text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight text-white"
                  style={{ textShadow: "0 0 40px rgba(255,255,255,0.03)" }}
                >
                  {config.title}
                </h1>
                <h2
                  className="font-[var(--font-playfair)] text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight text-zinc-400"
                  style={{ textShadow: "0 0 40px rgba(255,255,255,0.03)" }}
                >
                  {config.title2}
                </h2>
              </div>
              <p className="mt-4 text-lg md:text-xl text-zinc-400 max-w-lg leading-relaxed">
                {config.subtitle}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-lg">
              <div className="flex gap-3">
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={submitted}
                  className="!h-12 px-4 bg-white/5 border-white/10 text-white placeholder:text-zinc-500 rounded-sm focus-visible:ring-2 focus-visible:ring-[#cc6943]/50 focus-visible:border-[#cc6943]/50 transition-all"
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={submitted}
                  className="!h-12 px-4 bg-white/5 border-white/10 text-white placeholder:text-zinc-500 rounded-sm focus-visible:ring-2 focus-visible:ring-[#cc6943]/50 focus-visible:border-[#cc6943]/50 transition-all"
                />
              </div>
              <Button
                type="submit"
                disabled={submitted || loading}
                className="h-12 px-6 bg-[#cc6943]/60 hover:bg-[#cc6943]/90 text-white font-medium rounded-sm shrink-0 transition-all"
              >
                {submitted ? "You're on the list" : loading ? "Joining..." : "Get early access"}
                {!submitted && !loading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </form>

            {submitted && (
              <p className="text-sm text-emerald-400/90">Thanks! We&apos;ll notify you at launch.</p>
            )}
          </div>

          {/* Right: Image + release date */}
          <div className="flex-1 max-w-2xl w-full flex flex-col items-center lg:items-end">
            <div className="relative w-full aspect-[4/3] rounded overflow-hidden">
              {!imageError ? (
                <img
                  src={config.image}
                  alt={config.title}
                  className="absolute inset-0 w-full h-full object-contain filter brightness-95 invert opacity-95"
                  onError={() => setImageError(true)}
                />
              ) : null}
              <div
                className={`absolute inset-0 flex items-center justify-center bg-zinc-800/90 ${imageError ? "" : "hidden"}`}
              >
                <span className="text-zinc-500 text-sm tracking-wide">
                  Upload your image to /public{config.image}
                </span>
              </div>
            </div>
            <p className="-mt-10 text-sm font-medium tracking-widest uppercase text-zinc-500">
              Release: {config.releaseDate}
            </p>
          </div>
        </main>

        {/* Bottom corner: Share buttons */}
        <div className="absolute bottom-6 left-6 flex flex-col gap-3">
          <span className="text-xs font-medium tracking-widest uppercase text-zinc-500">
            Share
          </span>
          <div className="flex gap-2">
            <a
              href={getShareUrl("twitter", shareUrl, shareText)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-sm border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:border-white/20 hover:bg-white/10 transition-all"
              aria-label="Share on Twitter"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href={getShareUrl("linkedin", shareUrl, shareText)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-sm border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:border-white/20 hover:bg-white/10 transition-all"
              aria-label="Share on LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={getShareUrl("facebook", shareUrl, shareText)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-sm border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:border-white/20 hover:bg-white/10 transition-all"
              aria-label="Share on Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={handleCopyLink}
              className={`flex items-center justify-center gap-2 rounded-sm border px-3 transition-all ${
                copied
                  ? "h-10 border-emerald-500/60 bg-emerald-500/20 text-emerald-400"
                  : "h-10 w-10 border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:border-white/20 hover:bg-white/10"
              }`}
              aria-label="Copy link to clipboard"
              title={copied ? "Copied!" : "Copy link"}
            >
              {copied ? (
                <>
                  <span className="text-base">✓</span>
                  <span className="text-sm font-medium whitespace-nowrap">Copied!</span>
                </>
              ) : (
                <Share2 className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
