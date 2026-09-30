/* POST /api/newsletter/webhook — Resend `contact.updated`. 브로드캐스트 하단의 **Resend 수신거부 링크**(또는 메일 앱의 원클릭 수신거부)로
   철회하면 우리 페이지를 거치지 않는다 — 그래도 처리 결과 통지(시행령 §62의2)는 우리 의무라 여기서 받는다.
   서명 = Svix 방식(`svix-id`·`svix-timestamp`·`svix-signature`, 비밀 `whsec_…`). 5분 넘은 요청은 재전송 공격으로 보고 버린다.
   Resend 는 같은 이벤트를 다시 보낼 수 있다 — `withdraw` 가 없는 연락처엔 아무것도 안 하므로 통지가 두 번 가지 않는다. */
import { type Ctx, json, withdraw } from '../../_lib/newsletter';

async function verified(secret: string, id: string, ts: string, sigs: string, body: string) {
  if (Math.abs(Date.now() / 1000 - Number(ts)) > 300) return false;
  const key = Uint8Array.from(atob(secret.replace(/^whsec_/, '')), (c) => c.charCodeAt(0));
  const k = await crypto.subtle.importKey('raw', key, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const mac = new Uint8Array(await crypto.subtle.sign('HMAC', k, new TextEncoder().encode(`${id}.${ts}.${body}`)));
  const want = btoa(String.fromCharCode(...mac));
  return sigs.split(' ').some((s) => s.split(',')[1] === want);
}

export async function onRequestPost({ request, env }: Ctx) {
  if (!env.RESEND_WEBHOOK_SECRET) return json({ ok: false, error: 'not_configured' }, 503);
  const body = await request.text();
  const h = request.headers;
  const ok = await verified(env.RESEND_WEBHOOK_SECRET, h.get('svix-id') || '', h.get('svix-timestamp') || '', h.get('svix-signature') || '', body);
  if (!ok) return json({ ok: false, error: 'signature' }, 401);
  const ev = JSON.parse(body) as { type?: string; data?: { email?: string; unsubscribed?: boolean } };
  if (ev.type === 'contact.updated' && ev.data?.unsubscribed === true && ev.data.email) await withdraw(env, ev.data.email, 'ko');
  return json({ ok: true });
}
