/* Pro 에서만 열리는 Toolbox 툴 13개 — id 는 플러그인 `builtinScripts` 의 id, name 은 패널 버튼에 뜨는 영문 이름(로케일 무관)이다.
   쓰는 곳 둘: `/go/pro`(`functions/_lib/goPro.ts` — 제품 안 Pro 버튼이 `?tool=<id>` 로 부른다. 아래 `PRO_CLICK_IDS` = 툴 13 + 패널 2) · 가격 판(`components/site4/ae/Price.tsx` — 이름 목록).
   🔴 id 를 바꾸면 `/go/pro` 집계가 조용히 `other` 로 쏟아진다 — `npm run test:fn` 이 id·name 이 Docs 카탈로그(`lib/docsData.ts`)와 같은지 본다. */
export const PRO_TOOLS = [
  { id: 'clickReact', name: 'Click React' },
  { id: 'carouselRig', name: 'Carousel' },
  { id: 'effectorRig', name: 'Effector' },
  { id: 'cursorClick', name: 'Cursor Click' },
  { id: 'autoMarker', name: 'Auto Marker' },
  { id: 'startMarker', name: 'Start Marker' },
  { id: 'faceTrack', name: 'Face Track' },
  { id: 'depthPass', name: 'Depth Pass' },
  { id: 'distributeValues', name: 'Distribute Values' },
  { id: 'writeOn', name: 'Write On' },
  { id: 'roundCorners', name: 'Round Corners' },
  { id: 'patternLab', name: 'Pattern Lab' },
  { id: 'vertexGrid', name: 'Vertex Grid' },
] as const;

export const PRO_TOOL_IDS: readonly string[] = PRO_TOOLS.map((t) => t.id);

/* Pro 패널 둘 — 제품 안 Chat · Custom 패널의 Pro 문이 `?tool=chat` · `?tool=custom1` 로 `/go/pro` 를 연다(플러그인이 보내는 id).
   패널은 툴이 아니라서 `PRO_TOOLS`(가격 판의 툴 이름 목록 · `TIERS.proTools` = 13)에 넣지 않는다 — 넣으면 "Toolbox 툴 15개" 로 거짓이 된다. */
export const PRO_PANEL_IDS: readonly string[] = ['chat', 'custom1'];

/** `/go/pro` 가 세는 id 전부 — Pro 툴 13 + Pro 패널 2. 그 밖은 `other`. */
export const PRO_CLICK_IDS: readonly string[] = [...PRO_TOOL_IDS, ...PRO_PANEL_IDS];
