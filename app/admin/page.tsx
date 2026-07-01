import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { supabase, type ContactSubmission } from "@/lib/supabase";

export const metadata: Metadata = { title: "Admin" };

const ADMIN_EMAIL = "admin@example.com";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default async function AdminPage() {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress;
  if (email !== ADMIN_EMAIL) redirect("/");

  const { data: submissions } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<ContactSubmission[]>();

  const rows = submissions ?? [];
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const thisWeek = rows.filter((r) => new Date(r.created_at) >= weekAgo).length;
  const thisMonth = rows.filter((r) => new Date(r.created_at) >= monthAgo).length;

  const stats = [
    { label: "Total submissions", value: rows.length },
    { label: "This week", value: thisWeek },
    { label: "This month", value: thisMonth },
    { label: "Latest", value: rows[0] ? formatDate(rows[0].created_at).split(",")[0] : "—" },
  ];

  return (
    <main className="flex-1 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-1"
            style={{ color: "color-mix(in srgb, var(--foreground) 35%, transparent)" }}
          >
            Admin
          </p>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-sm text-foreground/60">Signed in as {email}</p>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-foreground/10 p-5">
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-foreground/50 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Submissions table */}
        <div className="rounded-2xl border border-foreground/10 overflow-hidden">
          <div className="px-6 py-4 border-b border-foreground/10 flex items-center justify-between">
            <h2 className="text-sm font-semibold">Contact submissions</h2>
            <span className="text-xs text-foreground/40">{rows.length} total</span>
          </div>

          {rows.length === 0 ? (
            <div className="px-6 py-16 text-center text-sm text-foreground/40">
              No submissions yet — they&apos;ll appear here as people reach out.
            </div>
          ) : (
            <div className="divide-y divide-foreground/10">
              {rows.map((row) => (
                <div key={row.id} className="px-6 py-5 grid sm:grid-cols-[1fr_1fr_2fr] gap-2 sm:gap-6">
                  <div>
                    <p className="text-sm font-medium">{row.name}</p>
                    <a
                      href={`mailto:${row.email}`}
                      className="text-xs text-foreground/50 hover:text-foreground transition-colors"
                    >
                      {row.email}
                    </a>
                  </div>
                  <p className="text-xs text-foreground/40 sm:pt-0.5">
                    {formatDate(row.created_at)}
                  </p>
                  <p className="text-sm text-foreground/70 leading-relaxed line-clamp-2">
                    {row.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
