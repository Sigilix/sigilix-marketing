import type { Metadata } from "next"
import { SignupHero } from "@/components/signup/SignupHero"
import { PlanGrid } from "@/components/signup/PlanGrid"
import { AuthAction } from "@/components/signup/AuthAction"

export const metadata: Metadata = {
  title: "Sign up · Choose your seal",
  description:
    "Pick a Sigilix plan, sign in with GitHub, and start reviewing pull requests in minutes.",
}

export default function SignupPage() {
  return (
    <>
      <SignupHero />
      <PlanGrid />
      <AuthAction />
    </>
  )
}
