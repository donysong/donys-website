#!/usr/bin/env node
/* 소식 메일 설정 — Resend 세그먼트 · 연락처 속성 · 웹훅을 만들고, Pages 에 넣을 비밀값 명령을 출력한다.
   (2026-09-30 오너 *"수신 동의 장치 만들어두자"* · 서버 = `functions/api/newsletter/*`)

   준비: Resend 대시보드 → API Keys → **Full access** 키 하나(연락처·세그먼트는 발송 전용 키로 못 만든다 —
   support@ 답장용 발송 키와 따로 두는 게 좋다).
   비밀값은 **파일 하나**에만 둔다: `~/.config/younameit/secrets.env`(chmod 600 — RESEND_API_KEY · POLAR_TOKEN · NEWSLETTER_SECRET).
   실행: set -a; . ~/.config/younameit/secrets.env; set +a
         node tools/newsletterSetup.mjs                  ← 무엇을 할지 출력만(아무것도 안 만든다)
         node tools/newsletterSetup.mjs --apply          ← Resend 쪽을 만든다(이미 있으면 건너뛴다)
         node tools/newsletterSetup.mjs --apply --push   ← + Pages 비밀값 셋(RESEND_API_KEY · RESEND_SEGMENT_ID · RESEND_WEBHOOK_SECRET)을
                                                           wrangler 로 **값을 화면에 안 찍고** 넣는다. NEWSLETTER_SECRET 은 따로 넣는다(2026-09-30 넣음).
   🔴 비밀값을 채팅·커밋·로그에 찍지 마라 — 이 스크립트는 이름만 출력한다. 넣은 뒤 한 번 배포(npm run deploy)해야 함수가 새 값을 읽는다. */
import { spawnSync } from 'node:child_process';

const KEY = process.env.RESEND_API_KEY;
const APPLY = process.argv.includes('--apply');
const PUSH = process.argv.includes('--push');
const SITE = process.env.SITE_URL || 'https://younameit.works';
const PROJECT = 'younameit';
const SEGMENT = 'newsletter';
const PROPS = ['consent_at', 'consent_ver', 'lang', 'recheck_at'];
const HOOK = `${SITE}/api/newsletter/webhook`;

if (!KEY) { console.error('RESEND_API_KEY 가 필요하다(Full access).'); process.exit(1); }
const api = async (method, path, body) => {
  const r = await fetch(`https://api.resend.com${path}`, { method, headers: { authorization: `Bearer ${KEY}`, 'content-type': 'application/json' }, body: body ? JSON.stringify(body) : undefined });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(`${method} ${path} → ${r.status} ${JSON.stringify(j)}`);
  return j;
};
const list = (j) => j.data || j;

const segs = list(await api('GET', '/segments'));
let seg = segs.find((s) => s.name === SEGMENT);
console.log(seg ? `✓ 세그먼트 '${SEGMENT}' 있음 (${seg.id})` : `+ 세그먼트 '${SEGMENT}' 만들기`);
if (!seg && APPLY) seg = await api('POST', '/segments', { name: SEGMENT });

const props = list(await api('GET', '/contact-properties'));
for (const k of PROPS) {
  const has = props.some((p) => p.key === k);
  console.log(has ? `✓ 연락처 속성 ${k}` : `+ 연락처 속성 ${k}(string) 만들기`);
  if (!has && APPLY) await api('POST', '/contact-properties', { key: k, type: 'string' });
}

const hooks = list(await api('GET', '/webhooks'));
let hook = hooks.find((h) => h.endpoint === HOOK);
console.log(hook ? `✓ 웹훅 ${HOOK}` : `+ 웹훅 ${HOOK} (contact.updated) 만들기`);
if (!hook && APPLY) hook = await api('POST', '/webhooks', { endpoint: HOOK, events: ['contact.updated'] });
if (hook && !hook.signing_secret) hook = await api('GET', `/webhooks/${hook.id}`);

if (!APPLY) { console.log('\n(미리보기 — 만들려면 --apply)'); process.exit(0); }
const secrets = { RESEND_API_KEY: KEY, RESEND_SEGMENT_ID: seg?.id, RESEND_WEBHOOK_SECRET: hook?.signing_secret };
const missing = Object.entries(secrets).filter(([, v]) => !v).map(([k]) => k);
if (missing.length) { console.error(`값을 못 얻었다: ${missing.join(' · ')} — 대시보드에서 확인해라`); process.exit(1); }
if (!PUSH) { console.log(`\nPages 비밀값으로 넣으려면 --push 를 더해 다시 돌려라(프로젝트 ${PROJECT}).`); process.exit(0); }
for (const [name, value] of Object.entries(secrets)) {
  // 윈도의 npx 는 npx.cmd 라 셸 없이는 spawn 이 안 된다(Node 는 .cmd 직접 실행도 막는다). 인자는 고정 리터럴이라 셸에 안전하다.
  const r = spawnSync('npx', ['wrangler', 'pages', 'secret', 'put', name, `--project-name=${PROJECT}`], { input: value, encoding: 'utf8', shell: process.platform === 'win32' });
  console.log(r.status === 0 ? `✓ Pages 비밀값 ${name}` : `✗ ${name} 실패: ${r.error ? r.error.message : (r.stderr || r.stdout || '').split('\n').filter((l) => /error|✘/i.test(l)).join(' ')}`);
}
console.log('다음 = 배포(npm run deploy). 그 전엔 함수가 새 값을 못 읽는다.');
