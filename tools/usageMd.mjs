/* 사용법 문서(`donys/usage/{ko,en}/<id>.md`) 파서 — 생성기(`build-docs-data.mjs`)가 쓴다. 🔴 정본은 플러그인 repo 의 문서다.

   스펙 = 플러그인 repo `donys/usage/` 파일 규약 v1:
     frontmatter(`id` · `kind` · `requires`) + 본문 **H2 정확히 4개**(제목 고정, 순서 고정).
   여기서 하는 일은 세 가지뿐이다:
     ⑴ frontmatter 읽기  ⑵ 4절로 가르기  ⑶ 마크다운 부분집합 → 최소 안전 HTML.

   🔴 마크다운 라이브러리를 들이지 않았다 — 의존성에 없고(next · react · pretendard 뿐), 이 문서가 쓰는 건
   **표 · 불릿(한 단 중첩까지) · 인라인 코드 · 굵게** 넷이라 변환기가 짧다. 스펙 밖 문법(번호 목록 · 2단 이상 중첩 목록 ·
   제목 H3 이하)은 **조용히 틀리게 그리지 않고 여기서 던진다** — 던지는 쪽이 낫다. 문서가 틀렸다는 신호이고
   생성기는 그 신호를 빌드 실패로 올린다(번호 단계 목록은 스펙이 금지한다 — 튜토리얼이 되므로). 원시 HTML 은 글자로 보인다.
   한 단 중첩은 플러그인 lint(`usageDocs.mjs` — 불릿 절의 들여쓴 줄 허용)가 통과시키고 실제 문서가 쓴다
   (`edgeBoil` · `rgbSplit` · `typewriterCursor` 의 한계 절, 2칸 들여쓰기).

   🔴 **안전**: 출력은 `dangerouslySetInnerHTML` 로 들어간다. 모든 텍스트는 `esc()` 를 통과하고 태그는 이 파일이 쓴 것
   (`p ul li table thead tbody tr th td code b`)뿐이다. 문서 안의 `<script>` 는 글자 그대로 보인다.
   `{{ns.key}}` 는 사전 라벨로 갈린다. 🔴 코드 스팬이 **키 하나뿐**(`` `{{ns.key}}` ``)이면 그 라벨을 `<code>` 로 낸다 — 실제 문서가
   옵션 값·UI 라벨을 그렇게 194곳 적는다(bentoGrid · patternLab · vertexGrid). 날것 `{{…}}` 가 화면에 나가면 안 된다(2026-10-02 검증 적발).
   키에 다른 글자가 섞인 코드 스팬은 던진다(날것 `{{` 가 나가는 유일한 길이라서). 라벨도 `esc()` 를 탄다.

   테스트 = `node --test tools/usageMd.test.mjs`. */

export const HEADINGS = {
  ko: ['선택', '컨트롤', '수식어', '한계·되돌리기'],
  en: ['Selection', 'Controls', 'Modifiers', 'Limits & undo'],
};
export const SECTION_KEYS = ['sel', 'ctl', 'mod', 'lim'];
export const KINDS = ['tool', 'panel', 'catalog'];

/** 사전 라벨 → 표 칸 글자. `**` 를 벗기고 줄바꿈을 접고, 🔴 **런타임 자리표시자(`{count}` · `{name}` · `{verb}` …)를 중화한다** —
    패널은 그 자리를 실행 때 채우지만 사이트에는 채울 값이 없다. 날것 `{count}` 가 사용자에게 보이면 안 된다(2026-10-02 검증 적발:
    `panel.toolCount` · `common.newHere` · `support.deactivate` · `distributeDialog.make3D`).
    규칙 하나: 개수(`{count}` · `{n}`) → `N`, 나머지 전부 → `…`(그 자리에 바뀌는 말이 온다는 표시). 결과는 `inline()` 이 `esc()` 한다. */
export const labelText = (v) => String(v)
  .replace(/\*\*/g, '')
  .replace(/\s*\n\s*/g, ' ')
  .replace(/\{\s*(\w+)\s*\}/g, (_, name) => (/^(count|n)$/i.test(name) ? 'N' : '…'))
  .trim();

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* ── ⑴ frontmatter ───────────────────────────────────────────────────
   YAML 전체가 아니라 스펙이 쓰는 모양만: `key: 스칼라` · `key: ["a", "b"]` · `key:` + `- 항목` 줄 · 줄 끝 `# 주석`. */
function stripComment(v) {
  let q = null;
  for (let i = 0; i < v.length; i++) {
    const c = v[i];
    if (q) { if (c === '\\' && q === '"') i++; else if (c === q) q = null; }
    else if (c === '"' || c === "'") q = c;
    else if (c === '#' && (i === 0 || /\s/.test(v[i - 1]))) return v.slice(0, i).trimEnd();
  }
  return v.trimEnd();
}

function unquote(v) {
  if (v.length >= 2 && v[0] === '"' && v.at(-1) === '"') return JSON.parse(v);
  if (v.length >= 2 && v[0] === "'" && v.at(-1) === "'") return v.slice(1, -1).replace(/''/g, "'");
  return v;
}

function parseInlineArray(v, where) {
  const inner = v.slice(1, -1).trim();
  if (!inner) return [];
  const items = [];
  let cur = '', q = null;
  for (let i = 0; i < inner.length; i++) {
    const c = inner[i];
    if (q) {
      cur += c;
      if (c === '\\' && q === '"') cur += inner[++i];
      else if (c === q) q = null;
    } else if (c === '"' || c === "'") { q = c; cur += c; }
    else if (c === ',') { items.push(cur.trim()); cur = ''; }
    else cur += c;
  }
  if (q) throw new Error(`${where}: frontmatter 배열의 따옴표가 안 닫힌다`);
  items.push(cur.trim());
  return items.filter((s) => s !== '').map(unquote);
}

export function parseFrontmatter(src, where) {
  const m = src.replace(/^﻿/, '').match(/^---\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)([\s\S]*)$/);
  if (!m) throw new Error(`${where}: 맨 위에 frontmatter(---) 가 없다`);
  const meta = {};
  const lines = m[1].split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    if (!lines[i].trim() || /^\s*#/.test(lines[i])) continue;
    const kv = lines[i].match(/^([A-Za-z][\w-]*):\s*(.*)$/);
    if (!kv) throw new Error(`${where}: frontmatter 줄을 못 읽었다 — "${lines[i]}"`);
    const key = kv[1];
    const v = stripComment(kv[2]);
    if (v === '') {
      const list = [];
      while (i + 1 < lines.length && /^\s*-\s+/.test(lines[i + 1])) list.push(unquote(stripComment(lines[++i].replace(/^\s*-\s+/, ''))));
      meta[key] = list;
    } else if (v[0] === '[') {
      if (v.at(-1) !== ']') throw new Error(`${where}: frontmatter 배열이 한 줄에 안 닫힌다 — "${v}"`);
      meta[key] = parseInlineArray(v, where);
    } else meta[key] = unquote(v);
  }
  return { meta, body: m[2] };
}

/* ── ⑵ 4절로 가르기 ─────────────────────────────────────────────────── */
const VERIFY = /<!--\s*VERIFY\b[\s\S]*?-->/g;

/** 본문을 H2 4개로 가른다. 제목·순서가 스펙과 다르면 던진다. `verify` = 남아 있는 `<!-- VERIFY -->` 개수(HTML 에서는 지운다). */
export function splitSections(body, lang, where) {
  const verify = (body.match(VERIFY) || []).length;
  const text = body.replace(VERIFY, '').replace(/<!--[\s\S]*?-->/g, '');
  const parts = [];
  let cur = null;
  for (const line of text.split(/\r?\n/)) {
    const h = line.match(/^##\s+(.+?)\s*$/);
    if (h && !line.startsWith('###')) { cur = { h: h[1], lines: [] }; parts.push(cur); }
    else if (cur) cur.lines.push(line);
    else if (line.trim()) throw new Error(`${where}: 첫 H2 앞에 내용이 있다 — "${line.trim().slice(0, 40)}"`);
  }
  const want = HEADINGS[lang];
  if (parts.map((p) => p.h).join('|') !== want.join('|')) {
    throw new Error(`${where}: H2 가 스펙과 다르다.\n  있음: ${parts.map((p) => p.h).join(' | ') || '(없음)'}\n  기대: ${want.join(' | ')}`);
  }
  const out = {};
  parts.forEach((p, i) => { out[SECTION_KEYS[i]] = p.lines.join('\n').trim(); });
  return { sections: out, verify };
}

/* ── ⑶ 마크다운 부분집합 → HTML ──────────────────────────────────────── */
const KEY = '\\{\\{([A-Za-z0-9_.-]+)\\}\\}';
const TOKEN = new RegExp(`\`${KEY}\`|\`([^\`\\n]+)\`|${KEY}|\\*\\*(.+?)\\*\\*`, 'g');

/** 인라인: 키 하나뿐인 코드 스팬(라벨을 `<code>` 로) · 코드 스팬 · `{{ns.key}}`(사전 라벨) · `**굵게**`. 나머지는 전부 이스케이프. */
export function inline(text, resolve, where) {
  let out = '', last = 0;
  /* matchAll 은 정규식을 복제한다 — `**굵게**` 안에서 재귀하므로 전역 정규식의 lastIndex 를 공유하면 무한 루프가 난다(테스트가 잡았다). */
  for (const m of text.matchAll(TOKEN)) {
    out += esc(text.slice(last, m.index));
    if (m[1] !== undefined) out += `<code>${esc(resolve(m[1], where))}</code>`;
    else if (m[2] !== undefined) {
      if (m[2].includes('{{')) throw new Error(`${where}: 코드 스팬에 키와 다른 글자가 섞였다 — 날것 {{…}} 가 화면에 나간다. 키 하나만 감싸라: "\`${m[2].slice(0, 40)}\`"`);
      out += `<code>${esc(m[2])}</code>`;
    }
    else if (m[3] !== undefined) out += esc(resolve(m[3], where));
    else out += `<b>${inline(m[4], resolve, where)}</b>`;
    last = m.index + m[0].length;
  }
  return out + esc(text.slice(last));
}

const SEP = /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/;
const BULLET = /^(\s*)[-*]\s+(.*)$/;
const NUMBERED = /^\s*\d+[.)]\s+/;

function cells(line) {
  const row = line.trim().replace(/^\|/, '').replace(/(?<!\\)\|$/, '');
  return row.split(/(?<!\\)\|/).map((c) => c.trim().replace(/\\\|/g, '|'));
}

export function mdToHtml(md, resolve, where) {
  const lines = md.split(/\r?\n/);
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }

    if (/^\s*\|/.test(line) && i + 1 < lines.length && SEP.test(lines[i + 1])) {
      const head = cells(line);
      i += 2;
      const rows = [];
      while (i < lines.length && /^\s*\|/.test(lines[i])) rows.push(cells(lines[i++]));
      for (const r of rows) {
        if (r.length !== head.length) throw new Error(`${where}: 표 행의 칸이 머리줄(${head.length})과 다르다 — "${r.join(' | ').slice(0, 60)}"`);
      }
      const tr = (cs, tag) => `<tr>${cs.map((c) => `<${tag}>${inline(c, resolve, where)}</${tag}>`).join('')}</tr>`;
      out.push(`<table><thead>${tr(head, 'th')}</thead><tbody>${rows.map((r) => tr(r, 'td')).join('')}</tbody></table>`);
      continue;
    }

    if (BULLET.test(line)) {
      /* 한 단 중첩까지. 들여쓴 불릿 = 바로 앞 최상위 항목의 자식. 자식보다 더 들여쓴 불릿(2단)은 던진다.
         들여쓴 비불릿 줄 = 마지막 항목(자식이면 자식)의 이어지는 줄. */
      const items = [];
      let kidIndent = 0;
      while (i < lines.length && lines[i].trim()) {
        const b = lines[i].match(BULLET);
        const last = items.at(-1);
        if (b && !b[1].length) { items.push({ text: b[2], kids: [] }); kidIndent = 0; }
        else if (b) {
          if (!last) throw new Error(`${where}: 부모 없는 중첩 목록 — "${lines[i].trim().slice(0, 40)}"`);
          if (kidIndent && b[1].length > kidIndent) throw new Error(`${where}: 2단 이상 중첩 목록은 지원하지 않는다 — "${lines[i].trim().slice(0, 40)}"`);
          kidIndent ||= b[1].length;
          last.kids.push(b[2]);
        } else if (/^\s+\S/.test(lines[i]) && last) {
          if (last.kids.length) last.kids[last.kids.length - 1] += ' ' + lines[i].trim();
          else last.text += ' ' + lines[i].trim();
        } else break;
        i++;
      }
      const li = (it) => `<li>${inline(it.text, resolve, where)}${it.kids.length ? `<ul>${it.kids.map((k) => `<li>${inline(k, resolve, where)}</li>`).join('')}</ul>` : ''}</li>`;
      out.push(`<ul>${items.map(li).join('')}</ul>`);
      continue;
    }

    if (NUMBERED.test(line)) throw new Error(`${where}: 번호 목록은 스펙이 금지한다(튜토리얼이 된다) — "${line.trim().slice(0, 40)}"`);
    if (/^#{1,6}\s/.test(line)) throw new Error(`${where}: H2 밖의 제목은 지원하지 않는다 — "${line.trim().slice(0, 40)}"`);

    const para = [lines[i++].trim()];   // 첫 줄은 무조건 먹는다 — `|` 로 시작하지만 표가 아닌 줄에서 멈추면 무한 루프다
    while (i < lines.length && lines[i].trim() && !BULLET.test(lines[i]) && !/^\s*\|/.test(lines[i])) para.push(lines[i++].trim());
    out.push(`<p>${inline(para.join(' '), resolve, where)}</p>`);
  }
  return out.join('');
}

/** 한 로캘 파일 → `{ id, kind, requires, sel, ctl, mod, lim, verify }`. `resolve(key, where)` 는 `{{key}}` → 라벨(없으면 던진다). */
export function parseUsage(src, lang, resolve, where) {
  const { meta, body } = parseFrontmatter(src, where);
  const { sections, verify } = splitSections(body, lang, where);
  if (!KINDS.includes(meta.kind)) throw new Error(`${where}: kind 는 ${KINDS.join('|')} 중 하나여야 한다 — "${meta.kind}"`);
  if (!Array.isArray(meta.requires)) throw new Error(`${where}: requires 는 배열이어야 한다(없으면 []).`);
  const html = {};
  for (const k of SECTION_KEYS) {
    html[k] = mdToHtml(sections[k], resolve, `${where} ## ${HEADINGS[lang][SECTION_KEYS.indexOf(k)]}`);
    if (!html[k]) throw new Error(`${where}: 빈 절 — ## ${HEADINGS[lang][SECTION_KEYS.indexOf(k)]}`);
  }
  return { id: meta.id, kind: meta.kind, requires: meta.requires, ...html, verify };
}

/** 배포 게이트의 사용법 출처 판정 — 태그면 ok, `prerelease:<sha>` 면 경고와 함께 ok, 그 외(`dev:` 경로·브랜치 등)는 fail. */
export function usageSrcVerdict(src, ver) {
  if (src === `v${ver}`) return { level: 'ok', msg: `[usage] 사용법 출처 = 태그 ${src}` };
  if (/^prerelease:[0-9a-f]{7}([0-9a-f]{33})?$/.test(src || ''))
    return { level: 'warn', msg: `[usage] usage docs are a pre-release of the next plugin version (${src})` };
  return { level: 'fail', msg: `[usage] 사용법 출처가 출고 태그(v${ver})가 아니다: ${src} — DOCS_PLUGIN_REF 를 풀고 npm run build 를 다시 돌려라` };
}
