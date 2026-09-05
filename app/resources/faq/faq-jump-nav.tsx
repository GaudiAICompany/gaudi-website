"use client"

import { ChevronDown } from "lucide-react"
import type { FaqCategory } from "./faq-data"

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export function FaqJumpNav({ categories }: { categories: FaqCategory[] }) {
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
        {categories.map((category) => (
          <optgroup key={category.title} label={category.title}>
            {category.items.map((item) => (
              <option key={item.question} value={slugify(item.question)}>
                {item.question}
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
