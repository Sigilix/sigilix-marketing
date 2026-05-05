"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Layers, Shield, Zap, Type as TypeIcon, GitMerge, type LucideIcon } from "lucide-react"

interface Specialist {
  name: string
  role: string
  catches: string
  example: string
  icon: LucideIcon
}

const SPECIALISTS: Specialist[] = [
  {
    name: "Glyph",
    role: "Architecture Specialist",
    catches:
      "Circular dependencies, layer-boundary leaks, interface drift, and module cohesion violations.",
    example: `[Glyph] Boundary violation detected
domain/invoice.ts imports infra/stripe.ts
Rule: Domain may not depend on Infrastructure.
Suggested fix: Introduce \`PaymentGateway\` port in domain/.`,
    icon: Layers,
  },
  {
    name: "Warden",
    role: "Security Specialist",
    catches:
      "Secret leakage, unsanitized inputs, auth bypasses, insecure regexes, and OWASP-relevant patterns.",
    example: `[Warden] Critical: Potential SSRF
utils/fetcher.ts:71 — user-supplied URL passed to fetch()
without an allowlist. Validate against approvedHosts[].`,
    icon: Shield,
  },
  {
    name: "Spark",
    role: "Performance Specialist",
    catches:
      "N+1 queries, unnecessary re-renders, memory leaks, unbounded recursion, and Big-O regressions.",
    example: `[Spark] O(n²) render loop
components/Table.tsx:112 — sorting inside render()
Memoize with useMemo keyed by sortKey.`,
    icon: Zap,
  },
  {
    name: "Weave",
    role: "Semantics Specialist",
    catches:
      "Dead code, naming violations, logic errors that type-checkers miss, and test-coverage gaps.",
    example: `[Weave] Unreachable branch
checkout.ts:45 — early return bypasses tax calc
when total < 0. Remove or handle as error path.`,
    icon: TypeIcon,
  },
  {
    name: "Core",
    role: "Synthesizer",
    catches:
      "It doesn't find bugs; it resolves the noise of the other four. Core deduplicates overlapping findings, suppresses false positives via cross-reference, ranks by merge-blocking impact, and writes the final comment you actually read.",
    example: `[Core] Unified 2 findings into 1
Warden + Spark both flagged the unvalidated loop.
After context check: severity lowered to Warning.
Final output: single actionable comment.`,
    icon: GitMerge,
  },
]

export function SpecialistDeepDive() {
  return (
    <section className="relative py-24 md:py-32 px-6 md:px-8 border-t border-border-subtle">
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-secondary mb-4">
          The Five
        </p>
        <h2 className="font-sans font-medium text-4xl md:text-6xl tracking-tight leading-[0.98] text-text-primary mb-6 max-w-3xl">
          Meet the <span className="text-accent">ensemble.</span>
        </h2>
        <p className="text-lg text-text-secondary max-w-2xl mb-20 leading-relaxed">
          Every specialist is tuned for a specific class of failure. Together they cover the surface area a single model never could.
        </p>

        <div className="space-y-24 md:space-y-32">
          {SPECIALISTS.map((s, i) => (
            <SpecialistRow key={s.name} specialist={s} reverse={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

function SpecialistRow({
  specialist,
  reverse,
}: {
  specialist: Specialist
  reverse: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })
  const Icon = specialist.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center`}
    >
      <div className={reverse ? "md:order-2" : ""}>
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-sm bg-surface-raised border border-border mb-6">
          <Icon className="w-6 h-6 text-accent" strokeWidth={1.5} />
        </div>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted mb-2">
          {specialist.role}
        </p>
        <h3 className="font-sans font-medium text-3xl md:text-4xl tracking-tight text-text-primary mb-4">
          {specialist.name}
        </h3>
        <p className="text-text-secondary leading-relaxed">{specialist.catches}</p>
      </div>

      <div className={reverse ? "md:order-1" : ""}>
        <div className="bg-surface border border-border rounded-sm p-5 font-mono text-[13px] leading-relaxed text-text-secondary whitespace-pre-wrap">
          {specialist.example}
        </div>
      </div>
    </motion.div>
  )
}
