"use client"

import type React from "react"
import { useRef, useState } from "react"
import { ArrowRight, FileText, UploadCloud, X } from "lucide-react"

import { formatBytes } from "@/lib/onboarding"
import {
  BLUEPRINT_ACCEPT,
  MAX_BLUEPRINT_FILES,
  rejectionFor,
} from "@/lib/upload-blueprint"
import { Field, PrimaryButton, controlClass } from "./field"
import { StepHeading } from "./onboarding-shell"
import { VoiceDictation } from "./voice-dictation"

/** Desktop-only first screen: the plan set, plus whatever context they want to add. */
export function StepUploadBlueprint({
  files,
  notes,
  onFilesChange,
  onNotesChange,
  onContinue,
}: {
  files: File[]
  notes: string
  onFilesChange: (files: File[]) => void
  onNotesChange: (notes: string) => void
  onContinue: () => void
}) {
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const notesRef = useRef<HTMLTextAreaElement>(null)

  const addFiles = (incoming: FileList | null) => {
    if (!incoming || incoming.length === 0) return
    const accepted: File[] = []
    let rejection: string | null = null

    for (const file of Array.from(incoming)) {
      const reason = rejectionFor(file)
      if (reason) {
        rejection = reason
        continue
      }
      // Re-picking the same file should not stack duplicates in the list.
      const already = files.some((f) => f.name === file.name && f.size === file.size)
      if (!already) accepted.push(file)
    }

    const next = [...files, ...accepted].slice(0, MAX_BLUEPRINT_FILES)
    onFilesChange(next)
    setError(rejection)
  }

  const removeFile = (index: number) => {
    onFilesChange(files.filter((_, i) => i !== index))
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (files.length === 0) {
      setError("Add at least one file so I have something to price.")
      return
    }
    setError(null)
    onContinue()
  }

  const appendTranscript = (text: string) => {
    const next = notes ? `${notes.replace(/\s+$/, "")} ${text}` : text
    onNotesChange(next)
    notesRef.current?.focus()
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <StepHeading
        title="Upload your blueprint"
        subtitle="We'll turn it into a full estimate, priced to your region, in minutes."
      />

      <div className="flex flex-col gap-5">
        <Field
          id="blueprint"
          label="Blueprint or plan set"
          required
          error={error || undefined}
          hint="PDF, DWG, images or a ZIP. Up to 50 MB per file."
        >
          <label
            htmlFor="blueprint"
            onDragOver={(e) => {
              e.preventDefault()
              setDragging(true)
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault()
              setDragging(false)
              addFiles(e.dataTransfer.files)
            }}
            className={`flex cursor-pointer flex-col items-center rounded-xl border-2 border-dashed px-6 py-6 text-center transition-colors has-[input:focus-visible]:border-primary has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-ring ${
              dragging ? "border-primary bg-primary/5" : "border-border bg-muted/60 hover:border-primary/60"
            }`}
          >
            <input
              id="blueprint"
              type="file"
              multiple
              accept={BLUEPRINT_ACCEPT}
              className="sr-only"
              onChange={(e) => {
                addFiles(e.target.files)
                // Clearing lets the same file fire a change event again after removal.
                e.target.value = ""
              }}
            />
            <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <UploadCloud className="size-6" />
            </span>
            <span className="mt-3 text-base font-semibold text-foreground">
              Drop your plans here
            </span>
            <span className="mt-1 text-sm text-muted-foreground">
              or <span className="font-medium text-primary underline underline-offset-4">browse your files</span>
            </span>
          </label>

          {files.length > 0 && (
            <ul className="mt-1 flex flex-col gap-2">
              {files.map((file, index) => (
                <li
                  key={`${file.name}-${file.size}`}
                  className="flex items-center gap-3 rounded-xs border border-border bg-card px-4 py-3"
                >
                  <FileText className="size-5 shrink-0 text-primary" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-foreground">{file.name}</span>
                    <span className="block text-xs text-muted-foreground">{formatBytes(file.size)}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    aria-label={`Remove ${file.name}`}
                    className="inline-flex size-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <X className="size-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Field>

        <Field id="notes" label="Add more context about the project (Optional)" hint="Optional, but it sharpens the numbers.">
          <div className="relative">
            <textarea
              id="notes"
              ref={notesRef}
              rows={3}
              value={notes}
              onChange={(e) => onNotesChange(e.target.value)}
              placeholder={'e.g. "3 bathrooms, mid-range finishes"'}
              className={`${controlClass} resize-y py-3.5 pr-16`}
            />
            <span className="absolute bottom-3 right-3">
              <VoiceDictation onTranscript={appendTranscript} />
            </span>
          </div>
        </Field>

        <div>
          <PrimaryButton type="submit" disabled={files.length === 0}>
            Continue
            <ArrowRight className="size-4" />
          </PrimaryButton>
        </div>
      </div>
    </form>
  )
}
