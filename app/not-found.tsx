import type { Metadata } from "next";
import { PrimaryLink } from "./components/button";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center">
      <div className="mx-auto max-w-sm">

        {/* Sleeping bunny */}
        <div
          className="mx-auto mb-10 w-56 h-56"
          style={{ color: "color-mix(in srgb, var(--foreground) 40%, transparent)" }}
        >
          <svg
            viewBox="0 0 200 200"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {/* Body — big curled oval */}
            <ellipse cx="94" cy="150" rx="66" ry="40" />

            {/* Head — circle nestled into top-right of body */}
            <circle cx="150" cy="108" r="28" />

            {/* Ear 1 — tall upright left ear */}
            <path d="M137 82 C131 58 133 32 139 25 C145 18 152 29 149 55 C147 69 143 80 137 82" />

            {/* Ear 2 — tall upright right ear */}
            <path d="M157 80 C157 55 160 30 166 26 C172 22 177 33 174 58 C172 71 164 80 157 80" />

            {/* Closed eyes — gentle arcs */}
            <path d="M139 106 Q144 101 149 106" />
            <path d="M153 106 Q158 101 163 106" />

            {/* Nose */}
            <ellipse
              cx="151"
              cy="116"
              rx="3"
              ry="2"
              fill="currentColor"
              stroke="none"
            />

            {/* Mouth */}
            <path d="M148 118 Q151 121 154 118" />

            {/* Front paws peeking out */}
            <ellipse cx="118" cy="163" rx="21" ry="9" />
            <ellipse cx="150" cy="170" rx="16" ry="8" />

            {/* Fluffy tail on the left */}
            <circle cx="38" cy="150" r="13" />

            {/* Zzz floating up and to the right */}
            <path d="M168 74 H180 L168 84 H180" />
            <path d="M177 59 H187 L177 67 H187" />
            <path d="M184 47 H191 L184 53 H191" />
          </svg>
        </div>

        <p className="text-xs font-semibold uppercase tracking-widest mb-3"
          style={{ color: "color-mix(in srgb, var(--foreground) 35%, transparent)" }}>
          404
        </p>

        <h1 className="text-3xl font-bold tracking-tight mb-3">
          This page is napping
        </h1>

        <p className="text-foreground/60 leading-relaxed mb-8">
          Looks like this page curled up and drifted off. Let&apos;s get you
          back somewhere useful.
        </p>

        <PrimaryLink href="/">Back to home</PrimaryLink>
      </div>
    </main>
  );
}
