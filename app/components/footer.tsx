export default function Footer() {
  return (
    <footer className="border-t border-foreground/10 px-6 py-8" aria-label="Site footer">
      <div className="mx-auto max-w-6xl text-center text-sm text-foreground/50">
        <p>&copy; {new Date().getFullYear()} AI Support Desk. All rights reserved.</p>
      </div>
    </footer>
  );
}
