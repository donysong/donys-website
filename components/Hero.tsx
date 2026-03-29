export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center overflow-hidden px-6 pt-32 pb-14">
      {/* Background radial gradient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[var(--accent)] opacity-[0.04] blur-[150px]" />
        <div className="absolute top-1/3 left-1/4 h-[400px] w-[400px] rounded-full bg-purple-500 opacity-[0.03] blur-[120px]" />
      </div>

      <div className="relative z-10 my-auto max-w-3xl text-center fade-in-up">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/[0.03] px-4 py-1.5 text-[13px] text-[var(--text-secondary)] backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          After Effects Plugin
        </div>

        <h1 className="mb-6 text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.1] tracking-[-0.03em]">
          The only AE plugin
          <br />
          <span className="gradient-text">you&apos;ll ever need.</span>
        </h1>

        <p className="mx-auto mb-12 max-w-lg text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">
          Scripts, text presets, gradients, graph editor, expression editor,
          and smart widgets — all in one plugin.
        </p>

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href="#pricing"
            className="group relative rounded-xl bg-[var(--accent)] px-7 py-3 text-[15px] font-semibold text-white transition-all hover:brightness-110"
          >
            <span className="absolute inset-0 rounded-xl bg-[var(--accent)] opacity-40 blur-xl transition group-hover:opacity-60" />
            <span className="relative">Get Dony&apos;s — $30</span>
          </a>
          <a
            href="#demo"
            className="rounded-xl border border-[var(--border)] bg-white/[0.03] px-7 py-3 text-[15px] font-medium text-[var(--text-secondary)] transition hover:border-[var(--border-hover)] hover:text-[var(--text)]"
          >
            Watch Demo
          </a>
        </div>
      </div>

      {/* Hero image */}
      <div className="relative z-10 mx-auto mt-20 w-full max-w-5xl fade-in-up delay-200">
        <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] glow">
          <img
            src="/images/hero-screenshot.svg"
            alt="Dony's After Effects plugin — Script Grid, Gradient Library, and Graph Editor panels"
            className="w-full"
          />
        </div>
        {/* Bottom fade */}
        <div className="pointer-events-none absolute -bottom-px left-0 right-0 h-32 bg-gradient-to-t from-[var(--bg)] to-transparent" />
      </div>
    </section>
  );
}
