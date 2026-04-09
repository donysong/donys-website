export default function Demo() {
  return (
    <section id="demo" className="mx-auto max-w-[1200px] px-6 py-32">
      <div className="section-divider mb-32" />
      <div className="mb-16 max-w-[600px]">
        <p className="mb-4 text-[12px] font-medium uppercase tracking-[0.54px] text-[var(--text-muted)]">
          Demo
        </p>
        <h2 className="mb-4 text-[32px] font-semibold leading-[1.2] tracking-[-1.28px]">
          See it in action
        </h2>
        <p className="text-[16px] font-normal leading-[1.6] text-[var(--text-secondary)]">
          Watch how Dony&apos;s speeds up your After Effects workflow.
        </p>
      </div>

      {/* Video embed placeholder */}
      <div className="card overflow-hidden">
        <div className="relative aspect-video w-full">
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full text-xl text-[var(--text-muted)] transition-colors hover:text-[var(--text)]" style={{ boxShadow: 'var(--shadow-border) 0px 0px 0px 1px' }}>
                ▶
              </div>
              <p className="text-[14px] text-[var(--text-muted)]">Demo video coming soon</p>
            </div>
          </div>
        </div>
      </div>

      {/* Feature preview grid */}
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {[
          { label: 'Text Presets', src: '/images/feature-text-presets.svg' },
          { label: 'Graph Editor', src: '/images/feature-graph-editor.svg' },
          { label: 'Gradient Library', src: '/images/feature-gradient-library.svg' },
          { label: 'Expression Editor', src: '/images/feature-expression-editor.svg' },
        ].map(({ label, src }) => (
          <div key={label} className="card overflow-hidden">
            <img
              src={src}
              alt={`${label} panel preview`}
              className="w-full"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
