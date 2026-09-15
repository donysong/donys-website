import { VERSION } from '@/lib/product';

/* 연락처 = `support@younameit.works` (2026-09-15). Cloudflare Email Routing 이 서 있고
   (`dig MX` = route1/2/3.mx.cloudflare.net · SPF 존재) 오너 테스트 메일 실도착까지 확인했다.
   구 문구 `support@donys.dev` 는 A·MX 둘 다 없는 죽은 도메인이었고, 그 뒤 임시로 쓰던
   개인 gmail 두 개도 여기서 사라졌다. 주소를 코드에서 임의로 바꾸지 마라 — 법적 고지
   4곳(terms·privacy·refund·푸터 2종)이 같은 값을 들고 있다. */
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
