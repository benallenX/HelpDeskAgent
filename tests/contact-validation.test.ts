import { describe, it, expect } from "vitest";
import { validateContact, EMAIL_RE } from "@/lib/validate-contact";

describe("EMAIL_RE", () => {
  it("accepts valid addresses", () => {
    expect(EMAIL_RE.test("user@example.com")).toBe(true);
    expect(EMAIL_RE.test("user+tag@sub.domain.co")).toBe(true);
    expect(EMAIL_RE.test("a@b.io")).toBe(true);
  });

  it("rejects invalid addresses", () => {
    expect(EMAIL_RE.test("notanemail")).toBe(false);
    expect(EMAIL_RE.test("missing@tld")).toBe(false);
    expect(EMAIL_RE.test("@nodomain.com")).toBe(false);
    expect(EMAIL_RE.test("spaces in@email.com")).toBe(false);
  });
});

describe("validateContact", () => {
  const valid = {
    name: "Alice",
    email: "alice@example.com",
    message: "Hello, I need help with this.",
  };

  it("returns no errors for valid input", () => {
    expect(validateContact(valid.name, valid.email, valid.message)).toEqual({});
  });

  describe("name field", () => {
    it("requires name", () => {
      const errors = validateContact("", valid.email, valid.message);
      expect(errors.name).toBe("Name is required.");
    });

    it("accepts a single character name", () => {
      const errors = validateContact("A", valid.email, valid.message);
      expect(errors.name).toBeUndefined();
    });
  });

  describe("email field", () => {
    it("requires email", () => {
      const errors = validateContact(valid.name, "", valid.message);
      expect(errors.email).toBe("Email is required.");
    });

    it("rejects malformed email", () => {
      const errors = validateContact(valid.name, "notanemail", valid.message);
      expect(errors.email).toBe("Enter a valid email address.");
    });

    it("accepts a valid email", () => {
      const errors = validateContact(valid.name, "user@company.org", valid.message);
      expect(errors.email).toBeUndefined();
    });
  });

  describe("message field", () => {
    it("requires message", () => {
      const errors = validateContact(valid.name, valid.email, "");
      expect(errors.message).toBe("Message is required.");
    });

    it("rejects messages shorter than 10 characters", () => {
      const errors = validateContact(valid.name, valid.email, "Too short");
      expect(errors.message).toBe("Message must be at least 10 characters.");
    });

    it("accepts message of exactly 10 characters", () => {
      const errors = validateContact(valid.name, valid.email, "1234567890");
      expect(errors.message).toBeUndefined();
    });
  });

  it("returns all errors when all fields are empty", () => {
    const errors = validateContact("", "", "");
    expect(Object.keys(errors)).toHaveLength(3);
    expect(errors.name).toBeDefined();
    expect(errors.email).toBeDefined();
    expect(errors.message).toBeDefined();
  });

  it("returns multiple independent errors", () => {
    const errors = validateContact("Bob", "bad-email", "short");
    expect(errors.name).toBeUndefined();
    expect(errors.email).toBeDefined();
    expect(errors.message).toBeDefined();
  });
});
