"use client";

import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";

export function AuthControls() {
  const { isLoaded, isSignedIn } = useAuth();

  // Reserve space before Clerk loads client-side to prevent layout shift
  if (!isLoaded) return <div className="h-8 w-8" aria-hidden="true" />;

  if (isSignedIn) return <UserButton />;

  return (
    <SignInButton mode="modal">
      <button className="text-sm text-foreground/70 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 rounded">
        Sign in
      </button>
    </SignInButton>
  );
}
