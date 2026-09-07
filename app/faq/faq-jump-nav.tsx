"use client"

import { ChevronDown } from "lucide-react"

export type FaqJumpGroup = {
  title: string
  options: { id: string; question: string }[]
}

export function FaqJumpNav({ groups }: { groups: FaqJumpGroup[] }) {
  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const id = event.target.value
    if (!id) return

    const target = document.getElementById(id)
    if (target instanceof HTMLDetailsElement) {
      target.open = true
    }
    target?.scrollIntoView({ behavior: "smooth", block: "start" })

    // Reset so selecting the same question again still triggers a jump.
    event.target.selectedIndex = 0
  }

  return (
    <div className="relative max-w-md">
      <label htmlFor="faq-jump" className="sr-only">
        Jump to a question
      </label>
      <select
        id="faq-jump"
        defaultValue=""
        onChange={handleChange}
        className="w-full appearance-none rounded-full border border-border bg-card py-3 pl-5 pr-11 text-sm font-medium text-foreground outline-none transition-colors hover:border-primary/40 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30"
      >
        <option value="" disabled>
          Jump to a question
        </option>
        {groups.map((group) => (
          <optgroup key={group.title} label={group.title}>
            {group.options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.question}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
      />
    </div>
  )
}
