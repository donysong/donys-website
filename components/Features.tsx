const FEATURES = [
  {
    title: 'Script Library',
    description: '20+ built-in scripts for everyday motion tasks. One click to run.',
    icon: '⚡',
    tag: 'SCRIPTS',
  },
  {
    title: 'Text Presets',
    description: '50 text animation presets with expression-based easing. Instant In/Out.',
    icon: '✦',
    tag: 'PRESETS',
  },
  {
    title: 'Gradient Library',
    description: '50+ curated color gradients. Apply to solids and shapes instantly.',
    icon: '◆',
    tag: 'GRADIENTS',
  },
  {
    title: 'Graph Editor',
    description: 'Visual bezier curve editor with 21 built-in presets. Better than Flow.',
    icon: '◠',
    tag: 'EASING',
  },
  {
    title: 'Expression Editor',
    description: 'CodeMirror-powered editor with syntax highlighting and AE autocomplete.',
    icon: '{ }',
    tag: 'EXPRESSIONS',
  },
  {
    title: 'Smart Widgets',
    description: 'Anchor point, sequence layers, keyframe clone — essential daily tools.',
    icon: '✧',
    tag: 'TOOLS',
  },
];

export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-[1200px] px-6 py-32">
      <div className="section-divider mb-24" />

      <div className="mb-16">
        <p className="label mb-4">Features</p>
        <h2
          style={{
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: '-0.03em',
            lineHeight: 1.2,
            color: 'var(--text-primary)',
            marginBottom: 12,
          }}
        >
          Six tools. One plugin.
        </h2>
        <p
          style={{
            fontSize: 15,
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            maxWidth: 440,
          }}
        >
          Replace Flow, AEJuice, and scattered scripts with a single integrated plugin.
        </p>
      </div>

      <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-3" style={{ border: '1px solid var(--border)' }}>
        {FEATURES.map((f, i) => (
          <div
            key={f.title}
            className="card-feature"
            style={{
              padding: '24px 24px 28px',
              borderTop: i >= 1 ? '1px solid var(--border)' : undefined,
              borderRight: undefined,
            }}
          >
            {/* Tag */}
            <p
              style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: 16,
              }}
            >
              {f.tag}
            </p>

            {/* Icon */}
            <div
              style={{
                fontSize: 18,
                color: 'var(--accent)',
                marginBottom: 14,
                lineHeight: 1,
              }}
            >
              {f.icon}
            </div>

            <h3
              style={{
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: '-0.01em',
                color: 'var(--text-primary)',
                marginBottom: 8,
              }}
            >
              {f.title}
            </h3>
            <p
              style={{
                fontSize: 13,
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
              }}
            >
              {f.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
