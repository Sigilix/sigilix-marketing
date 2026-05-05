import Link from "next/link"
import { ArrowRight, GitPullRequest } from "lucide-react"
import { ReviewBlock, type Finding } from "./ReviewBlock"

interface MockReview {
  /** Tag shown above the review (e.g., "Security finding"). */
  category: string
  /** Mock PR title displayed above the review chrome. */
  prTitle: string
  /** Synthesizer summary prose. */
  summary: string
  /** "Request changes" / "Approved" badge text. */
  verdict: string
  findings: Finding[]
}

const REVIEWS: MockReview[] = [
  {
    category: "Security · Auth",
    prTitle: "feat(checkout): add guest-flow without account creation",
    summary:
      "Two blocking concerns: a missing CSRF check on the new POST /checkout route, and a session token leaked into the response body. Both are tractable in the same diff. The new logic itself is sound — the gap is at the request boundary, not in the cart-arithmetic.",
    verdict: "Request changes",
    findings: [
      {
        specialist: "Security",
        line: "src/api/checkout.ts:142",
        headline: "missing CSRF verification on POST /checkout",
        body:
          "The route accepts JSON without a CSRF token. The existing requireCsrf() middleware in src/middleware/auth.ts should wrap this handler the same way it wraps POST /cart. Without it, a third-party site can POST a checkout on the user's behalf if they have an active session.",
      },
      {
        specialist: "Security",
        line: "src/api/checkout.ts:171",
        headline: "session token returned in the JSON response body",
        body:
          "`response.json({ ...checkout, session })` includes the full session object. Anything in the response body is logged by tracing/error reporters; restrict to the order id and confirmation token. Match the shape used in src/api/orders.ts:88.",
      },
      {
        specialist: "Tests",
        line: "tests/api/checkout.test.ts",
        headline: "no test exercises the rejected-CSRF path",
        body:
          "Once CSRF is required, add a test that POSTs without a token and asserts a 403. The existing happy-path tests will pass either way and silently mask a regression that drops the middleware.",
      },
    ],
  },
  {
    category: "Performance · Hot path",
    prTitle: "refactor(search): inline the document scoring loop",
    summary:
      "The refactor removes a function call but introduces a hidden O(n²) inside the scoring path. On the largest production index (~120K docs) this regresses median search latency from 38ms to ~1.4s. Suggested fix preserves the inlining you wanted while keeping linearity.",
    verdict: "Request changes",
    findings: [
      {
        specialist: "Performance",
        line: "src/search/score.ts:56",
        headline: "O(n²) — `freq` Map rebuilt on every iteration",
        body:
          "The new inline version constructs `tokenFreq` inside the per-document loop. For N docs and T tokens per doc, that's O(N·T) construction work that the previous version amortized via a memoized table. Hoist the freq Map to before the loop and pass it in.",
      },
      {
        specialist: "Logic",
        line: "src/search/score.ts:71",
        headline: "tie-break ordering inverted vs. previous behavior",
        body:
          "When two docs return the same BM25 score the previous code preferred the more-recently-modified doc; the new sort uses `a.id - b.id` which is creation order. Existing snapshot tests will catch the surface output but consumer-facing search relevance silently changes.",
      },
    ],
  },
  {
    category: "API contract · Versioning",
    prTitle: "feat(api): add cursor-based pagination to /v2/search",
    summary:
      "The new cursor pagination is implemented cleanly but breaks two consumers that depend on the v2 contract documented in docs/api/v2-search.md. Either gate behind /v3 or extend v2 with an optional cursor field that defaults to the legacy offset behavior.",
    verdict: "Request changes",
    findings: [
      {
        specialist: "Logic",
        line: "src/api/v2/search.ts:34",
        headline: "removing `offset` field is a breaking change to v2",
        body:
          "Two internal services (recommendations, alerts) and the published OpenAPI spec at docs/api/v2-search.md document `offset` as required. Removing it without a major-version bump violates the contract. Suggest: keep `offset` working when `cursor` is absent; promote cursor-only behavior to /v3.",
      },
      {
        specialist: "Tests",
        line: "tests/api/v2/search.test.ts",
        headline: "no test covers the legacy offset path post-refactor",
        body:
          "The existing offset-based tests were deleted in this diff. If the suggested back-compat is added, those tests need to be restored to lock in the behavior.",
      },
    ],
  },
]

export function ExampleHero() {
  const featured = REVIEWS[0]!
  return (
    <section className="relative py-16 md:py-24 px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-secondary mb-4">
          Examples · Real review shapes
        </p>
        <h1 className="font-sans font-medium text-5xl md:text-7xl tracking-tight leading-[0.95] text-text-primary mb-6 max-w-4xl">
          What a Sigilix review
          <br />
          <span className="text-ink">actually looks like.</span>
        </h1>
        <p className="text-lg md:text-xl text-text-secondary max-w-2xl mb-12 leading-relaxed">
          Three illustrative reviews across different specialist domains — security, performance, API contract. Every finding anchors to a specific line. The synthesizer summary leads. No 40-comment dump.
        </p>

        {/* Featured PR chrome */}
        <div className="bg-surface border border-border rounded-sm overflow-hidden">
          <div className="flex items-center gap-3 px-6 py-3 border-b border-border bg-canvas">
            <GitPullRequest className="w-4 h-4 text-ink" />
            <p className="font-mono text-xs text-text-primary truncate">
              {featured.prTitle}
            </p>
            <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.2em] text-text-secondary">
              {featured.category}
            </span>
          </div>
          <div className="p-6 md:p-10">
            <ReviewBlock
              summary={featured.summary}
              findings={featured.findings}
              verdict={featured.verdict}
              staticExpanded
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export function ExampleGallery() {
  const rest = REVIEWS.slice(1)
  return (
    <section className="relative py-16 md:py-24 px-6 md:px-12 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-secondary mb-4">
          More patterns
        </p>
        <h2 className="font-sans font-medium text-3xl md:text-5xl tracking-tight leading-[0.95] text-text-primary mb-12 max-w-3xl">
          Different specialists, different blind spots.
        </h2>
        <div className="space-y-16">
          {rest.map((review, i) => (
            <div key={i} className="bg-surface border border-border rounded-sm overflow-hidden">
              <div className="flex items-center gap-3 px-6 py-3 border-b border-border bg-canvas">
                <GitPullRequest className="w-4 h-4 text-ink" />
                <p className="font-mono text-xs text-text-primary truncate">
                  {review.prTitle}
                </p>
                <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.2em] text-text-secondary">
                  {review.category}
                </span>
              </div>
              <div className="p-6 md:p-10">
                <ReviewBlock
                  summary={review.summary}
                  findings={review.findings}
                  verdict={review.verdict}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ExampleSignal() {
  return (
    <section className="relative py-24 md:py-32 px-6 md:px-12 border-t border-border">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-secondary mb-4">
          From noise to signal
        </p>
        <h2 className="font-sans font-medium text-3xl md:text-5xl tracking-tight leading-[0.95] text-text-primary mb-6">
          Every review above came from <span className="text-ink">four specialists</span>, then synthesized.
        </h2>
        <p className="text-lg text-text-secondary leading-relaxed mb-12">
          The findings you see are what survived deduplication and severity calibration. Each one traces to a specific specialist's reasoning — the synthesizer kept the signal and dropped the rest.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://github.com/apps/sigilix"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-ink text-white h-12 px-6 rounded-sm font-mono text-xs uppercase tracking-[0.2em] hover:bg-ink/90 transition-colors"
          >
            Install Sigilix
          </a>
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-2 text-text-primary h-12 px-6 rounded-sm font-mono text-xs uppercase tracking-[0.2em] border border-border hover:border-ink hover:text-ink transition-colors"
          >
            How it works
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
