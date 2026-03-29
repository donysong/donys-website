export default function Demo() {
  return (
    <section id="demo" className="section-fade mx-auto max-w-5xl px-6 py-32">
      <div className="mb-16 text-center">
        <p className="mb-3 text-[13px] font-medium uppercase tracking-widest text-[var(--accent-light)]">
          Demo
        </p>
        <h2 className="mb-5 text-3xl font-bold tracking-tight md:text-[2.5rem]">
          See it in action
        </h2>
        <p className="text-[var(--text-secondary)]">
          Watch how Dony&apos;s speeds up your After Effects workflow.
        </p>
      </div>

      {/* Video embed placeholder */}
      <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] glow">
        <div className="relative aspect-video w-full">
          {/* TODO: Replace with YouTube embed or video */}
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/[0.06] text-2xl text-[var(--text-muted)] transition hover:bg-white/[0.1] hover:text-[var(--text)]">
                ▶
              </div>
              <p className="text-sm text-[var(--text-muted)]">Demo video coming soon</p>
            </div>
          </div>
        </div>
      </div>

      {/* Feature preview grid */}
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {[
          { label: 'Text Presets', src: '/images/feature-text-presets.svg' },
          { label: 'Graph Editor', src: '/images/feature-graph-editor.svg' },
          { label: 'Gradient Library', src: '/images/feature-gradient-library.svg' },
          { label: 'Expression Editor', src: '/images/feature-expression-editor.svg' },
        ].map(({ label, src }) => (
          <div
            key={label}
            className="group overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] transition-all duration-300 hover:border-[var(--border-hover)] glow-hover"
          >
            <img
              src={src}
              alt={`${label} panel preview`}
              className="w-full transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
