import { RELEASES } from '@/lib/releases';
import { VERSION } from '@/lib/product';

/* 유지보수가 보이는 것 자체가 신뢰 신호다 (리서치 A — Jitter 는 주간 릴리스 노트를
   대놓고 마케팅한다). 노트 정본은 /update 이고 여기는 최근 3판만 보여준다.
   🔴 여기에 버전을 손으로 적지 마라 — lib/product.ts · lib/releases.ts 에서만 읽는다. */
export default function Notes() {
  const recent = RELEASES.slice(0, 3);
  return (
    <section className="mx-auto max-w-[1240px] px-6 pb-10 md:px-10">
      {/* T3 — 읽는 면 */}
      <div className="sheet" style={{ padding: 'clamp(22px, 3vw, 34px)' }}>
      <div className="flex flex-wrap items-baseline justify-between gap-4" style={{ marginBottom: 20 }}>
        <p className="mono" style={{ color: '#5a6266' }}>
          Press run · latest v{VERSION}
        </p>
        <a
          href="/update"
          className="mono"
          style={{ color: 'var(--ink-black)', textDecoration: 'underline', textUnderlineOffset: 4 }}
        >
          All release notes →
        </a>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {recent.map((r) => (
          <a key={r.version} href="/update" style={{ display: 'block' }}>
            <p className="mono num" style={{ color: 'var(--ink-red)', marginBottom: 8 }}>
              v{r.version} · {r.date}
            </p>
            {/* 🔴 릴리스 본문은 한국어다. 영문 랜딩에 그대로 얹으면 언어가 섞인다 —
                언어 판정(계획서 §10 ②, /ko) 전까지는 **몇 줄인지**만 말한다. */}
            <p style={{ fontSize: 14, lineHeight: 1.6, color: '#4a5257' }}>
              {r.items.length} change{r.items.length > 1 ? 's' : ''} in this release.
            </p>
          </a>
        ))}
      </div>
      </div>
    </section>
  );
}
