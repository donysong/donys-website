import { VERSION } from '@/lib/product';

/* 🔴 연락처는 **임시 gmail** 이다 (오너 2026-09-08). 원래 문구는 `support@donys.dev` 였는데
   그 도메인엔 A·MX 레코드가 없다 — `younameit.works` 도 MX 0 이라 메일이 안 온다.
   주소를 코드에서 임의로 바꾸지 마라. 티켓 =
   ../Dony-s-AE-Plugin/donys/docs/NEXT_TASKS.md 🔴 오너 판단 절. */
const LINK = { color: 'var(--ink-black)', fontSize: 13.5, display: 'block', padding: '4px 0' };

export default function Footer() {
  return (
    <footer className="mx-auto max-w-[1240px] px-6 pb-16 pt-10 md:px-10">
      <div className="trim-rule" style={{ marginBottom: 30 }} />
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/riso/logo-white.webp" alt="You Name It" style={{ height: 40, marginBottom: 12 }} />
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', maxWidth: '32ch', lineHeight: 1.6 }}>
            An After Effects panel that builds what you describe, on layers you can still take apart.
          </p>
        </div>

        <div>
          <p className="mono" style={{ marginBottom: 8, color: 'var(--text-muted)' }}>Contact</p>
          <a style={LINK} href="mailto:support@younameit.works">support@younameit.works</a>
          <a style={LINK} href="/update">Update notes</a>
        </div>

        <div>
          <p className="mono" style={{ marginBottom: 8, color: 'var(--text-muted)' }}>Legal</p>
          <a style={LINK} href="/terms">Terms</a>
          <a style={LINK} href="/privacy">Privacy</a>
          <a style={LINK} href="/refund">Refund</a>
        </div>

        <div>
          <p className="mono" style={{ marginBottom: 8, color: 'var(--text-muted)' }}>Press run</p>
          <p className="mono num" style={{ color: 'var(--ink-black)', letterSpacing: '.1em' }}>
            v{VERSION}
          </p>
          <p className="mono" style={{ color: 'var(--text-muted)', marginTop: 6 }}>
            © {new Date().getFullYear()} You Name It
          </p>
        </div>
      </div>
    </footer>
  );
}
