'use client';
/* 모션 바닥 — 리뉴얼 v5 (플러그인 repo WEBSITE_RENEWAL_PLAN §17.8). Lenis(부드러운 스크롤)와 GSAP ScrollTrigger 를
   **한 박자**(`gsap.ticker`)에 묶는다 — 둘이 각자 rAF 를 돌면 스크럽이 스크롤보다 한 프레임 늦게 따라온다.
   레퍼런스(mindmarket) 실측: 부드러운 스크롤 = Lenis · 스크럽 = 멈춰 둔 GSAP 타임라인을 스크롤 진행도가 민다.

   🔴 줄인 모션(`prefers-reduced-motion: reduce`)이면 Lenis 를 안 켜고 진행도도 안 민다 — CSS 가 `--p` 기본값(0)으로 정지 상태를 그린다.
   🔴 앵커 이동은 Lenis 가 맡는다(`anchors`) — 섹션의 `scroll-margin-top`(site4.css) 을 Lenis 가 읽는다(1.3.26 소스 확인). */
import { useEffect, type RefObject } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const still = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/* 셸이 한 번 부른다(`Page4`). */
export function useSmoothScroll() {
  useEffect(() => {
    if (still()) return;
    const lenis = new Lenis({ anchors: true, autoRaf: false });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(tick); lenis.destroy(); };
  }, []);
}

/* 스크롤 진행도 → CSS 변수 `--p`(0 → 1). 판 위 끝이 화면 위 끝에 닿을 때 0, 판 바닥이 화면 위 끝을 지날 때 1.
   값을 받아 무엇을 할지는 CSS 가 쥔다(표지 P1 = 글자 축소 + 잉크 막, site4.css). */
export function useProgress(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el || still()) return;
    const st = ScrollTrigger.create({
      trigger: el, start: 'top top', end: 'bottom top',
      onUpdate: (s) => el.style.setProperty('--p', s.progress.toFixed(4)),
    });
    return () => st.kill();
  }, [ref]);
}

/* 이 판(표지)이 네비 밑에 있는 동안 셸 루트에 `.nav-clear` 를 단다 — 네비 바탕을 걷을지는 CSS 가 정한다(site4.css 표지 P1).
   끝 = 다음 판의 윗변(이 판 바닥 − 판 반지름, 판이 반지름만큼 겹친다)이 네비 밑변에 닿을 때. */
export function useClearNav(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    const root = el?.closest<HTMLElement>('.p3');
    if (!el || !root || still()) return;
    const nav = root.querySelector('nav');
    const st = ScrollTrigger.create({
      trigger: el, start: 0,
      end: () => `bottom-=${parseFloat(getComputedStyle(root).getPropertyValue('--r-panel')) || 0} top+=${nav?.offsetHeight ?? 0}`,
      toggleClass: { targets: root, className: 'nav-clear' },
      invalidateOnRefresh: true,
    });
    return () => { st.kill(); root.classList.remove('nav-clear'); };
  }, [ref]);
}
