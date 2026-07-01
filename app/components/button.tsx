import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

const BASE =
  "inline-flex items-center justify-center rounded-full bg-foreground text-background text-sm font-medium transition-colors hover:bg-foreground/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2";

const SECONDARY =
  "inline-flex items-center justify-center rounded-full border border-foreground/20 text-sm font-medium transition-colors hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2";

const PADDING: Record<"default" | "lg", string> = {
  default: "px-6 py-3",
  lg: "px-8 py-3",
};

interface PrimaryLinkProps extends ComponentPropsWithoutRef<typeof Link> {
  size?: "default" | "lg";
}

export function PrimaryLink({
  size = "default",
  className = "",
  ...props
}: PrimaryLinkProps) {
  return (
    <Link
      className={`${BASE} ${PADDING[size]}${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

interface SecondaryLinkProps extends ComponentPropsWithoutRef<typeof Link> {
  size?: "default" | "lg";
}

export function SecondaryLink({
  size = "default",
  className = "",
  ...props
}: SecondaryLinkProps) {
  return (
    <Link
      className={`${SECONDARY} ${PADDING[size]}${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

interface PrimaryButtonProps extends ComponentPropsWithoutRef<"button"> {
  size?: "default" | "lg";
}

export function PrimaryButton({
  size = "lg",
  className = "",
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      className={`${BASE} ${PADDING[size]} disabled:opacity-50 disabled:cursor-not-allowed${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
