/* 개정 방침·약관의 시행일 — 한 곳. 고지 띠(`components/PolicyNotice.tsx`)·시행 예정본 페이지·deployCheck `[policy]` 가 여기서 읽는다.
   🔴 방침 제16조·약관 제4조가 *"시행 7일 전부터 이 사이트에 알린다"* 고 약속한다 — 시행일은 **고지가 사이트에 실제로 뜬 날 + 7일 이후**여야 한다.
      기간을 센다면 고지한 날은 빼는 쪽이 보수적이다(2026-10-15 오너 판정: 오늘 고지 → 8일째인 10-23 시행).
      고지 배포가 더 늦어지면 이 한 줄만 늦춘다(고지문·시행 예정본·점검이 같이 따라온다).
   🔴 이 날짜 전에는 새 방침이 현재 판이 아니다 → 이메일을 받는 폼(무료 다운로드)을 배포하지 마라. `npm run deploy` 의 deployCheck 가 막는다.

   두 번째 개정 = 동의 기반 방문 통계(Google Analytics, 2026-10-20 오너 승인 — 설계서 ANALYTICS_PLAN §12). 그 시행일은 `lib/analytics.ts` 의 `ANALYTICS_EFFECTIVE` 이고
   (켜는 날과 같다), 이 파일이 사람이 읽는 꼴과 고지 단계 여부(`ANALYTICS_NOTICE`)를 낸다.
   → **시행됨**(2026-10-31, 07957ae 에서 `GTM_ID` 채움): `ANALYTICS_NOTICE` = false, `revisedText()` = 언제나 true — 현재 판·PR 예정본 모두 분석 조항을 싣는다.
     아래 PR 개정과는 상수·띠·deployCheck 갈래가 따로다(분석 = `lib/analytics.ts`, PR = 이 파일의 `PR_*`). 섞지 마라.

   세 번째 개정 = You Name It PR Plugin 을 약관·방침·환불 정책에 더한다. 초안 = PR 플러그인 repo `gtm/legal/*-additions.md`(⚖️ 전문가 검토 전).
   2026-11-07 오너 판정(PR repo PRD §14 "출시 재계획"): 11-07 고지 → 11-14 시행, Pro 사전예약 결제는 시행일부터 연다.
   🔴 셈법: 약관 제4조 ② "시행일 7일 전부터 게시" 를 시행일에서 거꾸로 센 날이 게시일이다(11-14 의 7일 전 = 11-07).
      위 10-15 판정(고지한 날을 빼고 8일째)으로 세면 11-15 다 — 어느 쪽인지는 PR repo `gtm/legal/README.md` 의 ⚖️ 질문이다.
   🔴 고지가 PR_POSTED(KST) 안에 사이트에 뜨지 않으면 두 줄을 같이 민다(뜬 날, 뜬 날 + 7일). deployCheck `[policy]` 가 7일을 센다.
   PR_IN_FORCE = false 동안 *고지 단계*: 약관·방침·환불 현재 판 위에 개정 예정 띠, 개정본은 `/…/{terms,privacy,refund}/upcoming`(noindex).
   시행일(KST)에: PR_IN_FORCE = true + `upcoming` 페이지 6장(약관·방침·환불 × ko·en)을 지운다 — 분석 개정은 이미 시행돼 걸린 개정이 남지 않는다.
   뒤 정리(급하지 않다): 본문의 `{pr ? 새 : 옛}` 갈래에서 옛 쪽을 지운다. */
import { ANALYTICS_EFFECTIVE, ANALYTICS_ON } from './analytics';

export const POLICY_EFFECTIVE = '2026-10-23';

export const PR_POSTED = '2026-11-07';
export const PR_EFFECTIVE = '2026-11-14';
export const PR_IN_FORCE: boolean = false;

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/** `YYYY-MM-DD` → 국문 `2026년 10월 23일` · 영문 `October 23, 2026`. 법 면이 `PR.preorderDeadline` 같은 날짜도 이걸로 쓴다. */
export function human(iso: string, lang: 'en' | 'ko'): string {
  const [Y, M, D] = iso.split('-').map(Number);
  return lang === 'ko' ? `${Y}년 ${M}월 ${D}일` : `${MONTHS[M - 1]} ${D}, ${Y}`;
}

/** 사람이 읽는 시행일 — 국문 `2026년 10월 23일` · 영문 `October 23, 2026`. */
export const policyDate = (lang: 'en' | 'ko') => human(POLICY_EFFECTIVE, lang);

/** 동의 기반 방문 통계 조항의 시행일(= 분석을 켜는 첫 날). 고지 단계 전(상수가 빔)에는 부르면 안 된다. */
export function analyticsDate(lang: 'en' | 'ko'): string {
  if (!ANALYTICS_EFFECTIVE) throw new Error('ANALYTICS_EFFECTIVE 가 비어 있다 — 고지 단계에서만 시행일을 쓴다');
  return human(ANALYTICS_EFFECTIVE, lang);
}

/** 고지 단계 = 시행일은 정해졌고(고지 띠가 떠 있다) 아직 켜지 않았다. 이 동안 현재 판은 옛 방침, 개정본은 `/…/privacy/upcoming`. */
export const ANALYTICS_NOTICE = ANALYTICS_EFFECTIVE !== '' && !ANALYTICS_ON;
/** 방침 본문에 동의 기반 방문 통계 조항을 싣는가 — 켠 뒤의 현재 판, 또는 개정 예정본. */
export const revisedText = (view: 'current' | 'upcoming') => view === 'upcoming' || ANALYTICS_ON;

/** PR Plugin 개정의 시행일 · 게시일 — 국문 `2026년 11월 14일` · 영문 `November 14, 2026`. */
export const prDate = (lang: 'en' | 'ko') => human(PR_EFFECTIVE, lang);
export const prPostedDate = (lang: 'en' | 'ko') => human(PR_POSTED, lang);
/** PR Plugin 개정의 고지 단계 = 시행 전. 이 동안 약관·방침·환불 현재 판은 옛 판, 개정본은 `/…/upcoming`. */
export const PR_NOTICE = !PR_IN_FORCE;
/** 본문에 PR Plugin 조항을 싣는가 — 시행 뒤의 현재 판, 또는 개정 예정본. */
export const prText = (view: 'current' | 'upcoming') => view === 'upcoming' || PR_IN_FORCE;
