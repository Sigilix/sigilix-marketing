import Image from "next/image"
import { Github, Mail, ExternalLink } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative border-t border-border py-16 md:py-20 px-6 md:px-12 bg-surface/30">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-start md:items-end justify-between gap-12">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Image
              src="/sigil-logo.png"
              alt="Sigilix"
              width={36}
              height={36}
              className="logo-invert"
            />
            <span className="font-mono text-sm uppercase tracking-[0.2em] text-text-primary">
              Sigilix
            </span>
          </div>
          <p className="font-mono text-xs text-text-secondary tracking-[0.05em] max-w-md leading-relaxed">
            The mark of merge-ready code. A product of{" "}
            <a
              href="https://arcandanchor.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-primary hover:text-gold transition-colors"
            >
              Arc &amp; Anchor
            </a>
            .
          </p>
        </div>

        <nav className="flex flex-col gap-3 font-mono text-xs uppercase tracking-[0.2em] text-text-secondary">
          <a
            href="https://github.com/Arc-and-Anchor/sigilix"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:text-text-primary transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            Source
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://github.com/apps/sigilix"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:text-text-primary transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            GitHub App
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="mailto:hello@sigilix.ai"
            className="inline-flex items-center gap-2 hover:text-text-primary transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            hello@sigilix.ai
          </a>
        </nav>
      </div>

      <div className="mx-auto max-w-7xl mt-12 pt-8 border-t border-border">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-secondary">
          © {new Date().getFullYear()} Arc &amp; Anchor · All rights reserved
        </p>
      </div>
    </footer>
  )
}
