import type { Metadata } from "next"
import { CheckCircle2 } from "lucide-react"
import { DeepHero, CrossLinkFooter, DeepSection } from "@/components/DeepShell"

export const metadata: Metadata = {
  title: "Status · Sigilix",
  description:
    "Live status of the Sigilix service: review worker, GitHub App, model providers, and dashboard.",
}

const COMPONENTS = [
  {
    name: "Sigilix worker (review pipeline)",
    description: "The Cloudflare Worker that orchestrates specialist runs and synthesis.",
  },
  {
    name: "GitHub App",
    description: "Webhook delivery, OAuth, and review posting.",
  },
  {
    name: "Model providers",
    description: "DeepSeek and Kimi inference endpoints.",
  },
  {
    name: "Marketing site",
    description: "sigilix.ai static pages and forms.",
  },
  {
    name: "Docs",
    description: "docs.sigilix.ai documentation portal.",
  },
] as const

export default function StatusPage() {
  return (
    <>
      <DeepHero
        kicker="Status"
        title={
          <>
            All systems <span className="text-accent">operational.</span>
          </>
        }
        lead={
          <>
            Live status of the Sigilix service. We&apos;re in early-access; this page is updated
            manually until our automated probes are wired in. Subscribe to incidents at the
            address at the bottom.
          </>
        }
      />

      <DeepSection number="01" kicker="Components" title={<>Service components.</>}>
        <div className="space-y-3 max-w-3xl">
          {COMPONENTS.map((c) => (
            <div
              key={c.name}
              className="bg-surface-raised border border-border rounded-sm p-5 flex items-start gap-4"
            >
              <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" strokeWidth={1.5} />
              <div className="flex-1">
                <p className="font-sans font-medium text-text-primary mb-1">{c.name}</p>
                <p className="text-sm text-text-secondary leading-relaxed">{c.description}</p>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-success border border-success/40 px-2 py-0.5 rounded-sm shrink-0">
                Operational
              </span>
            </div>
          ))}
        </div>
      </DeepSection>

      <DeepSection number="02" kicker="Incident history" title={<>No incidents to report.</>}>
        <div className="bg-surface-raised border border-border rounded-sm p-6 max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted mb-3">
            Trailing 90 days
          </p>
          <p className="text-text-secondary leading-relaxed">
            No customer-impacting incidents on record. We will document any future incident here
            with a root-cause summary, the resolution timeline, and the mitigations we ship to
            prevent recurrence.
          </p>
        </div>
      </DeepSection>

      <DeepSection number="03" kicker="Subscribe" title={<>Get notified.</>}>
        <p className="text-text-secondary leading-relaxed max-w-3xl">
          Email{" "}
          <a
            href="mailto:status@sigilix.ai?subject=Subscribe%20to%20Sigilix%20incident%20updates"
            className="text-text-primary hover:text-accent transition-colors underline-offset-4 hover:underline"
          >
            status@sigilix.ai
          </a>{" "}
          to subscribe to incident notifications. We will only email you when there is a real
          customer-impacting event — not for routine maintenance announcements.
        </p>
      </DeepSection>

      <DeepSection number="04" kicker="Maintenance" title={<>Scheduled work.</>}>
        <p className="text-text-secondary leading-relaxed max-w-3xl">
          None scheduled. Sigilix deploys continuously to the worker; deploys are atomic and do
          not require maintenance windows. The marketing site and docs deploy independently and
          do not affect review traffic.
        </p>
      </DeepSection>

      <CrossLinkFooter
        prev={{ label: "Terms", href: "/terms" }}
        next={{ label: "Privacy", href: "/privacy" }}
        lastUpdated="2026-05-05"
      />
    </>
  )
}
