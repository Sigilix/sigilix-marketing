"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const ease = [0.25, 0.46, 0.45, 0.94] as const

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-24 md:pt-32 pb-16 md:pb-24 px-6 md:px-8 min-h-[calc(100vh-64px)]">
      {/* Rotating logo watermark — anchors the brand. Single instance. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.03]"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="relative w-[120vh] h-[120vh] max-w-none will-change-transform"
        >
          <Image
            src="/sigil-logo.png"
            alt=""
            fill
            className="logo-invert object-contain"
            sizes="120vh"
          />
        </motion.div>
      </div>

      {/* Wax glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full"
        style={{
          background:
            "radial-gradient(circle, var(--color-accent-glow) 0%, transparent 70%)",
          filter: "blur(120px)",
          opacity: 0.6,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="font-mono text-xs uppercase tracking-[0.3em] text-text-secondary mb-8"
          >
            The mark of merge-ready code
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.08 }}
            className="font-sans font-medium text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.02] text-text-primary"
          >
            A seal of approval on every <span className="text-accent">pull request.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.16 }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-text-secondary"
          >
            Sigilix runs a five-agent specialist ensemble on every PR — architecture, security, performance, semantics, and synthesis — so nothing ships without a mark. No noise. No config. Just the verdict.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.24 }}
            className="mt-12 flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 bg-accent text-white h-12 px-6 rounded-sm font-sans text-sm font-medium hover:bg-accent-hover transition-all hover:shadow-[0_0_30px_-5px_var(--color-accent-glow)]"
            >
              Start for free
            </Link>
            <a
              href="#ensemble"
              className="inline-flex items-center justify-center gap-2 text-text-primary h-12 px-6 rounded-sm font-sans text-sm font-medium border border-border hover:border-text-secondary transition-colors"
            >
              See the ensemble
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
          className="bg-surface border border-border rounded-sm p-6 md:p-7 shadow-[0_0_80px_-20px_var(--color-accent-glow)]"
        >
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
                <span className="font-medium">Sigilix</span>
                <span className="text-text-secondary"> · 2 minutes ago</span>
              </p>
              <p className="font-mono text-[11px] text-text-muted uppercase tracking-[0.2em]">
                Review submitted
              </p>
            </div>
          </div>

          <div className="space-y-3 font-mono text-[13px] leading-relaxed text-text-secondary">
            <p>
              <span className="text-text-primary">Core</span> synthesized 4 findings across 3 specialists.
            </p>
            <p>
              <span className="text-accent font-medium">Warden</span> flagged an unsanitized route parameter.
            </p>
            <p>
              <span className="text-accent font-medium">Spark</span> caught an N+1 query in the new repository layer.
            </p>
            <p>
              <span className="text-accent font-medium">Glyph</span> noted a cross-boundary import.
            </p>
            <p className="pt-2 text-text-muted text-xs">
              All findings include line links and suggested patches.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] px-2 py-1 rounded-sm bg-accent-muted text-accent">
              Critical · 1
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] px-2 py-1 rounded-sm bg-warning/10 text-warning">
              Warning · 2
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] px-2 py-1 rounded-sm bg-surface-raised text-text-secondary">
              Info · 1
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
