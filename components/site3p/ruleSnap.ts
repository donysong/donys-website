/* 노트 판 괘선 → 모눈 선 (2026-09-30 오너 *"뒤에 모눈종이 그리드랑 검정색 선이 겹쳐 보여서 정렬도 안 맞고 이상해 보임"*).
   노트 판(`.onnote`, site4.css)의 모눈은 판 위쪽 모서리부터 28px 간격인데, 판 위의 가로 괘선(FAQ 행 · 사양 칸 · 표 · 절 머리)은
   글 높이대로 떨어져서 모눈 선 사이 아무 데나 앉았다(실측: `/ae` FAQ+사양 25개 중 23개가 1~27px 어긋남).
   처방 = 인쇄소가 괘지 위에 장부를 찍을 때처럼 **괘선을 모눈 선에 얹는다**: 판 안의 가로 괘선을 문서 순서로 훑어,
   위 괘선은 그 요소의 `margin-top` 으로, 아래 괘선은 `padding-bottom` 으로 다음 모눈 선까지 내린다(최대 27px · 2px 이하로 지나쳤으면 끌어올린다).
   CSS 로는 안 된다 — 행 높이가 글 줄 수(폭 · 언어 · 펼친 답)에 따라 달라서 칸의 배수로 떨어뜨릴 방법이 없다.

   괘선 = 좌우 테가 없고 폭 120px 이상인 요소의 위/아래 테. 버튼·칩처럼 네 변 테는 상자라서 뺀다.
   🔴 자기 바탕을 깐 상자 안의 선은 빼라 — Docs 패널 목업(`.dock`)의 탭 줄은 검정 화면 속 UI 라 모눈과 무관하다.
   좌표는 소수점까지 잰다(`getBoundingClientRect`) — `offsetTop` 은 정수라 1.5px 선이 모눈에서 1~2px 떠 보였다. 노트 판 안엔
   등장 transform 이 없다(`.sweep` 은 그림자만 민다) — 생기면 이 좌표가 같이 밀린다.
   🔴 순서 = 트리 순회: 위 괘선은 들어갈 때, **아래 괘선은 자식을 다 맞춘 뒤** 나올 때(가격 판처럼 테 두른 상자 안에 괘선이 또 있다).
   🔴 여백 겹침: 앞 형제의 margin-bottom 과 겹치면 margin-top 을 줘도 안 움직인다(Docs 카탈로그 = 절 머리 56px) — 겹침 몫을 먼저 넘긴다.
   판 크기가 바뀌면(폭 · 웹폰트 도착 · FAQ 펼침) ResizeObserver 가 다시 맞춘다. 제가 바꾼 높이엔 다시 돌지 않는다. */

const CELL = 28;   // site4.css `.onnote` 모눈 칸 — 바꾸면 결 타일(1008)의 이음매도 같이 따져라(그쪽 주석)
const EPS = 0.1;   // 이 안이면 이미 선 위다
const PULL = 2;    // 선보다 이만큼 이하로 **내려가** 있으면 끌어올린다 — 한 칸(27px)을 밀면 행 사이가 갑자기 벌어진다.
                   // 1.5px 괘선이 DPR1 에선 1px 로 그려져 행마다 0.5px 씩 모자라는 게 쌓이는 자리다(FAQ 12행).
const TAG = 'snap';

type Saved = { mt: string; pb: string };
const saved = new WeakMap<HTMLElement, Saved>();

function yIn(el: HTMLElement, note: HTMLElement) {
  return el.getBoundingClientRect().top - note.getBoundingClientRect().top;
}

const off = (y: number) => ((y % CELL) + CELL) % CELL;
/* 선까지 옮길 거리 — 양수 = 내린다, 음수 = 끌어올린다(PULL 이하) */
const shift = (y: number) => { const d = off(y); return d < EPS || d > CELL - EPS ? 0 : d <= PULL ? -d : CELL - d; };

function restore(note: HTMLElement) {
  note.querySelectorAll<HTMLElement>(`[data-${TAG}]`).forEach((el) => {
    const s = saved.get(el);
    el.style.marginTop = s?.mt ?? ''; el.style.paddingBottom = s?.pb ?? '';
    delete el.dataset[TAG];
  });
}

function mark(el: HTMLElement) {
  if (!el.dataset[TAG]) { saved.set(el, { mt: el.style.marginTop, pb: el.style.paddingBottom }); el.dataset[TAG] = '1'; }
}

/* 위 괘선 — 요소를 다음 모눈 선까지 내린다 */
function lower(el: HTMLElement, note: HTMLElement) {
  const y0 = yIn(el, note);
  const m = shift(y0);
  if (!m) return;
  const target = y0 + m;
  const parent = el.parentElement ? getComputedStyle(el.parentElement).display : '';
  const flow = !/flex|grid/.test(parent);   // 격자·플렉스 칸은 여백이 겹치지 않는다
  const prev = el.previousElementSibling as HTMLElement | null;
  let mt = parseFloat(getComputedStyle(el).marginTop);
  if (flow && prev) mt = Math.max(mt, parseFloat(getComputedStyle(prev).marginBottom));
  mark(el);
  for (let i = 0; i < 4; i++) {
    const rem = target - yIn(el, note);
    if (Math.abs(rem) < EPS) break;
    mt += rem; el.style.marginTop = `${mt}px`;
  }
}

/* 아래 괘선 — 요소 안쪽 아래를 늘려 테를 다음 모눈 선에 앉힌다 */
function pad(el: HTMLElement, note: HTMLElement) {
  const cs = getComputedStyle(el);
  let m = shift(el.getBoundingClientRect().bottom - parseFloat(cs.borderBottomWidth) - note.getBoundingClientRect().top);
  const pb = parseFloat(cs.paddingBottom);
  if (pb + m < 0) m += CELL;   // 끌어올릴 여백이 없으면 다음 선까지 내린다
  if (!m) return;
  mark(el); el.style.paddingBottom = `${pb + m}px`;
}

/* 표 — 행 단위로 맞춘다. 칸 하나만 늘리면 그 칸이 행에서 제일 높지 않을 때 행이 안 자란다.
   `border-collapse:collapse` 면 테가 칸 경계 **가운데**에 그려진다 — 선 윗변 = 경계 − 두께/2. */
function padRow(tr: HTMLTableRowElement, note: HTMLElement) {
  const cells = [...tr.cells] as HTMLElement[];
  const bw = Math.max(0, ...cells.map((c) => parseFloat(getComputedStyle(c).borderBottomWidth) || 0));
  if (!bw || tr.getBoundingClientRect().width < 120) return;
  const collapsed = getComputedStyle(tr.closest('table')!).borderCollapse === 'collapse';
  let m = shift(tr.getBoundingClientRect().bottom - (collapsed ? bw / 2 : bw) - note.getBoundingClientRect().top);
  if (cells.some((c) => parseFloat(getComputedStyle(c).paddingBottom) + m < 0)) m += CELL;
  if (!m) return;
  for (const c of cells) { mark(c); c.style.paddingBottom = `${parseFloat(getComputedStyle(c).paddingBottom) + m}px`; }
}

function walk(el: HTMLElement, note: HTMLElement) {
  const cs = getComputedStyle(el);
  if (cs.display === 'none') return;
  const kids = () => { for (const c of el.children) walk(c as HTMLElement, note); };
  if (cs.display === 'contents') return kids();
  if (el instanceof HTMLTableRowElement && cs.display === 'table-row') { kids(); return padRow(el, note); }
  if (/^(td|th)$/i.test(el.tagName) && cs.display === 'table-cell') return kids();   // 칸의 테는 행(padRow)이 맡는다
  /* 자기 바탕을 깐 상자(패널 목업 · 크림 시트 · 버튼)는 통째로 건너뛴다 — 그 안의 선은 모눈과 무관하다 */
  const bg = cs.backgroundColor.match(/[\d.]+/g);
  if (el !== note && (cs.backgroundImage !== 'none' || (bg && (bg.length < 4 || +bg[3] > 0)))) return;
  const rule = el.offsetWidth >= 120 && !parseFloat(cs.borderLeftWidth) && !parseFloat(cs.borderRightWidth);
  if (rule && parseFloat(cs.borderTopWidth) > 0 && cs.borderTopStyle !== 'none') lower(el, note);
  kids();
  if (rule && parseFloat(cs.borderBottomWidth) > 0 && cs.borderBottomStyle !== 'none') pad(el, note);
}

/* 세로 모눈 — 절 머리 괘선의 왼쪽 끝에 세로선이 지나가게 판 배경을 가로로 민다(글 왼쪽 끝 = 모눈 선).
   결 타일도 같은 만큼 민다 — 결 이음매는 선 위에 있어야 한다(site4.css `.onnote` 주석). */
function shiftX(note: HTMLElement) {
  note.style.backgroundPosition = '';
  const head = note.querySelector<HTMLElement>('.sec-head');
  if (!head) return;
  const x = off(head.getBoundingClientRect().left - note.getBoundingClientRect().left);
  note.style.backgroundPosition = `${x}px 0, ${x}px 0, ${x}px 0`;
}

function snap(note: HTMLElement) {
  restore(note);
  shiftX(note);
  walk(note, note);
}

export function snapRules() {
  const notes = [...document.querySelectorAll<HTMLElement>('.p3 .onnote')];
  const seen = new WeakMap<HTMLElement, string>();
  const size = (n: HTMLElement) => `${n.offsetWidth}x${n.offsetHeight}`;
  const run = (n: HTMLElement) => { snap(n); seen.set(n, size(n)); };
  let raf = 0;
  const pending = new Set<HTMLElement>();
  const ro = new ResizeObserver((es) => {
    es.forEach((e) => { const n = e.target as HTMLElement; if (seen.get(n) !== size(n)) pending.add(n); });
    if (pending.size && !raf) raf = requestAnimationFrame(() => { raf = 0; pending.forEach(run); pending.clear(); });
  });
  notes.forEach((n) => { run(n); ro.observe(n); });
  document.fonts?.ready.then(() => notes.forEach(run));
  return () => { ro.disconnect(); cancelAnimationFrame(raf); notes.forEach((n) => { restore(n); n.style.backgroundPosition = ''; }); };
}
