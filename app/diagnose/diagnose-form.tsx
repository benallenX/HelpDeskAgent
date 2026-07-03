"use client";

import { useState } from "react";
import { PrimaryButton } from "../components/button";

const INPUT_CLASS =
  "w-full rounded-lg border border-foreground/20 bg-background px-4 py-2.5 text-sm placeholder:text-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 resize-y";

const MAX_ISSUE = 2000;
const MAX_LOG = 5000;

type Status = "idle" | "streaming" | "done" | "error" | "rate-limited";

const PRESET_ISSUES = [
  {
    label: "App crashes on startup",
    issue:
      "My Next.js app crashes immediately on startup after I upgraded a dependency.",
    errorLog:
      "TypeError: Cannot read properties of undefined (reading 'default')\n    at Object.<anonymous> (/app/node_modules/some-pkg/index.js:12:9)\n    at Module._compile (node:internal/modules/cjs/loader:1256:14)",
  },
  {
    label: "Database connection timeout",
    issue:
      "API requests time out connecting to the database in production, but everything works fine locally.",
    errorLog:
      "Error: connect ETIMEDOUT 10.0.0.5:5432\n    at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1595:16)",
  },
  {
    label: "Blank screen after login",
    issue:
      "Users see a blank white screen right after logging in successfully. No errors show up in the browser console.",
    errorLog: "",
  },
];

export default function DiagnoseForm() {
  const [issue, setIssue] = useState("");
  const [errorLog, setErrorLog] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

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

      if (res.status === 429) {
        setStatus("rate-limited");
        return;
      }

      if (!res.ok || !res.body) {
        setErrorMessage(
          "The diagnosis service hit an error on its end. Please try again in a moment."
        );
        setStatus("error");
        return;
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
      setErrorMessage(
        "Couldn't reach the server. Check your connection and try again."
      );
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
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium text-foreground/50">
            Try an example
          </p>
          <div className="flex flex-wrap gap-2">
            {PRESET_ISSUES.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => {
                  setIssue(preset.issue);
                  setErrorLog(preset.errorLog);
                }}
                className="text-xs rounded-full border border-foreground/15 px-3 py-1.5 text-foreground/70 hover:text-foreground hover:border-foreground/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

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
            maxLength={MAX_ISSUE}
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            className={INPUT_CLASS}
            placeholder="e.g. My app crashes on startup after updating the database driver…"
            aria-required="true"
          />
          {issue.length > MAX_ISSUE * 0.9 && (
            <p className="text-xs text-foreground/40 text-right">
              {issue.length}/{MAX_ISSUE}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="error-log" className="text-sm font-medium">
            Error log or stack trace{" "}
            <span className="text-foreground/40 font-normal">(optional)</span>
          </label>
          <textarea
            id="error-log"
            rows={5}
            maxLength={MAX_LOG}
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
          {status === "rate-limited" ? (
            <p className="text-sm text-foreground/70">
              You&apos;ve reached the limit (10 diagnoses per hour). Please try again later.
            </p>
          ) : status === "error" ? (
            <p className="text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
          ) : status === "streaming" && !output ? (
            <p className="text-sm text-foreground/50 flex items-center gap-2">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full bg-foreground/50 animate-pulse"
                aria-hidden="true"
              />
              Thinking through your issue — this can take up to 20 seconds…
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "color-mix(in srgb, var(--foreground) 35%, transparent)" }}
              >
                Diagnosis
              </p>
              <pre className="text-sm text-foreground/85 leading-relaxed whitespace-pre-wrap font-sans">
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
