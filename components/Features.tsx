'use client';

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

const CHAT_SKILLS = [
  'Smooth Entrance', 'Snappy Entrance', 'Bouncy Overshoot',
  'Kinetic Typography', 'Counter Tick', 'Zoom Focus Pull',
  'Stroke Draw Reveal', 'Ambient Loop', '3D Depth Dolly', 'Multi-layer Build',
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
          Seven tools. One plugin.
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
          Now with Claude AI built in.
        </p>
      </div>

      {/* Chat — full-width featured card */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderLeft: '2px solid var(--accent)',
          padding: '28px 32px',
          marginBottom: 0,
          display: 'grid',
          gap: 24,
        }}
        className="md:grid-cols-[1fr_auto]"
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <p
              style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
              }}
            >
              AI CHAT
            </p>
            <span
              style={{
                fontSize: 8,
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '2px 7px',
                background: 'var(--accent-dim)',
                border: '1px solid var(--accent)',
                color: 'var(--accent)',
              }}
            >
              NEW
            </span>
          </div>

          <h3
            style={{
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              marginBottom: 8,
            }}
          >
            Claude AI inside After Effects
          </h3>
          <p
            style={{
              fontSize: 14,
              color: 'var(--text-secondary)',
              lineHeight: 1.65,
              marginBottom: 20,
              maxWidth: 560,
            }}
          >
            Type what you want. Claude reads your comp, writes ExtendScript, and builds animations directly —
            no manual keyframing. Includes 10 motion-archetype skills, saved prompts,
            multi-tab sessions, and a built-in CLAUDE.md editor to customize AI behavior.
          </p>

          {/* Skill chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {CHAT_SKILLS.map((skill) => (
              <span
                key={skill}
                style={{
                  fontSize: 9,
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  padding: '3px 8px',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-secondary)',
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Chat preview image */}
        <div
          style={{
            width: 220,
            flexShrink: 0,
            alignSelf: 'center',
            border: '1px solid var(--border)',
            overflow: 'hidden',
          }}
          className="hidden md:block"
        >
          <img
            src="/images/feature-chat.svg"
            alt="AI Chat panel preview"
            style={{ width: '100%', display: 'block' }}
          />
        </div>
      </div>

      {/* Other 6 features */}
      <div
        className="grid sm:grid-cols-2 lg:grid-cols-3"
        style={{ border: '1px solid var(--border)', borderTop: 'none' }}
      >
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="card-feature"
            style={{ padding: '24px 24px 28px' }}
          >
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
            <div style={{ fontSize: 18, color: 'var(--accent)', marginBottom: 14, lineHeight: 1 }}>
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
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {f.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
