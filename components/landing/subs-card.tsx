import { Check, Send, FileText, Building2, Folder } from "lucide-react"

const SUBS = [
  { name: "Lone Star Electric", quoted: true, val: "$18,400" },
  { name: "Capitol City Electric", quoted: false },
  { name: "Delta Power & Light", quoted: false },
]

export function SubsCard() {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-6 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-wider text-primary">Sub coordination</p>
      <h3 className="mt-2 font-sans text-2xl font-light tracking-tight text-foreground">
        Package it. Send for quotes.
      </h3>

      <div className="mt-6 flex flex-1 flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
        <div className="w-full shrink-0 rounded-xl border border-border bg-secondary/50 p-4 sm:w-44">
          <p className="flex items-center gap-1.5 text-[13px] font-semibold text-foreground">
            <Folder className="size-4 text-primary" aria-hidden="true" />
            Electrical package
          </p>
          <ul className="mt-2.5 space-y-1.5">
            {["Plans E-1 to E-4.pdf", "Scope of work.pdf", "Spec 26 05 00.pdf"].map((f) => (
              <li key={f} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <FileText className="size-3 shrink-0" aria-hidden="true" />
                <span className="truncate">{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <Send className="size-5 shrink-0 self-center text-primary" aria-hidden="true" />

        <div className="min-w-0 flex-1 space-y-2">
          {SUBS.map((s) => (
            <div key={s.name} className="flex items-center justify-between gap-2 rounded-lg bg-secondary/50 px-3 py-2.5">
              <span className="flex min-w-0 items-center gap-2 text-[12px] text-foreground">
                <Building2 className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                <span className="truncate">{s.name}</span>
              </span>
              {s.quoted ? (
                <span className="inline-flex shrink-0 items-center gap-1 text-[11px] font-semibold text-primary">
                  <Check className="size-3" aria-hidden="true" />
                  {s.val}
                </span>
              ) : (
                <span className="shrink-0 text-[11px] text-muted-foreground">Invited</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
