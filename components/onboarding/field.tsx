import type React from "react"

/**
 * One input block for the signup flow: label above, control, error below.
 * Every screen shares it so a required marker, a focus ring and an error line
 * look the same wherever they appear.
 */

export const controlClass =
  "w-full rounded-xs border border-input bg-card px-4 text-base text-foreground " +
  "placeholder:text-muted-foreground outline-none transition-colors " +
  "focus:border-primary focus:ring-2 focus:ring-ring " +
  "aria-[invalid=true]:border-destructive aria-[invalid=true]:focus:ring-destructive/40"

export const inputClass = `${controlClass} h-12`

export function Field({
  id,
  label,
  required = false,
  hint,
  error,
  children,
}: {
  id: string
  label: string
  required?: boolean
  hint?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-foreground">
        {label}
        {required && (
          <span className="ml-0.5 text-primary" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="-mt-1 text-sm text-muted-foreground">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

/** Wires aria-invalid / aria-describedby the same way for every control. */
export function fieldAria(id: string, error?: string, hint?: string) {
  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-error` : null]
    .filter(Boolean)
    .join(" ")
  return {
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy || undefined,
  } as const
}

export function PrimaryButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={
        "inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-primary px-8 " +
        "text-base font-semibold text-primary-foreground transition-all hover:bg-primary/90 " +
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 " +
        "focus-visible:ring-offset-background active:translate-y-px disabled:opacity-50 " +
        "disabled:cursor-not-allowed disabled:hover:bg-primary sm:w-auto sm:min-w-48 " +
        (props.className || "")
      }
    >
      {children}
    </button>
  )
}
