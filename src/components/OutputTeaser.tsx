import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ReviewBlock, type Finding } from "./ReviewBlock"

const TEASER_FINDINGS: Finding[] = [
  {
    specialist: "Logic",
    line: "src/lib/cart.ts:84",
    headline: "off-by-one in `applyDiscount()` on the last item",
    body:
      "When `items.length === 1`, the loop boundary `i < items.length - 1` skips the only item entirely. Use `i < items.length`.",
  },
  {
    specialist: "Security",
    line: "src/api/checkout.ts:142",
    headline: "missing CSRF verification on POST /checkout",
    body:
      "The route accepts JSON without a CSRF token. Add `requireCsrf()` middleware or scope to the same-origin fetch.",
  },
]

export function OutputTeaser() {
  return (
    <section className="relative py-24 md:py-32 px-6 md:px-12 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-secondary mb-4">
          The Output
        </p>
        <h2 className="font-sans font-medium text-4xl md:text-6xl tracking-tight leading-[0.95] text-text-primary mb-12 max-w-3xl">
          One review.
          <br />
          <span className="text-ink">Sealed and signed.</span>
        </h2>
        <ReviewBlock
          summary="Two blocking findings — one logic bug, one security gap. Both have a clean fix in the same diff. The remaining files in the PR look clean."
          findings={TEASER_FINDINGS}
          staticExpanded
        />
        <div className="mt-12 flex justify-center">
          <Link
            href="/example"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-text-primary border border-border rounded-sm h-12 px-6 hover:border-ink hover:text-ink transition-colors"
          >
            Explore more examples
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
