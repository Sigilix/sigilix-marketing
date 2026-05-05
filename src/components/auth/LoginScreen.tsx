"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Github, ShieldCheck, Mail } from "lucide-react"
import { ReactNode } from "react"

const APP_URL = "https://app.sigilix.ai"

interface Provider {
  label: string
  href: string
  icon: ReactNode
  primary?: boolean
  comingSoon?: boolean
  brand?: string
}

const PROVIDERS: Provider[] = [
  {
    label: "Continue with GitHub",
    href: `${APP_URL}/auth/github`,
    icon: <Github className="w-5 h-5" strokeWidth={1.6} />,
    primary: true,
  },
  {
    label: "Continue with GitLab",
    href: `${APP_URL}/auth/gitlab`,
    icon: <GitLabGlyph />,
    comingSoon: true,
    brand: "GitLab",
  },
  {
    label: "Continue with Bitbucket",
    href: `${APP_URL}/auth/bitbucket`,
    icon: <BitbucketGlyph />,
    comingSoon: true,
    brand: "Bitbucket",
  },
  {
    label: "Continue with Azure DevOps",
    href: `${APP_URL}/auth/azure`,
    icon: <AzureGlyph />,
    comingSoon: true,
    brand: "Azure DevOps",
  },
]

const SECONDARY_PROVIDERS: Provider[] = [
  {
    label: "Continue with Google",
    href: `${APP_URL}/auth/google`,
    icon: <GoogleGlyph />,
  },
  {
    label: "Continue with email",
    href: `${APP_URL}/auth/email`,
    icon: <Mail className="w-5 h-5" strokeWidth={1.6} />,
  },
]

const EASE = [0.22, 1, 0.36, 1] as const

export function LoginScreen() {
  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 px-6 md:px-8 min-h-[calc(100vh-4rem)] flex items-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(circle at 50% 30%, rgba(198,35,74,0.08), transparent 55%), radial-gradient(circle at 50% 80%, rgba(198,35,74,0.05), transparent 60%)",
        }}
      />
      <div className="mx-auto w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="relative bg-surface border border-border rounded-sm p-8 md:p-10 shadow-[0_0_80px_-30px_var(--color-accent-glow)]"
        >
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-12 h-12 rounded-sm bg-canvas border border-border flex items-center justify-center mb-5">
              <Image
                src="/sigil-logo.png"
                alt="Sigilix"
                width={26}
                height={26}
                className="logo-invert"
                priority
              />
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-3">
              Sigilix
            </p>
            <h1 className="font-sans font-medium text-3xl md:text-4xl tracking-tight leading-[1.05] text-text-primary mb-3">
              Welcome back.
            </h1>
            <p className="text-sm text-text-secondary leading-relaxed max-w-xs">
              Sign in with your code host. We&apos;ll set up the GitHub App in seconds and start
              reviewing your next PR.
            </p>
          </div>

          <div className="space-y-2.5">
            {PROVIDERS.map((p) => (
              <ProviderButton key={p.label} provider={p} />
            ))}
          </div>

          <div className="my-6 flex items-center gap-3" aria-hidden>
            <div className="flex-1 h-px bg-border-subtle" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted">
              or
            </span>
            <div className="flex-1 h-px bg-border-subtle" />
          </div>

          <div className="space-y-2.5">
            {SECONDARY_PROVIDERS.map((p) => (
              <ProviderButton key={p.label} provider={p} />
            ))}
          </div>

          <div className="mt-7 flex items-start gap-3 bg-canvas border border-border-subtle rounded-sm p-3.5">
            <ShieldCheck className="w-4 h-4 text-success mt-0.5 shrink-0" strokeWidth={1.6} />
            <p className="font-mono text-[11px] leading-relaxed text-text-secondary">
              Authentication is handled at{" "}
              <span className="text-text-primary">app.sigilix.ai</span>. Marketing pages never
              receive your credentials.
            </p>
          </div>
        </motion.div>

        <p className="mt-7 text-center font-sans text-sm text-text-secondary">
          Don&apos;t have an account?{" "}
          <a
            href={`${APP_URL}/signup`}
            className="text-text-primary hover:text-accent transition-colors underline-offset-4 hover:underline"
          >
            Sign up free →
          </a>
        </p>

        <p className="mt-5 text-center font-mono text-[11px] text-text-muted leading-relaxed">
          By continuing, you agree to our{" "}
          <a href="/terms" className="text-text-secondary hover:text-text-primary transition-colors">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-text-secondary hover:text-text-primary transition-colors">
            Privacy Policy
          </a>
          .
        </p>

        <p className="mt-6 text-center font-sans text-xs text-text-muted">
          Want to compare plans first?{" "}
          <a
            href="/pricing"
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            See pricing
          </a>
        </p>
      </div>
    </section>
  )
}

function ProviderButton({ provider }: { provider: Provider }) {
  const disabled = provider.comingSoon
  const baseClasses =
    "group flex items-center gap-3 h-12 rounded-sm font-sans text-sm font-medium transition-colors w-full px-4"

  if (disabled) {
    return (
      <div
        aria-disabled
        title="Coming soon"
        className={`${baseClasses} bg-surface-raised text-text-muted border border-border-subtle cursor-not-allowed`}
      >
        <span className="opacity-70">{provider.icon}</span>
        <span className="flex-1 text-left">{provider.label}</span>
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent border border-accent/40 px-1.5 py-0.5 rounded-sm">
          Soon
        </span>
      </div>
    )
  }

  return (
    <a
      href={provider.href}
      className={`${baseClasses} ${
        provider.primary
          ? "bg-accent text-white hover:bg-accent-hover"
          : "bg-surface-raised text-text-primary border border-border hover:border-text-secondary"
      }`}
    >
      {provider.icon}
      <span>{provider.label}</span>
    </a>
  )
}

function GoogleGlyph() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M21.6 12.227c0-.709-.063-1.39-.182-2.045H12v3.868h5.382a4.6 4.6 0 0 1-1.995 3.018v2.51h3.226c1.886-1.737 2.987-4.293 2.987-7.351z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.964-.895 6.62-2.422l-3.227-2.51c-.895.6-2.04.954-3.393.954-2.605 0-4.81-1.76-5.595-4.122H3.073v2.59A9.997 9.997 0 0 0 12 22z"
      />
      <path
        fill="#FBBC05"
        d="M6.405 13.9a6.011 6.011 0 0 1 0-3.8V7.51H3.073a9.998 9.998 0 0 0 0 8.98l3.332-2.59z"
      />
      <path
        fill="#EA4335"
        d="M12 5.977c1.468 0 2.786.504 3.823 1.495l2.864-2.864C16.96 3.027 14.696 2 12 2A9.997 9.997 0 0 0 3.073 7.51l3.332 2.59C7.19 7.737 9.395 5.977 12 5.977z"
      />
    </svg>
  )
}

function GitLabGlyph() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#FC6D26"
        d="m23.6 9.6-.03-.08L20.7 2.1a.75.75 0 0 0-1.42-.05L17.32 8H6.68L4.72 2.05A.75.75 0 0 0 3.3 2.1L.43 9.52l-.03.08a5.27 5.27 0 0 0 1.75 6.1l.01.01.03.02 4.32 3.24 2.14 1.62 1.31.99a.88.88 0 0 0 1.06 0l1.31-.99 2.14-1.62 4.34-3.26.02-.01a5.27 5.27 0 0 0 1.78-6.1z"
      />
    </svg>
  )
}

function BitbucketGlyph() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#2684FF"
        d="M.778 1.213a.768.768 0 0 0-.768.892l3.263 19.819a1.044 1.044 0 0 0 1.02.872h15.554a.768.768 0 0 0 .77-.65l3.262-20.04a.768.768 0 0 0-.77-.892zM14.52 15.53H9.522L8.17 8.466h7.561z"
      />
    </svg>
  )
}

function AzureGlyph() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#0078D4"
        d="M0 12.045v7.06l6.156 1.69V13.41L0 12.045zm7.105-1.575v9.84l8.42 2.31v-13.4l-8.42 1.25zm9.42-1.4V21.7L24 23.79V7.21l-7.475 1.86zM6.156 3.205 0 11.045l6.156-.39V3.205zm9.37-.32-8.42 7.225 8.42-.535V2.885zm.95.155v6.585L24 6.5z"
      />
    </svg>
  )
}
