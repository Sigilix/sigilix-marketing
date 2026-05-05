import type { Metadata } from "next"
import { FAQ } from "@/components/FAQ"
import { Github } from "lucide-react"

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Common questions about Sigilix — training, pricing, differentiation, supported platforms, self-hosting, language support.",
}

export default function FAQPage() {
  return (
    <>
      <section className="relative py-16 md:py-24 px-6 md:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-secondary mb-6">
            Questions
          </p>
          <h1 className="font-sans font-medium text-6xl md:text-9xl tracking-tight leading-[0.9] text-ink mb-8">
            FAQ
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Common objections from the engineers and security teams who'll evaluate Sigilix before a single PR is reviewed.
          </p>
        </div>
      </section>
      <FAQ />
      <section className="relative py-24 md:py-32 px-6 md:px-12 border-t border-border">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-sans font-medium text-3xl md:text-5xl tracking-tight leading-[0.95] text-text-primary mb-12">
            Still here?
          </h2>
          <a
            href="https://github.com/apps/sigilix"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-ink text-white h-12 px-6 rounded-sm font-mono text-xs uppercase tracking-[0.2em] hover:bg-ink/90 transition-colors"
          >
            <Github className="w-4 h-4" />
            Add Sigilix to your repo
          </a>
        </div>
      </section>
    </>
  )
}
