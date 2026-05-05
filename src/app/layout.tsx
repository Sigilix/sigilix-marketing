import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Sigilix — The mark of merge-ready code.",
  description:
    "Multi-agent AI code review for GitHub. Four specialists review every PR in parallel. A synthesizer deduplicates noise. One definitive seal of approval.",
  metadataBase: new URL("https://sigilix.ai"),
  openGraph: {
    title: "Sigilix",
    description: "The mark of merge-ready code.",
    url: "https://sigilix.ai",
    siteName: "Sigilix",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sigilix",
    description: "The mark of merge-ready code.",
    images: ["/og.png"],
  },
  // Next.js 16 auto-discovers icon.png, apple-icon.png, and favicon.ico
  // from src/app/. Don't double-declare here — that just overrides the
  // file-system convention with a duplicate path.
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
        {children}
      </body>
    </html>
  )
}
