import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AI Support Desk — Diagnose, troubleshoot, and escalate issues faster";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          padding: "80px",
        }}
      >
        {/* Wordmark */}
        <div
          style={{
            fontSize: 22,
            fontWeight: 600,
            color: "rgba(237,237,237,0.4)",
            letterSpacing: "0.05em",
            marginBottom: 40,
            textTransform: "uppercase",
          }}
        >
          AI Support Desk
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#ededed",
            lineHeight: 1.1,
            textAlign: "center",
            maxWidth: 900,
            marginBottom: 28,
          }}
        >
          Resolve issues faster with AI-powered support
        </div>

        {/* Sub */}
        <div
          style={{
            fontSize: 24,
            color: "rgba(237,237,237,0.55)",
            textAlign: "center",
            maxWidth: 700,
            lineHeight: 1.5,
          }}
        >
          Diagnose root causes, follow guided resolution paths, and escalate to the right team — automatically.
        </div>

        {/* Pills */}
        <div style={{ display: "flex", gap: 16, marginTop: 52 }}>
          {["Diagnose", "Troubleshoot", "Escalate"].map((label) => (
            <div
              key={label}
              style={{
                padding: "10px 24px",
                borderRadius: 999,
                border: "1px solid rgba(237,237,237,0.15)",
                color: "rgba(237,237,237,0.6)",
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
