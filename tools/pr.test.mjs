/* `/pr` self-check — the one feature list (`PR_FEATURES`), the copy keyed by it, the date gates and the copy rules.
   Run: npm run test:pr   (Node ≥ 22.18 — type stripping + `tools/tsResolve.mjs`). No network, no build.
   When the PR repo sits next to this one (`../YouNameIt-PR`), the list is also checked against its registry and
   `gtm/site/feature-claims.json`; otherwise those two tests skip. */
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { register } from 'node:module';

register('./tsResolve.mjs', import.meta.url);

const { PR, PR_FEATURES } = await import('../lib/product.ts');
const pr = await import('../lib/pr.ts');
const { default: COPY } = await import('../lib/copy/pr.ts');
const { T } = await import('../lib/copy.ts');
const policy = await import('../lib/policy.ts');

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PR_REPO = path.resolve(ROOT, '..', 'YouNameIt-PR');
const ids = PR_FEATURES.map((f) => f.id);

test('the feature list has each id once, with a known tier/state', () => {
  assert.equal(new Set(ids).size, ids.length);
  for (const f of PR_FEATURES) {
    assert.ok(['free', 'pro'].includes(f.tier), f.id);
    assert.ok(['on', 'off', 'unbuilt'].includes(f.state), f.id);
    if (f.launch) assert.equal(f.tier, 'pro', `${f.id}: only Pro features can be in the launch set`);
    if (f.launch) assert.notEqual(f.state, 'unbuilt', `${f.id}: an unbuilt feature cannot be promised`);
  }
});

test('the list matches the PR repo registry (ids, order, tier)', { skip: !fs.existsSync(path.join(PR_REPO, 'src/features/registry.ts')) }, () => {
  const src = fs.readFileSync(path.join(PR_REPO, 'src/features/registry.ts'), 'utf8');
  const reg = [...src.matchAll(/\bid: '([^']+)', tier: '(free|pro)'/g)].map((m) => [m[1], m[2]]);
  assert.deepEqual(PR_FEATURES.map((f) => [f.id, f.tier]), reg);
});

test('unbuilt = `claim: null` in the PR repo feature-claims.json', { skip: !fs.existsSync(path.join(PR_REPO, 'gtm/site/feature-claims.json')) }, () => {
  const claims = JSON.parse(fs.readFileSync(path.join(PR_REPO, 'gtm/site/feature-claims.json'), 'utf8')).features;
  for (const f of PR_FEATURES) assert.equal(f.state === 'unbuilt', claims[f.id].claim === null, f.id);
});

test('feature copy follows the list (no orphan ids, required parts present)', () => {
  for (const lang of ['en', 'ko']) {
    const keys = Object.keys(COPY[lang]).filter((k) => k.startsWith('pr.f.'));
    for (const k of keys) {
      const id = k.slice('pr.f.'.length, k.lastIndexOf('.'));
      const f = PR_FEATURES.find((x) => x.id === id);
      assert.ok(f, `${lang} ${k}: not a registry id`);
      assert.notEqual(f.state, 'unbuilt', `${lang} ${k}: unbuilt features have no copy`);
      if (f.tier === 'pro') assert.ok(!/\.(claim|note)$/.test(k), `${lang} ${k}: the pre-order shape never describes a Pro feature as available`);
    }
    for (const f of PR_FEATURES) {
      if (f.state === 'unbuilt' || f.group === 'infra') continue;
      const need = f.tier === 'free' ? ['name', 'label', 'claim'] : f.launch ? ['name', 'label'] : ['name'];
      for (const part of need) assert.ok(`pr.f.${f.id}.${part}` in COPY[lang], `${lang} pr.f.${f.id}.${part} missing`);
    }
  }
  assert.deepEqual(Object.keys(COPY.en).sort(), Object.keys(COPY.ko).sort());
});

test('pre-order shape: no Pro feature is claimable; launch set and later lists are disjoint', () => {
  for (const f of PR_FEATURES) if (f.tier === 'pro') assert.equal(pr.prClaimable(f.id), false, f.id);
  const launch = pr.prLaunchSet(), later = pr.prLater();
  assert.ok(launch.length > 0);
  assert.equal(launch.filter((id) => later.includes(id)).length, 0);
  for (const id of later) assert.notEqual(PR_FEATURES.find((f) => f.id === id).state, 'unbuilt', id);
});

test('date gates open at 00:00 KST of their day', () => {
  assert.equal(pr.kstDayStart('2026-11-14'), Date.parse('2026-11-13T15:00:00Z'));
  assert.equal(pr.kstDayEnd('2026-12-31'), Date.parse('2026-12-31T15:00:00Z'));
  for (const [kind, day] of [['free', PR.launchOn], ['pro', PR.checkoutOpensOn], ['bundle', PR.checkoutOpensOn]]) {
    const t0 = pr.kstDayStart(day);
    assert.equal(pr.prOpenAt(t0 - 1, kind), false, `${kind} before ${day}`);
    assert.equal(pr.prOpenAt(t0, kind), true, `${kind} on ${day}`);
  }
  assert.ok(PR.checkoutOpensOn >= PR.launchOn);
  /* the pre-order checkout opens on the day the terms revision with PR takes effect (`lib/policy.ts` owns the notice) */
  assert.equal(PR.checkoutOpensOn, policy.PR_EFFECTIVE);
  assert.ok(policy.PR_POSTED <= PR.launchOn, 'the notice is up before /pr goes public');
  assert.equal(pr.prAeCouponAt(pr.kstDayEnd(PR.aeCouponEnd) - 1), true);
  assert.equal(pr.prAeCouponAt(pr.kstDayEnd(PR.aeCouponEnd)), false);
});

/* PR repo `gtm/README.md` copy rules (the same list `gtm/tools/check-gtm.mjs` uses for the drafts) + the site's own:
   no price or year typed into the copy (they live in `lib/product.ts`). */
const BANNED = [
  /마법/, /클릭 한 번|원클릭/, /완성 영상|finished video/i, /평생|lifetime/i, /\bforever\b/i, /최적의|완벽|최고의|혁신|유일한/,
  /\b(perfect|ultimate|revolutionar\w*|game[- ]chang\w*|supercharg\w*|effortless\w*)\b/i, /\bthe only\b/i,
  /AI[- ]powered|AI 기반|autopilot|오토파일럿/i, /\bgenerat\w*/i, /추천|\brecommend\w*/i, /지금 바로|지금 시작|놓치지 마|서두르/,
  /(^|[.!?—]\s*)(buy|download|get|try|start)( it)? now\b|\bget started\b|don'?t miss|\bhurry\b|\bact now\b|limited time/i,
  /전문가가 만든|10년차|expert[- ]made/i, /(?<![가-힣])(네가|너는|너의|너를)(?![가-힣])|(?<![가-힣])네 것/,
  /(?<!안녕)[가-힣]세요/, /십시오/,
  /\b(Cutback|FireCut|PremiereCopilot|Recut|Gling|Submagic|Vrew|CapCut|PlumePack|SubMachine)\b|\bAutoCut\b/,
  /\b20\d\d\b/, /\$\d/,
];
test('copy rules: banned phrases, no typed prices or years', () => {
  for (const lang of ['en', 'ko']) {
    for (const [k, v] of Object.entries(COPY[lang])) {
      if (k === 'pr.price.free.amount') continue;   // the "$0" plate, like `/ae`
      for (const s of Array.isArray(v) ? v : [v]) {
        for (const re of BANNED) assert.ok(!re.test(s), `${lang} ${k}: ${re} in "${s}"`);
      }
    }
  }
});

test('every placeholder is filled except {names} (components fill it)', () => {
  for (const lang of ['en', 'ko']) {
    for (const k of Object.keys(COPY[lang])) {
      const v = T[lang][k];
      for (const s of Array.isArray(v) ? v : [v]) {
        const left = (s.match(/\{[a-zA-Z]+\}/g) || []).filter((p) => p !== '{names}');
        assert.deepEqual(left, [], `${lang} ${k}`);
      }
    }
  }
});

/* ── third-party notices (`/pr/notices`, PRD §8) ─────────────────────────────────────────────────────────────────────
   The page draws the plugin's THIRD-PARTY-NOTICES.md (`content/pr/`, a byte-for-byte copy — `lib/notices.ts`). What matters is that
   a license text reaches the page unchanged, so the fenced blocks are compared with an independent extraction, and the reader
   must throw on what it does not understand instead of drawing it wrong. */
const { parseNotices, loadPrNotices, PR_NOTICES_FILE } = await import('../lib/notices.ts');
const { PR_LEGAL } = await import('../lib/product.ts');

test('notices: the reader keeps fenced text exactly and splits the rest', () => {
  const md = ['# T', '', 'Intro `a` line', 'wrapped.', '', '- one', '  more', '- two', '', '1. x', '', '| A | B |', '|---|---|', '| 1 | `2` |', '',
    '```text', '  indented, trailing space ', '', '{braces} <tag> & "quote" ~~x~~', '```', 'after'].join('\r\n');
  assert.deepEqual(parseNotices(md), [
    { kind: 'heading', level: 1, text: 'T' },
    { kind: 'para', text: 'Intro `a` line wrapped.' },
    { kind: 'list', ordered: false, items: ['one more', 'two'] },
    { kind: 'list', ordered: true, items: ['x'] },
    { kind: 'table', head: ['A', 'B'], rows: [['1', '`2`']] },
    { kind: 'code', text: '  indented, trailing space \n\n{braces} <tag> & "quote" ~~x~~' },
    { kind: 'para', text: 'after' },
  ]);
});

test('notices: what the reader does not understand throws', () => {
  assert.throws(() => parseNotices('```\nnever closed'), /never closed/);
  assert.throws(() => parseNotices('| A | B |\n|---|---|\n| 1 |'), /cells/);
  assert.throws(() => parseNotices('text\n- list inside a paragraph'), /inside a paragraph/);
  assert.throws(() => parseNotices('- a\n1. b'), /bulleted and numbered/);
});

test('notices: every fenced license block of the shipped copy reaches the reader unchanged', () => {
  const src = fs.readFileSync(path.join(ROOT, PR_NOTICES_FILE), 'utf8').replace(/\r\n?/g, '\n');
  const fenced = [...src.matchAll(/^```[^\n]*\n([\s\S]*?)\n```$/gm)].map((m) => m[1]);
  const read = loadPrNotices().filter((b) => b.kind === 'code').map((b) => b.text);
  assert.ok(fenced.length >= 10, 'the copy carries its license texts');
  assert.deepEqual(read, fenced);
  assert.ok(read.some((x) => x.includes('Apache License')) && read.some((x) => x.includes('SIL OPEN FONT LICENSE')) && read.some((x) => x.includes('MIT License')));
});

test('notices: PR_LEGAL.notices names a page that exists in both locales', () => {
  assert.match(PR_LEGAL.notices, /^\/[a-z/-]+$/);
  assert.ok(fs.existsSync(path.join(ROOT, 'app/(en)' + PR_LEGAL.notices, 'page.tsx')));
  assert.ok(fs.existsSync(path.join(ROOT, 'app/(ko)/ko' + PR_LEGAL.notices, 'page.tsx')));
});
