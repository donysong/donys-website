/* POST /api/download/confirm — 확인 메일의 버튼을 누른 페이지가 부른다. 여기서 처음으로 명단(Resend 연락처 · `free_at`)에 들어가고
   다운로드 링크가 응답 · 메일로 나간다. 소식 메일 동의가 같이 왔으면 그것도 여기서 확정한다(`_lib/download.ts`). */
import { type Ctx } from '../../_lib/newsletter';
import { confirmDownload } from '../../_lib/download';

export async function onRequestPost({ request, env }: Ctx) {
  return confirmDownload(env, await request.json().catch(() => null));
}
