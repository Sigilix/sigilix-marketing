import Link from "next/link"

export function Footer() {
  return (
    <footer className="relative border-t border-border py-12 md:py-16 px-6 md:px-8">
      <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-sans text-sm font-medium tracking-tight text-text-primary">
              Sigilix
            </span>
          </div>
          <p className="font-sans text-xs text-text-muted leading-relaxed max-w-xs">
            A mark of merge-ready code. Built by{" "}
            <a
              href="https://arcandanchor.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              Arc &amp; Anchor
            </a>
            .
          </p>
        </div>

        <FooterCol
          title="Product"
          links={[
            { label: "How it Works", href: "/how-it-works" },
            { label: "Examples", href: "/examples" },
            { label: "IDE", href: "/ide" },
            { label: "Pricing", href: "/pricing" },
          ]}
        />

        <FooterCol
          title="Resources"
          links={[
            {
              label: "Docs",
              href: "https://docs.sigilix.ai",
              external: true,
            },
            { label: "Security", href: "/security" },
            { label: "Benchmarks", href: "/benchmarks" },
            { label: "Status", href: "/status" },
            {
              label: "GitHub",
              href: "https://github.com/Arc-and-Anchor",
              external: true,
            },
          ]}
        />

        <FooterCol
          title="Legal"
          links={[
            { label: "Privacy", href: "/privacy" },
            { label: "Terms", href: "/terms" },
          ]}
        />
      </div>

      <div className="mx-auto max-w-7xl pt-8 border-t border-border-subtle">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted">
          © {new Date().getFullYear()} Sigilix · A mark of Arc &amp; Anchor
        </p>
      </div>
    </footer>
  )
}

function FooterCol({
  title,
  links,
}: {
  title: string
  links: { label: string; href: string; external?: boolean }[]
}) {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted mb-4">
        {title}
      </p>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            {l.external ? (
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                {l.label}
              </a>
            ) : (
              <Link
                href={l.href}
                className="font-sans text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                {l.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
