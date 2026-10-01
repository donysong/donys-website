/* `usageMd.mjs` 검증 — `npm run test:docs`. 의존성 0(`node:test`).
   지키는 것: ⑴ 안전(이스케이프) ⑵ 스펙 밖 문법을 조용히 틀리게 그리지 않는 것 ⑶ 라벨 치환이 코드 스팬 밖에서만. */
import test from 'node:test';
import assert from 'node:assert/strict';
import { parseFrontmatter, splitSections, mdToHtml, parseUsage, inline } from './usageMd.mjs';

const LABELS = { 'dlg.mode': 'Mode', 'dlg.bold': '**Fit** <mode>' };
const resolve = (k, where) => { if (!(k in LABELS)) throw new Error(`${where}: 사전에 없는 키 ${k}`); return LABELS[k].replace(/\*\*/g, ''); };
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

test('안전: 원시 HTML 은 글자로 보이고, 코드 스팬 안의 {{key}} 는 치환하지 않는다', () => {
  const h = mdToHtml('<script>alert(1)</script> & "q" `{{dlg.mode}}` {{dlg.mode}}', resolve, W);
  assert.equal(h, '<p>&lt;script&gt;alert(1)&lt;/script&gt; &amp; &quot;q&quot; <code>{{dlg.mode}}</code> Mode</p>');
  assert.equal(inline('{{dlg.bold}}', resolve, W), 'Fit &lt;mode&gt;');   // 라벨의 ** 는 벗기고 < 는 이스케이프
  assert.throws(() => inline('{{nope.key}}', resolve, W), /사전에 없는 키/);
});

test('불릿 · 굵게 · 이어지는 줄', () => {
  const h = mdToHtml('- Alt+click — **Alt** 를 누르면\n  이어진다\n- Shift+click — 두 번째', resolve, W);
  assert.equal(h, '<ul><li>Alt+click — <b>Alt</b> 를 누르면 이어진다</li><li>Shift+click — 두 번째</li></ul>');
});

test('스펙 밖 문법은 조용히 그리지 않고 던진다 — 번호 목록 · 중첩 목록 · 제목', () => {
  assert.throws(() => mdToHtml('1. 먼저', resolve, W), /번호 목록/);
  assert.throws(() => mdToHtml('- a\n  - b', resolve, W), /중첩/);
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
