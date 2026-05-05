"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Github } from "lucide-react"
import { cn } from "@/lib/utils"

const ROUTES = [
  { href: "/", label: "Product" },
  { href: "/example", label: "Examples" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/faq", label: "FAQ" },
] as const

export function SiteNav() {
  const pathname = usePathname()
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-canvas/60 border-b border-border">
      <div className="mx-auto max-w-7xl px-6 md:px-12 h-14 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <Image
            src="/sigil-logo.png"
            alt="Sigilix"
            width={28}
            height={28}
            className="logo-invert"
            priority
          />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-primary group-hover:text-gold transition-colors">
            Sigilix
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-[0.18em]">
          {ROUTES.map((r) => {
            const active = r.href === "/" ? pathname === "/" : pathname.startsWith(r.href)
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
                    className="absolute -bottom-[15px] left-0 right-0 h-[2px] bg-ink"
                  />
                )}
              </Link>
            )
          })}
        </nav>
        <a
          href="https://github.com/apps/sigilix"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] bg-ink text-white h-9 px-4 rounded-sm hover:bg-ink/90 transition-colors shrink-0"
          aria-label="Add Sigilix to a repository"
        >
          <Github className="w-3.5 h-3.5" />
          Add to Repo
        </a>
      </div>
    </header>
  )
}
