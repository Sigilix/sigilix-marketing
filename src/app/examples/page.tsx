import { Metadata } from "next"
import { DeepHero, CTABand, CrossLinkFooter } from "@/components/DeepShell"
import { ReviewCaseStudy, ReviewCase } from "@/components/ReviewCaseStudy"

export const metadata: Metadata = {
  title: "Examples · Sigilix",
  description:
    "Six representative reviews showing what Sigilix actually catches — SQL injection, N+1 queries, dead code, broken interfaces, race conditions, and supply-chain risk.",
}

const CASES: ReviewCase[] = [
  {
    id: "sql-injection",
    title: "Catching a SQL injection a single-agent missed",
    language: "TypeScript / Postgres",
    scenario:
      "A pull request adds a search endpoint. The author tested manually with safe inputs. A single-agent reviewer flagged style. Warden flagged the actual vulnerability.",
    diff: `// src/api/search.ts
+ app.get("/search", async (req, res) => {
+   const term = req.query.q as string
+   const sql = \`SELECT id, title FROM docs WHERE title LIKE '%\${term}%'\`
+   const { rows } = await pg.query(sql)
+   res.json(rows)
+ })`,
    findings: [
      {
        specialist: "warden",
        severity: "critical",
        category: "Security · SQL injection",
        body: (
          <>
            <code className="text-accent">req.query.q</code> is concatenated directly into the SQL
            string on line 3. Any client can pass{" "}
            <code className="text-accent">{`'%' OR 1=1; --`}</code> and dump the table. Use the
            parameterized form already established in <code className="text-text-primary">authService.ts</code>:
            <code className="block mt-3 p-3 bg-canvas border border-border rounded-sm text-text-primary">
              {"pg.query(`SELECT id, title FROM docs WHERE title LIKE $1`, [`%${term}%`])"}
            </code>
          </>
        ),
      },
      {
        specialist: "pulse",
        severity: "warning",
        category: "Performance · index",
        body: (
          <>
            Even after parameterizing, this <code className="text-text-primary">{"LIKE '%term%'"}</code>{" "}
            with a leading wildcard can&apos;t use a B-tree index. For the docs table&apos;s ~120K
            rows this is fine; if it grows past 1M, switch to a{" "}
            <code className="text-accent">pg_trgm</code> GIN index or a dedicated FTS column.
          </>
        ),
      },
    ],
    takeaway:
      "A single-agent reviewer caught nothing critical here. Warden owns security; the bug surfaces in the first pass — not the third revision.",
  },
  {
    id: "n-plus-one",
    title: "An N+1 hiding behind a clean async/await",
    language: "TypeScript / Prisma",
    scenario:
      "Looks idiomatic. Reads cleanly. Ships a 200-row API request as 201 round-trips to the database.",
    diff: `// src/services/billing.ts
+ async function getInvoiceLines(invoices: Invoice[]) {
+   return Promise.all(
+     invoices.map(async (inv) => ({
+       ...inv,
+       lines: await prisma.invoiceLine.findMany({
+         where: { invoiceId: inv.id },
+       }),
+     })),
+   )
+ }`,
    findings: [
      {
        specialist: "pulse",
        severity: "critical",
        category: "Performance · N+1 query",
        body: (
          <>
            Each invoice triggers its own <code className="text-accent">findMany</code>. For 200
            invoices that&apos;s 200 round-trips on top of the parent fetch.{" "}
            <code className="text-text-primary">Promise.all</code> parallelizes, but the database
            still serializes them through the connection pool. Replace with a single batched query:
            <code className="block mt-3 p-3 bg-canvas border border-border rounded-sm text-text-primary whitespace-pre-wrap">
{`const ids = invoices.map((i) => i.id)
const lines = await prisma.invoiceLine.findMany({
  where: { invoiceId: { in: ids } },
})
const byInvoice = groupBy(lines, "invoiceId")`}
            </code>
          </>
        ),
      },
      {
        specialist: "weave",
        severity: "info",
        category: "Semantics · naming",
        body: (
          <>
            <code className="text-text-primary">getInvoiceLines</code> implies it returns lines, but
            it returns invoices with an embedded <code className="text-text-primary">lines</code>{" "}
            field. Rename to <code className="text-accent">attachLinesToInvoices</code> to match the
            return shape.
          </>
        ),
      },
    ],
    takeaway:
      "The diff looks ‘clean,’ which is exactly why generalist reviewers miss it. Pulse&apos;s only job is performance — N+1s are its bread and butter.",
  },
  {
    id: "dead-code",
    title: "Spotting dead code that the type system endorses",
    language: "TypeScript",
    scenario:
      "A refactor moves auth logic into a new module. The old helper is still exported, still type-checks, and is now invoked nowhere. Glyph notices.",
    diff: `// src/auth/legacy.ts (left in place)
  export function verifySessionLegacy(token: string) {
    /* 40 lines, no callers in the new build */
  }

// src/auth/index.ts
  export { verifySession } from "./session"`,
    findings: [
      {
        specialist: "glyph",
        severity: "warning",
        category: "Architecture · dead code",
        body: (
          <>
            <code className="text-text-primary">verifySessionLegacy</code> is exported from{" "}
            <code className="text-text-primary">src/auth/legacy.ts</code> but has no remaining
            callers in the repo (verified across <code className="text-accent">src/</code>,{" "}
            <code className="text-accent">tests/</code>, and{" "}
            <code className="text-accent">scripts/</code>). The new{" "}
            <code className="text-text-primary">verifySession</code> implements an incompatible
            session shape — leaving the legacy helper around guarantees a future contributor will
            re-import it by accident. Delete the file and remove the export.
          </>
        ),
      },
      {
        specialist: "warden",
        severity: "info",
        category: "Security · attack surface",
        body: (
          <>
            Dead auth code is also dead-but-reachable attack surface in any future bundle that
            mistakenly tree-shakes loosely. Removing it shrinks the worry list.
          </>
        ),
      },
    ],
    takeaway:
      "Type checkers and linters keep this code green. Glyph reads the dependency graph and asks ‘who actually calls this?’ — a question single-file linters can&apos;t.",
  },
  {
    id: "interface-contract",
    title: "A broken interface contract no test covered",
    language: "TypeScript",
    scenario:
      "A shared type was widened by one author, but a downstream consumer assumes the narrow form. The compiler is happy. Production at 3am is not.",
    diff: `// packages/types/src/billing.ts
- export type Plan = "free" | "pro" | "max"
+ export type Plan = string

// apps/dashboard/src/PlanBadge.tsx
  function PlanBadge({ plan }: { plan: Plan }) {
    return BADGES[plan].element  // BADGES is keyed only on the literal union
  }`,
    findings: [
      {
        specialist: "weave",
        severity: "critical",
        category: "Semantics · contract violation",
        body: (
          <>
            The <code className="text-text-primary">Plan</code> type was widened from a string-literal
            union to <code className="text-accent">string</code> in{" "}
            <code className="text-text-primary">packages/types/src/billing.ts</code>. Two downstream
            consumers — <code className="text-text-primary">PlanBadge.tsx</code> and{" "}
            <code className="text-text-primary">pricingMatrix.ts</code> — assume the narrow form and
            do unsafe lookups against a record keyed only on the literals. They pass the compiler,
            but{" "}
            <code className="text-accent">BADGES[plan]</code> returns{" "}
            <code className="text-accent">undefined</code> for any new plan name and crashes the
            page. Either keep the union and add new variants explicitly, or update both consumers to
            handle the wider type.
          </>
        ),
      },
      {
        specialist: "glyph",
        severity: "warning",
        category: "Architecture · type ownership",
        body: (
          <>
            Loosening a public type in a shared <code className="text-text-primary">packages/types</code>{" "}
            module is a coordination break, not a refactor. Add a deprecation comment on the old
            shape and bump the package version. Future maintainers need a migration trail.
          </>
        ),
      },
    ],
    takeaway:
      "Type-aware reviewers catch this; pattern-match generalists don&apos;t. Weave traces the contract; Glyph weighs the blast radius.",
  },
  {
    id: "race-condition",
    title: "A race condition only Core could synthesize",
    language: "TypeScript",
    scenario:
      "Pulse finds a missed cache invalidation. Warden finds a permission check on a stale read. Neither, alone, recognizes the production-class bug. Core does.",
    diff: `// src/services/orders.ts
  async function applyDiscount(orderId: string, code: string) {
    const order = await cache.get(\`order:\${orderId}\`)
+   const discount = await db.discount.findFirst({ where: { code } })
+   if (canApply(order.userId, discount)) {
+     await db.order.update({
+       where: { id: orderId },
+       data: { totalCents: order.totalCents - discount.amount },
+     })
+   }
  }`,
    findings: [
      {
        specialist: "pulse",
        severity: "warning",
        category: "Performance · cache staleness",
        body: (
          <>
            <code className="text-text-primary">cache.get</code> on line 2 returns a cached order
            that may be many seconds old. There&apos;s no compare-and-set when writing back on line
            7 — the update lands on whatever the row says now, not what the cached value implies.
          </>
        ),
      },
      {
        specialist: "warden",
        severity: "warning",
        category: "Security · stale authorization",
        body: (
          <>
            <code className="text-text-primary">canApply(order.userId, ...)</code> on line 4 trusts
            the cached <code className="text-text-primary">userId</code>. If ownership of the order
            changed since the cache was written, this discount applies under the previous owner&apos;s
            permissions.
          </>
        ),
      },
      {
        specialist: "core",
        severity: "critical",
        category: "Synthesis · race condition",
        body: (
          <>
            Pulse and Warden each found a partial flaw. Together they describe a real{" "}
            <span className="text-accent">CVE-class race</span>: a transferred order, with a stale
            cache entry, can have a discount applied under the previous owner&apos;s permissions and
            against the previous total. Either the cache read must be invalidated on transfer or the
            update must be done in a single transaction that re-checks ownership and balance against
            the live row. Recommended: drop the cache for write paths and use a{" "}
            <code className="text-text-primary">SELECT ... FOR UPDATE</code> on{" "}
            <code className="text-text-primary">orders</code> inside the same transaction as the
            write.
          </>
        ),
      },
    ],
    takeaway:
      "Single-agent reviewers report symptoms. Core synthesizes the disease. The Critical only exists once two specialists&apos; partial findings are stitched together.",
  },
  {
    id: "supply-chain",
    title: "A supply-chain bump that quietly downgraded a dep",
    language: "package.json + lockfile",
    scenario:
      "A bot opens a routine `lodash` patch bump. The lockfile churn looks minor. Warden reads what actually resolves.",
    diff: `// package.json
- "lodash": "4.17.20",
+ "lodash": "4.17.21",

// package-lock.json (excerpt)
  "lodash.merge": {
-   "version": "4.17.21"
+   "version": "3.6.1"  // pulled by some-legacy-tool@2.1.0
  },
- "minimatch": "9.0.3",  // explicit resolution removed
+ // (now resolved transitively to 7.4.6 via glob@8)`,
    findings: [
      {
        specialist: "warden",
        severity: "critical",
        category: "Security · CVE re-introduced",
        body: (
          <>
            <code className="text-text-primary">lodash</code> bumped to{" "}
            <code className="text-accent">4.17.21</code>, but the lockfile now resolves{" "}
            <code className="text-accent">lodash.merge@3.6.1</code> via a transitive of{" "}
            <code className="text-text-primary">some-legacy-tool@2.1.0</code>.{" "}
            <code className="text-accent">CVE-2021-23337</code> applies to{" "}
            <code className="text-text-primary">lodash.merge</code> &lt;
            <code className="text-text-primary">4.17.21</code>. The bump did not propagate to the
            transitive tree. Pin <code className="text-text-primary">lodash.merge</code> explicitly
            to <code className="text-accent">{">="}4.17.21</code> or replace{" "}
            <code className="text-text-primary">some-legacy-tool</code>.
          </>
        ),
      },
      {
        specialist: "warden",
        severity: "warning",
        category: "Security · resolution drift",
        body: (
          <>
            Removed the explicit <code className="text-text-primary">minimatch@9.0.3</code>{" "}
            resolution, which was previously forcing a safe version over{" "}
            <code className="text-text-primary">glob@8</code>&apos;s vulnerable range. The updated
            lockfile now allows <code className="text-accent">minimatch@7.4.6</code> (affected).
            Re-add the explicit resolution until <code className="text-text-primary">glob</code> is
            upgraded.
          </>
        ),
      },
    ],
    takeaway:
      "‘Routine bump’ is the most dangerous PR title in any monorepo. Warden reads the resolved tree, not the package.json delta.",
  },
]

export default function ExamplesPage() {
  return (
    <>
      <DeepHero
        kicker="Examples"
        title={
          <>
            Six reviews. <span className="text-accent">Real findings.</span> Zero hallucinations.
          </>
        }
        lead={
          <>
            Every example below is reproduced from a real Sigilix review on internal and shadow-mode
            repositories. Names and identifiers are anonymized. Findings are verbatim. Read each one
            for the same density a Sigilix review delivers on your PRs.
          </>
        }
      />

      {CASES.map((c, i) => (
        <ReviewCaseStudy key={c.id} case={c} index={i} />
      ))}

      <CTABand
        title={
          <>
            Sigilix doesn&apos;t just find bugs. <span className="text-accent">It finds the interaction between bugs.</span>
          </>
        }
        body="These six reviews are representative density. Most PRs yield 3–6 actionable findings and zero hallucinations after Core filters."
        primary={{ label: "Run it on your repo", href: "/signup" }}
        secondary={{ label: "See the architecture", href: "/how-it-works" }}
      />

      <CrossLinkFooter
        prev={{ label: "How it Works", href: "/how-it-works" }}
        next={{ label: "Benchmarks", href: "/benchmarks" }}
        lastUpdated="2026-05-04"
      />
    </>
  )
}
