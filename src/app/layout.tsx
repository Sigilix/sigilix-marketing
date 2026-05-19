import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { SiteNav } from "@/components/SiteNav"
import { Footer } from "@/components/Footer"
import { PageTransition } from "@/components/PageTransition"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const siteUrl = "https://sigilix.ai"
const linkPreviewImage = `${siteUrl}/sigilix-link-preview.jpg`

export const metadata: Metadata = {
  title: {
    default: "Sigilix — A seal of approval on every pull request.",
    template: "%s · Sigilix",
  },
  description:
    "Multi-agent AI code review for GitHub. Four specialists review every PR in parallel; a synthesizer deduplicates noise into one definitive verdict.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Sigilix",
    description: "The mark of merge-ready code.",
    url: siteUrl,
    siteName: "Sigilix",
    images: [
      {
        url: linkPreviewImage,
        alt: "Sigilix mark",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sigilix",
    description: "The mark of merge-ready code.",
    images: [linkPreviewImage],
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-canvas text-text-primary">
        <div className="noise" aria-hidden />
        <SiteNav />
        <main className="relative flex-1 z-0">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  )
}
