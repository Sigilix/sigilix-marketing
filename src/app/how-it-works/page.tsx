import { Metadata } from "next"
import { Layers, Shield, Zap, Type as TypeIcon, GitMerge, AlertTriangle } from "lucide-react"
import { DeepHero, CTABand, CrossLinkFooter, DeepSection } from "@/components/DeepShell"
import { SystemArchitecture } from "@/components/SystemArchitecture"

export const metadata: Metadata = {
  title: "How it Works · Sigilix",
  description:
    "How Sigilix runs four domain specialists in parallel and synthesizes their findings into one authoritative review — depth without noise.",
}

const SPECIALISTS = [
  {
    name: "Glyph",
    role: "Architecture",
    icon: Layers,
    model: "DeepSeek v4-Pro",
    job: "Reads the structural shape of a change. Looks for boundary violations, leaked abstractions, dead code, dependency-graph regressions, and refactors that look local but ripple through the codebase.",
    catches: [
      "Cross-package import cycles introduced by a new helper",
      "Type widenings that break downstream contracts",
      "Resurrected legacy code paths after a partial refactor",
    ],
  },
  {
    name: "Warden",
    role: "Security",
    icon: Shield,
    model: "DeepSeek v4-Pro",
    job: "OWASP-trained, lockfile-aware, and primed to read CVE feeds. Treats every diff as a potential vulnerability surface and validates auth, input, secrets, and supply-chain risk.",
    catches: [
      "SQL injection where input is concatenated, not parameterized",
      "CVE-class transitive dependencies re-introduced by a routine bump",
      "Auth checks against stale cache reads",
    ],
  },
  {
    name: "Pulse",
    role: "Performance",
    icon: Zap,
    model: "Kimi K2.6",
    job: "Reads code as a runtime story. Spots N+1 queries hidden behind clean async, accidental algorithmic blowups, hot loops, and resource exhaustion that won't show up until production load.",
    catches: [
      "N+1 queries inside Promise.all that look idiomatic",
      "Quadratic loops over collections that grow with users",
      "Missing indexes on new query patterns",
    ],
  },
  {
    name: "Weave",
    role: "Semantics",
    icon: TypeIcon,
    model: "Kimi K2.6",
    job: "The naming, contracts, and intent reviewer. Reads function signatures, docstrings, and the gap between what the code says it does and what it actually does.",
    catches: [
      "Function names that lie about side effects",
      "Type contracts violated under TypeScript's structural typing",
      "Tests that assert the wrong invariant",
    ],
  },
  {
    name: "Core",
    role: "Synthesizer",
    icon: GitMerge,
    model: "Kimi K2.6",
    job: "Receives all four specialist outputs, resolves contradictions, drops duplicates, ranks by impact, and writes one coherent review. Owns the verdict (approve / comment / request changes) and is the only voice the PR author hears.",
    catches: [
      "Cross-specialist races that no single specialist saw",
      "Duplicate findings phrased four different ways",
      "Critical findings buried under noise",
    ],
  },
]

const FAILURE_MODES = [
  {
    title: "Single-agent hallucination",
    body: "Generalist models invent functions, props, or APIs that don't exist. Sigilix grounds every claim in retrieved file context and rejects findings that can't be cited to a real path and line.",
  },
  {
    title: "Specialist disagreement",
    body: "When two specialists conflict (e.g., Pulse says ‘ship faster’, Glyph says ‘refactor first’), Core resolves with the trade-off explicit, never silently picking a side.",
  },
  {
    title: "Stale head SHA",
    body: "If the PR moves while review is in flight, Sigilix detects the drift, drops the in-flight review, and re-runs against the new head — never posting findings against code that no longer exists.",
  },
  {
    title: "Provider degradation",
    body: "Each specialist has a cross-provider fallback. If a primary model returns 5xx or saturates, the specialist re-runs against a backup model with identical prompts before reporting partial output.",
  },
]

export default function HowItWorksPage() {
  return (
    <>
      <DeepHero
        kicker="How it Works"
        title={
          <>
            Five minds. <span className="text-accent">One verdict.</span> Zero noise.
          </>
        }
        lead={
          <>
            Sigilix is not a wrapper around a single language model. It is an ensemble of four
            domain specialists and a synthesizer, each tuned for a job no generalist can do well.
            Below is the full system, top to bottom.
          </>
        }
      />

      <DeepSection
        number="01"
        kicker="System architecture"
        title={<>Four specialists. One synthesizer. <span className="text-accent">Built in.</span></>}
        intro={
          <>
            Every Sigilix review begins with retrieval, runs through four specialist models in
            parallel, and ends with Core — a single synthesizer that owns the verdict. The
            architecture is intentional: depth is a function of specialization, and signal is a
            function of synthesis.
          </>
        }
      >
        <SystemArchitecture />
      </DeepSection>

      <DeepSection
        number="02"
        kicker="Specialist topology"
        title={<>What each specialist actually does.</>}
        intro={
          <>
            Each specialist gets its own model selection, its own system prompt, its own retrieval
            scope. They are not parallel copies of the same generalist — they are four different
            jobs running concurrently.
          </>
        }
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {SPECIALISTS.map((s) => {
            const Icon = s.icon
            return (
              <article
                key={s.name}
                className="bg-surface-raised border border-border rounded-sm p-6 md:p-7"
              >
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-12 h-12 flex items-center justify-center rounded-sm bg-canvas border border-border shrink-0">
                    <Icon className="w-5 h-5 text-text-primary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-3">
                      <h3 className="font-sans font-medium text-xl text-text-primary">{s.name}</h3>
                      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-secondary">
                        {s.role}
                      </span>
                    </div>
                    <p className="font-mono text-[11px] text-text-muted mt-1">{s.model}</p>
                  </div>
                </div>
                <p className="text-text-secondary leading-relaxed mb-4">{s.job}</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted mb-2">
                  Typical catches
                </p>
                <ul className="space-y-1.5">
                  {s.catches.map((c, i) => (
                    <li key={i} className="text-sm text-text-secondary leading-relaxed flex gap-2">
                      <span className="text-accent">·</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>
      </DeepSection>

      <DeepSection
        number="03"
        kicker="Retrieval layer"
        title={<>Specialists are only as good as their context.</>}
        intro={
          <>
            Before any model runs, Sigilix builds a tailored retrieval bundle: the diff hunks, the
            files those hunks live in, the imports they touch, and the conventions of the
            surrounding repo. Each specialist gets a different slice — Warden sees lockfiles and
            CVE feeds; Glyph sees the dependency graph; Pulse sees query plans where available.
          </>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Diff hunks", copy: "Authoritative source. The literal changeset under review." },
            { label: "File context", copy: "The surrounding files, type-aware imports, neighboring tests." },
            { label: "Repo conventions", copy: "Sample of recent merged PRs to learn the team's idioms." },
          ].map((r) => (
            <div key={r.label} className="bg-surface-raised border border-border rounded-sm p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-2">
                {r.label}
              </p>
              <p className="text-sm text-text-secondary leading-relaxed">{r.copy}</p>
            </div>
          ))}
        </div>
      </DeepSection>

      <DeepSection
        number="04"
        kicker="Model choices"
        title={<>Why two providers. <span className="text-accent">Why these two.</span></>}
        intro={
          <>
            The ensemble splits across DeepSeek v4-Pro and Kimi K2.6. We chose them after a
            month-long bake-off: DeepSeek dominates on dense, proof-style reasoning; Kimi is the
            stronger writer and synthesizer. Splitting roles across providers also means a single
            provider outage degrades the review gracefully — never silently.
          </>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-surface-raised border border-border rounded-sm p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-3">
              DeepSeek v4-Pro
            </p>
            <p className="font-sans text-text-primary mb-3">Dense reasoning, low hallucination on hard math and library APIs.</p>
            <p className="text-sm text-text-secondary leading-relaxed">
              Powers Glyph and Warden. Strong on code-graph reasoning, CVE chains, and lockfile
              resolution. Admits uncertainty instead of fabricating APIs.
            </p>
          </div>
          <div className="bg-surface-raised border border-border rounded-sm p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-3">
              Kimi K2.6
            </p>
            <p className="font-sans text-text-primary mb-3">Stronger writer, better at synthesizing across signals.</p>
            <p className="text-sm text-text-secondary leading-relaxed">
              Powers Pulse, Weave, and Core. Superior on naming, contract intent, and the final
              synthesis step where four specialist outputs become one coherent review.
            </p>
          </div>
        </div>
      </DeepSection>

      <DeepSection
        number="05"
        kicker="Synthesizer pipeline"
        title={<>Core does the work no specialist can do alone.</>}
        intro={
          <>
            Once the four specialists return, Core runs a four-step pipeline: collect, cross-reference,
            calibrate, render. Findings get deduplicated, conflicts get resolved with rationale,
            severity gets calibrated against repo history, and the final review is rendered as one
            inline-anchored comment with a single verdict.
          </>
        }
      >
        <ol className="space-y-3">
          {[
            { n: "01", label: "Collect", body: "All specialist outputs are merged into one structured pool, tagged by source." },
            { n: "02", label: "Cross-reference", body: "Findings are compared. Duplicates collapse; partial findings that compose into a critical (e.g., a race condition) are upgraded." },
            { n: "03", label: "Calibrate", body: "Severity is recalibrated against the repo's bar and the PR's risk profile. ‘Style preferences’ are downgraded; production-class bugs are upgraded." },
            { n: "04", label: "Render", body: "Findings render as inline-anchored comments with file + line + suggested patch. The review body lists the verdict and a one-paragraph summary." },
          ].map((s) => (
            <li
              key={s.n}
              className="bg-surface-raised border border-border rounded-sm p-5 flex gap-5"
            >
              <span className="font-mono text-sm tracking-[0.2em] text-accent mt-0.5 shrink-0 w-10">
                {s.n}
              </span>
              <div>
                <p className="font-sans font-medium text-text-primary mb-1">{s.label}</p>
                <p className="text-sm text-text-secondary leading-relaxed">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </DeepSection>

      <DeepSection
        number="06"
        kicker="Failure modes"
        title={<>What breaks reviews. <span className="text-accent">How we catch it.</span></>}
        intro={
          <>
            Honest engineering means naming the failure modes before they bite. Below are four ways
            review systems break in practice, and how Sigilix handles each.
          </>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FAILURE_MODES.map((m) => (
            <div key={m.title} className="bg-surface-raised border border-border rounded-sm p-6">
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle className="w-4 h-4 text-warning" strokeWidth={1.5} />
                <p className="font-sans font-medium text-text-primary">{m.title}</p>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">{m.body}</p>
            </div>
          ))}
        </div>
      </DeepSection>

      <DeepSection
        number="07"
        kicker="Why ensemble"
        title={<>Why ensemble beats single-agent.</>}
        intro={
          <>
            The single-agent shortcut is real: one model, one prompt, one round-trip per PR. But the
            cost is uniform mediocrity. An ensemble pays a small latency tax for a categorical
            quality jump.
          </>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Comparison
            heading="Single-agent reviewer"
            items={[
              { label: "Coverage", body: "One model carries every domain. Strong at none." },
              { label: "Hallucination", body: "Generalist guesses. Cites APIs that don't exist." },
              { label: "Synthesis", body: "Lists every finding it has. No ranking, no dedup." },
              { label: "Provider risk", body: "One outage drops the whole review." },
            ]}
          />
          <Comparison
            heading="Sigilix ensemble"
            highlight
            items={[
              { label: "Coverage", body: "Four specialists, each tuned for a real domain." },
              { label: "Hallucination", body: "Findings are grounded in retrieved context. Ungrounded claims are dropped." },
              { label: "Synthesis", body: "Core dedups, ranks, and synthesizes cross-specialist findings." },
              { label: "Provider risk", body: "Cross-provider fallback per specialist. Graceful degradation." },
            ]}
          />
        </div>
      </DeepSection>

      <CTABand
        title={
          <>
            Read the proof, not just the architecture. <span className="text-accent">See six real reviews.</span>
          </>
        }
        primary={{ label: "View examples", href: "/examples" }}
        secondary={{ label: "Read the security model", href: "/security" }}
      />

      <CrossLinkFooter
        prev={{ label: "Product overview", href: "/" }}
        next={{ label: "Examples", href: "/examples" }}
        lastUpdated="2026-05-04"
      />
    </>
  )
}

function Comparison({
  heading,
  items,
  highlight = false,
}: {
  heading: string
  items: { label: string; body: string }[]
  highlight?: boolean
}) {
  return (
    <div
      className={`rounded-sm p-6 md:p-7 border ${
        highlight ? "bg-canvas border-accent" : "bg-surface-raised border-border"
      }`}
    >
      <p
        className={`font-mono text-[11px] uppercase tracking-[0.2em] mb-5 ${
          highlight ? "text-accent" : "text-text-muted"
        }`}
      >
        {heading}
      </p>
      <ul className="space-y-4">
        {items.map((it) => (
          <li key={it.label} className="border-t border-border-subtle pt-4 first:border-0 first:pt-0">
            <p className="font-sans text-sm font-medium text-text-primary mb-1">{it.label}</p>
            <p className="text-sm text-text-secondary leading-relaxed">{it.body}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
