/* 빨간 펜 — 사이트의 **모든** 빨간 표시(밑줄 · 동그라미)가 여기 한 곳에서 나온다 (2026-09-28 재인 피드백:
   *"빨간 펜선으로 원이나 라인 그리는 모션 — 전체적으로 반듯한 라인인데 다 바꿔주자"*).
   반듯한 CSS 선(`::after` 막대 · `text-decoration` · 그라디언트 밑줄)을 손으로 그은 SVG 획으로 바꾸고,
   그을 때 `stroke-dashoffset` 으로 **획이 그려진다**. 긋는 조건(호버 · 활성 · 펼침 · 진입)은 CSS 가 쥔다(site3p.css `.pen`).

   두 경로, 한 모양:
     ⑴ 정적 DOM — `penify()` 가 `PEN_TARGETS` 에 획을 붙인다(셸 `useChrome` 이 한 번 부른다).
     ⑵ 타자기 — `Typed` 는 innerHTML 을 한 글자씩 다시 쓰므로 ⑴ 이 못 본다. 그래서 문자열(`penSVG`)로 받는다.

   🔴 `vector-effect:non-scaling-stroke` 를 쓰지 마라 — 크롬에서 `pathLength` 대시가 깨진다(2026-09-28 실측:
   획이 여러 토막으로 끊겨 그려졌다). 대신 밑줄 상자를 **고정 10px 높이**로 둬서 세로 배율을 1 로 잡는다
   (가로로 늘어나도 수평 획의 굵기는 세로 배율만 탄다). */

const UL = [
  'M1.5 6.6 C 14 5.6, 30 7.2, 48 6.3 S 80 5.1, 94 5.7 Q 97.5 5.9, 98.8 4.9',
  'M2 5.4 C 20 6.9, 38 6.6, 57 5.6 S 86 6.4, 98.5 6.8',
  'M1 7 C 16 6.2, 35 5.2, 55 5.9 S 83 7.1, 99 5.2',
];
/* 닫히지 않고 시작점을 지나쳐 끝난다 — 손으로 두른 동그라미가 그렇다. */
const CIRCLE = [
  'M22 8 C 44 1, 84 3, 95 18 C 102 30, 84 46, 50 47 C 18 48, 1 38, 4 24 C 6 14, 20 6, 40 4.5',
  'M80 6 C 58 0, 16 3, 6 19 C -1 32, 18 47, 52 47 C 84 47, 100 36, 96 22 C 93 12, 76 5, 58 4',
];

/* 둥근 과녁 둘레 — 원형 버튼(구매 레일)처럼 **정사각 상자**를 두를 때. `circle` 은 2:1 상자라 원에 씌우면
   세로 획만 두 배로 굵어진다(preserveAspectRatio none). 역시 시작점을 지나쳐 끝난다. */
const RING = [
  'M30 9 C 58 -1, 94 12, 96 46 C 98 80, 70 97, 44 95 C 16 93, 2 72, 5 46 C 8 22, 26 8, 52 6',
];

export type PenKind = 'ul' | 'circle' | 'ring';
const SETS: Record<PenKind, [string[], string]> = {
  ul: [UL, '0 0 100 10'],
  circle: [CIRCLE, '0 0 100 50'],
  ring: [RING, '0 0 100 100'],
};

/* 같은 글자엔 같은 획 — 서버 렌더와 클라이언트가 같은 모양을 내야 한다(난수 금지). */
function seedOf(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/* JSX 로 그릴 때(구매 레일)는 모양만 받는다 — 마크업은 `penSVG` 와 같게(`svg.pen.pen-<kind>` > `path[pathLength=1]`). */
export function penPath(kind: PenKind, seed: string) {
  const [set, vb] = SETS[kind];
  return { d: set[seedOf(seed) % set.length], vb };
}

export function penSVG(kind: PenKind, seed: string): string {
  const { d, vb } = penPath(kind, seed);
  return `<svg class="pen pen-${kind}" viewBox="${vb}" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="${d}" pathLength="1"/></svg>`;
}

/* 획을 받는 자리 — 🔴 여기 이름이 곧 "빨간 밑줄이 있는 곳" 목록이다. 새 빨간 선을 CSS 로 긋지 말고 여기 더해라.
   `.u` 는 사전 문자열 속 강조 밑줄(`/ae` 기능 표제). 나머지는 링크·펼친 질문 — 호버/활성/펼침 때 그어진다. */
export const PEN_TARGETS = [
  '.p3 .u',
  '.p3 nav .links > a:not(.btn-line)',
  '.p3 footer ul a',
  '.p3 .qa .q',
  '.p3 .typed-link',
  '.p3 :is(.qa .a, .specs .n, .specs .v, .latest, .rel-all, .steps p, .howto) a',
  '.p3 .docs-cta .faq-link',
].join(',');

/* 정적 DOM 에 획을 붙이고, 들어오면 긋는 자리(`.u`)는 뷰포트 진입을 지켜본다. 해제 함수를 돌려준다. */
export function penify(root: ParentNode = document): () => void {
  root.querySelectorAll<HTMLElement>(PEN_TARGETS).forEach((el) => {
    if (el.querySelector(':scope > .pen')) return;
    el.insertAdjacentHTML('beforeend', penSVG('ul', el.textContent || ''));
  });
  const io = new IntersectionObserver((es) => es.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add('pen-on'); io.unobserve(en.target); }
  }), { threshold: 0.8 });
  root.querySelectorAll('.p3 .u').forEach((el) => io.observe(el));
  return () => io.disconnect();
}
