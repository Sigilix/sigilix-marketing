"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface NavLink {
  href: string
  label: string
  /** When `internalAnchor` is set, on `/` we smooth-scroll to it; on
   *  any other route we navigate to `/${internalAnchor}` so the anchor
   *  fires after the page mounts. */
  internalAnchor?: string
}

const ROUTES: NavLink[] = [
  { href: "/#ensemble", label: "Product", internalAnchor: "#ensemble" },
  { href: "/ide", label: "IDE" },
  { href: "/docs", label: "Docs" },
  { href: "/signup#plans", label: "Pricing" },
]

export function SiteNav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const isActive = (link: NavLink) => {
    if (link.href === "/ide") return pathname.startsWith("/ide")
    if (link.href === "/docs") return pathname.startsWith("/docs")
    if (link.href.startsWith("/signup")) return pathname.startsWith("/signup")
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
                  "relative py-1 transition-colors",
                  active
                    ? "text-text-primary"
                    : "text-text-secondary hover:text-text-primary"
                )}
              >
                {r.label}
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

        <Link
          href="/signup"
          className="inline-flex items-center gap-2 bg-accent text-white text-sm font-medium px-4 py-2 rounded-sm hover:bg-accent-hover transition-colors shrink-0 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas focus-visible:outline-none"
        >
          Sign in
        </Link>
      </div>
    </header>
  )
}
