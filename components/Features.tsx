const FEATURES = [
  {
    title: 'Script Library',
    description: '20+ built-in scripts for everyday motion tasks. One click to run.',
    icon: '⚡',
  },
  {
    title: 'Text Presets',
    description: '50 text animation presets with expression-based easing. Instant In/Out.',
    icon: '✦',
  },
  {
    title: 'Gradient Library',
    description: '50+ curated color gradients. Apply to solids and shapes instantly.',
    icon: '◆',
  },
  {
    title: 'Graph Editor',
    description: 'Visual bezier curve editor with 21 built-in presets. Better than Flow.',
    icon: '◠',
  },
  {
    title: 'Expression Editor',
    description: 'CodeMirror-powered editor with syntax highlighting and AE autocomplete.',
    icon: '{ }',
  },
  {
    title: 'Smart Widgets',
    description: 'Anchor point, sequence layers, keyframe clone — essential daily tools.',
    icon: '✧',
  },
];

export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-[1200px] px-6 py-32">
      <div className="section-divider mb-32" />
      <div className="mb-16 max-w-[600px]">
        <p className="mb-4 text-[12px] font-medium uppercase tracking-[0.54px] text-[var(--text-muted)]">
          Features
        </p>
        <h2 className="mb-4 text-[32px] font-semibold leading-[1.2] tracking-[-1.28px]">
          Six tools. One plugin.
        </h2>
        <p className="text-[16px] font-normal leading-[1.6] text-[var(--text-secondary)]">
          Replace Flow, AEJuice, and scattered scripts with a single integrated plugin.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <div key={f.title} className="card p-6">
            <div className="mb-4 text-lg">{f.icon}</div>
            <h3 className="mb-2 text-[16px] font-semibold tracking-[-0.32px]">{f.title}</h3>
            <p className="text-[14px] font-normal leading-[1.6] text-[var(--text-secondary)]">{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
