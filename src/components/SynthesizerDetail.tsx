"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const STEPS = [
  {
    label: "Collect",
    desc: "All four specialists submit their findings, scored 1-5 by severity, anchored to specific lines.",
  },
  {
    label: "Cross-reference",
    desc: "Identical findings from multiple specialists collapse into one — duplicates suppressed by structural provenance, not heuristic similarity.",
  },
  {
    label: "Calibrate",
    desc: "Severity is recalculated using the agreement signal: a finding multiple specialists flag is escalated; a low-confidence singleton is demoted.",
  },
  {
    label: "Render",
    desc: "The synthesized verdict is posted as a single GitHub review with one summary, one approval state, and inline findings only where they survived all steps.",
  },
] as const

export function SynthesizerDetail() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })
  return (
    <section className="relative py-16 md:py-24 px-6 md:px-12 border-t border-border">
      <div ref={ref} className="mx-auto max-w-7xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-secondary mb-4">
          The Synthesizer
        </p>
        <h2 className="font-sans font-medium text-4xl md:text-6xl tracking-tight leading-[0.95] text-text-primary mb-6 max-w-3xl">
          Why Sigilix reads like
          <br />
          <span className="text-ink">a senior engineer</span>, not a chatbot.
        </h2>
        <p className="text-lg text-text-secondary max-w-2xl mb-16 leading-relaxed">
          Four parallel specialists produce a lot of overlap. Without a synthesizer that overlap shows up as 40 redundant comments on the PR. The synthesizer is what turns four streams into one signal.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="bg-canvas p-8 relative"
            >
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-secondary mb-2">
                Step {i + 1}
              </p>
              <h3 className="font-sans text-2xl font-medium text-ink mb-4 tracking-tight">
                {step.label}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function FlowStrip() {
  return (
    <section className="relative py-16 md:py-24 px-6 md:px-12 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-secondary mb-4">
          End-to-end
        </p>
        <h2 className="font-sans font-medium text-3xl md:text-5xl tracking-tight leading-[0.95] text-text-primary mb-12 max-w-3xl">
          From git push to GitHub review.
        </h2>
        <div className="flex flex-col md:flex-row items-stretch gap-px bg-border rounded-sm overflow-hidden border border-border font-mono text-xs uppercase tracking-[0.2em]">
          <div className="bg-canvas p-8 flex-1 flex flex-col gap-3">
            <span className="text-text-secondary">01</span>
            <span className="text-text-primary text-sm normal-case tracking-normal font-sans">PR triggered</span>
            <span className="text-text-secondary text-[11px] normal-case tracking-normal font-sans leading-relaxed">
              GitHub webhook fires on PR open or push. Sigilix reads diff + PR metadata.
            </span>
          </div>
          <div className="bg-canvas p-8 flex-1 flex flex-col gap-3">
            <span className="text-text-secondary">02</span>
            <span className="text-text-primary text-sm normal-case tracking-normal font-sans">Specialists analyze</span>
            <span className="text-text-secondary text-[11px] normal-case tracking-normal font-sans leading-relaxed">
              Four specialists run in parallel, each through its own model + prompt. Cross-provider fallback if any single model fails.
            </span>
          </div>
          <div className="bg-canvas p-8 flex-1 flex flex-col gap-3">
            <span className="text-text-secondary">03</span>
            <span className="text-text-primary text-sm normal-case tracking-normal font-sans">Synthesizer posts</span>
            <span className="text-text-secondary text-[11px] normal-case tracking-normal font-sans leading-relaxed">
              Findings are deduplicated, calibrated, and posted as one review with the verdict (approve / request-changes) and inline anchors.
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
