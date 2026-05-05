import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Sigilix Documentation",
  description:
    "Install the Sigilix GitHub App, configure your first repository, and learn how the ensemble decides what to flag.",
}

interface Section {
  title: string
  pages: { label: string; sub: string }[]
}

const SECTIONS: Section[] = [
  {
    title: "Getting Started",
    pages: [
      {
        label: "Quickstart",
        sub: "Install the GitHub App → first PR review in under two minutes.",
      },
      {
        label: "Installation",
        sub: "Org-level vs repo-level permissions, required OAuth scopes.",
      },
      {
        label: "Configuration",
        sub: "The sigilix.yaml file, repo-level settings, and environment variables.",
      },
    ],
  },
  {
    title: "How It Works",
    pages: [
      {
        label: "The Ensemble",
        sub: "Deep dive: Glyph, Warden, Spark, Weave, Core. How they differ and how they communicate.",
      },
      {
        label: "Review Lifecycle",
        sub: "Trigger conditions, pipeline stages, failure modes.",
      },
      {
        label: "Confidence Scoring",
        sub: "How Core ranks, suppresses, and deduplicates findings.",
      },
    ],
  },
  {
    title: "Configuration",
    pages: [
      {
        label: "sigilix.yaml",
        sub: "Full schema: comment style, specialists.enabled, ignore.paths, thresholds.",
      },
      {
        label: "Ignore Patterns",
        sub: "Glob rules, generated files, dependency lockfiles.",
      },
      {
        label: "Custom Rules",
        sub: "Injecting team-specific heuristics and naming conventions.",
      },
      {
        label: "Rate Limits",
        sub: "How the 5-hour window works, burst behavior, header tracking.",
      },
    ],
  },
  {
    title: "Integrations",
    pages: [
      {
        label: "GitHub",
        sub: "Checks API, required status, app permissions, private repos.",
      },
      {
        label: "GitLab",
        sub: "Roadmap setup, webhook configuration (beta).",
      },
      {
        label: "Bitbucket",
        sub: "Pipeline step and PR comment formatting (roadmap).",
      },
      {
        label: "CI/CD Webhooks",
        sub: "Triggering reviews from external CI events.",
      },
    ],
  },
  {
    title: "API",
    pages: [
      {
        label: "Authentication",
        sub: "OAuth2 flow and PAT generation.",
      },
      {
        label: "Endpoints",
        sub: "POST /v1/review, GET /v1/findings, rate headers.",
      },
      {
        label: "Webhooks",
        sub: "Event payloads for finding.created, review.completed.",
      },
    ],
  },
  {
    title: "Troubleshooting",
    pages: [
      {
        label: "Common Errors",
        sub: "401/403 causes, missing checks, large diff timeouts.",
      },
      {
        label: "Billing",
        sub: "Usage tracking, plan changes, invoicing.",
      },
    ],
  },
]

export default function DocsPage() {
  return (
    <>
      <section className="relative pt-24 md:pt-32 pb-16 px-6 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-secondary mb-6">
            Documentation
          </p>
          <h1 className="font-sans font-medium text-5xl md:text-7xl tracking-tight leading-[0.98] text-text-primary mb-8 max-w-3xl">
            Install. Configure. <span className="text-accent">Ship.</span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed">
            Install the GitHub App, configure your first repository, and learn how the ensemble decides what to flag.
          </p>
        </div>
      </section>

      <section className="relative pb-32 px-6 md:px-8">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-6 pb-3 border-b border-border-subtle">
                {section.title}
              </h2>
              <ul className="space-y-5">
                {section.pages.map((p) => (
                  <li key={p.label} className="group">
                    <Link
                      href="#"
                      className="flex items-start gap-3 hover:text-accent transition-colors"
                    >
                      <ArrowRight className="w-4 h-4 mt-1 shrink-0 text-text-muted group-hover:text-accent transition-colors" />
                      <div>
                        <p className="font-sans text-base text-text-primary group-hover:text-accent transition-colors mb-1">
                          {p.label}
                        </p>
                        <p className="font-sans text-sm text-text-secondary leading-relaxed">
                          {p.sub}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
