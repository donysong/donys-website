export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center overflow-hidden px-6 pt-40 pb-20">
      {/* Subtle gradient wash */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-white/[0.02] blur-[120px]" />
      </div>

      <div className="relative z-10 my-auto max-w-[800px] text-center fade-in-up">
        <h1 className="mb-6 text-[clamp(2.5rem,5.5vw,3rem)] font-semibold leading-[1.0] tracking-[-2.4px]">
          The only After Effects plugin you&apos;ll ever need
        </h1>

        <p className="mx-auto mb-12 max-w-[520px] text-[18px] font-normal leading-[1.6] text-[var(--text-secondary)]">
          Scripts, text presets, gradients, graph editor, expression editor, and smart widgets — all in one plugin.
        </p>

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href="#pricing"
            className="rounded-md bg-[var(--text)] px-6 py-2.5 text-[14px] font-medium text-[var(--bg)] transition-opacity hover:opacity-90"
          >
            Get Dony&apos;s — $30
          </a>
          <a
            href="#demo"
            className="rounded-md px-6 py-2.5 text-[14px] font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text)]"
            style={{ boxShadow: 'var(--shadow-border) 0px 0px 0px 1px' }}
          >
            Watch Demo
          </a>
        </div>
      </div>

      {/* Hero image */}
      <div className="relative z-10 mx-auto mt-20 w-full max-w-[1100px] fade-in-up delay-200">
        <div className="card overflow-hidden rounded-xl">
          <img
            src="/images/hero-screenshot.svg"
            alt="Dony's After Effects plugin — Script Grid, Gradient Library, and Graph Editor panels"
            className="w-full"
          />
        </div>
        <div className="pointer-events-none absolute -bottom-px left-0 right-0 h-40 bg-gradient-to-t from-[var(--bg)] to-transparent" />
      </div>
    </section>
  );
}
