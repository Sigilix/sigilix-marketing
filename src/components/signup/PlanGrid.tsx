"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { PLANS } from "@/components/PricingTeaser"
import { cn } from "@/lib/utils"

function PlanGridInner() {
  const params = useSearchParams()
  const selected = params.get("plan")?.toLowerCase()

  return (
    <section id="plans" className="relative py-12 md:py-16 px-6 md:px-8">
      <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-4">
        {PLANS.map((plan) => {
          const isSelected = selected === plan.name.toLowerCase()
          return (
            <a
              key={plan.name}
              href={`?plan=${plan.name.toLowerCase()}#auth`}
              className={cn(
                "relative rounded-sm p-8 transition-all",
                plan.recommended
                  ? "bg-surface-raised border-t-2 border-accent shadow-[0_0_50px_-15px_var(--color-accent-glow)] md:-translate-y-2"
                  : "bg-surface border border-border hover:border-text-secondary",
                isSelected && "ring-1 ring-accent"
              )}
            >
              {plan.recommended && (
                <span className="absolute top-3 right-3 font-mono text-[10px] uppercase tracking-[0.2em] bg-accent-muted text-accent px-2 py-0.5 rounded-sm">
                  Most popular
                </span>
              )}
              <p className="font-sans text-sm uppercase tracking-[0.15em] text-text-secondary mb-2">
                {plan.name}
              </p>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-sans text-3xl font-semibold text-text-primary">
                  {plan.price}
                </span>
                <span className="font-sans text-sm text-text-secondary">/month</span>
              </div>
              <p className="font-mono text-xs text-text-muted uppercase tracking-[0.15em] mb-8">
                {plan.throughput}
              </p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 text-sm text-text-secondary leading-relaxed"
                  >
                    <span className="text-accent mt-1">·</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <span
                className={cn(
                  "block w-full text-center font-sans text-sm font-medium h-11 leading-[44px] rounded-sm transition-colors",
                  plan.recommended
                    ? "bg-accent text-white"
                    : "border border-border text-text-primary"
                )}
              >
                {isSelected ? "Selected" : `Select ${plan.name}`}
              </span>
            </a>
          )
        })}
      </div>
    </section>
  )
}

export function PlanGrid() {
  return (
    <Suspense fallback={null}>
      <PlanGridInner />
    </Suspense>
  )
}
