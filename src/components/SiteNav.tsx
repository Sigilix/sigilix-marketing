import Image from "next/image"
import Link from "next/link"
import { Github } from "lucide-react"

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-canvas/60 border-b border-border">
      <div className="mx-auto max-w-7xl px-6 md:px-12 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
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
        <nav className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-[0.18em] text-text-secondary">
          <a href="#how-it-works" className="hover:text-text-primary transition-colors">How it works</a>
          <a href="#compare" className="hover:text-text-primary transition-colors">Compare</a>
          <a href="#review" className="hover:text-text-primary transition-colors">Review</a>
          <a href="#faq" className="hover:text-text-primary transition-colors">FAQ</a>
        </nav>
        <a
          href="https://github.com/apps/sigilix"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] bg-ink text-white h-9 px-4 rounded-sm hover:bg-ink/90 transition-colors"
          aria-label="Install Sigilix on GitHub"
        >
          <Github className="w-3.5 h-3.5" />
          Install
        </a>
      </div>
    </header>
  )
}
