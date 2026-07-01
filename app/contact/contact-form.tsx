"use client";

import { useActionState } from "react";
import type { ReactNode } from "react";
import { submitContact, type ContactFormState } from "./actions";
import { PrimaryButton } from "../components/button";

const initialState: ContactFormState = { status: "idle" };

const INPUT_CLASS =
  "rounded-lg border border-foreground/20 bg-background px-4 py-2.5 text-sm placeholder:text-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 aria-[invalid=true]:border-red-500/60";

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}

function FormField({ id, label, error, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}{" "}
        <span aria-hidden="true" className="text-foreground/40">
          *
        </span>
      </label>
      {children}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-xs text-red-600 dark:text-red-400"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContact,
    initialState
  );

  if (state.status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-2xl border border-foreground/10 p-10 text-center"
      >
        <div
          className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full"
          style={{
            background: "color-mix(in srgb, var(--foreground) 6%, transparent)",
          }}
          aria-hidden="true"
        >
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
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold">Message received</h2>
        <p className="mt-2 text-foreground/70">
          Thanks for reaching out. We&apos;ll get back to you within one
          business day.
        </p>
      </div>
    );
  }

  const errors = state.status === "error" ? state.errors : {};

  return (
    <form
      action={formAction}
      noValidate
      className="rounded-2xl border border-foreground/10 p-8 sm:p-10 flex flex-col gap-6"
      aria-label="Contact form"
    >
      {state.status === "error" && Object.keys(errors).length > 0 && (
        <div
          role="alert"
          aria-live="assertive"
          className="rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-600 dark:text-red-400"
        >
          {errors.form ?? "Please fix the errors below before submitting."}
        </div>
      )}

      {/* Honeypot — hidden from real users, bots fill it in */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <FormField id="name" label="Name" error={errors.name}>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          aria-required="true"
          aria-describedby={errors.name ? "name-error" : undefined}
          aria-invalid={errors.name ? "true" : undefined}
          className={INPUT_CLASS}
          placeholder="Your name"
        />
      </FormField>

      <FormField id="email" label="Email" error={errors.email}>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          aria-required="true"
          aria-describedby={errors.email ? "email-error" : undefined}
          aria-invalid={errors.email ? "true" : undefined}
          className={INPUT_CLASS}
          placeholder="you@company.com"
        />
      </FormField>

      <FormField id="message" label="Message" error={errors.message}>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          rows={5}
          aria-required="true"
          aria-describedby={errors.message ? "message-error" : undefined}
          aria-invalid={errors.message ? "true" : undefined}
          className={`${INPUT_CLASS} resize-y`}
          placeholder="Describe how we can help…"
        />
      </FormField>

      <PrimaryButton
        type="submit"
        disabled={isPending}
        aria-disabled={isPending}
        className="self-start"
      >
        {isPending ? "Sending…" : "Send message"}
      </PrimaryButton>
    </form>
  );
}
