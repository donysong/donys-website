/* Third-party license notices of the You Name It PR Plugin (PRD §8 "앱과 사이트에") — the reader behind `/pr/notices` · `/ko/pr/notices`.

   🔴 The text is NOT written here. It is `content/pr/THIRD-PARTY-NOTICES.md`, a byte-for-byte copy of the PR repo's
      `THIRD-PARTY-NOTICES.md` (the file the plugin ships as `dist/THIRD-PARTY-NOTICES.md`). The PR repo is private.
      Re-copy rule: whenever the plugin's notices change (a new bundled package, font, model or mark), copy the file over
      the one in `content/pr/` unchanged — `cp <PR repo>/THIRD-PARTY-NOTICES.md content/pr/` — then build. Never edit the copy
      by hand and never retype a license text: the licenses require the notices to travel with the code, as published.
      `deployCheck [pr]` compares every fenced license block of this file with the baked pages, so a renderer change
      that alters a license text stops the deploy.

   The file is a small Markdown subset, so this is a small reader, not a Markdown library (the site has none; same call as
   `tools/usageMd.mjs`). It is the same shape as the plugin's own in-panel reader (PR repo `src/panels/main/builtin/about/notices.ts`):
   fenced blocks are license texts and are kept exactly; everything outside a fence is headings, paragraphs, lists and tables.
   Anything this reader does not understand is thrown at build time instead of being drawn wrong. Limits: no nested lists,
   no emphasis (`**`), no images — the file uses none. If the file grows past that, adopt a Markdown library rather than
   growing this one. Pure data out — the page (`components/legal/PrNotices.tsx`) turns it into elements, so React escapes the text. */
import fs from 'node:fs';
import path from 'node:path';

export type NoticeBlock =
  | { kind: 'heading'; level: number; text: string }
  /** A fenced block: license text, the lines exactly as in the file (no trimming, no reflow). */
  | { kind: 'code'; text: string }
  | { kind: 'table'; head: string[]; rows: string[][] }
  | { kind: 'list'; ordered: boolean; items: string[] }
  | { kind: 'para'; text: string };

const FENCE = /^\s*(```|~~~)/;
const HEADING = /^(#{1,6})\s+(.*)$/;
const ITEM = /^(?:([-*])|(\d+)\.)\s+(.*)$/;
const SEPARATOR = /^:?-{3,}:?$/;

const cells = (line: string) => line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim());

/** Consecutive non-blank lines outside a fence: one table, one list, or one paragraph. */
function group(lines: string[]): NoticeBlock {
  if (lines.every((l) => l.startsWith('|'))) {
    const all = lines.map(cells);
    const head = all[0];
    const body = all.slice(all[1]?.every((c) => SEPARATOR.test(c)) ? 2 : 1);
    for (const r of body) if (r.length !== head.length) throw new Error(`notices: table row "${r.join(' | ')}" has ${r.length} cells, the header has ${head.length}`);
    return { kind: 'table', head, rows: body };
  }
  if (ITEM.test(lines[0])) {
    const items: string[] = [];
    let ordered: boolean | null = null;
    for (const l of lines) {
      const m = ITEM.exec(l);
      if (!m) { items[items.length - 1] += ' ' + l.trim(); continue; }   // continuation of the item above
      if (ordered !== null && ordered !== Boolean(m[2])) throw new Error(`notices: bulleted and numbered items in one list ("${l}")`);
      ordered = Boolean(m[2]);
      items.push(m[3]);
    }
    return { kind: 'list', ordered: Boolean(ordered), items };
  }
  if (lines.some((l) => ITEM.test(l) || l.startsWith('|'))) throw new Error(`notices: a list or table starts inside a paragraph ("${lines[0]}")`);
  return { kind: 'para', text: lines.map((l) => l.trim()).join(' ') };
}

export function parseNotices(markdown: string): NoticeBlock[] {
  const blocks: NoticeBlock[] = [];
  let lines: string[] = [];
  let fence: string[] | null = null;
  const flush = () => { if (lines.length) blocks.push(group(lines)); lines = []; };
  for (const line of markdown.replace(/\r\n?/g, '\n').split('\n')) {
    if (fence) {
      if (FENCE.test(line)) { blocks.push({ kind: 'code', text: fence.join('\n') }); fence = null; }
      else fence.push(line);
      continue;
    }
    if (FENCE.test(line)) { flush(); fence = []; continue; }
    const h = HEADING.exec(line);
    if (h) { flush(); blocks.push({ kind: 'heading', level: h[1].length, text: h[2].trim() }); continue; }
    if (line.trim() === '') flush();
    else lines.push(line);
  }
  if (fence) throw new Error('notices: a code fence is never closed');
  flush();
  return blocks;
}

/** The copy in `content/pr/`, read at build time (server components only — static export, no runtime read). */
export const PR_NOTICES_FILE = path.join('content', 'pr', 'THIRD-PARTY-NOTICES.md');
export const loadPrNotices = (): NoticeBlock[] => parseNotices(fs.readFileSync(path.join(process.cwd(), PR_NOTICES_FILE), 'utf8'));
