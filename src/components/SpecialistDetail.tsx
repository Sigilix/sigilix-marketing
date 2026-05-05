"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface Specialist {
  name: string
  oneLine: string
  catches: string[]
  example: string
  glyph: React.ReactNode
}

const SPECIALISTS: Specialist[] = [
  {
    name: "Logic",
    oneLine: "Traces control flow and catches semantic drift.",
    catches: [
      "Off-by-one errors and inverted boundary conditions",
      "Broken invariants between code paths in the same diff",
      "Tie-breaks and sort orders that silently change behavior",
      "Race conditions in async code paths",
    ],
    example:
      "When `items.length === 1`, the loop boundary `i < items.length - 1` skips the only item entirely. Use `i < items.length`.",
    glyph: (
      <svg viewBox="0 0 32 32" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <circle cx="16" cy="6" r="2.5" />
        <path d="M16 9 L16 14 M16 14 L8 22 M16 14 L24 22" />
        <circle cx="8" cy="24" r="2.5" />
        <circle cx="24" cy="24" r="2.5" />
      </svg>
    ),
  },
  {
    name: "Security",
    oneLine: "Hunts leaks, injections, and unsafe defaults.",
    catches: [
      "CSRF and authentication bypasses on new routes",
      "Unsafe input handling — SSRF, XSS, formula injection",
      "Secrets and session tokens leaking into responses",
      "Privileges granted but never revoked",
    ],
    example:
      "The route accepts JSON without a CSRF token. Add `requireCsrf()` middleware or scope to the same-origin fetch.",
    glyph: (
      <svg viewBox="0 0 32 32" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M16 4 L26 8 L26 16 C26 22 21 26 16 28 C11 26 6 22 6 16 L6 8 Z" />
        <circle cx="16" cy="16" r="3" />
      </svg>
    ),
  },
  {
    name: "Performance",
    oneLine: "Flags regressions before they hit production.",
    catches: [
      "Hot-path hidden quadratic loops",
      "N+1 queries and missing batch boundaries",
      "Unbounded memory growth in long-running handlers",
      "Blocking I/O introduced into async code",
    ],
    example:
      "The new inline version constructs `tokenFreq` inside the per-document loop — that's O(N·T) work the previous version amortized via memoization.",
    glyph: (
      <svg viewBox="0 0 32 32" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M14 4 L8 18 L14 18 L12 28 L24 12 L18 12 L20 4 Z" />
      </svg>
    ),
  },
  {
    name: "Tests",
    oneLine: "Verifies coverage, mocks, and assertion logic.",
    catches: [
      "New branches added without corresponding tests",
      "Brittle assertions that mask real regressions",
      "Mocks that drift from the real interface",
      "Tests that exercise the happy path but never the failure mode",
    ],
    example:
      "Once CSRF is required, add a test that POSTs without a token and asserts 403. Existing happy-path tests will pass either way.",
    glyph: (
      <svg viewBox="0 0 32 32" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <circle cx="16" cy="16" r="10" />
        <circle cx="16" cy="16" r="4" />
        <path d="M16 2 L16 6 M16 26 L16 30 M2 16 L6 16 M26 16 L30 16" />
      </svg>
    ),
  },
]

export function SpecialistDetail() {
  return (
    <section className="relative py-16 md:py-24 px-6 md:px-12 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-secondary mb-4">
          The Four
        </p>
        <h2 className="font-sans font-medium text-4xl md:text-6xl tracking-tight leading-[0.95] text-text-primary mb-6 max-w-3xl">
          Each specialist reads the same diff
          <br />
          <span className="text-ink">through a different lens.</span>
        </h2>
        <p className="text-lg text-text-secondary max-w-2xl mb-16 leading-relaxed">
          One model with one prompt sees one set of issues. Four specialists with four prompts see four sets — and the union is bigger than any single set.
        </p>

        <div className="space-y-px bg-border">
          {SPECIALISTS.map((s, i) => (
            <SpecialistRow key={s.name} specialist={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function SpecialistRow({ specialist, index }: { specialist: Specialist; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="bg-canvas grid grid-cols-1 md:grid-cols-[200px_1fr_1fr] gap-8 p-8 md:p-12"
    >
      <div className="text-ink shrink-0">
        {specialist.glyph}
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-primary mt-6">
          {specialist.name}
        </p>
      </div>
      <div>
        <p className="text-text-primary text-lg leading-relaxed mb-6">
          {specialist.oneLine}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-secondary mb-3">
          What it catches
        </p>
        <ul className="space-y-2 text-text-secondary text-sm leading-relaxed">
          {specialist.catches.map((c) => (
            <li key={c} className="flex gap-2">
              <span className="text-ink shrink-0 mt-1">·</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-secondary mb-3">
          Sample finding
        </p>
        <div className="bg-surface border-l-2 border-ink p-5 font-sans text-sm text-text-secondary leading-relaxed rounded-sm">
          {specialist.example}
        </div>
      </div>
    </motion.div>
  )
}
