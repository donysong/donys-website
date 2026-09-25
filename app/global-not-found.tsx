/* 404 — 주소가 어떤 경로와도 안 맞을 때 Next 가 **레이아웃을 건너뛰고** 이 문서를 그대로 낸다
   (`next.config.ts` `experimental.globalNotFound`). 정적 export 에선 `out/404.html` 로 구워지고
   Cloudflare Pages 가 모르는 주소에 이걸 준다.
   🔴 레이아웃을 안 타므로 CSS·`<html>` 을 여기서 직접 가져온다 — 레이아웃과 같은 순서로(`globals` → `site3p` → `site4`).
   🔴 언어를 알 수 없는 면이라 한 장에 두 언어를 싣는다. 셸의 EN/KO 전환은 끈다 — `/ko` 를 앞에 붙인
   주소도 없는 주소다. */
import type { Metadata } from 'next';
import './globals.css';
import './site3p.css';
import './site4.css';
import SiteHtml from '@/components/shell/SiteHtml';
import ReadingShell from '@/components/ReadingShell';

export const metadata: Metadata = {
  title: 'Page not found — You Name It',
  robots: { index: false, follow: false },
  icons: { icon: '/icon.png', apple: '/apple-touch-icon.png' },   // 레이아웃을 안 타므로 여기서 다시 건다
};

const ROWS = [
  { lang: 'en', line: 'There is no page at this address.', links: [['/', 'You Name It'], ['/ae', 'AE Plugin'], ['/ae/docs', 'Docs']] },
  { lang: 'ko', line: '이 주소에는 페이지가 없습니다.', links: [['/ko', 'You Name It'], ['/ko/ae', 'AE Plugin'], ['/ko/ae/docs', 'Docs']] },
] as const;

export default function GlobalNotFound() {
  return (
    <SiteHtml lang="en">
      <ReadingShell lang="en" plate="s.plate.cover" langSwitch={false}>
        <p className="lab">404</p>
        {ROWS.map((r) => (
          <div key={r.lang} lang={r.lang} className="mt-8 max-w-3xl">
            <p className="text-[clamp(1.6rem,4vw,2.6rem)] leading-tight font-extrabold tracking-tight">{r.line}</p>
            <p className="mt-4 flex flex-wrap gap-3">
              {r.links.map(([href, label]) => (
                <a key={href} className="btn-line" href={href} data-cur>{label}</a>
              ))}
            </p>
          </div>
        ))}
      </ReadingShell>
    </SiteHtml>
  );
}
