"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Code2 } from "lucide-react"

const EASE = [0.22, 1, 0.36, 1] as const

const EDITORS = [
  { name: "VS Code" },
  { name: "Cursor" },
  { name: "Windsurf" },
  { name: "JetBrains" },
  { name: "Zed" },
] as const

export function IDEHero() {
  return (
    <section className="relative pt-32 md:pt-40 pb-12 md:pb-16 px-6 md:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-50"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(198,35,74,0.10), transparent 50%), radial-gradient(circle at 70% 60%, rgba(198,35,74,0.06), transparent 55%)",
        }}
      />
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">IDE</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent border border-accent/40 px-2 py-0.5 rounded-sm">
              Coming Q3 2026
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.05 }}
            className="font-sans font-medium text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[0.98] text-text-primary mb-6"
          >
            Seal your code <span className="text-accent">before</span> the PR.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.12 }}
            className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-xl mb-8"
          >
            The full Sigilix ensemble running inline in your editor. Warden, Glyph, Pulse, and Weave
            on every save — no commit, no push, no waiting on CI.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="#early-access"
              className="inline-flex items-center justify-center gap-2 bg-accent text-white h-12 px-6 rounded-sm font-sans text-sm font-medium hover:bg-accent-hover transition-all hover:shadow-[0_0_30px_-5px_var(--color-accent-glow)]"
            >
              Join early access
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex items-center justify-center gap-2 text-text-primary h-12 px-6 rounded-sm font-sans text-sm font-medium border border-border hover:border-text-secondary transition-colors"
            >
              See the ensemble
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.32 }}
            className="mt-10 pt-8 border-t border-border-subtle"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-text-muted mb-4">
              Planned editors
            </p>
            <div className="flex flex-wrap gap-2">
              {EDITORS.map((e) => (
                <span
                  key={e.name}
                  className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-text-secondary bg-surface-raised border border-border-subtle px-3 py-1.5 rounded-sm"
                >
                  <Code2 className="w-3 h-3 text-accent" strokeWidth={1.5} />
                  {e.name}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          className="bg-surface border border-border rounded-sm overflow-hidden shadow-[0_0_80px_-20px_var(--color-accent-glow)]"
        >
          <EditorMock />
        </motion.div>
      </div>
    </section>
  )
}

function EditorMock() {
  return (
    <div>
      <div className="border-b border-border bg-surface-raised px-3 py-2 flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-border" />
        <span className="w-2.5 h-2.5 rounded-full bg-border" />
        <span className="w-2.5 h-2.5 rounded-full bg-border" />
        <span className="font-mono text-[11px] text-text-muted ml-3">orders.ts</span>
        <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.2em] text-accent border border-accent/40 px-1.5 py-0.5 rounded-sm">
          Sigilix
        </span>
      </div>
      <div className="grid grid-cols-[40px_1fr] font-mono text-[12px] leading-[1.65]">
        <div className="bg-canvas border-r border-border-subtle text-right text-text-muted py-4 select-none">
          {Array.from({ length: 11 }, (_, i) => (
            <div key={i} className="px-2">
              {i + 1}
            </div>
          ))}
        </div>
        <div className="py-4 px-4 bg-canvas overflow-hidden">
          <Line>{"async function applyDiscount(orderId: string, code: string) {"}</Line>
          <Line>{"  const order = await cache.get(`order:${orderId}`)"}</Line>
          <Line tokenClass="text-text-muted">{"  // ..."}</Line>
          <Line highlight>
            {"  const discount = await db.discount.findFirst({ where: { code } })"}
          </Line>
          <Line>{"  if (canApply(order.userId, discount)) {"}</Line>
          <Line>{"    await db.order.update({"}</Line>
          <Line>{"      where: { id: orderId },"}</Line>
          <Line>{"      data: { totalCents: order.totalCents - discount.amount },"}</Line>
          <Line>{"    })"}</Line>
          <Line>{"  }"}</Line>
          <Line>{"}"}</Line>
        </div>
      </div>
      <div className="border-t border-border bg-canvas p-4 space-y-3">
        <InlineFinding
          specialist="Warden"
          severity="critical"
          line={4}
          body={
            <>
              Cached <code className="text-text-primary">order.userId</code> trusted for
              authorization. If ownership changes, this discount applies under the previous owner.
            </>
          }
        />
        <InlineFinding
          specialist="Pulse"
          severity="warning"
          line={4}
          body={
            <>
              Cache write isn&apos;t invalidated on write-back. Recommend{" "}
              <code className="text-text-primary">SELECT ... FOR UPDATE</code> in a single
              transaction.
            </>
          }
        />
      </div>
    </div>
  )
}

function Line({
  children,
  highlight = false,
  tokenClass = "text-text-secondary",
}: {
  children: React.ReactNode
  highlight?: boolean
  tokenClass?: string
}) {
  return (
    <div
      className={`whitespace-pre ${tokenClass} ${
        highlight ? "bg-accent-muted -mx-4 px-4 border-l-2 border-accent" : ""
      }`}
    >
      {children}
    </div>
  )
}

function InlineFinding({
  specialist,
  severity,
  line,
  body,
}: {
  specialist: string
  severity: "critical" | "warning"
  line: number
  body: React.ReactNode
}) {
  const sevClasses =
    severity === "critical" ? "bg-accent-muted text-accent" : "bg-warning/10 text-warning"
  return (
    <div className="bg-surface border border-border rounded-sm p-3 flex items-start gap-3">
      <span
        className={`font-mono text-[10px] uppercase tracking-[0.2em] px-2 py-0.5 rounded-sm shrink-0 ${sevClasses}`}
      >
        {severity}
      </span>
      <div className="flex-1 text-[12px] leading-relaxed text-text-secondary">
        <span className="font-mono text-text-primary">{specialist}</span>
        <span className="text-text-muted"> · line {line} ·</span> {body}
      </div>
    </div>
  )
}
