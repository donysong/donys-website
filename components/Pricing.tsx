const INCLUDED = [
  '20+ built-in scripts',
  '50 text animation presets',
  '50+ gradient presets',
  'Graph editor with 21 curve presets',
  'Expression editor with autocomplete',
  'Smart widgets (anchor, sequence, clone)',
  'Multi-panel support (up to 4)',
  'Free minor updates',
  '2 devices per license',
];

export default function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-6 py-28">
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
          Simple pricing
        </h2>
        <p className="text-neutral-400">
          One-time purchase. No subscription. No hidden fees.
        </p>
      </div>

      <div className="mx-auto max-w-md rounded-2xl border border-[var(--accent)]/30 bg-[var(--bg-card)] p-8 glow">
        {/* Price */}
        <div className="mb-6 text-center">
          <div className="mb-1 text-sm font-medium text-[var(--accent-light)]">Dony's</div>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-5xl font-extrabold">$30</span>
            <span className="text-neutral-500">USD</span>
          </div>
          <div className="mt-2 text-sm text-neutral-500">one-time payment</div>
        </div>

        {/* Features list */}
        <ul className="mb-8 space-y-3">
          {INCLUDED.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm">
              <span className="mt-0.5 text-[var(--accent-light)]">✓</span>
              <span className="text-neutral-300">{item}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#"
          className="block w-full rounded-xl bg-[var(--accent)] py-3 text-center text-base font-semibold text-white transition hover:bg-[var(--accent-light)]"
        >
          {/* TODO: Replace with Lemon Squeezy checkout link */}
          Buy Now
        </a>

        <p className="mt-4 text-center text-xs text-neutral-600">
          14-day refund policy &middot; AE 2022+ &middot; Windows & macOS
        </p>
      </div>

      {/* Comparison hint */}
      <div className="mt-12 text-center text-sm text-neutral-600">
        Motion Tools Pro: $40 &middot; Flow: $19 (graph only) &middot; AEJuice: subscription
      </div>
    </section>
  );
}
