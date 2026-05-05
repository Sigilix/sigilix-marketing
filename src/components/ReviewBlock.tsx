"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ChevronDown } from "lucide-react"

export interface Finding {
  specialist: "Logic" | "Security" | "Performance" | "Tests"
  line: string
  headline: string
  body: string
}

interface ReviewBlockProps {
  /** Top-level synthesizer summary, plain prose. */
  summary: string
  /** "Request changes" / "Approved" badge text. */
  verdict?: string
  /** Findings to render. Each is independently collapsible by default. */
  findings: Finding[]
  /** When true, all findings render expanded with no collapse interaction.
   *  Used by the "/" output teaser to show a static artifact without
   *  inviting the user to fiddle with it before they reach /example. */
  staticExpanded?: boolean
  /** Optional reviewer name; defaults to "sigilix". */
  authorHandle?: string
  /** Optional timestamp string; defaults to "12 minutes ago". */
  timestamp?: string
}

/**
 * Mock GitHub PR review comment authored by Sigilix.
 *
 * Used in two places:
 *   - `/` (slimmed home page) → static, no interactivity, single instance,
 *     teases the depth available on /example.
 *   - `/example` → multiple instances rendered into a gallery, each
 *     showcasing a different specialist domain. Default expanded-state
 *     is determined by the prop.
 */
export function ReviewBlock({
  summary,
  verdict = "Request changes",
  findings,
  staticExpanded = false,
  authorHandle = "sigilix",
  timestamp = "12 minutes ago",
}: ReviewBlockProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  // When `staticExpanded` is on, all entries are open and the user cannot
  // collapse them. Otherwise default to the first finding open.
  const [open, setOpen] = useState<number | null>(staticExpanded ? null : 0)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="bg-surface border border-border rounded-sm max-w-3xl mx-auto p-6 md:p-8 font-mono text-sm"
    >
      {/* Comment header */}
      <div className="flex items-center gap-3 mb-6">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={inView ? { scale: [0.5, 1.05, 1], opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          className="w-12 h-12 rounded-full bg-canvas ring-1 ring-ink/40 flex items-center justify-center text-ink font-sans text-sm tracking-tight"
          aria-hidden
        >
          SX
        </motion.div>
        <div className="flex-1">
          <p className="text-text-primary">
            <span className="font-medium">{authorHandle}</span>{" "}
            <span className="text-text-secondary">[bot] reviewed</span>
          </p>
          <p className="text-xs text-text-secondary">{timestamp}</p>
        </div>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink px-3 py-1 border border-ink rounded-sm">
          {verdict}
        </span>
      </div>

      {/* Synthesizer summary */}
      <div className="border-l-2 border-ink pl-4 mb-6">
        <h3 className="font-sans text-base font-medium text-text-primary mb-2">
          Sigilix Summary
        </h3>
        <p className="text-text-secondary leading-relaxed font-sans">{summary}</p>
        <p className="text-xs text-text-secondary mt-3 font-mono uppercase tracking-[0.15em]">
          {findings.length} {findings.length === 1 ? "finding" : "findings"} inline below.
        </p>
      </div>

      {/* Inline findings */}
      <div className="space-y-2">
        {findings.map((f, i) => {
          const isOpen = staticExpanded || open === i
          return (
            <div
              key={i}
              className="border border-border rounded-sm overflow-hidden"
            >
              <button
                onClick={() => !staticExpanded && setOpen(isOpen ? null : i)}
                className="w-full flex items-center gap-3 p-4 text-left hover:bg-canvas transition-colors disabled:cursor-default disabled:hover:bg-transparent"
                aria-expanded={isOpen}
                disabled={staticExpanded}
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink px-2 py-1 bg-ink/10 rounded-sm">
                  {f.specialist}
                </span>
                <span className="font-sans text-text-primary flex-1">
                  {f.headline}
                </span>
                {!staticExpanded && (
                  <ChevronDown
                    className={`w-4 h-4 text-text-secondary transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                )}
              </button>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="px-4 pb-4 border-t border-border bg-canvas"
                >
                  <p className="text-xs text-text-secondary mt-3 mb-2 font-mono">
                    {f.line}
                  </p>
                  <p className="text-text-secondary font-sans leading-relaxed">
                    {f.body}
                  </p>
                </motion.div>
              )}
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
