import Image from "next/image"

export function SigilStory() {
  return (
    <section className="relative py-24 md:py-32 px-6 md:px-8 border-t border-border-subtle overflow-hidden">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16 items-center">
        <div className="md:col-span-2 relative aspect-square max-w-md mx-auto md:mx-0">
          <div className="relative w-full h-full opacity-40">
            <Image
              src="/sigil-logo.png"
              alt=""
              fill
              className="logo-invert object-contain"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
        </div>
        <div className="md:col-span-3">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-secondary mb-4">
            Etymology
          </p>
          <h2 className="font-sans font-medium text-4xl md:text-5xl tracking-tight leading-[1] text-text-primary mb-8">
            Why <span className="text-accent">Sigilix?</span>
          </h2>
          <div className="space-y-5 text-lg text-text-secondary leading-relaxed">
            <p>
              A sigil is a mark of intent — a glyph pressed into wax to prove authenticity and guard against tampering. For centuries, a seal meant a document had been witnessed.
            </p>
            <p>
              Sigilix brings that same guarantee to software. Every review is a deliberate, multi-specialist mark stamped onto your pull request: a signal to your team that the code has been seen, cross-checked, and authenticated. No magic. Just intent — automated at scale.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
