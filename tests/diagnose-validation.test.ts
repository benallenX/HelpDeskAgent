import { describe, it, expect } from "vitest";

// Pure helper that mirrors the validation in the route
function validateIssue(issue: unknown): boolean {
  return typeof issue === "string" && issue.trim().length > 0;
}

describe("diagnose input validation", () => {
  it("accepts a valid issue string", () => {
    expect(validateIssue("My app crashes on startup")).toBe(true);
  });

  it("rejects undefined", () => {
    expect(validateIssue(undefined)).toBe(false);
  });

  it("rejects null", () => {
    expect(validateIssue(null)).toBe(false);
  });

  it("rejects empty string", () => {
    expect(validateIssue("")).toBe(false);
  });

  it("rejects whitespace-only string", () => {
    expect(validateIssue("   ")).toBe(false);
  });

  it("rejects non-string types", () => {
    expect(validateIssue(42)).toBe(false);
    expect(validateIssue({})).toBe(false);
    expect(validateIssue([])).toBe(false);
  });
});
