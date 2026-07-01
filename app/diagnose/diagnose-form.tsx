"use client";

import { useState } from "react";
import { PrimaryButton } from "../components/button";

const INPUT_CLASS =
  "w-full rounded-lg border border-foreground/20 bg-background px-4 py-2.5 text-sm placeholder:text-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 resize-y";

type Status = "idle" | "streaming" | "done" | "error";

export default function DiagnoseForm() {
  const [issue, setIssue] = useState("");
  const [errorLog, setErrorLog] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!issue.trim()) return;

    setOutput("");
    setStatus("streaming");

    try {
      const res = await fetch("/api/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ issue, errorLog }),
      });

      if (!res.ok || !res.body) {
        throw new Error(`${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        setOutput((prev) => prev + decoder.decode(value, { stream: true }));
      }

      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-foreground/10 p-8 sm:p-10 flex flex-col gap-6"
        aria-label="Issue diagnosis form"
      >
        <div className="flex flex-col gap-1.5">
          <label htmlFor="issue" className="text-sm font-medium">
            Describe the issue{" "}
            <span aria-hidden="true" className="text-foreground/40">
              *
            </span>
          </label>
          <textarea
            id="issue"
            rows={4}
            required
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            className={INPUT_CLASS}
            placeholder="e.g. My app crashes on startup after updating the database driver…"
            aria-required="true"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="error-log" className="text-sm font-medium">
            Error log or stack trace{" "}
            <span className="text-foreground/40 font-normal">(optional)</span>
          </label>
          <textarea
            id="error-log"
            rows={5}
            value={errorLog}
            onChange={(e) => setErrorLog(e.target.value)}
            className={INPUT_CLASS}
            placeholder="Paste any relevant error output, logs, or stack trace here…"
          />
        </div>

        <PrimaryButton
          type="submit"
          disabled={status === "streaming" || !issue.trim()}
          aria-disabled={status === "streaming"}
          className="self-start"
        >
          {status === "streaming" ? "Diagnosing…" : "Diagnose"}
        </PrimaryButton>
      </form>

      {status !== "idle" && (
        <div
          role="status"
          aria-live="polite"
          aria-label="Diagnosis output"
          className="rounded-2xl border border-foreground/10 p-8 sm:p-10"
        >
          {status === "error" ? (
            <p className="text-sm text-red-600 dark:text-red-400">
              Something went wrong — please try again.
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "color-mix(in srgb, var(--foreground) 35%, transparent)" }}
              >
                Diagnosis
              </p>
              <pre
                className="text-sm text-foreground/85 leading-relaxed whitespace-pre-wrap font-sans"
              >
                {output}
                {status === "streaming" && (
                  <span
                    className="inline-block w-0.5 h-4 bg-foreground/60 ml-0.5 align-middle animate-pulse"
                    aria-hidden="true"
                  />
                )}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
