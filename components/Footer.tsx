export default function Footer() {
  return (
    <footer style={{ boxShadow: 'var(--shadow-border) 0px -1px 0px 0px' }}>
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-6 px-6 py-10 md:flex-row md:justify-between">
        <div>
          <span className="text-[15px] font-semibold tracking-[-0.32px]">Dony&apos;s</span>
          <p className="mt-1 text-[12px] text-[var(--text-muted)]">
            The only AE plugin you&apos;ll ever need.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-[13px] text-[var(--text-muted)]">
          <a href="mailto:support@donys.dev" className="transition-colors hover:text-[var(--text)]">
            Contact
          </a>
          <a href="#" className="transition-colors hover:text-[var(--text)]">
            Twitter
          </a>
          <a href="#" className="transition-colors hover:text-[var(--text)]">
            YouTube
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-[13px] text-[var(--text-muted)]">
          <a href="/terms" className="transition-colors hover:text-[var(--text)]">
            Terms
          </a>
          <a href="/privacy" className="transition-colors hover:text-[var(--text)]">
            Privacy
          </a>
          <a href="/refund" className="transition-colors hover:text-[var(--text)]">
            Refund
          </a>
        </div>

        <p className="text-[12px] text-[var(--text-muted)]">
          &copy; 2026 Dony&apos;s
        </p>
      </div>
    </footer>
  );
}
