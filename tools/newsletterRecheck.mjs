#!/usr/bin/env node
/* 광고성 정보 수신 동의 **2년마다 확인** — 정보통신망법 §50⑧ · 시행령 §62의3.
   동의(또는 마지막 확인)한 날부터 2년이 되기 전에 알려야 한다: ① 전송자 명칭 ② 동의 사실과 동의한 날짜 ③ 유지·철회 방법.
   여기선 **23개월**이 지난 구독자를 고른다(한 달 여유). 달력에 매달 1일 한 번 돌리면 놓치지 않는다.
   실행: set -a; . ~/.config/younameit/secrets.env; set +a
         node tools/newsletterRecheck.mjs          ← 대상만 출력
         node tools/newsletterRecheck.mjs --send   ← 알림 발송 + `recheck_at` 기록
   NEWSLETTER_SECRET 은 Pages 에 넣은 것과 **같은 값**이어야 철회 링크가 산다 — 그래서 그 파일에서 읽는다(2026-09-30 같은 값으로 넣음). */
import crypto from 'node:crypto';
import { readFileSync } from 'node:fs';

const KEY = process.env.RESEND_API_KEY, SECRET = process.env.NEWSLETTER_SECRET, SEND = process.argv.includes('--send');
const SITE = process.env.SITE_URL || 'https://younameit.works';
if (!KEY || !SECRET) { console.error('RESEND_API_KEY · NEWSLETTER_SECRET 둘 다 필요하다.'); process.exit(1); }
const product = readFileSync(new URL('../lib/product.ts', import.meta.url), 'utf8');
const pick = (re) => product.match(re)?.[1] || '';
const NAME_KO = pick(/name:\s*\{\s*ko:\s*'([^']+)'/), NAME_EN = pick(/name:\s*\{[^}]*en:\s*'([^']+)'/), EMAIL = pick(/email:\s*'([^']+)'/);

const api = async (method, path, body) => {
  const r = await fetch(`https://api.resend.com${path}`, { method, headers: { authorization: `Bearer ${KEY}`, 'content-type': 'application/json' }, body: body ? JSON.stringify(body) : undefined });
  const j = await r.json().catch(() => ({})); if (!r.ok) throw new Error(`${method} ${path} → ${r.status} ${JSON.stringify(j)}`); return j;
};
/* `functions/_lib/newsletter.ts` 의 signToken 과 같은 형식 — 둘을 같이 고쳐라. */
const b64u = (b) => Buffer.from(b).toString('base64url');
const unsubLink = (email, lang) => {
  const payload = b64u(JSON.stringify({ e: email, l: lang, a: 'u', t: Math.floor(Date.now() / 1000) }));
  const sig = crypto.createHmac('sha256', SECRET).update(payload).digest('base64url');
  return `${SITE}${lang === 'ko' ? '/ko' : ''}/newsletter?unsubscribe=${payload}.${sig}`;
};
const val = (p) => (typeof p === 'object' && p ? p.value : p) || '';
const DUE_MS = 23 * 30.44 * 24 * 3600 * 1000;

let after = '', due = [];
do {
  const page = await api('GET', `/contacts?limit=100${after ? `&after=${after}` : ''}`);
  for (const c of page.data || []) {
    if (c.unsubscribed) continue;
    const full = c.properties ? c : await api('GET', `/contacts/${c.id}`);
    const base = val(full.properties?.recheck_at) || val(full.properties?.consent_at);
    if (base && Date.now() - Date.parse(base) >= DUE_MS) due.push({ email: c.email, lang: val(full.properties?.lang) === 'en' ? 'en' : 'ko', consentAt: val(full.properties?.consent_at), base });
  }
  after = page.has_more ? page.data.at(-1).id : '';
} while (after);

console.log(`확인 대상 ${due.length}명`); due.forEach((d) => console.log(' ', d.email, '동의', d.consentAt.slice(0, 10), '기준', d.base.slice(0, 10)));
if (!SEND) { console.log('(미리보기 — 보내려면 --send)'); process.exit(0); }
for (const d of due) {
  const day = d.consentAt.slice(0, 10), link = unsubLink(d.email, d.lang);
  const ko = d.lang === 'ko';
  const lines = ko
    ? [`전송자: ${NAME_KO}(${NAME_EN})`, `고객님은 ${day} 에 이메일로 광고성 정보(새 도구·업데이트·할인 소식)를 받는 데 동의하셨습니다.`, '법에 따라 2년마다 수신 동의를 확인해 드립니다.', '계속 받으시려면 아무것도 하지 않으셔도 됩니다. 그만 받으시려면 아래 링크를 눌러 주세요(무료).', link, EMAIL]
    : [`Sender: ${NAME_EN}`, `On ${day} you agreed to receive promotional email (new tools, updates and deals) from us.`, 'Korean law asks us to confirm this every two years.', 'To keep receiving it, do nothing. To stop, use the link below (free).', link, EMAIL];
  await api('POST', '/emails', { from: 'You Name It <news@younameit.works>', reply_to: EMAIL, to: d.email, subject: ko ? '[You Name It] 광고성 정보 수신 동의 확인 안내' : '[You Name It] Checking your newsletter consent', text: lines.join('\n\n') });
  await api('PATCH', `/contacts/${encodeURIComponent(d.email)}`, { properties: { recheck_at: new Date().toISOString() } });
  console.log('보냄', d.email);
}
