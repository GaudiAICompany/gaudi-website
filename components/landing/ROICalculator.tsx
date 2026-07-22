"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"

const fmtHours = (n: number) => Math.round(n).toLocaleString("en-US")
const fmtMoney = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })

// Directional assumptions — clearly labeled as estimates in the UI.
const LOW_AUTOMATION = 0.25
const HIGH_AUTOMATION = 0.45

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

function Field({
  label,
  value,
  min,
  max,
  step,
  suffix,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  suffix: string
  onChange: (v: number) => void
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">{label}</label>
        <span className="font-mono text-sm font-semibold text-primary">
          {value}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-primary"
        aria-label={label}
      />
    </div>
  )
}

export default function ROICalculator() {
  const [people, setPeople] = useState(6)
  const [hours, setHours] = useState(12)
  const [rate, setRate] = useState(55)

  const weeklyHours = people * hours
  const annualHours = weeklyHours * 48 // working weeks, directional
  const annualCost = annualHours * rate

  const lowHours = annualHours * LOW_AUTOMATION
  const highHours = annualHours * HIGH_AUTOMATION
  const lowSaving = lowHours * rate
  const highSaving = highHours * rate

  return (
    <section id="roi" className="border-y border-border bg-secondary/40 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            Admin drag calculator
          </p>
          <h2 className="mt-4 text-pretty text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
            Estimate the admin time buried in your back office.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Adjust the inputs to your team. Results are directional estimates based on your numbers —
            not a guarantee.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1fr]">
          {/* Inputs */}
          <div className="rounded-xl border border-border bg-card p-6 md:p-8">
            <div className="space-y-8">
              <Field
                label="Estimators & PMs on back-office work"
                value={people}
                min={1}
                max={40}
                step={1}
                suffix=" people"
                onChange={setPeople}
              />
              <Field
                label="Hours each spends on admin per week"
                value={hours}
                min={2}
                max={30}
                step={1}
                suffix=" hrs"
                onChange={setHours}
              />
              <Field
                label="Average loaded cost per hour"
                value={rate}
                min={25}
                max={120}
                step={5}
                suffix="/hr"
                onChange={setRate}
              />
            </div>
          </div>

          {/* Output */}
          <div className="flex flex-col rounded-xl border border-border bg-section-dark p-6 text-section-dark-foreground md:p-8">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-white/50">Back-office hours / year</p>
                <p className="mt-1 font-mono text-3xl font-semibold">{fmtHours(annualHours)}</p>
              </div>
              <div>
                <p className="text-sm text-white/50">Est. annual admin cost</p>
                <p className="mt-1 font-mono text-3xl font-semibold">{fmtMoney(annualCost)}</p>
              </div>
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-sm text-white/50">Potential time reclaimed with Gaudi (estimated)</p>
              <p className="mt-2 font-mono text-2xl font-semibold text-primary">
                {fmtHours(lowHours)}&ndash;{fmtHours(highHours)} hrs / yr
              </p>
              <p className="mt-1 text-sm text-white/60">
                Directional range of {fmtMoney(lowSaving)}&ndash;{fmtMoney(highSaving)}, based on
                automating {Math.round(LOW_AUTOMATION * 100)}&ndash;{Math.round(HIGH_AUTOMATION * 100)}%
                of repetitive admin.
              </p>
            </div>

            <button
              onClick={() => scrollTo("contact")}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Contact Us <ArrowRight className="h-4 w-4" />
            </button>
            <p className="mt-3 text-xs text-white/40">
              Estimates are directional and depend on your workflows, document quality, and adoption.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
