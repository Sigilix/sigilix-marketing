"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface Plan {
  name: string
  price: string
  unit: string
  throughput: string
  features: string[]
  cta: string
  recommended?: boolean
  contact?: boolean
}

export const PLANS: Plan[] = [
  {
    name: "Free",
    price: "$0",
    unit: "free forever",
    throughput: "3–4 PRs per 5 hours · 1 seat",
    features: [
      "Full 4+1 specialist ensemble",
      "1 repository · 1 reviewer seat",
      "Standard support (GitHub issues)",
      "Community Discord",
    ],
    cta: "Start Free",
  },
  {
    name: "Pro",
    price: "$20",
    unit: "/ seat / month",
    throughput: "8–10 PRs per 5 hours",
    features: [
      "Full ensemble",
      "Up to 10 repositories",
      "Unlimited seats · per-seat billing",
      "Priority email support",
      "Team insights dashboard",
      "Custom ignore patterns",
    ],
    cta: "Start Pro",
    recommended: true,
  },
  {
    name: "Max",
    price: "$40",
    unit: "/ seat / month",
    throughput: "15–20 PRs per 5 hours",
    features: [
      "Unlimited repositories",
      "Unlimited seats · per-seat billing",
      "Self-hosted runner option",
      "Dedicated support channel",
      "SSO & audit logs",
      "Full API access",
    ],
    cta: "Choose Max",
  },
  {
    name: "Enterprise",
    price: "Custom",
    unit: "",
    throughput: "Unlimited PRs · unlimited seats",
    features: [
      "Everything in Max",
      "Linear triage integration",
      "Unlimited PRs · no rate windows",
      "Custom MSA & DPA",
      "On-prem or VPC deployment",
      "Dedicated solutions engineer",
    ],
    cta: "Contact us",
    contact: true,
  },
]

export function PricingTeaser() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      id="pricing"
      className="relative py-24 md:py-32 px-6 md:px-8 border-t border-border-subtle"
    >
      <div ref={ref} className="mx-auto max-w-7xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-secondary mb-4">
          Pricing
        </p>
        <h2 className="font-sans font-medium text-4xl md:text-6xl tracking-tight leading-[0.98] text-text-primary mb-6 max-w-3xl">
          Transparent throughput.
          <br />
          <span className="text-accent">No seat limits.</span>
        </h2>
        <p className="text-lg text-text-secondary max-w-2xl mb-16 leading-relaxed">
          Pay for review volume, not headcount. Every tier gets the full specialist ensemble.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-sm p-8 ${
                plan.recommended
                  ? "bg-surface-raised border-t-2 border-accent shadow-[0_0_50px_-15px_var(--color-accent-glow)] md:-translate-y-2"
                  : "bg-surface border border-border"
              }`}
            >
              {plan.recommended && (
                <span className="absolute top-3 right-3 font-mono text-[10px] uppercase tracking-[0.2em] bg-accent-muted text-accent px-2 py-0.5 rounded-sm">
                  Most popular
                </span>
              )}
              <p className="font-sans text-sm uppercase tracking-[0.15em] text-text-secondary mb-2">
                {plan.name}
              </p>
              <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                <span className="font-sans text-3xl font-semibold text-text-primary">
                  {plan.price}
                </span>
                {plan.unit && (
                  <span className="font-sans text-sm text-text-secondary">{plan.unit}</span>
                )}
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

              <a
                href={plan.contact ? "mailto:sales@sigilix.ai?subject=Enterprise%20pricing" : "https://app.sigilix.ai"}
                className={`block w-full text-center font-sans text-sm font-medium h-11 leading-[44px] rounded-sm transition-colors ${
                  plan.recommended
                    ? "bg-accent text-white hover:bg-accent-hover"
                    : "border border-border text-text-primary hover:border-text-secondary"
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
