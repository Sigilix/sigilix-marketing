import type { Metadata } from "next"
import {
  ExampleHero,
  ExampleGallery,
  ExampleSignal,
} from "@/components/ExampleGallery"

export const metadata: Metadata = {
  title: "Examples",
  description:
    "Three illustrative Sigilix reviews across security, performance, and API contract domains.",
}

export default function ExamplePage() {
  return (
    <>
      <ExampleHero />
      <ExampleGallery />
      <ExampleSignal />
    </>
  )
}
