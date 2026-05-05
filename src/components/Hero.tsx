"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Github, ArrowRight } from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  return (
    <section className="relative isolate flex flex-col justify-center min-h-[88vh] overflow-hidden px-6 md:px-12">
      {/* Slow-rotating logo watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.05]"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="relative w-[120vh] h-[120vh] max-w-none"
        >
          <Image
            src="/sigil-logo.png"
            alt=""
            fill
            className="logo-invert object-contain"
            sizes="120vh"
            priority
          />
        </motion.div>
      </div>

      {/* Wax-glow blob */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full"
        style={{
          background: "radial-gradient(circle, color-mix(in srgb, var(--color-ink) 30%, transparent) 0%, transparent 70%)",
          filter: "blur(128px)",
          opacity: 0.5,
        }}
      />

      <div className="mx-auto max-w-4xl w-full relative z-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="font-mono text-xs uppercase tracking-[0.3em] text-text-secondary mb-8"
        >
          The Ensemble · Multi-Agent Code Review
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
          className="font-sans font-medium text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-text-primary"
        >
          The mark of
          <br />
          <span className="text-ink">merge-ready</span> code.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.25 }}
          className="mt-8 mx-auto max-w-2xl text-lg md:text-xl leading-relaxed text-text-secondary"
        >
          Four AI specialists review every pull request in parallel. A synthesizer deduplicates noise. You get one definitive seal of approval — not another chatbot guessing at your diff.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.4 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="https://github.com/apps/sigilix"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Install Sigilix on GitHub, opens in new tab"
            className="inline-flex items-center gap-2 bg-ink text-white h-12 px-6 rounded-sm font-mono text-xs uppercase tracking-[0.2em] hover:bg-ink/90 transition-all hover:shadow-[0_0_30px_-5px_color-mix(in_srgb,var(--color-ink)_60%,transparent)] focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-canvas focus-visible:outline-none"
          >
            <Github className="w-4 h-4" />
            Install on GitHub
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 text-text-primary h-12 px-6 rounded-sm font-mono text-xs uppercase tracking-[0.2em] border border-border hover:border-gold hover:text-gold transition-colors"
          >
            How it works
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
