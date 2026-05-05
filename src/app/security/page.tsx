import { Metadata } from "next"
import { Check, X, Shield, KeyRound, Database, GitBranch } from "lucide-react"
import { DeepHero, CTABand, CrossLinkFooter, DeepSection } from "@/components/DeepShell"

export const metadata: Metadata = {
  title: "Security · Sigilix",
  description:
    "Zero-retention inference, scoped GitHub permissions, and an honest SOC 2 roadmap. Your code is ephemeral. Our architecture guarantees it.",
}

export default function SecurityPage() {
  return (
    <>
      <DeepHero
        kicker="Security"
        title={
          <>
            Your code is ephemeral. <span className="text-accent">Our architecture guarantees it.</span>
          </>
        }
        lead={
          <>
            Reviewing private code requires an explicit data-handling promise, not a paragraph in a
            terms-of-service PDF. Below is exactly what touches our servers, exactly how long it
            stays, and exactly which compliance work is real versus aspirational.
          </>
        }
      />

      <DeepSection
        number="01"
        kicker="Zero retention"
        title={
          <>
            No storage. <span className="text-accent">No training.</span> No exceptions.
          </>
        }
        intro={
          <>
            Every Sigilix review runs in an isolated compute container. Code is fetched via scoped
            GitHub tokens, held in memory only for the duration of the review, and discarded within
            60 seconds of completion. We do not train models on your code. We do not vectorize your
            repositories into a shared database. We do not retain logs containing file contents.
          </>
        }
      >
        <DataFlowDiagram />
      </DeepSection>

      <DeepSection
        number="02"
        kicker="Trust boundary"
        title={<>Where your data goes — and where it stops.</>}
        intro={
          <>
            We split data into three categories: what touches Sigilix, what touches upstream LLM
            providers, and what stays inside your GitHub. The third category is the largest by far.
          </>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full bg-surface-raised border border-border rounded-sm">
            <thead>
              <tr className="border-b border-border">
                <Th>Actor</Th>
                <Th>Data seen</Th>
                <Th>Retention</Th>
              </tr>
            </thead>
            <tbody className="font-sans text-sm">
              <Tr>
                <Td label>Sigilix worker</Td>
                <Td>Diff hunks, file context, PR metadata</Td>
                <Td>In memory only · purged ≤ 60s after review</Td>
              </Tr>
              <Tr>
                <Td label>Sigilix telemetry</Td>
                <Td>Aggregate counters: review count, latency, model errors</Td>
                <Td>90 days · no file content</Td>
              </Tr>
              <Tr>
                <Td label>LLM providers (DeepSeek, Kimi)</Td>
                <Td>Diff hunks + retrieval context for the active specialist</Td>
                <Td>Zero-retention via commercial inference contracts; never used for training</Td>
              </Tr>
              <Tr>
                <Td label>Your GitHub</Td>
                <Td>The full review (verdict, findings, suggested patches)</Td>
                <Td>Persistent — owned by you, auditable in the PR</Td>
              </Tr>
            </tbody>
          </table>
        </div>
      </DeepSection>

      <DeepSection
        number="03"
        kicker="Permissions"
        title={
          <>
            Least privilege. <span className="text-accent">No write scopes by default.</span>
          </>
        }
        intro={
          <>
            Sigilix asks for the minimum set of GitHub App scopes to read PRs and post review
            comments. Anything broader is opt-in and only granted to features you explicitly enable.
          </>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Scope ok={true} label="Read access to pull requests" why="To fetch the diff and post inline comments." />
          <Scope ok={true} label="Read access to repository contents" why="For limited retrieval of the surrounding files cited in a review." />
          <Scope ok={true} label="Read access to org members" why="So Core can attribute reviews to authors and respect org-level rules." />
          <Scope ok={true} label="Write access to pull request reviews" why="To post the verdict and inline findings as a single review." />
          <Scope ok={false} label="Write access to repository contents" why="We never write to your files. Not used; never requested." />
          <Scope ok={false} label="Admin: org" why="Never used. Sigilix has no need to modify org settings." />
          <Scope ok={false} label="Webhook creation" why="Sigilix runs as a GitHub App with delivery via the App webhook — no per-repo webhook creation." />
        </div>
      </DeepSection>

      <DeepSection
        number="04"
        kicker="Compliance"
        title={
          <>
            Honest status. <span className="text-accent">No badges we haven&apos;t earned.</span>
          </>
        }
        intro={
          <>
            We&apos;d rather tell you exactly where we are than buy a logo. Below is our compliance
            roadmap — what we&apos;ve completed, what is in progress, and what is intentionally
            postponed because we are too small to run it responsibly today.
          </>
        }
      >
        <ol className="space-y-4">
          <Milestone status="done" label="Security architecture review" detail="Internal review by an external advisor. Hardened secret handling, ephemeral inference, and request-level isolation." />
          <Milestone status="active" label="SOC 2 Type II" detail="In progress with a Big-Four-adjacent firm. Target audit window: Q4 2026. Bridge letter available on request." />
          <Milestone status="active" label="Annual penetration test" detail="Scoped to the Sigilix worker, GitHub App, and dashboard. Engagement booked for Q3 2026." />
          <Milestone status="planned" label="Bug bounty program" detail="Postponed until post Series-A. We won&apos;t run a bounty we can&apos;t triage in 24h. Email security@arcanchor.com for responsible disclosure today." />
          <Milestone status="planned" label="HIPAA / FedRAMP / SOC 2 Type II refresh" detail="Driven by enterprise customer requirements. We pursue certifications when a paying customer needs them, not before." />
        </ol>
      </DeepSection>

      <CTABand
        title={
          <>
            Read the architecture. <span className="text-accent">Then read the proof.</span>
          </>
        }
        body="Sigilix is built on the assumption that customers should never have to take security claims on faith."
        primary={{ label: "See the architecture", href: "/how-it-works" }}
        secondary={{ label: "Start reviewing", href: "/signup" }}
      />

      <CrossLinkFooter
        prev={{ label: "Benchmarks", href: "/benchmarks" }}
        next={{ label: "Sign up", href: "/signup" }}
        lastUpdated="2026-05-04"
      />
    </>
  )
}

function DataFlowDiagram() {
  const stages = [
    { icon: GitBranch, label: "GitHub PR", ttl: "Source of truth" },
    { icon: KeyRound, label: "Sigilix API", ttl: "TLS termination" },
    { icon: Shield, label: "Review worker", ttl: "Memory only · ≤ 60s" },
    { icon: Database, label: "LLM provider", ttl: "Zero retention" },
    { icon: X, label: "/dev/null", ttl: "Discarded" },
  ]
  return (
    <div className="bg-surface-raised border border-border rounded-sm p-6 md:p-10 overflow-x-auto">
      <ol className="flex items-stretch gap-3 md:gap-5 min-w-fit">
        {stages.map((s, i) => {
          const Icon = s.icon
          return (
            <li key={i} className="flex items-center gap-3 md:gap-5 min-w-fit">
              <div className="flex flex-col items-center text-center min-w-[120px]">
                <div className="w-12 h-12 flex items-center justify-center rounded-sm bg-canvas border border-border mb-3">
                  <Icon className="w-5 h-5 text-text-primary" strokeWidth={1.5} />
                </div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-primary mb-1">
                  {s.label}
                </p>
                <p className="font-mono text-[10px] text-text-muted">{s.ttl}</p>
              </div>
              {i < stages.length - 1 && (
                <span className="font-mono text-text-muted text-sm self-center">→</span>
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="text-left font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted px-5 py-3">
      {children}
    </th>
  )
}
function Tr({ children }: { children: React.ReactNode }) {
  return <tr className="border-b border-border-subtle last:border-b-0">{children}</tr>
}
function Td({ children, label = false }: { children: React.ReactNode; label?: boolean }) {
  return (
    <td
      className={`px-5 py-4 align-top ${
        label ? "text-text-primary font-medium" : "text-text-secondary"
      }`}
    >
      {children}
    </td>
  )
}

function Scope({ ok, label, why }: { ok: boolean; label: string; why: string }) {
  return (
    <div
      className={`bg-surface-raised border rounded-sm p-5 flex gap-4 ${
        ok ? "border-border" : "border-border opacity-80"
      }`}
    >
      <div
        className={`w-8 h-8 shrink-0 rounded-sm flex items-center justify-center ${
          ok ? "bg-success/10 text-success" : "bg-accent-muted text-accent"
        }`}
      >
        {ok ? <Check className="w-4 h-4" strokeWidth={2} /> : <X className="w-4 h-4" strokeWidth={2} />}
      </div>
      <div>
        <p className="font-sans font-medium text-text-primary text-sm mb-1">{label}</p>
        <p className="text-text-secondary text-sm leading-relaxed">{why}</p>
      </div>
    </div>
  )
}

function Milestone({
  status,
  label,
  detail,
}: {
  status: "done" | "active" | "planned"
  label: string
  detail: string
}) {
  const ring =
    status === "done"
      ? "border-success bg-success/10 text-success"
      : status === "active"
      ? "border-accent bg-accent-muted text-accent"
      : "border-border bg-surface-raised text-text-muted"
  const tag =
    status === "done"
      ? "Completed"
      : status === "active"
      ? "In progress"
      : "Planned"
  return (
    <li className="flex gap-5 items-start">
      <div className={`mt-1 w-3 h-3 rounded-full border-2 ${ring} shrink-0`} aria-hidden />
      <div className="flex-1">
        <div className="flex flex-wrap items-baseline gap-3 mb-1">
          <span className="font-sans font-medium text-text-primary">{label}</span>
          <span
            className={`font-mono text-[10px] uppercase tracking-[0.2em] px-2 py-0.5 rounded-sm ${ring} border-current`}
          >
            {tag}
          </span>
        </div>
        <p className="text-text-secondary leading-relaxed">{detail}</p>
      </div>
    </li>
  )
}
