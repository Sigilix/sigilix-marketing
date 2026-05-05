const FEATURES = [
  {
    title: "Inline seals",
    body:
      "Warden flags the insecure regex before you save. Spark warns on the expensive loop as you type it.",
  },
  {
    title: "Pre-PR sweep",
    body:
      "Run the full ensemble on your working branch from the command palette. Results land in the Problems panel, ranked by merge-blocking severity.",
  },
  {
    title: "Zero config",
    body:
      "The extension reads your repo's `sigilix.yaml` and learns your team's patterns automatically.",
  },
  {
    title: "Keyboard-first",
    body:
      "Jump between findings with native diagnostics shortcuts; never leave flow.",
  },
] as const

export function IDEFeatures() {
  return (
    <section className="relative py-24 md:py-32 px-6 md:px-8 border-t border-border-subtle">
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-secondary mb-4">
          What it will be
        </p>
        <h2 className="font-sans font-medium text-4xl md:text-5xl tracking-tight leading-[0.98] text-text-primary mb-16 max-w-3xl">
          Sigilix in your editor.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {FEATURES.map((f) => (
            <div key={f.title}>
              <h3 className="font-sans text-2xl font-medium text-text-primary mb-3">
                <span className="text-accent">·</span> {f.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
