import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { HowItWorksHero } from "@/components/HowItWorksHero"
import { SpecialistDetail } from "@/components/SpecialistDetail"
import { SynthesizerDetail, FlowStrip } from "@/components/SynthesizerDetail"

export const metadata: Metadata = {
  title: "How it works",
  description:
    "How Sigilix runs a multi-agent review: four parallel specialists feed a synthesizer that produces one calibrated verdict per PR.",
}

export default function HowItWorksPage() {
  return (
    <>
      <HowItWorksHero />
      <SpecialistDetail />
      <SynthesizerDetail />
      <FlowStrip />
      <section className="relative py-24 md:py-32 px-6 md:px-12 border-t border-border">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-sans font-medium text-3xl md:text-5xl tracking-tight leading-[0.95] text-text-primary mb-8">
            See it on a real PR.
          </h2>
          <Link
            href="/example"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-text-primary border border-border rounded-sm h-12 px-6 hover:border-ink hover:text-ink transition-colors"
          >
            Example reviews
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </>
  )
}
