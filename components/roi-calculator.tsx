"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"

// Hardcoded constants (calculation-only, never shown in the UI)
const SALARY = 100000
const YEARLY_HOURS = 2080
const HOURLY_SALARY = SALARY / YEARLY_HOURS // ~48.08
const DAILY_SITE_COST = 500
const HOURS_PER_DAY_NOT_ON_SITE = 5
const GAUDI_HOURS_PER_BID = 0.5
const GAUDI_BID_MULTIPLIER = 5
const GAUDI_COST_PER_ESTIMATE = 150

type Field = "bidsPerMonth" | "hoursPerBid" | "avgBidValue" | "winRate"

export function RoiCalculator() {
  const [inputs, setInputs] = useState({
    bidsPerMonth: 4,
    hoursPerBid: 20,
    avgBidValue: 100000,
    winRate: 5,
  })

  const handleChange = (field: Field, value: string) => {
    const num = value === "" ? 0 : Number(value)
    setInputs((prev) => ({ ...prev, [field]: Number.isNaN(num) ? 0 : Math.max(0, num) }))
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
  const costSavings = totalMonthlyCost > 0 ? ((totalMonthlyCost - gTotalMonthlyCost) / totalMonthlyCost) * 100 : 0
  const hoursBefore = hoursPerBid * bidsPerMonth
  const hoursAfter = GAUDI_HOURS_PER_BID * gBidsSubmitted
  const timeSavings = hoursBefore > 0 ? ((hoursBefore - hoursAfter) / hoursBefore) * 100 : 0
  const grossProfitIncrease = gProfit - profit
  const roiMultipleProfitable = profit > 0 && roi > 0
  const roiMultiple = roiMultipleProfitable ? gRoi / roi : 0

  const formatCurrency = (value: number) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    })

  const formatPercent = (value: number) => `${value.toFixed(0)}%`

  const fields: { key: Field; label: string; prefix?: string; suffix?: string; step?: number }[] = [
    { key: "bidsPerMonth", label: "Bids per Month (#)", step: 1 },
    { key: "hoursPerBid", label: "Hours Spent per Bid (#)", step: 1 },
    { key: "avgBidValue", label: "Avg. Bid Value ($)", prefix: "$", step: 1000 },
    { key: "winRate", label: "Win Rate (%)", suffix: "%", step: 1 },
  ]

  const results = [
    { label: "Cost Savings", value: formatPercent(costSavings) },
    { label: "Time Savings", value: formatPercent(timeSavings) },
    { label: "Gross Profit Increase", value: formatCurrency(grossProfitIncrease) },
    {
      label: "ROI Multiple Increase",
      value: roiMultipleProfitable ? `${roiMultiple.toFixed(0)}x` : "Now profitable",
    },
  ]

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Inputs */}
      <div className="rounded-lg border border-white/10 bg-white/5 p-8">
        <div className="grid gap-6 sm:grid-cols-2">
          {fields.map((field) => (
            <div key={field.key}>
              <label htmlFor={field.key} className="mb-2 block text-sm font-medium text-gray-300">
                {field.label}
              </label>
              <div className="relative">
                {field.prefix && (
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {field.prefix}
                  </span>
                )}
                <Input
                  id={field.key}
                  type="number"
                  min={0}
                  step={field.step}
                  value={inputs[field.key]}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className={`bg-white/5 text-white ${field.prefix ? "pl-7" : ""} ${field.suffix ? "pr-8" : ""}`}
                />
                {field.suffix && (
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {field.suffix}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Outputs */}
      <div className="grid grid-cols-2 gap-6">
        {results.map((result) => (
          <div
            key={result.label}
            className="flex flex-col justify-center rounded-lg border border-white/10 bg-white/5 p-6 text-center"
          >
            <span className="font-playfair text-3xl font-bold text-primary">{result.value}</span>
            <span className="mt-2 text-sm text-gray-300">{result.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
