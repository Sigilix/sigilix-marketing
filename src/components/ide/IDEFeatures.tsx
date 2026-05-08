"use client"

import { motion } from "framer-motion"
import {
  GitPullRequestArrow,
  Wrench,
  Gift,
  Telescope,
  Save,
  Bug,
  CheckCheck,
  Terminal,
} from "lucide-react"

const EASE = [0.22, 1, 0.36, 1] as const

const VIBE_CARDS = [
  {
    icon: GitPullRequestArrow,
    title: "Review in flow",
    body: "The same ensemble reads your file as you save. No commit, no push, no waiting on CI for the first signal.",
  },
  {
    icon: Bug,
    title: "Catch AI slop",
    body: "Hallucinations, fabricated APIs, missing tests, copy-pasted boilerplate — flagged before they leave your editor.",
  },
  {
    icon: Telescope,
    title: "Context-aware",
    body: "Sigilix retrieves the surrounding files, types, and PR conventions of the repo. Findings are grounded, not guessed.",
  },
  {
    icon: Gift,
    title: "Free in IDE",
    body: "Every account gets the IDE plugin with generous rate limits — no credit card, no PR-quota burn for in-editor reviews.",
  },
] as const

const FEATURES = [
  {
    icon: Save,
    label: "Review uncommitted changes",
    body: "Findings on your staged and unstaged diff before you ever open a PR. Catch the bug while the context is still in your head.",
  },
  {
    icon: CheckCheck,
    label: "Line-by-line annotations",
    body: "Each line gets the same scrutiny a senior engineer would apply on PR review. Inline comments, severity badges, suggested patches.",
  },
  {
    icon: Wrench,
    label: "One-click fix",
    body: "When a finding has a clean rewrite, apply it in place. Rare for criticals; common for refactor and naming nits.",
  },
  {
    icon: Terminal,
    label: "Hand-off to your AI agent",
    body: "Sigilix routes findings to your code-gen agent of choice (Cursor, Windsurf, Claude Code, Copilot) so you can keep iterating without leaving flow.",
  },
] as const

const LANGUAGES = [
  "TypeScript",
  "JavaScript",
  "Python",
  "Go",
  "Rust",
  "Java",
  "C#",
  "C++",
  "Ruby",
  "PHP",
  "Swift",
  "Kotlin",
] as const

export function IDEFeatures() {
  return (
    <>
      <section className="relative py-24 md:py-32 px-6 md:px-8 border-t border-border-subtle">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4">
            01 · Vibe code with confidence
          </p>
          <h2 className="font-sans font-medium text-3xl md:text-5xl tracking-tight leading-[1.02] text-text-primary mb-6 max-w-3xl">
            Sigilix handles detection. <span className="text-accent">You handle the final 10%.</span>
          </h2>
          <p className="text-text-secondary leading-relaxed max-w-3xl mb-12 text-lg">
            Catch AI slop, missed tests, and review-grade defects before you commit. The full
            ensemble runs locally as you write — no PR round-trip required.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {VIBE_CARDS.map((c, i) => {
              const Icon = c.icon
              return (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                  className="bg-surface-raised border border-border rounded-sm p-6 flex flex-col"
                >
                  <div className="w-10 h-10 mb-4 rounded-sm bg-canvas border border-border flex items-center justify-center">
                    <Icon className="w-5 h-5 text-accent" strokeWidth={1.5} />
                  </div>
                  <p className="font-sans text-base font-medium text-text-primary mb-2">{c.title}</p>
                  <p className="text-sm text-text-secondary leading-relaxed">{c.body}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="relative py-24 md:py-32 px-6 md:px-8 border-t border-border-subtle">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4">
            02 · Languages
          </p>
          <h2 className="font-sans font-medium text-3xl md:text-5xl tracking-tight leading-[1.02] text-text-primary mb-6 max-w-3xl">
            Every language. <span className="text-accent">Eventually.</span>
          </h2>
          <p className="text-text-secondary leading-relaxed max-w-3xl mb-12 text-lg">
            Specialists are language-aware. We&apos;ll launch with the languages our paying users
            ship in, then expand on a public schedule.
          </p>
          <div className="flex flex-wrap gap-2">
            {LANGUAGES.map((l) => (
              <span
                key={l}
                className="font-mono text-xs uppercase tracking-[0.2em] text-text-secondary bg-surface-raised border border-border-subtle px-3 py-1.5 rounded-sm"
              >
                {l}
              </span>
            ))}
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted bg-surface-raised border border-border-subtle px-3 py-1.5 rounded-sm">
              + more on request
            </span>
          </div>
        </div>
      </section>

      <section className="relative py-24 md:py-32 px-6 md:px-8 border-t border-border-subtle">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4">
            03 · Deep features
          </p>
          <h2 className="font-sans font-medium text-3xl md:text-5xl tracking-tight leading-[1.02] text-text-primary mb-6 max-w-3xl">
            Everything PR review does, <span className="text-accent">earlier.</span>
          </h2>
          <p className="text-text-secondary leading-relaxed max-w-3xl mb-12 text-lg">
            Below are the four IDE workflows we&apos;re shipping at launch. Each is fed by the same
            specialist stack you&apos;ll find on the PR side.
          </p>
          <div className="space-y-4">
            {FEATURES.map((f, i) => {
              const Icon = f.icon
              const isEven = i % 2 === 0
              return (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.55, ease: EASE }}
                  className={`bg-surface-raised border border-border rounded-sm p-6 md:p-10 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 items-center ${
                    !isEven ? "lg:[&>:first-child]:order-2" : ""
                  }`}
                >
                  <div>
                    <div className="w-10 h-10 mb-5 rounded-sm bg-canvas border border-border flex items-center justify-center">
                      <Icon className="w-5 h-5 text-accent" strokeWidth={1.5} />
                    </div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted mb-3">
                      Feature {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="font-sans font-medium text-2xl md:text-3xl tracking-tight text-text-primary mb-3 leading-[1.05]">
                      {f.label}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">{f.body}</p>
                  </div>
                  <FeatureMock kind={f.label} />
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="relative py-24 md:py-32 px-6 md:px-8 border-t border-border-subtle">
        <div className="mx-auto max-w-5xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4">
            04 · Two surfaces, one ensemble
          </p>
          <h2 className="font-sans font-medium text-3xl md:text-5xl tracking-tight leading-[1.05] text-text-primary mb-6">
            Reviews in IDE. <span className="text-accent">Reviews in PR.</span> Same brain.
          </h2>
          <p className="text-text-secondary leading-relaxed max-w-2xl mx-auto mb-12 text-lg">
            The IDE plugin uses the exact same four-specialist pipeline as the PR review. You don&apos;t
            train two separate systems on different data. You learn one product, deeply.
          </p>
          <div className="bg-surface-raised border border-border rounded-sm p-6 md:p-10">
            <DualSurfaceDiagram />
          </div>
        </div>
      </section>
    </>
  )
}

function FeatureMock({ kind }: { kind: string }) {
  if (kind.includes("uncommitted")) {
    return (
      <div className="bg-canvas border border-border rounded-sm p-5 font-mono text-[12px] text-text-secondary">
        <p className="text-text-muted mb-2">% git status -s</p>
        <p>
          <span className="text-accent">M</span> src/services/orders.ts
        </p>
        <p>
          <span className="text-warning">M</span> src/services/billing.ts
        </p>
        <p className="text-text-muted mt-3 mb-2">Sigilix · uncommitted review</p>
        <div className="border-l-2 border-accent pl-3 mt-2 space-y-2">
          <p>
            <span className="text-accent">Critical</span> · orders.ts:14 · cache invalidation
          </p>
          <p>
            <span className="text-warning">Warning</span> · billing.ts:42 · N+1 query
          </p>
        </div>
      </div>
    )
  }
  if (kind.includes("Line-by-line")) {
    return (
      <div className="bg-canvas border border-border rounded-sm p-5 font-mono text-[12px] text-text-secondary">
        <div className="text-text-muted mb-3">orders.ts · 142</div>
        <div className="border-l-2 border-accent pl-3 mb-3">
          <span className="text-accent">Warden · Critical · </span>
          stale auth cache used in a write transaction
        </div>
        <div className="border-l-2 border-warning/60 pl-3 mb-3">
          <span className="text-warning">Pulse · Warning · </span>
          missing index on the new query path
        </div>
        <div className="border-l-2 border-text-muted pl-3">
          <span className="text-text-secondary">Weave · Info · </span>
          rename suggestion: applyDiscount → applyDiscountForOwner
        </div>
      </div>
    )
  }
  if (kind.includes("One-click")) {
    return (
      <div className="bg-canvas border border-border rounded-sm p-5 font-mono text-[12px]">
        <p className="text-text-muted mb-3">Suggested patch · orders.ts:142</p>
        <p className="text-accent">- order.totalCents - discount.amount</p>
        <p className="text-success">+ Math.max(0, order.totalCents - discount.amount)</p>
        <div className="mt-4 flex gap-2">
          <span className="bg-accent text-white px-3 py-1.5 rounded-sm text-[11px]">Apply fix</span>
          <span className="border border-border px-3 py-1.5 rounded-sm text-[11px] text-text-secondary">
            Skip
          </span>
        </div>
      </div>
    )
  }
  return (
    <div className="bg-canvas border border-border rounded-sm p-5 font-mono text-[12px] text-text-secondary">
      <p className="text-text-muted mb-2">% sigilix hand-off</p>
      <p>→ Cursor: rewrite applyDiscount to use SELECT ... FOR UPDATE</p>
      <p className="mt-2 text-text-muted">→ context attached: 4 findings, 2 specialists</p>
      <p className="mt-3 text-success">handed off · 2.1s</p>
    </div>
  )
}

function DualSurfaceDiagram() {
  return (
    <div className="grid grid-cols-3 items-center gap-4 max-w-3xl mx-auto">
      <Surface label="IDE" detail="VS Code · Cursor · JetBrains" />
      <div className="flex flex-col items-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-3">Ensemble</p>
        <div className="w-16 h-16 rounded-sm bg-canvas border-2 border-accent shadow-[0_0_30px_-8px_var(--color-accent-glow)] flex items-center justify-center">
          <span className="font-mono text-xs text-accent">Core</span>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted mt-3">
          shared
        </p>
      </div>
      <Surface label="Pull request" detail="GitHub · GitLab · Bitbucket" />
    </div>
  )
}

function Surface({ label, detail }: { label: string; detail: string }) {
  return (
    <div className="bg-canvas border border-border rounded-sm p-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-2">{label}</p>
      <p className="font-mono text-[10px] text-text-muted leading-relaxed">{detail}</p>
    </div>
  )
}
