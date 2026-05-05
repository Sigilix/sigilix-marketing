"use client"

import { useState, type FormEvent } from "react"

export function IDEEarlyAccess() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!email.includes("@")) return
    // Backend integration TBD — front-end-only for now.
    setSubmitted(true)
  }

  return (
    <section className="relative py-24 md:py-32 px-6 md:px-8 border-t border-border-subtle">
      <div className="mx-auto max-w-md">
        <div className="bg-surface border border-border p-8 rounded-sm text-center">
          {submitted ? (
            <>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-success mb-4">
                You're on the list
              </p>
              <p className="text-text-primary leading-relaxed">
                We'll stamp your inbox when the IDE extension ships.
              </p>
            </>
          ) : (
            <>
              <h3 className="font-sans text-2xl font-medium text-text-primary mb-3">
                Join the early-access list
              </h3>
              <p className="text-text-secondary mb-8 leading-relaxed">
                Be the first to run the ensemble locally. We'll stamp your inbox when it's ready.
              </p>
              <form onSubmit={onSubmit} className="space-y-3">
                <label htmlFor="ide-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="ide-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full bg-canvas border border-border rounded-sm px-3 py-2 text-text-primary placeholder:text-text-muted focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full bg-accent text-white rounded-sm h-11 font-medium hover:bg-accent-hover transition-colors"
                >
                  Request early access
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
