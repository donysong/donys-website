'use client';

/* 모션 실험대 — 하우스 모션 정본(`globals.css` §하우스 모션)을 **실물 면 위에서** 본다.
   🔴 여기서 CSS 를 새로 만들지 마라. 이 페이지는 정본을 비추는 거울이고,
      거울에만 있는 모션은 사이트에 없는 모션이다. 값은 전부 globals.css 에서 온다. */

import { useState } from 'react';
import Plate from './Plate';

const RULES = [
  ['축이 하나다', '모든 이동은 등록축 (--rim-x, --rim-y) 위에서만. 수직 진입(translateY) 금지 — 그건 웹의 기본값이지 인쇄기의 동작이 아니다.'],
  ['곡선은 둘', '앉는 것 = --ease-press · 밀리는 것 = --ease-slip. 스크롤 구동만 linear 인데, 예외가 아니라 시계가 스크롤이라서다.'],
  ['시간은 4칸', 'nudge 130 · press 260 · register 460 · develop 620. 사이 값을 쓰지 마라.'],
  ['진입에 opacity 없음', '스크롤 타임라인은 뷰포트 밖 요소를 0% 진행으로 주차한다. 거기 opacity 가 있으면 내용이 사라진다(실측). 흰 판은 정합 상태에서 이미 안 보이므로 페이드가 필요 없다.'],
];

const TIMES = [
  ['--t-nudge', 130, '손이 닿았다', '호버 · 버튼'],
  ['--t-press', 260, '판이 한 칸 밀린다', '예비'],
  ['--t-register', 460, '판이 갈라져 앉는다', '제목 · 카드 진입'],
  ['--t-develop', 620, '현상', '스크린 → 컬러'],
] as const;

function Label({ children }: { children: React.ReactNode }) {
  return <div className="label" style={{ marginBottom: 10 }}>{children}</div>;
}

function Card({ title, sub, children }: { title: string; sub: string; children: React.ReactNode }) {
  return (
    <div className="card-rim">
      <div className="card" style={{ padding: '20px 20px 22px' }}>
        <div className="label" style={{ marginBottom: 4 }}>{title}</div>
        <p style={{ margin: '0 0 16px', fontSize: 13, lineHeight: 1.5, color: '#4a555b' }}>{sub}</p>
        {children}
      </div>
    </div>
  );
}

export default function MotionLab() {
  const [k, setK] = useState(0);
  const replay = () => setK((v) => v + 1);

  return (
    <main className="mx-auto max-w-[1180px] px-6 py-16 md:px-10">
      <div className="trim-rule" style={{ marginBottom: 30 }} />

      <header style={{ marginBottom: 46 }}>
        <div className="label" style={{ marginBottom: 14 }}>내부 문서 · 색인 안 됨</div>
        <Plate as="h1" className="headline" register key={`h${k}`} tone="black">
          모션 정본
        </Plate>
        <p style={{ maxWidth: 620, marginTop: 18, fontSize: 15, lineHeight: 1.65 }}>
          인쇄기에는 동작이 세 개뿐이다. 사이트에도 세 개뿐이다 —{' '}
          <b>판이 갈라진다 · 판이 밀린다 · 판이 현상된다.</b> 아래는 전부 실제 면에
          걸린 실제 CSS 다.
        </p>
        <button className="cta" onClick={replay} style={{ marginTop: 22 }}>
          ↻ 진입 모션 다시 돌리기
        </button>
      </header>

      {/* ── 1. 눈금 ─────────────────────────────────────────── */}
      <section style={{ marginBottom: 56 }}>
        <Plate as="h2" tone="black" className="mb-7" style={{ fontSize: 26, fontWeight: 800 }}>
          1 · 눈금
        </Plate>

        <div className="sheet" key={`t${k}`}>
          <Label>시간 4칸</Label>
          {TIMES.map(([tok, ms, what, where]) => (
            <div key={tok} style={{ display: 'grid', gridTemplateColumns: '150px 1fr 150px', gap: 14, alignItems: 'center', marginBottom: 12 }}>
              <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{tok}</code>
              <div style={{ position: 'relative', height: 12, width: `${(ms / 620) * 100}%`, background: 'rgba(0,0,0,.07)', borderRadius: 2, overflow: 'hidden' }}>
                <span
                  style={{
                    position: 'absolute', inset: 0, transformOrigin: 'left',
                    background: 'var(--ink-red)',
                    animation: `lab-bar ${ms}ms var(--ease-press) both`,
                  }}
                />
              </div>
              <div style={{ fontSize: 12, color: '#5c666b' }}>
                <span className="num">{ms}ms</span> · {what}
                <div style={{ opacity: .7 }}>{where}</div>
              </div>
            </div>
          ))}

          <div style={{ height: 1, background: 'var(--line)', margin: '26px 0 22px' }} />

          <Label>곡선 둘 — 역할로 고른다</Label>
          <div style={{ display: 'grid', gap: 26, gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))' }}>
            {[
              ['--ease-press', '앉는다', 'C16,16 27,0 100,0'],
              ['--ease-slip', '밀린다 (한 칸 오버슛)', 'C30,-32 50,0 100,0'],
            ].map(([tok, what, d]) => (
              <div key={tok}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, marginBottom: 8 }}>
                  {tok} — {what}
                </div>
                <svg viewBox="-8 -46 116 156" style={{ width: '100%', maxWidth: 200, display: 'block' }} aria-hidden>
                  <path d="M0,100 H100 M0,0 H100" stroke="var(--line)" strokeWidth="1" fill="none" />
                  <path d={`M0,100 ${d}`} stroke="var(--ink-black)" strokeWidth="2.5" fill="none" />
                </svg>
                <div style={{ position: 'relative', height: 14, marginTop: 10, width: 180, borderTop: '1px solid var(--line)' }}>
                  <span style={{ position: 'absolute', top: 3, left: 0, width: 8, height: 8, borderRadius: '50%', background: 'var(--ink-red)', animation: `lab-run var(--t-register) var(${tok}) both` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. 동작 3종 ─────────────────────────────────────── */}
      <section style={{ marginBottom: 56 }}>
        <Plate as="h2" tone="black" className="mb-7" style={{ fontSize: 26, fontWeight: 800 }}>
          2 · 동작 3종
        </Plate>

        <div className="sweep" style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))' }}>
          <Card title="① register — 판이 갈라진다" sub="완전 정합(0,0)에서 우리가 찍는 어긋남으로. 흰 판은 정합 상태에서 녹아웃 판과 포개져 이미 안 보인다 — 그래서 페이드가 필요 없다.">
            <div key={`r${k}`} style={{ padding: '14px 0' }}>
              <Plate register className="headline" style={{ fontSize: 40, fontWeight: 800 }}>
                REGISTER
              </Plate>
            </div>
          </Card>

          <Card title="② slip — 한 칸 더 밀린다" sub="호버해봐라. 방향은 전 사이트가 하나(↖)다. 예전엔 카드가 반대로 가서 나란한 둘이 갈라졌다.">
            <div className="plate-card" style={{ marginTop: 4 }}>
              <div className="stock-black" style={{ padding: 18 }}>
                <div style={{ color: 'var(--ink-white)', fontWeight: 700, fontSize: 15 }}>검정 종이 · 흰 밑판</div>
                <div style={{ color: 'rgba(246,244,238,.62)', fontSize: 12, marginTop: 6 }}>hover → ↖ ×2</div>
              </div>
            </div>
          </Card>

          <Card title="③ develop — 현상된다" sub="정지 = 인쇄된 스크린 판. 호버 = 현상. 620ms · --ease-press.">
            <div className="screen" style={{ aspectRatio: '16/10', marginTop: 4 }}>
              <div
                className="shot"
                style={{ backgroundImage: "url('/images/promo/poster-chat.webp')", backgroundSize: 'cover', backgroundPosition: 'center' }}
              />
            </div>
          </Card>

          <Card title="CTA — 누름은 정합이다" sub="호버 = 밑판에서 반 칸 뜬다. 누름 = 밑판에 정확히 포갠다. 등록축 밖 값(1px,1px)을 다시 넣지 마라.">
            <button className="cta-buy" style={{ marginTop: 4 }}>
              <i className="rim" /><i className="bed" /><i className="grn" />
              눌러봐라
            </button>
          </Card>
        </div>
      </section>

      {/* ── 3. 스크롤 구동 ──────────────────────────────────── */}
      <section style={{ marginBottom: 56 }}>
        <Plate as="h2" tone="black" className="mb-7" style={{ fontSize: 26, fontWeight: 800 }}>
          3 · 스크롤 구동 · 줄 훑기
        </Plate>
        <p style={{ maxWidth: 620, fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
          JS 0 · <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>animation-timeline: view()</code>.
          스크롤 타임라인엔 <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>animation-delay</code> 가
          안 먹으므로 스태거는 <b>구간을 밀어서</b> 만든다 — 프레스가 줄을 한 번 훑고 지나간다.
          천천히 스크롤해라.
        </p>
        {[0, 1, 2].map((row) => (
          <div key={row} className="sweep" style={{ display: 'grid', gap: 20, gridTemplateColumns: 'repeat(4,1fr)', marginBottom: 20 }}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="card-rim">
                <div className="card" style={{ padding: '26px 18px', textAlign: 'center' }}>
                  <span className="num" style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>
                    {row + 1}-{i + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </section>

      {/* ── 4. 규칙 ─────────────────────────────────────────── */}
      <section style={{ marginBottom: 40 }}>
        <Plate as="h2" tone="black" className="mb-7" style={{ fontSize: 26, fontWeight: 800 }}>
          4 · 규칙
        </Plate>
        <div className="sheet">
          <ol style={{ margin: 0, paddingLeft: 22, display: 'grid', gap: 16 }}>
            {RULES.map(([t, d]) => (
              <li key={t} style={{ fontSize: 14, lineHeight: 1.6 }}>
                <b>{t}</b>
                <div style={{ color: '#4a555b', marginTop: 3 }}>{d}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="trim-rule" />
    </main>
  );
}
