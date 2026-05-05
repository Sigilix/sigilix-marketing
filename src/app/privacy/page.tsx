import type { Metadata } from "next"
import Link from "next/link"
import { DeepHero, CrossLinkFooter, DeepSection } from "@/components/DeepShell"

export const metadata: Metadata = {
  title: "Privacy Policy · Sigilix",
  description:
    "How Sigilix handles your code, your account, and your data. Zero-retention inference, scoped access, and no model training on customer code.",
}

export default function PrivacyPage() {
  return (
    <>
      <DeepHero
        kicker="Privacy"
        title={
          <>
            Privacy Policy. <span className="text-accent">In plain language.</span>
          </>
        }
        lead={
          <>
            This page summarizes how Sigilix handles your code and account data. It is the
            controlling reference for our privacy commitments. The full architectural detail —
            including data-flow diagrams and retention rules — lives at{" "}
            <Link href="/security" className="text-text-primary hover:text-accent transition-colors underline-offset-4 hover:underline">
              /security
            </Link>
            .
          </>
        }
      />

      <DeepSection number="01" kicker="Effective" title={<>Effective date: May 5, 2026.</>}>
        <p className="text-text-secondary leading-relaxed max-w-3xl">
          Sigilix is operated by <strong className="text-text-primary">Arc and Anchor LLC</strong>{" "}
          (&quot;Sigilix&quot;, &quot;we&quot;, &quot;our&quot;). We provide an AI code-review
          service that runs on your pull requests. This policy explains what data we collect, how
          we use it, who we share it with, and the rights you have.
        </p>
      </DeepSection>

      <DeepSection number="02" kicker="What we collect" title={<>Three categories of data.</>}>
        <div className="space-y-6 max-w-3xl">
          <Block label="Account data">
            Email address, GitHub user ID, organization membership, billing contact, and the
            metadata GitHub returns when you authorize the Sigilix App. We do not collect
            passwords; auth is delegated to GitHub.
          </Block>
          <Block label="Review data (ephemeral)">
            For each review: the diff hunks, surrounding files, lockfiles, and PR metadata of the
            pull request under review. This content is held in memory only for the duration of
            inference (typically &lt; 60 seconds) and is discarded immediately after the review is
            posted. We do not persist file contents.
          </Block>
          <Block label="Telemetry">
            Aggregate counters: review count, latency, model error rates, rate-limit usage,
            client-side analytics on marketing pages (page views, referrers). No file contents or
            personally identifying data beyond what GitHub already exposes for the user.
          </Block>
        </div>
      </DeepSection>

      <DeepSection number="03" kicker="What we don't do" title={<>The hard nos.</>}>
        <ul className="space-y-3 text-text-secondary leading-relaxed max-w-3xl">
          {[
            "We do not train models on your code. Not our own models. Not third-party models.",
            "We do not vectorize or index your repositories into any shared embedding store.",
            "We do not retain logs that contain your file contents.",
            "We do not sell or rent your data.",
            "We do not use your code to improve Sigilix's product without your explicit, written opt-in.",
          ].map((line) => (
            <li key={line} className="flex gap-3">
              <span className="text-accent mt-1">·</span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </DeepSection>

      <DeepSection number="04" kicker="Sub-processors" title={<>Third parties we send data to.</>}>
        <p className="text-text-secondary leading-relaxed max-w-3xl mb-6">
          To run a review, we route diff context through commercial inference providers. We choose
          them deliberately and require zero-retention terms in our commercial agreements.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full bg-surface-raised border border-border rounded-sm">
            <thead>
              <tr className="border-b border-border">
                <Th>Provider</Th>
                <Th>What they receive</Th>
                <Th>Retention</Th>
              </tr>
            </thead>
            <tbody className="font-sans text-sm">
              <Tr>
                <Td label>DeepSeek</Td>
                <Td>Diff hunks + retrieval context for Glyph and Warden</Td>
                <Td>Zero retention; never used for training</Td>
              </Tr>
              <Tr>
                <Td label>Moonshot AI (Kimi)</Td>
                <Td>Diff hunks + retrieval context for Spark, Weave, Core</Td>
                <Td>Zero retention; never used for training</Td>
              </Tr>
              <Tr>
                <Td label>GitHub</Td>
                <Td>Authentication, repository read access, review posting</Td>
                <Td>Per GitHub Terms of Service</Td>
              </Tr>
              <Tr>
                <Td label>Cloudflare</Td>
                <Td>Edge compute and request termination for the Sigilix worker</Td>
                <Td>Logs purged ≤ 24h; no file contents retained</Td>
              </Tr>
              <Tr>
                <Td label>Vercel</Td>
                <Td>Marketing site hosting (sigilix.ai). No customer code passes through.</Td>
                <Td>Per Vercel DPA</Td>
              </Tr>
            </tbody>
          </table>
        </div>
      </DeepSection>

      <DeepSection number="05" kicker="Your rights" title={<>What you can ask us to do.</>}>
        <p className="text-text-secondary leading-relaxed max-w-3xl mb-6">
          You can request access, correction, or deletion of any account data we hold for you. We
          honor GDPR, CCPA, and equivalent regimes for all customers regardless of region. Send
          requests to{" "}
          <a
            href="mailto:privacy@sigilix.ai"
            className="text-text-primary hover:text-accent transition-colors underline-offset-4 hover:underline"
          >
            privacy@sigilix.ai
          </a>{" "}
          and we will respond within 30 days.
        </p>
      </DeepSection>

      <DeepSection number="06" kicker="Changes" title={<>How updates work.</>}>
        <p className="text-text-secondary leading-relaxed max-w-3xl">
          We will revise this policy as we add features and sub-processors. Material changes will
          be announced by email to the billing contact and posted at{" "}
          <Link href="/privacy" className="text-text-primary hover:text-accent transition-colors underline-offset-4 hover:underline">
            sigilix.ai/privacy
          </Link>{" "}
          with the new effective date. Continued use of the service after a change constitutes
          acceptance.
        </p>
      </DeepSection>

      <DeepSection number="07" kicker="Contact" title={<>Reach a human.</>}>
        <p className="text-text-secondary leading-relaxed max-w-3xl">
          Privacy questions:{" "}
          <a
            href="mailto:privacy@sigilix.ai"
            className="text-text-primary hover:text-accent transition-colors underline-offset-4 hover:underline"
          >
            privacy@sigilix.ai
          </a>
          . Security disclosures:{" "}
          <a
            href="mailto:security@sigilix.ai"
            className="text-text-primary hover:text-accent transition-colors underline-offset-4 hover:underline"
          >
            security@sigilix.ai
          </a>
          . Anything else:{" "}
          <a
            href="mailto:hello@sigilix.ai"
            className="text-text-primary hover:text-accent transition-colors underline-offset-4 hover:underline"
          >
            hello@sigilix.ai
          </a>
          .
        </p>
      </DeepSection>

      <CrossLinkFooter
        prev={{ label: "Terms", href: "/terms" }}
        next={{ label: "Security architecture", href: "/security" }}
        lastUpdated="2026-05-05"
      />
    </>
  )
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="bg-surface-raised border border-border rounded-sm p-5">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent mb-3">{label}</p>
      <p className="text-text-secondary leading-relaxed">{children}</p>
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
