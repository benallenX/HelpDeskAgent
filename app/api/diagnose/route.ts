import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

const client = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY });

const SYSTEM_PROMPT =
  "You are an expert technical support engineer. When a user describes an issue, provide a clear, structured diagnosis:\n\n" +
  "1. **Root Cause(s)** — most likely reason(s) this is happening\n" +
  "2. **Verify** — quick checks to confirm the root cause\n" +
  "3. **Fix** — concrete steps to resolve it\n\n" +
  "Be specific, concise, and actionable. Use plain text with the section headers above.";

export async function POST(req: NextRequest) {
  const body = await req.json() as { issue?: string; errorLog?: string };
  const issue = body.issue?.trim();

  if (!issue) {
    return new Response("Issue description is required", { status: 400 });
  }

  const userMessage = body.errorLog?.trim()
    ? `${issue}\n\nError log / stack trace:\n\`\`\`\n${body.errorLog.trim()}\n\`\`\``
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
