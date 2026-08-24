"use client"

import { useState } from "react"
import { Check, Loader2 } from "lucide-react"

import { captureLead, traceableRequestId } from "@/lib/capture-lead"

type Status = "idle" | "loading" | "success" | "error"

export function WebinarNotify() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [requestId, setRequestId] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!email.trim() || status === "loading") return

    setStatus("loading")
    const result = await captureLead({ email, source: "webinar-notify" })
    setRequestId(traceableRequestId(result))
    setStatus(result.ok ? "success" : "error")
  }

  if (status === "success") {
    return (
      <p className="mt-4 flex items-start gap-2 text-[13px] font-medium leading-snug text-primary">
        <Check className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        You&apos;re on the list. We&apos;ll let you know when the next one&apos;s scheduled.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2">
      <label htmlFor="webinar-email" className="sr-only">
        Email address
      </label>
      <input
        id="webinar-email"
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="you@company.com"
        className="h-10 w-full rounded-full border border-border bg-background px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Sending
          </>
        ) : (
          "Get notified"
        )}
      </button>
      {status === "error" && (
        <div role="alert">
          <p className="text-[13px] leading-snug text-destructive">
            That didn&apos;t go through. Try again, or email contact@heygaudi.ai and we&apos;ll add you.
          </p>
          {/* Quoting this back to support pins the failure to one server-side trace. */}
          {requestId && <p className="mt-1 text-xs opacity-60">Reference: {requestId}</p>}
        </div>
      )}
    </form>
  )
}
