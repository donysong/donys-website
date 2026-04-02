export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)]">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 py-10 md:flex-row md:justify-between">
        <div>
          <span className="text-base font-semibold gradient-text">Dony&apos;s</span>
          <p className="mt-1 text-xs text-[var(--text-muted)]">
            The only AE plugin you&apos;ll ever need.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-[13px] text-[var(--text-muted)]">
          <a href="mailto:support@donys.dev" className="transition hover:text-[var(--text)]">
            Contact
          </a>
          {/* TODO: Add social links */}
          <a href="#" className="transition hover:text-[var(--text)]">
            Twitter
          </a>
          <a href="#" className="transition hover:text-[var(--text)]">
            YouTube
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-[13px] text-[var(--text-muted)]">
          <a href="/terms" className="transition hover:text-[var(--text)]">
            Terms of Service
          </a>
          <a href="/privacy" className="transition hover:text-[var(--text)]">
            Privacy Policy
          </a>
          <a href="/refund" className="transition hover:text-[var(--text)]">
            Refund Policy
          </a>
        </div>

        <p className="text-xs text-[var(--text-muted)]">
          &copy; 2026 Dony&apos;s. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
