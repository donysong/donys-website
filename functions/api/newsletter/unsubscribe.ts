/* POST /api/newsletter/unsubscribe — 처리 결과 메일의 철회 링크가 연 페이지의 버튼이 부른다. 토큰은 만료가 없다(철회는 언제든).
   통지 → 삭제(`withdraw`). 이미 삭제됐으면 조용히 성공 — 두 번 눌러도 같은 결과다. */
import { type Ctx, json, readToken, withdraw } from '../../_lib/newsletter';

export async function onRequestPost({ request, env }: Ctx) {
  const b = (await request.json().catch(() => ({}))) as { token?: unknown };
  const t = await readToken(env, b.token, 'u');
  if (!t) return json({ ok: false, error: 'token' }, 400);
  await withdraw(env, t.e, t.l);
  return json({ ok: true });
}
