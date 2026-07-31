"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

// Hardcoded constants (calculation-only, never shown in the UI)
const SALARY = 100000
const YEARLY_HOURS = 2080
const HOURLY_SALARY = SALARY / YEARLY_HOURS // ~48.08
const DAILY_SITE_COST = 500
const HOURS_PER_DAY_NOT_ON_SITE = 5
const GAUDI_HOURS_PER_BID = 0.5
const GAUDI_BID_MULTIPLIER = 10
const GAUDI_COST_PER_ESTIMATE = 150

type Field = "bidsPerMonth" | "hoursPerBid" | "avgBidValue" | "winRate"

const formatCurrency = (value: number) =>
  value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  })

const formatPercent = (value: number) => `${value.toFixed(0)}%`

export function RoiCalculator({
  onTryItOut,
  lang = "en",
}: {
  onTryItOut?: (message: string) => void
  lang?: "en" | "es"
}) {
  const es = lang === "es"
  const [inputs, setInputs] = useState({
    bidsPerMonth: 4,
    hoursPerBid: 4,
    avgBidValue: 100000,
    winRate: 5,
  })

  const handleChange = (field: Field, value: string) => {
    const num = Number(value)
    setInputs((prev) => ({ ...prev, [field]: Number.isNaN(num) ? 0 : num }))
  }

  const { bidsPerMonth, hoursPerBid, avgBidValue, winRate } = inputs
  const winRateFraction = winRate / 100

  // Before Gaudi
  const bidsWon = bidsPerMonth * winRateFraction
  const revenueWon = bidsWon * avgBidValue
  const daysNotOnSite = hoursPerBid / HOURS_PER_DAY_NOT_ON_SITE
  const salaryCostPerBid = hoursPerBid * HOURLY_SALARY
  const siteCostPerBid = daysNotOnSite * DAILY_SITE_COST
  const totalCostPerBid = salaryCostPerBid + siteCostPerBid
  const totalMonthlyCost = totalCostPerBid * bidsPerMonth
  const profit = revenueWon - totalMonthlyCost
  const roi = totalMonthlyCost > 0 ? (profit / totalMonthlyCost) * 100 : 0

  // After Gaudi
  const gBidsSubmitted = bidsPerMonth * GAUDI_BID_MULTIPLIER
  const gBidsWon = gBidsSubmitted * winRateFraction
  const gRevenueWon = gBidsWon * avgBidValue
  const gSalaryCostPerBid = GAUDI_HOURS_PER_BID * HOURLY_SALARY
  const gTotalCostPerBid = gSalaryCostPerBid + GAUDI_COST_PER_ESTIMATE
  const gTotalMonthlyCost = gTotalCostPerBid * gBidsSubmitted
  const gProfit = gRevenueWon - gTotalMonthlyCost
  const gRoi = gTotalMonthlyCost > 0 ? (gProfit / gTotalMonthlyCost) * 100 : 0

  // Outputs
  const costSavingsPerBid = totalCostPerBid > 0 ? ((totalCostPerBid - gTotalCostPerBid) / totalCostPerBid) * 100 : 0
  const timeSavingsPerBid = hoursPerBid > 0 ? ((hoursPerBid - GAUDI_HOURS_PER_BID) / hoursPerBid) * 100 : 0
  const grossProfitIncrease = gProfit - profit
  const roiMultipleProfitable = profit > 0 && roi > 0
  const roiMultiple = roiMultipleProfitable ? gRoi / roi : 0

  const sliders: {
    key: Field
    label: string
    min: number
    max: number
    step: number
    format: (v: number) => string
  }[] = [
    {
      key: "bidsPerMonth",
      label: es ? "Licitaciones por Mes" : "Bids per Month",
      min: 1,
      max: 20,
      step: 1,
      format: (v) => `${v}`,
    },
    {
      key: "hoursPerBid",
      label: es ? "Horas por Licitación" : "Hours Spent per Bid",
      min: 1,
      max: 60,
      step: 1,
      format: (v) => `${v} ${es ? "h" : "hrs"}`,
    },
    {
      key: "avgBidValue",
      label: es ? "Valor Promedio de Licitación" : "Avg. Bid Value",
      min: 10000,
      max: 500000,
      step: 5000,
      format: (v) => formatCurrency(v),
    },
    { key: "winRate", label: es ? "Tasa de Éxito" : "Win Rate", min: 1, max: 60, step: 1, format: (v) => `${v}%` },
  ]

  const results = [
    {
      label: es ? "Ingresos Potenciales Desbloqueados por Mes" : "Potential Revenue Unlocked per Month",
      value: formatCurrency(grossProfitIncrease),
    },
    { label: es ? "Ahorro de Costos por Licitación" : "Cost Savings per Bid", value: formatPercent(costSavingsPerBid) },
    { label: es ? "Ahorro de Tiempo por Licitación" : "Time Savings per Bid", value: formatPercent(timeSavingsPerBid) },
    {
      label: es ? "Aumento del Múltiplo de ROI" : "ROI Multiple Increase",
      value: roiMultipleProfitable ? `${roiMultiple.toFixed(0)}x` : es ? "Ahora rentable" : "Now profitable",
    },
  ]

  const handleTryItOut = () => {
    const message = es
      ? `Tengo ${bidsPerMonth} licitaciones al mes y dedico ${hoursPerBid} horas por licitación. El valor promedio de mi licitación es ${formatCurrency(
          avgBidValue,
        )} y mi tasa de éxito es del ${winRate}%. Ayúdenme a ahorrar tiempo y aumentar mi ROI.`
      : `I have ${bidsPerMonth} bids per month and spend ${hoursPerBid} hours per bid. My average bid value is ${formatCurrency(
          avgBidValue,
        )} and win rate is ${winRate}%. Help me save time and increase my ROI.`
    onTryItOut?.(message)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Inputs — one soft-edged panel of sliders */}
      <div className="flex flex-col">
        <h3 className="mb-3 text-center text-sm font-semibold uppercase tracking-widest text-gray-400">
          {es ? "Antes de Gaudi" : "Before Gaudi"}
        </h3>
        <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-8">
        <div className="flex flex-col gap-8">
          {sliders.map((slider) => (
            <div key={slider.key}>
              <div className="mb-3 flex items-baseline justify-between gap-4">
                <label htmlFor={slider.key} className="text-sm font-medium text-gray-300">
                  {slider.label}
                </label>
                <span className="font-playfair text-lg font-bold text-primary tabular-nums">
                  {slider.format(inputs[slider.key])}
                </span>
              </div>
              <input
                id={slider.key}
                type="range"
                min={slider.min}
                max={slider.max}
                step={slider.step}
                value={inputs[slider.key]}
                onChange={(e) => handleChange(slider.key, e.target.value)}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-primary"
                aria-label={slider.label}
              />
            </div>
          ))}
        </div>
        </div>
      </div>

      {/* Outputs — four equally-weighted cards */}
      <div className="flex flex-col">
        <h3 className="mb-3 text-center text-sm font-semibold uppercase tracking-widest text-gray-400">
          {es ? "Después de Gaudi" : "After Gaudi"}
        </h3>
        <div className="grid flex-1 grid-cols-2 grid-rows-2 gap-4">
          {results.map((result) => (
            <div
              key={result.label}
              className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-6 text-center"
            >
              <span className="font-playfair text-4xl font-bold text-primary md:text-5xl">{result.value}</span>
              <span className="mt-3 text-sm leading-snug text-gray-300">{result.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Try it out CTA */}
      <div className="lg:col-span-2 flex justify-center pt-2">
        <Button
          type="button"
          size="lg"
          onClick={handleTryItOut}
          className="bg-primary hover:bg-primary/90 text-white h-12 px-8 font-medium"
        >
          {es ? "Pruébalo" : "Try it out"} <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
