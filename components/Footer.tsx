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
          {/* 🔴 **임시 주소다** (오너 2026-09-08). 원래 문구는 `support@donys.dev` 였는데
              그 도메인은 **NS 조차 없다** — A·MX 도 없고 `https://donys.dev` 는 000 이다
              (2026-09-07 dig 실측). 사이트의 **유일한** 연락처이고 **환불 창구**라,
              메일이 아무 데도 안 가는 채로 라이브에 떠 있었다.
              🔴 도메인을 붙이면 4파일 13곳을 같이 되돌려라 — privacy·terms·refund·여기.
              (privacy 본문의 "our website (donys.dev)" 도 아직 죽은 호스트를 가리킨다.) */}
          <FooterLink label="donysong96@gmail.com" href="mailto:donysong96@gmail.com" />
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
