/* 입구 언어 — 한국어 브라우저가 **바깥에서** 영문 입구(`/` · `/ae`)로 들어오면 국문 면(`/ko` · `/ko/ae`)으로 302 한다.
   라우트 파일 = `functions/index.ts`(`/`) · `functions/ae.ts`(`/ae`) — 둘 다 여기 `koEntry` 를 부른다.

   왜: 2026-10-16~29 방문 380 중 한국 330 인데 인스타 프로필 링크가 `/ae` 라 210 이 영문 면에 내렸고,
       영문 폼에서 신청한 naver 주소가 영문 확인 메일을 받았다(Resend 발송 기록 · Cloudflare Web Analytics 실측).
   🔴 개인을 식별하는 값은 **읽기만 하고 남기지 않는다**: `Accept-Language`·`Referer` 를 보고 갈 곳만 정한다. 기록·쿠키·저장 없음.
   🔴 같은 사이트 안에서 온 요청은 안 돌린다 — 국문 면의 EN 링크(언어 전환)를 누른 사람을 다시 국문으로 보내면 영문 면에 갈 수 없다.
   🔴 검색 로봇은 `Accept-Language` 에 ko 를 안 싣는다 → 영문 면이 그대로 색인된다(hreflang 은 각 페이지가 따로 선언).
   해시(`#price`)는 서버가 못 보지만 브라우저가 302 를 넘어 그대로 붙인다 — 제품 안 Pro 문(`/go/pro` → `/ae?utm…#price`)도 국문 가격 판으로 간다.
   한계: 영문을 고른 한국어 브라우저 사용자가 **바깥에서** `/ae` 로 다시 오면 또 국문으로 간다(선택을 기억하지 않는다 — 저장소를 쓰면 방침이 바뀐다).
         불만이 오면 `?lang=en` 예외 한 줄을 더한다.
   검증 = `npm run test:fn`. */

/** `Accept-Language` 에서 q 가 가장 높은 언어가 한국어인가. 같은 q 면 먼저 적힌 쪽(브라우저가 우선순위 순서로 보낸다). */
export function prefersKo(acceptLanguage: string | null | undefined): boolean {
  if (!acceptLanguage) return false;
  let best = '';
  let bestQ = -1;
  for (const part of acceptLanguage.split(',')) {
    const [tag, ...params] = part.trim().split(';');
    if (!tag) continue;
    const qp = params.map((p) => p.trim()).find((p) => p.startsWith('q='));
    const q = qp ? Number(qp.slice(2)) : 1;
    if (!Number.isFinite(q) || q <= bestQ) continue;
    best = tag.toLowerCase();
    bestQ = q;
  }
  return bestQ > 0 && (best === 'ko' || best.startsWith('ko-'));
}

/** 국문으로 돌릴 주소(경로 + 쿼리), 안 돌리면 null. 순수 함수라 `tools/functions.test.mjs` 가 직접 돌린다. */
export function koTarget(url: URL, acceptLanguage: string | null, referer: string | null): string | null {
  if (!prefersKo(acceptLanguage)) return null;
  if (referer) {
    try {
      if (new URL(referer).host === url.host) return null;
    } catch {
      /* 깨진 Referer 는 바깥으로 본다 */
    }
  }
  return `/ko${url.pathname === '/' ? '' : url.pathname}${url.search}`;
}

type Ctx = { request: Request; next: () => Promise<Response> };

/** 라우트 본체 — GET·HEAD 만 본다. 안 돌리면 정적 페이지를 그대로 낸다(`next`). */
export function koEntry({ request, next }: Ctx): Response | Promise<Response> {
  if (request.method !== 'GET' && request.method !== 'HEAD') return next();
  const url = new URL(request.url);
  const to = koTarget(url, request.headers.get('accept-language'), request.headers.get('referer'));
  if (!to) return next();
  return new Response(null, {
    status: 302,
    /* 언어마다 답이 달라서 캐시하면 다음 사람이 남의 언어로 간다. */
    headers: { location: new URL(to, request.url).href, 'cache-control': 'no-store', vary: 'Accept-Language, Referer' },
  });
}
