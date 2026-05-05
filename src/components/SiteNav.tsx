"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavLink {
  href: string
  label: string
  badge?: string
}

const ROUTES: NavLink[] = [
  { href: "/", label: "Product" },
  { href: "/how-it-works", label: "How it Works" },
  { href: "/examples", label: "Examples" },
  { href: "/ide", label: "IDE", badge: "Soon" },
  { href: "https://docs.sigilix.ai", label: "Docs" },
  { href: "/pricing", label: "Pricing" },
]

export function SiteNav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [mobileOpen])

  const isActive = (link: NavLink) => {
    if (link.href === "/how-it-works") return pathname.startsWith("/how-it-works")
    if (link.href === "/examples") return pathname.startsWith("/examples")
    if (link.href === "/ide") return pathname.startsWith("/ide")
    if (link.href === "/pricing") return pathname.startsWith("/pricing")
    if (link.href.startsWith("https://docs.")) return false
    return pathname === "/"
  }

  return (
    <header
      className={cn(
        "fixed top-0 z-40 w-full backdrop-blur-md transition-all",
        scrolled
          ? "bg-canvas/95 shadow-[0_1px_0_0_rgba(255,255,255,0.05)]"
          : "bg-canvas/80 border-b border-border-subtle"
      )}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8 h-16 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <Image
            src="/sigil-logo.png"
            alt="Sigilix"
            width={28}
            height={28}
            className="logo-invert"
            priority
          />
          <span className="font-sans text-sm font-medium tracking-tight text-text-primary">
            Sigilix
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 font-sans text-sm">
          {ROUTES.map((r) => {
            const active = isActive(r)
            return (
              <Link
                key={r.href}
                href={r.href}
                className={cn(
                  "relative py-1 transition-colors inline-flex items-center gap-2",
                  active
                    ? "text-text-primary"
                    : "text-text-secondary hover:text-text-primary"
                )}
              >
                <span>{r.label}</span>
                {r.badge && (
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent border border-accent/40 px-1.5 py-0.5 rounded-sm">
                    {r.badge}
                  </span>
                )}
                {active && (
                  <span
                    aria-hidden
                    className="absolute -bottom-[18px] left-0 right-0 h-px bg-accent"
                  />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/signup"
            className="hidden sm:inline-flex items-center gap-2 bg-accent text-white text-sm font-medium px-4 py-2 rounded-sm hover:bg-accent-hover transition-colors shrink-0 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas focus-visible:outline-none"
          >
            Sign in
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-sm border border-border text-text-primary hover:bg-surface-raised transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas focus-visible:outline-none"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-panel"
          >
            {mobileOpen ? (
              <X className="w-4 h-4" strokeWidth={1.5} />
            ) : (
              <Menu className="w-4 h-4" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav-panel"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden border-t border-border-subtle bg-canvas/95 backdrop-blur-md"
          >
            <nav className="mx-auto max-w-7xl px-6 py-5 flex flex-col gap-1 font-sans text-base">
              {ROUTES.map((r) => {
                const active = isActive(r)
                return (
                  <Link
                    key={r.href}
                    href={r.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center justify-between py-3 px-3 rounded-sm transition-colors",
                      active
                        ? "text-text-primary bg-surface-raised"
                        : "text-text-secondary hover:text-text-primary hover:bg-surface-raised/60"
                    )}
                  >
                    <span>{r.label}</span>
                    {r.badge && (
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent border border-accent/40 px-1.5 py-0.5 rounded-sm">
                        {r.badge}
                      </span>
                    )}
                  </Link>
                )
              })}
              <Link
                href="/signup"
                onClick={() => setMobileOpen(false)}
                className="mt-3 inline-flex items-center justify-center bg-accent text-white text-sm font-medium px-4 py-3 rounded-sm hover:bg-accent-hover transition-colors"
              >
                Sign in
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
