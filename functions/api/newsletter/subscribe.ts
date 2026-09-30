/* POST /api/newsletter/subscribe — 폼 → 확인 메일. 아직 명단에 넣지 않는다(이중 확인, `_lib/newsletter.ts` 머리 주석).
   🔴 동의 셋(수집·이용 · 광고성 정보 수신 · 국외 이전)이 **각각** 참이어야 받는다 — 개인정보 보호법 §22①(구분해서 받기) ·
   §28의8①1호(국외 이전 별도 동의) · 정보통신망법 §50①(명시적 사전 동의). 폼이 막아도 서버가 한 번 더 본다.
   응답은 주소가 있든 없든 같다 — 누가 구독 중인지 이 창구로 알아낼 수 없게. */
import { type Ctx, type Lang, confirmMail, isEmail, json, pageUrl, sendMail, signToken } from '../../_lib/newsletter';

export async function onRequestPost({ request, env }: Ctx) {
  let b: Record<string, unknown>;
  try {
    b = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: 'bad_request' }, 400);
  }
  /* 사람 눈엔 안 보이는 칸 — 채워져 있으면 봇이다. 성공처럼 답하고 아무것도 안 한다. */
  if (typeof b.website === 'string' && b.website) return json({ ok: true });
  const email = typeof b.email === 'string' ? b.email.trim().toLowerCase() : '';
  if (!isEmail(email)) return json({ ok: false, error: 'email' }, 400);
  if (b.agreeCollect !== true || b.agreeAds !== true || b.agreeTransfer !== true) return json({ ok: false, error: 'consent' }, 400);
  const lang: Lang = b.lang === 'en' ? 'en' : 'ko';
  const token = await signToken(env, { e: email, l: lang, a: 'c' });
  await sendMail(env, email, confirmMail(lang, pageUrl(env, lang, `confirm=${token}`)));
  return json({ ok: true });
}
