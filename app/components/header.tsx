import Link from "next/link";
import { AuthControls } from "./auth-controls";
import { ThemeToggle } from "./theme-toggle";

export default function Header() {
  return (
    <header className="border-b border-foreground/10 px-6 py-4">
      <div className="mx-auto max-w-6xl flex items-center justify-between">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight rounded hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
        >
          AI Support Desk
        </Link>
        <div className="flex items-center gap-6">
          <nav aria-label="Main navigation">
            <ul className="flex gap-6" role="list">
              <li>
                <Link
                  href="/diagnose"
                  className="text-sm text-foreground/70 hover:text-foreground rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
                >
                  Diagnose
                </Link>
              </li>
              <li>
                <Link
                  href="/features"
                  className="text-sm text-foreground/70 hover:text-foreground rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-foreground/70 hover:text-foreground rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
          <AuthControls />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
