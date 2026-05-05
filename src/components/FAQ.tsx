"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const FAQS = [
  {
    q: "How is Sigilix different from Copilot or CodeRabbit?",
    a: "Those tools run a single generalist model. Sigilix runs four domain specialists and a synthesizer that arbitrates between them. That means deeper architectural catches, fewer hallucinations, and a single clean comment instead of a thread of noise.",
  },
  {
    q: "Does Sigilix write fixes, or just review?",
    a: "Today Sigilix reviews. It surfaces structured findings with line references and suggested patches; your team decides what to merge. We're exploring opt-in patch generation for a future release.",
  },
  {
    q: "Which languages are supported?",
    a: "Any language visible in a GitHub diff. Where AST parsers exist, specialists use them. Where they don't, semantic pattern matching and heuristics still catch leaks, loops, and logic errors.",
  },
  {
    q: "How does the 5-hour window work?",
    a: "Your PR limit resets every 5 hours to prevent burst abuse on shared infrastructure. For active teams, Pro and Max provide enough headroom that the limit is invisible.",
  },
  {
    q: "Can I self-host?",
    a: "Max tier includes a self-hosted runner for air-gapped environments. You run the container; we orchestrate the ensemble. Contact us to configure.",
  },
  {
    q: "What happens after I sign in?",
    a: "You authorize the Sigilix GitHub App, select the repositories you want reviewed, and the ensemble starts immediately. The first seal usually arrives in under 60 seconds on your next PR.",
  },
] as const

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section
      id="faq"
      className="relative py-24 md:py-32 px-6 md:px-8 border-t border-border-subtle"
    >
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-secondary mb-4">
          Questions
        </p>
        <h2 className="font-sans font-medium text-4xl md:text-6xl tracking-tight leading-[0.98] text-text-primary mb-12">
          Common <span className="text-accent">objections.</span>
        </h2>

        <div className="border-t border-border-subtle">
          {FAQS.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={i} className="border-b border-border-subtle">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center gap-6 py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="flex-1 font-sans text-lg text-text-primary">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-accent" : "text-text-secondary"}`}
                  />
                </button>
                {isOpen && (
                  <div className="pb-6 pr-12">
                    <p className="text-text-secondary leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
