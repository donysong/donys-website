'use client';
/* 브랜드 영상 — 오너가 만든 35초 필름(2026-10-05). 자리 = `/ae` 히어로 가운데(Hero.tsx 주석이 왜 거기인지 든다).

   🔴 **누르면 소리와 함께 돈다.** 내레이션·음악이 있는 35초라 자동재생(무음 루프)이 아니다 — `PanelClip` 과 반대다.
   재생은 클릭 핸들러 **안에서 바로** `play()` 를 부른다(사파리는 사용자 제스처 밖의 소리 재생을 막는다).
   누르기 전엔 영상이 1바이트도 안 내려온다(`preload="none"`). 포스터는 `<img>` 다 — 히어로라 첫 화면에 걸리므로 지연 로드하지 않는다.
   누른 뒤에만 같은 주소를 `poster` 로 건다(캐시에 이미 있다) — 첫 프레임이 올 때까지 검은 화면이 안 비친다.
   누른 뒤 조작은 브라우저 기본 컨트롤이다 — 정지·탐색·음량·전체화면·키보드가 다 거기 있다. 다시 그리지 않는다.
   🔴 자막(EN·KO)은 **영상에 구워져 있다** — 파일 하나가 두 로캘을 맡는다. 그래서 `<track>` 이 없고, 그 사실을 보조기기에 말한다(aria).
   줄인 모션 설정: 원래 자동으로 움직이는 게 없다(누를 때만 돈다). 재생 표시의 호버 확대만 끈다(Film.css).

   파일 = 영상 R2(`FILM_SRC`) · 포스터 `public/riso/brand/film.webp`. 굽는 법 = 이 파일을 들인 커밋 메시지(x264 2-pass · tune grain · 3.1 Mbps · AAC 128k · faststart).
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
/** 영상 길이(초) — 영상을 다시 뽑으면 같이 고친다. 보이는 `0:35` 와 aria 의 `35초` 가 여기서 나온다. */
const SECONDS = 35;

export default function Film() {
  const { t } = useT();
  const ref = useRef<HTMLVideoElement>(null);
  const [on, setOn] = useState(false);

  /* 키보드로 눌렀으면 버튼이 사라지면서 초점이 길을 잃는다 — 영상(기본 컨트롤)으로 넘긴다. */
  useEffect(() => { if (on) ref.current?.focus(); }, [on]);

  const play = () => {
    const v = ref.current;
    if (!v) return;
    setOn(true);
    v.play().catch(() => { /* 막히면 기본 컨트롤의 재생 버튼이 남는다 */ });
  };

  const len = `0:${String(SECONDS).padStart(2, '0')}`;
  const subs = t('ae.film.subs');
  return (
    <div className="bfilm">
      <video
        ref={ref}
        preload="none"
        playsInline
        controls={on}
        poster={on ? POSTER : undefined}
        aria-label={`${t('ae.film.title')}. ${subs}`}
      >
        <source src={FILM_SRC} type="video/mp4" />
      </video>
      {on ? null : (
        <button
          type="button"
          className="bfilm-play"
          onClick={play}
          aria-label={`${t('ae.film.play')}, ${t('ae.film.len').replace('{n}', String(SECONDS))}. ${subs}`}
          data-cur
        >
          <img src={POSTER} alt="" width={1920} height={1080} decoding="async" />
          <span className="bfilm-cue" aria-hidden="true">
            <span className="bfilm-mark" />
            <span className="slug">{t('ae.film.play')}<i>{len}</i></span>
          </span>
        </button>
      )}
    </div>
  );
}
