import type { Metadata } from "next";
import { PrimaryLink } from "../components/button";

export const metadata: Metadata = {
  title: "Features",
  description:
    "See how AI Support Desk diagnoses root causes, guides teams through resolution, and escalates to the right specialist — automatically.",
};

const features = [
  {
    id: "diagnose",
    number: "01",
    heading: "Diagnose",
    tagline: "Know exactly what broke — in seconds.",
    body: [
      "Most support incidents waste their first hour chasing the wrong cause. AI Support Desk reads logs, stack traces, error messages, and system metrics together, then surfaces the most likely root cause with an explanation a junior engineer can act on.",
      "It cross-references your incident history so recurring patterns are flagged immediately. If the same database timeout caused three outages in the past month, you see that context before you even start investigating.",
    ],
    capabilities: [
      "Log and stack trace parsing across services",
      "Semantic error analysis — not just keyword matching",
      "Historical pattern detection from past incidents",
      "Correlation of metrics, logs, and alerts in one view",
    ],
  },
  {
    id: "troubleshoot",
    number: "02",
    heading: "Troubleshoot",
    tagline: "A guided path to resolution, not a blank page.",
    body: [
      "Once the root cause is identified, AI Support Desk generates a step-by-step resolution workflow tailored to your environment. Steps adapt based on what your team reports back — if a step doesn't resolve the issue, the path branches to alternative approaches automatically.",
      "Every workflow your team completes feeds back into the system. Over time, your most effective playbooks surface to the top, and edge cases that stumped the team before get captured so the next engineer has an answer waiting.",
    ],
    capabilities: [
      "Dynamic, branching resolution workflows",
      "Knowledge base integration — pull from Confluence, Notion, or custom docs",
      "Step-level feedback to track what worked and what didn't",
      "Runbook generation from resolved incidents",
    ],
  },
  {
    id: "escalate",
    number: "03",
    heading: "Escalate",
    tagline: "Get the right human involved — with full context.",
    body: [
      "Some issues need a specialist. When AI Support Desk reaches the limit of automated resolution, it doesn't just create a ticket — it hands off a complete brief: the root cause hypothesis, every diagnostic step already taken, and a priority score based on customer impact and SLA proximity.",
      "Routing is based on team expertise, current load, and on-call schedules. The specialist who picks it up knows exactly where to start instead of starting from scratch.",
    ],
    capabilities: [
      "Expertise-based routing across teams and individuals",
      "Automatic context package — no copy-pasting from Slack",
      "Priority scoring using impact, urgency, and SLA data",
      "On-call schedule integration",
    ],
  },
];

export default function FeaturesPage() {
  return (
    <main className="flex-1">
      <section className="px-6 py-20 text-center" aria-labelledby="features-heading">
        <div className="mx-auto max-w-3xl">
          <h1
            id="features-heading"
            className="text-4xl font-bold tracking-tight sm:text-5xl"
          >
            Built for teams that can&apos;t afford slow
          </h1>
          <p className="mt-6 text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Three capabilities that work together to cut time-to-resolution —
            from the first alert to the closed ticket.
          </p>
        </div>
      </section>

      <div className="px-6 pb-24">
        <div className="mx-auto max-w-4xl flex flex-col gap-16">
          {features.map((feature) => (
            <section
              key={feature.id}
              id={feature.id}
              aria-labelledby={`${feature.id}-heading`}
              className="rounded-2xl border border-foreground/10 p-8 sm:p-12"
            >
              <div className="flex items-start gap-6 mb-6">
                <span
                  className="text-3xl font-bold tabular-nums shrink-0 leading-none"
                  style={{ color: "color-mix(in srgb, var(--foreground) 20%, transparent)" }}
                  aria-hidden="true"
                >
                  {feature.number}
                </span>
                <div>
                  <h2
                    id={`${feature.id}-heading`}
                    className="text-2xl font-semibold"
                  >
                    {feature.heading}
                  </h2>
                  <p className="mt-1 text-base font-medium text-foreground/60">
                    {feature.tagline}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4 mb-8">
                {feature.body.map((paragraph, i) => (
                  <p key={i} className="text-foreground/75 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div
                className="rounded-xl p-6"
                style={{
                  background:
                    "color-mix(in srgb, var(--foreground) 4%, transparent)",
                }}
              >
                <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground/50 mb-4">
                  What&apos;s included
                </h3>
                <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2" role="list">
                  {feature.capabilities.map((cap) => (
                    <li
                      key={cap}
                      className="text-sm text-foreground/70 flex items-start gap-2"
                    >
                      <span
                        className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground/40 shrink-0"
                        aria-hidden="true"
                      />
                      {cap}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
        </div>
      </div>

      <section
        className="px-6 py-16 text-center border-t border-foreground/10"
        aria-labelledby="cta-heading"
      >
        <div className="mx-auto max-w-xl">
          <h2 id="cta-heading" className="text-2xl font-semibold">
            Ready to reduce your MTTR?
          </h2>
          <p className="mt-3 text-foreground/70">
            Get in touch and we&apos;ll show you how AI Support Desk fits your
            team&apos;s workflow.
          </p>
          <div className="mt-8">
            <PrimaryLink href="/contact" size="lg">
              Contact us
            </PrimaryLink>
          </div>
        </div>
      </section>
    </main>
  );
}
