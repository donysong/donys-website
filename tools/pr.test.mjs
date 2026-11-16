/* `/pr` self-check — the one feature list (`PR_FEATURES`), the copy keyed by it, the date gates and the copy rules.
   Run: npm run test:pr   (Node ≥ 22.18 — type stripping + `tools/tsResolve.mjs`). No network, no build.
   When the PR repo sits next to this one (`../YouNameIt-PR`, or the folder in the `PR_REPO` environment variable — a worktree of it, say),
   the list is also checked against its registry and `gtm/site/feature-claims.json`; otherwise those tests skip. */
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
const PR_REPO = process.env.PR_REPO ? path.resolve(process.env.PR_REPO) : path.resolve(ROOT, '..', 'YouNameIt-PR');
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

/* The PR repo's claims file is the guard for what the page may say (`check-gtm`). The EN claim and note of every feature that is on are the same words there
   (apostrophes aside); KO is the site's 해요체 version of the repo's 합니다체, so only EN is compared. */
test('claims on the page are the PR repo claims (EN)', { skip: !fs.existsSync(path.join(PR_REPO, 'gtm/site/feature-claims.json')) }, () => {
  const claims = JSON.parse(fs.readFileSync(path.join(PR_REPO, 'gtm/site/feature-claims.json'), 'utf8')).features;
  const norm = (s) => s.replaceAll('’', "'");
  for (const f of PR_FEATURES) {
    if (f.state !== 'on' || f.group === 'infra') continue;
    const c = claims[f.id];
    assert.ok(c && c.claim, `${f.id}: the PR repo has no claim for a feature that is on`);
    assert.equal(norm(COPY.en[`pr.f.${f.id}.claim`]), c.claim.en, `${f.id} claim`);
    assert.equal(norm(COPY.en[`pr.f.${f.id}.note`] ?? ''), c.note ? c.note.en : '', `${f.id} note`);
  }
});

test('feature copy follows the list (no orphan ids, required parts present)', () => {
  for (const lang of ['en', 'ko']) {
    const keys = Object.keys(COPY[lang]).filter((k) => k.startsWith('pr.f.'));
    for (const k of keys) {
      const id = k.slice('pr.f.'.length, k.lastIndexOf('.'));
      const f = PR_FEATURES.find((x) => x.id === id);
      assert.ok(f, `${lang} ${k}: not a registry id`);
      assert.notEqual(f.state, 'unbuilt', `${lang} ${k}: unbuilt features have no copy`);
      if (f.state === 'off') assert.ok(!/\.(claim|note)$/.test(k), `${lang} ${k}: a feature that is off is listed by name only`);
    }
    for (const f of PR_FEATURES) {
      if (f.state === 'unbuilt' || f.group === 'infra') continue;
      /* every feature that is on is described, free or Pro (owner 2026-11-10); the label is what the price card shows */
      const need = f.state === 'off' ? ['name'] : f.tier === 'free' || f.launch ? ['name', 'label', 'claim'] : ['name', 'claim'];
      for (const part of need) assert.ok(`pr.f.${f.id}.${part}` in COPY[lang], `${lang} pr.f.${f.id}.${part} missing`);
    }
  }
  assert.deepEqual(Object.keys(COPY.en).sort(), Object.keys(COPY.ko).sort());
});

test('a feature is described when it is on (free or Pro); launch set and later lists are disjoint', () => {
  for (const f of PR_FEATURES) assert.equal(pr.prClaimable(f.id), f.state === 'on', f.id);
  for (const f of PR_FEATURES) assert.equal(pr.prFree(f.id), f.state === 'on' && f.tier === 'free', f.id);
  const launch = pr.prLaunchSet(), later = pr.prLater();
  assert.ok(launch.length > 0);
  assert.equal(launch.filter((id) => later.includes(id)).length, 0);
  for (const id of later) assert.equal(PR_FEATURES.find((f) => f.id === id).state, 'off', id);
  /* the Pro toolkit in this release (on) and the Pro tools not in it (off) never overlap, and neither holds a launch or unbuilt row */
  const tools = pr.prProTools();
  assert.equal(tools.filter((id) => later.includes(id) || launch.includes(id)).length, 0);
  for (const id of tools) assert.equal(PR_FEATURES.find((f) => f.id === id).state, 'on', id);
});

test('date gates open at 00:00 KST of their day', () => {
  assert.equal(pr.kstDayStart('2026-11-14'), Date.parse('2026-11-13T15:00:00Z'));
  assert.equal(pr.kstDayEnd('2026-12-31'), Date.parse('2026-12-31T15:00:00Z'));
  for (const [kind, day] of [['free', PR.launchOn], ['pro', PR.checkoutOpensOn], ['bundle', PR.checkoutOpensOn]]) {
    if (!pr.PR_DATED) { assert.equal(pr.prOpenAt(Date.now() + 1e12, kind), false, `${kind}: nothing opens while the day is not set`); continue; }
    const t0 = pr.kstDayStart(day);
    assert.equal(pr.prOpenAt(t0 - 1, kind), false, `${kind} before ${day}`);
    assert.equal(pr.prOpenAt(t0, kind), true, `${kind} on ${day}`);
  }
  assert.equal(pr.prAeCouponAt(pr.kstDayEnd(PR.aeCouponEnd) - 1), true);
  assert.equal(pr.prAeCouponAt(pr.kstDayEnd(PR.aeCouponEnd)), false);
});

/* Owner 2026-11-11: the launch day is not set (both dates empty = "date to be announced"); setting both is the only change that opens the page.
   When it is set, Pro is never sold before the terms revision with PR is in force (`lib/policy.ts` owns that date; 2026-11-14, decided separately). */
test('the launch day is all or nothing, never before the terms revision, and the notice is up first', () => {
  assert.equal(Boolean(PR.launchOn), Boolean(PR.checkoutOpensOn), 'launchOn and checkoutOpensOn are set together or not at all');
  assert.equal(pr.PR_DATED, Boolean(PR.launchOn));
  if (!pr.PR_DATED) return;
  assert.match(PR.launchOn, /^\d{4}-\d{2}-\d{2}$/);
  assert.match(PR.checkoutOpensOn, /^\d{4}-\d{2}-\d{2}$/);
  assert.ok(PR.checkoutOpensOn >= PR.launchOn);
  assert.ok(PR.checkoutOpensOn >= policy.PR_EFFECTIVE, 'nobody buys under terms that do not cover the product');
  assert.ok(policy.PR_POSTED <= PR.launchOn, 'the notice is up before /pr goes public');
});

/* Every string that names a launch date has a `.tbd` twin without one, so the page never shows a date, or an unfilled placeholder, while the day is not set. */
test('date copy has a `.tbd` twin that carries no date', () => {
  const DATE = /\{(launch|launchShort|checkoutOpens|checkoutOpensShort|earlyUntil)\}/;
  for (const lang of ['en', 'ko']) {
    const dict = COPY[lang];
    for (const [k, v] of Object.entries(dict)) {
      if (k.endsWith('.tbd')) continue;
      if (!(Array.isArray(v) ? v : [v]).some((s) => DATE.test(s))) continue;
      assert.ok(`${k}.tbd` in dict, `${lang} ${k} names the launch day and has no .tbd twin`);
      assert.ok(!(Array.isArray(dict[`${k}.tbd`]) ? dict[`${k}.tbd`] : [dict[`${k}.tbd`]]).some((s) => DATE.test(s)), `${lang} ${k}.tbd must not name a date`);
    }
    for (const k of Object.keys(dict)) if (k.endsWith('.tbd')) assert.ok(k.slice(0, -4) in dict, `${lang} ${k} has no base key`);
  }
  for (const lang of ['en', 'ko']) for (const k of Object.keys(T[lang])) assert.ok(!k.endsWith('.tbd'), `${lang} ${k}: .tbd keys are swapped in or dropped by lib/copy.ts`);
});

/* Owner 2026-11-10: Pro is a regular purchase, the launch price holds for `openEarlyDays` (14) days from the checkout-open day, KST, inclusive.
   Owner 2026-11-11: until the day is set the copy says "the first {earlyDays} days" and the markup offers nothing for sale. */
test('the launch price period is openEarlyDays long, and the copy says it', () => {
  assert.equal(PR.openEarlyDays, 14);
  const KEYS = ['pr.how.price', 'pr.price.pro.keep', 'pr.faq.buy4.a', 'pr.sp1.n'];
  const ld = pr.prJsonLd('https://x.test', '/pr', 'd');
  if (pr.PR_DATED) {
    const end = new Date(pr.kstDayStart(PR.checkoutOpensOn) + PR.openEarlyDays * 86_400_000 + 9 * 3_600_000).toISOString().slice(0, 10);
    assert.equal(pr.PR_EARLY_UNTIL, end);
    const [y, m, d] = end.split('-').map(Number);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const shows = { en: `${months[m - 1]} ${d}, ${y}`, ko: `${y}년 ${m}월 ${d}일` };
    for (const lang of ['en', 'ko']) for (const k of KEYS) assert.ok(T[lang][k].includes(shows[lang]), `${lang} ${k} shows the end of the launch price`);
    assert.deepEqual(ld.offers.map((o) => o.name), ['Free', 'Pro']);
    assert.ok(ld.offers.every((o) => o.availability === 'https://schema.org/InStock'));
    assert.equal(ld.offers[1].priceValidUntil, pr.PR_EARLY_UNTIL);
  } else {
    assert.equal(pr.PR_EARLY_UNTIL, '');
    for (const lang of ['en', 'ko']) for (const k of KEYS) assert.ok(T[lang][k].includes(String(PR.openEarlyDays)), `${lang} ${k} says the length of the launch price`);
    assert.equal(ld.offers, undefined, 'nothing is for sale while the day is not set');
  }
});

/* The refund the page promises is the one the refund page in force states (Refund §1: a plain 14-day, no-reason refund), and the page links to it. */
test('refund copy matches the refund page in force and links to it', async () => {
  const legal = { en: fs.readFileSync(path.join(ROOT, 'components/legal/RefundEn.tsx'), 'utf8'), ko: fs.readFileSync(path.join(ROOT, 'components/legal/RefundKo.tsx'), 'utf8') };
  assert.ok(legal.en.includes(`${PR.refundDays} days`) && legal.ko.includes(`${PR.refundDays}일`), 'PR.refundDays is the number in the refund policy');
  const at = { en: '/refund', ko: '/ko/refund' };
  assert.equal((await import('../lib/product.ts')).PR_LEGAL.refund, '/refund');
  for (const lang of ['en', 'ko']) {
    for (const k of ['pr.how.refund', 'pr.faq.buy3.a']) {
      assert.ok(COPY[lang][k].includes(`href="${at[lang]}"`), `${lang} ${k} links to the refund policy`);
      assert.ok(T[lang][k].includes(String(PR.refundDays)), `${lang} ${k} says the refund period`);
    }
    assert.ok(fs.existsSync(path.join(ROOT, lang === 'ko' ? 'app/(ko)/ko/refund' : 'app/(en)/refund', 'page.tsx')), `${lang} refund page exists`);
  }
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
  /pre-?order/i, /사전 ?예약/,   // Pro is a regular purchase (owner 2026-11-10): no pre-order wording on the page
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
      if (k.endsWith('.tbd')) continue;   // swapped in for its base key by lib/copy.ts, or dropped
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
