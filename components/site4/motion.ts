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
import { CustomEase } from 'gsap/CustomEase';
import { holdSnap, snapNow } from '@/components/site3p/ruleSnap';

gsap.registerPlugin(ScrollTrigger, CustomEase);
/* = site3p.css `.p3` `--ease-press` cubic-bezier(.5,0,0,1) — GSAP 는 CSS 변수를 못 읽는다. 값을 바꾸면 둘을 같이 바꿔라. */
const EASE_PRESS = CustomEase.create('press', 'M0,0 C0.5,0 0,1 1,1');

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

/* 펼침(FAQ `<details>`) — 21st.dev `ddoemonn/accordion`(id 23530, 2026-10-26 받음)에서 **동작만** 옮겼다: 답 높이 · 답 글자 페이드
   (.18s 열기 · .14s 닫기) · ↑↓ Home End 로 질문 사이 이동 · 줄인 모션 = 즉시. 그쪽 코드(framer-motion · Tailwind · 카드 껍데기)는 안 들였다.
   높이 = 그쪽 스프링(480/40/0.6, ζ≈1.18 → 안 튄다) 대신 `--t-press` .4s · `--ease-press`(레퍼런스 `--ease`).
   🔴 노트 판 괘선 맞춤(`ruleSnap`)과 같이 산다: 끝 상태(모눈에 맞춘 다음 행 위치)를 **먼저** 재고, 그 거리만큼만 움직인 뒤
   끝에서 실제 여백으로 바꿔 끼운다 — 위치가 같아서 안 튄다. 움직이는 동안은 맞춤을 잡아 둔다(매 프레임 맞추면 계단으로 튄다).
   `<details>` 는 그대로다 — JS 없이도 열리고, 찾기(Ctrl+F)가 접힌 답을 열면 그건 네이티브로 열린다(ResizeObserver 가 맞춘다). */
const OPEN_FADE = { duration: 0.18, ease: 'power3.out' };
const CLOSE_FADE = { duration: 0.14, ease: 'power2.in' };

/* 이 `<details>` 다음에 오는 첫 요소의 윗변 — 펼침이 밀어내는 거리를 잰다. 없으면 자기 아랫변. */
function nextTop(d: HTMLElement, note: HTMLElement) {
  let el: Element | null = d;
  while (el && el !== note && !el.nextElementSibling) el = el.parentElement;
  const nx = el && el !== note ? el.nextElementSibling : null;
  return nx ? nx.getBoundingClientRect().top : d.getBoundingClientRect().bottom;
}

export function useDisclosure(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    /* `--t-press` 는 자리마다 `400ms` 도 `.4s` 도 있다(실측 FAQ = `.4s`) — 단위를 같이 읽는다 */
    const tv = getComputedStyle(root).getPropertyValue('--t-press').trim();
    const dur = (parseFloat(tv) || 0.4) / (/ms$/.test(tv) ? 1000 : 1);
    const busy = new WeakSet<HTMLElement>();

    const onClick = (e: MouseEvent) => {
      const sum = (e.target as Element).closest('summary');
      const d = sum?.parentElement as HTMLDetailsElement | null;
      const wrap = d?.querySelector<HTMLElement>(':scope > .a-wrap');
      const note = d?.closest<HTMLElement>('.onnote');
      if (!sum || !d || !wrap || !note || !root.contains(sum) || still()) return;
      e.preventDefault();
      if (busy.has(d)) return;
      busy.add(d);
      const text = wrap.firstElementChild as HTMLElement;
      /* 🔴 재는 동안 열고 닫고 맞추기를 동기로 한 번 돈다 — 브라우저 스크롤 앵커링이 그걸 보고 화면을 136px 밀었다(실측 2026-10-26).
         움직이는 동안만 앵커링을 끄고 스크롤 위치를 제자리에 둔다. */
      const se = document.documentElement, anchor = se.style.overflowAnchor, y0 = window.scrollY;
      se.style.overflowAnchor = 'none';
      holdSnap(note, true);
      const done = () => { busy.delete(d); holdSnap(note, false); se.style.overflowAnchor = anchor; };
      if (!d.open) {
        const n0 = nextTop(d, note);
        d.open = true; snapNow(note); const n1 = nextTop(d, note);   // 끝 상태
        d.open = false; snapNow(note);                                // 움직이는 동안 = 닫힌 상태 여백
        wrap.style.height = '0px'; d.open = true;
        if (window.scrollY !== y0) window.scrollTo({ top: y0, behavior: 'instant' });
        gsap.fromTo(text, { opacity: 0 }, { opacity: 1, ...OPEN_FADE, delay: 0.04 });
        gsap.to(wrap, { height: Math.max(0, n1 - n0), duration: dur, ease: EASE_PRESS, onComplete: () => {
          wrap.style.height = ''; snapNow(note); done();
        } });
      } else {
        const n1 = nextTop(d, note);
        d.open = false; snapNow(note); const n0 = nextTop(d, note);
        d.open = true; wrap.style.height = `${Math.max(0, n1 - n0)}px`;
        if (window.scrollY !== y0) window.scrollTo({ top: y0, behavior: 'instant' });
        gsap.to(text, { opacity: 0, ...CLOSE_FADE });
        gsap.to(wrap, { height: 0, duration: dur, ease: EASE_PRESS, onComplete: () => {
          d.open = false; wrap.style.height = ''; text.style.opacity = ''; snapNow(note); done();
        } });
      }
    };

    /* ↑↓ Home End — 세 그룹 12문을 한 줄로 잇는다. 끝에서 넘기면 처음으로 돈다. */
    const onKey = (e: KeyboardEvent) => {
      const sum = (e.target as Element).closest?.('summary');
      if (!sum || !root.contains(sum)) return;
      const all = [...root.querySelectorAll<HTMLElement>('details > summary')];
      const i = all.indexOf(sum as HTMLElement);
      const go = ({ ArrowDown: i + 1, ArrowUp: i - 1, Home: 0, End: all.length - 1 } as Record<string, number>)[e.key];
      if (go === undefined) return;
      e.preventDefault();
      all[(go + all.length) % all.length]?.focus();
    };

    root.addEventListener('click', onClick);
    root.addEventListener('keydown', onKey);
    return () => { root.removeEventListener('click', onClick); root.removeEventListener('keydown', onKey); };
  }, [ref]);
}
