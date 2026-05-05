"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const SPECIALISTS = [
  {
    name: "Logic",
    desc: "Traces control flow and catches semantic drift.",
    color: "var(--color-ink)",
    glyph: (
      // Branching control-flow glyph
      <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="16" cy="6" r="2.5" />
        <path d="M16 9 L16 14 M16 14 L8 22 M16 14 L24 22" />
        <circle cx="8" cy="24" r="2.5" />
        <circle cx="24" cy="24" r="2.5" />
      </svg>
    ),
  },
  {
    name: "Security",
    desc: "Hunts leaks, injections, and unsafe defaults.",
    color: "var(--color-ink)",
    glyph: (
      // Shield-with-lock glyph
      <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 4 L26 8 L26 16 C26 22 21 26 16 28 C11 26 6 22 6 16 L6 8 Z" />
        <circle cx="16" cy="16" r="3" />
      </svg>
    ),
  },
  {
    name: "Performance",
    desc: "Flags regressions before they hit production.",
    color: "var(--color-ink)",
    glyph: (
      // Lightning-meter glyph
      <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 4 L8 18 L14 18 L12 28 L24 12 L18 12 L20 4 Z" />
      </svg>
    ),
  },
  {
    name: "Tests",
    desc: "Verifies coverage, mocks, and assertion logic.",
    color: "var(--color-ink)",
    glyph: (
      // Crosshair-test glyph
      <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="16" cy="16" r="10" />
        <circle cx="16" cy="16" r="4" />
        <path d="M16 2 L16 6 M16 26 L16 30 M2 16 L6 16 M26 16 L30 16" />
      </svg>
    ),
  },
] as const

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="how-it-works" className="relative py-24 md:py-32 px-6 md:px-12 border-t border-border">
      <div ref={ref} className="mx-auto max-w-7xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-secondary mb-4">
          The Ensemble
        </p>
        <h2 className="font-sans font-medium text-4xl md:text-6xl tracking-tight leading-[0.95] text-text-primary mb-6">
          Four specialists. One synthesis. Zero noise.
        </h2>
        <p className="text-lg text-text-secondary max-w-2xl mb-16 leading-relaxed">
          Every PR is reviewed in parallel by four AI specialists. A synthesizer cross-references their findings, deduplicates overlap, and forges the final verdict — your seal.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border mb-12">
          {SPECIALISTS.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-canvas p-8 group hover:bg-surface transition-colors"
            >
              <div className="text-ink mb-6">{s.glyph}</div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-primary mb-3">
                {s.name}
              </p>
              <p className="text-sm text-text-secondary leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Synthesizer block — central seal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-col items-center text-center bg-surface border border-border p-12 rounded-sm overflow-hidden"
        >
          {/* Convergence rings */}
          <motion.div
            animate={inView ? { scale: [1, 3], opacity: [0.4, 0] } : {}}
            transition={{ duration: 2, delay: 1.2, ease: "easeOut" }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-ink rounded-full"
          />
          {/* Abstract synthesizer glyph — three interlocking rings with a center dot,
              echoing seal geometry without re-using the trademark logo. */}
          <svg
            viewBox="0 0 80 80"
            className="w-20 h-20 text-ink mb-6 relative z-10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden
          >
            <circle cx="40" cy="32" r="14" />
            <circle cx="32" cy="46" r="14" />
            <circle cx="48" cy="46" r="14" />
            <circle cx="40" cy="40" r="2.5" fill="currentColor" />
          </svg>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink mb-3 relative z-10">
            Synthesizer
          </p>
          <h3 className="font-sans font-medium text-2xl md:text-3xl tracking-tight text-text-primary mb-4 relative z-10">
            One verdict. Sealed and signed.
          </h3>
          <p className="text-text-secondary max-w-xl leading-relaxed relative z-10">
            Cross-references the four streams, suppresses false positives, and forges the final verdict — the mark of merge-ready code.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
