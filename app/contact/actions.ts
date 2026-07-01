"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase";
import { contactRatelimit } from "@/lib/rate-limit";
import { validateContact } from "@/lib/validate-contact";

export type ContactFormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; errors: Partial<Record<"name" | "email" | "message" | "form", string>> };

const resend = new Resend(process.env.RESEND_API_KEY);
const TO = process.env.CONTACT_TO_EMAIL!;

export async function submitContact(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Honeypot — bots fill this, humans don't see it
  const honeypot = formData.get("website")?.toString() ?? "";
  if (honeypot) return { status: "success" };

  // Rate limit by IP — 3 submissions per hour
  const ip =
    (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  const { success } = await contactRatelimit.limit(ip);
  if (!success) {
    return {
      status: "error",
      errors: { form: "Too many submissions. Please try again in an hour." },
    };
  }

  const name = formData.get("name")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim() ?? "";
  const message = formData.get("message")?.toString().trim() ?? "";

  const fieldErrors = validateContact(name, email, message);
  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", errors: fieldErrors };
  }

  const { error } = await resend.emails.send({
    from: "AI Support Desk <onboarding@resend.dev>",
    to: TO,
    replyTo: email,
    subject: `New message from ${name}`,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-wrap">${message}</p>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return {
      status: "error",
      errors: { form: "Failed to send your message. Please try again." },
    };
  }

  await supabase
    .from("contact_submissions")
    .insert({ name, email, message });

  return { status: "success" };
}
