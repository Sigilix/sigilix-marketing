"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Layers, Shield, Zap, Type as TypeIcon, GitMerge } from "lucide-react"

const NODES = [
  { name: "Glyph", role: "Architecture", icon: Layers, x: 50, y: 8 },
  { name: "Warden", role: "Security", icon: Shield, x: 90, y: 38 },
  { name: "Pulse", role: "Performance", icon: Zap, x: 75, y: 88 },
  { name: "Weave", role: "Semantics", icon: TypeIcon, x: 25, y: 88 },
  { name: "Core", role: "Synthesizer", icon: GitMerge, x: 10, y: 38 },
] as const

// "Core" is the center node visually, even though we list it last. We
// position it at center separately and draw edges from the four outers
// into it.
const CORE = { x: 50, y: 48 }

export function EnsembleExplainer() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      id="ensemble"
      className="relative py-24 md:py-32 px-6 md:px-8 border-t border-border-subtle"
    >
      <div ref={ref} className="mx-auto max-w-7xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-secondary mb-4">
          The Ensemble
        </p>
        <h2 className="font-sans font-medium text-4xl md:text-6xl tracking-tight leading-[0.98] text-text-primary mb-6 max-w-4xl">
          Five minds. <span className="text-accent">One verdict.</span>
        </h2>
        <p className="text-lg text-text-secondary max-w-2xl mb-16 leading-relaxed">
          Most &quot;AI reviews&quot; run a single generalist model and hope for the best. Sigilix deploys four domain specialists and a synthesizer that cross-checks their output. The result is depth without noise — a single, authoritative comment that catches what others miss.
        </p>

        {/* Node diagram */}
        <div className="relative w-full aspect-[4/3] md:aspect-[16/10] max-w-4xl mx-auto">
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
            aria-hidden
          >
            {/* Connection lines from outer nodes to Core (skip Core itself) */}
            {NODES.filter((n) => n.name !== "Core").map((n, i) => (
              <motion.line
                key={n.name}
                x1={n.x}
                y1={n.y}
                x2={CORE.x}
                y2={CORE.y}
                stroke="var(--color-accent)"
                strokeWidth="0.15"
                strokeDasharray="0.5 1.5"
                opacity={0.6}
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{
                  duration: 0.9,
                  delay: 0.6 + i * 0.1,
                  ease: "easeInOut",
                }}
              />
            ))}
          </svg>

          {NODES.map((n, i) => {
            const Icon = n.icon
            const isCore = n.name === "Core"
            const pos = isCore ? CORE : n
            return (
              <motion.div
                key={n.name}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{
                  duration: 0.5,
                  delay: i * 0.12,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
              >
                <div
                  className={`flex flex-col items-center gap-3 ${
                    isCore ? "scale-110" : ""
                  }`}
                >
                  <div
                    className={`flex items-center justify-center rounded-sm bg-surface-raised ${
                      isCore
                        ? "w-20 h-20 border-2 border-accent shadow-[0_0_40px_-8px_var(--color-accent-glow)]"
                        : "w-16 h-16 border border-border"
                    }`}
                  >
                    <Icon
                      className={`${
                        isCore ? "w-7 h-7 text-accent" : "w-6 h-6 text-text-primary"
                      }`}
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="text-center">
                    <p
                      className={`font-mono text-[10px] uppercase tracking-[0.2em] ${
                        isCore ? "text-accent" : "text-text-primary"
                      }`}
                    >
                      {n.name}
                    </p>
                    <p className="font-mono text-[10px] text-text-muted mt-0.5">
                      {n.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
