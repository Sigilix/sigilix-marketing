"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

const FAQ = [
  {
    q: "When does the IDE plugin ship?",
    a: "We are targeting Q3 2026 for an open beta covering VS Code, Cursor, and Windsurf. JetBrains and Zed follow before year-end. Early-access invites go out as each editor reaches stability.",
  },
  {
    q: "Will the IDE plugin cost extra?",
    a: "No. Every Sigilix account — including Free — gets the IDE plugin with the same in-editor rate limits. PR review limits are tracked separately, so editor work doesn't burn your PR quota.",
  },
  {
    q: "Is the IDE plugin the same model as the PR review?",
    a: "Same ensemble, same specialists, same Core synthesizer. The only difference is the surface: PR reviews are posted as inline GitHub comments; IDE reviews surface in your editor's diagnostics panel and gutter.",
  },
  {
    q: "Does the plugin send my code to a third party?",
    a: "Code is sent to Sigilix's review worker only when you trigger a review (on save or on demand). It is held in memory for the duration of the review and never persisted. The same zero-retention policy as the PR side applies. See /security for full architecture.",
  },
  {
    q: "Will it conflict with my existing AI assistant?",
    a: "No. Sigilix is a reviewer, not a code generator. It can hand off findings to Cursor, Windsurf, Claude Code, or Copilot — but it doesn't compete with them.",
  },
  {
    q: "Can I run it offline or self-hosted?",
    a: "Self-hosted deployment for the IDE specialists is on the Max-tier roadmap. Offline-only inference is unlikely in the near term — the specialists rely on frontier models that are not viable to run locally with the same quality bar.",
  },
] as const

export function IDEFAQ() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section className="relative py-24 md:py-32 px-6 md:px-8 border-t border-border-subtle">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4">
          05 · FAQ
        </p>
        <h2 className="font-sans font-medium text-3xl md:text-5xl tracking-tight leading-[1.02] text-text-primary mb-12">
          Frequently asked questions.
        </h2>
        <div className="space-y-2">
          {FAQ.map((item, i) => {
            const isOpen = open === i
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="bg-surface border border-border rounded-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center gap-4 p-5 text-left hover:bg-surface-raised transition-colors"
                  aria-expanded={isOpen}
                  aria-controls={`ide-faq-panel-${i}`}
                  id={`ide-faq-button-${i}`}
                >
                  <span className="flex-1 font-sans font-medium text-text-primary">{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-text-secondary transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                      id={`ide-faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`ide-faq-button-${i}`}
                    >
                      <div className="px-5 pb-5 border-t border-border-subtle pt-4 text-text-secondary leading-relaxed">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
