import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PrimaryLink, SecondaryLink } from "./components/button";

export const metadata: Metadata = {
  title: "AI Support Desk",
  description:
    "Diagnose, troubleshoot, and escalate issues faster with AI-powered support.",
};

interface FeatureItem {
  heading: string;
  description: string;
  icon: ReactNode;
}

const features: FeatureItem[] = [
  {
    heading: "Diagnose",
    description:
      "Instantly analyze logs, error messages, and system state to pinpoint the root cause before time is wasted chasing the wrong lead.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
  {
    heading: "Troubleshoot",
    description:
      "Follow guided, step-by-step resolution paths tailored to your specific issue, cutting mean-time-to-resolution dramatically.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    heading: "Escalate",
    description:
      "When human expertise is needed, route tickets to the right specialist instantly — complete with full context and priority scoring.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

function FeatureCard({ heading, description, icon }: FeatureItem) {
  return (
    <li>
      <article className="rounded-2xl border border-foreground/10 bg-background p-8 h-full flex flex-col gap-4 hover:border-foreground/25 transition-colors">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl"
          style={{
            background: "color-mix(in srgb, var(--foreground) 6%, transparent)",
          }}
          aria-hidden="true"
        >
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold">{heading}</h3>
          <p className="mt-2 text-sm text-foreground/70 leading-relaxed">
            {description}
          </p>
        </div>
      </article>
    </li>
  );
}

export default function Home() {
  return (
    <main className="flex-1">
      <section
        className="px-6 py-24 text-center"
        aria-labelledby="hero-heading"
      >
        <div className="mx-auto max-w-3xl">
          <h1
            id="hero-heading"
            className="text-4xl font-bold tracking-tight sm:text-6xl"
          >
            AI-powered support,
            <br className="hidden sm:block" /> at your fingertips
          </h1>
          <p className="mt-6 text-lg text-foreground/70 max-w-xl mx-auto leading-relaxed">
            Resolve issues faster with intelligent diagnosis, step-by-step
            troubleshooting, and seamless escalation to the right team.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <PrimaryLink href="/diagnose">Diagnose an issue</PrimaryLink>
            <SecondaryLink href="/features">Learn more</SecondaryLink>
          </div>
        </div>
      </section>

      <section
        className="px-6 py-20"
        aria-labelledby="overview-heading"
        style={{
          background: "color-mix(in srgb, var(--foreground) 3%, transparent)",
        }}
      >
        <div className="mx-auto max-w-6xl">
          <h2
            id="overview-heading"
            className="text-2xl font-semibold text-center mb-12"
          >
            Everything you need to resolve issues
          </h2>
          <ul
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            role="list"
            aria-label="Feature overview"
          >
            {features.map((feature) => (
              <FeatureCard key={feature.heading} {...feature} />
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
