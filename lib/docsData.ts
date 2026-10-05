/* 🔴 **생성물이다. 손으로 고치지 마라.**
   고칠 곳은 `tools/build-docs-data.mjs` 이고, 고친 뒤에는  npm run build:docs  를 돌려라.
   내용의 정본은 플러그인 repo 의 **출고 태그 v2.8.0** 다 — 툴은 `src/data/builtinScripts.ts`,
   설명은 `src/i18n/{ko,en}.ts`, 패널은 `CSXS/manifest.xml`, 이펙트는 `seed-presets/effects/`.
   (워킹트리가 아니다 — 사이트가 파는 건 구매자가 받는 zxp 다.)
   여기 숫자를 손으로 올리면 그 순간 사이트가 없는 걸 광고하기 시작한다(전례 둘 — 생성기 머리말).

   🔴 릴리스 노트는 여기 없다 — `lib/releases.ts` 가 정본이고 페이지가 직접 읽는다. */

/** 이 파일을 찍은 플러그인 태그. `lib/product.ts` VERSION 과 같아야 한다. */
export const DOCS_TAG = "v2.8.0";

export type DocsCat = "motion" | "layer" | "comp" | "shape" | "stylize" | "export";
export type DocsPreview = 'sheet' | 'none';

/** 툴 한 장. `ko`/`en` 은 패널 툴팁에서 뽑은 한 줄이며 `<b>` 를 품을 수 있다. */
export type DocsTool = {
  /** 플러그인 id — 카드 앵커(`#tool-<id>`)도 이 값이다. */
  id: string;
  /** 표시 이름 — 로케일 무관 영문. 패널 버튼에 뜨는 문자열과 같다. */
  name: string;
  cat: DocsCat;
  /** sheet = 16프레임 프리뷰 시트 · none = 빈 판 */
  preview: DocsPreview;
  ko: string;
  en: string;
};

/** AE 창 메뉴 ▸ Extensions 에 뜨는 패널. `name` 은 메뉴 라벨 그대로다(로케일 무관). */
export type DocsPanel = { key: string; name: string };

export const DOCS_CATS: readonly DocsCat[] = ["motion", "layer", "comp", "shape", "stylize", "export"];

export const DOCS_TOOLS: readonly DocsTool[] = [
  { id: "resetKeys", name: "Reset Keys", cat: "motion", preview: "sheet", ko: "트랜스폼 키프레임 전체 삭제", en: "Delete all transform keyframes" },
  { id: "loopInOut", name: "Loop In/Out", cat: "motion", preview: "sheet", ko: "루프 익스프레션 적용", en: "Apply loop expression" },
  { id: "overshoot", name: "Overshoot", cat: "motion", preview: "sheet", ko: "탄성 반동 익스프레션 추가", en: "Add springy overshoot expression" },
  { id: "sequenceLayers", name: "Sequence Layers", cat: "motion", preview: "sheet", ko: "레이어 순차 배치", en: "Arrange layers sequentially" },
  { id: "clickReact", name: "Click React", cat: "motion", preview: "sheet", ko: "선택 레이어에 눌림→복원 클릭 반응 (스케일 + 명도, 스프링 복원)", en: "Press-and-release click reaction on selected layers (scale + brightness, spring return)" },
  { id: "carouselRig", name: "Carousel", cat: "motion", preview: "sheet", ko: "선택 레이어로 캐러셀 만들기 — 캐러셀은 자기 컴프 하나로 들어가고, 적용 뒤엔 그 컴프 안 Controls 의 Effect Controls 에서 바꿉니다", en: "Make a carousel from the selected layers — it goes in as one comp of its own; switch presets in Effect Controls of the Controls layer inside it" },
  { id: "effectorRig", name: "Effector", cat: "motion", preview: "sheet", ko: "선택 레이어가 이펙터 널과의 거리에 반응 — 스케일·불투명도·위치·회전·바라보기·글자 굵기 + 속성 맵", en: "Selected layers react to their distance from an effector null — scale, opacity, position, rotation, look-at, text weight + property maps" },
  { id: "cursorClick", name: "Cursor Click", cat: "motion", preview: "sheet", ko: "macOS 커서를 셰이프로 생성 + 클릭/이동 모션 (에셋 불필요)", en: "Draw a macOS cursor as shapes + click/move motion (no assets needed)" },
  { id: "autoMarker", name: "Auto Marker", cat: "motion", preview: "sheet", ko: "선택 레이어의 오디오에서 마커 자동 생성 — 온셋(베이스 등 타격 지점) 또는 템포 격자", en: "Auto-generate markers from the selected layer's audio — onset (bass hits etc.) or a tempo grid" },
  { id: "startMarker", name: "Start Marker", cat: "motion", preview: "sheet", ko: "프리컴프를 열지 않고 안쪽 시작 시각을 바깥 마커로 조절 — 마커를 끌어 이동 (다시 누르면 해제)", en: "Set a precomp's inner start time from outside — drag the marker; press again to remove" },
  { id: "resizeToComp", name: "Fit Layer to Comp", cat: "layer", preview: "sheet", ko: "레이어를 컴프 크기에 맞춤 (Fit/Fill/Stretch)", en: "Fit layer to comp size (fit/fill/stretch)" },
  { id: "anchorPoint", name: "Anchor Point", cat: "layer", preview: "sheet", ko: "앵커 포인트 9점 그리드 이동", en: "Move anchor via 9-point grid" },
  { id: "textExploder", name: "Text Exploder", cat: "layer", preview: "sheet", ko: "텍스트를 글자/단어/줄 레이어로 분리", en: "Split text into char/word/line layers" },
  { id: "duplicateWithPrecomps", name: "Duplicate with Precomps", cat: "layer", preview: "sheet", ko: "하위 프리컴프까지 통째 독립 복제", en: "Duplicate comp including all nested precomps" },
  { id: "faceTrack", name: "Face Track", cat: "layer", preview: "sheet", ko: "영상 속 얼굴 검출 → 널 트래킹 키프레임 (모자이크/스티커 팔로우용)", en: "Detect faces → tracked null keyframes (mosaic/sticker follow)" },
  { id: "depthPass", name: "Depth Pass", cat: "layer", preview: "sheet", ko: "선택 레이어에서 뎁스 맵을 뽑아 피사계 심도 리그까지 연결 — 초점·블러 노브, 원하면 시차", en: "Build a depth map from the selected layers and wire a depth-of-field rig — focus &amp; blur knobs, optional parallax" },
  { id: "randomFill", name: "Multi Fill", cat: "layer", preview: "sheet", ko: "선택 레이어에 팔레트 색 배정 — 무작위 또는 순서대로 (다이얼로그에서 선택)", en: "Assign palette colors to the selected layers — random or in order, picked in the dialog" },
  { id: "addNull", name: "Parent to Null", cat: "layer", preview: "sheet", ko: "널 생성 + 선택 레이어 일괄 페어런트", en: "Create a null and parent selected layers to it" },
  { id: "distributeValues", name: "Distribute Values", cat: "layer", preview: "sheet", ko: "선택 레이어마다 값을 간격·범위·수식으로 넣습니다 — 위치 Z·회전·스케일 등, 식이 아니라 고정 값입니다", en: "Give each selected layer its own value by step, range or formula — Position Z, rotation, scale and more; fixed values, not expressions" },
  { id: "autoCrop", name: "Auto Crop", cat: "comp", preview: "sheet", ko: "콘텐츠 크기에 맞게 컴프 크롭", en: "Crop comp to content" },
  { id: "fitChildComps", name: "Fit Precomps", cat: "comp", preview: "sheet", ko: "프리컴프 길이를 현재 컴프에 맞춤", en: "Match precomp durations to this comp" },
  { id: "fitCompToLayers", name: "Fit Comp to Layers", cat: "comp", preview: "sheet", ko: "컴프 길이를 마지막 레이어에 맞춤", en: "Fit comp duration to last layer" },
  { id: "trimLayersToComp", name: "Trim Layers to Comp", cat: "comp", preview: "sheet", ko: "레이어 In/Out 을 컴프 길이로 자름", en: "Trim layer in/out to comp duration" },
  { id: "unprecomp", name: "Unprecomp", cat: "comp", preview: "sheet", ko: "프리컴프 해제", en: "Unpack a precomp" },
  { id: "organizeProject", name: "Organize Project", cat: "comp", preview: "sheet", ko: "프로젝트 패널을 스키마 폴더로 자동 정리 — 렌더/컴프/소스/솔리드/레퍼런스 (적용 전 계획 미리보기)", en: "Sort the Project panel into schema folders, with a plan preview first" },
  { id: "writeOn", name: "Write On", cat: "shape", preview: "sheet", ko: "써지는 애니메이션 키프레임 — 셰이프는 획 순서대로, 텍스트는 윤곽선으로 바꿔 좌상→우하 필기 순서로 (Trim Paths)", en: "Write-on keyframes — shapes in stroke order; text converts to outlines and writes top-left to bottom-right (Trim Paths)" },
  { id: "pointsToNulls", name: "Points to Nulls", cat: "shape", preview: "sheet", ko: "패스 포인트마다 널 컨트롤러 생성", en: "Null controller on each path point" },
  { id: "shapesFromVector", name: "Shapes from Vector", cat: "shape", preview: "sheet", ko: "벡터 레이어 → 셰이프 레이어 변환", en: "Vector layer → shape layer" },
  { id: "bentoGrid", name: "Bento Grid", cat: "shape", preview: "sheet", ko: "벤토 격자 — 빈 칸 만들기 · 선택 레이어로 채우기 · 선택 레이어 자르기", en: "Bento grid — empty cells, fill with the selected layers, or cut them" },
  { id: "roundCorners", name: "Round Corners", cat: "shape", preview: "sheet", ko: "모서리를 둥글게 — 모서리별 개별 반경, 크기가 변해도 반경 유지 (Alt+클릭 = 제거)", en: "Round the corners — per-corner radius that stays constant as the layer scales (Alt+click = remove)" },
  { id: "patternLab", name: "Pattern Lab", cat: "shape", preview: "sheet", ko: "배경 패턴 — 새 레이어로 만들거나 선택 레이어에 입히기", en: "Background patterns — as a new layer, or applied to the selected layer" },
  { id: "vertexGrid", name: "Vertex Grid", cat: "shape", preview: "sheet", ko: "레이어 꼭지점에서 컴프 끝까지 뻗는 그리드 — 모서리 십자 마크 포함, 가이드가 아니라 렌더됩니다", en: "Grid lines that run from the layer's vertices to the comp edges — with corner cross marks; these render, they are not guides" },
  { id: "shadowCaster", name: "Master Shadow", cat: "stylize", preview: "sheet", ko: "겹겹이 쌓는 그림자 — 광원 널 하나로 레이어마다 방향 조절", en: "Stacked shadows — one light null aims each layer" },
  { id: "rgbSplit", name: "RGB Split", cat: "stylize", preview: "sheet", ko: "R/G/B 채널 3개로 분리 (글리치)", en: "Split into R/G/B layers (glitch)" },
  { id: "edgeBoil", name: "Edge Boil", cat: "stylize", preview: "sheet", ko: "손그림 선 흔들림(boil) 효과", en: "Hand-drawn line boil" },
  { id: "typewriterCursor", name: "Typewriter (Cursor)", cat: "stylize", preview: "sheet", ko: "선택 텍스트에 자소 타이핑 + 깜빡이는 커서", en: "Jamo-by-jamo typing + blinking cursor on selected text" },
  { id: "createProxy", name: "Create Proxy", cat: "export", preview: "sheet", ko: "저해상도 프록시 생성", en: "Create a low-res proxy" },
  { id: "gifConverter", name: "GIF Converter", cat: "export", preview: "sheet", ko: "컴프를 GIF로 변환", en: "Convert comp to GIF" },
  { id: "captureComp", name: "Capture Frame", cat: "export", preview: "sheet", ko: "현재 프레임 PNG 캡처", en: "Capture current frame as PNG" },
];

export const DOCS_PANELS: readonly DocsPanel[] = [
  { key: "toolbox", name: "Toolbox" },
  { key: "chat", name: "Chat" },
  { key: "library", name: "Library" },
  { key: "curves", name: "Curves" },
  { key: "expressions", name: "Expressions" },
  { key: "custom-1", name: "Custom 1" },
  { key: "support", name: "Support" },
];

/** 출고 이펙트 슬러그. 표기(이름·설명)는 `lib/copy/docs.ts` 의 `docs.fx.*` 에 있다. */
export const DOCS_FX: readonly string[] = [
  "chromatic-aberration",
  "crt-screen",
  "confetti-vector",
];
