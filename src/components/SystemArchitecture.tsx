"use client"

import { motion, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { Layers, Shield, Zap, Type as TypeIcon, GitMerge } from "lucide-react"

const NODES = [
  { name: "Glyph", role: "Architecture", icon: Layers, x: 50, y: 8 },
  { name: "Warden", role: "Security", icon: Shield, x: 90, y: 38 },
  { name: "Pulse", role: "Performance", icon: Zap, x: 75, y: 88 },
  { name: "Weave", role: "Semantics", icon: TypeIcon, x: 25, y: 88 },
] as const

const CORE = { x: 50, y: 48 }
const EASE = [0.22, 1, 0.36, 1] as const

const COLLECT_NODES = [
  { x: 16, y: 14, label: "Diff hunks" },
  { x: 16, y: 38, label: "Surrounding files" },
  { x: 16, y: 62, label: "PR metadata" },
  { x: 16, y: 86, label: "Repo conventions" },
]

const PHASE_DURATION = 4000

export function SystemArchitecture() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    if (!inView) return
    const id = window.setInterval(() => setPhase((p) => (p + 1) % 3), PHASE_DURATION)
    return () => window.clearInterval(id)
  }, [inView])

  return (
    <div ref={ref} className="bg-surface-raised border border-border rounded-sm p-6 md:p-10">
      <div className="relative w-full aspect-[16/10] max-w-5xl mx-auto">
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
          aria-hidden
        >
          {/* Retrieval feeds → outer specialists (static dashed) */}
          {COLLECT_NODES.map((c, i) => (
            <motion.line
              key={`feed-${i}`}
              x1={c.x}
              y1={c.y}
              x2={NODES[i].x}
              y2={NODES[i].y}
              stroke="var(--color-text-muted)"
              strokeWidth={0.12}
              strokeDasharray="0.4 1.4"
              opacity={0.3}
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.08, ease: "easeInOut" }}
            />
          ))}

          {/* Specialists → Core (interactive, hover-aware) */}
          {NODES.map((n, i) => {
            const isHovered = hoveredId === n.name
            const anyHovered = hoveredId !== null
            return (
              <motion.line
                key={`core-${n.name}`}
                x1={n.x}
                y1={n.y}
                x2={CORE.x}
                y2={CORE.y}
                stroke="var(--color-accent)"
                strokeDasharray="0.6 1.6"
                initial={{ pathLength: 0 }}
                animate={
                  inView
                    ? {
                        pathLength: 1,
                        strokeWidth: isHovered ? 0.35 : anyHovered ? 0.12 : 0.18,
                        opacity: isHovered ? 1 : anyHovered ? 0.3 : 0.7,
                      }
                    : {}
                }
                transition={{
                  pathLength: { duration: 0.9, delay: 0.7 + i * 0.1, ease: "easeInOut" },
                  strokeWidth: { type: "spring", stiffness: 400, damping: 30 },
                  opacity: { type: "spring", stiffness: 400, damping: 30 },
                }}
              />
            )
          })}

          {/* Data-flow pulses: retrieval feed → specialist */}
          {inView &&
            COLLECT_NODES.map((c, i) => (
              <motion.circle
                key={`pulse-feed-${i}`}
                r={0.4}
                fill="#ffffff"
                fillOpacity={0.9}
                stroke="var(--color-accent)"
                strokeWidth={0.1}
                initial={{ cx: c.x, cy: c.y }}
                animate={{ cx: [c.x, NODES[i].x], cy: [c.y, NODES[i].y] }}
                transition={{
                  duration: 0.8,
                  delay: 1.4 + i * 0.5,
                  repeat: Infinity,
                  repeatDelay: 2.2,
                  ease: "easeInOut",
                }}
              />
            ))}

          {/* Data-flow pulses: specialist → Core */}
          {inView &&
            NODES.map((n, i) => (
              <motion.circle
                key={`pulse-core-${n.name}`}
                r={0.45}
                fill="var(--color-accent)"
                fillOpacity={1}
                initial={{ cx: n.x, cy: n.y }}
                animate={{ cx: [n.x, CORE.x], cy: [n.y, CORE.y] }}
                transition={{
                  duration: 1.0,
                  delay: 2.4 + i * 0.5,
                  repeat: Infinity,
                  repeatDelay: 2.0,
                  ease: "easeInOut",
                }}
              />
            ))}

          {/* Core breathing halo */}
          {inView && (
            <motion.circle
              cx={CORE.x}
              cy={CORE.y}
              r={6}
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth={0.2}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </svg>

        {/* Retrieval feed labels (HTML overlay) */}
        {COLLECT_NODES.map((c, i) => (
          <motion.div
            key={`r-${i}`}
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
            style={{ left: `${c.x}%`, top: `${c.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
          >
            <div className="bg-canvas border border-border rounded-sm px-3 py-1.5">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-secondary whitespace-nowrap">
                {c.label}
              </p>
            </div>
          </motion.div>
        ))}

        {/* Specialist nodes — HTML, hover-aware, with arrival pulse */}
        {NODES.map((n, i) => {
          const Icon = n.icon
          const isHovered = hoveredId === n.name
          const anyHovered = hoveredId !== null
          return (
            <motion.div
              key={n.name}
              onMouseEnter={() => setHoveredId(n.name)}
              onMouseLeave={() => setHoveredId(null)}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={
                inView
                  ? {
                      scale: 1,
                      opacity: anyHovered && !isHovered ? 0.4 : 1,
                    }
                  : {}
              }
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1, ease: EASE }}
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            >
              <div className="flex flex-col items-center gap-2">
                <motion.div
                  animate={
                    inView
                      ? {
                          borderColor: ["#2a2b30", "#FF4D6D", "#2a2b30"],
                          boxShadow: [
                            "0 0 0 0 rgba(198,35,74,0)",
                            "0 0 18px -4px rgba(255,77,109,0.6)",
                            "0 0 0 0 rgba(198,35,74,0)",
                          ],
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.5,
                    delay: 2.2 + i * 0.5,
                    repeat: Infinity,
                    repeatDelay: 2.5,
                    ease: "easeOut",
                  }}
                  className="w-14 h-14 flex items-center justify-center rounded-sm bg-canvas border border-border"
                >
                  <Icon className="w-5 h-5 text-text-primary" strokeWidth={1.5} />
                </motion.div>
                <div className="text-center">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-primary">
                    {n.name}
                  </p>
                  <p className="font-mono text-[10px] text-text-muted mt-0.5">{n.role}</p>
                </div>
              </div>
            </motion.div>
          )
        })}

        {/* Core node — HTML, with subtle breathing scale + glow */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={
            inView
              ? {
                  scale: [1, 1.02, 1],
                  opacity: 1,
                }
              : {}
          }
          transition={{
            opacity: { duration: 0.6, delay: 0.95, ease: EASE },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.6 },
          }}
          style={{ left: `${CORE.x}%`, top: `${CORE.y}%` }}
          className="absolute -translate-x-1/2 -translate-y-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <motion.div
              animate={
                inView
                  ? {
                      boxShadow: [
                        "0 0 32px -10px rgba(198,35,74,0.45)",
                        "0 0 60px -8px rgba(198,35,74,0.85)",
                        "0 0 32px -10px rgba(198,35,74,0.45)",
                      ],
                    }
                  : {}
              }
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.6 }}
              className="w-20 h-20 flex items-center justify-center rounded-sm bg-canvas border-2 border-accent"
            >
              <GitMerge className="w-7 h-7 text-accent" strokeWidth={1.5} />
            </motion.div>
            <div className="text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">Core</p>
              <p className="font-mono text-[10px] text-text-muted mt-0.5">Synthesizer</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
        <Phase index={0} active={phase} label="Retrieve" copy="Diff + repo context fetched at scoped read." />
        <Phase index={1} active={phase} label="Specialize" copy="Four domain models run in parallel." />
        <Phase index={2} active={phase} label="Synthesize" copy="Core resolves contradictions and ranks." />
      </div>
    </div>
  )
}

function Phase({
  index,
  active,
  label,
  copy,
}: {
  index: number
  active: number
  label: string
  copy: string
}) {
  const isActive = active === index
  return (
    <motion.div
      animate={{
        opacity: isActive ? 1 : 0.45,
        scale: isActive ? 1.02 : 1,
        borderColor: isActive ? "rgba(198,35,74,1)" : "rgba(42,43,48,1)",
      }}
      transition={{ duration: 0.5, ease: EASE }}
      className="border bg-canvas rounded-sm p-4"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-2">{label}</p>
      <p className="text-sm text-text-secondary leading-relaxed">{copy}</p>
    </motion.div>
  )
}
