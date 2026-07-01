import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { diagnoseRatelimit } from "@/lib/rate-limit";

const client = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY });

const SYSTEM_PROMPT =
  "You are an expert technical support engineer. When a user describes an issue, provide a clear, structured diagnosis:\n\n" +
  "1. **Root Cause(s)** — most likely reason(s) this is happening\n" +
  "2. **Verify** — quick checks to confirm the root cause\n" +
  "3. **Fix** — concrete steps to resolve it\n\n" +
  "Be specific, concise, and actionable. Use plain text with the section headers above.";

const MAX_ISSUE_LENGTH = 2000;
const MAX_LOG_LENGTH = 5000;

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const { success } = await diagnoseRatelimit.limit(ip);
  if (!success) {
    return new Response("Too many requests. Please try again later.", {
      status: 429,
    });
  }

  const body = await req.json() as { issue?: string; errorLog?: string };
  const issue = body.issue?.trim().slice(0, MAX_ISSUE_LENGTH);

  if (!issue) {
    return new Response("Issue description is required", { status: 400 });
  }

  const errorLog = body.errorLog?.trim().slice(0, MAX_LOG_LENGTH);
  const userMessage = errorLog
    ? `${issue}\n\nError log / stack trace:\n\`\`\`\n${errorLog}\n\`\`\``
    : issue;

  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      try {
        const stream = client.messages.stream({
          model: "claude-opus-4-8",
          max_tokens: 2048,
          thinking: { type: "adaptive" },
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: userMessage }],
        });

        stream.on("text", (text) => {
          controller.enqueue(encoder.encode(text));
        });

        await stream.finalMessage();
        controller.close();
      } catch (err) {
        controller.error(err);
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Accel-Buffering": "no",
    },
  });
}
