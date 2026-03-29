export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-14 text-center">
      {/* Background glow */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)] opacity-[0.07] blur-[120px]" />

      <div className="relative z-10 max-w-3xl">
        <div className="mb-4 inline-block rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-4 py-1.5 text-xs text-neutral-400">
          After Effects Workflow Plugin
        </div>

        <h1 className="mb-6 text-5xl font-extrabold leading-tight tracking-tight md:text-7xl">
          Everything you need.
          <br />
          <span className="gradient-text">One panel.</span>
        </h1>

        <p className="mx-auto mb-10 max-w-xl text-lg text-neutral-400 leading-relaxed">
          Scripts, text animation presets, gradient library, graph editor, expression editor,
          and smart widgets — all in a single After Effects panel.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#pricing"
            className="rounded-xl bg-[var(--accent)] px-8 py-3 text-base font-semibold text-white transition hover:bg-[var(--accent-light)] glow"
          >
            Get Dony's — $30
          </a>
          <a
            href="#demo"
            className="rounded-xl border border-[var(--border)] px-8 py-3 text-base font-medium text-neutral-300 transition hover:border-neutral-500 hover:text-white"
          >
            Watch Demo
          </a>
        </div>
      </div>

      {/* Hero image placeholder */}
      <div className="relative z-10 mt-16 w-full max-w-4xl overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] glow">
        <div className="flex h-[400px] items-center justify-center text-neutral-600">
          {/* TODO: Replace with actual screenshot or GIF */}
          <p className="text-sm">Plugin Screenshot / GIF Here</p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="mt-12 animate-bounce text-neutral-600">
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}
