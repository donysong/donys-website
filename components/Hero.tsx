'use client';

import Plate from './Plate';
import { Spot } from './Spots';
import { PRICE } from '@/lib/product';

/* 🔴 데모 자리는 **실 AE 화면 녹화**다 (계획서 §7 ① — 오너 자산).
   지금 들어 있는 poster-chat.png 는 구 합성 목업이고 자리 표시다.
   목업으로 대체하지 마라 — 브랜드 가이드 "우리가 먼저 쓴 물건만 판매". */
export default function Hero() {
  return (
    <section className="mx-auto max-w-[1240px] px-6 pb-6 pt-14 md:px-10 md:pt-20">
      {/* 🔴 스탬프와 헤드라인은 **그리드 밖**이다 (2026-09-14 수리).
          안에 두면 판(`width:max-content`)이 그리드 아이템의 `min-width:auto` 를 밀어
          첫 칼럼이 7fr 을 넘어 부풀고, 그만큼 둘째 칼럼이 찌그러진다 — 실측으로
          **1136 : 112px**(의도는 677 : 483)였다. 즉 도판이 사라진 게 아니라 **활자가 먹었다.**
          `min-width:0` 으로 고치면 칼럼은 맞지만 활자가 도판 위를 덮는다. 헤드라인을 밖으로
          빼면 큰 활자와 도판이 둘 다 산다 — 폭 상한은 뷰포트가 쥔다(.display 의 max-width). */}
      <p className="stamp mono">
        <span className="dot" />
        After Effects panel · {PRICE} once
      </p>

      <h1 className="display" style={{ margin: '26px 0 30px' }}>
        {/* 오너 판정 2026-09-14 — 구 카피 "You think it. / It builds it." 교체.
            한 문장을 판 둘로 나눈다: 강세가 **names** 에 떨어져야 제품명과 맞물린다
            (브랜드 NAMING = "정답은 주지 않는다 — 붙이는 건 창작자가 한다"). */}
        <Plate register>Make things that</Plate>
        <Plate register className="delay-1">don’t have names yet.</Plate>
      </h1>

      <div className="grid items-start gap-12 lg:grid-cols-[7fr_5fr] lg:gap-14">
        <div>
          <p
            style={{
              maxWidth: '44ch',
              fontSize: 19,
              lineHeight: 1.55,
              color: 'var(--text-default)',
              margin: '0 0 30px',
            }}
          >
            Say what&apos;s in your head. It lands on{' '}
            <b style={{ color: 'var(--text-primary)', fontWeight: 700 }}>real layers</b>, with
            keyframes you can still tear apart. It replaces your hands —{' '}
            <b style={{ color: 'var(--text-primary)', fontWeight: 700 }}>not your judgment</b>.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            {/* 🔴 §3 의 예외 — 구매 CTA 만 평시에 면을 채운다 (§9.9 ③) */}
            <a className="cta-buy" href="#pricing" style={{ fontSize: 15 }}>
              <i className="rim" /><i className="bed" /><i className="grn" />
              Get it — {PRICE}
            </a>
            <a className="cta" href="#product" style={{ fontSize: 15 }}>
              Watch it land
            </a>
          </div>

          <p className="mono" style={{ marginTop: 22, color: 'var(--text-muted)' }}>
            One-time · 14-day refund · AE 2022+ · Windows &amp; macOS
          </p>
        </div>

        <div className="plate-card fig">
          <div className="screen showpiece asis">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/promo/poster-chat.webp"
                alt="The panel building a title card inside After Effects"
                width={1400}
                height={788}
                fetchPriority="high"
              />
          </div>
          <div className="fig-cap">
            <span className="fig-no">Fig. 01</span>
            <span>Chat · a title card being built</span>
            <span className="fig-hint">hover to develop</span>
          </div>

          {/* 여백을 장식으로 채우지 않는다 — **패널이 실제로 하는 동작**으로 채운다.
              시트는 툴 프리뷰 원본이라 이 세 칸이 곧 제품 증거다. */}
          <div className="spot-strip" style={{ marginTop: 30 }}>
            <Spot id="bentoGrid" />
            <Spot id="rgbSplit" />
            <Spot id="textExploder" />
          </div>
        </div>
      </div>
    </section>
  );
}
