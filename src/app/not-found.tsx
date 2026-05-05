import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center px-6 md:px-12 text-center overflow-hidden">
      {/* Fractured static watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.04]"
      >
        <div className="relative w-[80vh] h-[80vh] max-w-none rotate-12">
          <Image
            src="/sigil-logo.png"
            alt=""
            fill
            className="logo-invert object-contain"
            sizes="80vh"
          />
        </div>
      </div>
      <div className="relative z-10 max-w-xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-secondary mb-6">
          404 · Off the index
        </p>
        <h1 className="font-sans font-medium text-5xl md:text-7xl tracking-tight leading-[0.95] text-text-primary mb-8">
          Signal lost.
        </h1>
        <p className="text-lg text-text-secondary leading-relaxed mb-12">
          The page you tried to reach isn't part of the current chart. Easy fix.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-ink text-white h-12 px-6 rounded-sm font-mono text-xs uppercase tracking-[0.2em] hover:bg-ink/90 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to base
        </Link>
      </div>
    </section>
  )
}
