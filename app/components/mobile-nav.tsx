"use client";

import { useState } from "react";
import Link from "next/link";

const LINKS = [
  { href: "/diagnose", label: "Diagnose" },
  { href: "/features", label: "Features" },
  { href: "/contact", label: "Contact" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sm:hidden relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="mobile-nav-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="flex h-8 w-8 items-center justify-center rounded-md text-foreground/70 hover:text-foreground hover:bg-foreground/8 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        )}
      </button>

      {open && (
        <nav
          id="mobile-nav-menu"
          aria-label="Main navigation"
          className="absolute right-0 top-full mt-2 w-44 rounded-lg border border-foreground/10 bg-background shadow-lg py-2 z-50"
        >
          <ul role="list">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 text-sm text-foreground/70 hover:text-foreground hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-inset"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
