"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const ROWS = [
  {
    label: "Architecture",
    single: "One model, one pass.",
    sigilix: "Four specialists + synthesis layer.",
  },
  {
    label: "Blind spots",
    single: "Misses what the model misses.",
    sigilix: "Ensemble catches the gaps.",
  },
  {
    label: "Noise",
    single: "Raw output dumped into comments.",
    sigilix: "Deduplicated before it reaches you.",
  },
  {
    label: "Reasoning",
    single: "Opaque verdict.",
    sigilix: "Specialist-by-specialist breakdown.",
  },
  {
    label: "Privacy",
    single: "Retention policies vary.",
    sigilix: "Zero retention. Not training data.",
  },
] as const

export function Comparison() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="compare" className="relative py-24 md:py-32 px-6 md:px-12 border-t border-border">
      <div ref={ref} className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-secondary mb-4">
          The Difference
        </p>
        <h2 className="font-sans font-medium text-4xl md:text-6xl tracking-tight leading-[0.95] text-text-primary mb-16">
          One model sleeps.
          <br />
          <span className="text-ink">Four watch.</span>
        </h2>

        {/* Desktop two-column */}
        <div className="hidden md:grid grid-cols-[200px_1fr_1fr] gap-px bg-border rounded-sm overflow-hidden border border-border">
          <div className="bg-canvas p-6 font-mono text-xs uppercase tracking-[0.2em] text-text-secondary">
            Dimension
          </div>
          <div className="bg-canvas p-6 font-mono text-xs uppercase tracking-[0.2em] text-text-secondary">
            Single-Agent reviewers
          </div>
          <div className="bg-canvas p-6 font-mono text-xs uppercase tracking-[0.2em] text-ink border-l-2 border-ink">
            Sigilix
          </div>
          {ROWS.map((row, i) => (
            <motion.div
              key={row.label}
              className="contents"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className="bg-canvas p-6 font-mono text-xs uppercase tracking-[0.2em] text-text-primary">
                {row.label}
              </div>
              <div className="bg-canvas p-6 text-text-secondary text-sm leading-relaxed">
                {row.single}
              </div>
              <div className="bg-canvas p-6 text-text-primary text-sm leading-relaxed border-l-2 border-ink shadow-[inset_0_0_60px_-20px_color-mix(in_srgb,var(--color-ink)_30%,transparent)]">
                {row.sigilix}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile stacked cards */}
        <div className="md:hidden grid grid-cols-1 gap-4">
          {ROWS.map((row) => (
            <div
              key={row.label}
              className="bg-surface border border-border p-6 rounded-sm"
            >
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-secondary mb-4">
                {row.label}
              </p>
              <div className="space-y-3">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-text-secondary mb-1">Single-Agent</p>
                  <p className="text-sm text-text-secondary">{row.single}</p>
                </div>
                <div className="border-l-2 border-ink pl-3">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-ink mb-1">Sigilix</p>
                  <p className="text-sm text-text-primary">{row.sigilix}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
