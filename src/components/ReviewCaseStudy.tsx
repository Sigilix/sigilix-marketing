"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

const EASE = [0.22, 1, 0.36, 1] as const

type Severity = "critical" | "warning" | "info"
type Specialist = "glyph" | "warden" | "pulse" | "weave" | "core"

interface Finding {
  specialist: Specialist
  severity: Severity
  category: string
  body: ReactNode
}

const SEVERITY_CLASSES: Record<Severity, string> = {
  critical: "bg-accent-muted text-accent border-accent/40",
  warning: "bg-warning/10 text-warning border-warning/30",
  info: "bg-surface-raised text-text-secondary border-border",
}

const SPECIALIST_LABEL: Record<Specialist, string> = {
  glyph: "Glyph",
  warden: "Warden",
  pulse: "Pulse",
  weave: "Weave",
  core: "Core",
}

export interface ReviewCase {
  id: string
  title: string
  language: string
  scenario: string
  diff: string
  findings: Finding[]
  takeaway?: string
}

export function ReviewCaseStudy({ case: c, index }: { case: ReviewCase; index: number }) {
  const isEven = index % 2 === 0
  return (
    <motion.article
      id={c.id}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: EASE }}
      className="border-t border-border-subtle py-20 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="flex items-baseline gap-4 mb-3">
          <span className="font-mono text-sm tracking-[0.2em] text-accent">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted">
            {c.language} · case study
          </span>
        </div>
        <h3 className="font-sans font-medium text-3xl md:text-4xl tracking-tight leading-[1.05] text-text-primary mb-4 max-w-3xl">
          {c.title}
        </h3>
        <p className="text-text-secondary mb-12 max-w-3xl leading-relaxed">{c.scenario}</p>

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${isEven ? "" : "lg:[direction:rtl]"}`}>
          <div className={isEven ? "" : "lg:[direction:ltr]"}>
            <div className="bg-surface border border-border rounded-sm overflow-hidden">
              <div className="border-b border-border px-4 py-2.5 flex items-center gap-2">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted">
                  diff
                </span>
              </div>
              <pre className="font-mono text-xs leading-relaxed text-text-secondary p-5 overflow-x-auto">
                <code>{c.diff}</code>
              </pre>
            </div>
          </div>
          <div className={`space-y-3 ${isEven ? "" : "lg:[direction:ltr]"}`}>
            {c.findings.map((f, i) => (
              <FindingCard key={i} finding={f} />
            ))}
            {c.takeaway && (
              <div className="mt-6 border-l-2 border-accent pl-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted mb-2">
                  Takeaway
                </p>
                <p className="text-text-secondary leading-relaxed">{c.takeaway}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  )
}

function FindingCard({ finding }: { finding: Finding }) {
  return (
    <div className="bg-surface border border-border rounded-sm p-5">
      <div className="flex items-center gap-3 mb-3 flex-wrap">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-primary">
          {SPECIALIST_LABEL[finding.specialist]}
        </span>
        <span className="font-mono text-[11px] text-text-muted">·</span>
        <span className="font-mono text-[11px] text-text-secondary">{finding.category}</span>
        <span
          className={`ml-auto font-mono text-[10px] uppercase tracking-[0.2em] px-2 py-1 rounded-sm border ${SEVERITY_CLASSES[finding.severity]}`}
        >
          {finding.severity}
        </span>
      </div>
      <div className="text-text-secondary leading-relaxed text-sm prose-finding">{finding.body}</div>
    </div>
  )
}
