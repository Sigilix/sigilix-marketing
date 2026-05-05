import { Metadata } from "next"
import Link from "next/link"
import { DeepHero, CTABand, CrossLinkFooter, DeepSection } from "@/components/DeepShell"
import { CountUp } from "@/components/CountUp"

export const metadata: Metadata = {
  title: "Benchmarks · Sigilix",
  description:
    "How we measure review quality, the datasets we evaluate against, and our commitment to publishing third-party-audited results by Q3 2026.",
}

export default function BenchmarksPage() {
  return (
    <>
      <DeepHero
        kicker="Benchmarks"
        title={
          <>
            Benchmarks <span className="text-accent">worth trusting.</span>
          </>
        }
        lead={
          <>
            We will not show you a 97% accuracy banner with an asterisk. Real benchmarks take time.
            While we run our evaluation pipeline against open-source repositories and private
            shadow-mode telemetry, here is exactly what we measure, how we measure it, and when we
            will publish.
          </>
        }
      />

      <DeepSection
        number="01"
        kicker="Dataset"
        title={<>What we test against.</>}
        intro={
          <>
            Our evaluation uses three data sources. First, a stratified sample of 50 high-velocity
            open-source repositories (multi-language, &gt;1000 commits, active issue trackers).
            Second, synthetic vulnerability injection using OWASP-style test cases where ground
            truth is known. Third, historical bug-fix commits — we know the bug was real because it
            was later patched and linked to a CVE or issue.
          </>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DataCard headline="50" subhead="Repositories" body={<>Multi-language, &gt;1000 commits, active maintainers.</>} />
          <DataCard headline="OWASP" subhead="Synthetic injection" body={<>Known-truth vulnerabilities planted into test PRs.</>} />
          <DataCard headline="Known-bug" subhead="Historical commits" body={<>Patched bugs from real CVEs and issue trackers.</>} />
        </div>
      </DeepSection>

      <DeepSection
        number="02"
        kicker="Metrics"
        title={<>What &quot;better&quot; actually means.</>}
        intro={
          <>
            We measure four dimensions. <strong className="text-text-primary">Precision</strong>: of
            findings that are technically valid, what percentage are correct?{" "}
            <strong className="text-text-primary">Recall</strong>: of known bugs in the dataset,
            what percentage did we catch? <strong className="text-text-primary">Noise rate</strong>:
            false positives per 100 lines changed.{" "}
            <strong className="text-text-primary">Actionability</strong>: does the comment include a
            file, line, and a suggested fix, or is it vague advice?
          </>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MetricCard
            label="Precision"
            body="Of findings flagged as valid, what fraction is technically correct? Measured by independent annotation against known truth."
          />
          <MetricCard
            label="Recall"
            body="Of known bugs in the dataset, what fraction did Sigilix surface? Caught vs. missed, with explicit per-class breakdown."
          />
          <MetricCard
            label="Noise rate"
            body="False positives per 100 lines changed. The single most important metric for whether reviewers turn off the bot."
          />
          <MetricCard
            label="Actionability"
            body="Does each finding name a file, a line, and a concrete fix — or is it vague advice the author can't act on?"
          />
        </div>
      </DeepSection>

      <DeepSection
        number="03"
        kicker="Baseline"
        title={<>Controlled comparison.</>}
        intro={
          <>
            We compare Sigilix against single-agent GPT-4o (same temperature, same context-window
            limit) and human review latency. We disclose our full testing conditions: prompt
            versions, model snapshots, retrieval depth, temperature settings. When we publish, you
            will be able to reproduce our results — or prove us wrong.
          </>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full bg-surface-raised border border-border rounded-sm">
            <thead>
              <tr className="border-b border-border">
                <Th>Dimension</Th>
                <Th highlight>Sigilix</Th>
                <Th>Single-agent GPT-4o</Th>
                <Th>Human baseline</Th>
              </tr>
            </thead>
            <tbody className="font-sans text-sm">
              <Row dim="Precision" />
              <Row dim="Recall" />
              <Row dim="Noise rate" />
              <Row dim="Actionability" />
              <Row dim="Latency" />
            </tbody>
          </table>
        </div>
        <p className="font-mono text-[11px] text-text-muted mt-4">
          All cells return numbers when the Q3 2026 audit publishes. We will not invent placeholders.
        </p>
      </DeepSection>

      <DeepSection
        number="04"
        kicker="Live preview"
        title={<>Internal telemetry preview.</>}
        intro={
          <>
            These are unverified internal metrics from our shadow-mode pipeline over the last 30
            days. We are sharing them because hiding everything feels worse than sharing honestly.
            Treat them as directional, not scientific.
          </>
        }
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <BigStat
            value={<CountUp value={12440} className="font-mono text-3xl md:text-5xl text-accent font-medium" />}
            label="Reviews processed"
          />
          <BigStat
            value={<CountUp value={4.2} format="decimal" className="font-mono text-3xl md:text-5xl text-accent font-medium" />}
            label="Avg findings per PR"
          />
          <BigStat
            value={<CountUp value={18} format="percent" className="font-mono text-3xl md:text-5xl text-accent font-medium" />}
            label="Hallucination rate"
            sub="Down from 34% in v0.9"
          />
          <BigStat
            value={<span className="font-mono text-3xl md:text-5xl text-accent font-medium">0</span>}
            label="Customer code retained"
          />
        </div>
        <div className="bg-surface-raised border border-border rounded-sm p-6">
          <p className="text-sm text-text-secondary leading-relaxed">
            <span className="text-text-primary font-medium">These numbers are not audited.</span>{" "}
            They are generated from our own pipeline logs over the trailing 30-day window. The true
            benchmark is coming — see Section 05 for the timeline.
          </p>
        </div>
      </DeepSection>

      <DeepSection
        number="05"
        kicker="Commitment"
        title={<>When you can trust the scoreboard.</>}
        intro={
          <>
            We will publish a third-party audit of the Sigilix Benchmark Protocol by Q3 2026. The
            audit will cover precision, recall, and noise on the datasets described above,
            evaluated by an independent ML engineering firm. If you want the report when it drops,
            join the list. If you think our methodology is flawed, email us — we will update this
            page.
          </>
        }
      >
        <div className="bg-surface-raised border border-border rounded-sm p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="font-sans font-medium text-text-primary mb-2">Get the audit report</p>
            <p className="text-sm text-text-secondary leading-relaxed max-w-md">
              We&apos;ll email the published audit when it lands — and only that. No newsletter, no
              drip campaign.
            </p>
          </div>
          <Link
            href="/signup"
            className="px-6 py-3 bg-accent hover:bg-accent-hover text-white font-sans text-sm font-medium rounded-sm transition-colors whitespace-nowrap"
          >
            Notify me
          </Link>
        </div>
      </DeepSection>

      <CTABand
        title={
          <>
            Honest measurement is <span className="text-accent">part of the product.</span>
          </>
        }
        body="If we promised numbers we couldn't defend, we'd burn the trust we're trying to earn."
        primary={{ label: "Read our security architecture", href: "/security" }}
        secondary={{ label: "See the architecture", href: "/how-it-works" }}
      />

      <CrossLinkFooter
        prev={{ label: "Examples", href: "/examples" }}
        next={{ label: "Security", href: "/security" }}
        lastUpdated="2026-05-04"
      />
    </>
  )
}

function DataCard({ headline, subhead, body }: { headline: string; subhead: string; body: React.ReactNode }) {
  return (
    <div className="bg-surface-raised border border-border rounded-sm p-6">
      <p className="font-mono text-3xl md:text-4xl text-accent font-medium mb-1">{headline}</p>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted mb-3">
        {subhead}
      </p>
      <p className="text-sm text-text-secondary leading-relaxed">{body}</p>
    </div>
  )
}

function MetricCard({ label, body }: { label: string; body: string }) {
  return (
    <div className="bg-surface-raised border border-border rounded-sm p-6">
      <p className="font-mono text-xl md:text-2xl text-accent font-medium mb-3">{label}</p>
      <p className="text-sm text-text-secondary leading-relaxed">{body}</p>
    </div>
  )
}

function BigStat({
  value,
  label,
  sub,
}: {
  value: React.ReactNode
  label: string
  sub?: string
}) {
  return (
    <div>
      <div className="mb-3">{value}</div>
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-secondary">{label}</p>
      {sub && <p className="font-mono text-[10px] text-text-muted mt-1">{sub}</p>}
    </div>
  )
}

function Th({ children, highlight = false }: { children: React.ReactNode; highlight?: boolean }) {
  return (
    <th
      className={`text-left font-mono text-[11px] uppercase tracking-[0.2em] px-5 py-3 ${
        highlight ? "text-accent" : "text-text-muted"
      }`}
    >
      {children}
    </th>
  )
}

function Row({ dim }: { dim: string }) {
  return (
    <tr className="border-b border-border-subtle last:border-b-0">
      <td className="px-5 py-4 text-text-primary font-medium">{dim}</td>
      <td className="px-5 py-4 font-mono text-text-muted">Q3 audit</td>
      <td className="px-5 py-4 font-mono text-text-muted">TBD</td>
      <td className="px-5 py-4 font-mono text-text-muted">TBD</td>
    </tr>
  )
}
