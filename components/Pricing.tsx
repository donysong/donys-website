const INCLUDED = [
  '20+ built-in scripts',
  '50 text animation presets',
  '50+ gradient presets',
  'Graph editor with 21 curve presets',
  'Expression editor with autocomplete',
  'Smart widgets (anchor, sequence, clone)',
  'Multi-panel support (up to 5)',
  'Free minor updates',
  '2 devices per license',
];

export default function Pricing() {
  return (
    <section id="pricing" className="section-fade mx-auto max-w-5xl px-6 py-32">
      <div className="mb-16 text-center">
        <p className="mb-3 text-[13px] font-medium uppercase tracking-widest text-[var(--accent-light)]">
          Pricing
        </p>
        <h2 className="mb-5 text-3xl font-bold tracking-tight md:text-[2.5rem]">
          Simple pricing
        </h2>
        <p className="text-[var(--text-secondary)]">
          One-time purchase. No subscription. No hidden fees.
        </p>
      </div>

      <div className="relative mx-auto max-w-sm">
        {/* Glow behind card */}
        <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-[var(--accent)] opacity-[0.06] blur-3xl" />

        <div className="relative rounded-2xl border border-[var(--accent)]/20 bg-[var(--bg-card)] p-8">
          {/* Price */}
          <div className="mb-8 text-center">
            <div className="mb-2 text-sm font-medium text-[var(--accent-light)]">Dony&apos;s</div>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-5xl font-bold tracking-tight">$30</span>
              <span className="text-[var(--text-muted)]">USD</span>
            </div>
            <div className="mt-2 text-sm text-[var(--text-muted)]">one-time payment</div>
          </div>

          {/* Divider */}
          <div className="mb-6 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />

          {/* Features list */}
          <ul className="mb-8 space-y-3">
            {INCLUDED.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-light)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-[var(--text-secondary)]">{item}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href="https://donysae.lemonsqueezy.com/checkout/buy/2280c131-6bd8-4d0b-8947-f94a8ed7f1b9"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block w-full rounded-xl bg-[var(--accent)] py-3 text-center text-[15px] font-semibold text-white transition hover:brightness-110"
          >
            Buy Now
          </a>

          <p className="mt-4 text-center text-xs text-[var(--text-muted)]">
            14-day refund policy &middot; AE 2022+ &middot; Windows &amp; macOS
          </p>
        </div>
      </div>

      {/* Comparison hint */}
      <div className="mt-16 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-[var(--text-muted)]">
        <span>Motion Tools Pro: $40</span>
        <span className="hidden sm:inline text-[var(--border-hover)]">/</span>
        <span>Flow: $19 (graph only)</span>
        <span className="hidden sm:inline text-[var(--border-hover)]">/</span>
        <span>AEJuice: subscription</span>
      </div>
    </section>
  );
}
