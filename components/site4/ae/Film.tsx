'use client';
/* 브랜드 영상 — 오너가 만든 35초 필름(2026-10-05). 자리 = `/ae` 히어로 가운데(Hero.tsx 주석이 왜 거기인지 든다).

   🔴 **무음 자동재생 루프 · 플레이어 UI 없음** (2026-10-05 오너 *"자동 재생되게 못함? 플레이어 UI 안보이게"*).
   브라우저는 소리 있는 자동재생을 막는다(크롬·사파리 정책) — 그래서 무음으로 돈다. 자막(EN·KO)이 **영상에 구워져 있어**
   무음으로도 읽힌다(`<track>` 없음 · 그 사실을 aria 로 말한다). 소리는 모서리 원 하나로만 켠다 — 그게 남은 조작의 전부다.
   `muted` 는 HTML 속성으로 나간다(React 19 SSR 실측 `muted=""`). `autoPlay` 속성은 안 쓰고 마운트 뒤 `play()` 를 직접 부른다 —
   줄인 모션 설정이면 안 돌려야 해서다(속성으로 걸면 일단 돈다). 그 설정에선 포스터만 남고 소리 원을 눌러야 돈다.
   막히면(아이폰 저전력 모드 등) 포스터가 남고, 소리 원을 누르면 그 제스처 안에서 소리와 함께 돈다.
   ⚠️ Playwright WebKit 은 이 경로를 검증하지 못한다 — 표준 `autoplay muted playsinline` 정적 마크업조차 NotAllowedError 로 막는다
   (2026-10-05 실측 · `setContent` 의 about:blank 에서만 돈다). 자동재생 확인은 크롬(Playwright)과 실제 사파리로 한다.
   화면 밖에서 도는 무음 자동재생은 크롬·사파리가 알아서 멈춘다 — IntersectionObserver 를 따로 달지 않는다.

   파일 = 영상 R2(`FILM_SRC`) · 포스터 `public/riso/brand/film.webp`. 굽는 법 = 이 파일을 들인 커밋(7a91cc4) 메시지(x264 2-pass · tune grain · 3.1 Mbps · AAC 128k · faststart).
   🔴 webm 을 안 붙인 이유도 거기 있다 — 이 필름은 결이 촘촘해서 같은 바이트에서 VP9 가 x264 보다 나쁘다(VMAF 실측). */
import { useEffect, useRef, useState } from 'react';
import { useT } from '@/components/site3p/lang';
import './Film.css';

/** 🔴 영상 주소 — **호스팅을 바꿀 땐 이 한 줄만** 고친다. 지금 = R2 `dl.younameit.works`(오너 2026-10-05 — 14MB 를 사이트 repo·
    Pages 에 싣지 않는다. 이 repo 는 공개라 한 번 커밋하면 이력에서 못 뺀다). 같은 회사 도메인이라 제3자 요청이 아니다.
    <video> 는 `crossorigin` 없이 다른 출처를 그대로 재생한다(CORS 불필요) — Range 206 · `video/mp4` 실측.
    🔴 파일을 다시 뽑으면 **새 이름으로** 올려라(`…-2026-10.mp4` 처럼) — 같은 이름을 덮으면 엣지 캐시가 구판을 계속 준다.
    `deployCheck [film]` 이 이 호스트를 지킨다(네트워크는 안 탄다 — 주소가 살아 있는지는 업로드 때 확인). 포스터는 사이트에 남는다. */
export const FILM_SRC = 'https://dl.younameit.works/brand/younameit-brand-film-2026-10.mp4';
const POSTER = '/riso/brand/film.webp';

export default function Film() {
  const { t } = useT();
  const ref = useRef<HTMLVideoElement>(null);
  const [sound, setSound] = useState(false);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    ref.current?.play().catch(() => { /* 막히면 포스터가 남는다 — 소리 원이 재생 버튼을 겸한다 */ });
  }, []);

  /* 제스처 안에서 바로 play() — 사파리는 제스처 밖의 소리 재생을 막는다. */
  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    const on = v.muted || v.paused;
    v.muted = !on;
    if (on && v.paused) v.play().catch(() => {});
    setSound(on);
  };

  const subs = t('ae.film.subs');
  return (
    <div className="bfilm">
      <video
        ref={ref}
        muted={!sound}
        loop
        playsInline
        preload="auto"
        poster={POSTER}
        aria-label={`${t('ae.film.title')}. ${subs}`}
      >
        <source src={FILM_SRC} type="video/mp4" />
      </video>
      <button
        type="button"
        className="bfilm-sound"
        onClick={toggle}
        aria-pressed={sound}
        aria-label={t(sound ? 'ae.film.soundOff' : 'ae.film.soundOn')}
        data-cur
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 9h4l5-4v14l-5-4H4z" />
          {sound
            ? <path className="w" d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" />
            : <path className="w" d="M16.5 9.5l5 5M21.5 9.5l-5 5" />}
        </svg>
      </button>
    </div>
  );
}
