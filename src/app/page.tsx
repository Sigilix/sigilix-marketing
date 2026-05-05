import { Hero } from "@/components/Hero"
import { EnsembleExplainer } from "@/components/EnsembleExplainer"
import { SampleReview } from "@/components/SampleReview"
import { SpecialistDeepDive } from "@/components/SpecialistDeepDive"
import { Integrations } from "@/components/Integrations"
import { PricingTeaser } from "@/components/PricingTeaser"
import { SigilStory } from "@/components/SigilStory"
import { FAQ } from "@/components/FAQ"

export default function Home() {
  return (
    <>
      <Hero />
      <EnsembleExplainer />
      <SampleReview />
      <SpecialistDeepDive />
      <Integrations />
      <PricingTeaser />
      <SigilStory />
      <FAQ />
    </>
  )
}
