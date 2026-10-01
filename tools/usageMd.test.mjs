/* `usageMd.mjs` 검증 — `npm run test:docs`. 의존성 0(`node:test`).
   지키는 것: ⑴ 안전(이스케이프) ⑵ 스펙 밖 문법을 조용히 틀리게 그리지 않는 것 ⑶ 라벨 치환이 코드 스팬 밖에서만. */
import test from 'node:test';
import assert from 'node:assert/strict';
import { parseFrontmatter, splitSections, mdToHtml, parseUsage, inline, labelText } from './usageMd.mjs';

const LABELS = { 'dlg.mode': 'Mode', 'dlg.bold': '**Fit** <mode>', 'dlg.fit': '채움 (잘림)', 'panel.toolCount': '{count} tools', 'support.deactivate': '{verb} this computer' };
/* 생성기의 `labeler` 와 같은 길 — 사전 값은 `labelText` 를 거친다. */
const resolve = (k, where) => { if (!(k in LABELS)) throw new Error(`${where}: 사전에 없는 키 ${k}`); return labelText(LABELS[k]); };
const W = 'test';

test('frontmatter: 인라인 배열 · 빈 배열 · 줄 끝 주석 · 블록 목록', () => {
  const a = parseFrontmatter('---\nid: bentoGrid   # 파일명과 같다\nkind: tool\nrequires: ["macOS · Windows", "first run downloads a 110 MB model"]\n---\nbody', W);
  assert.equal(a.meta.id, 'bentoGrid');
  assert.deepEqual(a.meta.requires, ['macOS · Windows', 'first run downloads a 110 MB model']);
  assert.equal(a.body, 'body');
  assert.deepEqual(parseFrontmatter('---\nid: x\nkind: tool\nrequires: []\n---\n', W).meta.requires, []);
  assert.deepEqual(parseFrontmatter('---\nrequires:\n  - "a, b"\n  - c # note\n---\n', W).meta.requires, ['a, b', 'c']);
  assert.deepEqual(parseFrontmatter("---\nrequires: ['a # b', \"c\"]\n---\n", W).meta.requires, ['a # b', 'c']);
  assert.throws(() => parseFrontmatter('no front', W), /frontmatter/);
});

test('표: 라벨 치환 · 이스케이프된 파이프 · 칸 수 불일치는 던진다', () => {
  const md = '| 컨트롤 | 범위·기본 | 설명 |\n|---|---|---|\n| {{dlg.mode}} | 0–100 % · 40 | a \\| b `x\\|y` |\n';
  const html = mdToHtml(md, resolve, W);
  assert.match(html, /^<table><thead><tr><th>컨트롤<\/th><th>범위·기본<\/th><th>설명<\/th><\/tr><\/thead>/);
  assert.ok(html.includes('<td>Mode</td><td>0–100 % · 40</td><td>a | b <code>x|y</code></td>'), html);
  assert.throws(() => mdToHtml('| a | b |\n|---|---|\n| 1 |\n', resolve, W), /칸이/);
});

test('안전: 원시 HTML 은 글자로 보이고, 키 하나뿐인 코드 스팬은 라벨을 <code> 로 낸다', () => {
  const h = mdToHtml('<script>alert(1)</script> & "q" `{{dlg.mode}}` {{dlg.mode}}', resolve, W);
  assert.equal(h, '<p>&lt;script&gt;alert(1)&lt;/script&gt; &amp; &quot;q&quot; <code>Mode</code> Mode</p>');
  /* 실제 문서(bentoGrid)의 꼴 — 옵션 값을 키로 감싼다. 날것 {{…}} 가 화면에 나가면 안 된다. */
  assert.equal(inline('`{{dlg.fit}}` 는 칸을 꽉 채웁니다.', resolve, W), '<code>채움 (잘림)</code> 는 칸을 꽉 채웁니다.');
  assert.equal(inline('**`{{dlg.mode}}`**', resolve, W), '<b><code>Mode</code></b>');
  assert.throws(() => inline('`{{dlg.mode}} 모드`', resolve, W), /코드 스팬에 키/);   // 섞이면 날것이 나간다 → 던진다
  assert.throws(() => inline('`{{nope.key}}`', resolve, W), /사전에 없는 키/);
  assert.equal(inline('{{dlg.bold}}', resolve, W), 'Fit &lt;mode&gt;');   // 라벨의 ** 는 벗기고 < 는 이스케이프
  assert.throws(() => inline('{{nope.key}}', resolve, W), /사전에 없는 키/);
});

test('불릿 · 굵게 · 이어지는 줄', () => {
  const h = mdToHtml('- Alt+click — **Alt** 를 누르면\n  이어진다\n- Shift+click — 두 번째', resolve, W);
  assert.equal(h, '<ul><li>Alt+click — <b>Alt</b> 를 누르면 이어진다</li><li>Shift+click — 두 번째</li></ul>');
});

test('스펙 밖 문법은 조용히 그리지 않고 던진다 — 번호 목록 · 2단 중첩 목록 · 제목', () => {
  assert.throws(() => mdToHtml('1. 먼저', resolve, W), /번호 목록/);
  assert.throws(() => mdToHtml('- a\n  - b\n    - c', resolve, W), /2단/);
  assert.throws(() => mdToHtml('### 소제목', resolve, W), /제목/);
});

test('표가 아닌 `|` 줄에서 멈추지 않는다(무한 루프 방지)', () => {
  assert.equal(mdToHtml('| 그냥 줄', resolve, W), '<p>| 그냥 줄</p>');
});

const KO_DOC = (extra = '') => `---\nid: bentoGrid\nkind: tool\nrequires: []\n---\n## 선택\n컴프를 연다.${extra}\n\n## 컨트롤\n없음 — 클릭 즉시 적용.\n\n## 수식어\n없음.\n\n## 한계·되돌리기\n- Ctrl+Z 1회.\n`;

test('4절: 정상 문서 · VERIFY 주석은 HTML 에서 지우고 센다', () => {
  const r = parseUsage(KO_DOC(' <!-- VERIFY: 맞나 -->'), 'ko', resolve, W);
  assert.equal(r.id, 'bentoGrid');
  assert.equal(r.verify, 1);
  assert.equal(r.sel, '<p>컴프를 연다.</p>');
  assert.equal(r.lim, '<ul><li>Ctrl+Z 1회.</li></ul>');
});

test('4절: 제목·순서가 스펙과 다르면 던진다 · 빈 절도 던진다', () => {
  assert.throws(() => splitSections('## 컨트롤\nx\n## 선택\ny\n## 수식어\nz\n## 한계·되돌리기\nw', 'ko', W), /H2/);
  assert.throws(() => splitSections('## Selection\nx', 'ko', W), /H2/);
  assert.throws(() => parseUsage(KO_DOC().replace('컴프를 연다.', ''), 'ko', resolve, W), /빈 절/);
});

test('라벨의 런타임 자리표시자는 중화한다 — 개수는 N, 나머지는 …', () => {
  assert.equal(labelText('{count} tools'), 'N tools');
  assert.equal(labelText('툴 {count}개'), '툴 N개');
  assert.equal(labelText('Turn {count} 2D layer(s) 3D and set them'), 'Turn N 2D layer(s) 3D and set them');
  assert.equal(labelText('{name} — new in this version'), '… — new in this version');
  assert.equal(labelText('이 컴퓨터 {verb}'), '이 컴퓨터 …');
  assert.equal(labelText('**Fit**\n  {n} cells'), 'Fit N cells');
  /* 표 칸까지 — 생성기 경로 그대로 */
  const html = mdToHtml('| 컨트롤 | 범위·기본 | 설명 |\n|---|---|---|\n| {{panel.toolCount}} | — | 수. |\n| {{support.deactivate}} | — | 해제. |', resolve, W);
  assert.ok(html.includes('<td>N tools</td>') && html.includes('<td>… this computer</td>'), html);
  assert.doesNotMatch(html, /\{\w+\}/);
});

test('한 단 중첩 목록 — 실제 문서(edgeBoil 한계 절)의 꼴', () => {
  const md = '- 레이어마다 추가되는 이펙트와 노브:\n  - Roughen Edges, 이름 `Edge Boil · Rough` — Border 10.\n  - Slider Control — 기본 4. 노브를\n    삭제하면 그대로입니다.\n- 되돌리기: Ctrl+Z 1회.';
  assert.equal(mdToHtml(md, resolve, W),
    '<ul><li>레이어마다 추가되는 이펙트와 노브:<ul><li>Roughen Edges, 이름 <code>Edge Boil · Rough</code> — Border 10.</li>'
    + '<li>Slider Control — 기본 4. 노브를 삭제하면 그대로입니다.</li></ul></li><li>되돌리기: Ctrl+Z 1회.</li></ul>');
  assert.throws(() => mdToHtml('- a\n  - b\n    - c', resolve, W), /2단/);
  assert.throws(() => mdToHtml('  - 부모 없음', resolve, W), /부모 없는/);
});

test('표 칸: 코드 스팬 안의 `*` · 괄호 · 이스케이프된 파이프 — 실제 문서(distributeValues)의 꼴', () => {
  const md = '| 컨트롤 | 범위·기본 | 설명 |\n|---|---|---|\n| {{dlg.mode}} 입력칸 | 수식, 기본 `i * 40` | t = 위치(i/(n−1)) · 예: `i*40` · `sin(t*PI)*200` · `a\\|b`. |';
  assert.ok(mdToHtml(md, resolve, W).includes('<td>Mode 입력칸</td><td>수식, 기본 <code>i * 40</code></td><td>t = 위치(i/(n−1)) · 예: <code>i*40</code> · <code>sin(t*PI)*200</code> · <code>a|b</code>.</td>'));
  /* 코드 안의 날 파이프는 GFM 처럼 칸을 가른다 → 칸 수가 어긋나 조용히 그리지 않고 던진다 */
  assert.throws(() => mdToHtml('| a | b |\n|---|---|\n| `x|y` | z |', resolve, W), /칸이/);
});

test('CRLF · BOM 문서도 LF 와 같은 결과 — 독립 줄의 VERIFY 주석은 지우고 센다', () => {
  const lf = KO_DOC('').replace('- Ctrl+Z 1회.\n', '- Ctrl+Z 1회.\n<!-- VERIFY: 라이브 확인 -->\n<!-- VERIFY: 둘째 -->\n');
  const a = parseUsage(lf, 'ko', resolve, W);
  const b = parseUsage('﻿' + lf.replace(/\n/g, '\r\n'), 'ko', resolve, W);
  assert.deepEqual(b, a);
  assert.equal(a.verify, 2);
  assert.equal(a.lim, '<ul><li>Ctrl+Z 1회.</li></ul>');
});
