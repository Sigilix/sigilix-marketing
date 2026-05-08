"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"

interface Group {
  specialist: string
  category: string
  severity: "Critical" | "Warning" | "Info"
  body: string
}

const GROUPS: Group[] = [
  {
    specialist: "Warden",
    category: "Security",
    severity: "Critical",
    body:
      "`userId` from `req.params` is passed directly into a SQL template on line 44. Use the parameterized query pattern established in `authService.ts`.",
  },
  {
    specialist: "Pulse",
    category: "Performance",
    severity: "Warning",
    body:
      "Nested loop in `aggregateReports` scales with repo count. Consider indexing `createdAt` or paginating upstream.",
  },
  {
    specialist: "Weave",
    category: "Semantics",
    severity: "Info",
    body:
      "Function name `handleStuff` does not describe the side effect (sends email + writes audit). Recommend `dispatchAuditEmail`.",
  },
]

const severityClasses: Record<Group["severity"], string> = {
  Critical: "bg-accent-muted text-accent",
  Warning: "bg-warning/10 text-warning",
  Info: "bg-surface-raised text-text-secondary",
}

export function SampleReview() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const [open, setOpen] = useState<number[]>([0, 1, 2])

  const toggle = (i: number) =>
    setOpen((cur) => (cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i]))

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 px-6 md:px-8 border-t border-border-subtle"
    >
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-secondary mb-4">
          The Output
        </p>
        <h2 className="font-sans font-medium text-4xl md:text-5xl tracking-tight leading-[0.98] text-text-primary mb-6">
          What a Sigilix review <span className="text-accent">looks like.</span>
        </h2>
        <p className="text-lg text-text-secondary mb-16 leading-relaxed">
          Not a wall of GPT fluff. A structured, collapsible comment with findings sorted by specialist, severity, and exactly where to act.
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="bg-surface border border-border rounded-sm p-6 md:p-8"
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-sm bg-canvas border border-border flex items-center justify-center">
              <Image
                src="/sigil-logo.png"
                alt=""
                width={24}
                height={24}
                className="logo-invert"
              />
            </div>
            <div className="flex-1">
              <p className="font-sans text-sm text-text-primary">
                <span className="font-medium">Sigilix</span>{" "}
                <span className="text-text-secondary">[bot] reviewed</span>
              </p>
              <p className="font-mono text-[11px] text-text-muted uppercase tracking-[0.2em]">
                12 minutes ago
              </p>
            </div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent px-3 py-1 border border-accent rounded-sm">
              Request changes
            </span>
          </div>

          {/* Summary bar */}
          <div className="border-l-2 border-accent pl-4 mb-6">
            <p className="font-sans text-text-primary leading-relaxed">
              <span className="text-accent font-medium">Core</span> found{" "}
              <span className="text-text-primary font-medium">3 findings</span>{" "}
              across <span className="text-text-primary font-medium">3 specialists</span>.{" "}
              <span className="text-text-primary font-medium">1</span> requires action before merge.
            </p>
          </div>

          {/* Findings */}
          <div className="space-y-2">
            {GROUPS.map((g, i) => {
              const isOpen = open.includes(i)
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="border border-border rounded-sm overflow-hidden"
                >
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex items-center gap-3 p-4 text-left hover:bg-canvas transition-colors"
                    aria-expanded={isOpen}
                  >
                    <ChevronDown
                      className={`w-4 h-4 text-text-secondary transition-transform duration-300 ${
                        isOpen ? "" : "-rotate-90"
                      }`}
                    />
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-primary">
                      {g.specialist}
                    </span>
                    <span className="font-mono text-[11px] text-text-muted">·</span>
                    <span className="font-mono text-[11px] text-text-secondary">
                      {g.category}
                    </span>
                    <span
                      className={`ml-auto font-mono text-[10px] uppercase tracking-[0.2em] px-2 py-1 rounded-sm ${severityClasses[g.severity]}`}
                    >
                      {g.severity}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 border-t border-border bg-canvas">
                      <p className="font-sans text-text-secondary leading-relaxed mt-3 mb-3">
                        {g.body}
                      </p>
                      <button
                        type="button"
                        className="font-mono text-xs text-accent hover:underline"
                      >
                        View diff →
                      </button>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
