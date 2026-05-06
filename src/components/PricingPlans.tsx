"use client"

import { motion } from "framer-motion"
import { PLANS } from "@/components/PricingTeaser"

const APP_URL = "https://app.sigilix.ai"
const EASE = [0.22, 1, 0.36, 1] as const

export function PricingPlans() {
  return (
    <section id="plans" className="relative py-12 md:py-16 px-6 md:px-8">
      <div className="sgl-pricing-grid mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PLANS.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
            whileHover={{
              y: plan.recommended ? -16 : -8,
              boxShadow: "0 0 60px -15px var(--color-accent-glow)",
              borderColor: "var(--color-accent)",
              transition: { duration: 0.18, ease: EASE },
            }}
            className={`sgl-pricing-card relative rounded-sm p-8 transition-colors ${
              plan.recommended
                ? "sgl-pricing-card--recommended bg-surface-raised border-t-2 border-accent shadow-[0_0_50px_-15px_var(--color-accent-glow)] md:-translate-y-2"
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
              href={plan.contact ? "mailto:sales@arcanchor.com?subject=Enterprise%20pricing" : APP_URL}
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
    </section>
  )
}
