import type { Metadata } from "next"
import { IDEHero } from "@/components/ide/IDEHero"
import { IDEFeatures } from "@/components/ide/IDEFeatures"
import { IDEEarlyAccess } from "@/components/ide/IDEEarlyAccess"

export const metadata: Metadata = {
  title: "Sigilix IDE — Coming soon",
  description:
    "The Sigilix specialist ensemble running inline in your editor. Warnings, architecture notes, and security flags before you ever open a pull request.",
}

export default function IDEPage() {
  return (
    <>
      <IDEHero />
      <IDEFeatures />
      <IDEEarlyAccess />
    </>
  )
}
