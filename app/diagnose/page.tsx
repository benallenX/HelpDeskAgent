import type { Metadata } from "next";
import DiagnoseForm from "./diagnose-form";

export const metadata: Metadata = {
  title: "Diagnose",
  description:
    "Describe your issue and get an AI-powered diagnosis with root cause analysis and step-by-step fixes.",
};

export default function DiagnosePage() {
  return (
    <main className="flex-1 px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-10">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-1"
            style={{ color: "color-mix(in srgb, var(--foreground) 35%, transparent)" }}
          >
            AI Diagnosis
          </p>
          <h1 className="text-3xl font-bold tracking-tight">
            Diagnose an issue
          </h1>
          <p className="mt-2 text-sm text-foreground/60 leading-relaxed">
            Describe what&rsquo;s going wrong. Claude will identify the root cause,
            tell you how to verify it, and walk you through a fix.
          </p>
        </div>

        <DiagnoseForm />
      </div>
    </main>
  );
}
