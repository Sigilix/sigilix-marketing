"use client"

import { Github } from "lucide-react"

const STEPS = [
  "Sign in with GitHub",
  "Select your plan & complete payment",
  "Install the Sigilix app and choose repositories",
  "Your first seal arrives on the next PR — usually under 60 seconds",
] as const

export function AuthAction() {
  return (
    <section
      id="auth"
      className="relative py-16 md:py-24 px-6 md:px-8 border-t border-border-subtle"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h3 className="font-sans font-medium text-3xl md:text-4xl tracking-tight text-text-primary mb-8">
          Continue with GitHub
        </h3>
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="inline-flex items-center justify-center gap-3 bg-white text-canvas h-12 px-6 rounded-sm font-sans text-sm font-medium hover:bg-white/90 transition-colors min-w-[280px]"
        >
          <Github className="w-5 h-5" />
          Sign in with GitHub
        </a>
        <p className="font-mono text-xs text-text-muted mt-4">
          By signing in, you authorize the Sigilix GitHub App and agree to the Terms of Service.
        </p>

        {/* Stepper */}
        <div className="mt-16 md:mt-20">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-secondary mb-8">
            What happens next
          </p>
          <ol className="hidden md:grid md:grid-cols-4 gap-2 text-left">
            {STEPS.map((s, i) => (
              <li key={i} className="relative">
                <div className="bg-surface border border-border rounded-sm p-5 h-full">
                  <p className="font-mono text-xs text-accent uppercase tracking-[0.2em] mb-3">
                    Step {i + 1}
                  </p>
                  <p className="font-sans text-sm text-text-primary leading-relaxed">
                    {s}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <ol className="md:hidden space-y-3 text-left">
            {STEPS.map((s, i) => (
              <li
                key={i}
                className="flex items-start gap-4 bg-surface border border-border rounded-sm p-4"
              >
                <span className="font-mono text-xs text-accent uppercase tracking-[0.2em] shrink-0">
                  {i + 1}
                </span>
                <p className="font-sans text-sm text-text-primary leading-relaxed">
                  {s}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
