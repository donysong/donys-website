'use client';

import BrandMark from './BrandMark';

const LINK_STYLE: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 500,
  color: 'var(--text-muted)',
  transition: 'color .12s var(--ease-out)',
};

function FooterLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      style={LINK_STYLE}
      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
    >
      {label}
    </a>
  );
}

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--mat-elev)' }}>
      <div
        className="mx-auto px-6 py-12"
        style={{
          maxWidth: 1180,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '28px 40px',
        }}
      >
        <div>
          <BrandMark size={20} />
          <p style={{ marginTop: 12, fontSize: 12.5, color: 'var(--text-muted)', maxWidth: 260, lineHeight: 1.6 }}>
            You think it. It builds it — inside After Effects.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <p className="label" style={{ fontSize: 10 }}>Contact</p>
          <FooterLink label="support@donys.dev" href="mailto:support@donys.dev" />
          <FooterLink label="Update notes" href="/update" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <p className="label" style={{ fontSize: 10 }}>Legal</p>
          <FooterLink label="Terms" href="/terms" />
          <FooterLink label="Privacy" href="/privacy" />
          <FooterLink label="Refund" href="/refund" />
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--border)' }}>
        <div
          className="mx-auto px-6 py-5"
          style={{
            maxWidth: 1180,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px 20px',
            fontSize: 11.5,
            color: 'var(--text-muted)',
          }}
        >
          <span>&copy; 2026 You Name It</span>
          <span>After Effects 2022+ · Windows &amp; macOS</span>
        </div>
      </div>
    </footer>
  );
}
