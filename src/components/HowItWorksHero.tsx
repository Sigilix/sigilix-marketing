"use client"

import { motion } from "framer-motion"

/**
 * "4 → 1" typographic lockup. Massive Geist Mono numerals, ink color,
 * thin connector strokes that draw on mount. No 3D, no WebGL — flat
 * type doing the work.
 */
export function HowItWorksHero() {
  return (
    <section className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-secondary mb-6">
          The Architecture
        </p>
        <h1 className="font-sans font-medium text-4xl md:text-6xl tracking-tight leading-[0.95] text-text-primary mb-16 max-w-3xl">
          Four specialists feed
          <br />
          <span className="text-ink">one synthesizer.</span>
        </h1>

        <div className="flex items-center justify-center gap-6 md:gap-12 my-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-mono text-7xl md:text-9xl text-ink leading-none"
          >
            4
          </motion.div>
          <motion.svg
            viewBox="0 0 80 24"
            className="w-16 md:w-24 h-6 md:h-8 text-ink"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            aria-hidden
          >
            <motion.path
              d="M0 12 H68 M58 4 L72 12 L58 20"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 0.4, ease: "easeInOut" }}
            />
          </motion.svg>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-mono text-7xl md:text-9xl text-text-primary leading-none"
          >
            1
          </motion.div>
        </div>

        <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed">
          A single-agent reviewer reads your PR once. Sigilix runs it through four parallel specialists and a synthesizer that cross-references their verdicts. What survives the merge is the signal — the rest gets dropped.
        </p>
      </div>
    </section>
  )
}
