/* 손그림 — 방문자가 빨간 펜으로 긋는다 (WEBSITE_RENEWAL §16-21 · §16-20).
   두 자리, 한 획 엔진(`startStroke`):
     ⑴ 페이지 전체 — 빈 바탕에서 누르고 끌면 고정 오버레이(`#p3-scrawl`)에 긋고, 몇 초 뒤 바랜다. 데스크톱만.
     ⑵ 루트 02 의 빈칸(`home/YouIt.tsx`) — 획이 남는다. 손가락으로도 긋는다.
   선 모양(빨강 · 둥근 끝 · multiply 안 함)은 `pen.ts` 의 인쇄된 펜과 같다 — CSS `.scrawl path` 가 쥔다.

   🔴 **글자·링크를 뺏지 마라.** 긋기는 누른 자리가 *빈 바탕*일 때만 시작한다. 글자 위에서 끌면 평소처럼
   선택되고, 링크·버튼·입력·`code` 는 평소처럼 눌린다. 글자 판정은 요소가 아니라 **글자 상자**다
   (`caretPositionFromPoint` → 그 글자의 rect) — 문단 요소의 빈 오른쪽 끝에서 끌면 긋는다. */

const MIN_STEP = 1.5;   // px — 이보다 가까운 점은 버린다(떨림·과밀)
const START_AFTER = 3;  // px — 이만큼 움직여야 획이 생긴다(그냥 클릭은 점을 남기지 않는다)
const HOLD_MS = 2600;   // 페이지 획이 남아 있는 시간
const FADE_MS = 900;    // 바래는 시간(CSS transition 과 같은 값)
const MAX_LIVE = 40;    // 동시에 남는 페이지 획 상한

const SVG_NS = 'http://www.w3.org/2000/svg';

/* 점 → 매끈한 선. 점 사이 중점을 지나는 2차 곡선(흔한 손글씨 스무딩) — 꺾인 폴리라인이 아니라 펜 선으로 읽힌다. */
export function inkPath(p: number[]): string {
  const n = p.length / 2;
  if (n === 1) return `M${p[0]} ${p[1]}l0.01 0`;
  let d = `M${p[0]} ${p[1]}`;
  for (let i = 1; i < n - 1; i++) {
    const x = p[i * 2], y = p[i * 2 + 1];
    d += `Q${x} ${y} ${(x + p[i * 2 + 2]) / 2} ${(y + p[i * 2 + 3]) / 2}`;
  }
  return d + `L${p[n * 2 - 2]} ${p[n * 2 - 1]}`;
}

/* 한 획 — 누른 뒤 손이 떨어질 때까지 따라간다. `at` = 이벤트 → 이 svg 의 좌표.
   `dot` 이면 움직임 없는 누름도 점으로 남긴다(빈칸에 쓰는 글씨의 i·j 점). 끝나면 path(없으면 null)를 돌려준다. */
export function startStroke(
  svg: SVGSVGElement, down: PointerEvent, at: (e: PointerEvent) => [number, number],
  { dot = false, onEnd }: { dot?: boolean; onEnd?: (path: SVGPathElement | null) => void } = {},
) {
  const id = down.pointerId;
  const [x0, y0] = at(down);
  const pts = [x0, y0];
  let path: SVGPathElement | null = null;
  const block = (e: Event) => e.preventDefault();   // 긋는 동안은 선택·끌기를 막는다
  const move = (e: PointerEvent) => {
    if (e.pointerId !== id) return;
    const [x, y] = at(e);
    const lx = pts[pts.length - 2], ly = pts[pts.length - 1];
    if (Math.hypot(x - lx, y - ly) < MIN_STEP) return;
    if (!path && Math.hypot(x - x0, y - y0) < START_AFTER) return;
    pts.push(x, y);
    if (!path) { path = document.createElementNS(SVG_NS, 'path'); svg.appendChild(path); }
    path.setAttribute('d', inkPath(pts));
  };
  const end = (e?: Event) => {
    if (e && 'pointerId' in e && (e as PointerEvent).pointerId !== id) return;
    removeEventListener('pointermove', move); removeEventListener('pointerup', end); removeEventListener('pointercancel', end);
    removeEventListener('blur', end);
    document.removeEventListener('selectstart', block); document.removeEventListener('dragstart', block);
    if (!path && dot) { path = document.createElementNS(SVG_NS, 'path'); path.setAttribute('d', inkPath(pts)); svg.appendChild(path); }
    onEnd?.(path);
  };
  addEventListener('pointermove', move); addEventListener('pointerup', end); addEventListener('pointercancel', end);
  addEventListener('blur', end);
  document.addEventListener('selectstart', block); document.addEventListener('dragstart', block);
}

/* 누른 자리가 글자 위인가 — 캐럿 위치의 앞뒤 글자 상자에 점이 들어가면 글자다. */
function onGlyph(x: number, y: number): boolean {
  type CaretDoc = Document & {
    caretPositionFromPoint?: (x: number, y: number) => { offsetNode: Node; offset: number } | null;
    caretRangeFromPoint?: (x: number, y: number) => Range | null;
  };
  const d = document as CaretDoc;
  let node: Node | null = null, off = 0;
  if (d.caretPositionFromPoint) { const c = d.caretPositionFromPoint(x, y); if (c) { node = c.offsetNode; off = c.offset; } }
  else if (d.caretRangeFromPoint) { const r = d.caretRangeFromPoint(x, y); if (r) { node = r.startContainer; off = r.startOffset; } }
  if (!node || node.nodeType !== Node.TEXT_NODE) return false;
  /* 글자 상자는 행간을 안 덮는다 — 두 줄 사이 틈에서 끌어도 문단 선택이어야 하니 위아래로 반 행간씩 넓힌다. */
  const lh = parseFloat(getComputedStyle(node.parentElement ?? document.body).lineHeight);
  const len = (node as Text).length, r = document.createRange();
  for (const i of [off - 1, off]) {
    if (i < 0 || i >= len) continue;
    r.setStart(node, i); r.setEnd(node, i + 1);
    for (const b of r.getClientRects()) {
      const v = Math.max(2, ((lh || b.height * 1.2) - b.height) / 2 + 1);
      if (x >= b.left - 2 && x <= b.right + 2 && y >= b.top - v && y <= b.bottom + v) return true;
    }
  }
  return false;
}

/* 눌러서 쓰는 것들 — 여기서 시작한 끌기는 원래 동작을 한다. `.youit-slot` 은 자기 획을 따로 받는다. */
const HANDS_OFF = 'a, button, input, textarea, select, label, summary, code, pre, kbd, video, iframe, [contenteditable], [role="button"], .youit-slot';

/* 페이지 오버레이 — 데스크톱(정밀 포인터 + 호버)만. 해제 함수를 돌려준다. */
export function scrawl(): () => void {
  const svg = document.getElementById('p3-scrawl') as SVGSVGElement | null;
  if (!svg || !matchMedia('(pointer:fine) and (hover:hover)').matches) return () => {};
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const timers = new Set<number>();
  const later = (fn: () => void, ms: number) => { const t = window.setTimeout(() => { timers.delete(t); fn(); }, ms); timers.add(t); };
  const down = (e: PointerEvent) => {
    if (e.button !== 0 || e.pointerType === 'touch' || e.shiftKey || e.metaKey || e.ctrlKey || e.altKey) return;
    const el = e.target as Element | null;
    if (!el?.closest?.('.p3') || el.closest(HANDS_OFF)) return;
    if (e.clientX >= document.documentElement.clientWidth) return;   // 스크롤바
    if (onGlyph(e.clientX, e.clientY)) return;
    /* 빈 바탕 클릭이 원래 하던 일 — 선택 해제 · 초점 해제 — 은 그대로 해 준다(기본 동작을 막았으니). */
    e.preventDefault();
    getSelection()?.removeAllRanges();
    (document.activeElement as HTMLElement | null)?.blur?.();
    startStroke(svg, e, (m) => [m.clientX, m.clientY], {
      onEnd: (path) => {
        if (!path) return;
        while (svg.childElementCount > MAX_LIVE) svg.firstElementChild?.remove();
        const p = path;
        if (reduce.matches) { later(() => p.remove(), HOLD_MS); return; }
        later(() => { p.classList.add('fade'); later(() => p.remove(), FADE_MS); }, HOLD_MS);
      },
    });
  };
  document.addEventListener('pointerdown', down);
  return () => { document.removeEventListener('pointerdown', down); timers.forEach(clearTimeout); svg.replaceChildren(); };
}
