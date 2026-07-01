import type { Metadata } from "next";
import ContactForm from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the AI Support Desk team. We'll show you how to cut resolution time and fit the tool to your team's workflow.",
};

export default function ContactPage() {
  return (
    <main className="flex-1 px-6 py-20">
      <div className="mx-auto max-w-2xl">
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight">Get in touch</h1>
          <p className="mt-4 text-lg text-foreground/70 leading-relaxed">
            Whether you have a specific question or just want to see a demo,
            send us a message and we&apos;ll follow up within one business day.
          </p>
        </div>

        <ContactForm />
      </div>
    </main>
  );
}
