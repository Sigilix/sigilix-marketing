import type { Metadata } from "next"
import { IDEHero } from "@/components/ide/IDEHero"
import { IDEFeatures } from "@/components/ide/IDEFeatures"
import { IDEFAQ } from "@/components/ide/IDEFAQ"
import { IDEEarlyAccess } from "@/components/ide/IDEEarlyAccess"
import { CTABand, CrossLinkFooter } from "@/components/DeepShell"

export const metadata: Metadata = {
  title: "Sigilix IDE — Coming Q3 2026",
  description:
    "The Sigilix specialist ensemble running inline in your editor. Warden, Glyph, Pulse, and Weave on every save — no commit, no push, no waiting on CI.",
}

export default function IDEPage() {
  return (
    <>
      <IDEHero />
      <IDEFeatures />
      <IDEFAQ />
      <IDEEarlyAccess />
      <CTABand
        title={
          <>
            The PR experience ships today. <span className="text-accent">The editor is next.</span>
          </>
        }
        body="Run Sigilix on your repos now and you'll get the IDE plugin the day it lands."
        primary={{ label: "Continue to app.sigilix.ai", href: "https://app.sigilix.ai" }}
        secondary={{ label: "See the architecture", href: "/how-it-works" }}
      />
      <CrossLinkFooter
        prev={{ label: "Examples", href: "/examples" }}
        next={{ label: "Pricing", href: "/pricing" }}
        lastUpdated="2026-05-04"
      />
    </>
  )
}
