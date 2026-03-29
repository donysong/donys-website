export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 md:flex-row md:justify-between">
        <div>
          <span className="text-lg font-bold gradient-text">Dony's</span>
          <p className="mt-1 text-xs text-neutral-600">
            All-in-One After Effects Workflow Panel
          </p>
        </div>

        <div className="flex gap-6 text-sm text-neutral-500">
          <a href="mailto:support@donys.dev" className="transition hover:text-white">
            Contact
          </a>
          {/* TODO: Add social links */}
          <a href="#" className="transition hover:text-white">
            Twitter
          </a>
          <a href="#" className="transition hover:text-white">
            YouTube
          </a>
        </div>

        <p className="text-xs text-neutral-700">
          &copy; 2026 Dony's. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
