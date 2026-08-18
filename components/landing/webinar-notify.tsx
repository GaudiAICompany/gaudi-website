"use client"

import { useState } from "react"
import { Check } from "lucide-react"

export function WebinarNotify() {
  const [email, setEmail] = useState("")
  const [done, setDone] = useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!email.trim()) return
    setDone(true)
  }

  if (done) {
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
        className="inline-flex h-10 w-full items-center justify-center rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98]"
      >
        Get notified
      </button>
    </form>
  )
}
