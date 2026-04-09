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
    <section id="pricing" className="mx-auto max-w-[1200px] px-6 py-32">
      <div className="section-divider mb-32" />
      <div className="mb-16 text-center">
        <p className="mb-4 text-[12px] font-medium uppercase tracking-[0.54px] text-[var(--text-muted)]">
          Pricing
        </p>
        <h2 className="mb-4 text-[32px] font-semibold leading-[1.2] tracking-[-1.28px]">
          Simple pricing
        </h2>
        <p className="text-[16px] font-normal text-[var(--text-secondary)]">
          One-time purchase. No subscription. No hidden fees.
        </p>
      </div>

      <div className="mx-auto max-w-sm">
        <div className="card p-8">
          {/* Price */}
          <div className="mb-8 text-center">
            <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.54px] text-[var(--text-muted)]">Dony&apos;s</p>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-[48px] font-semibold leading-[1.0] tracking-[-2.4px]">$30</span>
              <span className="text-[14px] text-[var(--text-muted)]">USD</span>
            </div>
            <p className="mt-2 text-[14px] text-[var(--text-muted)]">one-time payment</p>
          </div>

          {/* Divider */}
          <div className="section-divider mb-6" />

          {/* Features list */}
          <ul className="mb-8 space-y-3">
            {INCLUDED.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[14px]">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-[var(--text)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
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
            className="block w-full rounded-md bg-[var(--text)] py-3 text-center text-[14px] font-medium text-[var(--bg)] transition-opacity hover:opacity-90"
          >
            Buy Now
          </a>

          <p className="mt-4 text-center text-[12px] text-[var(--text-muted)]">
            <a href="/refund" className="underline decoration-[var(--text-muted)] underline-offset-2 hover:text-[var(--text)]">14-day refund policy</a> &middot; AE 2022+ &middot; Windows &amp; macOS
          </p>
        </div>
      </div>

      {/* Comparison hint */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-[var(--text-muted)]">
        <span>Motion Tools Pro: $40</span>
        <span className="hidden sm:inline">/</span>
        <span>Flow: $19 (graph only)</span>
        <span className="hidden sm:inline">/</span>
        <span>AEJuice: subscription</span>
      </div>
    </section>
  );
}
