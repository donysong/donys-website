import Plate from './Plate';

/* 🔴 이 절은 **오너 완성작**의 자리다 (계획서 §7 ② · §10 ③).
   자산이 아직 없다. 그래서 목업이나 스톡으로 채우지 않고 **빈 판**을 그대로 인쇄한다 —
   브랜드 가이드 BOUNDARIES("정직 ≠ 노출") 와 "우리가 먼저 쓴 물건만 판매" 를 지키는 유일한 방법이다.

   자산이 들어오면 WORKS 에 항목을 넣는다. 항목이 하나라도 있으면 빈 판은 사라진다.
   각 항목은 mp4 + 스틸 + **"무엇을 말했나" 한 줄**을 반드시 갖는다 — 그 한 줄이 이 절의 논지다. */
type Work = { title: string; said: string; poster: string; src?: string };
const WORKS: Work[] = [];

const SLOTS = ['Reserved', 'Reserved', 'Reserved'];

export default function Proof() {
  return (
    <section id="proof" className="mx-auto max-w-[1240px] px-6 py-20 md:px-10 md:py-28">
      <div className="trim-rule" style={{ marginBottom: 34 }} />
      <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="mono" style={{ color: 'var(--text-muted)', marginBottom: 14 }}>
            Plate 03 / 07 — proof
          </p>
          <h2 className="headline">
            <Plate as="span">Made with it, first.</Plate>
          </h2>
        </div>
        <p style={{ maxWidth: '38ch', fontSize: 15.5, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
          We only sell what we use. Everything below was built in After Effects with this panel —
          and each one says what was asked for.
        </p>
      </div>

      {WORKS.length > 0 ? (
        <div className="sweep grid gap-7 md:grid-cols-3">
          {WORKS.map((w) => (
            <figure key={w.title} className="plate-card" style={{ margin: 0 }}>
              <div className="stock-black" style={{ padding: 14 }}>
                <div className="screen">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={w.poster} alt={w.title} />
                </div>
              </div>
              <figcaption style={{ marginTop: 14 }}>
                <p className="mono" style={{ color: 'var(--ink-black)', marginBottom: 6 }}>Said</p>
                <p style={{ fontSize: 14.5, lineHeight: 1.55, color: 'var(--text-default)' }}>
                  “{w.said}”
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <div className="sweep grid gap-7 md:grid-cols-3">
          {SLOTS.map((label, i) => (
            <div key={i} className="plate-card">
              <div
                className="stock-black"
                style={{
                  aspectRatio: '16 / 10',
                  display: 'grid',
                  placeItems: 'center',
                  padding: 20,
                }}
              >
                <p className="mono" style={{ color: '#8d9aa0' }}>
                  {label} · plate {String(i + 1).padStart(2, '0')}
                </p>
              </div>
              <p className="mono" style={{ marginTop: 14, color: 'var(--text-muted)' }}>
                Awaiting press
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
