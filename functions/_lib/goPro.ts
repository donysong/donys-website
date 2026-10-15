/* GET /go/pro?tool=<id> · GET /ko/go/pro?tool=<id> — 제품 안의 Pro 버튼이 여는 주소. 어느 Pro 기능의 버튼이 눌렸는지 **합계로만** 세고,
   가격 판(`/ae#price`)으로 302 한다. 라우트 파일 = `functions/go/pro.ts`(영문) · `functions/ko/go/pro.ts`(국문) — 둘 다 여기 `goPro` 를 부른다.

   🔴 개인을 식별하는 값은 **하나도 기록하지 않는다**: IP · User-Agent · 쿠키 · 헤더 · 토큰 없음. 점 하나 = `blobs:[기능 id, 언어]` + `indexes:[기능 id]`.
      `tool` 은 `lib/proTools.ts` 의 15개 id(Pro 툴 13 + Pro 패널 `chat`·`custom1`)만 통과하고 나머지는 전부 `other` 다(임의 문자열이 집계 표를 어지럽히지 못하게 + 사용자가 넣은 값이 기록되지 않게).
      개인정보 처리방침(제2조 ②)이 이 사실을 약속한다 — 여기에 필드를 더하면 처리방침을 같이 고쳐라.
   🔴 바인딩이 없으면(로컬 · 아직 설정 전) 세지 않고 **그냥 리디렉트한다** — 제품 버튼이 집계 때문에 죽으면 안 된다(fail open).

   설정(코드가 아니라 Cloudflare Pages 프로젝트 `younameit` 쪽 — 배포 전에 한 번):
     대시보드 ▸ Workers & Pages ▸ younameit ▸ Settings ▸ Bindings ▸ Add ▸ Analytics Engine
       Variable name = PRO_CLICKS · Dataset = pro_clicks   (Production 과 Preview 둘 다)
     바인딩을 넣은 **뒤의 다음 배포부터** 함수가 읽는다.
   읽기(SQL API · 계정 ID 와 Analytics 읽기 토큰 필요):
     SELECT blob1 AS tool, blob2 AS lang, SUM(_sample_interval) AS clicks FROM pro_clicks
     WHERE timestamp > NOW() - INTERVAL '30' DAY GROUP BY tool, lang ORDER BY clicks DESC
   검증 = `npm run test:fn` (id 검증 · 리디렉트 대상 · 집계 모양 · fail open). */
import { PRO_CLICK_IDS } from '../../lib/proTools';

export type Lang = 'ko' | 'en';

/** Workers Analytics Engine 바인딩의 쓰는 쪽만 — 타입 패키지를 들이지 않으려고 필요한 모양만 적는다. */
export interface ProClicks {
  writeDataPoint(point: { blobs?: string[]; doubles?: number[]; indexes?: string[] }): void;
}
export interface GoProEnv {
  PRO_CLICKS?: ProClicks;
}

/** 알려진 Pro id(툴 13 + 패널 `chat`·`custom1`)면 그대로, 아니면 `other`. */
export function proTool(raw: string | null | undefined): string {
  return raw && PRO_CLICK_IDS.includes(raw) ? raw : 'other';
}

/** 리디렉트 대상(사이트 안 경로) — 국문 면은 `/ko/ae`. */
export const proTarget = (lang: Lang) => `${lang === 'ko' ? '/ko' : ''}/ae#price`;

/** 라우트 본체 — GET 만 센다(HEAD 는 `count=false`). */
export function goPro({ request, env }: { request: Request; env: GoProEnv }, lang: Lang, count = true): Response {
  const tool = proTool(new URL(request.url).searchParams.get('tool'));
  if (count) {
    try {
      env.PRO_CLICKS?.writeDataPoint({ blobs: [tool, lang], indexes: [tool] });
    } catch (e) {
      console.error('[go/pro] count failed', e);   // 집계가 실패해도 이동은 한다
    }
  }
  return new Response(null, {
    status: 302,
    /* 절대 주소 — 요청이 온 호스트(프리뷰 배포 포함)를 따른다. 캐시하면 다음 클릭이 엣지에서 끝나 세지 못한다. */
    headers: { location: new URL(proTarget(lang), request.url).href, 'cache-control': 'no-store' },
  });
}
