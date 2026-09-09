'use client';

import Plate from './Plate';
import { PRICE } from '@/lib/product';

/* 🔴 데모 자리는 **실 AE 화면 녹화**다 (계획서 §7 ① — 오너 자산).
   지금 들어 있는 poster-chat.png 는 구 합성 목업이고 자리 표시다.
   목업으로 대체하지 마라 — 브랜드 가이드 "우리가 먼저 쓴 물건만 판매". */
export default function Hero() {
  return (
    <section className="mx-auto max-w-[1240px] px-6 pb-6 pt-14 md:px-10 md:pt-20">
      <div className="grid items-center gap-12 lg:grid-cols-[7fr_5fr] lg:gap-14">
        <div>
          <p className="stamp mono">
            <span className="dot" />
            After Effects panel · {PRICE} once
          </p>

          <h1 className="display" style={{ margin: '26px 0 24px' }}>
            <Plate register>You think it.</Plate>
            <Plate register className="delay-1">It builds it.</Plate>
          </h1>

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

        <div className="plate-card">
          <div className="stock-black" style={{ padding: 20 }}>
            <div className="screen">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/promo/poster-chat.webp"
                alt="The panel building a title card inside After Effects"
                width={1400}
                height={788}
                fetchPriority="high"
              />
            </div>
          </div>
          <p className="mono" style={{ marginTop: 14, color: 'var(--text-secondary)' }}>
            Black paper · screened{'  ·  '}
            <span style={{ color: 'var(--text-muted)' }}>hover to develop</span>
          </p>
        </div>
      </div>
    </section>
  );
}
