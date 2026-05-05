"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const FAQS = [
  {
    q: "Does Sigilix train on our code?",
    a: "No. Zero retention. Your code is transmitted for review and discarded immediately. It is never used to train or fine-tune models.",
  },
  {
    q: "How is pricing structured?",
    a: "Free during private beta. Flat per-seat pricing at GA, with unlimited public and private repositories. No usage caps, no surprise overages.",
  },
  {
    q: "How is this different from CodeRabbit, Greptile, or Cursor Bugbot?",
    a: "They rely on a single agent. Sigilix runs four parallel specialists. If one model hallucinates or misses a bug, the others catch it. The synthesizer suppresses false positives instead of dumping raw output into your PR.",
  },
  {
    q: "Which platforms are supported?",
    a: "GitHub today. GitLab and Bitbucket are on the roadmap.",
  },
  {
    q: "Can we self-host?",
    a: "Not yet. An Enterprise tier with VPC and on-premise deployment is in development. Register interest via the GitHub App page.",
  },
  {
    q: "What languages are supported?",
    a: "All major languages. The ensemble is strongest in TypeScript, Python, Go, Rust, and Java.",
  },
] as const

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" className="relative py-24 md:py-32 px-6 md:px-12 border-t border-border">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-secondary mb-4">
          Questions
        </p>
        <h2 className="font-sans font-medium text-4xl md:text-6xl tracking-tight leading-[0.95] text-text-primary mb-12">
          Common <span className="text-ink">objections.</span>
        </h2>
        <div className="border-t border-border">
          {FAQS.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={i} className="border-b border-border">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className={`w-full flex items-center gap-4 py-6 text-left transition-colors ${isOpen ? "border-l-2 border-ink pl-4" : ""}`}
                  aria-expanded={isOpen}
                >
                  <span className={`flex-1 font-sans text-lg ${isOpen ? "text-text-primary" : "text-text-primary"}`}>
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-text-secondary transition-transform duration-300 ${isOpen ? "rotate-180 text-ink" : ""}`}
                  />
                </button>
                {isOpen && (
                  <div className={`pb-6 ${isOpen ? "pl-6" : ""}`}>
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
