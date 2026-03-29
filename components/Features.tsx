const FEATURES = [
  {
    title: 'Script Library',
    description: '20+ built-in scripts for everyday motion tasks. One click to run.',
    icon: '⚡',
    color: '#f59e0b',
  },
  {
    title: 'Text Presets',
    description: '50 text animation presets with expression-based easing. Instant In/Out.',
    icon: '✦',
    color: '#6366f1',
  },
  {
    title: 'Gradient Library',
    description: '50+ curated color gradients. Apply to solids and shapes instantly.',
    icon: '◆',
    color: '#ec4899',
  },
  {
    title: 'Graph Editor',
    description: 'Visual bezier curve editor with 21 built-in presets. Better than Flow.',
    icon: '◠',
    color: '#10b981',
  },
  {
    title: 'Expression Editor',
    description: 'CodeMirror-powered editor with syntax highlighting and AE autocomplete.',
    icon: '{ }',
    color: '#8b5cf6',
  },
  {
    title: 'Smart Widgets',
    description: 'Anchor point, sequence layers, keyframe clone — essential daily tools.',
    icon: '✧',
    color: '#06b6d4',
  },
];

export default function Features() {
  return (
    <section id="features" className="section-fade mx-auto max-w-5xl px-6 py-32">
      <div className="mb-16 text-center">
        <p className="mb-3 text-[13px] font-medium uppercase tracking-widest text-[var(--accent-light)]">
          Features
        </p>
        <h2 className="mb-5 text-3xl font-bold tracking-tight md:text-[2.5rem]">
          Six tools. <span className="gradient-text">One plugin.</span>
        </h2>
        <p className="mx-auto max-w-md text-[var(--text-secondary)]">
          Replace Flow, AEJuice, and scattered scripts with a single integrated plugin.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="group rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 transition-all duration-300 hover:border-[var(--border-hover)] hover:bg-[var(--bg-elevated)] glow-hover"
          >
            <div
              className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl text-base"
              style={{ background: f.color + '12', color: f.color }}
            >
              {f.icon}
            </div>
            <h3 className="mb-2 text-[15px] font-semibold">{f.title}</h3>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
