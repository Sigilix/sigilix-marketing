"use client"

import { motion } from "framer-motion"

const ease = [0.25, 0.46, 0.45, 0.94] as const

export function IDEHero() {
  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 px-6 md:px-8 overflow-hidden">
      <div className="mx-auto max-w-5xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-8"
        >
          Coming soon · 2026
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.08 }}
          className="font-sans font-medium text-5xl md:text-7xl tracking-tight leading-[0.98] text-text-primary mb-8"
        >
          The ensemble, <span className="text-accent">inline.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.16 }}
          className="text-lg md:text-xl text-text-secondary mb-16 max-w-2xl mx-auto leading-relaxed"
        >
          Coming soon — Sigilix specialists running inside VS Code and Cursor. Warnings, architecture notes, and security flags before you ever open a pull request.
        </motion.p>

        {/* Editor mock */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.3 }}
          className="bg-surface border border-border rounded-sm overflow-hidden text-left max-w-4xl mx-auto shadow-[0_0_80px_-20px_var(--color-accent-glow)]"
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-canvas">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-text-muted/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-text-muted/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-text-muted/40" />
            </div>
            <p className="font-mono text-xs text-text-muted ml-3">
              src/utils/fetcher.ts
            </p>
          </div>
          <div className="p-6 font-mono text-[13px] leading-relaxed">
            <pre className="text-text-secondary whitespace-pre-wrap">
              <span className="text-text-muted">  1</span>{" "}<span className="text-accent">export</span>{" "}<span className="text-accent">async</span>{" "}<span className="text-accent">function</span>{" "}fetchUrl(url{" "}<span className="text-accent">:</span>{" "}<span className="text-success">string</span>) {"{"}
              {"\n"}<span className="text-text-muted">  2</span>{"   "}<span className="text-accent">const</span>{" "}res = <span className="text-accent">await</span>{" "}<span className="underline decoration-accent decoration-wavy">fetch</span>(url){"\n"}<span className="text-text-muted">  3</span>{"   "}<span className="text-accent">return</span>{" "}res.json()
              {"\n"}<span className="text-text-muted">  4</span>{" "}{"}"}
            </pre>
            <div className="mt-4 bg-accent-muted border-l-2 border-accent rounded-sm p-3">
              <p className="text-accent font-mono text-xs uppercase tracking-[0.2em] mb-1">
                Warden · Critical
              </p>
              <p className="text-text-primary font-sans text-sm">
                Unvalidated URL passed to fetch(). Validate against
                approvedHosts[] before request.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
