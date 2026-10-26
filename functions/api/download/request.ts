/* POST /api/download/request — 무료 다운로드 폼 → 확인 메일. 아직 명단에 넣지 않는다(이중 확인, `_lib/download.ts` 머리 주석).
   🔴 필수 동의(약관 · 개인정보 수집·이용)가 참이어야 받는다. 폼이 막아도 서버가 한 번 더 본다. 소식 메일은 선택 — 동의 셋이 모두 참일 때만 같이 받는다. */
import { type Ctx } from '../../_lib/newsletter';
import { requestDownload } from '../../_lib/download';

export async function onRequestPost({ request, env }: Ctx) {
  return requestDownload(env, await request.json().catch(() => null));
}
