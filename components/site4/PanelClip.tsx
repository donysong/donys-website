'use client';
/* 패널 클립 — 출고본 패널이 **자기 동작을 하는** 짧은 루프 영상. 두 벌이다:
   · `wide` — `/ae` 기능 판 f1~f5. 패널을 16:9 창(768×432 · 1536×864)에 넓게 도킹한 그대로, 판 전체가 패널이다.
   · 기본(dock) — `/ae/docs` 01 개관의 도킹 프레임 안. 패널마다 제 폭(라이브 CEP 컷을 잰 값).

   🔴 무엇을 찍었나: 출고 태그의 패널 앱을 태그 소스 그대로(프로덕션 빌드 · 번들 폰트 · `styles/tokens.css`)
      브라우저에 띄우고 AE·CEP·Node 호출만 목으로 막았다. 커서(흰 화살표)만 얹은 것이다.
      30fps 를 한 장씩 찍어서(가짜 시계) 떨어진 프레임이 없고, 첫 프레임 = 끝 프레임이라 이음매가 없다.
      다시 찍기 = 플러그인 리포 `tools/promo/panelClips/`(README — 명령 한 줄씩).
   🔴 모델 출력은 없다. Chat 은 새 탭에 요청을 **쳐 넣기만** 하고 보내지 않는다(문장 = 패널 빈 화면의 예시 그대로).

   재생: 화면에 들어올 때만 받고 돈다(`preload="none"` + IntersectionObserver), 나가면 멈춘다.
   모션 줄이기 = 포스터(첫 프레임)만 — 영상 요소를 아예 안 만든다. 정적 HTML 도 포스터다(JS 가 붙으면 영상으로 바뀐다). */
import { useEffect, useRef, useState } from 'react';
import { useT } from '@/components/site3p/lang';
import './PanelClip.css';

/** dock 벌 — 찍은 창의 크기(CSS px) = 영상의 가로세로비. 키 = `DOCS_PANELS` 의 key. wide 벌은 전부 16:9 다. */
export const CLIPS = {
  toolbox: [395, 540],
  library: [610, 589],
  curves: [392, 478],
  expressions: [610, 600],
  chat: [1087, 175],
  'custom-1': [395, 480],
  support: [395, 680],
} as const;
export type ClipId = keyof typeof CLIPS;

const SRC = '/riso/panel-clips';

export type WideId = 'chat' | 'toolbox' | 'library' | 'curves' | 'custom-1';

export default function PanelClip({ id, label, wide = false }: { id: ClipId; label: string; wide?: boolean }) {
  const { lang } = useT();
  const [motion, setMotion] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);
  const base = `${SRC}${wide ? '/wide' : ''}/${id}.${lang}`;

  useEffect(() => {
    try { setMotion(!window.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch { setMotion(true); }
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    const run = (on: boolean) => { if (on) v.play().catch(() => { /* 자동재생이 막히면 포스터가 남는다 */ }); else v.pause(); };
    if (typeof IntersectionObserver === 'undefined') { run(true); return; }
    const io = new IntersectionObserver(([e]) => run(e.isIntersecting), { threshold: 0.15 });
    io.observe(v);
    return () => { io.disconnect(); v.pause(); };
  }, [motion, lang]);

  const media = motion ? (
    <video key={base} ref={ref} className="pclip-m" poster={`${base}.webp`} muted loop playsInline preload="none"
      aria-label={label} role="img">
      <source src={`${base}.webm`} type="video/webm" />
      <source src={`${base}.mp4`} type="video/mp4" />
    </video>
  ) : (
    <img className="pclip-m" src={`${base}.webp`} alt={label} loading="lazy" decoding="async" />
  );

  const [w, h] = wide ? [16, 9] : CLIPS[id];
  return <div className={wide ? 'pclip pclip-wide' : 'pclip'} style={wide ? undefined : { aspectRatio: `${w} / ${h}` }}>{media}</div>;
}
