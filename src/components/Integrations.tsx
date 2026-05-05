"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Github, ArrowRight } from "lucide-react"

const INTEGRATIONS = [
  { name: "GitHub", status: "Available now", available: true },
  { name: "GitLab", status: "Q3 2026", available: false },
  { name: "Bitbucket", status: "Q4 2026", available: false },
] as const

export function Integrations() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section className="relative py-24 md:py-32 px-6 md:px-8 border-t border-border-subtle">
      <div ref={ref} className="mx-auto max-w-7xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-secondary mb-4">
          Integrations
        </p>
        <h2 className="font-sans font-medium text-4xl md:text-6xl tracking-tight leading-[0.98] text-text-primary mb-6 max-w-3xl">
          Connects to <span className="text-accent">your forge.</span>
        </h2>
        <p className="text-lg text-text-secondary max-w-2xl mb-16 leading-relaxed">
          Install the GitHub App once. Sigilix watches every PR automatically — no CI files, no Docker hooks.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {INTEGRATIONS.map((it, i) => (
            <motion.div
              key={it.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`p-8 rounded-sm border ${
                it.available
                  ? "bg-surface-raised border-border hover:border-success/40 transition-colors"
                  : "bg-surface border-border opacity-60"
              }`}
            >
              <Github className={`w-8 h-8 mb-4 ${it.available ? "text-text-primary" : "text-text-muted"}`} strokeWidth={1.5} />
              <p className="font-sans text-xl font-medium text-text-primary mb-2">
                {it.name}
              </p>
              <p
                className={`font-mono text-xs uppercase tracking-[0.2em] ${
                  it.available ? "text-success" : "text-text-muted"
                }`}
              >
                {it.status}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Flow strip */}
        <div className="flex flex-col md:flex-row items-stretch gap-2 md:gap-4">
          {[
            { label: "GitHub push", sub: "PR opened or branch updated" },
            { label: "Sigilix ensemble", sub: "5 agents review in parallel" },
            { label: "PR comment", sub: "One verdict, anchored findings" },
          ].map((step, i) => (
            <div key={i} className="flex-1 flex items-center gap-4">
              <div className="flex-1 bg-surface border border-border rounded-sm p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted mb-2">
                  Step {i + 1}
                </p>
                <p className="font-sans text-text-primary font-medium mb-1">
                  {step.label}
                </p>
                <p className="font-sans text-xs text-text-secondary">{step.sub}</p>
              </div>
              {i < 2 && (
                <ArrowRight className="hidden md:block w-5 h-5 text-text-muted shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
