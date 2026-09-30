/* POST /api/newsletter/confirm — 확인 메일의 버튼을 누른 페이지가 부른다. 여기서 처음으로 명단(Resend 연락처)에 들어간다.
   동의 증거 = 연락처 속성 `consent_at`(동의 시각, UTC) · `consent_ver`(어느 문구에 동의했나) · `lang` + Resend 의 확인 메일 발송 기록.
   끝나면 처리 결과를 알린다(정보통신망법 시행령 §62의2 — 동의한 날부터 14일 이내, 여기선 즉시). */
import { CONSENT_VERSION, type Ctx, json, pageUrl, readToken, resend, resultMail, sendMail, signToken } from '../../_lib/newsletter';

export async function onRequestPost({ request, env }: Ctx) {
  const b = (await request.json().catch(() => ({}))) as { token?: unknown };
  const t = await readToken(env, b.token, 'c');
  if (!t) return json({ ok: false, error: 'token' }, 400);
  const properties = { consent_at: new Date().toISOString(), consent_ver: CONSENT_VERSION, lang: t.l };
  const segments = env.RESEND_SEGMENT_ID ? [{ id: env.RESEND_SEGMENT_ID }] : [];
  const made = await resend(env, 'POST', '/contacts', { email: t.e, unsubscribed: false, properties, segments });
  if (!made.ok) {
    /* 이미 있는 연락처(재구독) — 상태·속성을 새 동의로 덮고 세그먼트에 다시 넣는다. */
    const up = await resend(env, 'PATCH', `/contacts/${encodeURIComponent(t.e)}`, { unsubscribed: false, properties });
    if (!up.ok) return json({ ok: false, error: 'upstream' }, 502);
    if (env.RESEND_SEGMENT_ID) await resend(env, 'POST', `/contacts/${encodeURIComponent(t.e)}/segments/${env.RESEND_SEGMENT_ID}`);
  }
  const unsub = await signToken(env, { e: t.e, l: t.l, a: 'u' });
  await sendMail(env, t.e, resultMail(t.l, 'sub', pageUrl(env, t.l, `unsubscribe=${unsub}`)));
  return json({ ok: true });
}
